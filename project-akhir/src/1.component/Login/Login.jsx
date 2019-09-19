import React, {Component} from 'react';
import './Login.css'
import {onLogin} from '../../redux/1.actions'
import {connect} from 'react-redux'
import {MDBInput, MDBBtn} from "mdbreact";
import Cookie from 'universal-cookie'
import {Redirect} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';

let cookieObj = new Cookie()

class Auth extends Component {
    state = {
        loginUsername: '',
        loginPassword: ''
    }

    componentWillReceiveProps(newProps) {
        cookieObj.set('userData', newProps.username, {path: '/'})
    }

    onLoginBtnHandler = () => {
        let loginObj = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        }

        this.props.onLogin(loginObj)
    }

    render() {
        if (this.props.username !== '') {
            return <Redirect to='/' exact />
        }
        return (
            <div className="container-fluid background-image">
               <div className="row justify-content-center">
                    <div className="col-12 col-md-5 container-login">
                        <MDBCol>
                            <div className="row justify-content-center">
                                    <MDBCard>
                                        <MDBCardBody style={{ width: "23rem" }}>
                                            <div className='row justify-content-center mb-3'>                               
                                                <h1 className="my-3 font-weight-bold text-center">Sign In</h1>
                                            </div>
                                            <MDBInput label="Username" icon="user" type="text" onChange={(e) => this.setState({loginUsername : e.target.value})}/>
                                            <MDBInput label="Password" icon="lock" type="password" onChange={(e) => this.setState({loginPassword : e.target.value})}/>
                                                {
                                                this.props.isLoading === true
                                                ?
                                                <div className='text-center'>
                                                    <div class="spinner-border text-danger" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                <div className='text-center'>
                                                    <MDBBtn color="unique" className="mb-5 pb-3" type="submit" onClick={this.onLoginBtnHandler}>SIGN IN</MDBBtn>
                                                    <h6 style={{fontSize: '13px'}}>Or login in with</h6>
                                                    <img className="mb-3" src="https://img.icons8.com/plasticine/2x/facebook-new.png" alt="iconFacebook" width="40px"/>
                                                    <img className="mb-3" src="https://cdn3.iconfinder.com/data/icons/social-media-2110/64/Gmail-01-512.png" alt="iconFacebook" width="35px"/>
                                                </div>
                                                </>
                                                }
                                        </MDBCardBody>
                                    </MDBCard>
                            </div>
                        </MDBCol>
                    </div>
                </div>     
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        isLoading: state.user.isLoading
    }
}

export default connect(mapStateToProps, {onLogin})(Auth);