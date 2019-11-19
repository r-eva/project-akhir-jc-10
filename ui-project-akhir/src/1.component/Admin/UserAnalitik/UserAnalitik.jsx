import React, { Component } from 'react';
import { MDBTableHead, MDBTable, MDBTableBody } from 'mdbreact'
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

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
                <tr key={val.id} className='text-dark text-center'>
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
        if (this.props.role !== 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div className="background-main-admin">
            <div className="container-fluid card-main card-main-mobile">
                <div className="row mx-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                <h3>USERS DATA</h3>
                            </div>
                            <div className="card-body mx-3">
                                <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                    <MDBTableHead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
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
                </div>
                <div className="row my-5 mx-3">
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                <h3>USER TRANSACTION RANKING</h3>
                            </div>
                            <div className="card-body mx-3">
                                <MDBTable hover className="text-white text-center" scrollY maxHeight="60vh">
                                    <MDBTableHead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
                                        <tr>
                                            <th>Username</th>
                                            <th>UserId</th>
                                            <th>Total Spending</th>
                                            <th>Total Transaction</th>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}

export default connect(mapStateToProps)(Transaksi);