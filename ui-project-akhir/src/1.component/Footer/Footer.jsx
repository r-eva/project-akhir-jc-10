import React, {Component} from 'react';
import {MDBIcon} from 'mdbreact'

class Footer extends Component {
    render() {
        return (
            <div>
                <section className="bg-light">
                    <div className="container-fluid pt-2 pb-2">
                        <div className="row justify-content-center">
                            <div className="col-12 align-self-center text-center">
                                <h6 className="font-weight-bolder mt-2">ANNORA CATERING AND RESTO</h6>
                                <div className="mb-3">
                                    <a href="https://www.facebook.com/indonesia.tourism/?ref=br_rs"><MDBIcon fab icon="facebook-square" size="2x" alt='Facebook' style={{color: 'black'}}/></a>&nbsp;
                                    <a href="https://twitter.com/twitterid?lang=en"><MDBIcon fab icon="twitter-square" size="2x" alt='Tweeter' style={{color: 'black'}}/></a>&nbsp;
                                    <a href="https://www.instagram.com/indtravel/?hl=en"><MDBIcon fab icon="instagram" size="2x" alt='Instagram' style={{color: 'black'}}/></a>&nbsp;
                                    <a href="https://www.linkedin.com/company/purwadhikastartupschool/"><MDBIcon fab icon="whatsapp-square" size="2x" alt='Whatsapp' style={{color: 'black'}}/></a>&nbsp;
                                    <a href="mailto:website@gmail.com?Subject=Hi%20Eva"><MDBIcon icon="envelope-square" size="2x" alt='Email' style={{color: 'black'}}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default Footer;