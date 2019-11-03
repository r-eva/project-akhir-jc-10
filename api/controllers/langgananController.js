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
    editLanggananById: (req, res) => {
        const path = '/images/toko';
        const upload = uploader(path, 'TOK').fields([{ name: 'image' }]);
    
        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ message: 'Upload file failed !', error: err.message });
            }
    
            const { image } = req.files;
            console.log(image)
    
            console.log(req.body.data)
            const data = JSON.parse(req.body.data);
            console.log(data)
            var insertData = []
            for(var i = 0; i < image.length; i++) {
                insertData.push([`${path}/${image[i].filename}`, data.tokoId])
            }
    
            var sql = `INSERT INTO imagetoko (pathName,tokoId) VALUES ? `;
            sqlDB.query(sql,[insertData], (err,results) => {
                if(err) {
                    for(var i = 0; i < image.length; i++) {
                        fs.unlinkSync('./public' + path + '/' + image[i].filename)
                    }
                    return res.status(500).send(err)
                }
    
                res.status(200).send(results)
            })
        })




        var data = req.body
        var sql = `UPDATE toko SET ? WHERE id = ${req.params.id}`
        sqlDB.query(sql, data, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            } 
                res.status(200).send(result)
        })
    }
    // editImageToko: (req, res) => {
    //     const path = '/images/toko'
    //     const upload = uploader(path, 'TOK').fields([{name: 'image'}]);
    
    //     upload(req, res, (err) => {
    //         if(err){
    //             return res.status(500).json({ message: 'Upload file failed !', error: err.message });
    //         }
    
    //         const { image } = req.files;
    //         console.log(image)
    
    //         console.log(req.body.data)
    //         const data = JSON.parse(req.body.data);
    //         console.log(data)
    
    //         var insertData = []
    //         for (var i = 0; i < image.length; i++) {
    //             insertData.push([`${path}/${image[i].filename}`, data.tokoId])
    //         }
    
    //         var sql = `INSERT INTO imagestoko (pathName, tokoId) VALUES ? `;
    
    //         db.query(sql, [insertData], (err, results) => {
    //             if (err) {
    //                 for (var i = 0; i < image.length; i++) {
    //                     fs.unlinkSync('./public' + path + '/' + image[i].filename)
    //                 }
    //                 return res.status(500).send(err)
    //             }
    //             res.status(200).send(results)
    //         })
            
    //     })
    // }
}