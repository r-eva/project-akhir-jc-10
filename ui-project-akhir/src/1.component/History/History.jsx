import React, { Component } from 'react'
import './History.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class History extends Component {

    state = {
        history: [],
        historyDetail: [],
        belanjaDiproses: null,
        inputUang: '',
        kembalianUang: null,
        keluarModal: null,
        submitModal: false,
        paymentMode: false,
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
                        <p>{idx + 1}. Paket {val.namaPaket} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harga: {val.harga} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diskon: {val.discount} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jumlah Box: {val.JumlahBox} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Berakir: {val.TanggalBerakhir.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Mulai: {val.TanggalMulai.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Durasi: {val.Durasi} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total: {val.TotalHarga} <br/>
                        </p>
                    </div>      
                    )
        })
        return jsx
    }

    onBtnDeleteHistoryClick = (idHistory) => {
        Axios.put(urlApi + 'history/cancelHistoryById/' + idHistory)
        .then(res => {
            this.setState({historyDetail: res.data})
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
                                val.status === 'Lunas'
                                ?
                                <>
                                <td><input type="button" className="btn btn-danger btn-block" value="Cancel"/></td>
                                <td><input type="button" className="btn btn-block btn-block" value="Bayar"/></td>
                                </>
                                :
                                <>
                                <td><input type="button" className="btn btn-danger btn-block" value="Cancel" onClick={()=> this.onBtnDeleteHistoryClick(val.id)}/></td>
                                <td><input type="button" className="btn btn-success btn-block" value="Bayar" onClick={() => this.setState({keluarModal: 1, paymentMode: true, belanjaDiproses: val})}/></td>
                                </>
                                
                            }
                        </>
                        :
                        <>
                            <td><button type="button" className="btn btn-dark btn-block" disabled>Cancel</button></td>
                            <td><input type="button" className="btn btn-dark btn-block" value="Bayar" disabled/></td> 
                        </>
                        
                    }
                    
                </tr>
            )
        })
        return jsx
    }

    prosesUang = () => {
        var total = this.state.belanjaDiproses.TotalBelanja
        var tempKembalianUang
        if (Number(this.state.inputUang) - total >= 0) {
            this.setState({submitModal: true})
            tempKembalianUang = total - Number(this.state.inputUang)
            return this.setState({kembalianUang: tempKembalianUang})
        } else if (Number(this.state.inputUang) - total  < 0) {
            this.setState({submitModal: false})
            tempKembalianUang = total - Number(this.state.inputUang)
            return this.setState({kembalianUang: tempKembalianUang})
        } else {
            return this.setState({submitModal: false})
        }
    }

    submitPembayaranSukses = (id) => {
        this.setState({inputUang: '',
                        kembalianUang: null,
                        keluarModal: null,
                        submitModal: false,
                        paymentMode: false})
        Axios.put(urlApi + 'history/pembayaranLunas/' + id)
        .then((res)=>{
            this.setState({belanjaDiproses: null})
        })
        .catch((err) => {
            console.log(err)
        })
        swal ('Terima kasih telah berbelanja!', `Pesanan anda segera dikirimkan ke tempat tujuan.`, 'success')
    }

    render() {
        if (this.props.role === 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">HISTORY</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container-fluid">
                <table className='table mt-3 mb-5'>
                    <thead>
                    <tr className="text-center">
                        <th>Tanggal Transaksi</th>
                        <th>Total Tagihan</th>
                        <th>Status</th>
                        <th>Batas Waktu Pembayaran</th>
                        <th>Detail</th>
                        <th>Cancel</th>
                        <th>Bayar</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                </table>
                {
                    this.state.keluarModal === 1
                    ?
                    <>
                        <Modal isOpen={this.state.paymentMode}>
                            <ModalHeader>
                                <p className="font font-weight-bold">SILAKAN MASUKKAN DATA ANDA</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Total Tagihan Anda Rp. {this.state.belanjaDiproses.TotalBelanja}</p>
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
                                                <h6 style={{color: 'red'}}>Uang anda kurang Rp. {this.state.kembalianUang}. Mohon input kembali!</h6>
                                                :
                                                <>
                                                    {
                                                        this.state.kembalianUang === 0
                                                        ?
                                                        <h6 style={{color: 'green'}}>Uang Anda Pas.</h6>
                                                        :
                                                        <h6 style={{color: 'green'}}>Kembalian Anda Rp. {Math.abs(this.state.kembalianUang)}.</h6>
                                                    
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                            </ModalBody>
                            <ModalFooter>
                            {
                                this.state.submitModal === false
                                ?
                                <>
                                    <Button color="success" onClick={this.prosesUang}>SUBMIT</Button>
                                    <Button color="secondary" onClick={() => this.setState({keluarModal: 0, paymentMode: false, submitModal: false, kembalianUang: null})}>CANCEL</Button>
                                </>
                                :
                                <Button color="success" onClick={() => this.submitPembayaranSukses(this.state.belanjaDiproses.id)}>OK</Button>
                            }     
                            </ModalFooter>
                        </Modal>
                    </>
                    :
                    null
                }
                {
                    this.state.keluarHistory === 1 
                    ?
                    <>
                        <Modal isOpen={this.state.historyMode}>
                            <ModalHeader>
                                <p className="font font-weight-bold">DETAIL TRANSAKSI ANDA</p>
                            </ModalHeader>
                            <ModalBody>
                                {this.renderHistoryDetail()}
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