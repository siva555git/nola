-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 23, 2020 at 09:36 AM
-- Server version: 10.3.9-MariaDB
-- PHP Version: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nola_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cabs`
--

DROP TABLE IF EXISTS `cabs`;
CREATE TABLE IF NOT EXISTS `cabs` (
  `cab_id` int(11) NOT NULL AUTO_INCREMENT,
  `number_plate` varchar(50) NOT NULL,
  `lat` varchar(60) NOT NULL,
  `longitude` varchar(60) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cab_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ride_history`
--

DROP TABLE IF EXISTS `ride_history`;
CREATE TABLE IF NOT EXISTS `ride_history` (
  `ride_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `cab_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_place` varchar(60) NOT NULL,
  `to_place` varchar(60) NOT NULL,
  `status` enum('In progress','Completed','Cancelled') NOT NULL,
  PRIMARY KEY (`ride_history_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lat` varchar(60) NOT NULL,
  `longitude` varchar(60) NOT NULL,
  `in_ride` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
