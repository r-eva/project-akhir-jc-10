import React from 'react';
import './Navigation.css'
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import {connect} from 'react-redux'
import {userLogout, hitungCart} from '../../redux/1.actions/userAction'
import {Link} from 'react-router-dom'
import logo from '../../fotoku/annorabaru.png'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,
        MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu,
        MDBDropdownItem, MDBIcon } from 'mdbreact'

class Navbar extends React.Component {

    state = {
        cart: this.props.jumlahCart,
        isOpenDropdown: false
    }

    toggleCollapse = () => {
        this.setState({ isOpenDropdown: !this.state.isOpenDropdown });
      }


    componentDidUpdate(){
        if (this.state.cart !== this.props.jumlahCart) {
            this.props.hitungCart(this.props.user.id)
        }
    }

    constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
        collapse: !this.state.collapse,
        });
    }

    getEncryptedEmail = () => {
        Axios.get(urlApi + 'user/userDashboard/' + this.props.user.email)
            .then((res) => {
                this.setState({encryptedEmail: res.data})
                console.log(this.state.encryptedEmail)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
    return (
            <MDBNavbar color="bg-#ffffff white" fixed="top" dark expand="md" scrolling transparent>
                {
                    this.props.user.role === 'admin'
                    ?
                    <MDBNavLink to="/jadwalAdmin" className="d-md-none">
                        <MDBNavbarBrand>
                            <strong><img src={logo} width={160} alt='LinkMain'/></strong>
                        </MDBNavbarBrand>
                    </MDBNavLink>
                    :
                    <MDBNavLink to="/" className="d-md-none">
                        <MDBNavbarBrand>
                            <strong><img src={logo} width={160} alt='LinkMain'/></strong>
                        </MDBNavbarBrand>
                    </MDBNavLink>
                }
                {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav className="mr-auto font-weight-bold" left>
                    {
                        this.props.user.username !== ''
                        ?
                        <>
                            {
                                this.props.user.role === 'admin'
                                ?
                                <>
                                    <MDBNavItem>
                                        <MDBNavLink to="/Admin/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>PRODUCT</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/analitikTransaksi" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}>USER</MDBNavLink>
                                    </MDBNavItem>
                                </>
                                :
                                <>
                                    <MDBNavItem> 
                                        <MDBNavLink to="/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>SUBSCRIBE</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem> 
                                        <MDBNavLink to="/Promo" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}>PROMO</MDBNavLink>
                                    </MDBNavItem>
                                </>
                            }
                            </>
                        :
                        <>  
                            <MDBNavItem> 
                                <MDBNavLink to="/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>SUBSCRIBE</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem> 
                                <MDBNavLink to="/Promo" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}>PROMO</MDBNavLink>
                            </MDBNavItem>
                        </>
                    }
                </MDBNavbarNav>
                {
                    this.props.user.role === 'admin'
                    ?
                    <MDBNavLink to ="/jadwalAdmin" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain' /></MDBNavLink>
                    :
                    <MDBNavLink to ="/" className="d-none d-md-block justify-content-between"><img src={logo} width={180} alt='LinkMain'/></MDBNavLink>
                }
                <MDBNavbarNav className="ml-auto font-weight-bold" right>
                    {
                        this.props.user.username !== ''
                        ?
                        <>
                            {
                                this.props.user.role === 'admin'
                                ?
                                <>
                                <MDBDropdown className="font-weight-bold bg-rgba(255, 255, 255, 0.7) rgba-white-strong">
                                    <MDBDropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase', marginLeft: 5}}>
                                    Hello, {this.props.user.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu right style={{border: 'none'}}>
                                        <MDBDropdownItem style={{marginRight: '93px', color: 'black', fontSize: '15px'}}  onClick={this.props.userLogout}>
                                            Logout
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                                </>
                                :
                                <>
                                    <MDBNavItem> 
                                        <MDBDropdown className="font-weight-bold bg-rgba(255, 255, 255, 0.7) rgba-white-strong">
                                            <MDBDropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                Hello, {this.props.user.username}
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu right style={{border: 'none'}}>
                                                {
                                                    this.props.user.status === "Verified"
                                                    ?
                                                    <>
                                                        <MDBDropdownItem  style={{color: 'black'}}>
                                                        <Link to="/History" style={{marginLeft: -16, marginRight: 50}} className="font-weight-bold">
                                                            HISTORY
                                                        </Link>
                                                        </MDBDropdownItem >
                                                        <MDBDropdownItem  style={{color: 'black'}}>
                                                            <Link to="/Keranjang" style={{marginLeft: -16, marginRight: 50}} className="font-weight-bold">
                                                                CART
                                                            </Link>
                                                        </MDBDropdownItem >
                                                        <MDBDropdownItem  style={{color: 'black'}}>
                                                            <Link to="/Wishlist" style={{marginLeft: -16, marginRight: 50}} className="font-weight-bold">
                                                                WISHLIST
                                                            </Link>
                                                        </MDBDropdownItem >
                                                    </>
                                                    :
                                                    <>
                                                        <MDBDropdownItem  style={{color: 'black'}}>
                                                            <Link to="/Wishlist" style={{marginLeft: -16, marginRight: 50}} className="font-weight-bold">
                                                                WISHLIST
                                                            </Link>
                                                        </MDBDropdownItem >
                                                        <MDBDropdownItem  style={{color: 'black'}}>
                                                            <Link to={`/waitingemailverification?email=${this.props.user.encryptedEmail}`} style={{marginLeft: -16, marginRight: 50}} className="font-weight-bold">
                                                                    VERIFICATION
                                                            </Link>
                                                        </MDBDropdownItem >
                                                    </>
                                                }
                                                <MDBDropdownItem divider/>
                                                <MDBDropdownItem style={{marginLeft: -5, color: 'black', fontSize: '15px'}} onClick={this.props.userLogout} className="font-weight-bold">
                                                    LOGOUT
                                                </MDBDropdownItem >
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                    <MDBNavItem> 
                                        <MDBNavLink to="/keranjang" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginLeft: '5px'}}><MDBIcon icon="shopping-bag"/> {this.props.jumlahCart}</MDBNavLink>
                                    </MDBNavItem>
                                </>
                            }
                                </>
                        :
                            <>
                                <MDBNavItem>
                                    <MDBNavLink to="/Register" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>REGISTER</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/Login" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}>SIGN IN</MDBNavLink>
                                </MDBNavItem>
                            </>
                    }
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        jumlahCart: state.cart.jumlahCart
    }
}

export default connect(mapStateToProps, {userLogout, hitungCart})(Navbar);