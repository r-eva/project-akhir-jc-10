import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'
import {firstCheckOutClicked} from '../../redux/1.actions/checkOutAction'
import moment from 'moment'

class Keranjang extends Component {
    
    state = {
        cart: [],
        timeOutClick: true,
        dayCheckOut: '',
        // timeOutClick: null,
        // dayCheckOut: null,
        // tampilDayCheckout: null,
        keluarModal: 0,
        paymentMode: false,
        inputUang: '',
        kembalianUang: null,
        submitModal: true,
        namaPenerima: '',
        alamatPenerima: '',
        kodePosPenerima: '',
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
                    Durasi: arrCart[index].Durasi,
                    totalHarga: (arrCart[index].harga - ((arrCart[index].discount / 100) * arrCart[index].harga)) * arrCart[index].JumlahBox * arrCart[index].Durasi
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
                Durasi: arrCart[index].Durasi,
                totalHarga: (arrCart[index].harga - ((arrCart[index].discount / 100) * arrCart[index].harga)) * arrCart[index].JumlahBox * arrCart[index].Durasi
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
            Durasi: arrCart[index].Durasi,
            totalHarga: (arrCart[index].harga - ((arrCart[index].discount / 100) * arrCart[index].harga)) * arrCart[index].JumlahBox * arrCart[index].Durasi
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
            return hargaTotal += val.totalHarga
        })
        return hargaTotal
    }

    prosesUang = () => {
        var tempKembalianUang
        if (this.totalBelanjaan() - Number(this.state.inputUang) > 0) {
            tempKembalianUang = this.totalBelanjaan() - Number(this.state.inputUang)
            return this.setState({kembalianUang: tempKembalianUang})
        } else if (this.totalBelanjaan() - Number(this.state.inputUang) < 0) {
            tempKembalianUang = this.totalBelanjaan() - Number(this.state.inputUang)
            this.setState({kembalianUang: tempKembalianUang})
            return this.setState({submitModal: false})
        } else {
            this.setState({kembalianUang: 0})
            return this.setState({submitModal: false})
        }
    }

    onBtnCheckOutClick = () => {
        var kirimCheckout = {
            timeOutClick: false,
            tampilDayCheckout: new Date (new Date().getTime() + 1*24*60*60*1000).toString(),
            dayCheckOut: new Date (new Date().getTime() + 1*24*60*60*1000)
        }
        this.props.firstCheckOutClicked(kirimCheckout)
        this.setState({
            timeOutClick: this.props.checkOutData.timeOutClick,
            dayCheckOut: this.props.checkOutData.dayCheckOut,
            tampilDayCheckout: this.props.checkOutData.tampilDayCheckout
        })
        console.log(this.props.checkOutData)
    }

    resetDanSubmitHistory = () => {
        alert('yUK bUAT BACKEDN')
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
                        <input type="button" className="btn btn-secondary" value='+' onClick={()=> this.onBtnEditQty('add', idx)}/>
                        <input type="button" className="btn btn-secondary" value={val.JumlahBox}/>
                        <input type="button" className="btn btn-secondary" value='-' onClick={()=> this.onBtnEditQty('min', idx)}/>
                    </td>
                    <td>{val.TanggalMulai}</td>
                    <td>{val.TanggalBerakhir}</td>
                    <td>
                        <select className="browser-default custom-select" ref={`inputChangeDurasi${idx}`} onChange={() => this.changeDurasi(idx)}>
                            <option>{val.Durasi} hari</option>
                            {val.Durasi === 2 ? null : <option value="2">2 hari</option>}
                            {val.Durasi === 5 ? null : <option value="5">5 hari</option>}
                            {val.Durasi === 10 ? null : <option value="10">10 hari</option>}
                            {val.Durasi === 20 ? null : <option value="20">20 hari</option>}
                        </select>
                    </td>
                    <td>{val.totalHarga}</td>
                    <td><input type="button" className="btn btn-danger btn-block" value="DELETE" onClick={()=> this.deleteCart(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }


    render() {
        if (this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/414660/pexels-photo-414660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">CART</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container-fluid">
                <table className='table mt-3 mb-5'>
                    <thead>
                    <tr className="text-center">
                        <th>Nama Paket</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Jumlah Box</th>
                        <th>Tanggal Mulai</th>
                        <th>Tanggal Berakhir</th>
                        <th>Durasi</th>
                        <th>Total Harga</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </table>
                <div className="row mb-5">
                        <div className="col-12 text-center">
                            {
                                this.state.cart.length === 0
                                ?
                                null
                                :
                                <>
                                <h5 className="font-weight-bold">TOTAL BELANJAAN ANDA: Rp. {this.totalBelanjaan()}</h5>
                                    {
                                        this.state.timeOutClick === false
                                        ?
                                        <>
                                        <div><p className="font font-weight-bolder">Mohon selesaikan pembayaran anda paling lambat pada: <br/><span className="font-weight-bold" style={{color: 'red'}}>{this.state.dayCheckOut}</span></p></div>
                                        <div className='mb-5'>
                                            <input type="button" className="btn btn-success" value="BAYAR SEKARANG" onClick={() => this.setState({keluarModal: 1, paymentMode: true})}/>
                                        </div>
                                        </>
                                        :
                                        <input type="button" className="btn btn-warning" value="CHECKOUT" onClick={() => this.setState({
                                            timeOutClick: false,
                                            dayCheckOut: new Date (new Date().getTime() + 2*24*60*60*1000).toString()
                                        })}/>
                                    }
                                </>
                            }
                        </div>
                        {
                            this.state.keluarModal === 1
                            ?
                            <div>
                                <Modal isOpen={this.state.paymentMode}>
                                    <ModalHeader>
                                        <p className="font font-weight-bold">SILAKAN MASUKKAN DATA ANDA</p>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="row mb-3">
                                            <div className="col-6 m-0">
                                                <input type="text" placeholder="Masukkan Penerima" onChange={(e) => this.setState({namaPenerima: e.target.value})}/><br/>
                                            </div>
                                            <div className="col-6 m-0">
                                                <input type="text" placeholder="Masukkan Alamat" onChange={(e) => this.setState({alamatPenerima: e.target.value})}/><br/>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-6 m-0">
                                                <input type="text" placeholder="Masukkan Kode Pos" onChange={(e) => this.setState({kodePosPenerima: e.target.value})}/><br/>
                                            </div>
                                        </div>
                                        
                                        <h6 className="font font-weight-bold">SILAKAN MASUKKAN UANG ANDA</h6>
                                        Rp. <input type="number" placeholder="Masukkan Nominal" onChange={(e) => this.setState({inputUang: e.target.value})}/> <br/><br/>
                                        {
                                            this.state.kembalianUang == null
                                            ?
                                            null
                                            :
                                            <>
                                            {
                                                this.state.kembalianUang > 0
                                                ?
                                                <h6>Uang anda kurang Rp. {this.state.kembalianUang}. Mohon input kembali!</h6>
                                                :
                                                <>
                                                {
                                                    this.state.kembalianUang === 0
                                                    ?
                                                    <h6>Uang Anda Pas.</h6>
                                                    :
                                                    <h6>Kembalian Anda Rp. {Math.abs(this.state.kembalianUang)}.</h6>
                                                }
                                                </>
                                            }
                                            </>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        {
                                            this.state.submitModal === true
                                            ?
                                            <>
                                            <Button color="success" onClick={this.prosesUang}>SUBMIT</Button>
                                            <Button color="secondary" onClick={() => this.setState({paymentMode: false, inputUang: '', kembalianUang: null, submitModal: true})}>CANCEL</Button>
                                            </>
                                            :
                                            <>
                                            {
                                                this.state.namaPenerima === '' || this.state.alamatPenerima === '' || this.state.kodePosPenerima === ''
                                                ?
                                                <>
                                                  <p style={{color: "red"}}>Mohon Lengkapi Dulu Data Pengiriman</p>  
                                                </>
                                                :
                                                <Button color="success" onClick={this.resetDanSubmitHistory}>OK</Button>
                                            }
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

export default connect(mapStateToProps, {firstCheckOutClicked})(Keranjang)