import React, {Component} from 'react';
import './Register.css'
import {onRegister} from '../../redux/1.actions'
import {connect} from 'react-redux'
import {MDBInput, MDBBtn} from "mdbreact"
import Cookie from 'universal-cookie'
import {Redirect} from 'react-router-dom'

let cookieObj = new Cookie()

class Auth extends Component {
    state = {
        registerUsername: '',
        registerPassword: '',
        repeatPassword: '',
        registerEmail: ''
    }

    componentWillReceiveProps(newProps) {
        cookieObj.set('userData', newProps.username, {path: '/'})
    }

    onRegisterBtnHandler = () => {
        let registerObj = {
            username: this.state.registerUsername,
            email: this.state.registerEmail,
            password: this.state.registerPassword,
            repeatPassword: this.state.repeatPassword
        }
        this.props.onRegister(registerObj)
    }

    render() {
        if (this.props.username !== '') {
            return <Redirect to='/' exact />
        }

        return (
            <div className="container container-register">
                <div className="container">
                    <h1 className="text-center mt-2 font-weight-bold">REGISTER</h1>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <MDBInput label="Username" icon="user" type="text" onChange={(e) => this.setState({registerUsername: e.target.value})}/>
                            <MDBInput label="Email" icon="envelope" type="email" onChange={(e) => this.setState({registerEmail: e.target.value})}/>
                            <MDBInput label="Password" icon="lock" type="password" onChange={(e) => this.setState({registerPassword: e.target.value})}/>
                            <MDBInput label="Repeat Password" icon="exclamation-circle" type="password" onChange={(e) => this.setState({repeatPassword: e.target.value})}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 text-center mb-4 mt-3">
                            {
                                this.props.isLoading === true
                                ?
                                <div className="text-center">
                                    <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <>
                                   <MDBBtn color="unique" type="submit" onClick={this.onRegisterBtnHandler}>REGISTER</MDBBtn>
                                </>
                            }

                            {
                                this.props.message !== ''
                                ?
                                <>
                                    <h3 className='text-center'>{this.props.message}</h3>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.user.msg,
        username: state.user.username,
        isLoading: state.user.isLoading
    }
}

export default connect(mapStateToProps, {onRegister})(Auth);