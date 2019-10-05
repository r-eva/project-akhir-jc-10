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
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import {resetUser} from "../../redux/1.actions"
import { MDBIcon } from "mdbreact"
import {Link} from 'react-router-dom'

let cookieObj = new Cookie()

class NavbarComp extends Component {

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

      onBtnLogout = () => {
          cookieObj.remove('userData')
          this.props.resetUser()
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
                    <Link to="/" className="d-md-none"><img src={logo} width={160} alt='LinkMain'/></Link>
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    
                    {/* Show this on md to lg screen */}
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="mr-auto font-weight-bold" navbar>
                            {
                                 this.props.userObj.username === 'admin'
                                 ?
                                 <>
                                    <NavItem className="styling-link">
                                        <Link to="/Admin/Menu" style={{color: 'black'}}>MENU</Link>
                                    </NavItem>
                                    <NavItem className="styling-link">
                                        <Link to="/Admin/Langganan" style={{color: 'black'}}>LANGGANAN</Link>
                                    </NavItem>
                                    <NavItem className="styling-link">
                                        <Link to="/Admin/Promo" style={{color: 'black'}}>PROMO</Link>
                                    </NavItem>
                                 </>
                                 
                                :
                                <>
                                    <NavItem className="styling-link">
                                        <Link to="/Menu" style={{color: 'black'}}>MENU</Link>
                                    </NavItem>
                                    <NavItem className="styling-link"> 
                                        <Link to="/Langganan" style={{color: 'black'}}>LANGGANAN</Link>
                                    </NavItem>
                                    <NavItem className="styling-link">
                                    <Link to="/Promo" style={{color: 'black'}}>PROMO</Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                        <Link to ="/" className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></Link>
                        <Nav className="ml-auto font-weight-bold" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    {
                                        this.props.userObj.username === 'admin'
                                        ?
                                        <>
                                        <UncontrolledDropdown nav inNavbar className="font-weight-bold styling-link">
                                            <DropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                {this.props.userObj.username}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem style={{color: 'black'}}>
                                                    Edit Profile
                                                </DropdownItem>
                                                <DropdownItem style={{color: 'black'}} onClick={this.onBtnLogout}>
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem className="styling-link" style={{paddingTop: '23px'}}>
                                            <Link to="/admin/dashboard" style={{color: 'black'}}>DASHBOARD</Link>
                                        </NavItem>
                                        </>
                                        :
                                        <>
                                        <UncontrolledDropdown nav inNavbar className="font-weight-bold">
                                            <DropdownToggle nav caret style={{color: 'black', textTransform: 'uppercase'}}>
                                                {this.props.userObj.username}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem style={{color: 'black'}}>
                                                    Edit Profile
                                                </DropdownItem>
                                                <Link to="/History">
                                                <DropdownItem style={{color: 'black'}}>
                                                    History
                                                </DropdownItem>
                                                </Link>
                                                <DropdownItem style={{color: 'black'}} onClick={this.onBtnLogout}>
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem className="styling-link">
                                            <Link to="/Keranjang" style={{color: 'black'}}><MDBIcon icon="shopping-bag" size="lg" border/></Link>
                                        </NavItem>
                                        <NavItem className="styling-link">
                                            <Link to="/bantuan/shopping" style={{color: 'black'}}>BANTUAN</Link>
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
                                    <NavItem className="styling-link">
                                        <Link to="/bantuan/login" style={{color: 'black'}}>BANTUAN</Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
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

export default connect(mapStateToProps, {resetUser})(NavbarComp);