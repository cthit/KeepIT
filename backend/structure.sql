-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Värd: db
-- Tid vid skapande: 13 maj 2018 kl 21:29
-- Serverversion: 10.2.13-MariaDB-10.2.13+maria~jessie
-- PHP-version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `keepit`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `pdps`
--

CREATE TABLE `pdps` (
  `id` int(11) NOT NULL,
  `committee` varchar(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för vy `pdp_latest`
-- (See below for the actual view)
--
-- CREATE TABLE `pdp_latest` (
-- );

-- --------------------------------------------------------

--
-- Tabellstruktur `pdp_versions`
--

CREATE TABLE `pdp_versions` (
  `pdp_id` int(11) NOT NULL,
  `version_id` int(11) NOT NULL DEFAULT 0,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `sensitive` tinyint(1) NOT NULL,
  `target_group` enum('Everyone','All section members','Fkit members','Committee members') NOT NULL,
  `last_changed` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Trigger `pdp_versions`
--
DELIMITER $$
CREATE TRIGGER `version_id` BEFORE INSERT ON `pdp_versions` FOR EACH ROW BEGIN
	DECLARE max_id INT(11);
    SELECT version_id FROM `pdp_versions` WHERE `pdp_id` = NEW.pdp_id INTO max_id;
    SET NEW.version_id = IF(ISNULL(max_id), 0, max_id + 1);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur för vy `pdp_latest`
--
-- DROP TABLE IF EXISTS `pdp_latest`;
-- Error reading structure for table keepit.pdp_latest: #1046 - Ingen databas i användning

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `pdps`
--
ALTER TABLE `pdps`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `pdp_versions`
--
ALTER TABLE `pdp_versions`
  ADD PRIMARY KEY (`pdp_id`,`version_id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `pdps`
--
ALTER TABLE `pdps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
