import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact'

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
                <div className="card col-6 col-md-3 mx-1 my-5 p-1" style={{width:'18rem'}}>
                <MDBCardImage src={val.img} className="card-img-top img" height='200px' hover zoom />
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
                    <h6 style={{textDecoration : 'line-through', color:'red', fontSize: '3'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                    <h6 className="card-text">Rp. {new Intl.NumberFormat('id-ID').format(val.price - (val.price * (val.discount/100)))}</h6>
                    </>
                    :
                    <>
                    <h6>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                    </>
                }
                </MDBCardText>
                </MDBCardBody>
                <div className="card-footer" style={{backgroundColor:'inherit'}}>
                    <input type='button' className='d-block btn btn-success btn-block' value='Add To Cart'/>
                </div>
            </div>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.renderMainCourse()}
                </div>
            </div>
        );
    }
}

export default Lunch;