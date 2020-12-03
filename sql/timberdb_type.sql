CREATE DATABASE IF NOT EXISTS `sahatavarapeli`;
USE `sahatavarapeli`;

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `type` WRITE;
INSERT INTO `type` VALUES (1,'Spruce'),(2,'Pine');
UNLOCK TABLES;
