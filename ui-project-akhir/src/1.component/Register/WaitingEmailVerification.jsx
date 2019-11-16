import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import {urlApi} from '../../helpers/database'

class WaitingEmailVerification extends Component {

    onBtnResendEmailClick = () => {
        var params = queryString.parse(this.props.location.search)
        axios.post(urlApi + 'user/resendemailconfirm', {
            email: params.email
        })
        .then((res) => {
            alert(res.data.message)
        })
        .catch((err) => {
            console.log(err.response)
            alert(err.response.data.message)
        })
    }

    render() {
        return (
            <div className="p-5 m-5 text-center">
                <h1 className="mt-5 pt-5">Silakan Periksa Email Anda untuk konfirmasi</h1>
                <h4>Klik Button dibawah bila tidak menerima Emailnya</h4>
                <input type="button" className="btn btn-primary" value="Resend Email" onClick={this.onBtnResendEmailClick}/>
            </div>
        );
    }
}

export default WaitingEmailVerification;