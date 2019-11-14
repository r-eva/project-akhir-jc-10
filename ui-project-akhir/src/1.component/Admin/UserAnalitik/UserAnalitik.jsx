import React, { Component } from 'react';
import { MDBTableHead, MDBTable, MDBTableBody } from 'mdbreact'
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'

class Transaksi extends Component {

    state = {
        daftarUser: [],
        daftarUserTerbaik: []
    }

    componentDidMount(){
        this.getAllUsers()
        this.getDaftarUserTerbaik()
    }

    getAllUsers = () => {
        Axios.get(urlApi + 'user/getAllUsers')
        .then(res => {
            this.setState({daftarUser: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    getDaftarUserTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarUserTerbaik')
        .then(res => {
            this.setState({daftarUserTerbaik: res.data})
            console.log(this.state.daftarUserTerbaik)
        }).catch(err => {
            console.log(err)
        })
    }

    renderDataUsers = () => {
        return this.state.daftarUser.map(val => {
            return (
                <tr key={val.id} className='text-dark'>
                    <td>{val.id}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td>{val.status}</td>
                    <td>{val.tanggalBergabung.slice(0, 10)}</td>
                    <td>{val.role}</td>
                </tr>
            )
        })
    }

    renderTransaksiUsers = () => {
        return this.state.daftarUserTerbaik.map(val => {
            return (
                <tr key={val.UserId} className='text-dark'>
                    <td>{val.username}</td>
                    <td>{val.UserId}</td>
                    <td>Rp. {new Intl.NumberFormat('id-ID').format(val.TotalBelanjaan)}</td>
                    <td>{val.JumlahTransaksi}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className='container-fluid mt-5 pt-md-5'>
                <div className="row mt-5 mb-5 mr-3 ml-3">
                    <div className="col-7">
                        <div className="card">
                            <div className="card-header text-center bg-info">
                                <h3>USERS DATA</h3>
                            </div>
                            <div className="card-body mx-3">
                                <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                    <MDBTableHead color="secondary-color">
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Register Date</th>
                                            <th>Role</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.renderDataUsers()}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className="card">
                            <div className="card-header text-center bg-info">
                                <h3>User Transaction Ranking</h3>
                            </div>
                            <div className="card-body mx-3">
                                <MDBTable hover className="text-white text-center" scrollY maxHeight="60vh">
                                    <MDBTableHead color="secondary-color">
                                        <tr>
                                            <th>Username</th>
                                            <th>UserId</th>
                                            <th>Total</th>
                                            <th>Jumlah Trs</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.renderTransaksiUsers()}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transaksi;