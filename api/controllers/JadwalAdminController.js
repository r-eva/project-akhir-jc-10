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
    },
    getJadwalLangganan: (req, res) => {
        var sql = `SELECT kl.id, kl.namaPaket, am.Menu, ct.urutan
                    FROM kategori_langganan kl
                    JOIN all_menu am
                    JOIN connection_table ct
                    ON ct.idMenu = am.id && ct.idKategori = kl.id
                    WHERE kl.id = ${req.params.id}
                    ORDER BY ct.urutan;`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    getJumlahPesananPerhari: (req, res) => {
        console.log(req.body)
        var sql = `SELECT h.id, hd.idPaket, hd.TanggalMulai, hd.TanggalBerakhir
                    FROM history_detailproduct hd
                    JOIN history h
                    on hd.idHistory = h.id
                    WHERE h.Status = 'Lunas' 
                    && hd.idPaket = ${req.body.id}
                    && hd.TanggalMulai >= ${req.body.tanggal}
                    && hd.TanggalBerakhir >= ${req.body.tanggal};`
        console.log(sql)
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}


