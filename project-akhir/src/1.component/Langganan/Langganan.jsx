import React, { Component } from 'react';
import Calender from './Calender';
import Axios from 'axios';
import {urlApi} from '../../helpers/database';


class Langganan extends Component {
    state = {
        mainCourse: [],
        desert: [],
        kirimTahunIni: '',
        kirimBulanIni: '',
        kirimHariBulanIni: 0
    }
 
    componentDidMount() {
        this.getDataApi()
    }

    getDataApi = () => {
       Axios.get(urlApi + 'mainCourse')
       .then((res) => {
            this.setState({mainCourse: res.data})
            
       })

       .catch((err) => {
           console.log(err)
       })

       Axios.get(urlApi + 'desert')
        .then((res) => {
             this.setState({desert: res.data})
        })
 
        .catch((err) => {
            console.log(err)
        })

        this.prosesHariBulan()
    }

    prosesHariBulan = () => {
        var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        var hariBulan = [31, '', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var d = new Date ()

        var tahunIni = d.getFullYear()
        this.setState({kirimTahunIni: tahunIni})
        var bulanIniAngka = d.getMonth()
        var bulanIni = bulan[bulanIniAngka]
        this.setState({kirimBulanIni: bulanIni})

        if (bulanIni === 'Februari') {
            if (Number(tahunIni) % 4 === Number(0)) {
                this.setState({kirimHariBulanIni: 29})
            } else {
                var hariBulanIni = 28
                this.setState({kirimHariBulanIni: 28})
            }
        } else {
            hariBulanIni = hariBulan[bulanIniAngka]
            this.setState({kirimHariBulanIni: hariBulanIni})
        }
    }

    render() {
        return (
            <div className="mt-5 pt-5">
                <Calender
        mainCourse = {this.state.mainCourse}
        desert = {this.state.desert}
        calenderTahunIni = {this.state.kirimTahunIni}
        calenderBulanIni = {this.state.kirimBulanIni}
        calenderHariBulanIni = {this.state.kirimHariBulanIni}
        />
            </div>
        );
    }
}

export default Langganan;