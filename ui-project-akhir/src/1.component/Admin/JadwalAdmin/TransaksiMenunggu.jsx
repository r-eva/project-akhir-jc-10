import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'
import swal from 'sweetalert'

class AdminDashboard extends Component {

    state = {
        listTransaksiMenunggu: []
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

    confirmPembayaran = (id) => {
        Axios.put(urlApi + 'admin/confirmPembayaran/' + id)
        .then((res)=>{
            this.getDataTransaksiMenunggu()
            swal ('Transaksi Sukses dikonfirmasi!', `Cek list pesanan.`, 'success')
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
                            width:'50px', height: '50px', borderRadius: '4px', padding: '5px'
                            }} alt='Cannot Get Transfer Proof'></img></a></td>
                    <td><input type="button" value="Confirm" className="btn btn-success btn-block" onClick={() => this.confirmPembayaran(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }

    render() {
        if (this.props.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
                    <div className="card mb-5">
                        <div className="card-header text-center bg-danger">
                            <h3>Transaksi Menunggu Konfirmasi</h3>
                        </div>
                        <div className="card-body">
                            {
                                this.state.listTransaksiMenunggu.length > 0
                                ?
                                <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                <MDBTableHead color="secondary-color text-center">
                                    <tr>
                                        <th>UserID</th>
                                        <th>Tanggal Transaksi</th>
                                        <th>Total</th>
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStateToProps)(AdminDashboard);