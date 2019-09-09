import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../fotoku/annora.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import {resetUser} from "../../redux/1.actions"
import { MDBIcon } from "mdbreact"

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
                    <Link to="/"><NavbarBrand className="d-md-none"><img src={logo} width={160} alt='LinkMain'/></NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    
                    {/* Show this on md to lg screen */}
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="mr-auto font-weight-bold" navbar>
                                <NavItem>
                                    <Link to="/Menu"><NavLink style={{color: 'black'}}>MENU</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/Langganan"><NavLink style={{color: 'black'}}>LANGGANAN</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                <Link to="/Promo"><NavLink style={{color: 'black'}}>PROMO</NavLink></Link>
                                </NavItem>
                        </Nav>
                        <Link to="/"><NavbarBrand className="d-none d-md-block justify-content-between"><img src={logo} width={200} alt='LinkMain'/></NavbarBrand></Link>
                        <Nav className="ml-auto font-weight-bold" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    {
                                        this.props.userObj.username == 'admin'
                                        ?
                                        <>
                                        <UncontrolledDropdown nav inNavbar className="font-weight-bold">
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
                                        <NavItem>
                                            <Link to="/admin/dashboard"><NavLink style={{color: 'black'}}>DASHBOARD</NavLink></Link>
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
                                        <NavItem>
                                            <Link to="/Keranjang"><NavLink style={{color: 'black'}}><MDBIcon icon="shopping-bag" size="lg" border/></NavLink></Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/bantuan/shopping"><NavLink style={{color: 'black'}}>BANTUAN</NavLink></Link>
                                        </NavItem>
                                        </>
                                    }
                                </>
                            :
                                <>
                                    <NavItem>
                                        <Link to="/Register"><NavLink style={{color: 'black'}}>REGISTER</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/Login"><NavLink style={{color: 'black'}}>LOGIN</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/bantuan/login"><NavLink style={{color: 'black'}}>BANTUAN</NavLink></Link>
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