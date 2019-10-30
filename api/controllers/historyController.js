const { sqlDB } = require('../database')
const moment = require('moment')

module.exports = {
    addToHistory: (req, res) => {
        var historyTambahan = req.body
        if (historyTambahan) {
            var sql = `INSERT INTO history SET ?;`
            sqlDB.query(sql, historyTambahan, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                sql = `SELECT * FROM history WHERE TotalBelanja=${historyTambahan.TotalBelanja} && UserId=${historyTambahan.UserId} && TanggalTransaksi='${historyTambahan.TanggalTransaksi}'`
                sqlDB.query(sql, (err, results1) => {
                    if(err) {
                        return res.status(500).send(err)
                    }

                    sql = ` SET GLOBAL event_scheduler = ON;
                        CREATE EVENT event${results1[0].id}
                        ON SCHEDULE AT "${results1[0].BatasAkhirBayar}"
                        DO UPDATE history SET Cancel=1 , Status="Canceled" WHERE id=${results1[0].id};`
                    sqlDB.query(sql, (err, result2) => {
                        if(err) return res.status(500).send(err.message)
                        res.status(200).send(result2)
                    })
                })
            })
        } else {
            res.status(500).send('Tolong isi query history!')
        }
    },
    addHistoryDetail: (req, res) => {
        var sql = `SELECT * FROM cart WHERE idUser = ${sqlDB.escape(req.params.id)};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            var insertdata = []
            for (i = 0; i < result.length; i++) {
                insertdata.push([result[i].idUser, result[i].idPaket, result[i].TanggalMulai, result[i].TanggalBerakhir, result[i].Durasi, result[i].JumlahBox, result[i].TotalHarga])
            }
            
            sql = `INSERT INTO history_detailProduct (idUser, idPaket,
                    TanggalMulai, TanggalBerakhir, Durasi, JumlahBox, TotalHarga) VALUES ?`
            sqlDB.query(sql, [insertdata], (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                } 
                res.status(200).send(results)
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
    }
}