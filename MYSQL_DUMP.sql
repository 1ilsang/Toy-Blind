-- MySQL dump 10.13  Distrib 8.0.12, for osx10.14 (x86_64)
--
-- Host: localhost    Database: blind
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `blind`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `blind` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `blind`;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_seq` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT 'all',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_created` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hit` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`seq`),
  KEY `foregin_board_user` (`user_seq`),
  CONSTRAINT `foregin_board_user` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,7,'test','test desc',NULL,NULL,'Tech-Careers','2019-06-08 05:34:56','2019-06-08 05:34:56',0),(2,7,'test2','test desc2',NULL,NULL,'Tech-Careers','2019-06-08 05:35:08','2019-06-08 05:35:08',0),(3,7,'test3','test desc3',NULL,NULL,'Tech-Careers','2019-06-08 05:38:26','2019-06-08 05:38:26',0),(4,7,'test4','test desc4',NULL,NULL,'Tech-Careers','2019-06-08 05:38:33','2019-06-08 05:38:33',0),(5,7,'test5','test desc5',NULL,NULL,'Tech-Careers','2019-06-08 05:38:38','2019-06-08 05:38:38',0),(6,7,'test-all','test desc all',NULL,NULL,'all','2019-06-08 05:39:00','2019-06-08 07:48:25',0),(7,7,'test-all2','test desc all2',NULL,NULL,'all','2019-06-08 05:39:07','2019-06-08 07:48:28',0),(8,7,'test-all3','test desc all23',NULL,NULL,'all','2019-06-08 05:39:12','2019-06-08 07:48:31',0),(9,7,'test-all4','test desc all4',NULL,NULL,'all','2019-06-08 05:39:18','2019-06-08 07:48:36',0),(10,7,'test5','test desc5',NULL,NULL,'IPO','2019-06-08 07:43:19','2019-06-08 07:43:19',0),(11,7,'longTest','long long long long  long lng long long long long long l ng ln g long long long long long long long long long long long long long long long long long long long long long long long long long long long long long',NULL,NULL,'all','2019-06-08 23:51:12','2019-06-08 23:51:12',0),(12,7,'longTest','long long long long  long lng long long long long long l ng ln g long long long long long long long long long long long long long long long long long long long long long long long long long long long long longi longl ong long loniiiii long-end',NULL,NULL,'all','2019-06-08 23:53:20','2019-06-08 23:53:20',0),(13,8,'123','2312','https://blindimg.storage.googleapis.com/7cb40c00-8a4d-11e9-b3e9-6505689ab110_duck.png','https://blindimg.storage.googleapis.com/thumb_7cb40c00-8a4d-11e9-b3e9-6505689ab110_duck.png','all','2019-06-09 09:28:26','2019-06-09 09:28:26',0),(14,7,'특수문자 체크 !@?/ㅗㅑ! <script>alert(\'hi\');</script>','특수문자 체크 !@?/ㅗㅑ! <script>alert(\'hi\');</script>',NULL,NULL,'all','2019-06-09 20:42:40','2019-06-09 20:42:40',0),(15,7,'단일글','단일글',NULL,NULL,'all','2019-06-09 20:44:05','2019-06-09 20:44:05',0),(16,7,'testtestsetsetstst','test',NULL,NULL,'all','2019-06-09 20:44:28','2019-06-09 20:44:28',0),(17,7,'<ul><li>zz</li></ul>','<a href=\"#\"  src=\"omg\">COME</a>',NULL,NULL,'all','2019-06-09 20:45:28','2019-06-09 20:45:28',0),(18,7,'Image input','igmgimgimigmimgimgimgimgigigmgimgimgi <br/>  sdifjaoeifjaosdfaef','https://blindimg.storage.googleapis.com/2251e070-8aac-11e9-9053-776bf0f3d8db_duck.png','https://blindimg.storage.googleapis.com/thumb_2251e070-8aac-11e9-9053-776bf0f3d8db_duck.png','all','2019-06-09 20:46:05','2019-06-09 20:46:05',0),(19,7,'a-a','test',NULL,NULL,'Tech-Careers','2019-06-09 21:00:45','2019-06-09 21:00:45',0),(20,1,'test','test',NULL,NULL,'all','2019-06-09 21:04:11','2019-06-09 21:04:11',0),(21,8,'User 8 write','유저 8번이 쓴글 <o><li>hi</li></o> <br/> 이다 <hr/>','https://blindimg.storage.googleapis.com/2860f550-8ad9-11e9-a200-378e2ed1fddc_duck.png','https://blindimg.storage.googleapis.com/thumb_2860f550-8ad9-11e9-a200-378e2ed1fddc_duck.png','all','2019-06-10 02:08:15','2019-06-10 02:08:15',0);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_has_comment`
--

DROP TABLE IF EXISTS `board_has_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board_has_comment` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `board_seq` int(10) unsigned NOT NULL,
  `comment_seq` int(10) unsigned NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `board_seq` (`board_seq`),
  KEY `comment_seq` (`comment_seq`),
  CONSTRAINT `board_has_comment_ibfk_1` FOREIGN KEY (`board_seq`) REFERENCES `board` (`seq`),
  CONSTRAINT `board_has_comment_ibfk_2` FOREIGN KEY (`comment_seq`) REFERENCES `comment` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_has_comment`
--

LOCK TABLES `board_has_comment` WRITE;
/*!40000 ALTER TABLE `board_has_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_has_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_seq` int(10) unsigned NOT NULL,
  `description` varchar(255) NOT NULL,
  `parent` int(10) unsigned DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`),
  KEY `user_seq` (`user_seq`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `test` (
  `no` int(11) NOT NULL,
  `description` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'good'),(21,'gaood'),(211,'gaood');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_created` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `company` varchar(20) NOT NULL,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `nickname_2` (`nickname`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','test','1','HR','2019-06-09 21:03:14','2019-06-09 21:03:14','kakao'),(7,'1ilsang@test.com','1ilsang','$2b$10$xOvn1BVK4sI//UNQ2HcfZ.nTmxIH48mFGosyCQC4Kd1kTmSB6jxkO','Developer','2019-06-07 10:28:09','2019-06-08 21:15:29','blind'),(8,'1ilsang@naver.com','1ilsangNaver','$2b$10$rlHesFSsvdaRUYxKdd3JxepZdC9BLVeugX5vudHYGvjn1W604EL8u','Developer','2019-06-08 21:16:32','2019-06-08 21:16:32','naver');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_like_board`
--

DROP TABLE IF EXISTS `user_like_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_like_board` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_seq` int(10) unsigned NOT NULL,
  `board_seq` int(10) unsigned NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `user_seq` (`user_seq`),
  KEY `board_seq` (`board_seq`),
  CONSTRAINT `user_like_board_ibfk_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`),
  CONSTRAINT `user_like_board_ibfk_2` FOREIGN KEY (`board_seq`) REFERENCES `board` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_like_board`
--

LOCK TABLES `user_like_board` WRITE;
/*!40000 ALTER TABLE `user_like_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_like_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_like_comment`
--

DROP TABLE IF EXISTS `user_like_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_like_comment` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_seq` int(10) unsigned NOT NULL,
  `comment_seq` int(10) unsigned NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `user_seq` (`user_seq`),
  KEY `comment_seq` (`comment_seq`),
  CONSTRAINT `user_like_comment_ibfk_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`),
  CONSTRAINT `user_like_comment_ibfk_2` FOREIGN KEY (`comment_seq`) REFERENCES `comment` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_like_comment`
--

LOCK TABLES `user_like_comment` WRITE;
/*!40000 ALTER TABLE `user_like_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_like_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-10  6:20:17
