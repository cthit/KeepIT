-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Värd: db
-- Tid vid skapande: 11 okt 2018 kl 13:44
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
  `pdp_id` int(11) NOT NULL,
  `committee` varchar(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur `pdp_versions`
--

CREATE TABLE `pdp_versions` (
  `pdp_id` int(11) NOT NULL,
  `version_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `eula` text NOT NULL,
  `target_group` enum('Everyone','All section members','Fkit members','Committee members') NOT NULL,
  `sensitive` tinyint(1) NOT NULL,
  `start` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_changed` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Trigger `pdp_versions`
--
DELIMITER $$
CREATE TRIGGER `version_id` BEFORE INSERT ON `pdp_versions` FOR EACH ROW BEGIN
	DECLARE max_id INT(11);
    SELECT MAX(version_id) FROM `pdp_versions` WHERE `pdp_id` = NEW.pdp_id INTO max_id;
    SET NEW.version_id = IF(ISNULL(max_id), 0, max_id + 1);
END
$$
DELIMITER ;

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `pdps`
--
ALTER TABLE `pdps`
  ADD PRIMARY KEY (`pdp_id`);

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
  MODIFY `pdp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
