import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../helpers/database';
import { MDBJumbotron, MDBCol} from "mdbreact";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import { MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact'

class Wishlist extends Component {

    state = {
        data: [],
        showDetails: false,
        detailIdx: null
    }

    componentDidMount () {
        this.getDataWishlist()
    }

    getDataWishlist = () => {
        Axios.get(urlApi + 'wishlist/getWishlistByIdUser/' + this.props.user.id)
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderWishlist = () => {
        let jsx = this.state.data.map((val, idx) => {
            return (
                <tr key={val.id} className="text-center">
                    <td>{idx+1}</td>
                    <td><Link to={"product-detail/" + val.idPaket}>{val.namaPaket}</Link></td>
                    <td>
                        <Link to={"product-detail/" + val.idPaket}><img src={`${urlApi}${val.imagePath}`} style={{
                        width:'170px', height: '170px', borderRadius: '4px', padding: '5px'
                        }} alt='Cannot Get Transfer Proof'></img></Link>
                    </td>
                    <td>{val.harga}</td>
                    <td>{val.discount}</td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        if (this.props.user.role === 'admin' || this.props.user.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="pt-5 pb-5">
                        <div className="pt-5 pb-5">
                            <div className="pt-5 mt-5">
                                <h1 style={{marginRight: '470px', marginLeft: '470px'}} className="title-product-detail h1-responsive font-weight-bold bg-rgba(244, 67, 54, 0.7) rgba-red-strong">WISH LIST</h1>
                            </div>
                            <div className="mx-md-5 px-md-5">
                                <p className="mx-4 mx-md-5 pl-md-5 pr-md-5 bg-rgba(255, 255, 255, 0.7) rgba-white-strong font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>
                                    “The best meal at my restaurant is the whole right side of the menu.”<br/>
                                    <span style={{fontSize: '15px', fontFamily: 'sans-serif'}}>― Junior Seau</span>
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                {
                    this.state.data.length === 0
                    ?
                    <h1 className="text-center mt-5" style={{marginBottom: '500px'}}>WISH LIST IS EMPTY</h1>
                    :
                    <div className="container">
                            <div className="card mb-5">
                                <div className="card-body">
                                    <MDBTable hover scrollY maxHeight="100vh">
                                        <MDBTableHead color="success-color text-center text-white">
                                            <tr>
                                                <th className="font-weight-bold">No. </th>
                                                <th className="font-weight-bold">ITEM NAME</th>
                                                <th className="font-weight-bold">IMAGE</th>
                                                <th className="font-weight-bold">PRICE</th>
                                                <th className="font-weight-bold">DISCOUNT</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                                {this.renderWishlist()}
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Wishlist);