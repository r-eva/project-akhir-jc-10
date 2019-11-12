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
                        return res.status(500).json({ message: 'Upload file failed !', err });
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
    },
    addLanggananJadwalLama: (req, res) => {
        const path = '/images/langganan';
        const upload = uploader(path, 'TOK').fields([{ name: 'image' }]);

        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ message: 'Upload file failed !', error: err.message });
            }    
            const { image } = req.files
            const data = JSON.parse(req.body.data)
            var insertData = []
            insertData.push([data.namaPaket, data.harga, data.discount, data.deskripsi, `${path}/${image[0].filename}`])

            var sql = `SELECT * FROM kategori_langganan WHERE LOWER(namaPaket) LIKE LOWER('%${data.namaPaket}%');`
            sqlDB.query(sql, (err, result) => {
                if (err) return res.status(500).send({message: `Database Error`, err})
                if (result.length > 0) {
                    return res.status(500).send({message: `Menu sudah ada, mohon cek kembali!`, err})
                }
    
                var sql = `INSERT INTO kategori_langganan (namaPaket, harga, discount, deskripsi, imagePath) VALUES ?;`
                sqlDB.query(sql, [insertData], (err, results) => {
                    if(err) {
                        fs.unlinkSync('./public' + path + '/' + image[0].filename)
                        return res.status(500).send({message: `Gagal insert paket langganan!`, err})
                    }
    
                    var sql = `SELECT MAX(id) as maximum FROM kategori_langganan;`
                    sqlDB.query(sql, (err, hasil) => {
                        if(err) {
                            return res.status(500).send({message: `Gagal insert paket langganan!`, err})
                        }
                        var idKategoriInput = hasil[0].maximum
    
                        var dataConnection = {
                            idMenu: data.idMenu,
                            idKategori: idKategoriInput,
                            urutan: 1
                        }
    
                        var sql = `INSERT INTO connection_table SET ?;`
                        sqlDB.query(sql, [dataConnection], (err, results) => {
        
                            if(err) {
                                return res.status(500).send({message: `Gagal insert jadwal!`, err})
                            }
                            res.status(200).send(results)
                        })
                    })
                })
            })
        })
    },
    addLanggananJadwalBaru: (req, res) => {
        const path = '/images/langganan';
        const upload = uploader(path, 'TOK').fields([{ name: 'image' }]);

        upload(req, res, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Upload file failed !', err });
            }    
            const { image } = req.files
            const data = JSON.parse(req.body.data)
            var insertData = []
            insertData.push([data.namaPaket, data.harga, data.discount, data.deskripsi, `${path}/${image[0].filename}`])

            var sql = `SELECT * FROM kategori_langganan WHERE LOWER(namaPaket) LIKE LOWER('%${data.namaPaket}%');`
            sqlDB.query(sql, (err, result) => {
                if (err) return res.status(500).send({message: `Database Error`, err})
                if (result.length > 0) {
                    return res.status(500).send({message: `Menu sudah ada, mohon cek kembali!`, err})
                }
    
                var sql = `INSERT INTO kategori_langganan (namaPaket, harga, discount, deskripsi, imagePath) VALUES ?;`
                sqlDB.query(sql, [insertData], (err, results) => {
                    if(err) {
                        fs.unlinkSync('./public' + path + '/' + image[0].filename)
                        return res.status(500).send({message: `Gagal insert paket langganan, mohon periksa kembali image yang anda upload sudah ada!`, err})
                    }
    
                    var sql = `SELECT * FROM all_menu WHERE LOWER(Menu) LIKE LOWER('%${data.Menu}%');`
                    sqlDB.query(sql, (err, result2) => {
                        if (err) return res.status(500).send({message: `Menu baru yang anda input sudah ada, mohon cek kembali!`, err})
                        if (result2.length > 0) {

                            var sql = `SELECT MAX(id) as maximum FROM kategori_langganan;`
                            sqlDB.query(sql, (err, idLanggananBaru) => {
                                if (err) return res.status(500).send({message: `Database Error`, err})

                                var sql = `DELETE FROM kategori_langganan WHERE id=${idLanggananBaru[0].maximum}`
                                sqlDB.query(sql, (err, result3) => {
                                    if (err) {
                                        return res.status(500).send({message: `Kesalahan system dalam add kategori!`, err})
                                    }
                                    return res.status(500).send({message: `Menu baru sudah ada dalam daftar menu, mohon cek kembali!`, err})
                                })
                            })    
                        }

                        var dataMenuBaru = {
                            Menu: data.Menu,
                            Deskripsi: data.Deskripsi
                        }
                        var sql = `INSERT INTO all_menu SET ?;`
                        sqlDB.query(sql, [dataMenuBaru], (err, result) => {
                            if (err) return res.status(500).send({message: `Gagal menambah menu baru`, err})

                            var sql = `SELECT MAX(am.id) as maximumIdMenu, MAX(kl.id) as maximumIdKategori
                                        FROM all_menu am
                                        JOIN kategori_langganan kl;`

                            sqlDB.query(sql, (err, resultSemuaIdBaru) => {
                                if(err) {
                                    return res.status(500).send(err)
                                }
                                var idMenuBaru = resultSemuaIdBaru[0].maximumIdMenu
                                var idKategoriBaru = resultSemuaIdBaru[0].maximumIdKategori

                                var dataConnection = {
                                    idMenu: idMenuBaru,
                                    idKategori: idKategoriBaru,
                                    urutan: 1
                                }

                                var sql = `INSERT INTO connection_table SET ?;`
                                sqlDB.query(sql, [dataConnection], (err, results) => {
                                    if(err) {
                                        return res.status(500).send({message: `Gagal menambah jadwal`, err})
                                    }
                                    res.status(200).send(results)
                                })
                            })
                        })
                    })
                })
            })
        })
    },
    hapusPaketLangganan: (req, res) => {

        var sql = `SELECT imagePath FROM kategori_langganan WHERE id = ${req.body.idLangganan};`
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send({message: `Gagal menambah jadwal`, err})
            }
            
            fs.unlinkSync('./public' + results[0].imagePath)
            
            sql =`DELETE from kategori_langganan WHERE id = ${req.body.idLangganan};
                DELETE FROM connection_table WHERE idKategori = ${req.body.idLangganan};`
            
                sqlDB.query(sql, (err, results) => {
                if(err) {
                    return res.status(500).send({message: `Gagal delete Paket Langganan`, err})
                }
                    
                var sql = `SELECT id FROM all_menu WHERE id NOT IN (SELECT idMenu FROM connection_table);`
                sqlDB.query(sql, (err, results1) => {
                    if(err) {
                        return res.status(500).send({message: `Gagal delete Paket Langganan`, err})
                    }

                    var listId = []
                    for (i = 0; i < results1.length; i++) {
                        listId[i] = results1[i].id
                    }

                    var sql = `DELETE FROM all_menu WHERE id IN (${[...listId]})`
                    sqlDB.query(sql, (err, results2) => {
                        if(err) {
                            return res.status(500).send({message: `Gagal delete all menu`, err})
                        }
                        res.status(200).send(results2)
                    })
                })
            })
        })
    }
}


