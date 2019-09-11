import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Bantuan extends Component {
    render() {
        if (this.props.role === '')
        return <Redirect to="/" exact/>
        return (
            <div>
                <h1>Bantuan</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStateToProps)(Bantuan);