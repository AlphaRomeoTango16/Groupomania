-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  `imageUrl` varchar(500) DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_241` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_242` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `imageUrl` varchar(500) DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lastName` varchar(35) NOT NULL,
  `emailAddress` varchar(30) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `imageUrl` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress` (`emailAddress`),
  UNIQUE KEY `emailAddress_2` (`emailAddress`),
  UNIQUE KEY `emailAddress_3` (`emailAddress`),
  UNIQUE KEY `emailAddress_4` (`emailAddress`),
  UNIQUE KEY `emailAddress_5` (`emailAddress`),
  UNIQUE KEY `emailAddress_6` (`emailAddress`),
  UNIQUE KEY `emailAddress_7` (`emailAddress`),
  UNIQUE KEY `emailAddress_8` (`emailAddress`),
  UNIQUE KEY `emailAddress_9` (`emailAddress`),
  UNIQUE KEY `emailAddress_10` (`emailAddress`),
  UNIQUE KEY `emailAddress_11` (`emailAddress`),
  UNIQUE KEY `emailAddress_12` (`emailAddress`),
  UNIQUE KEY `emailAddress_13` (`emailAddress`),
  UNIQUE KEY `emailAddress_14` (`emailAddress`),
  UNIQUE KEY `emailAddress_15` (`emailAddress`),
  UNIQUE KEY `emailAddress_16` (`emailAddress`),
  UNIQUE KEY `emailAddress_17` (`emailAddress`),
  UNIQUE KEY `emailAddress_18` (`emailAddress`),
  UNIQUE KEY `emailAddress_19` (`emailAddress`),
  UNIQUE KEY `emailAddress_20` (`emailAddress`),
  UNIQUE KEY `emailAddress_21` (`emailAddress`),
  UNIQUE KEY `emailAddress_22` (`emailAddress`),
  UNIQUE KEY `emailAddress_23` (`emailAddress`),
  UNIQUE KEY `emailAddress_24` (`emailAddress`),
  UNIQUE KEY `emailAddress_25` (`emailAddress`),
  UNIQUE KEY `emailAddress_26` (`emailAddress`),
  UNIQUE KEY `emailAddress_27` (`emailAddress`),
  UNIQUE KEY `emailAddress_28` (`emailAddress`),
  UNIQUE KEY `emailAddress_29` (`emailAddress`),
  UNIQUE KEY `emailAddress_30` (`emailAddress`),
  UNIQUE KEY `emailAddress_31` (`emailAddress`),
  UNIQUE KEY `emailAddress_32` (`emailAddress`),
  UNIQUE KEY `emailAddress_33` (`emailAddress`),
  UNIQUE KEY `emailAddress_34` (`emailAddress`),
  UNIQUE KEY `emailAddress_35` (`emailAddress`),
  UNIQUE KEY `emailAddress_36` (`emailAddress`),
  UNIQUE KEY `emailAddress_37` (`emailAddress`),
  UNIQUE KEY `emailAddress_38` (`emailAddress`),
  UNIQUE KEY `emailAddress_39` (`emailAddress`),
  UNIQUE KEY `emailAddress_40` (`emailAddress`),
  UNIQUE KEY `emailAddress_41` (`emailAddress`),
  UNIQUE KEY `emailAddress_42` (`emailAddress`),
  UNIQUE KEY `emailAddress_43` (`emailAddress`),
  UNIQUE KEY `emailAddress_44` (`emailAddress`),
  UNIQUE KEY `emailAddress_45` (`emailAddress`),
  UNIQUE KEY `emailAddress_46` (`emailAddress`),
  UNIQUE KEY `emailAddress_47` (`emailAddress`),
  UNIQUE KEY `emailAddress_48` (`emailAddress`),
  UNIQUE KEY `emailAddress_49` (`emailAddress`),
  UNIQUE KEY `emailAddress_50` (`emailAddress`),
  UNIQUE KEY `emailAddress_51` (`emailAddress`),
  UNIQUE KEY `emailAddress_52` (`emailAddress`),
  UNIQUE KEY `emailAddress_53` (`emailAddress`),
  UNIQUE KEY `emailAddress_54` (`emailAddress`),
  UNIQUE KEY `emailAddress_55` (`emailAddress`),
  UNIQUE KEY `emailAddress_56` (`emailAddress`),
  UNIQUE KEY `emailAddress_57` (`emailAddress`),
  UNIQUE KEY `emailAddress_58` (`emailAddress`),
  UNIQUE KEY `emailAddress_59` (`emailAddress`),
  UNIQUE KEY `emailAddress_60` (`emailAddress`),
  UNIQUE KEY `emailAddress_61` (`emailAddress`),
  UNIQUE KEY `emailAddress_62` (`emailAddress`),
  UNIQUE KEY `emailAddress_63` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-20  9:17:17
