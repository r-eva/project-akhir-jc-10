import React, { Component } from 'react'
import './History.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol} from "mdbreact";
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'
import foto from '../../fotoku/histori.jpeg'

class History extends Component {

    state = {
        history: [],
        historyDetail: [],
        belanjaDiproses: null,
        keluarBoxPembayaran: null,
        buktiPembayaran: null,
        uploadBuktiBayarSuccess: false,
        keluarHistory: null,
        historyMode: false
    }

    componentDidMount() {
        this.getDataApi(this.props.userId)
    }

    getDataApi = (userId) => {
        Axios.get(urlApi + `history/getHistoryByIdUser/` + userId)
        .then((res)=>{
            this.setState({history: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDetailHistory = (idHistory) => {
        Axios.get(urlApi + `history/getHistoryDetailById/` + idHistory)
            .then((res)=>{
                this.setState({historyDetail: res.data, keluarHistory: 1, historyMode: true})       
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderHistoryDetail = () => {
        var jsx = this.state.historyDetail.map((val, idx) => {
            return (
                    <div key = {val.id} >
                        <p>{idx + 1}. Package {val.namaPaket} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: {val.harga} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discount: {val.discount} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount of Box: {val.JumlahBox} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Date: {val.TanggalMulai.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Date: {val.TanggalBerakhir.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration: {val.Durasi} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: {val.Durasi * val.JumlahBox * (val.harga - (val.harga * val.discount/100))} <br/>
                        </p>
                    </div>      
                    )
        })
        return jsx
    }

    onBtnDeleteHistoryClick = (idHistory) => {
        Axios.put(urlApi + 'history/cancelHistoryById/' + idHistory)
        .then(res => {
            this.getDataApi(this.props.userId)
        }).catch(err=> {
            swal ('Eror', 'Server Error', 'error')
            console.log(err)
        })
    }

    renderHistory = () => {
        var jsx = this.state.history.map((val) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{val.TotalBelanja}</td>
                    <td>{val.Status}</td>
                    <td>{val.BatasAkhirBayar}</td>
                    <td><input type="button" className="btn btn-info btn-block" value="Detail" onClick={() => this.getDetailHistory(val.id)}/></td>
                    {
                        val.Cancel === 0
                        ?
                        <>  
                            {
                                val.Status === 'Waiting for Admin Confirmation' || val.Status === 'PAID OFF' || val.Status === 'REJECT BY ADMIN'
                                ?
                                <>
                                <td><input type="button" className="btn btn-dark btn-block" value="Cancel" disabled/></td>
                                <td><input type="button" className="btn btn-dark btn-block" value="Upload Payment Receipt" disabled/></td>
                                </>
                                :
                                <>
                                <td><input type="button" className="btn btn-danger btn-block" value="Cancel" onClick={()=> this.onBtnDeleteHistoryClick(val.id)}/></td>
                                <td><input type="button" className="btn btn-success btn-block" value="Upload Payment Receipt" onClick={() => this.setState({keluarBoxPembayaran: 1, belanjaDiproses: val})}/></td>
                                </>
                                
                            }
                        </>
                        :
                        <>
                            <td><button type="button" className="btn btn-dark btn-block" disabled>Cancel</button></td>
                            <td><input type="button" className="btn btn-dark btn-block" value="Upload Bukti Bayar" disabled/></td> 
                        </>
                        
                    }
                    
                </tr>
            )
        })
        return jsx
    }

    imagePembayaranChosed = (e) => {
        if(e.target.files[0]) {
            this.setState({ buktiPembayaran: e.target.files })
        } else {
            this.setState({ buktiPembayaran: null })
        }
    }

    uploadBuktiBayar = (id) => {
        if (this.state.buktiPembayaran === null) {
            swal ('Error', `Please import your payment receipt!`, 'error')
        } else { 
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.buktiPembayaran[0])

            Axios.put(urlApi + 'history/uploadBuktiPembayaran/' + id, formdata, options)
                .then(res => {
                    this.setState({uploadBuktiBayarSuccess: true})
                    this.submitPembayaranSukses(this.state.belanjaDiproses.id)
                }).catch(err => {
                    console.log(err.response)
                    swal ('Eror', 'Failed to upload your payment receipt, please check format of your file!', 'error')
                })
        }
        
    }

    submitPembayaranSukses = (id) => { 
        Axios.put(urlApi + 'history/pembayaranSubmit/' + id)
        .then((res)=>{
            this.getDataApi(this.props.userId)
            this.setState({belanjaDiproses: null,
                keluarBoxPembayaran: null,
                buktiPembayaran: null,
                uploadBuktiBayarSuccess: false})
            })
            swal ('Thank you for shopping!', `Your order will be sent to your place shortly.`, 'success')
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        if (this.props.role === 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-center" style={{ backgroundImage: `url(${foto})`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <div className="pt-5 pb-5">
                            <div className="pt-5 mt-5">
                                <h1 style={{marginRight: '540px', marginLeft: '540px'}} className="title-product-detail h1-responsive font-weight-bold bg-rgba(244, 67, 54, 0.7) rgba-red-strong">HISTORY</h1>
                            </div>
                            <div className="mx-md-5 px-md-5">
                                <p className="mx-4 mx-md-5 pl-md-5 pr-md-5 bg-rgba(255, 255, 255, 0.7) rgba-white-strong font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>
                                    “Eat food. Not too much. Mostly plants.”<br/>
                                    <span style={{fontSize: '15px', fontFamily: 'sans-serif'}}>― Michael Pollan, In Defense of Food: An Eater's Manifesto</span>
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                {
                    this.state.history.length === 0
                    ?
                    <h1 className="text-center mt-5" style={{marginBottom: '500px'}}>YOUR HISTORY IS EMPTY</h1>
                    :
                    <div className="container-fluid">
                        <div className="card mb-5">
                            <div className="card-body">
                                <MDBTable hover scrollY maxHeight="100vh">
                                    <MDBTableHead color="success-color text-center text-white">
                                        <tr>
                                            <th className="font-weight-bold">TRANSACTION DATE</th>
                                            <th className="font-weight-bold">TOTAL INVOICE</th>
                                            <th className="font-weight-bold">STATUS</th>
                                            <th className="font-weight-bold">PAYMENT DEADLINE</th>
                                            <th className="font-weight-bold">DETAIL</th>
                                            <th className="font-weight-bold">CANCEL</th>
                                            <th className="font-weight-bold">PAY</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.renderHistory()}
                                    </MDBTableBody>
                                
                                </MDBTable>
                            </div>
                        </div>
                        {
                            this.state.keluarBoxPembayaran === 1
                            ?
                            <div className="row justify-content-center mb-5">
                                <div className="col-5 mb-3">
                                    <div className="card-header text-center font-weight-bold">
                                        <h5>Please Upload Your Payment Receipt</h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <input type="file" onChange={this.imagePembayaranChosed}/>
                                    </div>
                                    <div className="card-footer text-center">
                                        {
                                            this.state.uploadBuktiBayarSuccess === true 
                                            ?
                                            null
                                            :
                                            <div className="row justify-content-end">
                                                <input type="button" value="Upload" className="btn btn-success" onClick={() => this.uploadBuktiBayar(this.state.belanjaDiproses.id)} />
                                                <input type="button" value="Cancel" className="btn btn-danger" onClick={() => this.setState({keluarBoxPembayaran: null})}/>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            :
                            null                       
                        }
                        {
                            this.state.keluarHistory === 1 
                            ?
                            <>
                                <Modal isOpen={this.state.historyMode}>
                                    <ModalHeader className="bg-warning text-center justify-content-center ">
                                        <p className="font-weight-bold" style={{fontSize: '20px'}}>YOUR TRANSACTION DETAIL</p>
                                    </ModalHeader>
                                    <ModalBody>
                                        {this.renderHistoryDetail()}
                                        <br/>
                                        <div className="font-weight-bold">
                                            &nbsp;&nbsp;&nbsp;&nbsp;TOTAL: Rp. {this.state.historyDetail[0].TotalBelanja} <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;Recipient Name: {this.state.historyDetail[0].NamaPenerima} <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;Delivery Address: {this.state.historyDetail[0].AlamatPenerima} <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;Postal Code: {this.state.historyDetail[0].KodePosPenerima} <br/>
                                            <br/>
                                            <br/>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="success" onClick={() => this.setState({keluarHistory: null, historyMode: false, historyDetail: []})}>OK</Button>
                                    </ModalFooter>    
                                </Modal>
                            </>
                            :
                            null
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        userId: state.user.id,
        role: state.user.role
    }
}

export default connect(mapStateToProps)(History);