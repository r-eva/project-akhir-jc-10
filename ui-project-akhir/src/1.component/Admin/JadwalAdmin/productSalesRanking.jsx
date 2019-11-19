import React, { Component } from 'react';
import {urlApi} from '../../../helpers/database'
import Axios from 'axios'
import { MDBTableHead, MDBTable, MDBTableBody } from 'mdbreact'

class productSalesRanking extends Component {

    state = {
        produkTerbaik: '',
    }

    componentDidMount () {
        this.getProdukTerbaik()
    }

    getProdukTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarProdukTerbaik')
        .then(res => {
            this.setState({produkTerbaik: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    renderProdukRanking = () => {
        if(this.state.produkTerbaik.length !== 0) {
            return this.state.produkTerbaik.map(val => {
                return (
                    <tr key={val.idPaket} className='text-dark'>
                        <td>{val.idPaket}</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.totalTerjual}</td>
                        <td>{val.jumlahTransaksi}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
                <div className="card">
                    <div className="card-header text-center" style={{backgroundColor: '#7FBB28'}}>
                        <h3>PRODUCT SALES RANKING</h3>
                    </div>
                    <div className="card-body mx-3">
                        <MDBTable hover className="text-center" scrollY maxHeight="60vh">
                            <MDBTableHead color="text-center text-white" style={{backgroundColor: '#0085C7'}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Package Name</th>
                                    <th>Total Sales</th>
                                    <th>Transaction Amount</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.renderProdukRanking()}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
        );
    }
}

export default productSalesRanking;