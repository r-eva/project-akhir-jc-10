import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import './LanggananAdmin.css'
import { MDBTableHead, MDBTable, MDBTableBody, MDBInputGroup, MDBInput, MDBBtn, MDBIcon,
        MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter} from 'mdbreact'

class LanggananAdmin extends Component {
    state = {
        listPaket: [],
        boxDetail: false,
        selectedProduct: null,
        editImageClick: 0,
        imageLanggananNew: null,
        inputNamaPaketEdit: false,
        inputHargaEdit: false,
        inputDiscountEdit: false,
        inputDeskripsiEdit: false,
        listJadwal: [],
        modal9: false,
        inputNamaPaketAdd: false,
        inputHargaAdd: false,
        inputDiscountAdd: false,
        inputDeskripsAdd: false,
        imageLanggananAdd: false,
        selectedEditJadwalId: 0
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        })
      }

    componentDidMount(){
        this.getDataPaket()
    }
    
    componentDidUpdate(){
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
        Axios.get(urlApi + 'jadwal/getJadwalByIdPaket/' + selectedProduct.id)
        .then((res)=>{
            this.setState({selectedProduct: selectedProduct, boxDetail: true})
            this.setState({listJadwal: res.data})
        }).catch((err)=> {
            console.log(err)
        })
        
    }

    imageLanggananNew = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananNew: e.target.files })
        } else {
            this.setState({ imageLanggananNew: null })
        }
    }

    imageLanggananAdd = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananAdd: e.target.files })
        } else {
            this.setState({ imageLanggananAdd: null })
        }
    }

    onBtnAddImageLanggananClick = (id) => {
        if(this.state.imageLanggananNew) {
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.imageLanggananNew[0])

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

    onBtnEditImageLanggananClick = (id) => {
        if(this.state.imageLanggananNew) {
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.imageLanggananNew[0])

            Axios.put(urlApi + 'langganan/editImageLanggananById/' + id, formdata, options)
                .then(res => {
                    this.detailProductClicked(...res.data)
                    this.getDataPaket()
                }).catch(err => {
                    console.log(err.response)
                })
        } else {
            alert('Mohon input image!')
        }
    }

    saveEditingLangganan = (objSelected) => {
       var obj = {
           namaPaket: this.state.inputNamaPaketEdit ? this.state.inputNamaPaketEdit : objSelected.namaPaket,
           harga: this.state.inputHargaEdit ? parseInt(this.state.inputHargaEdit) : objSelected.harga,
           discount: this.state.inputDiscountEdit ? parseInt(this.state.inputDiscountEdit) : objSelected.discount,
           deskripsi: this.state.inputDeskripsiEdit ? this.state.inputDeskripsiEdit : objSelected.deskripsi,
           imagePath: objSelected.imagePath   
       }

       Axios.put(urlApi + 'langganan/editLanggananById/' + objSelected.id, obj)
       .then((res) => {
            this.detailProductClicked(...res.data)
       })
       .catch((err) => {
           console.log(err)
       })
       console.log(obj)
    }


    /////////////////////////////////////////RENDER FUNCTION///////////////////////////////////////////////////////////////
    renderProduct = () => {
        var jsx = this.state.listPaket.map(val => {
            return (
                <tr key={val.id} className='text-dark' style={{cursor: 'pointer'}}  onClick={() => this.detailProductClicked(val)}>
                    <td>{val.id}</td>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td>{val.discount === 0 ? '-' : val.discount}</td>
                </tr>
            )
        })
        return jsx
    }

   renderJadwalProduct = () => {
        var jsx = this.state.listJadwal.map(val => {
            return (
                <tr key={val.urutan}>
                    <td>{val.Menu}</td>
                    <td>{val.Deskripsi}</td>
                    <td>{val.urutan}</td>
                </tr>
            )
        })
        return jsx
   }

   renderJadwalProductEdit = () => {
        var jsx = this.state.listJadwal.map(val => {
            if (val.urutan !== this.state.selectedEditId) {
                return (
                    <tr key={val.urutan}>
                        <td>{val.Menu}</td>
                        <td>{val.Deskripsi}</td>
                        <td>{val.urutan}</td>
                        <td><input type="button" value="Edit" onClick={() => this.setState({selectedEditJadwalId: val.urutan})}/></td>
                        <td><input type="button" value="Delete"/></td>
                    </tr>
                )
            }
            return (
                <tr key={val.urutan}>
                    <td>
                        <select>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </td>
                    <td>{val.Deskripsi}</td>
                    <td>{val.urutan}</td>
                    <td><input type="button" value="Cancel" onClick={() => this.setState({selectedEditJadwalId: 0})}/></td>
                    <td><input type="button" value="Save"/></td>
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
                            <div className="card-header text-center bg-info">
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
                                    <div className="card-header text-center bg-info">
                                        <h3>MANAGE PRODUCT LANGGANAN</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center mb-4 ml-3 mr-4">
                                            <div className="col-12 col-md-4">
                                                <label htmlFor="inputPlaceholderEx">Nama Paket</label>
                                                <input placeholder={this.state.selectedProduct.namaPaket} type="text" id="inputPlaceholderEx" className="form-control"  onChange={(e) => this.setState({inputNamaPaketEdit: e.target.value})}/>
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="inputPlaceholderEx1">Harga Paket</label>
                                                <input placeholder={this.state.selectedProduct.harga} type="text" id="inputPlaceholderEx1" className="form-control" onChange={(e)=> this.setState({inputHargaEdit: parseInt(e.target.value)})}/>
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="inputPlaceholderEx2">Discount</label>
                                                <input placeholder={this.state.selectedProduct.discount} type="text" id="inputPlaceholderEx2" className="form-control" onChange={(e) => this.setState({inputDiscountEdit: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="row my-3 ml-3 justify-content-center">
                                            <div className="row pl-1">
                                                <div className="col-4 mx-4">
                                                    <div className="row">
                                                        <img src={`${urlApi}${this.state.selectedProduct.imagePath}`} style={{
                                                            width:'450px', height: '300px', borderRadius: '4px',
                                                        }} alt='Img produk masih kosong'></img>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {
                                                                this.state.selectedProduct.imagePath === "" 
                                                                ?
                                                                <>
                                                                    {
                                                                        this.state.editImageClick === 0
                                                                        ?
                                                                        <input type="button" value="Add Image" className="btn btn-info mt-4 btn-block" onClick={() => this.setState({editImageClick: 1})}/>
                                                                        :
                                                                        <div className="mt-5 mr-2 mb-2">
                                                                            <input type="file" onChange={this.imageLanggananNew}/>
                                                                        </div>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                {
                                                                    this.state.editImageClick === 0
                                                                    ?
                                                                    <input type="button" value="Edit Image" className="btn btn-info mt-4 btn-block" onClick={() => this.setState({editImageClick: 1})}/>
                                                                    :
                                                                    <div className="mt-2 mr-2 mb-2">
                                                                        <input type="file" onChange={this.imageLanggananNew}/>
                                                                    </div>
                                                                }
                                                                </>                                                            
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {
                                                                this.state.editImageClick === 0
                                                                ?
                                                                null
                                                                :
                                                                <>
                                                                    {
                                                                        this.state.selectedProduct.imagePath === "" 
                                                                        ?
                                                                        <input type="button" value="Upload New Image" className="btn btn-info btn-block" onClick={() => this.onBtnAddImageLanggananClick(this.state.selectedProduct.id)} />
                                                                        :
                                                                        <input type="button" value="Upload Edit Image" className="btn btn-info btn-block" onClick={() => this.onBtnEditImageLanggananClick(this.state.selectedProduct.id)} />
                                                                    }
                                                                </>
                                                                
                                                                
                                                            }
                                                        </div>  
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h6 style={{marginBottom: -10}}>Deskripsi</h6>
                                                            <MDBInput hint={this.state.selectedProduct.deskripsi} type="textarea" onChange={(e)=> this.setState({inputDeskripsiEdit: e.target.value})} outline/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col-8">
                                                                    <h5>JADWAL CATERING</h5>
                                                                </div>
                                                                <div className="col-4">
                                                                    <MDBBtn gradient="aqua" size="sm" onClick={this.toggle(9)}>
                                                                        <MDBIcon icon="pencil-alt" />
                                                                    </MDBBtn>
                                                                </div>
                                                            </div>
                                                            <div className="row ml-1 mb-4">
                                                                <MDBTable scrollY maxHeight="60vh">
                                                                    <MDBTableHead color="secondary-color">
                                                                        <tr>
                                                                            <th>Menu</th>
                                                                            <th>Deskripsi</th>
                                                                            <th>Urutan</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody>
                                                                        {this.renderJadwalProduct()}
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <input type="button" value="Cancel" className="btn btn-danger btn-block" onClick={() => this.setState({boxDetail: false, selectedProduct: null, editImageClick: 0})}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 mt-2">
                                                <input type="button" value="SAVE UPDATE PRODUCT" className="btn btn-success btn-block" onClick={() => this.saveEditingLangganan(this.state.selectedProduct)}/>
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
                {
                    this.state.selectedProduct
                    ?
                    <>
                        <MDBModal isOpen={this.state.modal9} toggle={this.toggle(9)} fullHeight position="top">
                            <MDBModalHeader toggle={this.toggle(9)} className="justify-content-center">Jadwal Catering {this.state.selectedProduct.namaPaket}</MDBModalHeader>
                            <MDBModalBody>
                                <div className='container-fluid'>
                                    <MDBTable scrollY maxHeight="80vh">
                                        <MDBTableHead color="success-color">
                                            <tr>
                                                <th>Menu</th>
                                                <th>Deskripsi</th>
                                                <th>Urutan</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </MDBTableHead>
                                            <MDBTableBody>
                                                {this.renderJadwalProductEdit()}
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle(9)}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </>
                    :
                    null
                }
               
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