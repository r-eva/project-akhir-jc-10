-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: final_project
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_menu`
--

DROP TABLE IF EXISTS `all_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Menu` varchar(45) NOT NULL,
  `Deskripsi` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_menu`
--

LOCK TABLES `all_menu` WRITE;
/*!40000 ALTER TABLE `all_menu` DISABLE KEYS */;
INSERT INTO `all_menu` VALUES (1,'Peanut Butter Overnight Oats','Oat dengan selai kacang dan coklat chips.'),(2,'Chocolate Chip Cookie','Oat dengan coklat chips, vanila yogurt dan cinnamon.'),(3,'Nutella','Oat dengan topping chocolate hazelnut nutella.'),(4,'Blueberry Overnight Oats','Oat dengan topping blueberries.'),(5,'Monkey Oats','Oat dengan topping mashed banana selai kacang dan coklat chips.'),(6,'Banana Bread','Oat dengan crushed walnuts or pecans.'),(7,'Cinnamon Apple','Oat dengan cinnamon or apple pie spice and raisins.'),(8,'Mint Chocolate Chip','Oat dengan pure peppermint extract dan coklat spirulina powder.'),(9,'High Protein Overnight Oats','Oat dengan favorite protein powder dan susu.'),(10,'Pumpkin Pie','Oat dengan pumpkin pie spice and pure vanilla extract'),(11,'Carrot Cake','Oat dengan shredded carrot, raisins and almond or coconut butter.'),(12,'Piña Colada','Plain coconut oatmeal'),(13,'Creamy Coffee','Oat dengan instant coffee dan nondairy creamer.'),(14,'Strawberry Shortcake','Oat dengan strawberry yogurt, and canned coconut milk or nondairy creamer.'),(15,'Sate Ayam / Kambing / Padang','Meat marinated in sweet kecap manis soy sauce, before being skewered.'),(16,'Plecing Kangkung','Water spinach salad'),(17,'Pepes Ikan','An assortment of fish, meat or tofu, mixed with lots of healthy herbs and spices, wrapped in a banana leaf package, and either steamed or grilled.'),(18,'Ketoprak','Jakarta originating dish that includes pieces of tofu, and rice vermicelli noodles, all flavored with sweet salty peanut sauce.'),(19,'Bebek Goreng','Flavorful deep fried duck.'),(20,'Pecel Lele','Flavorful Deep fried catfish with sambal.'),(21,'Soto Betawi','Beef boiled with aromatic herbs like lemongrass and Indonesian bay leaves, and flavored with candlenut, galangal, garlic, and shallots, and finally often a combination of both fresh cow milk and coconut milk are added to make the soup creamy. '),(22,'Sayur Asem','A sour tamarind soup, sometimes prepared with meat stock or fish stock, that can include a mixture of different vegetables like corn, chayote, and water morning glory.'),(23,'Sop Kaki Kambing','Goat leg soup covered a lightly creamy and buttery soup.'),(24,'Nasi Goreng','Fried rice with stink beans and a fried egg.'),(25,'Nasi Uduk','Rice that’s cooked with a variety of aromatics like lemongrass, pandan leaves and dry spices like coriander seed, bay leaves, sometimes cardamom, and finally the all important coconut milk.'),(26,'Bubur Ayam','A bowl of porridge topped with shredded chicken'),(27,'Woku','Manado soup curry'),(28,'Pempek','Fishball served with noodles and a sauce that’s sweet, salty, and sour.'),(29,'Gulai Kepala Ikan','Fish head curry'),(30,'Rendang Jengkol','Jengkol beans that are starchy, kind of like potatoes, but with a gummy texture mixed with rendang sauce.'),(31,'Rawon','A black colored beef stew.'),(32,'Gulai Otak','Rich and creamy curry where the main ingredient is brain.'),(33,'Gudeg','Young  jackfruit that’s braised with palm sugar, coconut milk, bay leaves, lemongrass, and galangal, until it’s extremely tender, and blended together.'),(34,'Ayam Bakar Taliwang','Spicy grilled chicken .'),(35,'Gado-gado','A bowl of vegetables and compressed rice salad, made with peanut sauce (or cashew nut sauce) dressing.'),(36,'Mie Goreng Jawa ','Indonesian stir fried noodles, usually prepared with yellow noodles. '),(37,'Sambel Tempeh  Telur Rapuh','Preserved soybean cake accompanied with sambal and fried egg.'),(38,'Ikan Bakar ','Fish that it’s grilled over a very hot charcoal fire and grilled quickly, giving it a really incredible flame roasted fire flavor.'),(39,'Rica-rica','Chicken  blended with chilies and herbs that originates from Northern Sulawesi.'),(40,'Nasi Gule Solo','Mixed of  soup and a curry of goat organ stew.'),(41,'Bakso','Meatball with rice noodles, and yellow egg noodles (I’m a fan of egg noodles).'),(42,'Sop Buntut','A clear soup wtih oxtail simmered in broth with carrots and potatoes, and with a salty and lightly peppery broth with a hint of nutmeg and cinnamon to remove any gamey taste. '),(43,'Ikan Goreng','Indonesian deep fried fish.'),(44,'Pelas','Traditional Javanese dish made from shredded coconut flesh which has been squeezed of its coconut milk, often mixed with other ingredients such as vegetables or fish, and wrapped in banana leaf and steamed.'),(45,'Ayam Bakar','Grilled Chicken'),(46,'Gudeg Yogya','A traditional food from Yogyakarta and Central Java which is made from young nangka (jack fruit) boiled for several hours with palm sugar, spices, and coconut milk.'),(47,'Nasi ayam','A dish composed of rice, chicken, egg, tofu, and served with a sweet-salty coconut milk gravy.'),(48,'Tengkleng','Goat ribs and offal in a curry-like soup, similar to gule kambing, but with a lighter and thinner soup.'),(49,'Lotek','Almost identical to gado-gado, but sweeter. It is similar to pecel, but includes different vegetables as well as boiled egg slices and a garnish of fish or shrimp crackers and emping (Gnetum gnemon L. nut, flattened, dried, and fried into small thin crackers).'),(50,'Opor panggang','A  typical opor from Jepara. It is a kind of opor ayam but with distinctive flavor, since the chicken used in this dish is first roasted in a clay cauldron.'),(51,'Nasi Gandul','Beef served on white steamed rice poured with spicy savoury soup, served on banana leaf'),(52,'Sambal Goreng Krechek','Traditional spicy cattle skin dish made from seasoned krupuk kulit.'),(53,'Swikee Purwodadi','Frogs\' legs cooked in fermented soybean (tauco) soup.'),(54,'Tahu Campur','Beef and offal soup, mixed with fresh vegetables, potatoes, rice cake, and tofu. The secret ingredient is the caramelized fermented shrimp paste (petis) which is mixed in just before serving.'),(55,'Urap sayur','Vegetables in spiced grated coconut dressing.'),(56,'Sop Buntut','Oxtail soup.'),(57,'Buntil','A traditional Javanese dish of scraped coconut meat mixed with teri (anchovies) and spices, wrapped in a papaya leaf, then boiled in coconut milk.'),(58,'Sate','Skewered grilled meat is a common dish in Java. The Javanese variants are sate Tegal, sate Ambal, sate Solo, sate buntel, sate Madura, sate Ponorogo, etc.'),(59,'Bakso Malang','Meat Ball served in hot beef stock.'),(60,'Nasi Bogana Tegal','A steamed rice dish wrapped in banana leaves and served with a variety of side dishes.'),(61,'Sayur Mangut','A hot and spicy Ariid catfish head cooked in coconut milk.'),(62,'Tongseng cumi','Tongseng made of calamari or squid, instead of goat or chicken.'),(63,'Laksa Jepara','Made of chicken fillet, banana shrimp, chicken stock, coconut milk, lemongrass, kaffir lime leaves, salt, sugar, oil, and other ingredients.'),(64,'Soto Bangkong','A chicken soup in a small personal serving; mixed with rice, perkedel, and satay of cockles, chicken intestines, and quail eggs. Named after Bangkong crossroad in Semarang.'),(65,'Pecel ikan laut panggang','Roasted saltwater fish served with coconut milk sauce.'),(66,'Mie koclok','A noodle soup from Cirebon.'),(67,'Jepara shrimp soup','Similar to shrimp soup in general. This version of soup use shrimp broth and fried shrimp, also raw crushed chili. This soup is delicious eaten while still hot or warm.'),(68,'Bongko mento','Originated in Jepara palace, it is a snack wrapped in a banana leaf. Consists of omelet filled with sauteed shredded chicken breast mixed with oyster mushrooms, glass noodles, and coconut milk.'),(69,'Timlo Solo','A beef and vegetable soup.'),(70,'Botok','traditional Javanese dish made from shredded coconut flesh which has been squeezed of its coconut milk, often mixed with other ingredients such as vegetables or fish, and wrapped in banana leaf and steamed.'),(71,'Sayur Lodeh','Assorted vegetables, stewed in coconut milk.'),(72,'Tahu tek-tek','A dish containing cut-up fried tofu, boiled vegetables (mostly beansprouts), potatoes, drenched in a peanut-based sauce. The sauce has caramelized fermented shrimp pasted (petis), chili, and garlic.'),(73,'Ayam penyet','Fried chicken (see ayam goreng), lightly smashed using a pestle in a mortar laced with sambal.'),(74,'Tengkleng','Goat ribs and offal in a curry-like soup, similar to gule kambing, but with a lighter and thinner soup.'),(75,'Nasi Gandul','Beef served on white steamed rice poured with spicy savoury soup, served on banana leaf.'),(76,'Sayur Mangut','Hot and spicy Ariid catfish head cooked in coconut milk.'),(77,'Fresh Milk & Oatmeal Raisin','Plain fresh milk with nice (soft, chewy, crunchy) oatmeal raisin cookie which tastes similar to a granola bar'),(78,'Fresh Milk & Chocolate','Plain fresh milk with the creamy peanut butter that’s swirled into a chocolate cookie .'),(79,'Fresh Milk & Oatmeal Chocolate Chip','Plain fresh milk with chocolate chips cookie that has a perfect sweetness.'),(80,'Fresh Milk & White Chocolate Macadamia','Plain fresh milk with luscious white chocolate and big chunks of macadamia nuts make for great texture.'),(81,'Fresh Milk & Chocolate Pecan Caramel','Plain fresh milk with chocolate, pecans, and so much caramel that can get a little sticky.'),(82,'Fresh Milk & Rocky Road','Plain fresh milk with nutty and chocolate and a gooey marshmallow in the center.'),(83,'Fresh Milk & Chocolate Chip Walnut','Plain fresh milk with Walnut Chip. The walnut chunks give this an earthiness, and overall, the sweetness is appropriately mellow.'),(84,'Fresh Milk & Cinnamon Sugar','Plain fresh milk with the sweet cinnamon sugar cookie.'),(85,'Fresh Milk & Banana Split','Plain fresh milk with banana-flavored baked cookies.'),(86,'Fresh Milk & GF Chip','Plain fresh milk with gluten-free cookie.'),(87,'Fresh Milk  & Birthday Cookie','Plain fresh milk with cookies covered in colorful seasonal dots made from sugar.'),(88,'Fresh Milk & Cheese Chip','Plain fresh milk with salty cheese cookie.'),(89,'Fresh Milk & GF Peppermint Bark','Plain fresh milk with gluten-free peppermint bark.'),(90,'Fresh Milk & White Chocolate','Plain fresh milk with White Chocolate Raspberry.'),(91,'Kopi Tubruk',' Indonesian-style coffee where coarse coffee grounds are boiled along with solid sugar, resulting in a thick drink similar to Turkish coffee.'),(92,'Kopi Kawa Padang','Minuman kopi khas Indonesia yang berasal dari Sumatera Barat yang tidak menggunakan biji kopi melainkan tidak menggunakan biji melainkan daun dari tanaman kopi.'),(93,'Kopi Talua Bukittinggi','Kopi yang berasal dari tanah Minang dengan campuran Kuning telur yang dikocok sampai berbusa sambil diberi susu kental manis dan bubuk kayu manis.'),(94,'Kopi Lelet Rembang','Tradisi kopi khas Indonesia yang berasal dari Rembang. Biji kopi digiling dengan ukuran giling ultra fine sehingga menghasilkan rasanya sangat pahit dan meninggalkan aftertaste yang lama.'),(95,'Kopi Joss Yogyakarta','Kopi yang ditambahkan arang panas sehingga mendidih saat disajikan.'),(96,'Kopi Durian','Tradisi kopi yang berasal dari Lampung, Bengkulu dan Medan. Durian dicocol ke dalam kopi tubruk panas sebelum dimakan.'),(97,'Kopi Rarobang Ambon','Kopi dari Ambon yang disajikan dengan taburan biji kenari di atasnya sebagai pelengkap.'),(98,'Kopi Saring Aceh','Kopi yang berasal dari Gayo dan Ulee Kareeng. Kopi disajikan dengan metode metode seduh yang menggunakan saringan atau filter.'),(99,'Kopi Ijo Tulungagung','Kopi yang berasal dari Tulungagung, berwarna hijau dan memiliki manfaat utama sebagai penurun berat badan.'),(100,'Kopi Takar Mandailing Natal','Kopi khas Indonesia yang berasal dari Sipirok, Kabupaten Mandailing Natal, Sumatera Utara. Kopi ini disajikan  disajikan dengan dalam batok kelapa yang dikeraskan, selain itu kopi ini diaduk dengan menggunakan kayu manis.'),(101,'Mie Wonton Kuah','Mie dengan pangsit rebus yang memiliki isi daging cincang.'),(102,'Ayam Hainan','Ayam kampung rebus yang digoreng dengan sedikit minyak dan bumbu bawang putih dan jahe.'),(103,'Capcay Kuah','Tumis 10 jenis sayuran dengan seafood atau daging.'),(104,'Mie Goreng','Mie goreng dengan udang, telur, kol dan wortel.'),(105,'Ayam Kung Pao','Ayam goreng khas Sichuan dengan kacang mede.'),(106,'Fuyunghai','Telur dadar dengan daging kepiting.'),(107,'Udang Mayonnaise','Udang yang digoreng dalam balutan tepung gurih dan renyah, kemudian dicampur dengan saus mayonnaise yang segar.'),(108,'Sapi Lada Hitam','Sapi lada hitam mempunyai cita rasa yang cukup tajam sedikit pedas.'),(109,'Siomay Dimsum','Siomay dengan daging sapi, rumput laut, dan keju.'),(110,'Cah Kailan','Tumis sayur Kailan yang direbus dan disajikan dengan bumbu saus tiram.'),(111,'Sapo Tahu Ayam atau Seafood','Masakan sehat perpaduan dari beberapa macam sayur, daging ayam atau Seafood dan tahu.'),(112,'Kwetiau Goreng','Kwetiau goreng dengan tambahan udang, telur dan fillet dada ayam.'),(113,'Tahu Cabai Garam','Tahu goreng krispy dengan merica, kaldu, dan irisan tipis cabai dan bawang putih.'),(114,'Udang Asam Manis','Udang goreng dengan citarasa yang manis, gurih dan sedikit asam saos tomat.'),(115,'Lamien Ayam Panggang','Mie Lamien dengan cita rasa khas Asia, dipadukan bersama ayam yang dipanggang yang telah diberi bumbu angkak.'),(116,'Kepiting Lada Hitam','Kepiting rebus dengan lada hitam, ebi sangrai, kecap manis, dan saus tiram.'),(117,'Ayam Saus Lemon','Daging dada ayam fillet yang dimasak dengan jeruk, minyak wijen, telur dan merica.'),(118,'Nasi Goreng Sapi/Ikan Asin/Seafood','Nasi goreng yang praktis dengan daging ayam, sapi, kambing, seafood, ikan asin, dan pete.'),(119,'Lumpia Goreng','Spring roll dimsum dengan isi rebung dan ayam.'),(120,'Ayam Bakar Kecap','Ayam bakar dengan olesan mentega dan jeruk nipis peras.'),(121,'Kwetiau Seafood Szechuan','Kwetiau saus Szechuan yang dipadukan dengan seafood, ayam dan sayur.'),(122,'Bihun Bebek','Bihun goreng dengan saus hoisin, kucai, minyak wijen serta minyak biji anggur.'),(123,'Sambal Petis Kecap','Gorengan dengan kecap dan saus dari udang rebon yang dikeringkan.'),(124,'Cah Kailan Saus Tiram','Sayuran hijau yang ditumis (cah) dengan tambahan saus tiram.'),(125,'Lontong Cap Go Meh','Lontong yang dibanjur dengan kuah opor ayam, sayur lodeh, sambal goreng hati, acar , telur pindang, abon sapi, bubuk koya, sambal dan kerupuk. '),(126,'Tumis Putren','Tumis jagung muda dengan tambahan tempe dan cabai iris.'),(127,'Kwetiau Sapi','Kwetiau yang dicampur dengan daging sapi dan sayur.'),(128,'Nasi Capcay','Nasi putih dengan sayuran, potongan ayam/udang/bakso, yang ditumis bersama minyak wijen dan diguyur campuran tepung maizena dan sedikit air.'),(132,'Mac and Cheese','A side dish of macaroni and cheese.'),(133,'Sandwich','A sloppy joe sandwich with a side dish of coleslaw.'),(134,'Complete Dinner Meal','A traditional southern food dinner consisting of fried chicken with macaroni and cheese, collard greens, okra and cornbread'),(135,'Tex-Mex','Mixed beef and chicken fajita ingredients, served on a hot iron skillet.'),(136,'Gunbo','A dish that originated in southern Louisiana during the 18th century.'),(137,'Calas','Dumplings composed primarily of cooked rice, yeast, sugar, eggs, and flour; the resulting batter is deep-fried. '),(138,'Cheese Straws','Bacon Wrapped Cheese Straws'),(139,'Spinach Artichoke','Spinach Artichoke Squares'),(140,'Pesto Strips','Roasted Garlic and Pesto Strips'),(141,'Prosciutto Bites','The new pig in blanket'),(142,'Puff Pastry','Cranberry Brie Puff Pastry Pops'),(143,'Onion Cups','French Onion Cups'),(144,'Crostini','Grilled Cheese Crostini'),(145,'Afghan salad','Prepared with the primary ingredients of tomato, cucumber, onion, carrot, cilantro, mint and lemon juice.'),(146,'Bean Salad','Mainly composed of cooked pole beans (green beans and/or yellow wax beans), cooked chickpeas (garbanzo beans), cooked kidney beans and sliced or diced fresh beetroot. '),(147,'Caesar salad','Romaine lettuce and croutons dressed with parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, anchovies, and black pepper.'),(148,'Garden salad','Made with lettuce such as iceberg, romaine or mesclun greens.[12] Other toppings may include: tomatoes, carrots, onions, cucumbers, mushrooms, bell peppers.'),(149,'Greek salad','Made with wedges of tomatoes, cucumber, green bell peppers, red onion, sliced or cubed feta cheese, and kalamata olives, typically seasoned with salt, black pepper and dried oregano, and dressed with olive oil.'),(150,'Insalata Caprese','Made of sliced fresh buffalo mozzarella, tomatoes and basil, and seasoned with salt, pepper, and olive oil.'),(151,'Lyutika','Made from roasted peppers, tomatoes, garlic, onions, and vegetable oil, usually crushed with a pestle in a mortar.'),(152,'Alpokat','Mixed avocado with milk.'),(153,'Green Healty Juice','Cucumber, kale and pear juice.'),(154,'Red Sweet','Mango, cherry and dragonfruit juice.'),(155,'Fresh Sunshine','Papaya, pineapple and lemon juice.'),(156,'Soursop','This mouthwatering blend of soursop and coconut milk helps to clears out the digestive system.');
/*!40000 ALTER TABLE `all_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idPaket` int(11) NOT NULL,
  `TanggalMulai` varchar(40) NOT NULL,
  `TanggalBerakhir` varchar(40) NOT NULL,
  `Durasi` int(11) NOT NULL,
  `JumlahBox` int(11) NOT NULL,
  `TotalHarga` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,4,4,'2019/11/14','2019/11/20',5,1,75000),(2,4,4,'2019/11/18','2019/11/29',10,1,150000),(3,4,4,'2019/10/31','2019/11/01',2,1,30000);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connection_table`
--

DROP TABLE IF EXISTS `connection_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connection_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMenu` int(11) DEFAULT NULL,
  `idKategori` int(11) DEFAULT NULL,
  `urutan` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idMenu_idx` (`idMenu`),
  KEY `fk_idKategori_idx` (`idKategori`),
  CONSTRAINT `fk_idKategori` FOREIGN KEY (`idKategori`) REFERENCES `kategori_langganan` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_idMenu` FOREIGN KEY (`idMenu`) REFERENCES `all_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connection_table`
--

LOCK TABLES `connection_table` WRITE;
/*!40000 ALTER TABLE `connection_table` DISABLE KEYS */;
INSERT INTO `connection_table` VALUES (1,1,2,1),(2,2,2,2),(3,3,2,3),(4,4,2,4),(5,5,2,5),(6,6,2,6),(7,7,2,7),(8,8,2,8),(9,9,2,9),(10,10,2,10),(11,11,2,11),(12,12,2,12),(13,13,2,13),(14,14,2,14),(15,15,12,1),(16,16,12,2),(17,17,12,3),(18,18,12,4),(19,19,12,5),(20,20,12,6),(21,21,12,7),(22,22,12,8),(23,23,12,9),(24,24,12,10),(25,25,12,11),(26,26,12,12),(27,27,12,13),(28,28,12,14),(29,29,12,15),(30,30,12,16),(31,31,12,17),(32,32,12,18),(33,33,12,19),(34,34,12,20),(35,35,12,21),(36,36,12,22),(37,37,12,23),(38,38,12,24),(39,39,12,25),(40,40,12,26),(41,41,12,27),(42,42,12,28),(43,43,12,29),(44,44,12,30),(45,45,12,31),(46,46,1,1),(47,47,1,2),(48,48,1,3),(49,49,1,4),(50,50,1,5),(51,51,1,6),(52,52,1,7),(53,53,1,8),(54,54,1,9),(55,55,1,10),(56,56,1,11),(57,57,1,12),(58,58,1,13),(59,59,1,14),(60,60,1,15),(61,61,1,16),(62,62,1,17),(63,63,1,18),(64,64,1,19),(65,65,1,20),(66,66,1,21),(67,67,1,22),(68,68,1,23),(69,69,1,24),(70,70,1,25),(71,71,1,26),(72,72,1,27),(73,73,1,28),(74,74,1,29),(75,75,1,30),(76,76,1,31),(77,77,4,1),(78,78,4,2),(79,79,4,3),(80,80,4,4),(81,81,4,5),(82,82,4,6),(83,83,4,7),(84,84,4,8),(85,85,4,9),(86,86,4,10),(87,87,4,11),(88,88,4,12),(89,89,4,13),(90,90,4,14),(92,92,5,2),(93,93,5,3),(94,94,5,4),(95,95,5,5),(96,96,5,6),(97,97,5,7),(98,98,5,8),(99,99,5,9),(100,100,5,10),(128,12,8,1),(129,6,8,2),(130,18,8,3),(131,17,8,4),(132,22,8,3),(133,35,8,4),(134,49,8,5),(135,54,8,6),(136,66,8,7),(137,101,3,1),(138,102,3,2),(139,103,3,3),(140,104,3,4),(141,105,3,5),(142,106,3,6),(143,107,3,7),(144,108,3,8),(145,109,3,9),(146,110,3,10),(147,111,3,11),(148,112,3,12),(149,113,3,13),(150,114,3,14),(151,115,3,15),(152,116,3,16),(153,117,3,17),(154,118,3,18),(155,119,3,19),(156,120,3,20),(157,121,3,21),(158,122,3,22),(159,123,3,23),(160,124,3,24),(161,125,3,25),(162,126,3,26),(163,127,3,27),(164,128,3,28),(165,101,8,8),(166,110,8,9),(167,113,8,10),(168,124,8,11),(169,126,8,12),(170,91,5,1),(171,16,6,1),(172,19,6,2),(173,21,6,3),(174,22,6,4),(175,26,6,5),(176,27,6,6),(177,28,6,7),(178,29,6,8),(179,30,6,9),(180,35,6,10),(181,132,7,1),(182,133,7,2),(183,134,7,3),(184,135,7,4),(185,136,7,5),(186,137,7,6),(187,114,9,1),(188,122,9,2),(189,118,9,3),(190,124,9,4),(191,128,9,5),(192,120,9,6),(193,106,10,1),(194,102,10,2),(195,105,10,3),(196,108,10,4),(197,103,10,5),(198,101,10,6),(199,138,11,1),(200,139,11,2),(201,140,11,3),(202,141,11,4),(203,142,11,5),(204,143,11,6),(205,144,11,7),(206,145,13,1),(207,146,13,2),(208,147,13,3),(209,148,13,4),(210,149,13,5),(211,150,13,6),(212,151,13,7),(213,43,18,1),(214,44,18,2),(215,49,18,3),(216,60,18,4),(217,62,18,5),(218,75,18,6),(219,152,19,1),(220,153,19,2),(221,154,19,3),(222,155,19,4),(223,156,19,5);
/*!40000 ALTER TABLE `connection_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TanggalTransaksi` varchar(40) NOT NULL,
  `UserId` int(11) NOT NULL,
  `TotalBelanja` int(11) NOT NULL,
  `NamaPenerima` varchar(45) NOT NULL,
  `AlamatPenerima` varchar(45) NOT NULL,
  `KodePosPenerima` varchar(45) NOT NULL,
  `Cancel` int(11) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `BatasAkhirBayar` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,'2019-10-30 11:14:32',2,195000,'dawa','saew','dwasa',0,'Belum Dibayar','2019-10-31 11:14:32'),(51,'2019-10-30 11:19:56',2,67500,'sada','dwaxa','dwas',0,'Belum Dibayar','2019-10-31 11:19:56'),(52,'2019-10-30 11:21:01',2,80000,'dw','dw','dwa',0,'Belum Dibayar','2019-10-31 11:21:01'),(53,'2019-10-30 11:23:01',2,71250,'d','de','ea',0,'Belum Dibayar','2019-10-31 11:23:01');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_detailproduct`
--

DROP TABLE IF EXISTS `history_detailproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_detailproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idPaket` int(11) NOT NULL,
  `TanggalMulai` date NOT NULL,
  `TanggalBerakhir` date NOT NULL,
  `Durasi` int(11) NOT NULL,
  `JumlahBox` int(11) NOT NULL,
  `TotalHarga` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_detailproduct`
--

LOCK TABLES `history_detailproduct` WRITE;
/*!40000 ALTER TABLE `history_detailproduct` DISABLE KEYS */;
INSERT INTO `history_detailproduct` VALUES (77,2,8,'2019-10-31','2019-11-06',5,1,127500),(78,2,2,'2019-10-31','2019-11-06',5,1,67500),(79,2,2,'2019-10-31','2019-11-06',5,1,67500),(80,2,7,'2019-10-31','2019-11-01',2,1,80000),(81,2,5,'2019-10-31','2019-11-06',5,1,71250);
/*!40000 ALTER TABLE `history_detailproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori_langganan`
--

DROP TABLE IF EXISTS `kategori_langganan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori_langganan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaPaket` varchar(30) NOT NULL,
  `harga` int(11) NOT NULL,
  `discount` int(2) DEFAULT NULL,
  `deskripsi` varchar(300) DEFAULT NULL,
  `imagePath` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_langganan`
--

LOCK TABLES `kategori_langganan` WRITE;
/*!40000 ALTER TABLE `kategori_langganan` DISABLE KEYS */;
INSERT INTO `kategori_langganan` VALUES (1,'Javanese Cuisine',30000,NULL,'Traditional Food of Java with Authentic Taste ','https://media-cdn.tripadvisor.com/media/photo-s/0e/ce/7a/b1/javanese-cuisine-featuring.jpg'),(2,'Overnight Oat',15000,10,'Rolled or old fashioned oats that have been soaked overnight in almond milk or coconut milk mixed with favourite fruit.','https://lifemadesweeter.com/wp-content/uploads/8-OVERNIGHT-OATS-2-TEXT-PINTEREST.jpg'),(3,'Chinese Food',30000,NULL,'Chinese cuisine which  includes cuisine originating from the diverse regions of China. The menu includes sweet and Sour Pork, Kung Pao Chicken, Dumpling, Peking Roasted Duck, etc. ','https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(4,'Fresh Milk and Cookies',15000,NULL,'The milk accompanied with sweet cookies.','https://images.pexels.com/photos/890575/pexels-photo-890575.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(5,'Coffee',15000,5,'Several kind of coffee from Sulawesi, Flores, East Timor, Bali and Java.','https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(6,'Ready to Cook',30000,20,'Paket makanan dan sambal yang siap diolah.','https://images.pexels.com/photos/1030960/pexels-photo-1030960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(7,'Western',40000,NULL,'This menu is mainly based on English and Italian dishes that have been adapted to the local palate.','https://images.pexels.com/photos/341048/pexels-photo-341048.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(8,'Less Collesterol',30000,15,'This menu is less colesterol.','https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(9,'Family',75000,NULL,'Paket besar menu keluarga, cukup untuk 3 - 4 orang.','https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(10,'Office',300000,10,'Paket besar makanan untuk makanan terbaik untuk karyawan, tingkatkan produktivitas dan efisiensi waktu kerja.','https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(11,'Appetizer',15000,NULL,'Makanan pembuka sebagai pembangkit nafsu makan yang sehat dan rendah kalori.','https://images.pexels.com/photos/1580464/pexels-photo-1580464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),(12,'Indonesian Food',30000,NULL,'Paket makanan Indonesia termasuk sate, pepes, dan sop.','https://photos.smugmug.com/Indonesia-2016/i-nnZgJ3g/0/X3/indonesian-food-6-X3.jpg'),(13,'Vegie Salad',30000,15,'Salad sayur-sayuran, cocok untuk kamu yang sedang diet.','https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(18,'Basic Lunch',20000,10,'Paket makan siang dengan porsi kecil dan harga ekonomis.','https://images.pexels.com/photos/1162540/pexels-photo-1162540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),(19,'Fruit and Juice',15000,NULL,'Paket Buah dan Juice, untuk suply vitamin kamu setiap hari.','https://images.pexels.com/photos/990439/pexels-photo-990439.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
/*!40000 ALTER TABLE `kategori_langganan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `tanggalBergabung` datetime NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','83848ece03d1ffe0377dcfa5a43f30ea234776a220d69ce46dd23e9beccf6ea4','reginaevadm@yahoo.co.id','Verified','2019-10-10 20:32:46','admin'),(2,'Pak Ogah','9072c1f79fb6bac0e2ea4c60ca6f0c9ac3799b3664ba78f6a9e42a2d805f0bf7','andre@mail.com','Verified','2019-10-11 11:09:44','user'),(3,'reginaeva','83848ece03d1ffe0377dcfa5a43f30ea234776a220d69ce46dd23e9beccf6ea4','reginaevadewi@gmail.com','Verified','2019-10-15 17:12:21','user'),(4,'mandasari','83848ece03d1ffe0377dcfa5a43f30ea234776a220d69ce46dd23e9beccf6ea4','r.mandasari@protonmail.com','Verified','2019-10-17 15:35:21','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-30 23:38:16
