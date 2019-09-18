import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../fotoku/annora.png';
import {MDBIcon} from 'mdbreact'

class Footer extends Component {
    render() {
        return (
            <div>
                <section className="bg-light">
                    <div className="container-fluid pt-4 pb-4">
                        <div className="row">
                            <div className="col-12 col-md-3 mb-md-0 mb-4">
                                <p className="font-weight-bold align-self-end">ANNORA RESTAURANT</p>
                                <div className="row">
                                    <div className="col-5">
                                        <h6>
                                            <Link to="/Tentang" className="text-dark">Tentang</Link>
                                        </h6>
                                        <h6>
                                            <Link to="/Testimoni" className="text-dark">Testimoni</Link>
                                        </h6>
                                        <h6>
                                            <Link to="/Karir" className="text-dark">Karir</Link>
                                        </h6>
                                    </div>
                                    <div className="col-5">
                                        <h6>
                                            <Link to='/Kontak' className="text-dark">Kontak</Link>
                                        </h6>
                                        <h6>
                                            <Link to='/Kerjasama' className="text-dark">Kerjasama</Link>
                                        </h6>
                                        <h6>
                                            <Link to='/Saran' className="text-dark">Saran</Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-md-0 mb-4">
                                <div className="row">
                                    <div className="col">
                                        <p className="font-weight-bold text-center md-text-left">
                                            <Link to='/RestaurantGalery' className="text-dark">RESTAURANT GALLERY</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="md-text-left text-center">
                                            <Link to='/RestaurantGalery' className="text-dark">Reservasi</Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-md-0 mb-4 text-center">
                                <img src={logo} className="img-fluid" width={130} alt='LogoNama'/>
                                <p
                                    style={{
                                    fontSize: '12px'
                                }}>&nbsp;&nbsp;Jalan A. Yani No. 234
                                    <br/>
                                    &nbsp;&nbsp;Menteng Dalam, Jakarta Selatans
                                    <br/>
                                    &nbsp;&nbsp;<i className="fas fa-phone-alt">
                                        021-6785947</i>
                                </p>
                            </div>
                            <div className="col-12 col-md-3 align-self-center text-center">
                                <a href="https://www.facebook.com/indonesia.tourism/?ref=br_rs"><MDBIcon fab icon="facebook-square" size="2x" alt='Facebook' style={{color: 'black'}}/></a>&nbsp;
                                <a href="https://twitter.com/twitterid?lang=en"><MDBIcon fab icon="twitter-square" size="2x" alt='Tweeter' style={{color: 'black'}}/></a>&nbsp;
                                <a href="https://www.instagram.com/indtravel/?hl=en"><MDBIcon fab icon="instagram" size="2x" alt='Instagram' style={{color: 'black'}}/></a>&nbsp;
                                <a href="https://www.linkedin.com/company/purwadhikastartupschool/"><MDBIcon fab icon="whatsapp-square" size="2x" alt='Whatsapp' style={{color: 'black'}}/></a>&nbsp;
                                <a href="mailto:website@gmail.com?Subject=Hi%20Eva"><MDBIcon icon="envelope-square" size="2x" alt='Email' style={{color: 'black'}}/></a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default Footer;