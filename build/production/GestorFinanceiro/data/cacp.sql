CREATE DATABASE  IF NOT EXISTS `cacp_gestor` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cacp_gestor`;
-- MySQL dump 10.13  Distrib 5.5.43, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cacp_gestor
-- ------------------------------------------------------
-- Server version	5.5.43-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(45) DEFAULT NULL,
  `nome_fantasia` varchar(45) DEFAULT NULL,
  `cnpj` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `plano_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'CACP','CACP CONTABILIDADE','00.000.000/0001-00','abc, defhijklm nopq 00','(98) 99999-2222',1),(2,'VAH','Vinicius Aguiar Hacebe','11.111.111/0001-11','123, 4356789 0123 00','(98) 98888-6666',1),(3,'PHN','PHN  Imobiliaria','22.222.222/0001-00','321, abclaosdk 11','(98) 00000-0000',5);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorecidos`
--

DROP TABLE IF EXISTS `favorecidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorecidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `sistema` varchar(45) DEFAULT NULL,
  `contabil` varchar(45) DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  `empresa_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorecidos`
--

LOCK TABLES `favorecidos` WRITE;
/*!40000 ALTER TABLE `favorecidos` DISABLE KEYS */;
INSERT INTO `favorecidos` VALUES (10,'Potiguar Comercial Ltda.','777777','666666','F','1'),(11,'Apto. 1102 Mario Jose Luis','999999','999999','C','1');
/*!40000 ALTER TABLE `favorecidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lancamentos`
--

DROP TABLE IF EXISTS `lancamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lancamentos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  `tipo_doc` varchar(20) DEFAULT NULL,
  `n_lanc` int(11) DEFAULT NULL,
  `n_doc` varchar(45) DEFAULT NULL,
  `ref` varchar(6) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `natureza_financeira` varchar(14) DEFAULT NULL,
  `fonte_financeira` int(11) DEFAULT NULL,
  `valor_doc` double DEFAULT NULL,
  `valor_juros` double DEFAULT NULL,
  `valor_multa` double DEFAULT NULL,
  `valor_desconto` double DEFAULT NULL,
  `valor_total` double DEFAULT NULL,
  `contacontabil` int(11) DEFAULT NULL,
  `favorecido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lancamentos`
--

LOCK TABLES `lancamentos` WRITE;
/*!40000 ALTER TABLE `lancamentos` DISABLE KEYS */;
INSERT INTO `lancamentos` VALUES (1,1,'2013-03-27','P','Outro Doc',14,'sdasd','032003','extrato','11299003',2,3.4,0,0,0,3.4,NULL,1),(2,1,'2013-03-27','P','DOC 123',12,'ccds','032013','extr','11299001',2,8.5,NULL,NULL,NULL,8.5,NULL,1);
/*!40000 ALTER TABLE `lancamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plano_contas`
--

DROP TABLE IF EXISTS `plano_contas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plano_contas` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `tipo_id` int(11) DEFAULT NULL,
  `mask` varchar(200) DEFAULT NULL,
  `cod` bigint(11) DEFAULT NULL,
  `parent` bigint(11) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  `natureza` char(1) DEFAULT NULL,
  `contacontabil` varchar(45) DEFAULT NULL,
  `inativo` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plano_contas`
--

LOCK TABLES `plano_contas` WRITE;
/*!40000 ALTER TABLE `plano_contas` DISABLE KEYS */;
INSERT INTO `plano_contas` VALUES (1,1,'1',1,NULL,'PLANO FLUXO DE CAIXA','T',NULL,' ',''),(2,1,'1.1',11,1,'ATIVIDADES OPERACIONAIS','T',NULL,' ',''),(3,1,'1.1.1',111,11,'RECEBIMENTOS','T','','',''),(4,1,'1.1.1.01',11101,111,'RECEITAS','T','','',''),(5,1,'1.1.1.01.001',11101001,11101,'Cotas Condominio','A','R','99999',''),(7,1,'1.1.1.01.002',11101002,11101,'Aluguel de EspaÃ§o','A','R','99999',''),(8,1,'1.1.1.01.003',11101003,11101,'Caixa Filial 1','A','R','99999',''),(9,1,'1.1.1.01.004',11101004,11101,'Caixa Pequeno - Filial','A','R','99999',NULL),(10,1,'1.1.1.01.005',11101005,11101,'Valores em Transitos para Analise','A','R','99999',''),(11,1,'1.1.1.02',11102,111,'BANCOS - CONTAS CORRENTES','T',NULL,NULL,''),(12,1,'2',2,NULL,'PASSIVO','T',NULL,NULL,NULL),(13,1,'2.1',21,2,'PASSIVO CIRCULANTE','T',NULL,'',''),(14,2,'1',1,NULL,'ATIVO','T',NULL,NULL,NULL),(15,2,'2',2,NULL,'PASSIVO','T',NULL,NULL,NULL),(16,2,'1.1',11,1,'TESTE','T','','',''),(17,1,'1.1.1.01.006',11101006,11101,'Valores','A','P','11111',''),(18,1,'1.1.2',112,11,'PAGAMENTOS','T',NULL,' ',''),(19,1,'1.1.2.00.1',112001,112,'BBBBB','T','','','on'),(20,1,'1.1.1.02.001',11102001,11102,'ABCDE','A','M','11111',''),(21,1,'1.1.1.02.002',11102002,11102,'Conta Corrente','A','M','11111',''),(22,1,'1.1.1.02.003',11102003,11102,'Conta PoupanÃ§a','A','M','112311','');
/*!40000 ALTER TABLE `plano_contas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socios`
--

DROP TABLE IF EXISTS `socios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `rg` varchar(45) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `participacao` double DEFAULT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `apelido` varchar(45) DEFAULT NULL,
  `contacontabil` varchar(45) DEFAULT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socios`
--

LOCK TABLES `socios` WRITE;
/*!40000 ALTER TABLE `socios` DISABLE KEYS */;
INSERT INTO `socios` VALUES (1,'Antonio Pereira Brandao','1029361111','012.221.212-11',70,'1965-09-24','BrandÃ£o','99999',1),(2,'Vinicius Aguiar Hacebe','020201532002-8','027.633.143-50',50,'1989-03-20','Vinicius','222222',2),(3,'Vanda Dutra de Aguiar','928109238098','115.212.978-44',30,'1967-06-10','Vanda','333333',1),(4,'Rodrigo Henrique Aguiar','98783940901','000.000.000-00',50,'1997-01-06','Rodrigo','444444',2);
/*!40000 ALTER TABLE `socios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tesouraria`
--

DROP TABLE IF EXISTS `tesouraria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tesouraria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `conta` varchar(45) DEFAULT NULL,
  `saldoinicial` varchar(45) DEFAULT NULL,
  `sistema` varchar(45) DEFAULT NULL,
  `contabil` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tesouraria`
--

LOCK TABLES `tesouraria` WRITE;
/*!40000 ALTER TABLE `tesouraria` DISABLE KEYS */;
INSERT INTO `tesouraria` VALUES (2,1,'Banco do Brasil','66778-98','5000','444444','88888'),(3,1,'Banco Bradesco','66778-98','5000','333333','22222'),(4,0,'aaa','0101010','600','111111','222222');
/*!40000 ALTER TABLE `tesouraria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_plano`
--

DROP TABLE IF EXISTS `tipos_plano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_plano`
--

LOCK TABLES `tipos_plano` WRITE;
/*!40000 ALTER TABLE `tipos_plano` DISABLE KEYS */;
INSERT INTO `tipos_plano` VALUES (1,'Comercio Mercadorias e Servicos'),(2,'Condominio de Predio'),(3,'Entidades Isentas e Imunes'),(4,'Igrejas'),(5,'Imobiliaria'),(6,'Cooperativa');
/*!40000 ALTER TABLE `tipos_plano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_empresa`
--

DROP TABLE IF EXISTS `usuario_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_empresa`
--

LOCK TABLES `usuario_empresa` WRITE;
/*!40000 ALTER TABLE `usuario_empresa` DISABLE KEYS */;
INSERT INTO `usuario_empresa` VALUES (2,2,1),(51,2,2),(56,3,1),(57,3,3),(59,1,1),(61,1,3),(65,1,2),(66,1,3),(67,1,4),(68,1,2),(69,1,4),(70,3,5);
/*!40000 ALTER TABLE `usuario_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(32) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(32) DEFAULT NULL,
  `ativo` int(11) DEFAULT NULL,
  `ultimo_acesso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'01662f80bb8a4bd7b00152aeae9f8749','hacebe','Vinicius Hacebe','hacebe@outlook.com','4badaee57fed5610012a296273158f5f',1,1433178980),(2,'36096b2e9a2fa863542041bc90a139bb','rodrigorhas','Rodrigo Henrique','rodrigorhas@gmail.com','202cb962ac59075b964b07152d234b70',1,1433180975),(3,'da1737ac9393e24b7d4c8f7e83ded7a6','brandao','Brand&atilde;o','diretoria@cacpcontabilidade.com','d10d0962918191d423a4d2784316b4a5',1,1433180975),(4,'e054997123aaa0c565bb3f5228bb1672','alan','Alan Dutra Aguiar','alandutrawd@hotmail.com','0b9eaa1b5d9081b3d76b16a0b8439e8a',1,NULL),(5,'553dc9d22e43034c013f5e3e4298128b','natasha','Natasha BrandÃ£o','natasha@hotmail.com','827ccb0eea8a706c4c34a16891f84e7b',1,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cacp_gestor'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-26 14:48:06
