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
        axios.post(urlApi + 'user/confirmemail', {
            email: params.email
        })
        .then((res) => {
            this.setState({loading: false, message: 'Your email has verified.'})
            localStorage.setItem('token', res.data.token)
            this.props.confirmLogin(res.data)
        })
        .catch((err) => {
            this.setState({loading: false, message: 'Your email failed to be verified.'})
        })
    }

    render() {
        return (
            <div className="pt-5 text-center mt-5 pt-5">
                <h1 className="mx-5 px-5 mt-5 pt-5">{this.state.message}</h1>
                <div className="row justify-content-center mx-5 px-5 py-5">
                    <div className="col-6">
                        <Link to='/'><MDBBtn color="success" className="mb-5 pb-3 btn btn-block" type="submit">GO CATERING</MDBBtn></Link>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, {confirmLogin})(EmailVerified);