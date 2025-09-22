-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bbc_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_date` date NOT NULL,
  `order_total` decimal(15,2) NOT NULL,
  `customer_id` int NOT NULL,
  `discount` decimal(15,2) DEFAULT '0.00',
  `shipping_charge` decimal(15,2) DEFAULT '0.00',
  `tax` decimal(15,2) DEFAULT '0.00',
  `shipping_street` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_post_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `sub_total` decimal(15,2) DEFAULT NULL,
  `payment_status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_number` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_cvv` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_holder_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_expiry_date` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gateway_fee` decimal(15,2) DEFAULT '0.00',
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-09-19',172.00,3,0.00,100.00,2.00,'nabeul','Dhaka','8080','Dhaka','Bangladesh','Processing',20.00,'Unpaid','COD','','','','',50.00),(2,'2025-09-20',194.00,6,0.00,100.00,4.00,'nabeul','Dhaka','8080','Dhaka','Bangladesh','Processing',40.00,'Unpaid','COD','','','','',50.00),(3,'2025-09-20',1250.00,6,0.00,150.00,100.00,'nabeul','Cumilla','8080','Chattogram','Bangladesh','Processing',1000.00,'Paid','bKash','','','','',0.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-20 13:26:31
