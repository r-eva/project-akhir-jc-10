import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import {keepLogin, checkLocalStorage} from './redux/1.actions/userAction'
import ScrollToTop from './helpers/scrollTop'
import Navigation from './1.component/Navbar/Navbar';
import Footer from './1.component/Footer/Footer';
import Main from './1.component/Main/Main';
import Langganan from './1.component/Langganan/Langganan';
import Keranjang from './1.component/Keranjang/Keranjang';
import Register from './1.component/Register/Register';
import Login from './1.component/Login/Login';
import History from './1.component/History/History'
import Promo from './1.component/Promo/Promo'
import Wishlist from './1.component/Wishlist/Wishlist'
import LanggananAdmin from './1.component/Admin/Langganan/LanggananAdmin'
import WaitingEmailVerification from './1.component/Register/WaitingEmailVerification'
import EmailVerified from './1.component/Register/EmailVerified'
import ProductDetail from './1.component/Langganan/productDetail'
import JadwalAdmin from './1.component/Admin/JadwalAdmin/jadwalAdmin'
import UserAnalytic from './1.component/Admin/UserAnalitik/UserAnalitik'

class App extends Component {
    
    componentDidMount() {
        var token = localStorage.getItem('token')
        if (token) {
            this.props.keepLogin(token)
        } else {
            this.props.checkLocalStorage()
        }
    }

    render() {
        if (!this.props.user.userChecker) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        return (
            <div>
                <ScrollToTop/>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/Langganan' component={Langganan} exact/>
                    <Route exact path='/Admin/Langganan' component={LanggananAdmin}/>
                    <Route path='/Keranjang' component={Keranjang} exact/>
                    <Route path='/History' component={History} exact/>
                    <Route path='/Promo' component={Promo} exact/>
                    <Route path='/Wishlist' component={Wishlist} exact/>
                    <Route path='/Register' component={Register} exact/>
                    <Route path='/Login' component={Login} exact/>
                    <Route path="/waitingemailverification" component={WaitingEmailVerification} exact />
                    <Route path="/emailverified" component={EmailVerified} exact />
                    <Route path="/product-detail/:id" component={ProductDetail} exact/>
                    <Route path="/jadwalAdmin" component={JadwalAdmin} exact/>
                    <Route path="/analitikTransaksi" component={UserAnalytic} exact/>
                    <Route path='*' component={Main} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {keepLogin, checkLocalStorage})(App);
