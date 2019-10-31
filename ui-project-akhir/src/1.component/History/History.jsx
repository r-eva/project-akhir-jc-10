import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";
import Axios from 'axios'
import {urlApi} from '../../helpers/database'

class History extends Component {

    state = {
        history: [],
        inputUang: '',
        kembalianUang: null,
    }

    componentDidMount() {
        this.getDataApi(this.props.userId)
    }

    getDataApi = (userId, idHistory) => {
        Axios.get(urlApi + `history/getHistoryByIdUser/` + userId)
        .then((res)=>{
            this.setState({history: res.data})
        })
        .catch((err) => {
            console.log(err)
        })

        // Axios.get(urlApi + `history/getHistoryDetailById/` + idHistory)
        // .then((res)=>{
        //     this.setState({history: res.data})
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        
    }

    onBtnDeleteHistoryClick = () => {

    }

    renderHistory = () => {
        var jsx = this.state.history.map((val, idx) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{val.TotalBelanja}</td>
                    <td>{val.Status}</td>
                    <td>{val.BatasAkhirBayar}</td>
                    <td><input type="button" className="btn btn-info btn-block" value="Detail"/></td>
                    {
                        val.Cancel === 0
                        ?
                        <td><input type="button" className="btn btn-danger btn-block" value="Cancel" onClick={()=> this.deleteHistory(val.id)}/></td>
                        :
                        <td><button type="button" className="btn btn-secondary btn-block" disabled>Cancel</button></td> 
                    }
                    <td><input type="button" className="btn btn-success btn-block" value="Bayar"/></td>
                </tr>
            )
        })
        return jsx
    }

    prosesUang = () => {
        var tempKembalianUang
        if (this.totalBelanjaan() - Number(this.state.inputUang) > 0) {
            tempKembalianUang = this.totalBelanjaan() - Number(this.state.inputUang)
            return this.setState({kembalianUang: tempKembalianUang})
        } else if (this.totalBelanjaan() - Number(this.state.inputUang) < 0) {
            tempKembalianUang = this.totalBelanjaan() - Number(this.state.inputUang)
            this.setState({kembalianUang: tempKembalianUang})
            return this.setState({submitModal: false})
        } else {
            this.setState({kembalianUang: 0})
            return this.setState({submitModal: false})
        }
    }

    render() {
        if (this.props.role === 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">HISTORY</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container-fluid">
                <table className='table mt-3 mb-5'>
                    <thead>
                    <tr className="text-center">
                        <th>Tanggal Transaksi</th>
                        <th>Total Tagihan</th>
                        <th>Status</th>
                        <th>Batas Waktu Pembayaran</th>
                        <th>Detail</th>
                        <th>Cancel</th>
                        <th>Bayar</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                </table>
                <h1 className='align-text-center'>History</h1>
                <h6 className="font font-weight-bold">SILAKAN MASUKKAN UANG ANDA</h6>
                                        Rp. <input type="number" placeholder="Masukkan Nominal" onChange={(e) => this.setState({inputUang: e.target.value})}/> <br/><br/>
                                        {
                                            this.state.kembalianUang == null
                                            ?
                                            null
                                            :
                                            <>
                                            {
                                                this.state.kembalianUang > 0
                                                ?
                                                <h6>Uang anda kurang Rp. {this.state.kembalianUang}. Mohon input kembali!</h6>
                                                :
                                                <>
                                                {
                                                    this.state.kembalianUang === 0
                                                    ?
                                                    <h6>Uang Anda Pas.</h6>
                                                    :
                                                    <h6>Kembalian Anda Rp. {Math.abs(this.state.kembalianUang)}.</h6>
                                                }
                                                </>
                                            }
                                            </>
                                        }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        userId: state.user.id,
        role: state.user.role
    }
}

export default connect(mapStateToProps)(History);