import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../helpers/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {hitungCart} from '../../redux/1.actions'
import moment from 'moment'
import './productDetail.css'
import swal from 'sweetalert'
import { MDBJumbotron, MDBCol, MDBIcon, MDBBtn, MDBBtnGroup} from "mdbreact";

class productDetail extends Component {

    state = {
        dataPaketLangganan: '',
        dataJadwalPaketLangganan: '',
        jadwalPaketSampaiAkhirBulan: [],
        wishlist : false,
        jumlahBox: 1,
        tanggalHariIni: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        inputTanggalMulai: ''
    }

    componentDidMount = () => {
        this.getDataApi()
        this.getWishlist()
    }

    getDataApi = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananById/' + this.props.match.params.id)
        .then((res) => {
           this.setState({dataPaketLangganan: res.data[0]})
        }).catch((err)=>{
            console.log(err)
        })

        Axios.get(urlApi + 'jadwal/getJadwalByIdPaket/' + this.props.match.params.id)
        .then((res) => {
            this.setState({dataJadwalPaketLangganan: res.data})
            var jumlahHariBulanIni = moment().daysInMonth()
            var loopingJadwal = []
                for (var i = 0; i < Math.ceil(jumlahHariBulanIni / this.state.dataJadwalPaketLangganan.length); i++) {
                    for (var j = 0; j < this.state.dataJadwalPaketLangganan.length; j++) {
                        loopingJadwal.push(this.state.dataJadwalPaketLangganan[j])
                    }
                }
            
            var tgl = moment().format("dddd, MMMM Do YYYY")
            var slicer = Number(new Date().getDate()) - 1
            var jadwalSebulanFixed = loopingJadwal.slice(0, jumlahHariBulanIni)
            var sisaJadwalBulanIni = jadwalSebulanFixed.slice(slicer)
            var tempJadwalPaketSampaiAkhirBulan = []
            
            for (var k = 0; k < sisaJadwalBulanIni.length; k ++) {
                if (k > 0) {
                    var arraySelanjutya = {...sisaJadwalBulanIni[k], tanggal: moment().add(k, 'days').format("dddd, MMMM Do YYYY")}
                    tempJadwalPaketSampaiAkhirBulan.push(arraySelanjutya)
                } else {
                    var array1 = {...sisaJadwalBulanIni[0], tanggal: tgl}
                    tempJadwalPaketSampaiAkhirBulan.push(array1)
                }
            }
            this.setState({jadwalPaketSampaiAkhirBulan: tempJadwalPaketSampaiAkhirBulan})
         }).catch((err)=>{
             console.log(err)
         })
    }

    susunJadwalBulanIni = () => {
        var jsx = this.state.jadwalPaketSampaiAkhirBulan.map((val) => {
            return (
                <div key={val.tanggal}>
                    <div className="row">
                        <div className="col-3">
                            <p style={{fontWeight: 'bolder'}}>{val.tanggal}</p>
                        </div>
                        <div className="col-9">
                            <p className='mb-0 pb-0'>{val.Menu}</p>
                            <p className="mt-0 pb-0">{val.Deskripsi}</p>
                        </div>
                    </div>
                    
                </div>
            )
        })
        return jsx   
    }

    getWishlist = () => {
        var obj = {
            idUser: this.props.user.id,
            idPaket: this.props.match.params.id
        }
        Axios.post(urlApi + 'wishlist/getWishListByIdUserPaket/', obj)
        .then(res => {
            if(res.data.length > 0){
                this.setState({wishlist: true})
            }
        })
        .catch(err => console.log(err))
    }

    toggleWishlist = () => {
        var obj = {
            idPaket: this.props.match.params.id,
            idUser: this.props.user.id
            
        }
        Axios.post(urlApi + 'wishlist/getWishListByIdUserPaket/', obj)
        .then(res => {
            if(this.state.wishlist){
                Axios.delete(urlApi + 'wishlist/deleteWishlistById/' + res.data[0].id)
                .then(res => {
                    this.setState({wishlist: false})
                })
                .catch(err => console.log(err))
            }else{
                Axios.post(urlApi + 'wishlist/addToWishlist/', obj)
                .then(res => {
                    this.setState({wishlist: true})
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }

    onTambahKeranjangBtnClick = () => {
        if (this.state.inputTanggalMulai === '' || this.refs.inputDurasi.value === "Choose") {
            swal({icon: "warning", text: "Please complete all data required!"})
        } else if (moment(this.state.inputTanggalMulai).weekday() === moment().day("Sunday").weekday() || moment(this.state.inputTanggalMulai).weekday() === moment().day("Saturday").weekday()) {
            swal({icon: "warning", text: "Please input the starting date other than Saturday and Sunday!"})
        } else if (moment(this.state.inputTanggalMulai).format('L') === moment(new Date()).format('L') && moment(new Date()).format('H') > 8 && moment(new Date()).format('s') > 0) {
            swal({icon: "warning", text: "Order for today shall be no later than 08.00 am."})
        }
        else {
            if (moment(this.state.inputTanggalMulai).format('L') >= moment().format('L')) {
                var ubahDurasi
                if (this.refs.inputDurasi.value.length === 7) {
                    ubahDurasi = Number(this.refs.inputDurasi.value.slice(0,2))
                } else {
                    ubahDurasi =  Number(this.refs.inputDurasi.value.slice(0,1))
                }

                var cnt = 1
                var tmpDate = moment(this.state.inputTanggalMulai)
                while (cnt < ubahDurasi) {
                    tmpDate = tmpDate.add('days', 1);
                    if (tmpDate.weekday() !== moment().day("Sunday").weekday() && tmpDate.weekday() !== moment().day("Saturday").weekday()) {
                        cnt = cnt + 1;
                    }
                }
         
                 var objKeranjang = {
                     idUser: this.props.user.id,
                     idPaket: this.state.dataPaketLangganan.id,
                     TanggalMulai: moment(this.state.inputTanggalMulai).format("YYYY-MM-DD").toString(),
                     tanggalBerakhir: moment(tmpDate._d).format("YYYY-MM-DD").toString(),
                     JumlahBox: this.state.jumlahBox,
                     Durasi: ubahDurasi
                 }

                 Axios.post(urlApi + 'cart/addToCart', objKeranjang)
                 .then(res => {
                     this.setState({inputTanggalMulai: ''})
                     this.props.hitungCart(this.props.user.id)
                     swal({icon: "success", text: "Your order has been added to cart."})
                 }).catch(err => {
                     console.log(err)
                     swal({icon: "warning", text: "Fail to add product to cart."})
                 })
            } else {
                swal({icon: "warning", text: "You can not input date that has passed!"})
            }    
        }
    }

    render() {
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="pt-5 pb-5">
                        <div className="pt-5 pb-5">
                            <div className="pt-5 mt-5">
                                <h1 style={{marginRight: '470px', marginLeft: '470px'}} className="title-product-detail h1-responsive font-weight-bold bg-rgba(244, 67, 54, 0.7) rgba-red-strong">PRODUCT DETAIL</h1>
                            </div>
                            <div className="mx-md-5 px-md-5">
                                <p className="mx-4 mx-md-5 pl-md-5 pr-md-5 bg-rgba(255, 255, 255, 0.7) rgba-white-strong font-weight-bold tagline-title" style={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '24px'}}>
                                    “One cannot think well, love well, sleep well, if one has not dined well.”<br/>
                                    <span style={{fontSize: '15px', fontFamily: 'sans-serif'}}>― Virginia Woolf, A Room of One's Own</span>
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className='container mt-md-5'>
                    <div className="row mt-md-5 pt-md-5">
                        <div className='col-12 col-md-7'>
                            <div>
                                {
                                    this.state.dataPaketLangganan.imagePath !== undefined
                                    ?
                                    <img src={`${urlApi}${this.state.dataPaketLangganan.imagePath}`} className="rounded float-left img-fluid mb-5" alt="Img produk masih kosong" style={{height: '600px', width: '750px'}}/>
                                    :
                                    null
                                }
                            </div>
                           
                        </div>
                        <div className='col-12 col-md-5'>
                            <h1 style={{color:'#4c4c4c'}}>{this.state.dataPaketLangganan.namaPaket} &nbsp;
                            {   this.state.wishlist 
                                ? 
                                <MDBIcon icon="heart"  onClick={this.toggleWishlist} style={{color:'red',fontSize:32, cursor:'pointer'}}/> 
                                :
                                <MDBIcon far icon="heart" onClick={this.toggleWishlist} style={{color:'red',fontSize:32, cursor:'pointer'}}/>
                                
                            }
                            </h1>
                            {
                                this.state.dataPaketLangganan.discount === null || this.state.dataJadwalPaketLangganan === ''
                                ?
                                <div style={{backgroundColor:'green', 
                                    width:"100px",
                                    height:'22px',
                                    color:'white',
                                    textAlign:'center',
                                    display: 'inline-block'}}>
                                    Normal Price
                                </div>
                                :
                                <>
                                    <div style={{backgroundColor:'green', 
                                            width:"50px",
                                            height:'22px',
                                            color:'white',
                                            textAlign:'center',
                                            display: 'inline-block'}}>
                                        {this.state.dataPaketLangganan.discount}%
                                    </div>
                                    <span style={{fontSize:'12px', 
                                                fontWeight:'600',
                                                color:"#606060", 
                                                marginLeft:'10px',
                                                textDecoration: 'line-through'}}>Rp. {this.state.dataPaketLangganan.harga}
                                    </span>
                                </>
                            }
                            <div style={{fontSize:'24px',
                                        fontWeight:'700',
                                        color:'#FF5722',
                                        marginTop:'20px'}}>Rp. {this.state.dataPaketLangganan.harga - (this.state.dataPaketLangganan.harga * (this.state.dataPaketLangganan.discount/100))}
                            </div>
                            <div className='row mt-4'>
                                <div className='col-12'>
                                    <p style={{color:'#606060', fontStyle:"italic"}}>{this.state.dataPaketLangganan.deskripsi}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-md-6'>
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Amount of Box Per day</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 pr-2 pl-3">
                                    <div className="border my-2">
                                        <p className='ml-2'>{this.state.jumlahBox} Box</p>
                                    </div>
                                </div>
                                <div className="col-7 p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <MDBBtnGroup>
                                                <MDBBtn outline color="warning" className='btn btn-block ml-0 mr-1 my-2' size='sm' style={{fontSize:'16px', fontWeight:'700', color:'#606060'}} onClick={() => this.setState({jumlahBox: this.state.jumlahBox + 1})}>+</MDBBtn>
                                                {
                                                    this.state.jumlahBox === 1 
                                                    ?
                                                    <MDBBtn outline color="secondary" className='btn btn-block my-2' size='sm' style={{fontSize:'16px', fontWeight:'700', color:'#606060'}} disabled>-</MDBBtn>
                                                    :
                                                    <MDBBtn outline color="warning" className='btn btn-block my-2' size='sm' style={{fontSize:'16px', fontWeight:'700', color:'#606060'}} onClick={() => this.setState({jumlahBox: this.state.jumlahBox - 1})}>-</MDBBtn>
                                                } 
                                            </MDBBtnGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-5 pr-2 pl-3'>
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Starting Date</div>
                                </div>
                                <div className="col-7 p-0">
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Duration</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 pr-2 pl-3">
                                    <input type="date" className="form-control" min={this.state.tanggalHariIni} onChange={(e) => this.setState({inputTanggalMulai: e.target.value})}/>
                                </div>
                                 <div className="col-4 pl-0 pr-4">
                                    <select ref='inputDurasi' className="browser-default custom-select">
                                        <option>Choose</option>
                                        <option value="2 hari">2 day</option>
                                        <option value="5 hari">5 day</option>
                                        <option value="10 hari">10 day</option>
                                        <option value="20 hari">20 day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 pr-2 pl-3">
                                    <p style={{fontSize: '15px', color: 'grey'}}>We do not deliver food in Saturday and Sunday.</p>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className="col-9">
                                    {
                                        this.props.user.id !== 0
                                        ?
                                        <input type="button" onClick={this.onTambahKeranjangBtnClick} className='btn btn-success btn-block mb-5 mb-md-0' value="ADD TO CART"/>
                                        :
                                        <Link to='/Login' style={{textDecoration: 'none'}}><input  type="button" className='btn btn-success btn-block mb-5 mb-md-0' value="Tambah ke Keranjang"/></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <h1 style={{textDecoration: 'underline'}}>This Month's Schedule</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-5">
                                {
                                    this.state.dataJadwalPaketLangganan !== '' && this.state.dataPaketLangganan !== ''
                                    ?
                                    <>
                                        {this.susunJadwalBulanIni()}
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
        user: state.user
    }
}

export default connect(mapStateToProps, {hitungCart})(productDetail);