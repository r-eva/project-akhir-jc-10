import React, { Component } from 'react';
import Axios from 'axios'
import { urlRealApi } from '../../../helpers/database'
import './LanggananAdmin.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'

class LanggananAdmin extends Component {
    state = {
        listPaket: []
    }

    componentDidMount(){
        this.getDataPaket()
    }

    getDataPaket = () => {
        Axios.get(urlRealApi + 'getLangganan')
        .then((res) => {
            this.setState({listPaket: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    renderProduct = () => {
        var jsx = this.state.listPaket.map(val => {
            return (
                <tr key={val.id} className='text-dark'>
                    <td>{val.id}</td>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td>{val.discount}</td>
                    {/* <td><img src={val.image} alt="gambarpaket" className="img-thumbnail img-produk"/></td> */}
                </tr>
            )
        })
        return jsx
    }
    
    render() {
        if(this.props.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
            <div className="container-fluid mt-5 pt-5">
                <div className="row mt-5 mb-5 mr-3 ml-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-0 text-center">
                                <h3>MANAGE PRODUK LANGGANAN</h3>
                            </div>
                            <div className="card-body">
                                <MDBTable hover className="text-white" scrollY maxHeight="80vh">
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