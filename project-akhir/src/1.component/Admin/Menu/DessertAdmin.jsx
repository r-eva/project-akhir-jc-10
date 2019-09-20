import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../../helpers/database'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'mdbreact'
import './Style.css'
import swal from 'sweetalert';

class DessertAdmin extends Component {

    state = {
        dataDessert: [],
        inputName: '',
        inputPrice: '',
        inputDiscount: '',
        inputDescription: '',
        inputImg: '',
        page: 0,
        pageContent: 3,
        editMode: false,
        editItem: null
    }

    componentDidMount () {
        this.getDessertProduct()
    }

    getDessertProduct = () => {
        Axios.get(urlApi + 'dessert')
        .then(res => {
            this.setState({dataDessert: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderDessert = () => {
        let showData = this.state.dataDessert.slice(this.state.page * this.state.pageContent, this.state.page * this.state.pageContent + this.state.pageContent)
        var jsx = showData.map(val => {
            return (
                <tr>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td>{val.discount}</td>
                    <td>{val.desc}</td>
                    <td><img src={val.img} alt="gambar" width="80px"/></td>
                    <td><input type="button" className="btn btn-success" value="EDIT" onClick={() => this.setState({editMode: true, editItem: val})}/></td>
                    <td><input type="button" className="btn btn-danger" value="DELETE" onClick={() => this.onBtnDelete(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }

    onBtnAdd = () => {
        let produkBaru = {
            productName: this.state.inputName,
            price: this.state.inputPrice,
            discount: this.state.inputDiscount,
            desc: this.state.inputDescription,
            img: this.state.inputImg,
        }
        Axios.post(urlApi + 'dessert', produkBaru)
        .then((res) => {
            swal ('Success', 'Produk Added','success')
            this.getDessertProduct()
        })
        .catch((err) => {
            swal ('Eror', 'Servernya Mati Bro', 'error')
        })
    }

    onBtnSaveEdit = () => {
        let newItem = {
            id: this.state.editItem.id,
            productName: this.refs.editName.value ? this.refs.editName.value : this.state.editItem.productName,
            price: this.refs.editPrice.value ? this.refs.editPrice.value : this.state.editItem.price,
            discount: this.refs.editDiscount.value ? this.refs.editDiscount.value : this.state.editItem.discount,
            desc: this.refs.editDesc.value ? this.refs.editDesc.value : this.state.editItem.desc,
            img: this.refs.editImg.value ? this.refs.editImg.value : this.state.editItem.img
        }
        Axios.put(urlApi + 'dessert/' + this.state.editItem.id, newItem)
        .then (res => {
            this.getDessertProduct()
            swal ('Edit Success', 'Your item sudah diedit', 'success')
        })

        .catch (err => {
            console.log(err)
            swal ('Error', 'Ada masalah bro', 'eror')
        })

        this.setState({editMode: false, editItem: null})
    }

    onBtnDelete = (object) => {
        Axios.delete(urlApi + 'dessert/' + object) 
        .then((res)=> {
            this.getDessertProduct()
            swal ('Delete item', 'Item deleted from list of product', 'success')
        })
        
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header border-0 text-center">
                                <h3>MANAGE PRODUCT</h3>
                            </div>
                            <div className="card-body">
                                <Table dark className="table text-white text-center">
                                    <thead>
                                        <tr>
                                            <th>Nama Produk</th>
                                            <th>Harga</th>
                                            <th>Diskon</th>
                                            <th>Description</th>
                                            <th>Image Url</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderDessert()}
                                    </tbody>
                                </Table>
                                <div className="row">
                                    <div className="col-12 text-center">
                                        {
                                            this.state.page == 0
                                            ?
                                            <input type="button" className='disabled' value="<<Previous Page"/>
                                            :
                                            <input type="button" className='btn-secondary' value="<<Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                                        }
                                        {
                                            this.state.dataDessert.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                                            ?
                                            <input type="button" className='ml-2 disabled' value="Next Page>>"/>
                                            :
                                            <input type="button" className='btn-secondary ml-2' value="Next Page>>" onClick={() => this.setState({page: this.state.page + 1})}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-5">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Add Product</h3>
                            </div>
                            <div className="card-body">
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="Product Name" onChange={(e)=> this.setState({inputName: e.target.value})}></input>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="Price" onChange={(e)=> this.setState({inputPrice: parseInt(e.target.value)})}></input>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="Discount" onChange={(e)=> this.setState({inputDiscount: parseInt(e.target.value)})}></input>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="Description" onChange={(e)=> this.setState({inputDescription: e.target.value})}></input>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="Image URL" onChange={(e)=> this.setState({inputImg: e.target.value})}></input>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <input type="button" className="btn btn-success btn-block" value="ADD" onClick={this.onBtnAdd}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        {
                        this.state.editItem == null 
                        ?
                        null
                        :
                        <Modal isOpen={this.state.editMode}>
                        <ModalHeader toggle={() => this.setState({editMode: false, editItem: null})}>
                            Edit {this.state.editItem.productName}
                        </ModalHeader>
                        <ModalBody>
                        <div className="row">
                            <div className="col-12">
                                <div className="row m-2">
                                        <div className="row mt-3">
                                            <div className="col-4">
                                                <input type="text" ref="editName" className="form-control" placeholder={this.state.editItem.productName}></input>
                                            </div>
                                            <div className="col-4">
                                                <input type="text" ref="editPrice" className="form-control" placeholder={this.state.editItem.price}></input>
                                            </div>
                                            <div className="col-4">
                                                <input type="text" ref="editDiscount" className="form-control" placeholder={this.state.editItem.discount}></input>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <input type="text" ref="editDesc" className="form-control"placeholder={this.state.editItem.desc}></input>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" ref="editImg" className="form-control" placeholder={this.state.editItem.img}></input>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="button" className="btn btn-primary btn-block" value="SAVE" onClick={this.onBtnSaveEdit}></input>
                        </ModalFooter>
                        </Modal>
                    }
                </div>
            </>
        );
    }
}

export default DessertAdmin;