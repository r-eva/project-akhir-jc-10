const { sqlDB } = require('../database')

module.exports = {
    getJadwalByIdPaket: (req, res) => {
        var sql = `SELECT ct.id, am.Menu, am.Deskripsi, ct.urutan
                    FROM kategori_langganan kl
                    JOIN all_menu am
                    JOIN connection_table ct
                    ON ct.idMenu = am.id && ct.idKategori = kl.id
                    WHERE kl.id = ${sqlDB.escape(req.params.id)}
                    ORDER BY ct.urutan`
                    
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    getAllMenu: (req, res) => {
        var sql = 'SELECT * from all_menu'
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    editJadwalById: (req, res) => {
        var sql = `UPDATE connection_table SET idMenu = ${req.body.idMenuBaru} WHERE id = ${req.body.idConnection}`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        }) 
    },
    deleteConnection: (req, res) => {
        var sql = `DELETE FROM connection_table WHERE id=${sqlDB.escape(req.params.id)}`
        sqlDB.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}