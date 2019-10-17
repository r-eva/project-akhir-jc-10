import React, {Component} from 'react';
import './Login.css'
import {connect} from 'react-redux'
import {MDBInput, MDBBtn} from "mdbreact"
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import { loginUser } from '../../redux/1.actions/LoginFormAction'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        inputEmail: '',
        inputPassword: ''
    }

    onLoginBtnHandler = () => {
        let userInput = {
            email: this.state.inputEmail,
            password: this.state.inputPassword
        }
      this.props.loginUser(userInput)
    }

    renderButtonLogin = () => {
        if (!this.props.loginForm.loading) {
            return <MDBBtn color="unique" className="mb-5 pb-3" type="submit" onClick={this.onLoginBtnHandler}>SIGN IN</MDBBtn>
        } else {
            return(
                <>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
            ) 
        }
    }

    render() {
        if (this.props.user.status === 'Verified') return <Redirect to="/" exact/>
        return (
            <div className="container-fluid background-image">
               <div className="row justify-content-center">
                    <div className="col-12 col-md-5 container-login">
                        <MDBCol>
                            <div className="row justify-content-center">
                                    <MDBCard>
                                        <MDBCardBody style={{ width: "27rem" }}>
                                            <div className='row justify-content-center mb-3'>                               
                                                <h1 className="my-3 font-weight-bold text-center">Sign In</h1>
                                            </div>
                                            <MDBInput label="Email" icon="envelope" type="text" onChange={(e) => this.setState({inputEmail: e.target.value})}/>
                                            <MDBInput label="Password" icon="lock" type="password" onChange={(e) => this.setState({inputPassword: e.target.value})}/>
                                                <div className="text-center mt-2 mb-3 text-danger">
                                                    {this.props.loginForm.error}
                                                </div>
                                                <div className='text-center'>
                                                    {this.renderButtonLogin()}
                                                    <h6 style={{fontSize: '13px'}}>Or login in with</h6>
                                                    <img className="mb-3" src="https://img.icons8.com/plasticine/2x/facebook-new.png" alt="iconFacebook" width="40px"/>
                                                    <img className="mb-3" src="https://cdn3.iconfinder.com/data/icons/social-media-2110/64/Gmail-01-512.png" alt="iconFacebook" width="35px"/>
                                                </div>
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

const mapStateToProps = ({loginForm, user}) => {
    return {
        loginForm,
        user
    }
}

export default connect(mapStateToProps, {loginUser})(Login);