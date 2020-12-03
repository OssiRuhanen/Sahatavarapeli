DROP TABLE IF EXISTS `timber`;
CREATE TABLE `timber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(15) DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `reason_finnish` varchar(300) DEFAULT NULL,
  `reason_english` varchar(300) DEFAULT NULL,
  `imagepath` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `timber` WRITE;
INSERT INTO `timber` VALUES (1,'Pine',2,'Lorem ipsum miksi kuvan puu on luokkaa X','Lorem ipsum english X','/images/lankku2.png'),(2,'Pine',3,'Lorem ipsum miksi kuvan puu on luokkaa X','Lorem ipsum english X','/images/lankku3.png'),(3,'Pine',4,'Lorem ipsum miksi kuvan puu on luokkaa X','Lorem ipsum english X','/images/lankku4.png'),(4,'Pine',5,'Lorem ipsum miksi kuvan puu on luokkaa X','Lorem ipsum english X','/images/lankku5.png'),(5,'Pine',6,'Lorem ipsum miksi kuvan puu on luokkaa X','Lorem ipsum english X','/images/lankku6.png');
UNLOCK TABLES;
