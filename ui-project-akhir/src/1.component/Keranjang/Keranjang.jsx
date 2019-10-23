import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";
import Axios from 'axios'
import {urlApi} from '../../helpers/database'

class Keranjang extends Component {
    
    state = {
        cart: []
    }

    componentDidMount() {
        this.getDataApi(this.props.user.id)
    }

    getDataApi = (userId) => {
        Axios.get(urlApi + `cart/getCartUser/` + userId)
        .then((res)=>{
            this.setState({cart: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditQty = (action, index) => {
        let arrCart = this.state.cart
        if (action === 'min') {
            if(arrCart[index].JumlahBox > 1) {
                arrCart[index].JumlahBox -= 1
                var objCartPut = {
                    idUser: this.props.user.id,
                    idPaket: arrCart[index].idPaket,
                    TanggalMulai: arrCart[index].TanggalMulai,
                    JumlahBox: arrCart[index].JumlahBox,
                    Durasi: arrCart[index].Durasi,
                    totalHarga: arrCart[index].totalHarga
                }
                Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
                .then((res) => {
                    this.getDataApi(this.props.user.id)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        } else if (action === 'add') {
            arrCart[index].JumlahBox += 1
            objCartPut = {
                idUser: this.props.user.id,
                idPaket: arrCart[index].idPaket,
                TanggalMulai: arrCart[index].TanggalMulai,
                JumlahBox: arrCart[index].JumlahBox,
                Durasi: arrCart[index].Durasi,
                totalHarga: arrCart[index].totalHarga
            }
            Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
            .then((res) => {
                this.getDataApi(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    optionClick = (value) => {
        alert(value)
    }

    renderCart = () => {
        var jsx = this.state.cart.map((val, idx) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    {
                        val.discount === null 
                        ?
                        <td>Harga Normal</td>
                        :
                        <td>{val.discount}%</td>
                    }              
                    <td>
                        <input type="button" className="btn btn-secondary" value='+' onClick={()=> this.onBtnEditQty('add', idx)}/>
                        <input type="button" className="btn btn-secondary" value={val.JumlahBox}/>
                        <input type="button" className="btn btn-secondary" value='-' onClick={()=> this.onBtnEditQty('min', idx)}/>
                    </td>
                    <td>
                        <select className="browser-default custom-select" ref='inputDurasi'>
                            <option>{val.Durasi} hari</option>
                            <option value="2">2 hari</option>
                            <option value="5">5 hari</option>
                            <option value="10">10 hari</option>
                            <option value="20">20 hari</option>
                        </select>
                    </td>
                    <td>{val.totalHarga}</td>
                    <td><input type="button" className="btn btn-danger btn-block" value="DELETE"/></td>
                </tr>
            )
        })
        return jsx
    }


    render() {
        if (this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/414660/pexels-photo-414660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">CART</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container">
                <table className='table mt-3 mb-5'>
                    <thead>
                    <tr className="text-center">
                        <th>Nama Paket</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Jumlah Box</th>
                        <th>Durasi</th>
                        <th>Total Harga</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Keranjang)