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
} from
"mdbreact";
import CarouselImg1 from '../../fotoku/RTC1.jpeg'
import CarouselImg2 from '../../fotoku/RTC2.jpeg'
import CarouselImg3 from '../../fotoku/RTC3.jpeg'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import HealtyImg1 from '../../fotoku/vegan.jpeg'
import HealtyImg2 from '../../fotoku/noncolesterol.jpeg'
import HealtyImg3 from '../../fotoku/lowcarb.jpeg'

class Main extends Component {

    render() {
        return (
            <div>
                {/* TAGLINE */}
                <section className="tagline">
                    <div className="container">
                        <div className="d-md-flex flex-row">
                            <div className="p-2 bg-success">
                                <h5>Experience Delicious!</h5>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row">
                            <div className="p-2">
                                <h6>We respect and appreciate the eating experience. Our mission isn't just
                                    provide food; it's to give you a full service, worry free dining experience.</h6>
                            </div>
                            <div className="p-2 text-center text-md-left">
                                <button className="btn btn-danger btn-md text-uppercase">MULAI LANGGANAN</button>
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
                            <h1 className="display-4 text-center text-danger">MENU SEHAT ANNORA</h1>
                            <p className="lead text-center">Annora menyediakan makanan enak, sehat, dan bergizi. Kamu bisa pilih sesuai
                                dengan kategori dietmu.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mb-md-1 pb-md-5 text-center">
                    <div className="row justify-content-around">
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardImage className="img-fluid" src={HealtyImg1} style={{width: '150'}} waves/>
                                    <MDBCardBody>
                                    <MDBCardTitle><h5>High Protein Vegan Meal</h5></MDBCardTitle>
                                    <MDBCardText>
                                        Buat kamu yang berhenti makan daging, kamu bisa pesan sayur sayuran aja.
                                    </MDBCardText>
                                    <MDBBtn color="danger">PESAN SEKARANG</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardImage className="img-fluid" src={HealtyImg2} style={{width: '150'}} waves/>
                                    <MDBCardBody>
                                    <MDBCardTitle><h5>Non-Collesterol</h5></MDBCardTitle>
                                    <MDBCardText>
                                        Kamu juga bisa pesan menu lezat tanpa khawatir kolesterol tinggimu kambuh.
                                    </MDBCardText>
                                    <MDBBtn color="danger">PESAN SEKARANG</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <MDBCol>
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardImage className="img-fluid" src={HealtyImg3} style={{width: '150'}} waves/>
                                    <MDBCardBody>
                                    <MDBCardTitle><h5>Low-Carb</h5></MDBCardTitle>
                                    <MDBCardText>
                                        Kalau kamu lagi diet, kurangin karbohidrat dan banyakin protein dan sayurnya aja ya.
                                    </MDBCardText>
                                    <MDBBtn color="danger">PESAN SEKARANG</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </div>
                    </div>
                </section>

                {/* END HEALTY FOOD */}

                {/* CAROUSEL READYTOCOOK */}
                <MDBContainer className='mb-5'>
                    <div className="col-md justify-text-center mb-3">
                        <h1 className="text-center text-danger">READY TO COOK</h1>
                        <h5 className="text-center">Annora menyediakan sayuran, buah, bahan masakan, dan sambal.</h5>
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
                                        className="d-block w-100 border border-light bg-light p-1"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg1}
                                        alt="First slide"/>
                                    <MDBMask overlay="black-light"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">SAYUR DAN BUAH SEGAR</h3>
                                    <p className="font-weight-bold">Apel, Jeruk, Kiwi</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <img
                                        className="d-block w-100 border border-light bg-light p-1"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg2}
                                        alt="Second slide"/>
                                    <MDBMask overlay="black-strong"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">PASTA</h3>
                                    <p className="font-weight-bold">Macaroni, Fusilli, Farfalle</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <img
                                        className="d-block w-100 border border-light bg-light p-1"
                                        style={{
                                        objectFit: "cover"
                                    }}
                                        height="450"
                                        src={CarouselImg3}
                                        alt="Third slide"/>
                                    <MDBMask overlay="black-slight"/>
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive font-weight-bold">BUMBU DAN BAHAN MAKANAN SIAP PROSES</h3>
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

export default Main;