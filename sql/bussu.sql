-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2022 at 11:21 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bussu`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaign_user_clicks`
--

CREATE TABLE `campaign_user_clicks` (
  `ip` text DEFAULT NULL,
  `ts` text DEFAULT NULL,
  `id` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `conversion_tracking`
--

CREATE TABLE `conversion_tracking` (
  `id` int(11) NOT NULL,
  `tracking_id` varchar(10000) NOT NULL,
  `time` datetime NOT NULL,
  `conversion` varchar(10000) NOT NULL,
  `partner` varchar(10000) NOT NULL,
  `msisdn` varchar(32) DEFAULT NULL,
  `ip` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `conversion_tracking`
--

INSERT INTO `conversion_tracking` (`id`, `tracking_id`, `time`, `conversion`, `partner`, `msisdn`, `ip`) VALUES
(1, '29272', '2022-04-12 10:12:14', 'no', 'witskies', '923020534531', ''),
(2, '03872', '2022-04-12 10:20:45', 'no', 'traffic', '923020534531', ''),
(3, '4593', '2022-04-12 10:28:56', 'no', 'traffic', '923020534531', ''),
(4, '202928', '2022-04-12 10:31:29', 'no', 'traffic', '923020534531', ''),
(5, '349283', '2022-04-12 21:49:01', 'yes', 'traffic', '923052201527', ''),
(6, '3937hdb47', '2022-04-15 10:45:17', 'no', 'traffic', '923020534531', ''),
(7, 'kj2n', '2022-04-28 12:21:08', 'no', 'witskies', '923020534531', ''),
(8, '3d4', '2022-04-29 11:19:53', 'no', 'traffic', '923020534531', ''),
(9, '392j2h3', '2022-05-09 11:17:31', 'no', 'traffic', '923020534531', ''),
(10, '892n22', '2022-05-09 11:24:58', 'no', 'witskies', '923020534531', ''),
(11, '202j3d4', '2022-05-10 12:15:51', 'no', 'soyid', '923020534531', ''),
(12, '3k3j22k2', '2022-05-10 14:45:22', 'no', 'traffic', '923020534531', ''),
(13, 'k2j3u22', '2022-05-17 15:04:28', 'no', 'witskies', '923020534531', ''),
(14, 's02k2ke2', '2022-05-18 13:01:48', 'no', 'witksie', '923020534531', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `msisdn` bigint(20) NOT NULL,
  `ip` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `msisdn`, `ip`, `timestamp`) VALUES
(487864, 'sentOTP', 923020534531, 'null', '2022-05-10 12:14:54'),
(487865, 'invalidOTP', 923020534531, 'null', '2022-05-10 12:15:48'),
(487866, 'sentOTP', 923020534531, 'null', '2022-05-10 12:15:48'),
(487867, 'verifiedOTP', 923020534531, 'null', '2022-05-10 12:15:50'),
(487868, 'unsubUser', 923020534531, 'null', '2022-05-10 12:28:41'),
(487869, 'sentOTP', 923020534531, 'null', '2022-05-10 14:45:13'),
(487870, 'invalidOTP', 923020534531, 'null', '2022-05-10 14:45:17'),
(487871, 'sentOTP', 923020534531, 'null', '2022-05-10 14:45:18'),
(487872, 'verifiedOTP', 923020534531, 'null', '2022-05-10 14:45:21'),
(487873, 'resubUser', 923020534531, 'null', '2022-05-10 14:46:03'),
(487874, 'resubUser', 923020534531, 'null', '2022-05-10 14:46:03'),
(487875, 'sentOTP', 923020534531, '::1', '2022-05-17 15:03:07'),
(487876, 'invalidOTP', 923020534531, '::1', '2022-05-17 15:03:12'),
(487877, 'sentOTP', 923020534531, '::1', '2022-05-17 15:03:13'),
(487878, 'sentOTP', 923020534531, '::1', '2022-05-17 15:04:15'),
(487879, 'verifiedOTP', 923020534531, '::1', '2022-05-17 15:04:27'),
(487880, 'sentOTP', 923020534531, '::1', '2022-05-18 12:59:06'),
(487881, 'verifiedOTP', 923020534531, '::1', '2022-05-18 12:59:14'),
(487882, 'verifiedOTP', 923020534531, '::1', '2022-05-18 12:59:17'),
(487883, 'sentOTP', 923020534531, '::1', '2022-05-18 13:01:41'),
(487884, 'verifiedOTP', 923020534531, '::1', '2022-05-18 13:01:47'),
(487885, 'sentOTP', 923020534531, '::1', '2022-05-18 16:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `marketing_partners`
--

CREATE TABLE `marketing_partners` (
  `id` int(11) NOT NULL,
  `param_name` text NOT NULL,
  `callback_url` text NOT NULL,
  `conversion_rate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `msisdn` bigint(20) NOT NULL,
  `pin` int(11) NOT NULL,
  `expiry` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `msisdn`, `pin`, `expiry`) VALUES
(1333866, 923020534531, 5196, '2022-05-09 11:19:15'),
(1333867, 923020534531, 2226, '2022-05-09 11:19:26'),
(1333868, 923020534531, 9692, '2022-05-09 11:26:46'),
(1333869, 923020534531, 4540, '2022-05-09 11:26:55'),
(1333870, 923020534531, 5761, '2022-05-10 12:16:54'),
(1333871, 923020534531, 2372, '2022-05-10 12:17:48'),
(1333872, 923020534531, 3446, '2022-05-10 14:47:13'),
(1333873, 923020534531, 4366, '2022-05-10 14:47:18'),
(1333874, 923020534531, 9734, '2022-05-17 15:05:07'),
(1333875, 923020534531, 9221, '2022-05-17 15:05:13'),
(1333876, 923020534531, 5049, '2022-05-17 15:06:15'),
(1333877, 923020534531, 5422, '2022-05-18 13:01:06'),
(1333878, 923020534531, 6448, '2022-05-18 13:03:41'),
(1333879, 923020534531, 4033, '2022-05-18 16:32:58');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `msisdn` varchar(1000) DEFAULT NULL,
  `user` varchar(1000) DEFAULT NULL,
  `password` varchar(10000) DEFAULT NULL,
  `subscription_date` datetime NOT NULL DEFAULT current_timestamp(),
  `subscription_method` varchar(1000) DEFAULT NULL,
  `subscriber_type` varchar(1000) DEFAULT NULL,
  `network_type` varchar(1000) DEFAULT NULL,
  `last_billed_date` datetime NOT NULL DEFAULT '1970-01-02 00:00:00',
  `status` varchar(1000) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `msisdn`, `user`, `password`, `subscription_date`, `subscription_method`, `subscriber_type`, `network_type`, `last_billed_date`, `status`) VALUES
(1464, '923052201527', '923052201527', 'ITxeJDYN', '2022-04-12 21:49:01', NULL, 'daily', '1', '1970-01-02 00:00:00', '0'),
(1465, '923020534531', '923020534531', '9hKeJ7ZU', '2022-04-13 13:51:06', NULL, 'daily', '1', '1970-01-02 00:00:00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `whitelisted_users`
--

CREATE TABLE `whitelisted_users` (
  `msisdn` bigint(20) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversion_tracking`
--
ALTER TABLE `conversion_tracking`
  ADD UNIQUE KEY `hash` (`id`) USING BTREE;

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `marketing_partners`
--
ALTER TABLE `marketing_partners`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `msisdn` (`msisdn`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `msisdn` (`msisdn`(768));

--
-- Indexes for table `whitelisted_users`
--
ALTER TABLE `whitelisted_users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `msisdn` (`msisdn`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversion_tracking`
--
ALTER TABLE `conversion_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487886;

--
-- AUTO_INCREMENT for table `marketing_partners`
--
ALTER TABLE `marketing_partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1333880;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1467;

--
-- AUTO_INCREMENT for table `whitelisted_users`
--
ALTER TABLE `whitelisted_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
