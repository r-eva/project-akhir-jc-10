import React, {Component} from 'react';
import './Main.css'
import {
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBMask,
    MDBContainer
} from "mdbreact";
import CarouselImg1 from '../../fotoku/RTC1.jpeg'
import CarouselImg2 from '../../fotoku/RTC2.jpeg'
import CarouselImg3 from '../../fotoku/RTC3.jpeg'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import HealtyImg1 from '../../fotoku/vegieSalad.jpeg'
import HealtyImg2 from '../../fotoku/noncolesterol.jpeg'
import HealtyImg3 from '../../fotoku/oatmeal.jpeg'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'

class Main extends Component {

    state = {
        dataLangganan: [],
        dataMealBox: [],
        dataSweetAndOthers: [],
        randomMealBox: [],
        randomSweet: []
    }

    componentDidMount () {
        this.getDataLangganan()
        this.getDataMealbox()
        this.getDataSweetAndOthers()
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

    getDataMealbox = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/mealbox')
        .then(res => {
            var n = 2
            var randomItems = res.data.sort(() => .5 - Math.random()).slice(0, n);
            this.setState({dataMealBox: res.data, randomMealBox: randomItems})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataSweetAndOthers = () => {
        var tempData = []
        Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/sweets')
        .then(res => {
            tempData.push(...res.data)
            Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/snack')
            .then(res => {
                tempData.push(...res.data)
                var n = 2
                var randomItems = tempData.sort(() => .5 - Math.random()).slice(0, n);
                this.setState({dataSweetAndOthers: tempData, randomSweet: randomItems})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderMenuMealBox = () => {
        var jsx = this.state.dataMealBox.map(val => {
            return (
                <div key={val.id}>
                    <MDBCardText>{val.namaPaket}</MDBCardText>
                </div>
            )
        })
        return jsx
    }

    renderMenuSweetAndOthers = () => {
        var jsx = this.state.dataSweetAndOthers.map(val => {
            return (
                <div key={val.id}>
                    <MDBCardText>{val.namaPaket}</MDBCardText>
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
                {/* TAGLINE */}
                <section className="tagline">
                    <div className="container">
                        <div className="d-md-flex flex-row">
                            <div className="p-2 bg-success">
                                <h5 className="font-weight-bold">Experience Delicious!</h5>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row">
                            <div className="p-2">
                                <h6 className="font-weight-bold" style={{fontFamily: 'Brush Script MT', fontSize:'25px'}}>We respect and appreciate the eating experience. Our mission isn't just
                                    provide food; it's to give you a full service, worry free dining experience.</h6>
                            </div>
                            <div className="text-center text-md-left">
                                <Link to='/Langganan'><MDBBtn color="danger" className="font-weight-bold">START SUBSCRIPTION</MDBBtn></Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END TAGLINE */}

                {/* JUMBOTRON */}
                <section className="jumbotron jumbotron-fluid bg-light">
                    {/* KONTAINER */}
                    <div className="container">
                        {/* MEDIA OBJECT */}
                        <div className="media">
                            <img
                                className="mr-2"
                                src="https://cdn3.iconfinder.com/data/icons/spring-23/32/branch-leaf-spring-easter-nature-ecology-green-512.png"
                                width={70}
                                alt=""/>
                            <div className="media-body">
                                <h6 className="mt-0">Freshness Guaranteed.</h6>
                                Orders are only prepared an hour before delivery – made with only the freshest
                                ingredients. We stress a lot on quality. {/* NESTED MEDIA OBJECT 1 */}
                                <div className="media mt-3">
                                    <div className="pr-2">
                                        <img
                                            src="https://png.pngtree.com/element_our/sm/20180409/sm_5acb28d9e43d1.png"
                                            width={90}
                                            alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0">Incredible value.</h6>
                                        We have something here that works for any budget. Not all good things come with
                                        a hefty price tag.
                                    </div>
                                </div>
                                {/* END NESTED MEDIA OBJECT 1 */}
                            </div>
                        </div>
                        {/* END MEDIA OBJECT */}

                        {/* MEDIA OBJECT */}
                        <div className="media">
                            <img
                                className="mr-2 mt-3"
                                src="https://cdn1.iconfinder.com/data/icons/admin-panel-white-with-multicolor-circle-backgroun/2048/Calendar-512.png"
                                width={65}
                                alt=""/>
                            <div className="media-body mt-3">
                                <h6 className="mt-0">Consistently good food.</h6>
                                We’ve got one chef-in-charge for each item on our menu. That’s how serious we
                                are about consistency. {/* NESTED MEDIA OBJECT 2 */}
                                <div className="media mt-4">
                                    <div className="pr-2">
                                        <img
                                            src="http://icons.iconarchive.com/icons/google/noto-emoji-food-drink/1024/32392-shallow-pan-of-food-icon.png"
                                            width={70}
                                            alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0">Impeccable presentation.</h6>
                                        Whether it’s buffet setups or packaged meals – we make sure everything you
                                        receive is impeccably presented.
                                    </div>
                                </div>
                                {/* END NESTED MEDIA OBJECT 2 */}
                            </div>
                        </div>
                        {/* END MEDIA OBJECT */}
                    </div>
                    {/* END KONTAINER */}
                </section>
                {/* END JUMBOTRON */}

                {/* HEALTY FOOD */}
                <section className="container mb-md-1 pb-md-4">
                    <div className="row">
                        <div className="col justify-text-center">
                            <h1 className="display-4 text-center text-danger">ANNORA HEALTY FOOD</h1>
                            <p className="lead text-center">Annora provides delicious, tasty and healthy food. Please chose your meal today pursuant to your diet preference.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mb-md-1 pb-md-5 text-center">
                    <div className="row justify-content-around">
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBView hover zoom>
                                        <MDBCardImage className="img-fluid" src={HealtyImg1} style={{width: '150'}} waves/>
                                    </MDBView>
                                    <MDBCardBody>
                                    <MDBCardTitle>High Protein Vegan Meal</MDBCardTitle>
                                    <MDBCardText>
                                        For you whose avoid eating animal-based foods, you may order our vegan menu.
                                    </MDBCardText>
                                    <Link to='/product-detail/13'><MDBBtn color="danger">ORDER NOW</MDBBtn></Link>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBView hover zoom>
                                        <MDBCardImage className="img-fluid" src={HealtyImg2} style={{width: '150'}} waves/>
                                    </MDBView>
                                    <MDBCardBody>
                                    <MDBCardTitle>Non-Collesterol</MDBCardTitle>
                                    <MDBCardText>
                                     We offer a diet rich in vegetables, poultry, fish, and nuts to low your cholesterol.
                                    </MDBCardText>
                                    <Link to='/product-detail/8'><MDBBtn color="danger">ORDER NOW</MDBBtn></Link>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBView hover zoom>
                                        <MDBCardImage className="img-fluid" src={HealtyImg3} style={{width: '150'}} waves/>
                                    </MDBView>
                                    <MDBCardBody>
                                    <MDBCardTitle>Low-Carb</MDBCardTitle>
                                    <MDBCardText>
                                        Overnight oat is well-balanced breakfast which contain carbs, protein, and fiber.
                                    </MDBCardText>
                                    <Link to='/product-detail/2'><MDBBtn color="danger">ORDER NOW</MDBBtn></Link>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                    </div>
                </section>

                {/* END HEALTY FOOD */}

               {/* MENU UTAMA HARI INI DAN MENU LAIN */}
                <section className="jumbotron bg-light">
                    <div className="container mb-sm-2 mb-md-4">
                        {/* BARIS PERTAMA */}
                        <div className="row d-flex flex-column-reverse flex-sm-row justify-content-sm-center">
                        <div className="col-12 col-md-4 mb-4 mb-sm-0">
                            <div className="card">
                                {
                                    this.state.randomMealBox.length > 0
                                    ?
                                    <MDBView hover zoom>
                                        <img className="card-img-top card-img-top-new" src={`${urlApi}${this.state.randomMealBox[0].imagePath}`} alt="Javanese" style={{width: '150'}}/>
                                    </MDBView>
                                    :
                                    null
                                }
                            <div className="card-body text-center">
                                {
                                    this.state.randomMealBox.length > 0
                                    ?
                                    <>
                                    <h5>{this.state.randomMealBox[0].namaPaket}</h5>
                                    <h6>Rp. {new Intl.NumberFormat('id-ID').format(this.state.randomMealBox[0].harga - ((this.state.randomMealBox[0].discount/100) * this.state.randomMealBox[0].harga))}</h6>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-4 mb-sm-0">
                            <div className="card">
                                {
                                    this.state.randomMealBox.length > 0
                                    ?
                                    <MDBView hover zoom>
                                        <img className="card-img-top card-img-top-new" src={`${urlApi}${this.state.randomMealBox[1].imagePath}`} alt="Javanese" style={{width: '150'}}/>
                                    </MDBView>
                                    :
                                    null
                                }
                            <div className="card-body text-center">
                                {
                                    this.state.randomMealBox.length > 0
                                    ?
                                    <>
                                    <h5>{this.state.randomMealBox[1].namaPaket}</h5>
                                    <h6>Rp. {new Intl.NumberFormat('id-ID').format(this.state.randomMealBox[1].harga - ((this.state.randomMealBox[1].discount/100) * this.state.randomMealBox[1].harga))}</h6>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 text-center text-sm-left mb-4 mb-sm-0">
                            <div className="card-body m-2 p-0 m-sm-2 m-sm-0">
                                <MDBCardTitle className="font-weight-bold">MEAL BOX MENU</MDBCardTitle>
                                <ul className="list-unstyled" style={{fontSize: '16px'}}>
                                    {this.renderMenuMealBox()}
                                </ul>
                            <Link to='/Langganan'><input type="button" defaultValue="OTHER MENU" className="btn btn-success" /></Link>
                            </div>
                        </div>
                        </div>
                    </div>{/* END BARIS PERTAMA */}
                    <div className="container">
                        {/* BARIS KEDUA */}
                        <div className="row d-flex flex-column-reverse flex-sm-row justify-content-sm-center">
                        <div className="col-12 col-md-4 mb-4 mb-sm-0">
                            <div className="card">
                                {
                                    this.state.randomSweet.length > 0
                                    ?
                                    <MDBView hover zoom>
                                        <img className="card-img-top card-img-top-new" src={`${urlApi}${this.state.randomSweet[1].imagePath}`} alt="Sweet" style={{width: '150'}}/>
                                    </MDBView>
                                    :
                                    null
                                }
                            <div className="card-body text-center">
                                {
                                    this.state.randomSweet.length > 0
                                    ?
                                    <>
                                    <h5>{this.state.randomSweet[1].namaPaket}</h5>
                                    <h6>Rp. {new Intl.NumberFormat('id-ID').format(this.state.randomSweet[1].harga - ((this.state.randomSweet[1].discount/100) * this.state.randomSweet[1].harga))}</h6>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-4 mb-sm-0">
                            <div className="card">
                                {
                                    this.state.randomSweet.length > 0
                                    ?
                                    <MDBView hover zoom>
                                        <img className="card-img-top card-img-top-new" src={`${urlApi}${this.state.randomSweet[0].imagePath}`} alt="Sweet" style={{width: '150'}}/>
                                    </MDBView>
                                    :
                                    null
                                }
                            <div className="card-body text-center">
                                {
                                    this.state.randomSweet.length > 0
                                    ?
                                    <>
                                    <h5>{this.state.randomSweet[0].namaPaket}</h5>
                                    <h6>Rp. {new Intl.NumberFormat('id-ID').format(this.state.randomSweet[0].harga - ((this.state.randomSweet[0].discount/100) * this.state.randomSweet[0].harga))}</h6>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 text-center text-sm-left mb-4 mb-sm-0">
                            <div className="card-body m-2 p-0 m-sm-2 m-sm-0">
                                <MDBCardTitle className="font-weight-bold">SWEET AND OTHERS</MDBCardTitle>
                            <h5 className="card-title text-danger" style={{textDecorationLine: 'underline'}}>
                            </h5>
                            <ul className="list-unstyled" style={{fontSize: '16px'}}>
                                {this.renderMenuSweetAndOthers()}
                            </ul>
                            <Link to='/Langganan'><input type="button" className="btn btn-success" defaultValue="OTHER MENU" /></Link>
                            </div>
                        </div>
                        </div>
                    </div>{/* END BARIS KEDUA */}
                </section>
                {/* END MENU UTAMA HARI INI DAN MENU LAIN */}


                {/* CAROUSEL READYTOCOOK */}
                <MDBContainer className='mb-5'>
                    <div className="col-md justify-text-center mb-3">
                        <h1 className="text-center text-danger">READY TO COOK</h1>
                        <h5 className="text-center">The ingredients on this package are semi-cooked. All you need is following the steps and prepare it properly.</h5>
                    </div>
                    <MDBCarousel
                        activeItem={1}
                        interval={2000}
                        length={3}
                        showControls={true}
                        showIndicators={true}
                        className="z-depth-1">
                        <MDBCarouselInner>
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                    <img
                                        className="d-block w-100 border border-light"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg1}
                                        alt="First slide"/>
                                    <MDBMask overlay="black-light"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">VEGETABLES AND FRUITS ARE FRESH</h3>
                                    <p className="font-weight-bold">Cucumbers, radishes, Nuts, Berries and Seeds</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <img
                                        className="d-block w-100 border border-light"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg2}
                                        alt="Second slide"/>
                                    <MDBMask overlay="black-light"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">PASTA PACKAGE</h3>
                                    <p className="font-weight-bold">Several kind of pasta, such as Macaroni, Fusilli, and Farfalle</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <img
                                        className="d-block w-100 border border-light"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg3}
                                        alt="Third slide"/>
                                    <MDBMask overlay="black-light"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">THE SPICES AND MATERIAL ARE READY TO COOK</h3>
                                    <p className="font-weight-bold">Roasted Chicken, Salmon Fillet, Tenderloin Steak</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>
                {/* END CAROUSEL */}
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(Main);