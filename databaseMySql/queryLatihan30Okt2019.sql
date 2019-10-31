	use final_project;
	SELECT * FROM cart;
	select * FROM history_detailProduct;
	select * FROM history;
    SHOW EVENTS;

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

DROP EVENT event46;
DROP EVENT event89;
