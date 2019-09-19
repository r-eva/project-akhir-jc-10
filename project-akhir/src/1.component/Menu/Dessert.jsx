import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBCardBody, MDBCardTitle, MDBCardText} from 'mdbreact'
import './Menu.css'

class Dessert extends Component {

    state = {
        dataDessert: []
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
        var jsx = this.state.dataDessert.map(val => {
            return (
                <div className="card col-md-3 mb-2" style={{width:'18rem'}}>
                    <img src={val.img} className="card-img-top img" height='150px' hover zoom alt='imgproduct'></img>
                    {
                        val.discount > 0
                        ?
                        <div className="discount">{val.discount}%</div>
                        :
                        null
                    }
                    <MDBCardBody>
                    <MDBCardTitle><h6>{val.productName}</h6></MDBCardTitle>
                    <MDBCardText>
                    {
                        val.discount > 0
                        ?
                        <>
                        <h6 style={{textDecoration : 'line-through', color:'red', fontSize: '13px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        <h6>Rp. {new Intl.NumberFormat('id-ID').format(val.price - (val.price * (val.discount/100)))}</h6>
                        </>
                        :
                        <>
                        <h6>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        </>
                    }
                    </MDBCardText>
                    </MDBCardBody>
                    <div className="card-footer" style={{backgroundColor:'inherit'}}>
                        <input type='button' className='btn-success btn-block' value='Add To Cart'/>
                    </div>
                </div>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container-fluid">
                {this.renderDessert()}
            </div>
        );
    }
}

export default Dessert;