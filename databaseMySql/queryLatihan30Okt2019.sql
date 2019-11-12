	use final_project;
	select * FROM kategori_langganan;
    select * from all_menu;
	select * FROM connection_table;
    SELECT * FROM all_menu WHERE id NOT IN (SELECT idMenu FROM connection_table);
    
    SELECT * from connection_table WHERE idKategori = 26;
    SELECT ct.idMenu
    FROM connection_table;
    
    SELECT am.Menu, kl.namaPaket, ct.urutan
    from all_menu am
    JOIN connection_table ct
    JOIN kategori_langganan kl
    on am.id = ct.idMenu && kl.id = ct.idKategori
    order by kl.namaPaket && ct.urutan;
    
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
	select * FROM history_detailProduct;
	select * FROM history;
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
