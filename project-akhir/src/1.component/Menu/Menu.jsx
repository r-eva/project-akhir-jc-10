import React, { Component } from 'react';
import './Style.css'
import Healty from './Healty';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dessert from './Dessert';
import Semua from './Semua'
import ReadyToCook from './ReadyToCook'
import { MDBBtn, MDBRow} from "mdbreact";

class Menu extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <>
                <div className="container-fluid mt-5 pt-5 mb-5">
                    <br/>
                    <br/>
                    <MDBRow>
                        <div className="col-2 ml-3 mr-3">
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 1})}><img src='https://img.icons8.com/clouds/2x/food.png' alt='All Menu Icon' style={{width: '70px'}}></img><br/>Semua</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 2})}><img src='https://i.pinimg.com/originals/63/0d/96/630d96bbb40088587c50e1fc7307c10a.png' alt='Breakfast Menu Icon' style={{width: '50px'}}></img><br/>Breakfast</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 3})}><img src='https://www.pngtube.com/myfile/detail/494-4942817_indian-dinner-of-dreams-vietnamese-food-icons-png.png' alt='Lunch Menu Icon' style={{width: '60px'}}></img><br/>Lunch</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 4})}><img src='http://www.myiconfinder.com/uploads/iconsets/256-256-12bbf9db6249ac6adcc273a20d19bdee-food.png' alt='Healty Menu Icon' style={{width: '50px'}}></img><br/>Healty</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block mb-2' onClick={() => this.setState({tabMenu : 5})}><img src='https://www.pngrepo.com/png/52058/170/dessert.png' alt='Dessert Menu Icon' style={{width: '50px'}}></img><br/>Dessert</MDBBtn>
                        <MDBBtn outline color="blue-grey" className='btn-block' onClick={() => this.setState({tabMenu : 6})}><img src='https://cdn3.iconfinder.com/data/icons/tutti-frutti-color/128/Hazelnut-512.png' alt='Ready to Cook Menu Icon' style={{width: '70px'}}></img><br/>Ready To Cook</MDBBtn>
                        </div>
                        <div className="col-8">
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