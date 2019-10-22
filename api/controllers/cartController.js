const { sqlDB } = require('../database')

module.exports = {
    addToCart: (req, res) => {
        var cartTambahan = req.body
        if (cartTambahan) {
            var sql = `INSERT INTO cart SET ?;`
            sqlDB.query(sql, [cartTambahan], (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                sql = `SELECT * from cart;`
                sqlDB.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
                    res.status(200).send(results)
                })
            })

        } else {
            res.status(500).send('Tolong isi query kategori tambahan!')
        }
    }
}