import React, { Component } from 'react';
import './Langganan.css';
import {Redirect, Link} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBJumbotron, MDBCol, MDBCardTitle, MDBBtn, MDBCard, MDBCardImage} from "mdbreact";
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
                    <MDBCard className="my-3">
                        <Link to={"product-detail/" + val.id}><MDBCardImage src={`${urlApi}${val.imagePath}`} alt='Img produk masih kosong' className= "img-fluid" style={{
                            width:'255px', height: '200px', borderRadius: '4px', padding: '6px' 
                            }}>
                        </MDBCardImage></Link>
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
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1405762/pexels-photo-1405762.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">LANGGANAN</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
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
                            <div className="row">
                                <div className="col-12 mb-2 mt-2">
                                    <MDBBtn color="secondary" className="btn btn-block" onClick={this.getDataLangganan}>View All Menu</MDBBtn>
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
                                <input type="button" className='disabled' value="<<Previous Page"/>
                                :
                                <input type="button" className='btn-secondary' value="<<Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                            }
                            {
                                this.state.dataLangganan.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                                ?
                                <input type="button" className='ml-2 disabled' value="Next Page>>"/>
                                :
                                <input type="button" className='btn-secondary ml-2' value="Next Page>>" onClick={() => this.setState({page: this.state.page + 1})}/>
                            }
                        </div>
                    </div>
                </div>
                {/* <div className="row m-5">
                    <div className="col-12 border">
                        <div className="row container">
                            <div className="col-12">
                                <div className="row">
                                    <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold py-0'><img src='https://www.pngtube.com/myfile/detail/494-4942817_indian-dinner-of-dreams-vietnamese-food-icons-png.png' alt='Meal Menu Icon' style={{width: '50px'}}></img>&nbsp;Meal Box</MDBBtn>                                
                                    <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold py-0'><img src='https://i.pinimg.com/originals/63/0d/96/630d96bbb40088587c50e1fc7307c10a.png' alt='Snack Menu Icon' style={{width: '50px'}}></img>&nbsp;Snack Time</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold px-2'><img src='https://cdn2.iconfinder.com/data/icons/sweet-and-dessert-line-color-patisserie/512/Cupcake-512.png' alt='Dessert Menu Icon' style={{width: '50px'}}></img>&nbsp;Dessert and Beverages</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='mb-2 font-weight-bold px-4'><img src='https://cdn4.iconfinder.com/data/icons/baking-ingredients/100/baking_ingredients_food_color-19-512.png' alt='Other Menu Icon' style={{width: '50px'}}></img>&nbsp;Other</MDBBtn>
                                </div>
                            </div>
                        </div>
                        <div className="row container">
                            {this.renderKategoriLangganan()}
                        </div>
                        <div className="col-12 text-center mt-3 mb-3">
                            {
                                this.state.page === 0
                                ?
                                <input type="button" className='disabled' value="<<Previous Page"/>
                                :
                                <input type="button" className='btn-secondary' value="<<Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                            }
                            {
                                this.state.dataLangganan.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                                ?
                                <input type="button" className='ml-2 disabled' value="Next Page>>"/>
                                :
                                <input type="button" className='btn-secondary ml-2' value="Next Page>>" onClick={() => this.setState({page: this.state.page + 1})}/>
                            }
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(Langganan);