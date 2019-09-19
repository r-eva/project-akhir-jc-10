import React, { Component } from 'react';
import Healty from './Healty';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dessert from './Dessert';
import Semua from './Semua'
import ReadyToCook from './ReadyToCook'
import { MDBBtn, MDBRow, MDBJumbotron, MDBCol, MDBCardTitle, MDBIcon} from "mdbreact";
import './Menu.css'

class Menu extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/2220313/pexels-photo-2220313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">MENU HARI INI</MDBCardTitle>
                        <p className="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                        optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className="container-fluid">
                    <MDBRow>
                        <div className="col-2 ml-3 mr-3 mt-3 mb-5">
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 1})}><img src='https://img.icons8.com/clouds/2x/food.png' alt='All Menu Icon' style={{width: '70px'}}></img><br/>Semua</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 2})}><img src='https://i.pinimg.com/originals/63/0d/96/630d96bbb40088587c50e1fc7307c10a.png' alt='Breakfast Menu Icon' style={{width: '50px'}}></img><br/>Breakfast</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 3})}><img src='https://www.pngtube.com/myfile/detail/494-4942817_indian-dinner-of-dreams-vietnamese-food-icons-png.png' alt='Lunch Menu Icon' style={{width: '60px'}}></img><br/>Lunch</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 4})}><img src='http://www.myiconfinder.com/uploads/iconsets/256-256-12bbf9db6249ac6adcc273a20d19bdee-food.png' alt='Healty Menu Icon' style={{width: '50px'}}></img><br/>Healty</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 5})}><img src='https://www.pngrepo.com/png/52058/170/dessert.png' alt='Dessert Menu Icon' style={{width: '50px'}}></img><br/>Dessert</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block' onClick={() => this.setState({tabMenu : 6})}><img src='https://cdn3.iconfinder.com/data/icons/tutti-frutti-color/128/Hazelnut-512.png' alt='Ready to Cook Menu Icon' style={{width: '70px'}}></img><br/>Ready To Cook</MDBBtn>
                        </div>
                        <div className="col-8 mt-3">
                            <div className="row">
                                {this.state.tabMenu === 1 ? <Semua/> : null}
                                {this.state.tabMenu === 2 ? <Breakfast/> : null}
                                {this.state.tabMenu === 3 ? <Lunch/> : null}
                                {this.state.tabMenu === 4 ? <Healty/> : null}
                                {this.state.tabMenu === 5 ? <Dessert/> : null}
                                {this.state.tabMenu === 6 ? <ReadyToCook/> : null}
                            </div>
                        </div>
                    </MDBRow>
                </div>
            </>
        );
    }
}

export default Menu;