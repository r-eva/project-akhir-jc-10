import React, { Component } from 'react';
import Axios from 'axios'
import { MDBJumbotron, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBBtnGroup} from "mdbreact";
import { urlApi } from '../../helpers/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

class productDetail extends Component {

    state = {
        dataPaketLangganan: [],
        dataJadwalPaketLangganan: [],
        jadwalSebulanPaketIni: [],
        wishlist : false,
        jumlahHariBulanIni: 0
    }

    componentDidMount = () => {
        this.getDataApi()
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
            console.log(this.state.dataJadwalPaketLangganan)
            this.setState({jumlahHariBulanIni: moment().daysInMonth()})
            console.log(this.state.jumlahHariBulanIni)

            var jadwalSebulan = []
            for (var i = 0; i < Math.ceil(this.state.jumlahHariBulanIni / this.state.dataJadwalPaketLangganan); i++) {
                for (var j = 0; j < this.state.dataJadwalPaketLangganan.length; j++) {
                    jadwalSebulan.push(this.state.dataJadwalPaketLangganan[j])
                }
            }
            this.setState({jadwalSebulanPaketIni: jadwalSebulan})
            console.log(this.state.jadwalSebulanPaketIni)

         }).catch((err)=>{
             console.log(err)
         })
    }

    jadwalMenuBulanIni = () => {
        
    }

    render() {
        return (
            <div>
                <div>
                    {this.jadwalMenuBulanIni()}
                </div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1938262/pexels-photo-1938262.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">Langganan</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className='container-fluid m-5'>
                    <div className="row">
                        <div className='col-md-7'>
                            <div>
                                <img src={this.state.dataPaketLangganan.imagePath} className="rounded float-left" alt="Gambar Paket" style={{height: '600px', width: '750px'}}/>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <h1 style={{color:'#4c4c4c'}}>{this.state.dataPaketLangganan.namaPaket} &nbsp;
                            {   this.state.wishlist 
                                ? 
                                <MDBIcon far icon="heart" onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/>
                                :
                                <MDBIcon icon="heart"  onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/> 
                            }
                            </h1>
                            {
                                this.state.dataPaketLangganan.discount === null || this.state.dataJadwalPaketLangganan === ''
                                ?
                                <div style={{backgroundColor:'#D50000', 
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
                                <div className='col-md-8'>
                                    <p style={{color:'#606060', fontStyle:"italic"}}>{this.state.dataPaketLangganan.deskripsi}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-md-6'>
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Jumlah box per hari</div>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-5 pr-2 pl-3">
                                        <input type="text" className="form-control py-0"/>
                                    </div>
                                    <div className="col-4 p-0">
                                        <MDBBtnGroup>
                                            <MDBBtn outline color="warning" className='btn btn-block ml-0 mr-1' size='sm' style={{fontSize:'16px', fontWeight:'700', color:'#606060'}}>+</MDBBtn>
                                            <MDBBtn outline color="warning" className='btn btn-block' size='sm' style={{fontSize:'16px', fontWeight:'700', color:'#606060'}}>-</MDBBtn>
                                        </MDBBtnGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-5 pr-2 pl-3'>
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Tanggal Mulai</div>
                                </div>
                                <div className="col-4 p-0">
                                    <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Durasi</div>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-5 pr-2 pl-3">
                                        <input type="date" className="form-control py-0"/>
                                    </div>
                                    <div className="col-3 p-0 pr-3">
                                        <select className="browser-default custom-select">
                                            <option>Pilih hari</option>
                                            <option value="2 hari">2 hari</option>
                                            <option value="5 hari">5 hari</option>
                                            <option value="10 hari">10 hari</option>
                                            <option value="20 hari">20 hari</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div style={{marginTop:'10px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Catatan Untuk Penjual (Opsional)</div>
                                    <input type='text' style={{marginTop:'12px'}} placeholder="Contoh: Extra pedas." className='form-control'/>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className="col-md-8">
                                    {
                                        this.props.username
                                        ?
                                        <input type="button" onClick={this.addToCart} className='btn btn-success btn-block' value="Tambah ke Keranjang"/>
                                        :
                                        <Link to='/Login' style={{textDecoration: 'none'}}><input  type="button" className='btn btn-success btn-block' value="Tambah ke Keranjang"/></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(productDetail);