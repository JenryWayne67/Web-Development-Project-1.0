-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: university_recommendation
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `field_id` int NOT NULL AUTO_INCREMENT,
  `field_name` varchar(100) NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `field_name` (`field_name`),
  KEY `idx_fields_name` (`field_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES (8,'Arts & Humanities'),(4,'Economics'),(7,'Education'),(2,'Engineering'),(9,'Environment & Geography'),(10,'Languages'),(11,'Marine'),(6,'Mathematics'),(3,'Medicine and health'),(1,'Programming & Technology'),(5,'Science');
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `program_id` int NOT NULL AUTO_INCREMENT,
  `university_id` int NOT NULL,
  `field_id` int NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `min_score` int NOT NULL DEFAULT '0',
  `min_score_male` int DEFAULT '0',
  `min_score_female` int DEFAULT '0',
  `min_eng_chem_bio_male` int DEFAULT '0',
  `min_eng_chem_bio_female` int DEFAULT '0',
  `min_4sub_male` int DEFAULT '0',
  `min_4sub_female` int DEFAULT '0',
  PRIMARY KEY (`program_id`),
  KEY `idx_programs_university` (`university_id`),
  KEY `idx_programs_field` (`field_id`),
  KEY `idx_programs_min_score` (`min_score`),
  KEY `idx_programs_male_score` (`min_score_male`),
  KEY `idx_programs_female_score` (`min_score_female`),
  CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `universities` (`university_id`) ON DELETE CASCADE,
  CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `fields` (`field_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,7,3,'M.B.,B.S. (UM1)',450,0,0,252,259,0,0),(2,8,3,'M.B.,B.S. (UM2)',450,0,0,252,259,0,0),(3,11,3,'B.D.S. (Dental Surgery)',450,0,0,246,256,0,0),(4,10,3,'B.Med.Tech (Medical Technology)',466,0,0,0,0,0,0),(5,9,3,'B.Pharm. (Pharmacy)',452,0,0,0,0,0,0),(6,12,3,'B.N.Sc. (Nursing)',425,0,0,0,0,0,0),(7,13,3,'B.P.H. (Public Health)',396,0,0,0,0,0,0),(8,25,3,'B.V.Sc. (Veterinary Science)',416,0,0,0,0,0,0),(9,26,3,'B.T.M. (Traditional Medicine)',386,0,0,0,0,0,0),(10,1,1,'B.C.Sc / B.C.Tech (UIT)',480,0,0,0,0,0,0),(11,6,1,'B.C.Sc / B.C.Tech (UCSY)',397,0,0,0,0,0,0),(12,2,2,'Civil Engineering',0,504,498,0,0,346,339),(13,2,2,'Mechanical Engineering',0,502,476,0,0,331,327),(14,2,2,'Electrical Power Engineering',0,484,477,0,0,322,327),(15,2,2,'Electronic Engineering',0,466,500,0,0,329,329),(16,2,2,'Computer Engineering & Information Technology',0,500,496,0,0,333,334),(17,2,2,'Mechatronic Engineering',0,491,480,0,0,325,326),(18,2,2,'Chemical Engineering',0,482,492,0,0,310,325),(19,2,2,'Textile Engineering',0,478,491,0,0,316,320),(20,2,2,'Mining Engineering',0,478,467,0,0,315,320),(21,2,2,'Petroleum Engineering',0,482,489,0,0,318,320),(22,2,2,'Metallurgical Engineering',0,468,469,0,0,315,319),(23,2,2,'Architecture',0,501,486,0,0,333,338),(24,2,2,'Telecommunication Engineering',0,472,465,0,0,317,321),(25,2,2,'Food Engineering',0,461,468,0,0,315,320),(26,3,2,'Civil Engineering',0,0,0,0,0,294,294),(27,3,2,'Architecture',0,0,0,0,0,288,288),(28,3,2,'Computer Engineering & Information Technology (CEIT)',0,0,0,0,0,282,282),(29,3,2,'Electronic Engineering',0,0,0,0,0,270,270),(30,3,2,'Mechanical Engineering',0,0,0,0,0,269,269),(31,3,2,'Electrical Power Engineering',0,0,0,0,0,266,266),(32,3,2,'Mechatronic Engineering',0,0,0,0,0,261,261),(33,3,2,'Chemical Engineering',0,0,0,0,0,258,258),(34,3,2,'Metallurgical Engineering',0,0,0,0,0,247,247),(35,3,2,'Textile Engineering',0,0,0,0,0,243,243),(36,3,2,'Agricultural Engineering',0,0,0,0,0,240,240),(37,4,2,'Civil Engineering',0,0,0,0,0,291,291),(38,4,2,'Architecture',0,0,0,0,0,284,284),(39,4,2,'Computer Engineering & Information Technology (CEIT)',0,0,0,0,0,271,271),(40,4,2,'Mechanical Engineering (ME)',0,0,0,0,0,259,259),(41,4,2,'Electronic Engineering (EC)',0,0,0,0,0,252,252),(42,4,2,'Mechatronic Engineering (MC)',0,0,0,0,0,251,251),(43,4,2,'Electrical Power Engineering (EP)',0,0,0,0,0,249,249),(44,4,2,'Chemical Engineering (CHE)',0,0,0,0,0,246,246),(45,4,2,'Petroleum Engineering (PE)',0,0,0,0,0,246,246),(46,5,2,'Civil Engineering',0,0,0,0,0,279,279),(47,5,2,'Architecture',0,0,0,0,0,275,275),(48,5,2,'Computer Engineering & Information Technology (CEIT)',0,0,0,0,0,269,269),(49,5,2,'Electronic Engineering (EC)',0,0,0,0,0,256,256),(50,5,2,'Electrical Power Engineering (EP)',0,0,0,0,0,254,254),(51,5,2,'Mechanical Engineering (ME)',0,0,0,0,0,246,246),(52,5,2,'Mechatronic Engineering (MC)',0,0,0,0,0,240,240),(53,15,4,'Bachelor of Commerce (BCom)',426,0,0,0,0,0,0),(54,15,4,'Bachelor of Business Administration (BBA)',412,0,0,0,0,0,0),(55,15,4,'Bachelor of Accounting (BAct)',410,0,0,0,0,0,0),(56,15,4,'Bachelor of Economics (Statistics)',404,0,0,0,0,0,0),(57,15,4,'Bachelor of Economics (Economics)',402,0,0,0,0,0,0),(58,15,4,'Bachelor of Public Administration (BPA)',394,0,0,0,0,0,0),(59,15,4,'Bachelor of Economics (Development Studies)',391,0,0,0,0,0,0),(60,15,4,'Bachelor of Applied Science (BAS)',389,0,0,0,0,0,0),(61,15,4,'Bachelor of Political Science (BPS)',386,0,0,0,0,0,0),(62,16,4,'Bachelor of Commerce (BCom)',383,0,0,0,0,0,0),(63,16,4,'Bachelor of Business Administration (BBA)',372,0,0,0,0,0,0),(64,16,4,'Bachelor of Accounting (BAct)',370,0,0,0,0,0,0),(65,16,4,'Bachelor of Economics (Statistics)',364,0,0,0,0,0,0),(66,16,4,'Bachelor of Economics (Economics)',360,0,0,0,0,0,0),(67,16,4,'Bachelor of Public Administration (BPA)',356,0,0,0,0,0,0),(68,16,4,'Bachelor of Economics (Development Studies)',352,0,0,0,0,0,0),(69,16,4,'Bachelor of Applied Science (BAS)',351,0,0,0,0,0,0),(70,16,4,'Bachelor of Political Science (BPS)',350,0,0,0,0,0,0),(71,17,4,'Co-operative & Business Degree',301,0,0,0,0,0,0),(72,21,4,'Business Management (BM)',414,0,0,0,0,0,0),(73,21,4,'English for Professional Purpose (EPP)',376,0,0,0,0,0,0),(74,21,4,'Tourism and Hospitality Management (THM)',356,0,0,0,0,0,0),(75,21,4,'Economic and Finance (EF)',351,0,0,0,0,0,0),(76,21,4,'Journalism (JNL)',337,0,0,0,0,0,0),(77,23,10,'Myanmar',340,0,0,0,0,0,0),(78,23,10,'English',372,0,0,0,0,0,0),(79,23,9,'Geography',320,0,0,0,0,0,0),(80,23,9,'Environmental Studies',350,0,0,0,0,0,0),(81,23,9,'Fisheries and Agriculture',320,0,0,0,0,0,0),(82,23,9,'Environmental and Water Studies',320,0,0,0,0,0,0),(83,23,9,'Environmental Science',360,0,0,0,0,0,0),(84,23,8,'History',320,0,0,0,0,0,0),(85,23,8,'Philosophy',320,0,0,0,0,0,0),(86,23,8,'Psychology',320,0,0,0,0,0,0),(87,23,8,'Law',360,0,0,0,0,0,0),(88,23,8,'Oriental Studies',320,0,0,0,0,0,0),(89,23,8,'International Relations',371,0,0,0,0,0,0),(90,23,8,'Political Science',350,0,0,0,0,0,0),(91,23,8,'Anthropology',300,0,0,0,0,0,0),(92,23,8,'Archaeology',320,0,0,0,0,0,0),(93,23,7,'Library and Information studies',300,0,0,0,0,0,0),(94,23,5,'Chemistry',350,0,0,0,0,0,0),(95,23,5,'Biochemistry',360,0,0,0,0,0,0),(96,23,5,'Physics',352,0,0,0,0,0,0),(97,23,5,'Zoology',320,0,0,0,0,0,0),(98,23,5,'Botany',320,0,0,0,0,0,0),(99,23,5,'Marine Science',350,0,0,0,0,0,0),(100,23,5,'Geology',330,0,0,0,0,0,0),(101,23,5,'Industrial Chemistry',360,0,0,0,0,0,0),(102,23,5,'Food Science',350,0,0,0,0,0,0),(103,23,6,'Mathematics',350,0,0,0,0,0,0),(104,23,1,'Computer Science',385,0,0,0,0,0,0),(105,23,2,'Engineering Physics',350,0,0,0,0,0,0),(106,24,1,'Computer Science',345,0,0,0,0,0,0),(107,24,5,'Industrial Chemistry',340,0,0,0,0,0,0),(108,24,5,'Physics',314,0,0,0,0,0,0),(109,24,5,'Nuclear Physics',303,0,0,0,0,0,0),(110,24,5,'Chemistry',299,0,0,0,0,0,0),(111,24,5,'Zoology',275,0,0,0,0,0,0),(112,24,5,'Botany',257,0,0,0,0,0,0),(113,24,5,'Geology',251,0,0,0,0,0,0),(114,24,5,'Biochemistry',250,0,0,0,0,0,0),(115,24,5,'Biotechnology',250,0,0,0,0,0,0),(116,24,5,'Microbiology',240,0,0,0,0,0,0),(117,24,8,'International Relations',340,0,0,0,0,0,0),(118,24,8,'Law (LLB)',330,0,0,0,0,0,0),(119,24,8,'Law (BA)',305,0,0,0,0,0,0),(120,24,8,'Literature',273,0,0,0,0,0,0),(121,24,8,'Psychology',265,0,0,0,0,0,0),(122,24,8,'History',245,0,0,0,0,0,0),(123,24,8,'Philosophy',244,0,0,0,0,0,0),(124,24,8,'Oriental Studies',242,0,0,0,0,0,0),(125,24,8,'Anthropology',240,0,0,0,0,0,0),(126,24,8,'Archaeology',240,0,0,0,0,0,0),(127,24,4,'Business Information Technology',320,0,0,0,0,0,0),(128,24,4,'Economics',315,0,0,0,0,0,0),(129,24,10,'English',310,0,0,0,0,0,0),(130,24,10,'Myanmar Language',280,0,0,0,0,0,0),(131,24,10,'Myanmar Studies',240,0,0,0,0,0,0),(132,24,6,'Mathematics',294,0,0,0,0,0,0),(133,24,9,'Geography',255,0,0,0,0,0,0),(134,14,10,'English',466,0,0,0,0,0,0),(135,14,10,'Japanese (Japan)',442,0,0,0,0,0,0),(136,14,10,'Chinese (China)',437,0,0,0,0,0,0),(137,14,10,'Korean',434,0,0,0,0,0,0),(138,14,10,'English for business purposes',420,0,0,0,0,0,0),(139,14,10,'French (France)',409,0,0,0,0,0,0),(140,14,10,'German',405,0,0,0,0,0,0),(141,14,10,'Russian',402,0,0,0,0,0,0),(142,14,10,'Thai (Thailand)',402,0,0,0,0,0,0),(143,18,7,'Science (BSc)',0,360,392,0,0,0,0),(144,18,7,'Art (BA)',0,340,361,0,0,0,0),(145,18,7,'Arts and Science (BASc)',0,360,395,0,0,0,0),(146,22,8,'National University of Arts and Culture Programs',0,0,0,0,0,0,0),(147,19,11,'Port and Harbour Engineering (PH)',477,0,0,0,0,0,0),(148,19,11,'Nautical Science (NS)',475,0,0,0,0,0,0),(149,19,11,'Marine Engineering (ME)',473,0,0,0,0,0,0),(150,19,11,'Marine Electrical System and Electronics Engineering (MESE)',465,0,0,0,0,0,0),(151,19,11,'Naval Architecture (NA)',465,0,0,0,0,0,0),(152,19,11,'Marine Mechanical (MM)',465,0,0,0,0,0,0),(153,19,11,'River and Coastal Engineering (RC)',465,0,0,0,0,0,0),(154,20,11,'Mercantile Marine Diploma Programs',421,0,0,0,0,0,0);
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `gender` enum('male','female') NOT NULL DEFAULT 'male',
  `myanmar` int DEFAULT '0',
  `english` int DEFAULT '0',
  `mathematics` int DEFAULT '0',
  `physics` int DEFAULT '0',
  `chemistry` int DEFAULT '0',
  `biology` int DEFAULT '0',
  `history` int DEFAULT '0',
  `geography` int DEFAULT '0',
  `economics` int DEFAULT '0',
  `total_marks` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `university_id` int NOT NULL AUTO_INCREMENT,
  `university_name` varchar(255) NOT NULL,
  PRIMARY KEY (`university_id`),
  KEY `idx_universities_name` (`university_name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
INSERT INTO `universities` VALUES (17,'Co-operative University, Thanlyin'),(24,'Dagon University'),(19,'Myanmar Maritime University (MMU)'),(20,'Myanmar Mercantile Marine College (MMMC)'),(21,'National Management Degree College (NMDC)'),(22,'National University of Arts and Culture (NUAC)'),(5,'Technological University, Hmawbi (HBTU)'),(4,'Technological University, Thanlyin (TTU)'),(6,'University of Computer Studies (UCSY)'),(11,'University of Dental Medicine'),(1,'University of Information Technology (UIT)'),(10,'University of Medical Technology'),(7,'University of Medicine 1 (UM1)'),(8,'University of Medicine 2 (UM2)'),(12,'University of Nursing'),(9,'University of Pharmacy (UOPY)'),(13,'University of Public Health'),(26,'University of Traditional Medicine, Mandalay'),(25,'University of Veterinary Science, Yezin'),(23,'University of Yangon'),(3,'West Yangon Technological University (WYTU)'),(2,'Yangon Technological University (YTU)'),(15,'Yangon University of Economics (Hlaing)'),(16,'Yangon University of Economics (Ywar Thar Gyi)'),(18,'Yangon University of Education (YUOE)'),(14,'Yangon University of Foreign Languages (YUFL)');
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_program_details`
--

DROP TABLE IF EXISTS `v_program_details`;
/*!50001 DROP VIEW IF EXISTS `v_program_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_program_details` AS SELECT 
 1 AS `program_id`,
 1 AS `university_name`,
 1 AS `field_name`,
 1 AS `program_name`,
 1 AS `min_score`,
 1 AS `min_score_male`,
 1 AS `min_score_female`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'university_recommendation'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetUniversityRecommendations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUniversityRecommendations`(
    IN p_student_score INT,
    IN p_gender VARCHAR(10),       -- 'Male', 'Female' သို့မဟုတ် 'Any'
    IN p_field_name VARCHAR(100)    -- 'Marine', 'Languages', 'Education' သို့မဟုတ် 'ALL'
)
BEGIN
    SELECT 
        u.university_name,
        f.field_name,
        p.program_name,
        -- သက်ဆိုင်ရာ ဖြတ်မှတ်ကို ဖော်ပြပေးရန်
        CASE 
            WHEN LOWER(p_gender) = 'male' AND p.min_score_male > 0 THEN p.min_score_male
            WHEN LOWER(p_gender) = 'female' AND p.min_score_female > 0 THEN p.min_score_female
            ELSE p.min_score
        END AS required_cutoff_score
    FROM programs p
    JOIN universities u ON p.university_id = u.university_id
    JOIN fields f ON p.field_id = f.field_id
    WHERE 
        -- ၁။ Field Filter စစ်ဆေးခြင်း ('ALL' သို့မဟုတ် NULL ဖြစ်ပါက Field အားလုံးပြမည်)
        (p_field_name IS NULL OR p_field_name = 'ALL' OR f.field_name = p_field_name)
        
        -- ၂။ Score နှင့် Gender Condition စစ်ဆေးခြင်း
        AND (
            -- Case A: အမှတ် မကန့်သတ်ထားသော ကျောင်းများ (min_score = 0)
            (p.min_score = 0 AND (p.min_score_male IS NULL OR p.min_score_male = 0) AND (p.min_score_female IS NULL OR p.min_score_female = 0))
            
            -- Case B: သာမန် Cutoff Score ရှိပြီး ရမှတ်မီသော ကျောင်းများ
            OR (p.min_score > 0 AND p_student_score >= p.min_score)
            
            -- Case C: ကျား/မ အလိုက် ဖြတ်မှတ်ကွဲပြားပြီး ရမှတ်မီသော ကျောင်းများ
            OR (LOWER(p_gender) = 'male' AND p.min_score_male > 0 AND p_student_score >= p.min_score_male)
            OR (LOWER(p_gender) = 'female' AND p.min_score_female > 0 AND p_student_score >= p.min_score_female)
        )
    ORDER BY required_cutoff_score DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_program_details`
--

/*!50001 DROP VIEW IF EXISTS `v_program_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_program_details` AS select `p`.`program_id` AS `program_id`,`u`.`university_name` AS `university_name`,`f`.`field_name` AS `field_name`,`p`.`program_name` AS `program_name`,`p`.`min_score` AS `min_score`,`p`.`min_score_male` AS `min_score_male`,`p`.`min_score_female` AS `min_score_female` from ((`programs` `p` join `universities` `u` on((`p`.`university_id` = `u`.`university_id`))) join `fields` `f` on((`p`.`field_id` = `f`.`field_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-22 22:16:10
