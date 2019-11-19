import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'
import moment from 'moment'
import {hitungCart} from '../../redux/1.actions'
import { MDBJumbotron, MDBCol} from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'


class Keranjang extends Component {
    
    state = {
        cart: [],
        keluarModal: 0,
        paymentMode: false,
        namaPenerima: '',
        alamatPenerima: '',
        kodePosPenerima: '',
        messageData: null,
        dataLengkap: false
    }

    componentDidMount() {
        this.getDataApi(this.props.user.id)
    }

    getDataApi = (userId) => {
        Axios.get(urlApi + `cart/getCartUser/` + userId)
        .then((res)=>{
            this.setState({cart: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditQty = (action, index) => {
        let arrCart = this.state.cart
        if (action === 'min') {
            if(arrCart[index].JumlahBox > 1) {
                arrCart[index].JumlahBox -= 1
                var objCartPut = {
                    idUser: this.props.user.id,
                    idPaket: arrCart[index].idPaket,
                    TanggalMulai: arrCart[index].TanggalMulai,
                    TanggalBerakhir: arrCart[index].TanggalBerakhir,
                    JumlahBox: arrCart[index].JumlahBox,
                    Durasi: arrCart[index].Durasi
                }
                Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
                .then((res) => {
                    this.getDataApi(this.props.user.id)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        } else if (action === 'add') {
            arrCart[index].JumlahBox += 1
            objCartPut = {
                idUser: this.props.user.id,
                idPaket: arrCart[index].idPaket,
                TanggalMulai: arrCart[index].TanggalMulai,
                TanggalBerakhir: arrCart[index].TanggalBerakhir,
                JumlahBox: arrCart[index].JumlahBox,
                Durasi: arrCart[index].Durasi
            }
            Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
            .then((res) => {
                this.getDataApi(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    changeDurasi = (index) => {
        let arrCart = this.state.cart
        arrCart[index].Durasi = Number(this.refs[`inputChangeDurasi${index}`].value)
        var ubahFormat = arrCart[index].TanggalMulai.replace('/','-')

        var cnt = 1
        var tmpDate = moment(ubahFormat)
            while (cnt < arrCart[index].Durasi) {
                tmpDate = tmpDate.add('days', 1);
                if (tmpDate.weekday() !== moment().day("Sunday").weekday() && tmpDate.weekday() !== moment().day("Saturday").weekday()) {
                    cnt = cnt + 1;
                }
            }

        var objCartPut = {
            idUser: this.props.user.id,
            idPaket: arrCart[index].idPaket,
            TanggalMulai: arrCart[index].TanggalMulai,
            TanggalBerakhir: moment(tmpDate._d).format("YYYY/MM/DD"),
            JumlahBox: arrCart[index].JumlahBox,
            Durasi: arrCart[index].Durasi
        }
        Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
            .then((res) => {
                this.getDataApi(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteCart = (index) => {
        Axios.delete(urlApi + 'cart/deleteCartById/' + index) 
        .then((res)=> {
            this.props.hitungCart(this.props.user.id)
            this.getDataApi(this.props.user.id)
            swal ('Delete item', 'Item deleted from cart', 'success')
        })
        
        .catch((err) => {
            console.log(err)
        })
    }

    totalBelanjaan = () => {
        var hargaTotal = 0
        this.state.cart.map(val => {
            return hargaTotal += val.Durasi * val.JumlahBox * (val.harga - (val.harga * (val.discount/100)))
        })
        return hargaTotal
    }

    submitHistory = () => {
        if (this.state.namaPenerima === '' || this.state.alamatPenerima === '' || this.state.kodePosPenerima === '') {
            this.setState({messageData: 'Please complete all data required!'})
        } else {
            this.setState({messageData: null, dataLengkap: true})
        }  
    }

    resetDanSubmitHistory = () => {
        var TanggalTransaksi = moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
        var BatasAkhirBayar = moment(new Date()).add(2, 'hours').format("YYYY-MM-DD HH:mm:ss").toString()
        var postingHistory = {
            TanggalTransaksi: TanggalTransaksi,
            UserId: this.props.user.id,
            TotalBelanja: this.totalBelanjaan(),
            NamaPenerima: this.state.namaPenerima,
            AlamatPenerima: this.state.alamatPenerima,
            KodePosPenerima: this.state.kodePosPenerima,
            Cancel: 0,
            Status: 'Has not Been Paid',
            BatasAkhirBayar: BatasAkhirBayar
        }
        Axios.post(urlApi + 'history/addToHistory', postingHistory)
        .then((res) => {
            swal ('Thank you for your order!', `Please submit your payment before ${postingHistory.BatasAkhirBayar}.`, 'success')
            
            Axios.post(urlApi + 'history/addHistoryDetail/' + this.props.user.id, {idHistory: res.data[0].id})
            .then((res) => {                
                for (var j = 0; j < this.state.cart.length; j++) {
                    Axios.delete(urlApi + 'cart/deleteCartById/'+ this.state.cart[j].id)
                    .then((res) => {
                        this.props.hitungCart(this.props.user.id)
                        swal ('Thank you for your order!', `Please submit your payment before ${postingHistory.BatasAkhirBayar}.`, 'success')
                    })
                    .catch((err) => {
                        swal ('Eror', 'Server Error', 'error')
                    })
                }
                return this.setState({cart: [], keluarModal: 0, paymentMode: false})
            })
            .catch((err) => {
                swal ('Eror', 'Server Error', 'error')
                console.log(err)
            })      
        })
        .catch((err) => {
            swal ('Eror', 'Server Error', 'error')
            console.log(err.message)
        })
    }

    renderCart = () => {
        var jsx = this.state.cart.map((val, idx) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    {
                        val.discount === null 
                        ?
                        <td>Harga Normal</td>
                        :
                        <td>{val.discount}%</td>
                    }              
                    <td>
                        <div className="d-flex flex-row">
                            <input type="button" className="btn btn-secondary btn-block" value='+' onClick={()=> this.onBtnEditQty('add', idx)}/>
                            <input type="button" className="btn btn-secondary btn-block mr-1 ml-1" value={val.JumlahBox}/>
                            <input type="button" className="btn btn-secondary btn-block" value='-' onClick={()=> this.onBtnEditQty('min', idx)}/>
                        </div>
                    </td>
                    <td>{val.TanggalMulai}</td>
                    <td>{val.TanggalBerakhir}</td>
                    <td>
                        <select className="browser-default custom-select" ref={`inputChangeDurasi${idx}`} onChange={() => this.changeDurasi(idx)}>
                            <option>{val.Durasi} days</option>
                            {val.Durasi === 2 ? null : <option value="2">2 days</option>}
                            {val.Durasi === 5 ? null : <option value="5">5 days</option>}
                            {val.Durasi === 10 ? null : <option value="10">10 days</option>}
                            {val.Durasi === 20 ? null : <option value="20">20 days</option>}
                        </select>
                    </td>
                    <td>{val.Durasi * val.JumlahBox * (val.harga - (val.harga * (val.discount/100))) }</td>
                    <td><input type="button" className="btn btn-danger btn-block" value="DELETE" onClick={()=> this.deleteCart(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }


    render() {
        if (this.props.user.role === 'admin' || this.props.user.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <div className="pt-5 pb-5">
                            <div className="pt-5 mt-5">
                                <h1 style={{marginRight: '580px', marginLeft: '580px'}} className="title-product-detail h1-responsive font-weight-bold bg-rgba(244, 67, 54, 0.7) rgba-red-strong">CART</h1>
                            </div>
                            <div className="mx-md-5 px-md-5">
                                <p className="mx-4 mx-md-5 pl-md-5 pr-md-5 bg-rgba(255, 255, 255, 0.7) rgba-white-strong font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>
                                    “A fit, healthy body; that is the best fashion statement”<br/>
                                    <span style={{fontSize: '15px', fontFamily: 'sans-serif'}}>― Jess C Scott</span>
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                {
                    this.state.cart.length === 0
                    ?
                    <h1 className="h1-responsive text-center mt-5" style={{marginBottom: '500px'}}>YOUR CART IS EMPTY</h1>
                    :
                    <>
                        <div className="container-fluid">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <MDBTable hover scrollY maxHeight="60vh">
                                        <MDBTableHead color="success-color text-center text-white">
                                            <tr>
                                                <th className="font-weight-bold">PACKAGE NAME</th>
                                                <th className="font-weight-bold">PRICE</th>
                                                <th className="font-weight-bold">DISCOUNT</th>
                                                <th className="font-weight-bold">AMOUNT OF BOX</th>
                                                <th className="font-weight-bold">START DATE</th>
                                                <th className="font-weight-bold">END DATE</th>
                                                <th className="font-weight-bold">DURATION</th>
                                                <th className="font-weight-bold">TOTAL</th>
                                                <th className="font-weight-bold">DELETE</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                                {this.renderCart()}
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </div>
                            <div className="row m-5">
                                    <div className="col-12 text-center">
                                        {
                                            this.state.cart.length === 0
                                            ?
                                            null
                                            :
                                            <>
                                            <h5 className="font-weight-bold">TOTAL INVOICE VALUE: Rp. {this.totalBelanjaan()}</h5>
                                                <input type="button" className="btn btn-warning" value="CHECKOUT" onClick={() => this.setState({keluarModal: 1, paymentMode: true})}/> 
                                            </>
                                        }
                                    </div>
                                    {
                                        this.state.keluarModal === 1
                                        ?
                                        <div>
                                            <Modal isOpen={this.state.paymentMode}>
                                                <ModalHeader className="bg-warning text-center justify-content-center ">
                                                    <h5 className="font-weight-bold">PLEASE INPUT YOUR DATA</h5>
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div className="row mb-2">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="formGroupExampleInput">Recipient Name:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => this.setState({namaPenerima: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="formGroupExampleInput">Delivery Address:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => this.setState({alamatPenerima: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="formGroupExampleInput">Postal Code:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => this.setState({kodePosPenerima: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-12">
                                                            {
                                                                this.state.messageData === null
                                                                ?
                                                                null
                                                                :
                                                                <p style={{color: "red"}}>{this.state.messageData}</p>
                                                            }   
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    {
                                                        this.state.dataLengkap
                                                        ?
                                                        <Button color="success" onClick={this.resetDanSubmitHistory}>OK</Button>
                                                        :
                                                        <>
                                                            <Button color="success" onClick={this.submitHistory}>SUBMIT</Button>
                                                            <Button color="secondary" onClick={() => this.setState({keluarModal: 0, paymentMode: false})}>CANCEL</Button>
                                                        </>
                                                    }                                        
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                        :
                                        null
                                    }
                            </div>
                        </div>
                    </>
                }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        checkOutData: state.timeoutData
    }
}

export default connect(mapStateToProps, {hitungCart})(Keranjang)