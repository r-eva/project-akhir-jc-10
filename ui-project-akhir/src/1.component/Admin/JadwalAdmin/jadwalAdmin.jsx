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
import ProductSalesRanking from './productSalesRanking'
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

    cekHari = () => {
        if (moment().add(this.state.tanggalDitambahkan, 'days').format("dddd") === "Sunday") {
            this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 1})
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        } else if (moment().add(this.state.tanggalDitambahkan, 'days').format("dddd") === "Saturday") {
            this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 2})
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        } else {
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        }
    }

    ////////////////////////////////////////////////FUNGSI RENDER///////////////////////////////////////////////////////

    renderJadwalMemasak = () => {
        if (this.state.allJadwalLangganan.length !== 0) {
            var jsx = this.state.allJadwalLangganan[this.state.tanggalDitambahkan].map(val => {
                return (
                    <tr key={val.id} className="text-center">
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
            <div className="background-main-admin">
                <div className="container-fluid card-main card-main-mobile">
                                <div className="row mx-3">
                                    <div className="col-12 col-md-5">
                                        <div className="card my-4">
                                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                                <h3>CATERING SCHEDULE</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row my-3">
                                                    <div className="col-5">
                                                        {this.cekHari()}
                                                    </div>
                                                    <div className="col-7 text-right">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {
                                                                    this.state.tanggalDitambahkan === 0
                                                                    ?
                                                                    <button className="btn btn-dark btn-block p-1 m-0" disabled>Back</button>
                                                                    :
                                                                    <>
                                                                    {
                                                                        moment().add(this.state.tanggalDitambahkan - 1, 'days').format("dddd") === 'Sunday' 
                                                                        ?
                                                                        <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan - 3})}>Back</button>
                                                                        :
                                                                        <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan - 1})}>Back</button>
                                                                    }
                                                                    </>
                                                                    
                                                                }
                                                            
                                                            </div>
                                                            <div className="col-6">
                                                                {
                                                                    moment().add(this.state.tanggalDitambahkan, 'days').format("D") === `${moment().daysInMonth()}`
                                                                    ?
                                                                    <button className="btn btn-dark btn-block p-1 m-0" disabled>Next</button>
                                                                    :
                                                                    <>
                                                                    {
                                                                        moment().add(this.state.tanggalDitambahkan + 1, 'days').format("dddd") === 'Saturday' 
                                                                        ?
                                                                        <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 3})}>Next</button>
                                                                        :
                                                                        <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 1})}>Next</button>
                                                                    }
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <MDBTable scrollY maxHeight="100vh">
                                                            <MDBTableHead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Package</th>
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
                                    <div className="col-12 col-md-7 my-4">
                                        <DaftarPesanan tanggalDitambahkan={this.state.tanggalDitambahkan}/>
                                        <PesananBulanIni/>
                                    </div>
                                </div>
                                <div className="row mx-3">
                                    <div className="col-12 mt-4">
                                        <TransaksiMenunggu/>
                                    </div>
                                </div>
                                <div className="row my-5 mx-3">
                                    <div className="col-12">
                                        <ProductSalesRanking/>
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