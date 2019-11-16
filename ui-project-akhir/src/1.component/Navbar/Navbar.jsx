import React from 'react';
import './Navigation.css'
import {connect} from 'react-redux'
import {userLogout, hitungCart} from '../../redux/1.actions/userAction'
import logo from '../../fotoku/annora.png'
import logoOnscroll from '../../fotoku/annorawritingcut.png'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,
        MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu,
        MDBDropdownItem, MDBIcon } from 'mdbreact'

class Navbar extends React.Component {

    state = {
        cart: this.props.jumlahCart
    }

    componentDidMount() {
        this.props.hitungCart(this.props.user.id)
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

    render() {
    return (
      <div>
        <header>
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
                                        <MDBNavLink to="/Admin/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>PRODUK</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/analitikTransaksi" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}>USER</MDBNavLink>
                                    </MDBNavItem>
                                </>
                                :
                                <>
                                    <MDBNavItem> 
                                        <MDBNavLink to="/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>LANGGANAN</MDBNavLink>
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
                                <MDBNavLink to="/Langganan" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black', marginRight: '5px'}}>LANGGANAN</MDBNavLink>
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
                    <MDBNavLink to ="/jadwalAdmin" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></MDBNavLink>
                    :
                    <MDBNavLink to ="/" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></MDBNavLink>
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
                                <MDBDropdown nav inNavbar className="font-weight-bold">
                                    <MDBDropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                        Hello, {this.props.user.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem style={{color: 'black'}}>
                                            Edit Profile
                                        </MDBDropdownItem>
                                        <MDBDropdownItem style={{color: 'black'}} onClick={this.props.userLogout}>
                                            Logout
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                                </>
                                :
                                <>
                                    <MDBNavItem> 
                                        <MDBDropdown nav inNavbar className="font-weight-bold bg-rgba(255, 255, 255, 0.7) rgba-white-strong mr-1">
                                            <MDBDropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                Hello, {this.props.user.username}
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu right>
                                                <MDBNavLink to="/History">
                                                    <MDBDropdownItem  style={{color: 'black'}}>
                                                        History
                                                    </MDBDropdownItem >
                                                </MDBNavLink>
                                                    <MDBDropdownItem  style={{color: 'black'}} onClick={this.props.userLogout}>
                                                        Logout
                                                    </MDBDropdownItem >
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                    <MDBNavItem> 
                                        <MDBNavLink to="/Keranjang" className="bg-rgba(255, 255, 255, 0.7) rgba-white-strong" style={{color: 'black'}}><MDBIcon icon="shopping-bag"/> CART {this.props.jumlahCart}</MDBNavLink>
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
        </header>
      </div>
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