import React, { Component } from 'react';
import Axios from 'axios'
import { MDBJumbotron, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBBtnGroup} from "mdbreact";
import { urlApi } from '../../helpers/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

class productDetail extends Component {

    state = {
        dataPaketLangganan: '',
        dataJadwalPaketLangganan: '',
        jadwalPaketSampaiAkhirBulan: [],
        wishlist : false,
        jumlahHariBulanIni: 0,
        jumlahBox: 1,
        tanggalHariIni: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        inputTanggalMulai: ''
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
            var jumlahHariBulanIni = moment().daysInMonth()

            var jadwalSebulan = []
                for (var i = 0; i < Math.ceil(jumlahHariBulanIni / this.state.dataJadwalPaketLangganan.length); i++) {
                    for (var j = 0; j < this.state.dataJadwalPaketLangganan.length; j++) {
                        jadwalSebulan.push(this.state.dataJadwalPaketLangganan[j])
                    }
                }
            var slicer = Number(new Date().getDate()) - 1
            var jadwalSebulanFixed = jadwalSebulan.slice(0, jumlahHariBulanIni)
            var sisaJadwalBulanIni = jadwalSebulanFixed.slice(slicer)

            var coba = moment().format("dddd, MMMM Do YYYY")
            var todayDate = moment()
            
            for (i = 0; i < sisaJadwalBulanIni.length; i ++) {
                if (i === 0) {
                    sisaJadwalBulanIni[0].tanggal = coba
                } else {
                    sisaJadwalBulanIni[i].tanggal = todayDate.add(1, 'days').format("dddd, MMMM Do YYYY")
                }
                if (sisaJadwalBulanIni[sisaJadwalBulanIni.length - 1].tanggal) {
                    this.setState({jadwalPaketSampaiAkhirBulan: sisaJadwalBulanIni})
                }
            }

         }).catch((err)=>{
             console.log(err)
         })
    }

    susunJadwalBulanIni = () => {
        var jsx = this.state.jadwalPaketSampaiAkhirBulan.map(val => {
            return (
                <div key={val.urutan}>
                    <div className="row">
                        <div className="col-4">
                            <p style={{fontWeight: 'bolder'}}>{val.tanggal}</p>
                        </div>
                        <div className="col-8">
                            <p className='mb-0 pb-0'>{val.Menu}</p>
                            <p className="mt-0 pb-0">{val.Deskripsi}</p>
                        </div>
                    </div>
                    
                </div>
            )
        })
        return jsx   
    }

    onTambahKeranjangBtnClick = () => {

       if (this.refs.inputDurasi.value.length === 7) {
           var ubahDurasi = Number(this.refs.inputDurasi.value.slice(0,2))
       } else {
           ubahDurasi =  Number(this.refs.inputDurasi.value.slice(0,1))
       }

        var objKeranjang = {
            idUser: this.props.user.id,
            JumlahBox: this.state.jumlahBox,
            TanggalMulai: this.state.inputTanggalMulai,
            Durasi: ubahDurasi,
            idPaket: this.state.dataPaketLangganan.id,
        }
        console.log(objKeranjang)
        console.log(this.props.user)
    }

    render() {
        return (
            <div>
                <MDBJumbotron style={{ padding: 0 }}>
                    <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/890507/pexels-photo-890507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`, backgroundSize: 'cover'}}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-5 m-5 font-weight-bolder">Detail Produk</MDBCardTitle>
                        <p className="mx-5 mb-5 font-weight-bold">Annora Restaurant will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere. The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                        </p>
                    </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <div className='container-fluid m-5'>
                    <div className="row">
                        <div className='col-md-7'>
                            <div>
                                <img src={this.state.dataPaketLangganan.imagePath} className="rounded float-left mb-5" alt="Gambar Paket" style={{height: '600px', width: '750px'}}/>
                            </div>
                            <div>
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
                                        <div className="border my-2">
                                            <p className='ml-2'>{this.state.jumlahBox} Box</p>
                                        </div>
                                    </div>
                                    <div className="col-4 p-0">
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
                                        <input type="date" className="form-control py-0" min={this.state.tanggalHariIni} onChange={(e) => this.setState({inputTanggalMulai: e.target.value})}/>
                                    </div>
                                    <div className="col-3 p-0 pr-3">
                                        <select ref='inputDurasi' className="browser-default custom-select">
                                            <option>Pilih hari</option>
                                            <option value="2 hari">2 hari</option>
                                            <option value="5 hari">5 hari</option>
                                            <option value="10 hari">10 hari</option>
                                            <option value="20 hari">20 hari</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className="col-md-8">
                                    {
                                        this.props.username
                                        ?
                                        <input type="button" onClick={this.addToCart} className='btn btn-success btn-block' value="Tambah ke Keranjang"/>
                                        :
                                        <Link to='/Login' style={{textDecoration: 'none'}}><input  type="button" className='btn btn-success btn-block' value="Tambah ke Keranjang" onClick={this.onTambahKeranjangBtnClick}/></Link>
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
        user: state.user
    }
}

export default connect(mapStateToProps)(productDetail);