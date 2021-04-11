-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 10, 2021 at 11:38 PM
-- Server version: 5.7.33
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `michealo_COMP4537TermProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `Name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`Name`) VALUES
('Kelowna'),
('Kyoto'),
('Vancouver');

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `ID` int(10) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `ImagePath` varchar(500) NOT NULL,
  `LocationName` varchar(50) NOT NULL,
  `Message` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`ID`, `Username`, `ImagePath`, `LocationName`, `Message`) VALUES
(4, 'micheal', '/images/spiderman-mask.jpg', 'Vancouver', 'With Great Power Comes Great Responsibility'),
(6, 'micheal', '/images/spiderman-compression-leggings-pants.jpg', 'Kelowna', 'Thats a cute outfit, your husband buy it for you?'),
(7, 'micheal', '/images/hotdog.jpeg', 'Kyoto', 'UHHH OH HOOT DOG!!!');

-- --------------------------------------------------------

--
-- Table structure for table `Statistics`
--

CREATE TABLE `Statistics` (
  `ID` int(10) NOT NULL,
  `Method` varchar(10) NOT NULL,
  `Endpoint` varchar(50) NOT NULL,
  `Requests` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Statistics`
--

INSERT INTO `Statistics` (`ID`, `Method`, `Endpoint`, `Requests`) VALUES
(1, 'GET', '/4537/termproject/API/V1/location', 27),
(2, 'POST', '/4537/termproject/API/V1/location', 4),
(3, 'POST', '/4537/termproject/API/V1/post', 7),
(4, 'GET', '/4537/termproject/API/V1/user/:id', 16),
(5, 'PUT', '/4537/termproject/API/V1/post', 1),
(6, 'PUT', '/4537/termproject/API/V1/user:id', 2),
(7, 'GET', '/4537/termproject/API/V1/post', 10),
(8, 'DELETE', '/4537/termproject/API/V1/location', 1),
(9, 'GET', '/4537/termproject/API/V1/stats', 8),
(10, 'POST', '/4537/termproject/API/V1/stats', 3),
(11, 'GET', '/4537/termproject/API/V1/posts/:username', 5),
(12, 'DELETE', '/4537/termproject/API/V1/post/:id', 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `ID` int(10) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DateJoined` bigint(20) NOT NULL,
  `Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`ID`, `Username`, `Password`, `DateJoined`, `Admin`) VALUES
(1, 'admin', '$2b$10$a5OKHGN5xdB9flU1IEsFLek0sIJu0zlTZe6r9Ljxea.1EFwWw56qa', 1618097570574, 1),
(3, 'member', '$2b$10$Tb0H33dLaFkAPLEMzZ8CFuYKons8RmIvgY//4SigltKM2ckUa3amm', 1618097732116, 0),
(4, 'micheal', '$2b$10$wexwtcK93Z3oqL4zEsDMkO./ik/9NQHyDcVh0yNECO7MIbklm/F9y', 1618110673500, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`Name`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Statistics`
--
ALTER TABLE `Statistics`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Statistics`
--
ALTER TABLE `Statistics`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
