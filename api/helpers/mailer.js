const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'reginaevadewi@gmail.com',
        pass: 'zyjulpncormoeijk'
    },
    tls: {
        rejectUnautorized: false
    }
})

module.exports = {
    transporter
};