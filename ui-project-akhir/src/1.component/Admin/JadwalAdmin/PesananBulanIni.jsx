import React, { Component } from 'react';
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'

class PesananBulanIni extends Component {

    state = {
        daftarPesananBulanIni: [],
        jumlahBoxTerjualBulanIni: 0,
        userTerbaik: '',
        produkTerbaik: '',
    }


    componentDidMount () {
        this.getPesananBulanIni()
        this.getJumlahBoxTerjualBulanIni()
        this.getUserTerbaik()
        this.getProdukTerbaik()
    }

    getPesananBulanIni = () => {
        Axios.get(urlApi + 'pesanan/getPesananBulanIni')
        .then(res => {
            this.setState({daftarPesananBulanIni: res.data})
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
            this.setState({produkTerbaik: res.data})
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
                    <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                        <h3>THIS MONTH TRANSACTION</h3>
                    </div>
                    <div className="card-body">
                        {
                            this.state.daftarPesananBulanIni.length > 0
                            ?
                            <>
                                <div className="row">
                                    <div className="col-7">
                                        <h6>Total Income: Rp. {this.totalPendapatan()}/{this.state.daftarPesananBulanIni.length} transaksi</h6>
                                    </div>
                                    <div className="col-5">
                                        <h6>Box Qty: {this.state.jumlahBoxTerjualBulanIni} box</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <h6>Best User/id: {this.state.userTerbaik.username}/{this.state.userTerbaik.UserId} &nbsp;&nbsp; Rp. {new Intl.NumberFormat('id-ID').format(this.state.userTerbaik.TotalBelanjaan)}</h6>
                                    </div>
                                    <div className="col-5">
                                        {
                                            this.state.produkTerbaik.length !== 0
                                            ?
                                            <h6>Best Package: {this.state.produkTerbaik[0].namaPaket}/{this.state.produkTerbaik[0].totalTerjual} box</h6>
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </> 
                            :
                            <h3 className="text-center h3-responsive">No Transaction This Month</h3>
                        }       
                    </div>
                </div>
                
            </div>
        );
    }
}

export default PesananBulanIni;