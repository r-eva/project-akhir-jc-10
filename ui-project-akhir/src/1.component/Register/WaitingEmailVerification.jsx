import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'

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
            swal (`${res.data.message}`, `Silakan cek email anda!`, 'success')
        })
        .catch((err) => {
            swal (`Email gagal dikirim.`, `Cek koneksi atau email anda!`, 'error')
        })
    }

    render() {
        return (
            <div className="p-5 m-5 text-center">
                <h1 className="mt-5 pt-5">Silakan Periksa Email Anda untuk konfirmasi</h1>
                <h4>Klik Button dibawah bila tidak menerima Emailnya</h4>
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

export default WaitingEmailVerification;