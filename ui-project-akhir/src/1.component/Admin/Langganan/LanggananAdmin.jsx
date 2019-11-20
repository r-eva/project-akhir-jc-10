import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import './LanggananAdmin.css'
import ManagePaketBaru from './ManagePaketBaru'
import { MDBTableHead, MDBTable, MDBTableBody, MDBInput, MDBBtn, MDBIcon,
        MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter} from 'mdbreact'
import swal from 'sweetalert'

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
        selectedEditJadwalId: 0,
        selectedNewMenuEdit: null,
        listAllMenu: [],
        tambahJadwalClick: false,
        listAllMenuTambahJadwal: null,
        selectedNewMenu: null,
        inputNamaMenuBaru: '',
        inputDeskripsiMenu: ''
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

    getDataPaket = () => {
        Axios.get(urlApi + 'langganan/getKategoriLangganan')
        .then((res) => {
            this.setState({listPaket: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    getAllMenu = (id) => {
        Axios.get(urlApi + 'jadwal/getallmenu')
        .then((res) => {
            this.setState({listAllMenu: res.data})
        }).catch((err) => {
            console.log(err)
        })
        this.setState({selectedEditJadwalId: id})
    }

    getAllMenuTambahJadwal = (id) => {
        Axios.get(urlApi + 'jadwal/getallmenu')
        .then((res) => {
            this.setState({listAllMenuTambahJadwal: res.data, tambahJadwalClick: true})
        }).catch((err) => {
            console.log(err)
        })
    }

    getMenuJadwalEdit = (e) => {
        this.setState({selectedNewMenuEdit: e.target.value})
    }

    getMenuTambahJadwal = (e) => {
        this.setState({selectedNewMenu: e.target.value})
    }
    
    ////////////////////////////////////////////////////FUNGSI BAYANGAN//////////////////////////////////////////
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


    //////////////////////////////////////////////////// FUNGSI UTAMA KE BACKEND ////////////////////////////////////////////////
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
            alert('Please input image!')
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
            alert('Please input image!')
        }
    }

    saveEditingLangganan = (objSelected) => {
       var obj = {
           namaPaket: this.state.inputNamaPaketEdit ? this.state.inputNamaPaketEdit : objSelected.namaPaket,
           harga: this.state.inputHargaEdit ? parseInt(this.state.inputHargaEdit) : objSelected.harga,
           discount: this.state.inputDiscountEdit ? parseInt(this.state.inputDiscountEdit) : objSelected.discount,
           deskripsi: this.state.inputDeskripsiEdit ? this.state.inputDeskripsiEdit : objSelected.deskripsi,
           kategori: this.refs.inputKategori.value,
           imagePath: objSelected.imagePath   
       }

       Axios.put(urlApi + 'langganan/editLanggananById/' + objSelected.id, obj)
       .then((res) => {
            this.getDataPaket()
            this.setState({boxDetail: false, selectedProduct: null, editImageClick: 0})      
       })
       .catch((err) => {
           console.log(err)
       })
    }

    onBtnDeletePaketClick = (idPaket, jadwal) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this package.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                var deleteObj = {
                    data: {
                        idLangganan: idPaket,
                        jadwalPaket: jadwal
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
        
                Axios.delete(urlApi + 'langganan/hapusPaketLangganan/', deleteObj)
                .then((res)=>{
                    this.getDataPaket()
                    this.setState({boxDetail: false, selectedProduct: null, editImageClick: 0})
                    swal("Congratulation! This package has been deleted!", {
                        icon: "success",
                    });
                }).catch((err)=> {
                    if (err.response.data.message) {
                        swal ('Eror', `${err.response.data.message}`, 'error')
                    } else {
                        console.log(err)
                    }
                })
            } else {
              swal("Your package has not been deleted.");
            }
        })
    }

    updateJadwalLangganan = (menuBaru, idConnectionTable) => {
        Axios.put(urlApi + 'jadwal/editJadwalById', {
            idMenuBaru: menuBaru,
            idConnection: idConnectionTable
        })
        .then((res)=>{
            this.detailProductClicked(this.state.selectedProduct)
            this.setState({selectedEditJadwalId: 0})
        }).catch((err)=> {
            console.log(err)
        })
    }

    deleteJadwal = (idConnection) => {
        Axios.delete(urlApi + 'jadwal/deleteJadwalById/' + idConnection)
        .then((res)=>{
            this.detailProductClicked(this.state.selectedProduct)
            this.setState({selectedEditJadwalId: 0})
        }).catch((err)=> {
            console.log(err)
        })
    }

    tambahJadwalMenuBaru = () => {
        if (this.state.selectedNewMenu === '' || this.state.selectedNewMenu === null) {
            swal ('Eror', `Please complete all data required!`, 'error')
        } else {
            var obj = {
                idMenu: this.state.selectedNewMenu,
                idKategori: this.state.selectedProduct.id,
                urutan: this.state.listJadwal[(this.state.listJadwal.length - 1)].urutan + 1
            }
    
            Axios.post(urlApi + 'jadwal/addConnection/', obj)
                .then((res)=>{
                    this.detailProductClicked(this.state.selectedProduct)
                    this.setState({tambahJadwalClick: false, selectedNewMenu: null})
                }).catch((err)=> {
                    console.log(err)
                })
            }
        }

    tambahMenuDanJadwal = () => {
        if (this.state.inputNamaMenuBaru === '' || this.state.inputDeskripsiMenu === '') {
            swal ('Eror', `Please complete all data required!`, 'error')
        } else {
            var obj = {
                Menu: this.state.inputNamaMenuBaru,
                Deskripsi: this.state.inputDeskripsiMenu,
                idKategori: this.state.selectedProduct.id,
                urutan: this.state.listJadwal[(this.state.listJadwal.length - 1)].urutan + 1
            }
            Axios.post(urlApi + 'jadwal/addMenuBaruDanConnection', obj)
            .then((res)=>{
                this.detailProductClicked(this.state.selectedProduct)
                this.setState({inputNamaMenuBaru: '', inputDeskripsiMenu: ''})
            }).catch((err)=> {
                if (err.response.data.message) {
                    swal ('Eror', `${err.response.data.message}`, 'error')
                } else {
                    console.log(err)
                }
            })
        }
    }

    /////////////////////////////////////////RENDER FUNCTION///////////////////////////////////////////////////////////////
    renderProduct = () => {
        return this.state.listPaket.map(val => {
            return (
                <tr key={val.id} className='text-dark text-center' style={{cursor: 'pointer'}}  onClick={() => this.detailProductClicked(val)}>
                    <td>{val.id}</td>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td>{val.discount === 0 ? '-' : val.discount}</td>
                </tr>
            )
        })
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
        var jsx = this.state.listJadwal.map(val=> {
            if (val.id !== this.state.selectedEditJadwalId) {
                return (
                    <tr key={val.id}>
                        <td>{val.Menu}</td>
                        <td>{val.urutan}</td>
                        <td><input type="button" className='btn btn-info' value="Edit" onClick={() => this.getAllMenu(val.id)}/></td>
                        {
                            this.state.listJadwal.length === 1
                            ?
                            <td><h6>Cant be deleted, please add one more menu.</h6></td>
                            :
                            <td><input type="button" className='btn btn-danger' value="Delete" onClick={() => this.deleteJadwal(val.id)}/></td>
                        }
                        
                    </tr>
                )
            }
            return (
                <tr key={val.id}>
                    <td>
                        <select onChange={this.getMenuJadwalEdit}>
                            <option>{val.Menu}</option>
                            {this.renderPilihanMenu()}
                        </select>
                    </td>
                    <td>{val.urutan}</td>
                    <td><input type="button" className='btn btn-danger' value="Cancel" onClick={() => this.setState({selectedEditJadwalId: 0})}/></td>
                    <td><input type="button" className='btn btn-success' value="Save" onClick={()=> this.updateJadwalLangganan(this.state.selectedNewMenuEdit, this.state.selectedEditJadwalId)}/></td>
                </tr>
            )
        })
        return jsx
   }

   renderPilihanMenu = () => {
       var jsx = this.state.listAllMenu.map(val => {
            return <option key={val.id} value={val.id}>{val.Menu}</option>
       })
       return jsx
   }

   renderPilihanMenuUntukTambah = () => {
    var jsx = this.state.listAllMenuTambahJadwal.map(val => {
         return <option key={val.id} value={val.id}>{val.Menu}</option>
    })
    return jsx
    }

    render() {
        if (this.props.role !== 'admin' || this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div className="background-main-admin">
            <div className="container-fluid card-main card-main-mobile">
                <div className="row mr-3 ml-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                <h3>SUBCRIPTION PRODUCT</h3>
                            </div>
                            <div className="card-body">
                                <MDBTable hover className="text-white" scrollY maxHeight="60vh">
                                        <MDBTableHead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Discount</th>
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
                                    <div className="card-header bg-info">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <input type="button" value="Cancel" className="btn btn-danger btn-sm" onClick={() => this.setState({boxDetail: false, selectedProduct: null, editImageClick: 0})}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h3 className="h3-responsive">MANAGE SUBSCRIPTION PRODUCT</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center mb-4 ml-3 mr-4">
                                            <div className="col-12 col-md-4">
                                                <label htmlFor="inputPlaceholderEx">Package Name</label>
                                                <input placeholder={this.state.selectedProduct.namaPaket} type="text" id="inputPlaceholderEx" className="form-control"  onChange={(e) => this.setState({inputNamaPaketEdit: e.target.value})}/>
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <label htmlFor="inputPlaceholderEx1">Price</label>
                                                <input placeholder={this.state.selectedProduct.harga} type="number" id="inputPlaceholderEx1" className="form-control" onChange={(e)=> this.setState({inputHargaEdit: parseInt(e.target.value)})}/>
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <label htmlFor="inputPlaceholderEx2">Discount</label>
                                                <input placeholder={this.state.selectedProduct.discount} type="number" id="inputPlaceholderEx2" className="form-control" onChange={(e) => this.setState({inputDiscountEdit: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="row mb-4 ml-3 mr-4">
                                            <div className="col-12 col-md-5">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <img src={`${urlApi}${this.state.selectedProduct.imagePath}`} style={{
                                                            width:'450px', height: '300px', borderRadius: '4px',
                                                        }} alt='Img produk masih kosong' className='img-fluid'></img>
                                                    </div> 
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 text-center">
                                                        {
                                                            this.state.selectedProduct.imagePath === "" 
                                                            ?
                                                                <>
                                                                    {
                                                                        this.state.editImageClick === 0
                                                                        ?
                                                                        <input type="button" value="Add Image" className="btn btn-info mt-4" onClick={() => this.setState({editImageClick: 1})}/>
                                                                        :
                                                                        <div className="mt-5 mb-2">
                                                                            <input type="file" onChange={this.imageLanggananNew}/>
                                                                        </div>
                                                                    }
                                                                </>
                                                            :
                                                                <>
                                                                {
                                                                    this.state.editImageClick === 0
                                                                    ?
                                                                    <input type="button" value="Edit Image" className="btn btn-info mt-4" onClick={() => this.setState({editImageClick: 1})}/>
                                                                    :
                                                                    <div className="mt-2 mb-2">
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
                                                                        <input type="button" value="Upload Edit Image" className="btn btn-info btn-block mb-3" onClick={() => this.onBtnEditImageLanggananClick(this.state.selectedProduct.id)} />
                                                                    }
                                                                </>  
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-7">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h6 style={{marginBottom: -10}}>Description</h6>
                                                        <MDBInput hint={this.state.selectedProduct.deskripsi} type="textarea" onChange={(e)=> this.setState({inputDeskripsiEdit: e.target.value})} outline/>
                                                    </div>
                                                    <div className="col-12">
                                                        <h6>Kategori</h6>
                                                        <select ref='inputKategori' className="browser-default custom-select mt-1">
                                                            <option value={this.state.selectedProduct.kategori}>{this.state.selectedProduct.kategori.charAt(0).toUpperCase() + this.state.selectedProduct.kategori.substring(1)}</option>
                                                            {this.state.selectedProduct.kategori === 'mealbox' ? null : <option value="mealbox">Meal Box</option>}
                                                            {this.state.selectedProduct.kategori === 'sweets' ? null : <option value="sweets">Sweets</option>}
                                                            {this.state.selectedProduct.kategori === 'snack' ? null : <option value="snack">Snack</option>}
                                                            {this.state.selectedProduct.kategori === 'others' ? null : <option value="others">Others</option>}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-9 col-md-10">
                                                                <h5>CATERING SCHEDULE</h5>
                                                            </div>
                                                            <div className="col-3 col-md-2">
                                                                <MDBBtn gradient="aqua" size="sm" onClick={this.toggle(9)}>
                                                                    <MDBIcon icon="pencil-alt" />
                                                                </MDBBtn>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <MDBTable scrollY maxHeight="60vh">
                                                                    <MDBTableHead color="secondary-color">
                                                                        <tr>
                                                                            <th>Menu</th>
                                                                            <th>Description</th>
                                                                            <th>Order</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody>
                                                                        {this.renderJadwalProduct()}
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4 ml-3 mr-4">
                                            <div className="col-12">
                                                <input type="button" value="DELETE THIS PACKAGE" className="btn btn-danger btn-block font-weight-bolder" onClick={() => this.onBtnDeletePaketClick(this.state.selectedProduct.id, this.state.listJadwal)}/>
                                            </div>
                                        </div>
                                        <div className="row mb-4 ml-3 mr-4">
                                            <div className="col-12">
                                                <input type="button" value="SAVE UPDATE PRODUCT" className="btn btn-success btn-block font-weight-bolder" onClick={() => this.saveEditingLangganan(this.state.selectedProduct)}/>
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
                <ManagePaketBaru/>
                {
                    this.state.selectedProduct
                    ?
                    <>
                        <MDBModal isOpen={this.state.modal9} toggle={this.toggle(9)} fullHeight position="top">
                            <MDBModalHeader toggle={this.toggle(9)} style={{backgroundColor: '#E32E89'}}>
                                <h3 className="text-center font-weight-bold">{this.state.selectedProduct.namaPaket} Catering Schedule</h3>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div className='container-fluid'>
                                    <div className="row">
                                        <div className="col-12 col-md-7 mt-3">
                                            <h5 style={{textDecoration: 'underline', marginBottom: '20px', color: 'purple'}}>EDIT SCHEDULE</h5>
                                            <MDBTable scrollY maxHeight="80vh">
                                                <MDBTableHead color="success-color">
                                                    <tr>
                                                        <th>Menu</th>
                                                        <th>Order</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </MDBTableHead>
                                                    <MDBTableBody>
                                                        {this.renderJadwalProductEdit()}
                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                        <div className="col-12 col-md-5 mt-3">
                                            <h5 style={{textDecoration: 'underline', marginBottom: '20px', color: 'purple'}}>ADD SCHEDULE</h5>
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        this.state.tambahJadwalClick === false
                                                        ?
                                                        <MDBBtn color="secondary" onClick={() => this.getAllMenuTambahJadwal()}>GET FROM LIST MENU</MDBBtn>   
                                                        :
                                                        <div className="row ml-3">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <p className="font-weight-bold">GET FROM LIST MENU</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-7 mt-2 mr-1">
                                                                    <select onChange={this.getMenuTambahJadwal}>
                                                                        <option>Choose Menu</option>
                                                                        {this.renderPilihanMenuUntukTambah()}
                                                                    </select>
                                                                </div>
                                                                <div className="col-5">
                                                                    <MDBBtn color="success" onClick={this.tambahJadwalMenuBaru}>ADD SCHEDULE</MDBBtn>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }   
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 mt-3 ml-3">
                                                    <p className="font-weight-bold">NEW MENU:</p>
                                                    <label htmlFor="inputPlaceholderEx">Menu Name</label>
                                                    <input placeholder="Input Menu Name" type="text" id="inputPlaceholderEx" className="form-control mb-3" onChange={(e) => this.setState({inputNamaMenuBaru: e.target.value})}/>
                                                    <h6 style={{marginBottom: -10}}>Description</h6>
                                                    <MDBInput hint="Input Description" type="textarea" outline onChange={(e) => this.setState({inputDeskripsiMenu: e.target.value})}/>
                                                    <MDBBtn color="success" onClick={this.tambahMenuDanJadwal}>Add Schedule</MDBBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle(9)}>OK</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </>
                    :
                    null
                }
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