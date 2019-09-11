import React, { Component } from 'react';
import './Style.css'
import HealtyAdmin from './HealtyAdmin';
import BreakfastAdmin from './BreakfastAdmin';
import LunchAdmin from './LunchAdmin';
import DessertAdmin from './DessertAdmin';
import SemuaAdmin from './SemuaAdmin'
import ReadyToCookAdmin from './ReadyToCookAdmin'
import { MDBBtn, MDBIcon } from "mdbreact";

class Menu extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <>
                <div className="container mt-5 pt-5 text-center">
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
                    {this.state.tabMenu === 1 ? <SemuaAdmin/> : null}
                    {this.state.tabMenu === 2 ? <BreakfastAdmin/> : null}
                    {this.state.tabMenu === 3 ? <LunchAdmin/> : null}
                    {this.state.tabMenu === 4 ? <HealtyAdmin/> : null}
                    {this.state.tabMenu === 5 ? <DessertAdmin/> : null}
                    {this.state.tabMenu === 6 ? <ReadyToCookAdmin/> : null}
                </div>
            </>
        );
    }
}

export default Menu;