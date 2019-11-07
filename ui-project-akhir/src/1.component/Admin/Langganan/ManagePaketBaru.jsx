import React, { Component } from 'react';
import {MDBInput} from 'mdbreact'

class ManagePaketBaru extends Component {

    state = {
        inputNamaPaketAdd: false,
        inputHargaAdd: false,
        inputDiscountAdd: false,
        inputDeskripsAdd: false,
        imageLanggananAdd: false,
    }

    render() {
        return (
                <div className="mb-5">
                    <div className="row m-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header text-center bg-info">
                                    <h3>ADD PRODUCT LANGGANAN</h3>
                                </div>
                                <div className="card-body mx-3">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="inputPlaceholderEx">Nama Paket</label>
                                            <input placeholder="Input Nama Paket" type="text" id="inputPlaceholderEx" className="form-control"  onChange={(e) => this.setState({inputNamaPaketAdd: e.target.value})}/>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="inputPlaceholderEx1">Harga Paket</label>
                                            <input placeholder="Input Harga Paket" type="text" id="inputPlaceholderEx1" className="form-control" onChange={(e)=> this.setState({inputHargaAdd: parseInt(e.target.value)})}/>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="inputPlaceholderEx2">Discount</label>
                                            <input placeholder="Input Discount Paket (optional)" type="text" id="inputPlaceholderEx2" className="form-control" onChange={(e) => this.setState({inputDiscountAdd: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-5">
                                            <h6 style={{marginBottom: -10}}>Deskripsi</h6>
                                            <MDBInput hint="Input Deskripsi Paket" type="textarea" onChange={(e)=> this.setState({inputDeskripsiAdd: e.target.value})} outline/>
                                        </div>
                                        <div className="col-7">
                                            <h6 className="mb-3">Upload Image</h6>
                                            <div className="row">
                                                <div className="col">
                                                    <input type="file" onChange={this.imageLanggananAdd}/>
                                                </div>
                                                <div className="col">
                                                    <input type="button" value="Upload" className="btn btn-success btn-block"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <h5>Jadwal Catering</h5>
                                            </div>
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

export default ManagePaketBaru;