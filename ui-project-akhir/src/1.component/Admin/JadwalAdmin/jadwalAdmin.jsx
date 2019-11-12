import React, { Component } from 'react';
import { MDBTableHead, MDBTable, MDBTableBody, MDBIcon} from 'mdbreact'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {urlApi} from '../../../helpers/database'
import moment from 'moment'

class jadwalAdmin extends Component {

    state = {
        dataLangganan: [],
        pageContent: 0,
        tanggalHariIni: moment().format("D MMMM YYYY")
    }

    componentDidMount () {
        this.getDataLangganan()
    }

    getDataLangganan = () => {
        Axios.get(urlApi + 'jadwalAdmin/getKategoriLangganan')
        .then(res => {
            this.setState({dataLangganan: res.data, pageContent: res.data.length})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if(this.props.user.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
            <div className="container pt-md-5 mt-5">
                <div className="mt-md-5 pt-md-3">
                    <div className="card mb-5">
                        <div className="card-header text-center bg-info">
                            <h3>JADWAL CATERING BULAN INI</h3>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="row">
                                    <div className="col-6">
                                        <h6>Tanggal: {this.state.tanggalHariIni}</h6>
                                    </div>
                                    <div className="col-6 text-right">
                                        <MDBIcon icon="chevron-circle-right" gradient="aqua" size="lg"/>
                                    </div>
                                </div>
                            </div>
                            <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                <MDBTableHead color="secondary-color text-center">
                                    <tr>
                                        <th>Nama Paket</th>
                                        <th>Menu</th>
                                        <th>Jumlah Pesanan</th>
                                        <th>Detail</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                              
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(jadwalAdmin);