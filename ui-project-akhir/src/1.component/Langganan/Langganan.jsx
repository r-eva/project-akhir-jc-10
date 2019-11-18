import React, { Component } from 'react';
import './Langganan.css';
import {Redirect, Link} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBJumbotron, MDBCol, MDBBtn, MDBCard, MDBCardImage, MDBView} from "mdbreact";
import {connect} from 'react-redux'


class Langganan extends Component {

    state = {
        dataLangganan: [],
        page: 0,
        pageContent: 12,
        kategoriKlick: ''
    }

    componentDidMount () {
        this.getDataLangganan()
    }

    getDataLangganan = () => {
        Axios.get(urlApi + 'langganan/getKategoriLangganan')
        .then(res => {
            this.setState({dataLangganan: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataLanggananByKategori = (kategori) => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/' + kategori)
        .then(res => {
            this.setState({dataLangganan: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataLanggananUnder20 = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananUnder20')
        .then(res => {
            this.setState({dataLangganan: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataLanggananTerbaik = () => {
        Axios.get(urlApi + 'langganan/daftarProdukTerbaik')
        .then(res => {
            this.setState({dataLangganan: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderKategoriLangganan = () => {
        let showData = this.state.dataLangganan.slice(this.state.page * this.state.pageContent, this.state.page * this.state.pageContent + this.state.pageContent)
        var jsx = showData.map(val => {
            return (
                <div className="col-6 col-md-3" key={val.id}>
                    <MDBCard className="my-4">
                        <Link to={"product-detail/" + val.id}>
                        <MDBView hover zoom>
                            <MDBCardImage src={`${urlApi}${val.imagePath}`} alt='Img produk masih kosong' className= "img-fluid" style={{
                            width:'255px', height: '200px', borderRadius: '4px', padding: '6px' 
                            }}>
                            </MDBCardImage>
                        </MDBView>
                        </Link>
                            {
                                val.discount > 0
                                ?
                                <div className="discount">{val.discount}%</div>
                                :
                                null
                            }
                            <h4 className="product-name"><p className="font-weight-bolder text-white bg-success" style={{fontSize: '20px'}}>&nbsp;&nbsp;{val.namaPaket}</p></h4>
                            {
                                val.discount > 0
                                ?
                                <>
                                <h6 className="mt-4 pt-1" style={{color:'grey', fontSize: '15px', paddingLeft: '10px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.harga)}</h6>
                                <h6 style={{color:'red', fontSize: '15px', paddingRight: '10px', textAlign: 'right'}}>Now Rp. {new Intl.NumberFormat('id-ID').format(val.harga - (val.harga * (val.discount/100)))}</h6>
                                </>
                                :
                                <>
                                <h6 className="mt-4 pt-1" style={{color:'grey', fontSize: '15px', paddingLeft: '10px', paddingBottom: '28px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.harga)}</h6>
                                </>
                            }
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
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <div className="py-5">
                            <div className="pt-5 mt-5 ">
                                <h1 style={{marginRight: '530px', marginLeft: '530px'}} className="title-h1 h1-responsive font-weight-bold bg-rgba(255, 152, 0, 0.7) rgba-orange-strong">SUBSCRIBE</h1>
                            </div>
                                <p className="mx-5 font-weight-bold bg-rgba(255, 255, 255, 0.3) rgba-white-strong tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                            </p>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className='container'>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <div className="row">
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={() => this.getDataLanggananByKategori('mealbox')}><img src='https://www.pngtube.com/myfile/detail/494-4942817_indian-dinner-of-dreams-vietnamese-food-icons-png.png' alt='Meal Menu Icon' style={{width: '50px'}}></img><br/>Meal Box</MDBBtn>
                                </div>
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={() => this.getDataLanggananByKategori('snack')}><img src='https://i.pinimg.com/originals/63/0d/96/630d96bbb40088587c50e1fc7307c10a.png' alt='Snack Menu Icon' style={{width: '50px'}}></img><br/>Snack Time</MDBBtn>
                                </div>
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={() => this.getDataLanggananByKategori('sweets')}><img src='https://cdn2.iconfinder.com/data/icons/sweet-and-dessert-line-color-patisserie/512/Cupcake-512.png' alt='Dessert Menu Icon' style={{width: '50px'}}></img><br/>Sweets</MDBBtn>
                                </div>
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={() => this.getDataLanggananByKategori('others')}><img src='https://cdn4.iconfinder.com/data/icons/baking-ingredients/100/baking_ingredients_food_color-19-512.png' alt='Other Menu Icon' style={{width: '50px'}}></img><br/>Other</MDBBtn>
                                </div>
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={this.getDataLanggananTerbaik}><img src='https://cdn4.iconfinder.com/data/icons/business-636/64/award-medal-reward-badge-best_seller-512.png' alt='Other Menu Icon' style={{width: '50px'}}></img><br/>Best Seller</MDBBtn>
                                </div>
                                <div className="col-6 col-md-2">
                                <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold btn btn-block' onClick={this.getDataLanggananUnder20}><img src='https://www.searchpng.com/wp-content/uploads/2019/02/Like-Button-Instagram-PNG.png' alt='Other Menu Icon' style={{width: '50px'}}></img><br/>Under 20K</MDBBtn>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-12">
                                    <MDBBtn color="blue-grey" className="btn btn-block" onClick={this.getDataLangganan}>View All Menu</MDBBtn> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-5">                
                                    <h3 className="text-center tagline-menu">“By choosing healthy over skinny, you are choosing self-love over self-judgement.”</h3>
                                    <h5 className="blockquote-footer text-center"><cite title="Source Title">Steve Maraboli</cite></h5>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                {this.renderKategoriLangganan()}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-4 mb-5">
                            {
                                this.state.page === 0
                                ?
                                <input type="button" className='disabled btn btn-blue-grey rounded' value="Previous Page"/>
                                :
                                <input type="button" className='btn btn-primary rounded' value="Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                            }
                            {
                                this.state.dataLangganan.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                                ?
                                <input type="button" className='ml-2 disabled btn btn-blue-grey rounded' value="Next Page"/>
                                :
                                <input type="button" className='btn btn-primary ml-2 rounded' value="Next Page" onClick={() => this.setState({page: this.state.page + 1})}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(Langganan);