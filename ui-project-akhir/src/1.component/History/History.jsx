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
                        <p>{idx + 1}. Paket {val.namaPaket} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harga: {val.harga} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diskon: {val.discount} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jumlah Box: {val.JumlahBox} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Berakir: {val.TanggalBerakhir.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Mulai: {val.TanggalMulai.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Durasi: {val.Durasi} <br/>
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
                                val.Status === 'Menunggu Konfirmasi Admin'
                                ?
                                <>
                                <td><input type="button" className="btn btn-dark btn-block" value="Cancel" disabled/></td>
                                <td><input type="button" className="btn btn-dark btn-block" value="Upload Bukti Bayar" disabled/></td>
                                </>
                                :
                                <>
                                <td><input type="button" className="btn btn-danger btn-block" value="Cancel" onClick={()=> this.onBtnDeleteHistoryClick(val.id)}/></td>
                                <td><input type="button" className="btn btn-success btn-block" value="Upload Bukti Bayar" onClick={() => this.setState({keluarBoxPembayaran: 1, belanjaDiproses: val})}/></td>
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
            swal ('Error', `Mohon isi bukti pembayaran!`, 'error')
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
                    swal ('Success', 'Upload bukti pembayaran berhasil!', 'success')
                    this.setState({uploadBuktiBayarSuccess: true})
                }).catch(err => {
                    console.log(err.response)
                    swal ('Eror', 'Upload bukti pembayaran gagal!', 'error')
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
            swal ('Terima kasih telah berbelanja!', `Pesanan anda segera dikirimkan ke tempat tujuan.`, 'success')
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
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">HISTORY</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                {
                    this.state.history.length === 0
                    ?
                    <h1 className="text-center mt-5" style={{marginBottom: '500px'}}>HISTORY ANDA KOSONG</h1>
                    :
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
                            this.state.keluarBoxPembayaran === 1
                            ?
                            <div className="row justify-content-center mb-5">
                                <div className="col-5 mb-3">
                                    <div className="card-header text-center font-weight-bold">
                                        <h5>Silakan Masukkan Bukti Pembayaran Anda</h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <input type="file" onChange={this.imagePembayaranChosed}/>
                                    </div>
                                    <div className="card-footer text-center">
                                        {
                                            this.state.uploadBuktiBayarSuccess === true 
                                            ?
                                            <div className="row justify-content-end">
                                                <input type="button" value="OK" className="btn btn-danger" onClick={() => this.submitPembayaranSukses(this.state.belanjaDiproses.id)}/>
                                            </div>
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