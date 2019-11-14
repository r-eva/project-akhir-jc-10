import React, { Component } from 'react';
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'

class PesananBulanIni extends Component {

    state = {
        daftarPesananBulanIni: [],
        jumlahBoxTerjualBulanIni: 0,
        produkTerbaik: '',
        userTerbaik: ''
    }

    componentDidMount () {
        this.getPesananBulanIni()
        this.getJumlahBoxTerjualBulanIni()
        this.getProdukTerbaik()
        this.getUserTerbaik()
    }

    getPesananBulanIni = () => {
        Axios.get(urlApi + 'pesanan/getPesananBulanIni')
        .then(res => {
            this.setState({daftarPesananBulanIni: res.data})
            console.log(this.state.daftarPesananBulanIni)
        }).catch(err => {
            console.log(err)
        })
    }

    getJumlahBoxTerjualBulanIni = () => {
        Axios.get(urlApi + 'pesanan/jumlahBoxTerjualBulanIni')
        .then(res => {
            this.setState({jumlahBoxTerjualBulanIni: res.data[0].TotalBox})
        }).catch(err => {
            console.log(err)
        })
    }

    getProdukTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarProdukTerbaik')
        .then(res => {
            this.setState({produkTerbaik: res.data[0]})
        }).catch(err => {
            console.log(err)
        })
    }

    getUserTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarUserTerbaik')
        .then(res => {
            this.setState({userTerbaik: res.data[0]})
        }).catch(err => {
            console.log(err)
        })
    }

    totalPendapatan = () => {
        var totalPendapatan = 0
        this.state.daftarPesananBulanIni.map(val => {
            return totalPendapatan = totalPendapatan + val.TotalBelanja
        })
        return new Intl.NumberFormat('id-ID').format(totalPendapatan)
    }

    render() {
        return (
            <div>
                <div className="card mb-3">
                    <div className="card-header text-center bg-success">
                        <h3>Seluruh Pesanan Bulan Ini</h3>
                    </div>
                    <div className="card-body">
                        {
                            this.state.daftarPesananBulanIni.length > 0
                            ?
                            <>
                                <div className="row">
                                    <div className="col-6">
                                        <h6>Total Pendapatan: Rp. {this.totalPendapatan()} / {this.state.daftarPesananBulanIni.length} transaksi</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6>Total Box Terjual: {this.state.jumlahBoxTerjualBulanIni} box</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h6>User Terbaik/id: {this.state.userTerbaik.username}/{this.state.userTerbaik.UserId} &nbsp;&nbsp; Rp. {new Intl.NumberFormat('id-ID').format(this.state.userTerbaik.TotalBelanjaan)}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6>Paket Terlaris: {this.state.produkTerbaik.namaPaket} / {this.state.produkTerbaik.totalTerjual} box</h6>
                                    </div>
                                </div>
                            </>
                            :
                            <h5 className="text-center">Belum Ada Pesanan Bulan Ini</h5>
                        }       
                    </div>
                </div>
            </div>
        );
    }
}

export default PesananBulanIni;