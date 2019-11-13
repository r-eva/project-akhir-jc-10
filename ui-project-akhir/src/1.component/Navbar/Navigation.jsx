import React, {Component} from 'react';
import './Navigation.css'
import logo from '../../fotoku/annora.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { MDBIcon } from "mdbreact"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLogout} from '../../redux/1.actions/userAction'

class Navigation extends Component {

    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
    
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    
    render() {
        return (
            <div>
                {/* Show this only on sm screen */}
                <Navbar light expand="md fixed-top" style={{
                    backgroundColor: "white",
                    opacity: "0.9",
                    filter: "alpha(opacity=50)"
                }}>
                    {
                        this.props.user.role === 'admin'
                        ?
                        <Link to="/jadwalAdmin" className="d-md-none"><img src={logo} width={160} alt='LinkMain'/></Link>
                        :
                        <Link to="/" className="d-md-none"><img src={logo} width={160} alt='LinkMain'/></Link>
                    }
                    
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    
                    {/* Show this on md to lg screen */}
                    <Collapse isOpen={!this.state.collapsed} navbar>
    
                        <Nav className="mr-auto font-weight-bold" navbar>
                            {
                                 this.props.user.username !== ''
                                 ?
                                 <>
                                    {
                                        this.props.user.role === 'admin'
                                        ?
                                        <>
                                            <NavItem className="styling-link">
                                                <Link to="/Admin/Langganan" style={{color: 'black'}}>PRODUK</Link>
                                            </NavItem>
                                            <NavItem className="styling-link">
                                                <Link to="/analitikTransaksi" style={{color: 'black'}}>TRANSAKSI</Link>
                                            </NavItem>
                                        </>
                                        :
                                        <>
                                            <NavItem className="styling-link"> 
                                                <Link to="/Langganan" style={{color: 'black'}}>LANGGANAN</Link>
                                            </NavItem>
                                            <NavItem className="styling-link"> 
                                                <Link to="/History" style={{color: 'black'}}>HISTORY</Link>
                                            </NavItem>
                                        </>
                                    }
                                 </>
                                :
                                <>
                                    <NavItem className="styling-link"> 
                                        <Link to="/Langganan" style={{color: 'black'}}>LANGGANAN</Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                        {
                            this.props.user.role === 'admin'
                            ?
                            <Link to ="/jadwalAdmin" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></Link>
                            :
                            <Link to ="/" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></Link>
                        }
                        
                        <Nav className="ml-auto font-weight-bold" navbar>
                            {
                                this.props.user.username !== ''
                                ?
                                <>
                                    {
                                        this.props.user.role === 'admin'
                                        ?
                                        <>
                                        <UncontrolledDropdown nav inNavbar className="font-weight-bold styling-link">
                                            <DropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                Hello, {this.props.user.username}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem style={{color: 'black'}}>
                                                    Edit Profile
                                                </DropdownItem>
                                                <DropdownItem style={{color: 'black'}} onClick={this.props.userLogout}>
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        </>
                                        :
                                        <>
                                        <UncontrolledDropdown nav inNavbar className="font-weight-bold">
                                            <DropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                Hello, {this.props.user.username}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem style={{color: 'black'}} onClick={this.props.userLogout}>
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem className="styling-link" style={{paddingTop: '5px'}}>
                                            <Link to="/Keranjang" style={{color: 'black'}}><MDBIcon icon="shopping-bag" size="lg" border/>CART</Link>
                                        </NavItem>
                                        </>
                                    }
                                </>
                            :
                                <>
                                    <NavItem className="styling-link">
                                        <Link to="/Register" style={{color: 'black'}}>REGISTER</Link>
                                    </NavItem>
                                    <NavItem className="styling-link">
                                        <Link to="/Login" style={{color: 'black'}}>SIGN IN</Link>
                                    </NavItem >
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps, {userLogout})(Navigation)