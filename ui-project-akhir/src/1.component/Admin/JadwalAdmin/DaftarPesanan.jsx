import React, { Component } from 'react';
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'
import moment from 'moment'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DaftarPesanan extends Component {

    state = {
        seluruhPesananHariIni: [],
        tanggalDitambahkan: null,
        detailPesanan: null,
        pesananMode: false,
        detailPesananDipilih: null
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

    getDetailPesanan = (historyDipilih) => {
        this.setState({detailPesananDipilih: historyDipilih, detailPesanan: true, pesananMode: true})
    }

    renderListPesanan = () => {       
        if (this.state.seluruhPesananHariIni.length !== 0) {
            var jsx = this.state.seluruhPesananHariIni.map(val => {
                return (
                    <tr key={val.id} className="text-center">
                        <td>{val.idUser}</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.TanggalMulai.slice(0, 10)}</td>
                        <td>{val.TanggalBerakhir.slice(0, 10)}</td>
                        <td>{val.JumlahBox}</td>
                        <td><input type="button" className='btn btn-info' value="Detail" onClick={() => this.getDetailPesanan(val)}/></td>
                    </tr>
                )
            })
            return jsx
        }

       
    }

    render() {
        return (
            <div>
                <div className="card mb-3">
                    <div className="card-header text-center bg-success">
                        <h3>Daftar Pesanan {moment().add(this.props.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h3>
                    </div>
                    <div className="card-body">
                        {
                            this.state.seluruhPesananHariIni.length > 0
                            ?
                            <MDBTable hover scrollY maxHeight="60vh">
                            <MDBTableHead color="secondary-color text-center">
                                <tr>
                                    <th>User ID</th>
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
                {
                    this.state.detailPesanan
                    ?
                        <>
                            <Modal isOpen={this.state.pesananMode}>
                                <ModalHeader>
                                    <p className="font font-weight-bold">DETAIL PESANAN</p>
                                </ModalHeader>
                                <ModalBody>
                                    <p> Username: {this.state.detailPesananDipilih.username} <br/>
                                        Nama Paket: {this.state.detailPesananDipilih.namaPaket} <br/>
                                        Jumlah Box: {this.state.detailPesananDipilih.JumlahBox} <br/>
                                        Tanggal Mulai Langganan: {this.state.detailPesananDipilih.TanggalMulai} <br/>
                                        Tanggal Berakhir: {this.state.detailPesananDipilih.TanggalBerakhir} <br/>
                                        Penerima: {this.state.detailPesananDipilih.NamaPenerima} <br/>
                                        Alamat Penerima: {this.state.detailPesananDipilih.AlamatPenerima} <br/>
                                        Kode pos: {this.state.detailPesananDipilih.KodePosPenerima}
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={() => this.setState({detailPesananDipilih: null, detailPesanan: false, pesananMode: false})}>OK</Button>
                                </ModalFooter>    
                            </Modal>
                        </>
                    :
                    null
                }
            </div>
        );
    }
}

export default DaftarPesanan;