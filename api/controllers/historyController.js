const { sqlDB } = require('../database')
const moment = require('moment')

module.exports = {
    addToHistory: (req, res) => {
        var historyTambahan = req.body
        if (historyTambahan) {
            var sql = `INSERT INTO history SET ?;`
            sqlDB.query(sql, [historyTambahan], (err) => {
                if(err) {
                    return res.status(500).send(err)
                }

                sql = `SELECT * FROM history WHERE TotalBelanja=${historyTambahan.TotalBelanja} && UserId=${historyTambahan.UserId} && TanggalTransaksi='${historyTambahan.TanggalTransaksi}'`
                sqlDB.query(sql, (err, results1) => {
                    if(err) {
                        return res.status(500).send(err)
                    }
                    res.status(200).send(results1)
                })
            })
        } else {
            res.status(500).send('Tolong isi query history!')
        }
    },
    addHistoryDetail: (req, res) => {
        var idUserParams = Number(req.params.id)
        var idHistorySubmit = req.body.idHistory

        var sql = `SELECT * FROM cart WHERE idUser = ${sqlDB.escape(idUserParams)};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            var insertdata = []
            for (i = 0; i < result.length; i++) {
                insertdata.push([result[i].idUser, result[i].idPaket, result[i].TanggalMulai,
                                result[i].TanggalBerakhir, result[i].Durasi, result[i].JumlahBox,
                                result[i].TotalHarga, idHistorySubmit])
            }
           
            sql = `INSERT INTO history_detailProduct (idUser, idPaket,
                    TanggalMulai, TanggalBerakhir, Durasi, JumlahBox, TotalHarga, idHistory) VALUES ?`
            sqlDB.query(sql, [insertdata], (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                } 

                sql = `SELECT * FROM history WHERE id = ${idHistorySubmit}`
                sqlDB.query(sql, (err, result4) => {
                    if (err) {
                        return res.status(500).send(err)
                    }  

                    sql = `CREATE EVENT event${result4[0].id}
                    ON SCHEDULE AT "${result4[0].BatasAkhirBayar}"
                    DO UPDATE history SET Cancel=1 , Status="Canceled By System" WHERE id=${result4[0].id};`
                    sqlDB.query(sql, (err, results3) => {
                        if (err) {
                            return res.status(500).send(err)
                        } 
                        res.status(200).send(results3)
                    })
                })
            })
        })
    },
    getHistoryByIdUser: (req, res) => {
        var sql = `SELECT * from history
                    WHERE UserId = ${sqlDB.escape(req.params.id)};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    getHistoryDetailById: (req, res) => {
        var sql = `SELECT *
                    FROM history_detailProduct hd
                    JOIN kategori_langganan kl
                    on hd.idPaket = kl.id
                    WHERE idHistory = ${req.params.id};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    cancelHistoryByIdHistory: (req, res) => {
        var sql = `UPDATE history SET Cancel=1 , Status="Canceled By User" WHERE id=${req.params.id};
                    DROP EVENT event${req.params.id};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    pembayaranLunas: (req, res) => {
        var sql =  `UPDATE history SET Cancel=1, Status="Lunas" WHERE id=${req.params.id};
        DROP EVENT event${req.params.id};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}