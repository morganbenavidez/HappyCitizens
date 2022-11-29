-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: happycitizens
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `accountaccess`
--

DROP TABLE IF EXISTS `accountaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountaccess` (
  `userid` int NOT NULL,
  `granted` int NOT NULL,
  PRIMARY KEY (`userid`,`granted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountaccess`
--

LOCK TABLES `accountaccess` WRITE;
/*!40000 ALTER TABLE `accountaccess` DISABLE KEYS */;
INSERT INTO `accountaccess` VALUES (4,5);
/*!40000 ALTER TABLE `accountaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `propertyid` int NOT NULL AUTO_INCREMENT,
  `propertyname` varchar(100) NOT NULL,
  `propertyowner` int NOT NULL,
  `city` varchar(75) NOT NULL,
  `state` varchar(25) NOT NULL,
  `purchaseprice` int NOT NULL,
  `appraisalprice` int NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`propertyid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'james',4,'Pompano','0',100000,100000,5),(2,'house',4,'city','AL',123456,10,5),(3,'abc',4,'blah','CO',123,10,3),(4,'property',4,'boca','AR',123124,10,1);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertycategory`
--

DROP TABLE IF EXISTS `propertycategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertycategory` (
  `propertycategoryid` int NOT NULL AUTO_INCREMENT,
  `propertycategoryname` varchar(75) NOT NULL,
  PRIMARY KEY (`propertycategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertycategory`
--

LOCK TABLES `propertycategory` WRITE;
/*!40000 ALTER TABLE `propertycategory` DISABLE KEYS */;
INSERT INTO `propertycategory` VALUES (1,'Land'),(2,'Structure'),(3,'Electronics'),(4,'Jewelry'),(5,'Single-Family Home'),(6,'Multi-Family Home'),(7,'Vehicle'),(8,'Boat');
/*!40000 ALTER TABLE `propertycategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `session` text COLLATE utf8_unicode_ci NOT NULL,
  `expires` int DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `stateid` int NOT NULL AUTO_INCREMENT,
  `statename` varchar(75) NOT NULL,
  `abbreviation` varchar(2) NOT NULL,
  `Tax Rate` int NOT NULL DEFAULT '15',
  PRIMARY KEY (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Alabama','AL',15),(2,'Alaska','AK',15),(3,'Arizona','AZ',15),(4,'Arkansas','AR',15),(5,'California','CA',15),(6,'Colorado','CO',15),(7,'Connecticut','CT',15),(8,'Delaware','DE',15),(9,'District of Columbia','Di',15),(10,'Florida','FL',15),(11,'Georgia','GA',15),(12,'Hawaii','HI',15),(13,'Idaho','ID',15),(14,'Illinois','IL',15),(15,'Indiana','IN',15),(16,'Iowa','IA',15),(17,'Kansas','KS',15),(18,'Kentucky','KY',15),(19,'Louisiana','LA',15),(20,'Maine','ME',15),(21,'Maryland','MD',15),(22,'Massachusetts','MA',15),(23,'Michigan','MI',15),(24,'Minnesota','MN',15),(25,'Mississippi','MS',15),(26,'Missouri','MO',15),(27,'Montana','MT',15),(28,'Nebraska','NE',15),(29,'Nevada','NV',15),(30,'New Hampshire','NH',15),(31,'New Jersey','NJ',15),(32,'New Mexico','NM',15),(33,'New York','NY',15),(34,'North Carolina','NC',15),(35,'North Dakota','ND',15),(36,'Ohio','OH',15),(37,'Oklahoma','OK',15),(38,'Oregon','OR',15),(39,'Pennsylvania','PA',15),(40,'Rhode Island','RI',15),(41,'South Carolina','SC',15),(42,'South Dakota','SD',15),(43,'Tennessee','TN',15),(44,'Texas','TX',15),(45,'Utah','UT',15),(46,'Vermont','VT',15),(47,'Virginia','VA',15),(48,'Washington','WA',15),(49,'West Virginia','WV',15),(50,'Wisconsin','WI',15),(51,'Wyoming','WY',15),(52,'Federal','FD',15);
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercategory`
--

DROP TABLE IF EXISTS `usercategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercategory` (
  `usercategoryid` int NOT NULL AUTO_INCREMENT,
  `usercategoryname` varchar(20) NOT NULL,
  PRIMARY KEY (`usercategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercategory`
--

LOCK TABLES `usercategory` WRITE;
/*!40000 ALTER TABLE `usercategory` DISABLE KEYS */;
INSERT INTO `usercategory` VALUES (1,'citizen'),(2,'government'),(3,'insurance'),(4,'superuser');
/*!40000 ALTER TABLE `usercategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinformation`
--

DROP TABLE IF EXISTS `userinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinformation` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `hashed_password` blob NOT NULL,
  `salt` blob NOT NULL,
  `category` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinformation`
--

LOCK TABLES `userinformation` WRITE;
/*!40000 ALTER TABLE `userinformation` DISABLE KEYS */;
INSERT INTO `userinformation` VALUES (2,'bob777',_binary '®‰wIX0\Ãð\ÔÛ¿\Ã[\ï\Ù‡À¤°wO1ö©ôòT','',1,'bob','smith','bobsmith@gmail.com','(123) 456-7890',1),(4,'john',_binary '\Ü\Ì\Ýx—UGS’´Sn‘m²#a\æAþ\ÔV‹E0bj\á',_binary '‡D´\ÙÁTˆ^%Öš\Ù',1,'john','smith','johnsmith@gmail.com','(123) 456-7891',1),(5,'bob',_binary '\ß\Û\ëøar#|\É	GF°„Å¢cA’“\\™>—ñž\ä„\Ðw\æ',_binary '–¬¯ÿŽš¿Üƒ¹w\Í·.',1,'bob','smith','bobsmith123@gmail.com','(123) 111-2222',1);
/*!40000 ALTER TABLE `userinformation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 20:30:26
