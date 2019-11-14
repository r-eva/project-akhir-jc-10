import React, { Component } from 'react';
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'
import moment from 'moment'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'

class DaftarPesanan extends Component {

    state = {
        seluruhPesananHariIni: [],
        tanggalDitambahkan: null
    }

    componentDidMount() {
        this.getJumlahPesanan(moment().add(this.props.tanggalDitambahkan, 'days').format("YYYY-MM-DD").toString())
    }

    componentDidUpdate() {
        if (this.state.tanggalDitambahkan !== this.props.tanggalDitambahkan) {
            this.getJumlahPesanan(moment().add(this.props.tanggalDitambahkan, 'days').format("YYYY-MM-DD").toString())
        }   
    }

    getJumlahPesanan = (tanggalJadwal) => {
        Axios.get(urlApi + 'jadwalAdmin/getJumlahPesananPerhari/' + tanggalJadwal)
        .then(res => {
            this.setState({seluruhPesananHariIni: res.data, tanggalDitambahkan: this.props.tanggalDitambahkan})
        }).catch(err => {
            console.log(err)
        })   
    }

    renderListPesanan = () => {
        console.log(this.state.seluruhPesananHariIni)        
        if (this.state.seluruhPesananHariIni.length !== 0) {
            var jsx = this.state.seluruhPesananHariIni.map(val => {
                return (
                    <tr key={val.id} className="text-center">
                        <td>{val.idUser}</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.TanggalMulai.slice(0, 10)}</td>
                        <td>{val.TanggalBerakhir.slice(0, 10)}</td>
                        <td>{val.JumlahBox}</td>
                        <td><input type="button" className='btn btn-info' value="Detail" /></td>
                    </tr>
                )
            })
            return jsx
        }

       
    }

    render() {
        return (
            <div className="card mb-5">
                <div className="card-header text-center bg-success">
                    <h3>Dafar Pesanan {moment().add(this.props.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h3>
                </div>
                <div className="card-body">
                    {
                        this.state.seluruhPesananHariIni.length > 0
                        ?
                        <MDBTable hover scrollY maxHeight="60vh">
                        <MDBTableHead color="secondary-color text-center">
                            <tr>
                                <th>UserID</th>
                                <th>Paket</th>
                                <th>Mulai</th>
                                <th>Sampai</th>
                                <th>Jumlah Box</th>
                                <th>Detail</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.renderListPesanan()}
                        </MDBTableBody>
                        </MDBTable>
                        :
                        <h5 className="text-center">Belum Ada Pesanan Hari Ini</h5>
                    }       
                </div>
            </div>
        );
    }
}

export default DaftarPesanan;