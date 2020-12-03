CREATE DATABASE IF NOT EXISTS `sahatavarapeli`;
USE `sahatavarapeli`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `role` varchar(10) DEFAULT 'User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'Test','Test123',NULL,NULL,NULL,'User');
UNLOCK TABLES;

