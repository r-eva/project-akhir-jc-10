import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../fotoku/annora.png';
import {
    Navbar,
    Nav
} from "react-bootstrap";
import Connect from 'react-redux'

class Navigation extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Navbar
                    expand="lg sticky-top"
                    style={{
                    backgroundColor: "#ffffff",
                    opacity: "0.9",
                    filter: "alpha(opacity=50)"
                }} inverse collapseOnSelect className="nav-bar">
                    <Navbar.Brand className="d-lg-none"><Link to="/"><img src={logo} width={200} alt='LinkMain'/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-between font-weight-bold pl-5 pr-5 mr-5 ml-5">
                        <Nav className="justify-content-between">
                            <Nav.Link><Link to="/Menu" style={{color: 'black'}}>MENU</Link></Nav.Link>
                            <Nav.Link><Link to="/Langganan" style={{color: 'black'}}>LANGGANAN</Link></Nav.Link>
                            <Nav.Link><Link to="/Promo" style={{color: 'black'}}>PROMO</Link></Nav.Link>
                        </Nav>
                        <Navbar.Brand className="d-none d-lg-block"><Link to="/"><img src={logo} width={200} alt='LinkMain'/></Link></Navbar.Brand>
                        <Nav className="jutify-content-between">
                            <Nav.Link><Link to="/Bantuan" style={{color: 'black'}}>BANTUAN</Link></Nav.Link>
                            <Nav.Link><Link to="/Keranjang" style={{color: 'black'}}>KERANJANG</Link></Nav.Link>
                            {
                                this.props.userObj.username !== ''
                                ?
                                <>
                                    <Nav.Link style={{color: 'black'}}>{this.props.userObj.username}</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link><Link to="/Register" style={{color: 'black'}}>REGISTER</Link></Nav.Link>
                                    <Nav.Link><Link to="/Login" style={{color: 'black'}}>LOGIN</Link></Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj: state.user
    }
}

export default Connect(mapStateToProps)(Navigation);