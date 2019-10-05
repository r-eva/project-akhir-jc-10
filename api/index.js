const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 1998

app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'reginaeva',
    password: 'abc123',
    database: 'final_project',
    port: 3306,
    multipleStatements: true
})

///////////////////////////////// MASUK API ///////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to API Annora</h1>')
})

///////////////////////////////// GET DATA LANGGANAN //////////////////////////////////////////

app.get('/getLangganan', (req, res) => {
    var sql = `SELECT * from menu_langganan`
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })

})

app.listen(port, () => console.log(`API aktif di port ${port}`))