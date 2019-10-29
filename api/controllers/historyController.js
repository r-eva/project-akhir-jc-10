const { sqlDB } = require('../database')

module.exports = {
    addToHistory: (req, res) => {
        var historyTambahan = req.body
        if (historyTambahan) {
            var sql = `INSERT INTO history SET ?;`
            sqlDB.query(sql, [historyTambahan], (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
                sql = `SELECT * from history;`
                sqlDB.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
                    res.status(200).send(results)
                })
            })
        } else {
            res.status(500).send('Tolong isi query history!')
        }
    }
}