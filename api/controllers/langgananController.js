const { sqlDB } = require('../database')
const { uploader } = require('../helpers/uploader')
const fs = require('fs')

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
    },
    addImageLangganan: (req,res) => {
        const path = '/images/langganan';
        const upload = uploader(path, 'TOK').fields([{ name: 'image' }]);
    
        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ message: 'Upload file failed !', error: err.message });
            }
    
            const { image } = req.files;
    
            var sql = `UPDATE kategori_langganan SET imagePath = "${path}/${image[0].filename}" WHERE id = ${req.params.id}`;
            sqlDB.query(sql, (err) => {
                if(err) {
                    fs.unlinkSync('./public' + path + '/' + image[0].filename)
                    return res.status(500).send(err)
                }
                
                var sql = `SELECT * FROM kategori_langganan WHERE id = ${req.params.id}`
                sqlDB.query(sql, (err, results1) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    res.status(200).send(results1)
                })
            })

        })
    },
    editImageLanggananById: (req,res) => {
        var sql = `SELECT imagePath FROM kategori_langganan WHERE id = ${sqlDB.escape(req.params.id)}`;
        sqlDB.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
    
            if(results.length > 0) {
                const path = '/images/langganan';
                const upload = uploader(path, 'TOK').fields([{ name: 'image' }]);
    
                upload(req, res, (err) => {
                    if(err){
                        return res.status(500).json({ message: 'Upload file failed !', error: err.message });
                    }
            
                    const { image } = req.files
            
                    sql = `UPDATE kategori_langganan SET imagePath = "${path}/${image[0].filename}" WHERE id = ${req.params.id};`
                    sqlDB.query(sql, (err,results1) => {
                        if(err) {
                            fs.unlinkSync('./public' + path + '/' + image[0].filename)
                            return res.status(500).send(err)
                        }
    
                        fs.unlinkSync('./public' + results[0].imagePath)
                        var sql = `SELECT * FROM kategori_langganan WHERE id = ${req.params.id}`
                        sqlDB.query(sql, (err, results1) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            res.status(200).send(results1)
                        })
                    })
                })
            }
        })
    },
    editLanggananById: (req, res) => {
        var sql = `UPDATE kategori_langganan SET ? WHERE id = ${req.params.id}`
        sqlDB.query(sql, req.body, (err, result) => {
            if (err) {
                return res.status(500).send(err)
                }

                var sql = `SELECT * FROM kategori_langganan WHERE id = ${req.params.id}`
                sqlDB.query(sql, (err, results1) => {
                    if (err) {
                        return res.status(500).send(err)
                        }
                        res.status(200).send(results1)
                    })
            })
    }
}