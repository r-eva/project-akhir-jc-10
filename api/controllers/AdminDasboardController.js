const { sqlDB } = require('../database')

module.exports = {
    getTransaksiMenunggu: (req, res) => {
        var sql = `SELECT h.id, u.username, h.TanggalTransaksi,
                    h.UserId, h.TotalBelanja,
                    h.buktiPembayaranPath 
                    FROM history h
                    JOIN users u
                    on h.UserId = u.id
                    WHERE h.Status = 'Menunggu Konfirmasi Admin'`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
                } 
                res.status(200).send(result)
            })
    },
    confirmPembayaran: (req, res) => {
        var sql =  `UPDATE history SET Status="Lunas" WHERE id=${req.params.id};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}