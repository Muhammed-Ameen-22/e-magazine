-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: emag
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.10-MariaDB

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
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_admin` (
  `username` varchar(15) NOT NULL,
  `pass` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_admin`
--

LOCK TABLES `tbl_admin` WRITE;
/*!40000 ALTER TABLE `tbl_admin` DISABLE KEYS */;
INSERT INTO `tbl_admin` VALUES ('admin','admin123');
/*!40000 ALTER TABLE `tbl_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cat`
--

DROP TABLE IF EXISTS `tbl_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cat` (
  `cat_Id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_Name` varchar(20) NOT NULL,
  PRIMARY KEY (`cat_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cat`
--

LOCK TABLES `tbl_cat` WRITE;
/*!40000 ALTER TABLE `tbl_cat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_content`
--

DROP TABLE IF EXISTS `tbl_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_content` (
  `content_Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID` int(11) NOT NULL,
  `cat_ID` int(11) NOT NULL,
  `content_Image` blob NOT NULL,
  `content` longtext NOT NULL,
  `content_Status` varchar(10) NOT NULL,
  `content_Title` varchar(15) NOT NULL,
  PRIMARY KEY (`content_Id`),
  KEY `user_ID` (`user_ID`),
  KEY `fk_cat_ID` (`cat_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_content`
--

LOCK TABLES `tbl_content` WRITE;
/*!40000 ALTER TABLE `tbl_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_Name` varchar(30) NOT NULL,
  `user_CD` varchar(30) NOT NULL,
  `user_Email` varchar(30) NOT NULL,
  `user_Pass` varchar(100) NOT NULL,
  PRIMARY KEY (`user_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'Muhammed Ameen','Dept of Commerce','test@gmail.com','$2b$10$k59TsQzjauhPmVtoDvWdrOWVJ211aDn5S1jNIDJVt3ppjN17L3iQG'),(2,'Rohith','BBA','test2@gmail.com','$2b$10$78YlwWVWsSF..nLhxvX.2.EI.IbkN3Lmt83hfYdF5heHC7CJ.ucJS'),(3,'ABC','Dept of Commerce','abcd@gmail.com','$2b$10$tn4lw05rIWr0vhytrvfCz.Kf1ejFaK9FWF/P6pSU7Q4baSPhHpzPe'),(4,'Rohith','Dept of Commerce','rohith@gmail.com','$2b$10$PjHTp1SNQQ33qnpSv2jT5ugie7ebDBkJJC4rx.PnbYJRlGO7TK/Li'),(5,'Jarl','BAE','jarl@gmail.com','$2b$10$JgKw.tPHDV2dzljnPnwqhOBbDZcYm2p8s/JnG7OdqsasaBFCm/SAu'),(6,'Ajmal','Dept of English','ajmal@gmail.com','$2b$10$TOrf1sEvMjJUhZINqrXwk.0YZKPv6qU2O33Nfk0sMAIbVvx/xT3Hu'),(7,'Harry','Dept of Commerce','harry@gmail.com','$2b$10$SSlWUci0K0uZN7MWAOCHAeOX4L2CfYzrnXPTFfRwHp.LdhaHrAkHO'),(8,'Saurav','Dept of Animation','saurav@gmail.com','$2b$10$5NG/RpYLw4MgT1X1kzUHK.apHwxNRYJYX5Mw4nGGz7zty5/9dIO/y');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-20 12:50:23
