import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import {urlApi} from '../../helpers/database'
import {connect} from 'react-redux'
import {confirmLogin} from '../../redux/1.actions/userAction'
import {MDBBtn} from 'mdbreact'
import {Link} from 'react-router-dom'

class EmailVerified extends Component {
    
    state = { 
        message: 'Verifying Email, Please Wait...'
    }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        ///////////////////////buka emailnya dulu////////////////////////////////
        // axios.post(urlApi + 'user/confirmemail', {
        //     email: params.email
        // })
        // .then((res) => {
        //     this.setState({loading: false, message: 'Email Berhasil di Confirm'})
        //     localStorage.setItem('token', res.data.token)
        //     this.props.confirmLogin(res.data)
        // })
        // .catch((err) => {
        //     this.setState({loading: false, message: 'Email Gagal di Confirm'})
        // })
    }

    render() {
        return (
            <div className="pt-5 text-center mt-5 pt-5">
                <h1 className="mx-5 px-5 mt-5 pt-5">{this.state.message}</h1>
                <Link to='/'><MDBBtn color="success" className="mb-5 pb-3" type="submit">OK</MDBBtn></Link>
            </div>
        );
    }
}


export default connect(null, {confirmLogin})(EmailVerified);