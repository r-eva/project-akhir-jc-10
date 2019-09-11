import React, { Component } from 'react';
import './Style.css'
import Healty from './Healty';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dessert from './Dessert';
import Semua from './Semua'
import ReadyToCook from './ReadyToCook'
import { MDBBtn, MDBIcon } from "mdbreact";

class Menu extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <>
                <div className="container mt-5 pt-5 justify-content-between">
                    <br/>
                    <br/>
                    <MDBBtn outline color="danger" onClick={() => this.setState({tabMenu : 1})}><MDBIcon icon="magic" className="mr-1" /> Semua</MDBBtn>
                    <MDBBtn outline color="success" onClick={() => this.setState({tabMenu : 2})}>Breakfast</MDBBtn>
                    <MDBBtn outline color="danger" onClick={() => this.setState({tabMenu : 3})}>Lunch</MDBBtn>
                    <MDBBtn outline color="danger" onClick={() => this.setState({tabMenu : 4})}>Healty</MDBBtn>
                    <MDBBtn outline color="success" onClick={() => this.setState({tabMenu : 5})}>Dessert</MDBBtn>
                    <MDBBtn outline color="danger" onClick={() => this.setState({tabMenu : 6})}>Ready To Cook</MDBBtn>
                </div>
                <div className="container">
                    {this.state.tabMenu === 1 ? <Semua/> : null}
                    {this.state.tabMenu === 2 ? <Breakfast/> : null}
                    {this.state.tabMenu === 3 ? <Lunch/> : null}
                    {this.state.tabMenu === 4 ? <Healty/> : null}
                    {this.state.tabMenu === 5 ? <Dessert/> : null}
                    {this.state.tabMenu === 6 ? <ReadyToCook/> : null}
                </div>
            </>
        );
    }
}

export default Menu;