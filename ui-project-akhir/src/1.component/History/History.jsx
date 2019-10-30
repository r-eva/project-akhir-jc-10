import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class History extends Component {

    state = {
        inputUang: '',
        kembalianUang: null,
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
        if (this.props.role === '')
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
                        <th>Nama Penerima</th>
                        <th>Alamat Penerima</th>
                        <th>Cancel</th>
                        <th>Status</th>
                        <th>Durasi</th>
                        <th>Batas Waktu Pembayaran</th>
                    </tr>
                    </thead>
                    <tbody>
                        
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
        role: state.user.role
    }
}

export default connect(mapStateToProps)(History);