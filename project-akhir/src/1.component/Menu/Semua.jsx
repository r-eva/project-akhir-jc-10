import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import { MDBCardImage, MDBCardTitle, MDBCard } from 'mdbreact'
import './Menu.css'

class Semua extends Component {

    state = {
        dataMainCourse: [],
        dataDessert: [],
        allMenu: [],
        page: 0,
        pageContent: 12
    }

    componentDidMount () {
        this.getDataProduct()
    }

    getDataProduct = () => {
        var tempAllData = []

        Axios.get(urlApi + 'breakfast')
        .then(res => {
            tempAllData.push(...res.data)
            this.setState({dataDessert: res.data})
        })
        .catch(err => {
            console.log(err)
        })

        Axios.get(urlApi + 'dessert')
        .then(res => {
            tempAllData.push(...res.data)
            this.setState({dataDessert: res.data})
        })
        .catch(err => {
            console.log(err)
        })

        Axios.get(urlApi + 'mainCourse')
        .then(res => {
            tempAllData.push(...res.data)
            this.setState({dataMainCourse: res.data})
        })
        .catch(err => {
            console.log(err)
        })
        this.setState({allMenu: tempAllData})
    }

    renderDessert = () => {
        let showData = this.state.allMenu.slice(this.state.page * this.state.pageContent, this.state.page * this.state.pageContent + this.state.pageContent)
        var jsx = showData.map(val => {
            return (
                <MDBCard className="ml-3 mb-2">
                    <MDBCardImage src={val.img} alt='imgproduct' style={{
                        width:'200px', height: '200px', borderRadius: '4px', padding: '5px'
                        }}>
                    </MDBCardImage>
                    {
                        val.discount > 0
                        ?
                        <div className="discount">{val.discount}%</div>
                        :
                        null
                    }
                    <MDBCardTitle className="product-name font-weight-bolder text-white bg-success">&nbsp;{val.productName}</MDBCardTitle>
                    {
                        val.discount > 0
                        ?
                        <>
                        <h6 className='mt-4 pt-1' style={{color:'grey', fontSize: '15px', paddingLeft: '10px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        <h6 style={{color:'red', fontSize: '15px', paddingRight: '10px', textAlign: 'right'}}>Now Rp. {new Intl.NumberFormat('id-ID').format(val.price - (val.price * (val.discount/100)))}</h6>
                        </>
                        :
                        <>
                        <h6 className='mt-4 pt-1'style={{color:'grey', fontSize: '15px', paddingLeft: '10px', paddingBottom: '28px'}}>Rp. {new Intl.NumberFormat('id-ID').format(val.price)}</h6>
                        </>
                    }
                </MDBCard>
            )
        })
        return jsx
    }

    render() {
        return (
            <>
                {this.renderDessert()}
                <div className="col-12 text-center mt-3 mb-3">
                    {
                        this.state.page === 0
                        ?
                        <input type="button" className='disabled' value="<<Previous Page"/>
                        :
                        <input type="button" className='btn-secondary' value="<<Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                    }
                    {
                        this.state.allMenu.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                        ?
                        <input type="button" className='ml-2 disabled' value="Next Page>>"/>
                        :
                        <input type="button" className='btn-secondary ml-2' value="Next Page>>" onClick={() => this.setState({page: this.state.page + 1})}/>
                    }
                </div>
            </>
        );
    }
}

export default Semua;