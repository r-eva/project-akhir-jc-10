const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const app = express()
const port = process.env.PORT || 1997

// //////////////////////////////////MIDDLEWARE////////////////////////////////////////////////////

app.use(bodyParser.json())
app.use(bearerToken())
app.use(cors())
app.use(express.static('public'))

// /////////////////////////////// MASUK API ///////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to API Annora</h1>')
})

const { userRouter, langgananRouter, jadwalRouter, cartRouter, historyRouter } = require('./routers')

app.use('/user', userRouter)
app.use('/langganan', langgananRouter)
app.use('/jadwal', jadwalRouter)
app.use('/cart', cartRouter)
app.use('/history', historyRouter)

app.listen(port, () => console.log(`API aktif di port ${port}`))