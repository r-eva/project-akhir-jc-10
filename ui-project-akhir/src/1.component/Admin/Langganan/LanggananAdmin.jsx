import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import './LanggananAdmin.css'
import { MDBTableHead, MDBTable, MDBTableBody, MDBInputGroup, MDBBtn} from 'mdbreact'

class LanggananAdmin extends Component {
    state = {
        listPaket: [],
        boxDetail: false,
        selectedProduct: null,
        imageLanggananEdit: null,
        editImageClick: 0,
        imageLanggananNew: null
    }

    componentDidMount(){
        this.getDataPaket()
    }

    getDataPaket = () => {
        Axios.get(urlApi + 'langganan/getKategoriLangganan')
        .then((res) => {
            this.setState({listPaket: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    detailProductClicked = (selectedProduct) => {
        this.setState({selectedProduct: selectedProduct, boxDetail: true})
    }

    // //////////////////////////////////////////// UPLOAD AND EDITING IMAGE ///////////////////////////////////////////

    imageLanggananEdit = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananNew: e.target.files })
        } else {
            this.setState({ imageLanggananNew: null })
        }
    }

    imageLanggananNew = (e) => {
        alert('masuk')
        if(e.target.files[0]) {
            this.setState({ imageLanggananNew: e.target.files })
            console.log(this.state.imageLanggananNew)
        } else {
            this.setState({ imageLanggananNew: null })
        }
    }

    onBtnAddImageTokoClick = (id) => {
        if(this.state.imageLanggananEdit) {
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.imageLanggananEdit[0])

            Axios.put(urlApi + 'langganan/addImageLangganan/' + id, formdata, options)
                .then(res => {
                    this.detailProductClicked(...res.data)
                }).catch(err => {
                    console.log(err.response)
                })
        } else {
            alert('Mohon input image!')
        }
    }

    saveEditingLangganan = (id) => {
       
    }

    renderProduct = () => {
        var jsx = this.state.listPaket.map(val => {
            return (
                <tr key={val.id} className='text-dark' style={{cursor: 'pointer'}}  onClick={() => this.detailProductClicked(val)}>
                    <td>{val.id}</td>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td>{val.discount}</td>
                </tr>
            )
        })
        return jsx
    }

    render() {
        if (this.props.role !== 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div className="container-fluid mt-5 pt-md-5">
                <div className="row mt-5 mb-5 mr-3 ml-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>PRODUK LANGGANAN</h3>
                            </div>
                            <div className="card-body">
                                <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                        <MDBTableHead color="secondary-color">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nama Paket</th>
                                                <th>Harga</th>
                                                <th>Deskripsi</th>
                                                <th>Diskon</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.renderProduct()}
                                        </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.state.boxDetail
                        ?
                        <div className="row mt-3 mb-5 mr-3 ml-3">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-center">
                                        <h3>MANAGE PRODUCT LANGGANAN</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-4 ">
                                                <MDBInputGroup containerClassName="mb-3" prepend="Nama Paket" hint={this.state.selectedProduct.namaPaket}/>
                                            </div>
                                            <div className="col-4">
                                                <MDBInputGroup containerClassName="mb-3" prepend="Harga" hint={this.state.selectedProduct.harga}/>
                                            </div>
                                            <div className="col-4">
                                                <MDBInputGroup containerClassName="mb-3" prepend="Discount" hint={this.state.selectedProduct.discount}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-5">
                                                <img src={`${urlApi}${this.state.selectedProduct.imagePath}`} style={{
                                                    width:'450px', height: '300px', borderRadius: '4px', padding: '5px'
                                                }} alt='Img produk masih kosong'></img>
                                            </div>
                                            <div className="col-7">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <MDBInputGroup containerClassName="mb-3" prepend="Deskripsi" type="textarea" hint={this.state.selectedProduct.deskripsi}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="col-5">
                                                        {
                                                            this.state.selectedProduct.imagePath === "" 
                                                            ?
                                                            <>
                                                                {
                                                                    this.state.editImageClick === 0
                                                                    ?
                                                                    <input type="button" value="Add Image" className="btn btn-info btn-block" onClick={() => this.setState({editImageClick: 1})}/>
                                                                    :
                                                                    <div className="mt-2 mr-2 mb-2">
                                                                        <input type="file" onChange={this.imageLanggananEdit}/>
                                                                    </div>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                            {
                                                                this.state.editImageClick === 0
                                                                ?
                                                                <input type="button" value="Edit Image" className="btn btn-info btn-block" onClick={() => this.setState({editImageClick: 1})}/>
                                                                :
                                                                <div className="mt-2 mr-2 mb-2">
                                                                    <input type="file" onChange={this.imageLanggananEdit}/>
                                                                </div>
                                                            }
                                                            </>                                                            
                                                        }
                                                    </div>
                                                    <div className="col-7">
                                                        <input type="button" value="Cancel" className="btn btn-danger btn-block" onClick={() => this.setState({boxDetail: false, selectedProduct: null, editImageClick: 0})}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-5">
                                                        {
                                                            this.state.editImageClick === 0
                                                            ?
                                                            null
                                                            :
                                                            <input type="button" value="Upload" className="btn btn-info btn-block" onClick={() => this.onBtnAddImageTokoClick(this.state.selectedProduct.id)} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-12">
                                                        <h5>JADWAL CATERING</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 mt-2">
                                                <input type="button" value="SAVE UPDATE PRODUCT" className="btn btn-success btn-block" onClick={() => this.saveEditingLangganan(this.state.selectedProduct.id)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div>
                    <div className="row mt-3 mb-5 mr-3 ml-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h3>ADD PRODUCT LANGGANAN</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-4 ">
                                            <MDBInputGroup containerClassName="mb-3" prepend="Nama Paket" hint="Mohon isi nama paket"/>
                                        </div>
                                        <div className="col-4">
                                            <MDBInputGroup containerClassName="mb-3" prepend="Harga" hint="Mohon isi harga paket"/>
                                        </div>
                                        <div className="col-4">
                                            <MDBInputGroup containerClassName="mb-3" prepend="Discount" hint="Isi discount (optional)"/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-5">
                                            <MDBInputGroup containerClassName="mb-3" prepend="Deskripsi" type="textarea" hint="Mohon isi deskripsi produk"/>
                                        </div>
                                        <div className="col-7">
                                            <h6>Upload Image</h6>
                                            <MDBInputGroup
                                                append={
                                                    <MDBBtn color="mdb-color" outline className="m-0 px-3 py-2 z-depth-0">BUTTON</MDBBtn>
                                                }
                                                inputs={
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.imageLanggananNew}/>
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                                    </div>
                                                }
                                                containerClassName="mb-3"
                                            />
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

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}
export default connect(mapStateToProps)(LanggananAdmin);