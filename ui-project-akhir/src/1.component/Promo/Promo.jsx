import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import {connect} from 'react-redux'
import { MDBJumbotron, MDBCol, MDBCard, MDBCardImage} from "mdbreact";

class Promo extends Component {

    state = {
        dataLanggananPromo: []
    }

    componentDidMount () {
        this.getDataLangganan()
    }

    getDataLangganan = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananPromo')
        .then(res => {
            this.setState({dataLanggananPromo: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderDataLanggananPromo = () => {
        var jsx = this.state.dataLanggananPromo.map(val => {
            return (
                <div className="col-6 col-md-3" key={val.id}>
                    <MDBCard className="my-3">
                        <Link to={"product-detail/" + val.id}><MDBCardImage src={`${urlApi}${val.imagePath}`} alt='Img produk masih kosong' style={{
                            width:'255px', height: '200px', borderRadius: '4px', padding: '7px' 
                            }} className="img-fluid">
                        </MDBCardImage></Link>
                            <div className="discount">{val.discount}%</div>
                            <h4 className="product-name"><p className="font-weight-bolder text-white bg-success" style={{fontSize: '20px'}}>&nbsp;&nbsp;{val.namaPaket}</p></h4>
                            <h6 className="mt-4 pt-1" style={{color:'grey', fontSize: '15px', paddingLeft: '10px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.harga)}</h6>
                            <h6 style={{color:'red', fontSize: '15px', paddingRight: '10px', textAlign: 'right'}}>Now Rp. {new Intl.NumberFormat('id-ID').format(val.harga - (val.harga * (val.discount/100)))}</h6>
                    </MDBCard>
                </div>
            )
        })
        return jsx
    }

    render() {
        if(this.props.user.role === 'admin')
        return <Redirect to="/jadwalAdmin" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/545042/pexels-photo-545042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <div className="py-5">
                            <div className="pt-5 mt-5">
                            <h1 style={{marginRight: '560px', marginLeft: '560px'}} className="title-h1 h1-responsive font-weight-bold bg-rgba(233, 30, 99, 0.7) rgba-pink-strong">PROMO</h1>
                            </div>
                            <p className="mx-5 bg-rgba(255, 255, 255, 0.3) rgba-white-light font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>A healthy diet doesn't have to be expensive.There are plenty of affordable, nutrient-dense foods you can purchase without breaking the bank. The menu listed below are both cheap and healthy, making them a great addition to your diet.
                            </p>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container">
                    <div className="row mb-5">
                        {this.renderDataLanggananPromo()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(Promo);