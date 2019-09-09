import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import Navigation from './1.component/Navbar/Navigation';
import Footer from './1.component/Footer/Footer';
import Main from './1.component/Main/Main';
import Menu from './1.component/Menu/Menu';
import Langganan from './1.component/Langganan/Langganan';
import Promo from './1.component/Promo/Promo';
import BantuanShopping from './1.component/Bantuan/BantuanShopping';
import Keranjang from './1.component/Keranjang/Keranjang';
import Register from './1.component/Register/Register';
import Login from './1.component/Login/Login';
import Tentang from './1.component/Tentang/Tentang';
import Testimoni from './1.component/Testimoni/Testimoni';
import Karir from './1.component/Karir/Karir';
import Kontak from './1.component/Kontak/Kontak';
import Kerjasama from './1.component/Kerjasama/Kerjasama';
import Saran from './1.component/Saran/Saran'
import RestaurantGalery from './1.component/RestaurantGalery/RestaurantGalery'
import Reservasi from './1.component/Reservasi/Reservasi'
import AdminDashboard from './1.component/Admin/AdminDashboard'
import BantuanLogin from './1.component/Bantuan/BantuanLogin'
import History from './1.component/History/History'
import Cookie from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin} from './redux/1.actions'

let cookieObj = new Cookie()

class App extends Component {

  componentDidMount(){

    let cookieVar = cookieObj.get('userData')
    if(cookieVar){
      this.props.keepLogin(cookieVar)
    }
  }


    render() {
        return (
            <div>
                <Navigation/>
                <Switch>
                    <Route path='/' component={Main} exact/>
                    <Route path='/Menu' component={Menu} exact/>
                    <Route path='/Langganan' component={Langganan} exact/>
                    <Route path='/Promo' component={Promo} exact/>
                    <Route path='/bantuan/shopping' component={BantuanShopping} exact/>
                    <Route path='/Keranjang' component={Keranjang} exact/>
                    <Route path='/History' component={History} exact/>
                    <Route path='/Register' component={Register} exact/>
                    <Route path='/Login' component={Login} exact/>
                    <Route path='/Tentang' component={Tentang} exact/>
                    <Route path='/Testimoni' component={Testimoni} exact/>
                    <Route path='/Karir' component={Karir} exact/>
                    <Route path='/Kontak' component={Kontak} exact/>
                    <Route path='/Kerjasama' component={Kerjasama} exact/>
                    <Route path='/Saran' component={Saran} exact/>
                    <Route path='/Reservasi' component={Reservasi} exact/>
                    <Route path='/RestaurantGalery' component={RestaurantGalery} exact/>
                    <Route path='/admin/dashboard' component={AdminDashboard} exact/>
                    <Route path='/bantuan/login' component={BantuanLogin} exact/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default connect(null, {keepLogin})(withRouter(App));
