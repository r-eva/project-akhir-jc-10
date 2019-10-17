const { sqlDB } = require('../database')

module.exports = {
    getKategoriLangganan: (req, res) => {
        var sql = `SELECT * from kategori_langganan`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    getKategoriLanggananById: (req, res) => {
        var sql = `SELECT * FROM kategori_langganan WHERE id = ${sqlDB.escape(req.params.id)};`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}