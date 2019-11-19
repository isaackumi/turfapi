-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2019 at 12:39 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9
drop schema if exists MGN2019;
create schema MGN2019;
use MGN2019;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mgn2019`
--

-- --------------------------------------------------------


--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Username` varchar(30),
  `Phone Number` int(10),
  `Password` varchar(30) NOT NULL,
  `Email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `BookingNo.` int(10),
  `Time Period` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `School Name` varchar(40) NOT NULL,
  `SchoolId` int(10),
  `Location` varchar(40) NOT NULL,
  `Contact` int(20) NOT NULL,
  `No of Facilities` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------


--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `Facility No.` int(10),
  `Facility Name` varchar(30) NOT NULL,
  `Facility Description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Phone Number`);
  
--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`BookingNo.`);
  
--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`SchoolId`);
  
--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`Facility No.`);


--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `Phone Number` FOREIGN KEY (`BookingNo.`) REFERENCES `user` (`Phone Number`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `BookingNo` FOREIGN KEY (`SchoolId`) REFERENCES `bookings` (`BookingNo.`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

--
-- Constraints for table `facilities`
--
ALTER TABLE `facilities`
  ADD CONSTRAINT `facilities_ibfk_1` FOREIGN KEY (`Facility No.`) REFERENCES `school` (`SchoolId`) ON DELETE NO ACTION ON UPDATE NO ACTION;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

