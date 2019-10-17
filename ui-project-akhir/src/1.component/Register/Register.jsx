import React, {Component} from 'react';
import './Register.css'
import {connect} from 'react-redux'
import {MDBInput, MDBBtn, MDBCol, MDBCard, MDBCardBody} from "mdbreact"
import {registerUser} from '../../redux/1.actions/RegisterFormAction'
import {Redirect} from 'react-router-dom'

class Register extends Component {

    state = {
        inputUsername: '',
        inputEmail: '',
        inputPassword: '',
        inputRepeatPassword: '',
        errorMessage: ''
    }

    onRegisterBtnHandler = () => {
        var inputUser = {
            username: this.state.inputUsername,
            email: this.state.inputEmail,
            password: this.state.inputPassword,
            confirmPassword: this.state.inputRepeatPassword
        }
        this.props.registerUser(inputUser)
    }

    render() {
        if(!this.props.registerForm.registerSuccess){
            
        return (
                <div className="container-fluid background-register">
                <div className="row justify-content-center">
                        <div className="col-12 col-md-5 container-login">
                            <MDBCol>
                                <div className="row justify-content-center">
                                        <MDBCard>
                                            <MDBCardBody style={{ width: "27rem" }}>
                                                <div className='row justify-content-center'>                               
                                                    <h1 className="font-weight-bold text-center">Register</h1>
                                                </div>
                                                <MDBInput label="Username" icon="user" type="text" onChange={(e) => this.setState({inputUsername: e.target.value})}/>
                                                <MDBInput label="Email" icon="envelope" type="email" onChange={(e) => this.setState({inputEmail: e.target.value})}/>
                                                <MDBInput label="Password" icon="lock" type="password" onChange={(e) => this.setState({inputPassword: e.target.value})}/>
                                                <MDBInput label="Repeat Password" icon="exclamation-circle" type="password" onChange={(e) => this.setState({inputRepeatPassword: e.target.value})}/>
                                            </MDBCardBody>
                                            <p className="text-danger text-center" style={{fontSize: '15px'}}>
                                                {this.props.registerForm.error} 
                                            </p>
                                            <div className="text-center">
                                            {
                                                    this.props.registerForm.loading === true
                                                    ?
                                                    <div className="text-center">
                                                        <div className="spinner-border text-danger" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>  
                                                        <div className="text-center">
                                                            <MDBBtn color="unique" type="submit" onClick={this.onRegisterBtnHandler} className='mb-5'>REGISTER</MDBBtn>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </MDBCard>
                                </div>
                            </MDBCol>
                        </div>
                    </div>     
                </div>
            );
        }        
        return <Redirect to={`/waitingemailverification?email=${this.props.registerForm.emailSuccess}`} />
    }
}

const mapStateToProps = (state) => {
    return {
        registerForm: state.registerForm
    }
}

export default connect(mapStateToProps, {registerUser})(Register);