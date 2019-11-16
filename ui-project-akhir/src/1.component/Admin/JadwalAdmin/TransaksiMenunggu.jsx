import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert'

class AdminDashboard extends Component {

    state = {
        listTransaksiMenunggu: [],
        historyDetail: [],
        keluarHistory: null,
        historyMode: false
    }

    componentDidMount(){
        this.getDataTransaksiMenunggu()
    }

    componentDidUpdate() {
        this.renderTransaksiMenunggu()
    }

    getDataTransaksiMenunggu = () => {
        Axios.get(urlApi + 'admin/getTransaksiMenunggu')
        .then((res) => {
            this.setState({listTransaksiMenunggu: res.data})
        }).catch((err) => {
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

    confirmPembayaran = (id) => {
        Axios.put(urlApi + 'admin/confirmPembayaran/' + id)
        .then((res)=>{
            window.location.reload()
            this.getDataTransaksiMenunggu()
            swal ('Transaksi Sukses dikonfirmasi!', `Silakan Cek list pesanan.`, 'success')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderTransaksiMenunggu = () => {
        var jsx = this.state.listTransaksiMenunggu.map(val => {
            return (
                <tr key={val.id} className='text-dark text-center' style={{cursor: 'pointer'}}>
                    <td>{val.UserId}</td>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{val.TotalBelanja}</td>
                    <td><a href={`${urlApi}${val.buktiPembayaranPath}`}><img src={`${urlApi}${val.buktiPembayaranPath}`} style={{
                            width:'70px', height: '70px', borderRadius: '4px', padding: '5px'
                            }} alt='Cannot Get Transfer Proof'></img></a>
                    </td>
                    <td><input type="button" value="DETAIL" className="btn btn-info btn-block" onClick={() => this.getDetailHistory(val.id)}/></td>
                    <td><input type="button" value="Confirm" className="btn btn-success btn-block" onClick={() => this.confirmPembayaran(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }

    renderHistoryDetail = () => {
        var jsx = this.state.historyDetail.map((val, idx) => {
            return (
                    <div key = {val.id} >
                        <p>{idx + 1}. Paket {val.namaPaket} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harga: {val.harga} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diskon: {val.discount} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jumlah Box: {val.JumlahBox} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Mulai: {val.TanggalMulai.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tanggal Berakhir: {val.TanggalBerakhir.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Durasi: {val.Durasi} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: {val.Durasi * val.JumlahBox * (val.harga - (val.harga * val.discount/100))} <br/>
                        </p>
                    </div>      
                    )
        })
        return jsx
    }

    render() {
        if (this.props.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
                <div>
                    <div className="card mb-3">
                        <div className="card-header text-center bg-danger">
                            <h3>Transaksi Menunggu Konfirmasi</h3>
                        </div>
                        <div className="card-body">
                            {
                                this.state.listTransaksiMenunggu.length > 0
                                ?
                                <MDBTable hover className="text-white" scrollY maxHeight="50vh">
                                    <MDBTableHead color="secondary-color text-center">
                                        <tr>
                                            <th>Username</th>
                                            <th>Tanggal Transaksi</th>
                                            <th>Total</th>
                                            <th>Detail</th>
                                            <th>Bukti</th>
                                            <th>Konfirmasi</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.renderTransaksiMenunggu()}           
                                    </MDBTableBody>
                                </MDBTable>
                                :
                                <h5 className="text-center">Tidak Ada Transaksi Menunggu Konfirmasi</h5>
                            }
                        </div>
                    </div>
                    {
                        this.state.keluarHistory === 1 
                        ?
                            <>
                                <Modal isOpen={this.state.historyMode}>
                                    <ModalHeader>
                                        <p className="font font-weight-bold">DETAIL TRANSAKSI USER</p>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStateToProps)(AdminDashboard);