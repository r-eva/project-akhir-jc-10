const crypto = require('crypto')
const { sqlDB } = require('../database')
const { createJWTToken } = require('../helpers/jwt')
const { transporter } = require('../helpers/mailer')

const secret = 'passwordcrypted'

module.exports = {
    register: (req, res) => {
        req.body.status = 'Unverified'
        req.body.tanggalBergabung = new Date()
    
        req.body.password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex')

        var sql = `SELECT * FROM users WHERE email = '${req.body.email}';`
        sqlDB.query(sql, (err, result) => {
            if (err) return res.status(500).send({message: `Database Error`, err, error: true})
            if (result.length > 0) {
                return res.status(500).send({message: `Email has been taken!`, err, error: true})
            }
        })
    
        sql = `INSERT INTO users SET ?;`
        sqlDB.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send({message: `Database Error`, err, error: true})
    
            var mailOption = {
                from: `ANNORA Catering and Resto <reginaevadewi@gmail.com>`,
                to: req.body.email,
                subject: 'Email Verification',
                html: `Verify your email by clicking this link 
                    <a href="http://localhost:3000/emailverified?email=${req.body.email}">Verification</a>`
            }
    
            transporter.sendMail(mailOption, (err, result) => {
                if (err) return res.status(500).send({message: 'Kirim email gagal!', err, error: false, email: req.body.email})
                res.status(200).send({status: 'Send Email Success!', result, email: req.body.email})
            })
        })
    },
    confirmEmail: (req, res) => {
        var sql = `UPDATE users SET status='Verified' WHERE email='${req.body.email}';`
        sqlDB.query(sql, (err, results) => {
            if (err) return res.status(500).send({status: 'error', err})
            sql = `SELECT id, username, email, status, role from users WHERE email = '${req.body.email}'`
            sqlDB.query(sql, (err, results) => {
                if (err) return res.status(500).send({err})
                var token = createJWTToken({...results[0]})
                res.status(200).send({...results[0], token})
            })
        })
    }, 
    resendEmailConfirm: (req, res) => {
        var mailOption = {
            from: "ANNORA Catering and Resto <reginaevadewi@gmail.com>",
            to: req.body.email,
            subject: 'Email Confirmation',
            html: `Verified your email by clicking this link
            <a href="http://localhost:3000/emailverified?email=${req.body.email}">Verified<a/>`
        }
    
        transporter.sendMail(mailOption, (err, result) => {
            if (err) return res.status(500).send({message: 'Kirim email confirmation gagal!', err})
            res.status(200).send({message: 'Send Email Success', result})
        })
    }, 
    login: (req, res) => {
        var { email, password } = req.body
        password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex')
        
        var sql = `SELECT id, password, username, email, status, role FROM users WHERE email = ${sqlDB.escape(email)}
                    AND password = ${sqlDB.escape(password)}`

        sqlDB.query(sql, (err, result) => {
            if (err) return res.status(500).send({message: 'Database Error!', err})
            if (result.length === 0) {
                return res.status(500).send({message: 'Email atau password salah!'})
            }
            var token = createJWTToken({...result[0]})
            res.status(200).send({...result[0], token})
        })
    },
    keepLogin: (req, res) => {
        return res.status(200).send({...req.user, token: req.token})
    },
    getAllUserData: (req, res) => {
        var sql = `SELECT id, username, email, status, tanggalBergabung, role from users;`
        sqlDB.query(sql,(err,result)=>{
            if(err){
                return res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}
