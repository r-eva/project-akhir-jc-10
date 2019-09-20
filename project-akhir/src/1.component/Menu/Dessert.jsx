import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBCardImage, MDBCardTitle, MDBCard } from 'mdbreact'
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
                <MDBCard className="ml-3">
                    <MDBCardImage src={val.img} alt='imgproduct' style={{
                        width:'200px', height: '200px', borderRadius: '4px', padding: '5px'
                        }}>
                    </MDBCardImage>
                    {
                        val.discount > 0
                        ?
                        <div className="discount">{val.discount}%</div>
                        :
                        null
                    }
                    <MDBCardTitle className="product-name"><h5 className="font-weight-bolder">{val.productName}</h5></MDBCardTitle>
                    {
                        val.discount > 0
                        ?
                        <>
                        <h6 style={{color:'grey', fontSize: '15px', paddingLeft: '10px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        <h6 style={{color:'red', fontSize: '15px', paddingRight: '10px', textAlign: 'right'}}>Now Rp. {new Intl.NumberFormat('id-ID').format(val.price - (val.price * (val.discount/100)))}</h6>
                        </>
                        :
                        <>
                        <h6 style={{color:'grey', fontSize: '15px', paddingLeft: '10px', paddingBottom: '28px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        </>
                    }
                </MDBCard>
            )
        })
        return jsx
    }

    render() {
        return (
            <>
                {this.renderDessert()}
            </>
        );
    }
}

export default Dessert;