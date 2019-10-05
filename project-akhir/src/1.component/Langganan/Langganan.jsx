import React, { Component } from 'react';
import './Langganan.css';
import {Redirect} from 'react-router-dom'
import { MDBJumbotron, MDBCol, MDBCardTitle} from "mdbreact";

class Langganan extends Component {
    render() {
        if(this.props.role === 'admin')
        return <Redirect to="/" exact/>
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1405762/pexels-photo-1405762.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)` }}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">LANGGANAN</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                
            </div>
        );
    }
}

export default Langganan;