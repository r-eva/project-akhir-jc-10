import React from 'react';
import { MDBBtn } from "mdbreact";

const Calender = (props) => {
    const {mainCourse, desert, calenderTahunIni, calenderBulanIni, calenderHariBulanIni} = props
    var tanggal = []
    var displayMainCourse = []
    var displayDessert = []

    const calenderBulanan = () => {
        if (mainCourse.length !== 0 && desert.length !== 0) {

            var x = 0
            for (var i = 0; i < calenderHariBulanIni; i++) {
                x += 1
                tanggal.push(x)
            }

            for (var k = 0; k < mainCourse.length; k++) {
                displayMainCourse.push(mainCourse[k].productName)
                displayDessert.push(desert[k].productName)
            }

            var jsx = tanggal.map(val => {
                return (
                    <div key={val} className="col-2 border">
                        <h6>{val}</h6>
                        <ul className="list-group list-group-flush text-left">
                            <li className="list-group-item" style={{fontSize:'10px'}}>
                                {displayMainCourse[val-1]}
                                <br/>
                                {displayDessert[val-1]}
                            </li>
                        </ul>
                        <div className="mb-1">
                            <MDBBtn size='sm'>ADD MENU</MDBBtn>
                        </div>
                    </div>
                )
            })
        }
        return jsx
    }

    return (
        <div className="container mb-5">
            <br/>
            <br/>
            <div className="card text-center">
                <div className="card-header">
                    <h3>MENU BULAN INI</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        {calenderBulanan()}
                    </div>
                </div>
                <div className="card-footer text-muted">
                    <h5 className="text-center">{calenderBulanIni + ' ' + calenderTahunIni}</h5>
                </div>
            </div>
        </div>
    );
};

export default Calender;