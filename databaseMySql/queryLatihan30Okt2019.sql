	use final_project;
	select * FROM history_detailProduct;
	select * FROM history;
    
    SELECT namaPaket, (Durasi * JumlahBox) as Belanjaan)
    FROM history_detailproduct hd
    JOIN history h
    JOIN kategori_langganan kl
    on h.id = hd.idHistory && kl.id = hd.idPaket
    WHERE h.Status = 'Lunas' 
    && h.TanggalTransaksi >= '2019-11-01' && h.TanggalTransaksi <= '2019-12-01'
    ORDER BY idPaket;
    
    
	select * from cart;
    select * from users;
    show events;
    
	
    SELECT * FROM history WHERE TanggalTransaksi >= '2019-11-01' && TanggalTransaksi <= '2019-12-01';

     SELECT hd.id, hd.idUser, hd.idPaket, kl.namaPaket, hd.TanggalMulai, hd.TanggalBerakhir, hd.JumlahBox
                    FROM history_detailproduct hd
                    JOIN kategori_langganan kl
                    JOIN history h
                    on hd.idHistory = h.id && hd.idPaket = kl.id
                    WHERE h.Status = 'Lunas';
			
	SELECT hd.id, hd.idUser, hd.idPaket,
                    kl.namaPaket, hd.TanggalMulai, hd.TanggalBerakhir,
                    hd.JumlahBox, h.NamaPenerima, h.AlamatPenerima
                    FROM history_detailproduct hd
                    JOIN kategori_langganan kl
                    JOIN history h
                    on hd.idHistory = h.id && hd.idPaket = kl.id 
                    WHERE h.Status = 'Lunas'
                    && hd.TanggalMulai <= '2019-11-15'
                    && hd.TanggalBerakhir >= '2019-11-15';
                    

    SELECT h.id, hd.idPaket, hd.TanggalMulai, hd.TanggalBerakhir
    FROM history_detailproduct hd
    JOIN history h
    on hd.idHistory = h.id
    WHERE h.Status = 'Lunas';
	show events;
    DROP event event150;
    SELECT h.id, hd.idPaket, hd.TanggalMulai, hd.TanggalBerakhir
    FROM history_detailproduct hd
    JOIN history h
    on hd.idHistory = h.id
    WHERE h.Status = 'Lunas' 
    && hd.idPaket = 5
    && hd.TanggalMulai >= '2019-11-13'
    && hd.TanggalBerakhir >= '2019-11-13';
    
   

    SELECT * FROM all_menu WHERE id NOT IN (SELECT idMenu FROM connection_table);
    
    	
    select * from all_menu;
	select * FROM connection_table;
    SELECT am.Menu, kl.namaPaket, ct.urutan
    from all_menu am
    JOIN connection_table ct
    JOIN kategori_langganan kl
    on am.id = ct.idMenu && kl.id = ct.idKategori
    order by ct.idKategori;
    
    SELECT MAX(am.id) as maximumIdMenu, MAX(kl.id) as maximumIdKategori
    FROM all_menu am
    JOIN kategori_langganan kl;
    
    SELECT MAX(id) as maximum FROM all_menu;
    SELECT ct.id, am.Menu, am.Deskripsi, ct.urutan
                    FROM kategori_langganan kl
                    JOIN all_menu am
                    JOIN connection_table ct
                    ON ct.idMenu = am.id && ct.idKategori = kl.id
                    WHERE kl.id = 18
                    ORDER BY ct.urutan;
  
    
    Select * from connection_table where idKategori = 8;
    
	SELECT * FROM cart;
    SHOW EVENTS;
    
    
    SELECT *
                    FROM history_detailProduct hd
                    JOIN kategori_langganan kl
                    on hd.idPaketpathName = kl.id
                    WHERE idHistory = 127;

SELECT * FROM cart WHERE idUser = 2;
SHOW PROCESSLIST;
SET GLOBAL event_scheduler = ON;
CREATE EVENT waktuBayar
ON SCHEDULE AT '2019-10-30 15:59:00'
DO UPDATE `final_project`.`history` SET `TIME` = '0' WHERE (`id` = '7');

CREATE EVENT waktuBayar
ON SCHEDULE AT "2019-10-30 16:12:00"
DO UPDATE history SET TIME=1 WHERE id=7;

UPDATE history SET Cancel=1, Status="Canceled" WHERE id=8;
SELECT * FROM history WHERE TanggalTransaksi='2019-10-30 7:11:18' && TotalBelanja=80000 && UserId=3;

SET GLOBAL event_scheduler = ON;
                        CREATE EVENT event46
                        ON SCHEDULE AT "2019-11-01 22:24:23"
                        DO UPDATE history SET Cancel=1 , Status="Canceled" WHERE id=88;
                        
 SET GLOBAL event_scheduler = ON;
                        CREATE EVENT event58
                        ON SCHEDULE AT "2019-10-31 21:50:41"
                        DO UPDATE history SET Cancel=1 , Status="Canceled By System" WHERE id=79;
CREATE EVENT event88
ON SCHEDULE AT "2019-11-01 22:28:84"
DO UPDATE history SET Cancel=0 , Status="Belum Dibayar" WHERE id=88;

SELECT * FROM cart WHERE idUser = 3;

DROP EVENT event123;
DROP EVENT event115;
