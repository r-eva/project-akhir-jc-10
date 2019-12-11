import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class WaitingEmailVerification extends Component {
    
    state = {
        btnResendEmailClick: false
    }

    onBtnResendEmailClick = () => {
        this.setState({btnResendEmailClick: true})
        var params = queryString.parse(this.props.location.search)
        axios.post(urlApi + 'user/resendemailconfirm', {
            email: params.email
        })
        .then((res) => {
            this.setState({btnResendEmailClick: false})
            swal (`${res.data.message}`, `Please check your email!`, 'success')
        })
        .catch((err) => {
            swal (`Send email verification failed.`, `Please check your email or connection!`, 'error')
        })
    }

    render() {
        if (this.props.user.role === 'admin' || this.props.user.role === '')
        return <Redirect to="/" exact/>
        return (
            <div className="p-5 m-5 text-center">
                <h1 className="mt-5 pt-5">Thank you for your registration!</h1>
                <h3 className="mt-2 pt-2">Please check your email to verify your account before shopping.</h3>
                <h5  className="mt-2 pt-2">If you have not received any email from us, please click button bellow to resend email.</h5>
                {
                    this.state.btnResendEmailClick
                    ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <input type="button" className="btn btn-primary" value="Resend Email" onClick={this.onBtnResendEmailClick}/>
                }   
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WaitingEmailVerification);