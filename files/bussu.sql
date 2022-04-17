-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2022 at 07:43 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
  `ip` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `ts` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `conversion_tracking`
--

CREATE TABLE `conversion_tracking` (
  `id` int NOT NULL,
  `tracking_id` varchar(10000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `time` datetime NOT NULL,
  `conversion` varchar(10000) NOT NULL,
  `partner` varchar(10000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `msisdn` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `conversion_tracking`
--

INSERT INTO `conversion_tracking` (`id`, `tracking_id`, `time`, `conversion`, `partner`, `msisdn`) VALUES
(1, '29272', '2022-04-12 10:12:14', 'no', 'witskies', '923020534531'),
(2, '03872', '2022-04-12 10:20:45', 'no', 'traffic', '923020534531'),
(3, '4593', '2022-04-12 10:28:56', 'no', 'traffic', '923020534531'),
(4, '202928', '2022-04-12 10:31:29', 'no', 'traffic', '923020534531'),
(5, '349283', '2022-04-12 21:49:01', 'yes', 'traffic', '923052201527'),
(6, '6ehekei2hs', '2022-04-17 19:32:48', 'no', 'witskies', '923020534531'),
(7, '39wn2p', '2022-04-17 19:35:09', 'no', 'traffic', '923020534531');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `msisdn` bigint NOT NULL,
  `ip` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `msisdn`, `ip`, `timestamp`) VALUES
(487713, 'sentOTP', 923020534531, '172.31.1.62', '2022-04-12 10:05:26'),
(487714, 'verifiedOTP', 923020534531, '172.31.1.62', '2022-04-12 10:07:06'),
(487715, 'sentOTP', 923020534531, '172.31.1.62', '2022-04-12 10:10:11'),
(487716, 'invalidOTP', 923020534531, '172.31.1.62', '2022-04-12 10:10:31'),
(487717, 'sentOTP', 923020534531, '172.31.1.62', '2022-04-12 10:11:59'),
(487718, 'verifiedOTP', 923020534531, '172.31.1.62', '2022-04-12 10:12:13'),
(487719, 'sentOTP', 923020534531, '172.31.1.62', '2022-04-12 10:15:35'),
(487720, 'invalidOTP', 923020534531, '172.31.1.62', '2022-04-12 10:15:56'),
(487721, 'sentOTP', 923020534531, 'function(name, family) {\n  var interfaces = os.networkInterfaces();\n  var all;\n\n  //\n  // Default to `ipv4`\n  //\n  family = _normalizeFamily(family);\n\n  //\n  // If a specific network interface has been named,\n  // return the address.\n  //\n  if (name && name !== \'private\' && name !== \'public\') {\n    var res = interfaces[name].filter(function(details) {\n      var itemFamily = details.family.toLowerCase();\n      return itemFamily === family;\n    });\n    if (res.length === 0)\n      return undefined;\n    return res[0].address;\n  }\n\n  var all = Object.keys(interfaces).map(function (nic) {\n    //\n    // Note: name will only be `public` or `private`\n    // when this is called.\n    //\n    var addresses = interfaces[nic].filter(function (details) {\n      details.family = details.family.toLowerCase();\n      if (details.family !== family || ip.isLoopback(details.address)) {\n        return false;\n      } else if (!name) {\n        return true;\n      }\n\n      return name === \'public\' ? ip.isPrivate(details.address) :\n          ip.isPublic(details.address);\n    });\n\n    return addresses.length ? addresses[0].address : undefined;\n  }).filter(Boolean);\n\n  return !all.length ? ip.loopback(family) : all[0];\n}', '2022-04-12 10:20:19'),
(487722, 'invalidOTP', 923020534531, 'function(name, family) {\n  var interfaces = os.networkInterfaces();\n  var all;\n\n  //\n  // Default to `ipv4`\n  //\n  family = _normalizeFamily(family);\n\n  //\n  // If a specific network interface has been named,\n  // return the address.\n  //\n  if (name && name !== \'private\' && name !== \'public\') {\n    var res = interfaces[name].filter(function(details) {\n      var itemFamily = details.family.toLowerCase();\n      return itemFamily === family;\n    });\n    if (res.length === 0)\n      return undefined;\n    return res[0].address;\n  }\n\n  var all = Object.keys(interfaces).map(function (nic) {\n    //\n    // Note: name will only be `public` or `private`\n    // when this is called.\n    //\n    var addresses = interfaces[nic].filter(function (details) {\n      details.family = details.family.toLowerCase();\n      if (details.family !== family || ip.isLoopback(details.address)) {\n        return false;\n      } else if (!name) {\n        return true;\n      }\n\n      return name === \'public\' ? ip.isPrivate(details.address) :\n          ip.isPublic(details.address);\n    });\n\n    return addresses.length ? addresses[0].address : undefined;\n  }).filter(Boolean);\n\n  return !all.length ? ip.loopback(family) : all[0];\n}', '2022-04-12 10:20:31'),
(487723, 'sentOTP', 923020534531, 'undefined', '2022-04-12 10:20:32'),
(487724, 'verifiedOTP', 923020534531, 'undefined', '2022-04-12 10:20:45'),
(487725, 'unsubUser', 923020534531, 'function(name, family) {\n  var interfaces = os.networkInterfaces();\n  var all;\n\n  //\n  // Default to `ipv4`\n  //\n  family = _normalizeFamily(family);\n\n  //\n  // If a specific network interface has been named,\n  // return the address.\n  //\n  if (name && name !== \'private\' && name !== \'public\') {\n    var res = interfaces[name].filter(function(details) {\n      var itemFamily = details.family.toLowerCase();\n      return itemFamily === family;\n    });\n    if (res.length === 0)\n      return undefined;\n    return res[0].address;\n  }\n\n  var all = Object.keys(interfaces).map(function (nic) {\n    //\n    // Note: name will only be `public` or `private`\n    // when this is called.\n    //\n    var addresses = interfaces[nic].filter(function (details) {\n      details.family = details.family.toLowerCase();\n      if (details.family !== family || ip.isLoopback(details.address)) {\n        return false;\n      } else if (!name) {\n        return true;\n      }\n\n      return name === \'public\' ? ip.isPrivate(details.address) :\n          ip.isPublic(details.address);\n    });\n\n    return addresses.length ? addresses[0].address : undefined;\n  }).filter(Boolean);\n\n  return !all.length ? ip.loopback(family) : all[0];\n}', '2022-04-12 10:22:54'),
(487726, 'sentOTP', 923020534531, 'null', '2022-04-12 10:28:34'),
(487727, 'invalidOTP', 923020534531, 'null', '2022-04-12 10:28:46'),
(487728, 'sentOTP', 923020534531, 'null', '2022-04-12 10:28:46'),
(487729, 'verifiedOTP', 923020534531, 'null', '2022-04-12 10:28:56'),
(487730, 'resubUser', 923020534531, 'null', '2022-04-12 10:29:01'),
(487731, 'unsubUser', 923020534531, 'null', '2022-04-12 10:30:12'),
(487732, 'sentOTP', 923020534531, 'null', '2022-04-12 10:31:05'),
(487733, 'invalidOTP', 923020534531, 'null', '2022-04-12 10:31:18'),
(487734, 'sentOTP', 923020534531, 'null', '2022-04-12 10:31:19'),
(487735, 'verifiedOTP', 923020534531, 'null', '2022-04-12 10:31:28'),
(487736, 'resubUser', 923020534531, 'null', '2022-04-12 10:31:33'),
(487737, 'unsubUser', 923098628521, 'null', '2022-04-12 15:07:40'),
(487738, 'sentOTP', 923098628521, 'null', '2022-04-12 15:07:49'),
(487739, 'invalidOTP', 923098628521, 'null', '2022-04-12 15:08:17'),
(487740, 'sentOTP', 923098628521, 'null', '2022-04-12 15:08:18'),
(487741, 'verifiedOTP', 923098628521, 'null', '2022-04-12 15:08:55'),
(487742, 'resubUser', 923098628521, 'null', '2022-04-12 15:09:01'),
(487743, 'unsubUser', 923020534531, 'null', '2022-04-12 15:10:16'),
(487744, 'sentOTP', 923020534531, 'null', '2022-04-12 15:10:37'),
(487745, 'verifiedOTP', 923020534531, 'null', '2022-04-12 15:10:49'),
(487746, 'resubUser', 923020534531, 'null', '2022-04-12 15:10:54'),
(487747, 'unsubUser', 923020534531, 'null', '2022-04-12 15:11:42'),
(487748, 'sentOTP', 923020534531, 'null', '2022-04-12 15:12:04'),
(487749, 'verifiedOTP', 923020534531, 'null', '2022-04-12 15:13:00'),
(487750, 'resubUser', 923020534531, 'null', '2022-04-12 15:13:07'),
(487751, 'sentOTP', 923052201527, 'null', '2022-04-12 21:48:51'),
(487752, 'verifiedOTP', 923052201527, 'null', '2022-04-12 21:49:00'),
(487753, 'unsubUser', 923052201527, 'null', '2022-04-12 21:51:22'),
(487754, 'sentOTP', 923020534531, 'null', '2022-04-13 12:33:34'),
(487755, 'invalidOTP', 923020534531, 'null', '2022-04-13 12:33:55'),
(487756, 'sentOTP', 923020534531, 'null', '2022-04-13 12:33:56'),
(487757, 'verifiedOTP', 923020534531, 'null', '2022-04-13 12:34:09'),
(487758, 'sentOTP', 923020534531, 'null', '2022-04-13 13:50:59'),
(487759, 'verifiedOTP', 923020534531, 'null', '2022-04-13 13:51:06'),
(487760, 'unsubUser', 923020534531, 'null', '2022-04-13 13:52:35'),
(487761, 'sentOTP', 923020534531, 'null', '2022-04-13 13:53:12'),
(487762, 'verifiedOTP', 923020534531, 'null', '2022-04-13 13:53:18'),
(487763, 'resubUser', 923020534531, 'null', '2022-04-13 13:53:24'),
(487764, 'sentOTP', 923020534531, 'null', '2022-04-14 00:39:50'),
(487765, 'verifiedOTP', 923020534531, 'null', '2022-04-14 00:40:08'),
(487766, 'sentOTP', 923020534531, 'null', '2022-04-14 00:56:49'),
(487767, 'verifiedOTP', 923020534531, 'null', '2022-04-14 00:57:06'),
(487768, 'unsubUser', 923020534531, 'null', '2022-04-14 01:00:58'),
(487769, 'sentOTP', 923020534531, 'null', '2022-04-14 01:02:27'),
(487770, 'invalidOTP', 923020534531, 'null', '2022-04-14 01:02:38'),
(487771, 'sentOTP', 923020534531, 'null', '2022-04-14 01:02:39'),
(487772, 'verifiedOTP', 923020534531, 'null', '2022-04-14 01:02:51'),
(487773, 'resubUser', 923020534531, 'null', '2022-04-14 01:03:03'),
(487774, 'sentOTP', 923020534531, 'null', '2022-04-14 10:33:07'),
(487775, 'verifiedOTP', 923020534531, 'null', '2022-04-14 10:33:20'),
(487776, 'sentOTP', 923020534531, 'null', '2022-04-14 10:49:07'),
(487777, 'unsubUser', 923020534531, 'null', '2022-04-14 10:49:14'),
(487778, 'verifiedOTP', 923020534531, 'null', '2022-04-14 10:49:22'),
(487779, 'resubUser', 923020534531, 'null', '2022-04-14 10:50:26'),
(487780, 'sentOTP', 923020534531, 'null', '2022-04-14 15:10:44'),
(487781, 'invalidOTP', 923020534531, 'null', '2022-04-14 15:10:54'),
(487782, 'sentOTP', 923020534531, 'null', '2022-04-14 15:10:55'),
(487783, 'verifiedOTP', 923020534531, 'null', '2022-04-14 15:11:05'),
(487784, 'sentOTP', 923035312417, 'null', '2022-04-14 15:32:37'),
(487785, 'verifiedOTP', 923035312417, 'null', '2022-04-14 15:32:56'),
(487786, 'sentOTP', 923020534531, 'null', '2022-04-14 19:23:04'),
(487787, 'verifiedOTP', 923020534531, 'null', '2022-04-14 19:23:17'),
(487788, 'unsubUser', 923020534531, 'null', '2022-04-14 19:23:56'),
(487789, 'sentOTP', 923020534531, 'null', '2022-04-14 19:24:21'),
(487790, 'verifiedOTP', 923020534531, 'null', '2022-04-14 19:24:29'),
(487791, 'resubUser', 923020534531, 'null', '2022-04-14 19:24:37'),
(487792, 'unsubUser', 923020534531, 'null', '2022-04-17 19:29:56'),
(487793, 'sentOTP', 923020534531, 'null', '2022-04-17 19:32:24'),
(487794, 'invalidOTP', 923020534531, 'null', '2022-04-17 19:32:35'),
(487795, 'sentOTP', 923020534531, 'null', '2022-04-17 19:32:36'),
(487796, 'verifiedOTP', 923020534531, 'null', '2022-04-17 19:32:47'),
(487797, 'resubUser', 923020534531, 'null', '2022-04-17 19:33:27'),
(487798, 'unsubUser', 923020534531, 'null', '2022-04-17 19:34:21'),
(487799, 'sentOTP', 923020534531, 'null', '2022-04-17 19:34:55'),
(487800, 'invalidOTP', 923020534531, 'null', '2022-04-17 19:35:00'),
(487801, 'sentOTP', 923020534531, 'null', '2022-04-17 19:35:01'),
(487802, 'verifiedOTP', 923020534531, 'null', '2022-04-17 19:35:08'),
(487803, 'resubUser', 923020534531, 'null', '2022-04-17 19:35:13');

-- --------------------------------------------------------

--
-- Table structure for table `marketing_partners`
--

CREATE TABLE `marketing_partners` (
  `id` int NOT NULL,
  `param_name` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `callback_url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `conversion_rate` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int NOT NULL,
  `msisdn` bigint NOT NULL,
  `pin` int NOT NULL,
  `expiry` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `msisdn`, `pin`, `expiry`) VALUES
(1333803, 923020534531, 1636, '2022-04-12 10:07:26'),
(1333804, 923020534531, 1086, '2022-04-12 10:08:30'),
(1333805, 923020534531, 9147, '2022-04-12 10:12:11'),
(1333806, 923020534531, 2332, '2022-04-12 10:12:32'),
(1333807, 923020534531, 8260, '2022-04-12 10:13:59'),
(1333808, 923020534531, 7832, '2022-04-12 10:17:35'),
(1333809, 923020534531, 8730, '2022-04-12 10:17:57'),
(1333810, 923020534531, 2030, '2022-04-12 10:22:19'),
(1333811, 923020534531, 5560, '2022-04-12 10:22:32'),
(1333812, 923020534531, 5445, '2022-04-12 10:26:00'),
(1333813, 923020534531, 9036, '2022-04-12 10:30:34'),
(1333814, 923020534531, 1710, '2022-04-12 10:30:46'),
(1333815, 923020534531, 5435, '2022-04-12 10:33:05'),
(1333816, 923020534531, 2735, '2022-04-12 10:33:19'),
(1333817, 923098628521, 8060, '2022-04-12 15:09:49'),
(1333818, 923098628521, 2734, '2022-04-12 15:10:18'),
(1333819, 923020534531, 1126, '2022-04-12 15:12:37'),
(1333820, 923020534531, 9926, '2022-04-12 15:14:04'),
(1333821, 923052201527, 1492, '2022-04-12 21:50:51'),
(1333822, 923020534531, 6781, '2022-04-13 12:35:34'),
(1333823, 923020534531, 6797, '2022-04-13 12:35:56'),
(1333824, 923020534531, 5586, '2022-04-13 13:52:59'),
(1333825, 923020534531, 9164, '2022-04-13 13:55:12'),
(1333826, 923020534531, 4758, '2022-04-14 00:41:50'),
(1333827, 923020534531, 5162, '2022-04-14 00:58:49'),
(1333828, 923020534531, 5839, '2022-04-14 01:04:27'),
(1333829, 923020534531, 1990, '2022-04-14 01:04:39'),
(1333830, 923020534531, 1424, '2022-04-14 10:35:07'),
(1333831, 923020534531, 4966, '2022-04-14 10:51:07'),
(1333832, 923020534531, 1352, '2022-04-14 15:12:44'),
(1333833, 923020534531, 5370, '2022-04-14 15:12:55'),
(1333834, 923035312417, 6359, '2022-04-14 15:34:37'),
(1333835, 923020534531, 7022, '2022-04-14 19:25:04'),
(1333836, 923020534531, 2276, '2022-04-14 19:26:21'),
(1333837, 923020534531, 7499, '2022-04-17 19:34:24'),
(1333838, 923020534531, 6771, '2022-04-17 19:34:36'),
(1333839, 923020534531, 7006, '2022-04-17 19:36:55'),
(1333840, 923020534531, 3254, '2022-04-17 19:37:01');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int NOT NULL,
  `msisdn` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subscription_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_method` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subscriber_type` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `network_type` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_billed_date` datetime NOT NULL DEFAULT '1970-01-02 00:00:00',
  `status` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

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
  `msisdn` bigint NOT NULL,
  `id` int NOT NULL
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
  ADD KEY `id` (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id` (`id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487804;

--
-- AUTO_INCREMENT for table `marketing_partners`
--
ALTER TABLE `marketing_partners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1333841;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1466;

--
-- AUTO_INCREMENT for table `whitelisted_users`
--
ALTER TABLE `whitelisted_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
