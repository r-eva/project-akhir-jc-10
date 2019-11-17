import React, { Component } from 'react';
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {urlApi} from '../../../helpers/database'
import moment from 'moment'
import TransaksiMenunggu from './TransaksiMenunggu'
import DaftarPesanan from './DaftarPesanan'
import PesananBulanIni from './PesananBulanIni'
import './jadwalAdmin.css'

class jadwalAdmin extends Component {

    state = {
        dataLangganan: [],
        allJadwalLangganan: [],
        pageContent: 0,
        tanggalHariIni: moment().format("D MMMM YYYY"),
        tanggalDitambahkan: 0,
    }

    componentDidMount () {
        this.getDataLangganan()
    }

    /////////////////////////////////////////////////////////GET API DATA////////////////////////////////////////////
    getDataLangganan = () => {
        var jumlahHariBulanIni = moment().daysInMonth()
        Axios.get(urlApi + 'jadwalAdmin/getKategoriLangganan')
        .then(res => {
            this.setState({dataLangganan: res.data, pageContent: res.data.length})

            var arrayJadwal = []
            for (var i = 0; i < res.data.length; i++) {
                Axios.get(urlApi + 'jadwalAdmin/getJadwalLangganan/' + res.data[i].id)
                .then(res => {
                    arrayJadwal.push(res.data)

                    if (arrayJadwal.length === this.state.dataLangganan.length) {

                        for (var j = 0; j < arrayJadwal.length; j ++) {
                            var loopingJadwal = []
                            for (var k = 0; k < Math.ceil(jumlahHariBulanIni / arrayJadwal[j].length); k++) {
                                for (var l = 0; l < arrayJadwal[j].length; l++) {
                                    loopingJadwal.push(arrayJadwal[j][l])

                                    var tanggalHariIni = moment().format("dddd, MMMM Do YYYY")
                                    var slicer = Number(new Date().getDate()) - 1
                                    var jadwalSebulanFixed = loopingJadwal.slice(0, jumlahHariBulanIni)
                                    var sisaJadwalBulanIni = jadwalSebulanFixed.slice(slicer)

                                    var tempJadwalPaketSampaiAkhirBulan = []
                                    for (var m = 0; m < sisaJadwalBulanIni.length; m ++) {
                                        if (m > 0) {
                                            var arraySelanjutya = {...sisaJadwalBulanIni[m], tanggal: moment().add(m, 'days').format("dddd, MMMM Do YYYY")}
                                            tempJadwalPaketSampaiAkhirBulan.push(arraySelanjutya)
                                        } else {
                                            var array1 = {...sisaJadwalBulanIni[0], tanggal: tanggalHariIni}
                                            tempJadwalPaketSampaiAkhirBulan.push(array1)
                                        }
                                    }

                                }
                            }
                            arrayJadwal[j] = tempJadwalPaketSampaiAkhirBulan

                            var ubahJadwal = []
                            for (var n = 0; n < sisaJadwalBulanIni.length; n++) {
                                ubahJadwal[n] = []
                                for (var o = 0; o < this.state.pageContent; o ++) {
                                    ubahJadwal[n].push(arrayJadwal[o][n])
                                }
                            }
                        }
                        this.setState({allJadwalLangganan: ubahJadwal})
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    ////////////////////////////////////////////////FUNGSI RENDER///////////////////////////////////////////////////////

    renderJadwalMemasak = () => {
        if (this.state.allJadwalLangganan.length !== 0) {
            var jsx = this.state.allJadwalLangganan[this.state.tanggalDitambahkan].map(val => {
                return (
                    <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.Menu}</td>
                    </tr>
                )
            })
            return jsx
        }
    }

    render() {
        if(this.props.user.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
            <div className='background-main-admin'>
            <div className="pt-md-5 mt-5 mx-4">
                <div className="mt-md-5 pt-md-3">
                    <div className="card mb-5">
                        <div className="card-header text-center bg-info">
                            <h3>JADWAL CATERING DAN TRANSAKSI BULAN INI</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5">
                                    <div className="card mb-5">
                                        <div className="card-header text-center bg-success">
                                            <h3>Jadwal Catering</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-5">
                                                    <h6 style={{paddingTop: '20px'}}>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
                                                </div>
                                                <div className="col-7 text-right">
                                                    <div className="row mb-3">
                                                        <div className="col-6">
                                                            {
                                                                this.state.tanggalDitambahkan === 0
                                                                ?
                                                                <button type="button" className="btn btn-dark btn-block" disabled>Back</button>
                                                                :
                                                                <button type="button" className="btn btn-success btn-block" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan - 1})}>Back</button>
                                                            }
                                                        
                                                        </div>
                                                        <div className="col-6">
                                                            {
                                                                moment().add(this.state.tanggalDitambahkan, 'days').format("D") === `${moment().daysInMonth()}`
                                                                ?
                                                                <button type="button" className="btn btn-dark btn-block" disabled>Next</button>
                                                                :
                                                                <button type="button" className="btn btn-success btn-block" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 1})}>Next</button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <MDBTable scrollY maxHeight="110vh">
                                                        <MDBTableHead color="secondary-color">
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Paket</th>
                                                                <th>Menu</th>
                                                            </tr>
                                                        </MDBTableHead>
                                                        <MDBTableBody>
                                                            {this.renderJadwalMemasak()}   
                                                        </MDBTableBody>
                                                    </MDBTable>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <TransaksiMenunggu/>
                                    <DaftarPesanan tanggalDitambahkan={this.state.tanggalDitambahkan}/>
                                    <PesananBulanIni/>
                                </div>
                            </div>
                        </div>
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