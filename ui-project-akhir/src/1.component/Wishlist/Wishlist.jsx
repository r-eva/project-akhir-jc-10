import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../helpers/database';
import { MDBJumbotron, MDBCol} from "mdbreact";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

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
                <tr key={val.id}>
                    <td>{idx+1}</td>
                    <td><Link to={"product-detail/" + val.idPaket}>{val.namaPaket}</Link></td>
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
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/33307/carrot-kale-walnuts-tomatoes.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="pt-5 pb-5">
                        <div className="pt-5 pb-5">
                            <div className="pt-5 mt-5">
                                <h1 style={{marginRight: '470px', marginLeft: '470px'}} className="title-product-detail h1-responsive font-weight-bold bg-rgba(244, 67, 54, 0.7) rgba-red-strong">WISH LIST</h1>
                            </div>
                            <div className="mx-md-5 px-md-5">
                                <p className="mx-4 mx-md-5 pl-md-5 pr-md-5 bg-rgba(255, 255, 255, 0.7) rgba-white-strong font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>
                                    “One cannot think well, love well, sleep well, if one has not dined well.”<br/>
                                    <span style={{fontSize: '15px', fontFamily: 'sans-serif'}}>― Virginia Woolf, A Room of One's Own</span>
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
                        <h2 className="text-center mt-5">Wish List</h2>
                        <table className="table my-5 text-center">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Item Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderWishlist()}
                            </tbody>
                        </table>
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