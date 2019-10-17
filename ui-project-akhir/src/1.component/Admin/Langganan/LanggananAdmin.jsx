import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../../helpers/database'
import './LanggananAdmin.css'
import { connect } from 'react-redux'
import { MDBTableHead, MDBTable, MDBTableBody, MDBInputGroup} from 'mdbreact'

class LanggananAdmin extends Component {
    state = {
        listPaket: [],
        boxDetail: false,
        selectedProduct: null,
        clickImageLangganan: false,
        imageLanggananAdd: null
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
        this.setState({selectedProduct: selectedProduct})
        this.setState({boxDetail: true})
    }

    // //////////////////////////////////////////// UPLOAD AND EDITING IMAGE ///////////////////////////////////////////

    orderAddImageLanggananClick = () => {
       this.setState({clickImageLangganan: true})
    }

    onBtnAddImageLanggananCancel = () => {
        this.setState({clickImageLangganan: false})
    }


    imageLanggananAddChange = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananAdd: e.target.files })
          } else {
            this.setState({ imageLanggananAdd: null })
          }
    }

    onBtnAddImageLanggananClick = () => {
        
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
       
        return (
            <div className="container-fluid mt-5 pt-md-5">
                <div className="row mt-5 mb-5 mr-3 ml-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>PRODUK LANGGANAN</h3>
                            </div>
                            <div className="card-body">
                                <MDBTable hover className="text-white" scrollY maxHeight="40vh">
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
                                            <div className="col-6">
                                                {
                                                    this.state.selectedProduct.imagePath === null
                                                    ?
                                                    <>
                                                        {
                                                            this.state.clickImageLangganan
                                                            ?
                                                            <div className="col-6">
                                                                <input type="file" onChange={this.imageLanggananAddChange} />
                                                            </div>
                                                            :
                                                            <h6 className='text-center'>Image Masih Kosong</h6>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                    {this.state.selectedProduct.imagePath}
                                                    </>
                                                }   
                                            </div>
                                            <div className="col-6">
                                                <div className="row justify-content-between">
                                                    {
                                                        this.state.selectedProduct.imagePath === null
                                                        ?
                                                        <>
                                                            {
                                                                this.state.clickImageLangganan
                                                                ?
                                                                <>
                                                                <div className="col-6">
                                                                    <input type="button" value="Save Image" className="btn btn-success btn-block" onClick={this.onBtnAddImageLanggananClick}/>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input type="button" value="Cancel" className="btn btn-danger btn-block" onClick={this.onBtnAddImageLanggananCancel}/>
                                                                </div>
                                                                </>
                                                                :
                                                                <div className="col-12">
                                                                    <input type="button" value="Add Image" className="btn btn-info btn-block" onClick={() => this.orderAddImageLanggananClick()}/>
                                                                </div>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                        <div className="col-6">
                                                            <input type="button" value="Edit Image" className="btn btn-info btn-block"/>
                                                        </div>
                                                        <div className="col-6">
                                                            <input type="button" value="Delete Image" className="btn btn-danger btn-block"/>
                                                        </div>
                                                        </>
                                                    }   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 text-center">
                                                <h5>JADWAL CATERING</h5>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 mt-2">
                                                <input type="button" value="SAVE UPDATE PRODUCT" className="btn btn-success btn-block"/>
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