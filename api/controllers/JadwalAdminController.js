const { sqlDB } = require('../database')

module.exports = {
    getKategoriLangganan: (req, res) => {
        var sql = `SELECT id, namaPaket from kategori_langganan`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}


