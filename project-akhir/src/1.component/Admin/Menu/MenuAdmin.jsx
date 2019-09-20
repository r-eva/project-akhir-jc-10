import React, { Component } from 'react';
import './Style.css'
import HealtyAdmin from './HealtyAdmin';
import BreakfastAdmin from './BreakfastAdmin';
import LunchAdmin from './LunchAdmin';
import DessertAdmin from './DessertAdmin';
import SemuaAdmin from './SemuaAdmin'
import ReadyToCookAdmin from './ReadyToCookAdmin'
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody} from "mdbreact";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Menu extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        if(this.props.role !== 'admin')
        return <Redirect to="/" exact/>
        return (
            <>
                <div className="container-fluid mt-5 pt-5">
                    <br/>
                    <MDBRow>
                        <MDBCol className="col-3 ml-3 mt-4 mb-5">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 1})}><img src='https://img.icons8.com/clouds/2x/food.png' alt='All Menu Icon' style={{width: '70px'}}></img><br/>Semua</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 2})}><img src='https://i.pinimg.com/originals/63/0d/96/630d96bbb40088587c50e1fc7307c10a.png' alt='Breakfast Menu Icon' style={{width: '50px'}}></img><br/>Breakfast</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 3})}><img src='https://www.pngtube.com/myfile/detail/494-4942817_indian-dinner-of-dreams-vietnamese-food-icons-png.png' alt='Lunch Menu Icon' style={{width: '60px'}}></img><br/>Lunch</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 4})}><img src='http://www.myiconfinder.com/uploads/iconsets/256-256-12bbf9db6249ac6adcc273a20d19bdee-food.png' alt='Healty Menu Icon' style={{width: '50px'}}></img><br/>Healty</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 5})}><img src='https://www.pngrepo.com/png/52058/170/dessert.png' alt='Dessert Menu Icon' style={{width: '50px'}}></img><br/>Dessert</MDBBtn>
                                    <MDBBtn outline color="blue-grey" className='btn-block' onClick={() => this.setState({tabMenu : 6})}><img src='https://cdn3.iconfinder.com/data/icons/tutti-frutti-color/128/Hazelnut-512.png' alt='Ready to Cook Menu Icon' style={{width: '70px'}}></img><br/>Ready To Cook</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <div className="col-8 mt-4">
                                {this.state.tabMenu === 1 ? <SemuaAdmin/> : null}
                                {this.state.tabMenu === 2 ? <BreakfastAdmin/> : null}
                                {this.state.tabMenu === 3 ? <LunchAdmin/> : null}
                                {this.state.tabMenu === 4 ? <HealtyAdmin/> : null}
                                {this.state.tabMenu === 5 ? <DessertAdmin/> : null}
                                {this.state.tabMenu === 6 ? <ReadyToCookAdmin/> : null}
                        </div>
                    </MDBRow>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}
export default connect(mapStateToProps)(Menu);