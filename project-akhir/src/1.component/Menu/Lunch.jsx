import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact'

class Lunch extends Component {

    state = {
        dataMainCourse: []
    }

    componentDidMount () {
        this.getMainCourseProduct()
    }

    getMainCourseProduct = () => {
        Axios.get(urlApi + 'mainCourse')
        .then(res => {
            this.setState({dataMainCourse: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderMainCourse = () => {
        var jsx = this.state.dataMainCourse.map(val => {
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
                    {this.renderMainCourse()}
                </div>
            </div>
        );
    }
}

export default Lunch;