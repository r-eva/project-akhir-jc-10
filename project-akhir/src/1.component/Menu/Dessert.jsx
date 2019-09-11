import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact'

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
                <div className="col-6 col-md-3 mt-4 mb-5">
                    <MDBCard>
                        <MDBCardImage className="img-fluid rounded" src={val.img} style={{width: "200px", height: "200px"}} hover zoom />
                        <MDBCardBody>
                        <MDBCardTitle><h6>{val.productName}</h6></MDBCardTitle>
                        <MDBCardText>
                            Rp. {val.price}
                        </MDBCardText>
                        <MDBBtn>ADD TO CART</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderDessert()}
                </div>
            </div>
        );
    }
}

export default Dessert;