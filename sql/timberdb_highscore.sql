CREATE DATABASE IF NOT EXISTS `sahatavarapeli`;
USE `sahatavarapeli`;

DROP TABLE IF EXISTS `highscore`;
CREATE TABLE `highscore` (
  `id` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `highscore` WRITE;
INSERT INTO `highscore` VALUES (1,'TestUser','2');
UNLOCK TABLES;

