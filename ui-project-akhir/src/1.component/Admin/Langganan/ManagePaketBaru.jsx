import React, { Component } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact'
import { urlApi } from '../../../helpers/database'
import Axios from 'axios'
import swal from 'sweetalert'

class ManagePaketBaru extends Component {

    state = {
        inputNamaPaketAdd: false,
        inputHargaAdd: false,
        inputDiscountAdd: false,
        inputDeskripsAdd: false,
        imageLanggananAdd: false,
        tambahJadwal: false,
        tambahJadwalDariMenuClick: false,
        listAllMenuTambahJadwal: [],
        inputNamaMenuBaru: '',
        inputDeskripsiMenu: '',
        selectedNewMenu: ''
    }

    ////////////////////////////////////////GET VALUE INPUT //////////////////////////////////////

    imageLanggananAdd = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananAdd: e.target.files })
        } else {
            this.setState({ imageLanggananAdd: null })
        }
    }

    getMenuTambahJadwal = (e) => {
        this.setState({selectedNewMenu: e.target.value})
    }

    ////////////////////////////////////////GET DATA API////////////////////////////////////////////

    getAllMenuTambahJadwal = (id) => {
        Axios.get(urlApi + 'jadwal/getallmenu')
        .then((res) => {
            this.setState({tambahJadwal: true, listAllMenuTambahJadwal: res.data, tambahJadwalDariMenuClick: true})
        }).catch((err) => {
            console.log(err)
        })
    }

    ///////////////////////////////////////////FUNCTION TO BACKEND //////////////////////////////////////77

    tambahPaketLanggananDanJadwal = () => {
        var data
        var formdata
        var options
        if (this.state.tambahJadwalDariMenuClick) {
            if ( this.state.inputNamaPaketAdd && this.state.inputHargaAdd && this.state.inputDiscountAdd
                && this.state.imageLanggananAdd && this.state.selectedNewMenu !== '' && this.refs.inputKategori.value !== "Pilih Kategori") {
                formdata = new FormData();
                options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                data = {
                    namaPaket: this.state.inputNamaPaketAdd,
                    harga: parseInt(this.state.inputHargaAdd),
                    discount: parseInt(this.state.inputDiscountAdd),
                    deskripsi: this.state.inputDeskripsiAdd,
                    imagePath: this.state.imageLanggananAdd,
                    kategori: this.refs.inputKategori.value,
                    idMenu: this.state.selectedNewMenu
                }
                
                formdata.append('image', this.state.imageLanggananAdd[0])
                formdata.append('data', JSON.stringify(data))
    
                Axios.post(urlApi + 'langganan/addLanggananJadwalLama/', formdata, options)
                .then((res) => {
                    this.setState({
                        inputNamaPaketAdd: false, inputHargaAdd: false, inputDiscountAdd: false,
                        inputDeskripsAdd: false, imageLanggananAdd: false, tambahJadwal: false,
                        tambahJadwalDariMenuClick: false, listAllMenuTambahJadwal: [],
                        inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''
                    })
                    window.location.reload()
                }).catch((err) => {
                    swal ('Eror', `${err.response.data.message}`, 'error')
                    console.log(err)
                })
    
            } else {
                swal ('Eror', 'Mohon input seluruh data yang diperlukan!', 'error')
            }

        } else {
            if ( this.state.inputNamaPaketAdd && this.state.inputHargaAdd && this.state.inputDiscountAdd
                && this.state.imageLanggananAdd && this.state.inputNamaMenuBaru !== '' && this.state.inputDeskripsiMenu !== '' && this.refs.inputKategori.value !== "Pilih Kategori") {
                
                formdata = new FormData();
                options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                
                data = {
                    namaPaket: this.state.inputNamaPaketAdd,
                    harga: parseInt(this.state.inputHargaAdd),
                    discount: parseInt(this.state.inputDiscountAdd),
                    deskripsi: this.state.inputDeskripsiAdd,
                    kategori: this.refs.inputKategori.value,
                    Menu: this.state.inputNamaMenuBaru,
                    Deskripsi: this.state.inputDeskripsiMenu
                }

                formdata.append('image', this.state.imageLanggananAdd[0])
                formdata.append('data', JSON.stringify(data))
                
                Axios.post(urlApi + 'langganan/addLanggananJadwalBaru/', formdata, options)
                .then((res) => {
                    this.setState({
                        inputNamaPaketAdd: false, inputHargaAdd: false, inputDiscountAdd: false,
                        inputDeskripsAdd: false, imageLanggananAdd: false, tambahJadwal: false,
                        tambahJadwalDariMenuClick: false, listAllMenuTambahJadwal: [],
                        inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''
                    })
                    window.location.reload()
                }).catch((err) => {
                    swal ('Eror', `${err.response.data.message}`, 'error')
                    console.log(err)
                })

            } else {
                swal ('Eror', 'Mohon input seluruh data yang diperlukan!', 'error')
            }
        }
    }

    /////////////////////////////////////////// RENDER FUNCTION ///////////////////////////////////////////

    renderPilihanMenuUntukTambah = () => {
        var jsx = this.state.listAllMenuTambahJadwal.map(val => {
             return <option key={val.id} value={val.id}>{val.Menu}</option>
        })
        return jsx
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
                                            <input placeholder="Input Harga Paket" type="number" id="inputPlaceholderEx1" className="form-control" onChange={(e)=> this.setState({inputHargaAdd: parseInt(e.target.value)})}/>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="inputPlaceholderEx2">Discount</label>
                                            <input placeholder="Input Discount Paket (optional)" type="number" id="inputPlaceholderEx2" className="form-control" onChange={(e) => this.setState({inputDiscountAdd: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-4">
                                            <h6 style={{marginBottom: -10}}>Deskripsi</h6>
                                            <MDBInput hint="Input Deskripsi Paket" type="textarea" onChange={(e)=> this.setState({inputDeskripsiAdd: e.target.value})} outline/>
                                        </div>
                                        <div className="col-4">
                                            <h6>Kategori</h6>
                                            <select ref='inputKategori' className="browser-default custom-select mt-1">
                                                <option>Pilih Kategori</option>
                                                <option value="mealbox">Meal Box</option>
                                                <option value="sweets">Sweets</option>
                                                <option value="snack">Snack</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="mb-3">Upload Image</h6>
                                            <div className="row">
                                                <div className="col">
                                                    <input type="file" onChange={this.imageLanggananAdd}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <h5 className='text-center'>TAMBAH 1 JADWAL CATERING</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                {
                                                    this.state.tambahJadwal
                                                    ?
                                                    <>
                                                        {
                                                            this.state.tambahJadwalDariMenuClick
                                                            ?
                                                            <>  
                                                                <div className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-12 mt-3 text-center">
                                                                            <select onChange={this.getMenuTambahJadwal}>
                                                                                <option>Mohon Pilih Menu</option>
                                                                                    {this.renderPilihanMenuUntukTambah()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12 text-center">
                                                                            <MDBBtn color="secondary" className="mt-3" onClick={() => this.setState({tambahJadwal: false, tambahJadwalDariMenuClick: false, inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''})}>Back</MDBBtn>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="col-12">
                                                                                <label htmlFor="inputPlaceholderEx">Nama Menu</label>
                                                                                <input placeholder="Input Nama Menu" type="text" id="inputPlaceholderEx" className="form-control mb-3" onChange={(e) => this.setState({inputNamaMenuBaru: e.target.value})}/>
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <h6 style={{marginBottom: -10}}>Deskripsi</h6>
                                                                                <MDBInput hint="Input Deskripsi Paket" type="textarea" outline onChange={(e) => this.setState({inputDeskripsiMenu: e.target.value})}/>
                                                                            </div>   
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12 text-center">
                                                                            <MDBBtn color="secondary" onClick={() => this.setState({tambahJadwal: false, tambahJadwalDariMenuClick: false, inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''})}>Back</MDBBtn>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <div className="col-6 text-center">
                                                            <MDBBtn color="secondary" onClick={() => this.getAllMenuTambahJadwal()}>Ambil Dari Menu Tersedia</MDBBtn>
                                                        </div>
                                                        <div className="col-6 text-center">
                                                            <MDBBtn color="secondary" onClick={() => this.setState({tambahJadwalDariMenuClick: false, tambahJadwal: true})}>Tambah Menu Baru</MDBBtn>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 my-3">
                                            <MDBBtn color="success" className="btn btn-block" onClick={this.tambahPaketLanggananDanJadwal}>Tambah Produk Langganan</MDBBtn>
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