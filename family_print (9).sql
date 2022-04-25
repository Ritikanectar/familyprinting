-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2021 at 08:54 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `family_print`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fp_artwork`
--

CREATE TABLE `fp_artwork` (
  `artwork_id` int(11) NOT NULL,
  `gallery_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(200) NOT NULL DEFAULT '',
  `artwork_image` varchar(150) NOT NULL DEFAULT '',
  `artwork_image_extension` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_artwork`
--

INSERT INTO `fp_artwork` (`artwork_id`, `gallery_id`, `title`, `artwork_image`, `artwork_image_extension`, `created_by`, `created_date`, `is_active`) VALUES
(1, 1, 'Artwork 1', 'gallery/1/clipArt/pngtree-lovely-bat-clipart-vector-png-element-png-image_1749074.jpg', 'jpg', 1, '2021-02-18 12:09:13', 1),
(2, 1, 'Artwork 2', 'gallery/1/clipArt/cb0cacfe6909654f077e0423a3c227ab.jpg', 'jpg', 1, '2021-02-18 12:22:01', 1),
(3, 1, 'Artwork 3', 'gallery/1/clipArt/images.jpg', 'jpg', 1, '2021-02-18 12:23:44', 0),
(4, 1, 'Artwork 4', 'gallery/1/clipArt/pngtree-happy-halloween-scary-pumpkin-png-image_2136606.jpg', 'jpg', 1, '2021-02-18 12:24:26', 0),
(5, 2, 'Artwork 1', 'gallery/2/clipArt/pngtree-happy-halloween-scary-pumpkin-png-image_2136606.jpg', 'jpg', 1, '2021-02-18 12:25:31', 1),
(6, 3, 'Pumpkin', 'gallery/3/clipArt/pngtree-happy-halloween-scary-pumpkin-png-image_2136606.jpg', 'jpg', 1, '2021-02-18 17:51:23', 0),
(7, 3, 'Artwork 2', 'gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 'png', 1, '2021-02-18 17:51:54', 0),
(17, 3, 'cb0cacfe6909654f077e0423a3c227ab.jpg', 'gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 'png', 1, '2021-02-22 09:10:46', 1),
(18, 3, 'Holloween.jpg', 'gallery/3/clipArt/Holloween.jpg', 'jpg', 1, '2021-02-22 09:10:46', 0),
(19, 3, 'mug.jpg', 'gallery/3/clipArt/mug.jpg', 'jpg', 1, '2021-02-22 09:10:46', 0),
(20, 3, 'jersey8.jpg', 'gallery/3/clipArt/jersey8.jpg', 'jpg', 1, '2021-02-22 09:13:42', 0),
(21, 3, 'jersey666.jpg', 'gallery/3/clipArt/jersey666.jpg', 'jpg', 1, '2021-02-22 09:13:42', 0),
(22, 3, 'tees-large.png', 'gallery/3/clipArt/tees-large.png', 'png', 1, '2021-02-22 09:13:42', 0),
(29, 2, 'cb0cacfe6909654f077e0423a3c227ab.jpg', 'gallery/2/clipArt/cb0cacfe6909654f077e0423a3c227ab.jpg', 'jpg', 1, '2021-02-23 17:42:17', 1),
(30, 2, 'Holloween.jpg', 'gallery/2/clipArt/Holloween.jpg', 'jpg', 1, '2021-02-23 17:42:17', 1),
(31, 2, 'images.jpg', 'gallery/2/clipArt/images.jpg', 'jpg', 1, '2021-02-23 17:42:17', 1),
(32, 2, 'desk-chair.png', 'gallery/2/clipArt/desk-chair.png', 'png', 1, '2021-02-23 17:42:17', 1),
(33, 3, 'Destination_Makerlab_TEE_Graphic_1.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 'png', 1, '2021-03-10 07:12:46', 1),
(34, 3, 'Destination_Makerlab_TEE_Graphic_2.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 'png', 1, '2021-03-10 07:12:46', 1),
(35, 3, 'Destination_Makerlab_TEE_Graphic_3.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 'png', 1, '2021-03-10 07:12:46', 1),
(36, 3, 'Destination_Makerlab_TEE_Graphic_4.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 'png', 1, '2021-03-10 07:12:47', 1),
(37, 3, 'Destination_Makerlab_TEE_Graphic_5.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 'png', 1, '2021-03-10 07:12:47', 1),
(38, 3, 'Destination_Makerlab_TEE_Graphic_6.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 'png', 1, '2021-03-10 07:12:47', 1),
(39, 3, 'Destination_Makerlab_TEE_Graphic_7.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 'png', 1, '2021-03-10 07:12:47', 1),
(40, 3, 'Destination_Makerlab_TEE_Graphic_8.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 'png', 1, '2021-03-10 07:12:47', 1),
(41, 3, 'Destination_Makerlab_TEE_Graphic_9.png', 'gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_9.png', 'png', 1, '2021-03-10 07:12:47', 1),
(42, 4, 'Destination_Makerlab_TEE_Graphic_1.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 'png', 1, '2021-04-13 14:14:56', 0),
(43, 4, 'Destination_Makerlab_TEE_Graphic_2.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 'png', 1, '2021-04-13 14:14:56', 0),
(44, 4, 'Destination_Makerlab_TEE_Graphic_3.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 'png', 1, '2021-04-13 14:14:56', 0),
(45, 4, 'Destination_Makerlab_TEE_Graphic_3.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 'png', 1, '2021-04-13 14:16:18', 0),
(46, 4, 'Destination_Makerlab_TEE_Graphic_4.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 'png', 1, '2021-04-13 14:16:18', 0),
(47, 4, 'Destination_Makerlab_TEE_Graphic_8.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 'png', 1, '2021-04-13 14:17:33', 0),
(48, 4, 'Destination_Makerlab_TEE_Graphic_9.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_9.png', 'png', 1, '2021-04-13 14:19:06', 0),
(49, 4, 'Destination_Makerlab_TEE_Graphic_9.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_9.png', 'png', 1, '2021-04-13 14:19:58', 0),
(50, 4, 'Destination_Makerlab_TEE_Graphic_7.png', 'gallery/4/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 'png', 1, '2021-04-13 14:21:52', 0),
(51, 1, '1619701485man-hat-tip-silhouette.svg', 'gallery/1/clipArt/1619701485man-hat-tip-silhouette.svg', 'svg', 1, '2021-05-07 08:19:18', 1),
(52, 1, 'Dragon.svg', 'gallery/1/clipArt/Dragon.svg', 'svg', 1, '2021-05-07 08:20:55', 1),
(53, 1, 'MonkeyFace.svg', 'gallery/1/clipArt/MonkeyFace.svg', 'svg', 1, '2021-05-07 08:20:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_event`
--

CREATE TABLE `fp_event` (
  `event_id` int(11) NOT NULL,
  `event_type` enum('Virtual','On Site','E-Com','') NOT NULL DEFAULT '',
  `app_type` enum('Single Gallery','Multiple Gallery','','') NOT NULL DEFAULT '',
  `app_name` varchar(100) NOT NULL DEFAULT '',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `orientation` enum('Landscape','Portrait') NOT NULL,
  `event_place` varchar(200) NOT NULL DEFAULT '',
  `client` varchar(100) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_event`
--

INSERT INTO `fp_event` (`event_id`, `event_type`, `app_type`, `app_name`, `start_datetime`, `end_datetime`, `orientation`, `event_place`, `client`, `created_by`, `created_date`, `modified_date`, `is_active`) VALUES
(1, 'On Site', 'Single Gallery', 'Christmas Eve', '2021-02-10 12:32:00', '2021-02-12 01:34:00', 'Portrait', 'Los Vegas', 'Microsoft', 1, '2021-02-10 07:03:17', '2021-02-10 07:03:17', 1),
(2, 'E-Com', 'Multiple Gallery', 'Football Club', '2021-04-05 17:59:00', '2021-04-07 06:00:00', 'Portrait', 'San Diago', 'Monster', 1, '2021-04-19 08:01:25', '2021-04-19 08:01:25', 1),
(3, 'E-Com', 'Single Gallery', 'T-20 Cricket', '2021-02-03 12:15:00', '2021-02-24 12:16:00', 'Portrait', 'California', 'Nectar', 1, '2021-04-11 06:55:38', '2021-04-11 06:55:38', 1),
(4, 'Virtual', 'Single Gallery', 'Moto GP Race', '2021-02-24 22:20:00', '2021-03-10 20:29:00', 'Landscape', 'New York', 'Red Bull', 1, '2021-04-19 08:02:27', '2021-04-19 08:02:27', 1),
(5, 'Virtual', 'Multiple Gallery', 'Event 5', '2021-02-18 13:08:00', '2021-02-26 14:08:00', 'Landscape', 'San Jose', 'Red Bull', 1, '2021-02-16 17:38:56', '2021-02-16 17:38:56', 1),
(6, 'Virtual', 'Single Gallery', 'Covid-19 Awareness', '2021-04-26 07:04:00', '2021-05-07 19:04:00', 'Landscape', 'Pune', 'Steve', 1, '2021-04-23 11:35:12', '2021-04-23 11:35:12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_event_executive`
--

CREATE TABLE `fp_event_executive` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `event_id` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_event_executive`
--

INSERT INTO `fp_event_executive` (`id`, `user_id`, `event_id`, `is_active`) VALUES
(1, 2, 1, 1),
(5, 3, 5, 1),
(9, 2, 3, 1),
(12, 2, 2, 1),
(14, 3, 4, 1),
(15, 2, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_event_type`
--

CREATE TABLE `fp_event_type` (
  `type_id` int(11) NOT NULL,
  `event_type` int(11) NOT NULL DEFAULT '0' COMMENT '(Default:0,virual:1,OnSite:2,ECom:3)',
  `event_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fp_gallery`
--

CREATE TABLE `fp_gallery` (
  `gallery_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL DEFAULT '',
  `gallery_image` varchar(150) NOT NULL DEFAULT '',
  `gallery_image_extension` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_gallery`
--

INSERT INTO `fp_gallery` (`gallery_id`, `title`, `gallery_image`, `gallery_image_extension`, `created_by`, `created_date`, `is_active`) VALUES
(1, 'My Collection 1', 'gallery/1/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-02-18 05:34:45', 1),
(2, 'My Collection 2', 'gallery/2/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '2021-02-08 08:10:07', 1),
(3, 'My Collection 3', 'gallery/3/Holloween.jpg', 'jpg', 1, '2021-02-18 17:50:27', 1),
(4, 'My Collection 4', 'gallery/4/cap.jpg', 'jpg', 1, '2021-04-13 13:45:30', 0),
(5, 'My Collection 4', 'gallery/5/Destination_Makerlab_TEE_Graphic_8.png', 'png', 1, '2021-04-13 14:25:20', 0),
(6, 'My Collection 4', 'gallery/6/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '2021-04-17 11:26:47', 0),
(7, '20\'s Collections', 'gallery/7/cb0cacfe6909654f077e0423a3c227ab.jpg', 'jpg', 1, '2021-05-31 09:11:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_landing_app`
--

CREATE TABLE `fp_landing_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `button_text` varchar(100) DEFAULT '',
  `bg_file_path` varchar(250) DEFAULT '',
  `bg_file_extention` varchar(100) DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_landing_app`
--

INSERT INTO `fp_landing_app` (`app_id`, `event_id`, `button_text`, `bg_file_path`, `bg_file_extention`, `created_by`, `created_date`, `is_active`) VALUES
(1, 5, 'Get Started', 'landing/1/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-05-07 11:24:26', 1),
(2, 2, 'Get Ready', 'landing/2/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-05-12 05:42:33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_orders`
--

CREATE TABLE `fp_orders` (
  `order_id` int(11) NOT NULL,
  `reciept_id` varchar(20) DEFAULT '',
  `client_id` int(11) NOT NULL DEFAULT '0',
  `event_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `product_size` varchar(50) DEFAULT '',
  `canvas_front_width` varchar(11) DEFAULT '0',
  `canvas_front_height` varchar(11) DEFAULT '0',
  `canvas_back_width` varchar(11) DEFAULT '0',
  `canvas_back_height` varchar(11) DEFAULT '0',
  `status` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_orders`
--

INSERT INTO `fp_orders` (`order_id`, `reciept_id`, `client_id`, `event_id`, `product_id`, `product_size`, `canvas_front_width`, `canvas_front_height`, `canvas_back_width`, `canvas_back_height`, `status`, `created_by`, `created_date`, `is_active`) VALUES
(1, '', 17, 3, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-01 13:42:28', 1),
(2, '', 18, 2, 4, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-01 14:36:53', 1),
(3, '', 19, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-01 15:27:57', 1),
(4, '', 20, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-01 16:48:36', 1),
(5, '', 21, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-09 06:53:12', 1),
(6, '', 25, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-09 16:20:23', 1),
(7, '', 26, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-09 16:45:18', 1),
(8, '', 28, 1, 2, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-14 03:33:48', 1),
(9, '', 29, 1, 4, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-14 04:39:43', 1),
(10, '', 33, 2, 4, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-16 03:58:59', 1),
(11, '', 34, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-16 11:21:22', 1),
(12, '', 35, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-16 11:24:01', 1),
(13, '', 37, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-16 13:48:40', 1),
(14, '', 38, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-19 06:55:38', 1),
(15, '', 39, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-19 07:09:19', 1),
(16, '', 40, 2, 6, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-19 08:51:13', 1),
(17, '', 41, 1, 2, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-19 11:02:00', 1),
(18, '', 42, 1, 4, '', '0', '0', '0', '0', 'Ordered', 1, '2021-04-19 11:07:33', 1),
(19, '#000018', 46, 2, 4, 'Mega Sized', '0', '0', '0', '0', 'Ordered', 1, '2021-04-21 08:35:15', 1),
(20, '#000019', 47, 1, 4, 'XL', '0', '0', '0', '0', 'Ordered', 1, '2021-04-21 10:49:06', 0),
(23, '#000022', 57, 2, 6, 'M', '230', '390', '145', '250', 'Ordered', 1, '2021-04-26 05:15:56', 1),
(24, '#000023', 57, 2, 6, 'M', '230', '390', '145', '250', 'Ordered', 1, '2021-05-06 05:04:14', 1),
(25, '#000024', 68, 2, 6, 'M', '230', '390', '145', '250', 'Ordered', 1, '2021-05-06 05:06:39', 1),
(26, '#000025', 69, 2, 6, 'L', '230', '390', '145', '250', 'Ordered', 1, '2021-05-07 08:26:33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_preview_app`
--

CREATE TABLE `fp_preview_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `preview` varchar(200) NOT NULL DEFAULT '',
  `preview_file` varchar(250) NOT NULL DEFAULT '',
  `preview_file_ext` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_preview_app`
--

INSERT INTO `fp_preview_app` (`app_id`, `event_id`, `preview`, `preview_file`, `preview_file_ext`, `created_by`, `created_date`, `is_active`) VALUES
(1, 4, 'Check Out!', 'preview/1/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-03-03 09:46:12', 1),
(2, 2, 'Check Out!', 'preview/2/Event.jpg', 'jpg', 1, '2021-03-03 09:59:58', 1),
(3, 1, 'Check Out!', 'preview/3/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '2021-03-03 12:43:32', 1),
(4, 3, 'Check Out!', 'preview/4/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-03-04 17:38:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_print_fonts`
--

CREATE TABLE `fp_print_fonts` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `client_id` int(11) NOT NULL DEFAULT '0',
  `text` varchar(500) NOT NULL DEFAULT '',
  `color` varchar(100) DEFAULT '',
  `family` varchar(150) NOT NULL DEFAULT '',
  `weight` varchar(50) DEFAULT '',
  `width` varchar(50) DEFAULT '',
  `spacing` int(11) NOT NULL DEFAULT '0',
  `top_pos` double NOT NULL DEFAULT '0',
  `left_pos` double NOT NULL DEFAULT '0',
  `size` double NOT NULL DEFAULT '0',
  `view` varchar(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_print_fonts`
--

INSERT INTO `fp_print_fonts` (`app_id`, `event_id`, `product_id`, `client_id`, `text`, `color`, `family`, `weight`, `width`, `spacing`, `top_pos`, `left_pos`, `size`, `view`, `created_by`, `created_date`, `is_active`) VALUES
(1, 2, 6, 17, 'USA', '#ee0000', 'Old English Text MT', 'bold', '', 2, 106.99999904633, 3, 54, 'back', 1, '2021-04-01 11:48:56', 1),
(2, 2, 4, 18, 'John', '#ebebeb', 'Brush Script MT', 'normal', '', 2, 6, 38, 62, 'front', 1, '2021-04-01 14:36:39', 1),
(3, 2, 6, 19, 'USA', '#000000', 'Old English Text MT', 'bold', '', 5, 13, 11, 43, 'back', 1, '2021-04-01 15:26:35', 1),
(4, 2, 6, 19, '9', '#8306bd', 'Old English Text MT', 'bold', '', 0, 84, 46, 74, 'back', 1, '2021-04-01 15:26:35', 1),
(5, 2, 6, 20, 'USA', '#071bd1', 'Papyrus', 'bold', '', 2, 26, 17, 35, 'back', 1, '2021-04-01 16:48:00', 1),
(6, 1, 4, 29, 'USA', '#ebebeb', 'Papyrus', 'normal', '', 2, 36, 14, 37, 'back', 1, '2021-04-14 04:06:41', 1),
(7, 2, 6, 35, 'INDIA', '#ff8b06', 'Papyrus', 'bold', '', 4, 16, 11, 30, 'back', 1, '2021-04-16 11:23:50', 1),
(8, 2, 6, 35, '7', '#018629', 'Papyrus', 'normal', '', 2, 73, 48, 87, 'back', 1, '2021-04-16 11:23:50', 1),
(9, 2, 6, 37, 'USA', '#f5e502', 'Old English Text MT', 'normal', '', 2, 11, 10, 52, 'back', 1, '2021-04-16 13:48:21', 1),
(10, 2, 6, 37, '7', '#071bd1', 'Old English Text MT', 'normal', '', 2, 81, 49, 71, 'back', 1, '2021-04-16 13:48:21', 1),
(11, 2, 6, 37, 'John', '#071bd1', 'Old English Text MT', 'normal', '', 2, 295, 90, 62, 'front', 1, '2021-04-19 06:28:32', 1),
(12, 2, 6, 37, 'USA', '#8306bd', 'Verdana', 'bold', '', 2, 98, 6, 50, 'back', 1, '2021-04-19 06:28:32', 1),
(13, 2, 6, 38, 'India', '#f5e502', 'Old English Text MT', 'normal', '', 2, 87, 40, 58, 'front', 1, '2021-04-19 06:30:22', 1),
(14, 2, 6, 38, 'USA', '#071bd1', 'Brush Script MT', 'normal', '', 2, 165, 27, 45, 'back', 1, '2021-04-19 06:30:22', 1),
(15, 2, 6, 39, 'John', '#8306bd', 'Old English Text MT', 'bold', '', 3, 166, 79, 38, 'front', 1, '2021-04-19 07:09:12', 1),
(16, 2, 6, 39, 'USA', '#8306bd', 'Old English Text MT', 'normal', '', 2, -2, 22, 47, 'back', 1, '2021-04-19 07:09:12', 1),
(17, 2, 6, 39, '9', '#fc1d00', 'Old English Text MT', 'normal', '', 2, 74, 64, 61, 'back', 1, '2021-04-19 07:09:12', 1),
(18, 2, 6, 40, 'India', '#f5e502', 'Old English Text MT', 'normal', '', 2, 103, 46, 39, 'front', 1, '2021-04-19 08:51:01', 1),
(22, 2, 6, 54, 'Lords Of The Ring', '#8306bd', 'Brush Script MT', 'normal', '78', 2, 5, -1.5, 36, 'back', 1, '2021-04-22 13:48:08', 1),
(23, 2, 6, 57, 'test', '#8306bd', 'Brush Script MT', 'normal', '29', 2, 74, 98, 31, 'front', 1, '2021-04-26 04:22:44', 1),
(24, 2, 6, 69, 'Monkey King', '#888888', 'Old English Text MT', 'bold', '163', 2, 307, 32.162536621094, 24, 'front', 1, '2021-05-07 08:26:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_print_prop`
--

CREATE TABLE `fp_print_prop` (
  `prop_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `client_id` int(11) NOT NULL DEFAULT '0',
  `clipart` varchar(250) DEFAULT '',
  `top_pos` float DEFAULT '0',
  `left_pos` float DEFAULT '0',
  `rotate` varchar(50) DEFAULT '',
  `z_index` varchar(11) DEFAULT '',
  `width` float DEFAULT '0',
  `height` float DEFAULT '0',
  `svg` varchar(20000) NOT NULL DEFAULT '',
  `view` varchar(10) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_print_prop`
--

INSERT INTO `fp_print_prop` (`prop_id`, `event_id`, `product_id`, `client_id`, `clipart`, `top_pos`, `left_pos`, `rotate`, `z_index`, `width`, `height`, `svg`, `view`, `created_by`, `created_date`, `is_active`) VALUES
(1, 2, 6, 17, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 136, 54, NULL, '0', 109, 108, '', 'Front', 1, '2021-04-01 11:48:55', 1),
(2, 2, 6, 17, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 23, 42, NULL, '0', 114, 99, '', 'Front', 1, '2021-04-01 11:48:56', 1),
(3, 2, 6, 17, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 21, 42, NULL, '0', 121, 104, '', 'Front', 1, '2021-04-01 11:48:56', 1),
(4, 2, 6, 17, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_9.png', 0, 0, NULL, '0', 135, 94, '', 'back', 1, '2021-04-01 11:48:56', 1),
(5, 2, 4, 18, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 110, 50, NULL, '0', 92, 108, '', 'Front', 1, '2021-04-01 14:36:39', 1),
(6, 2, 4, 18, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 84, 19, NULL, '0', 90, 90, '', 'back', 1, '2021-04-01 14:36:39', 1),
(7, 2, 6, 19, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 64, 45, NULL, '0', 130, 121, '', 'Front', 1, '2021-04-01 15:26:35', 1),
(8, 2, 6, 19, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 215, 54, NULL, '0', 128, 126, '', 'Front', 1, '2021-04-01 15:26:35', 1),
(9, 2, 6, 20, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 70, 55, NULL, '0', 90, 90, '', 'Front', 1, '2021-04-01 16:48:00', 1),
(10, 2, 6, 20, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 228, 53, NULL, '0', 90, 90, '', 'Front', 1, '2021-04-01 16:48:00', 1),
(11, 2, 6, 20, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 122, 13, NULL, '0', 99, 91, '', 'back', 1, '2021-04-01 16:48:00', 1),
(12, 2, 6, 21, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 109, 23, NULL, '2', 135, 140, '', 'Front', 1, '2021-04-09 06:50:17', 1),
(13, 2, 6, 21, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 108, 35, NULL, '4', 109, 108, '', 'Front', 1, '2021-04-09 06:50:17', 1),
(14, 2, 6, 21, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 37, 11, NULL, '3', 157, 161, '', 'Front', 1, '2021-04-09 06:50:17', 1),
(15, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 84, 6, NULL, '3', 160, 166, '', 'Front', 1, '2021-04-09 10:36:00', 1),
(16, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 91, 30, NULL, '5', 100, 100, '', 'Front', 1, '2021-04-09 10:36:00', 1),
(17, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 84, 6, NULL, '3', 160, 166, '', 'Front', 1, '2021-04-09 10:36:07', 1),
(18, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 91, 30, NULL, '5', 100, 100, '', 'Front', 1, '2021-04-09 10:36:07', 1),
(19, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 84, 6, NULL, '3', 160, 166, '', 'Front', 1, '2021-04-09 10:36:23', 1),
(20, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 91, 30, NULL, '5', 100, 100, '', 'Front', 1, '2021-04-09 10:36:23', 1),
(21, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 84, 6, NULL, '3', 160, 166, '', 'Front', 1, '2021-04-09 10:37:28', 1),
(22, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 91, 30, NULL, '5', 100, 100, '', 'Front', 1, '2021-04-09 10:37:28', 1),
(23, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 137, 11, NULL, NULL, 90, 90, '', 'back', 1, '2021-04-09 10:37:28', 1),
(24, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 55, 16, NULL, NULL, 81, 79, '', 'back', 1, '2021-04-09 10:37:28', 1),
(25, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 37, 46, NULL, '2', 107, 106, '', 'Front', 1, '2021-04-09 11:51:41', 1),
(26, 2, 6, 23, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 51, 58, NULL, '4', 80, 81, '', 'Front', 1, '2021-04-09 11:51:42', 1),
(27, 2, 5, 24, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 33, 5, NULL, '3', 118, 98, '', 'Front', 1, '2021-04-09 11:54:09', 1),
(28, 2, 5, 24, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 42, 13, NULL, '5', 71, 73, '', 'Front', 1, '2021-04-09 11:54:09', 1),
(29, 2, 6, 25, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 131, 48, NULL, '2', 134, 124, '', 'Front', 1, '2021-04-09 16:20:11', 1),
(30, 2, 6, 25, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 141, 55, NULL, '4', 90, 90, '', 'Front', 1, '2021-04-09 16:20:12', 1),
(31, 2, 6, 25, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 117, 35, NULL, '3', 90, 90, '', 'Front', 1, '2021-04-09 16:20:12', 1),
(32, 2, 6, 25, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 56, 15, NULL, '6', 90, 90, '', 'back', 1, '2021-04-09 16:20:12', 1),
(33, 2, 6, 25, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 47, -1, NULL, '4', 128, 139, '', 'back', 1, '2021-04-09 16:20:12', 1),
(34, 2, 6, 26, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 127, 55, NULL, '6', 106, 112, '', 'Front', 1, '2021-04-09 16:44:32', 1),
(35, 2, 6, 26, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 115, 49, NULL, '5', 90, 90, '', 'Front', 1, '2021-04-09 16:44:32', 1),
(36, 2, 6, 26, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 104, 50, NULL, '3', 142, 130, '', 'Front', 1, '2021-04-09 16:44:32', 1),
(37, 2, 6, 26, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 80, 8, NULL, '6', 90, 90, '', 'back', 1, '2021-04-09 16:44:32', 1),
(38, 2, 6, 26, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 62, 5, NULL, '4', 90, 90, '', 'back', 1, '2021-04-09 16:44:32', 1),
(39, 1, 4, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 74, 43, NULL, '4', 105, 106, '', 'Front', 1, '2021-04-14 03:13:45', 1),
(40, 1, 4, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 70, 40, NULL, '3', 90, 90, '', 'Front', 1, '2021-04-14 03:13:46', 1),
(41, 1, 4, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 226, 8, NULL, '6', 90, 90, '', 'back', 1, '2021-04-14 03:13:46', 1),
(42, 1, 4, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 61, 12, NULL, '4', 101, 112, '', 'back', 1, '2021-04-14 03:13:46', 1),
(43, 1, 2, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 57, 15, NULL, '5', 86, 86, '', 'Front', 1, '2021-04-14 03:33:41', 1),
(44, 1, 2, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 33, 5, NULL, '2', 90, 90, '', 'Front', 1, '2021-04-14 03:33:41', 1),
(45, 1, 2, 28, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 1, 78, NULL, NULL, 66, 68, '', 'back', 1, '2021-04-14 03:33:41', 1),
(49, 1, 4, 29, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 151, 18, NULL, '3', 114, 102, '', 'back', 1, '2021-04-14 04:19:02', 1),
(50, 1, 4, 29, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 150, 19, NULL, '5', 119, 109, '', 'back', 1, '2021-04-14 04:19:02', 1),
(51, 2, 4, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 34, 53, NULL, NULL, 97, 105, '', 'Front', 1, '2021-04-16 03:58:39', 1),
(52, 2, 4, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 125, 8, NULL, NULL, 108, 105, '', 'Front', 1, '2021-04-16 03:58:39', 1),
(53, 2, 4, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 43, 24, NULL, NULL, 73, 71, '', 'back', 1, '2021-04-16 03:58:39', 1),
(54, 2, 6, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 115, 29, NULL, NULL, 118, 100, '', 'Front', 1, '2021-04-16 06:04:39', 1),
(55, 2, 6, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 246, 53, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-16 06:04:39', 1),
(56, 2, 6, 33, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 80, 18, NULL, NULL, 90, 90, '', 'back', 1, '2021-04-16 06:04:39', 1),
(57, 2, 6, 34, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 102, 58, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-16 06:27:26', 1),
(58, 2, 6, 34, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 0, 0, NULL, NULL, 90, 90, '', 'back', 1, '2021-04-16 06:27:26', 1),
(59, 2, 6, 34, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 104, 38, '18', NULL, 100, 100, '', 'Front', 1, '2021-04-16 08:08:25', 1),
(60, 2, 6, 34, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 246, 44, '36', NULL, 90, 90, '', 'Front', 1, '2021-04-16 08:08:26', 1),
(61, 2, 6, 34, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 60, 9, NULL, NULL, 100, 107, '', 'back', 1, '2021-04-16 08:08:26', 1),
(62, 2, 6, 35, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 141, 60, NULL, '7', 121, 116, '', 'Front', 1, '2021-04-16 11:23:50', 1),
(63, 2, 6, 35, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 111, 59, NULL, '4', 120, 129, '', 'Front', 1, '2021-04-16 11:23:50', 1),
(64, 2, 6, 37, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 120, 58, NULL, '8', 117, 112, '', 'Front', 1, '2021-04-16 13:48:21', 1),
(65, 2, 6, 37, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 97, 61, NULL, '5', 104, 117, '', 'Front', 1, '2021-04-16 13:48:21', 1),
(66, 2, 6, 37, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 171, 31, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-19 06:28:32', 1),
(67, 2, 6, 37, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 165, 19, NULL, NULL, 72, 58, '', 'back', 1, '2021-04-19 06:28:32', 1),
(68, 2, 6, 38, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 206, 65, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-19 06:30:22', 1),
(69, 2, 6, 38, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 0, 168, NULL, NULL, 60, 46, '', 'Front', 1, '2021-04-19 06:30:22', 1),
(70, 2, 6, 38, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 29, 19, NULL, NULL, 108, 110, '', 'back', 1, '2021-04-19 06:30:22', 1),
(71, 2, 6, 39, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 118, 70, NULL, NULL, 69, 64, '', 'Front', 1, '2021-04-19 07:09:12', 1),
(72, 2, 6, 39, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 179, 1, NULL, '5', 66, 60, '', 'Front', 1, '2021-04-19 07:09:12', 1),
(73, 2, 6, 39, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 169, 4, NULL, '4', 59, 52, '', 'Front', 1, '2021-04-19 07:09:12', 1),
(74, 2, 6, 39, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 176, 42, NULL, NULL, 61, 60, '', 'back', 1, '2021-04-19 07:09:12', 1),
(75, 2, 6, 40, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 188, 53, NULL, NULL, 92, 90, '', 'Front', 1, '2021-04-19 08:51:01', 1),
(76, 2, 6, 40, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_8.png', 42, 163, NULL, NULL, 63, 58, '', 'Front', 1, '2021-04-19 08:51:01', 1),
(77, 2, 6, 40, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', -2, 47, NULL, '5', 90, 86, '', 'back', 1, '2021-04-19 08:51:01', 1),
(78, 2, 6, 40, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', -2, 34, NULL, '1', 90, 90, '', 'back', 1, '2021-04-19 08:51:01', 1),
(79, 1, 2, 41, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 59, 34, '180', NULL, 118, 109, '', 'Front', 1, '2021-04-19 10:47:42', 1),
(80, 1, 2, 41, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', -2, 90, NULL, NULL, 68, 47, '', 'back', 1, '2021-04-19 10:47:42', 1),
(81, 1, 4, 42, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 231, 34, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-19 11:07:29', 1),
(82, 1, 4, 42, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 87, 0, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-19 11:07:29', 1),
(83, 2, 4, 46, 'http://localhost:8000/uploads/gallery/1/clipArt/cb0cacfe6909654f077e0423a3c227ab.jpg', 43, 1, NULL, NULL, 178, 163, '', 'Front', 1, '2021-04-21 08:10:33', 1),
(84, 2, 4, 46, 'http://localhost:8000/uploads/gallery/1/clipArt/pngtree-lovely-bat-clipart-vector-png-element-png-image_1749074.jpg', 0, 0, NULL, NULL, 141, 123, '', 'back', 1, '2021-04-21 08:10:33', 1),
(85, 1, 4, 47, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 115, -2, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-21 09:43:28', 1),
(86, 2, 6, 48, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 208, -2, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-21 10:55:19', 1),
(87, 2, 6, 48, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_9.png', 141, -2, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-21 10:56:13', 1),
(88, 2, 5, 49, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 229, -2, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-21 11:05:19', 1),
(89, 2, 6, 49, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 172, 4, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-21 11:13:41', 1),
(90, 2, 6, 49, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 109, 3, NULL, NULL, 90, 90, '', 'back', 1, '2021-04-21 11:13:41', 1),
(91, 3, 4, 50, 'http://localhost:8000/uploads/gallery/1/clipArt/pngtree-lovely-bat-clipart-vector-png-element-png-image_1749074.jpg', 72, 28, NULL, NULL, 90, 90, '', 'back', 1, '2021-04-22 04:45:27', 1),
(92, 2, 6, 54, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 0, 0, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-22 13:39:31', 1),
(93, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 115, 68, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-26 04:22:43', 1),
(94, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_4.png', 216, 67, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-26 04:22:43', 1),
(95, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 108, 16, NULL, NULL, 125, 132, '', 'back', 1, '2021-04-26 04:22:44', 1),
(96, 2, 6, 67, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 100, 64, '348', NULL, 90, 90, '', 'Front', 1, '2021-04-29 12:57:08', 1),
(97, 2, 6, 67, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 288, -2, NULL, NULL, 90, 90, '', 'Front', 1, '2021-04-29 12:57:08', 1),
(98, 2, 6, 67, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 0, 0, '36', NULL, 149, 149, '', 'Front', 1, '2021-04-29 13:56:41', 1),
(99, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/cb0cacfe6909654f077e0423a3c227ab.png', 121, 39, NULL, NULL, 148, 148, '', 'Front', 1, '2021-05-06 05:03:48', 1),
(100, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_1.png', 155, -2, NULL, NULL, 71, 64, '', 'back', 1, '2021-05-06 05:03:48', 1),
(101, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', -2, -2, NULL, NULL, 86, 73, '', 'back', 1, '2021-05-06 05:03:48', 1),
(102, 2, 6, 57, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_3.png', 78, 83, NULL, NULL, 60, 60, '', 'back', 1, '2021-05-06 05:03:49', 1),
(103, 2, 6, 68, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_2.png', 152, 148, NULL, NULL, 80, 80, '', 'Front', 1, '2021-05-06 05:06:31', 1),
(104, 2, 6, 68, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_5.png', 232, 44, NULL, NULL, 105, 105, '', 'Front', 1, '2021-05-06 05:06:31', 1),
(105, 2, 6, 68, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 74, 36, NULL, NULL, 90, 90, '', 'Front', 1, '2021-05-06 05:06:31', 1),
(106, 2, 6, 68, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_7.png', 45, 44, NULL, NULL, 75, 59, '', 'back', 1, '2021-05-06 05:06:31', 1),
(107, 2, 6, 68, 'http://localhost:8000/uploads/gallery/3/clipArt/Destination_Makerlab_TEE_Graphic_6.png', 154, 7, NULL, NULL, 69, 75, '', 'back', 1, '2021-05-06 05:06:31', 1),
(108, 2, 6, 69, 'http://localhost:8000/uploads/gallery/1/clipArt/MonkeyFace.svg', 103, 12, NULL, NULL, 206, 198, '', 'Front', 1, '2021-05-07 08:26:25', 1),
(109, 2, 6, 69, 'http://localhost:8000/uploads/gallery/1/clipArt/Dragon.svg', 47, 2, NULL, NULL, 141, 201, '', 'back', 1, '2021-05-07 08:26:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product`
--

CREATE TABLE `fp_product` (
  `product_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(150) NOT NULL DEFAULT '',
  `color` varchar(100) NOT NULL DEFAULT '',
  `other_size` varchar(100) DEFAULT '',
  `canvas_front_width` float NOT NULL DEFAULT '0',
  `canvas_front_height` float NOT NULL DEFAULT '0',
  `canvas_back_width` float NOT NULL DEFAULT '0',
  `canvas_back_height` float NOT NULL DEFAULT '0',
  `frontview_file` varchar(200) NOT NULL DEFAULT '',
  `frontview_file_ext` varchar(50) NOT NULL DEFAULT '',
  `backview_file` varchar(200) NOT NULL DEFAULT '',
  `backview_file_ext` varchar(50) NOT NULL DEFAULT '',
  `frontview_svg` varchar(250) NOT NULL DEFAULT '',
  `backview_svg` varchar(250) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product`
--

INSERT INTO `fp_product` (`product_id`, `type_id`, `name`, `color`, `other_size`, `canvas_front_width`, `canvas_front_height`, `canvas_back_width`, `canvas_back_height`, `frontview_file`, `frontview_file_ext`, `backview_file`, `backview_file_ext`, `frontview_svg`, `backview_svg`, `created_by`, `created_date`, `is_active`) VALUES
(1, 1, 'Pepe Jeans T Shirt', '#ec1818', 'Mega', 510, 520, 530, 540, 'product/1/front_jersey2.jpg', 'jpg', 'product/1/back_jersey5.jpg', 'jpg', '', '', 1, '2021-02-15 07:33:44', 1),
(2, 3, 'Gucci Cap', '#3a6688', '', 200, 200, 200, 100, 'product/2/front_cap.jpg', 'jpg', 'product/2/back_capBack.jpg', 'jpg', '', '', 1, '2021-02-15 11:41:06', 1),
(3, 1, 'Polo Sport T', '#3a98de', '', 80, 90, 145, 265, 'product/3/front_jersey2.jpg', 'jpg', 'product/3/back_jersey5.jpg', 'jpg', '', '', 1, '2021-02-15 12:01:57', 0),
(4, 1, 'Zara West Side', '#08242f', 'Mega Sized,Mini', 181, 360, 145, 543, 'product/4/front_jersey7.jpg', 'jpg', 'product/4/back_jersey8.jpg', 'jpg', '', '', 1, '2021-02-15 12:03:49', 1),
(5, 1, 'Family Bussiness', '#90003d', '45,42,46', 150, 350, 985, 895, 'product/5/front_jersey8.jpg', 'jpg', 'product/5/back_jersey3.jpg', 'jpg', '', '', 1, '2021-02-16 17:47:26', 1),
(6, 1, 'Custom T-Shirt 1', '#6c1414', '', 230, 390, 145, 250, 'product/6/front_jersey3.png', 'png', 'product/6/back_jersey5.png', 'png', 'product/6/front_svg_34481.svg', 'product/6/back_svg_161966.svg', 1, '2021-02-26 04:25:22', 1),
(7, 1, 'Lacoste T Shirt', '#df2626', '', 514, 543, 145, 265, 'product/7/front_jersey.jpg', 'jpg', 'product/7/back_jersey4.jpg', 'jpg', '', '', 1, '2021-04-06 05:47:50', 0),
(8, 3, 'Cap', '#034f05', '', 250, 100, 122, 245, 'product/8/front_cap.jpg', 'jpg', 'product/8/back_capBack.jpg', 'jpg', '', '', 1, '2021-04-06 05:50:00', 1),
(9, 2, 'TH Mugs', '#4fa5c9', '', 53, 528, 534, 265, 'product/9/front_desk-chair.png', 'png', 'product/9/back_mug.jpg', 'jpg', '', '', 1, '2021-04-06 06:07:10', 0),
(10, 3, 'Cap', '#7e4444', '', 53, 528, 534, 543, 'product/10/front_cap.jpg', 'jpg', 'product/10/back_cap.jpg', 'jpg', '', '', 1, '2021-04-06 06:08:19', 0),
(11, 3, 'Polo Sport T', '#6f1111', '', 53, 543, 534, 265, '', '', '', '', '', '', 1, '2021-04-06 06:17:46', 0),
(12, 3, 'Polo Sport T', '#6f1111', '', 53, 543, 534, 265, 'product/12/front_jersey5.jpg', 'jpg', 'product/12/back_jersey6.jpg', 'jpg', '', '', 1, '2021-04-06 06:19:29', 1),
(13, 2, 'Test', '#9c3030', 'Mega', 181, 652, 122, 895, 'product/13/front_chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 'product/13/back_cb0cacfe6909654f077e0423a3c227ab.jpg', 'jpg', '', '', 1, '2021-04-12 05:30:05', 1),
(14, 4, 'Cust T', '#500707', 'Mega Size', 510, 524, 985, 540, 'product/14/front_cap.jpg', 'jpg', 'product/14/back_bag.jpg', 'jpg', '', '', 1, '2021-04-12 05:31:08', 0),
(15, 3, 'Micheal Jackson', '#fb3246', '', 514, 543, 145, 543, '', '', '', '', '', '', 1, '2021-05-06 12:25:40', 0),
(16, 7, 'MJ Forever', '#7b2323', 'Mega,Mini', 530, 543, 145, 543, 'product/16/front_capBack.jpg', 'jpg', 'product/16/back_cap.jpg', 'jpg', '', '', 1, '2021-05-06 12:53:16', 1),
(17, 1, 'Udta Ghubad', '#7c1818', 'Mega,Mini', 514, 543, 145, 265, 'product/17/front_cap.jpg', 'jpg', 'product/17/back_cb0cacfe6909654f077e0423a3c227ab.jpg', 'jpg', '', '', 1, '2021-05-06 13:23:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_app`
--

CREATE TABLE `fp_product_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `bg_file_path` varchar(200) NOT NULL DEFAULT '',
  `bg_file_extention` varchar(100) NOT NULL DEFAULT '',
  `header_text` varchar(150) DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_app`
--

INSERT INTO `fp_product_app` (`app_id`, `event_id`, `bg_file_path`, `bg_file_extention`, `header_text`, `created_by`, `created_date`, `is_active`) VALUES
(1, 1, 'productApp/1/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 'Create Your Own T-Shirts new', 1, '2021-02-16 09:45:35', 1),
(2, 2, 'productApp/2/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 'Create Your Own T-Shirts 1', 1, '2021-02-16 17:48:32', 1),
(3, 3, 'productApp/3/carrauntoohil-e1454598910940.jpg', 'jpg', 'Chose New Product 8', 1, '2021-02-22 09:17:16', 1),
(5, 2, 'productApp/5/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 'Create Your Own T-Shirts', 1, '2021-04-12 09:06:27', 1),
(6, 6, 'productApp/6/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 'Chose New Product', 1, '2021-05-06 14:33:26', 1),
(7, 5, 'productApp/7/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 'Chose New Product', 1, '2021-05-07 08:41:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_design`
--

CREATE TABLE `fp_product_design` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `print_location` varchar(100) DEFAULT '',
  `product_option` varchar(100) DEFAULT '',
  `gallery_type` varchar(100) DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_design`
--

INSERT INTO `fp_product_design` (`app_id`, `event_id`, `product_id`, `print_location`, `product_option`, `gallery_type`, `created_by`, `created_date`, `is_active`) VALUES
(1, 3, 1, 'both', 'scalable', 'single_gallery', 1, '2021-02-23 12:58:56', 1),
(2, 3, 4, 'back_only', 'non_scalable', 'multiple_gallery', 1, '2021-02-23 12:59:13', 1),
(3, 3, 5, 'both', 'scalable', 'multiple_gallery', 1, '2021-02-23 12:59:28', 1),
(5, 1, 1, 'front_only', 'non_scalable', 'multiple_gallery', 1, '2021-02-23 17:44:57', 1),
(6, 1, 4, 'front_only', 'non_scalable', 'multiple_gallery', 1, '2021-02-23 17:46:49', 1),
(7, 2, 6, 'both', 'scalable', 'multiple_gallery', 1, '2021-02-26 04:29:10', 1),
(8, 2, 4, 'both', 'scalable', 'multiple_gallery', 1, '2021-04-01 14:34:16', 1),
(9, 2, 5, 'both', 'scalable', 'multiple_gallery', 1, '2021-04-01 14:34:19', 1),
(10, 2, 1, 'both', 'scalable', 'single_gallery', 1, '2021-04-01 14:34:23', 1),
(11, 1, 2, 'both', 'scalable', 'single_gallery', 1, '2021-04-14 03:32:05', 1),
(12, 3, 6, 'both', 'scalable', 'multiple_gallery', 1, '2021-04-14 16:02:08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_gallery`
--

CREATE TABLE `fp_product_gallery` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `gallery_id` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_gallery`
--

INSERT INTO `fp_product_gallery` (`id`, `event_id`, `product_id`, `gallery_id`, `created_by`, `created_date`, `is_active`) VALUES
(1, 3, 1, 3, 1, '2021-02-23 12:59:06', 1),
(3, 3, 5, 1, 1, '2021-02-23 12:59:34', 1),
(4, 3, 4, 1, 1, '2021-02-23 15:43:42', 1),
(5, 3, 4, 2, 1, '2021-02-23 15:43:42', 1),
(7, 1, 1, 3, 1, '2021-02-23 17:46:28', 1),
(8, 1, 1, 1, 1, '2021-02-23 17:46:28', 1),
(9, 1, 1, 2, 1, '2021-02-23 17:46:28', 1),
(10, 1, 4, 3, 1, '2021-02-23 17:47:03', 1),
(11, 1, 4, 1, 1, '2021-02-23 17:47:03', 1),
(12, 1, 4, 3, 1, '2021-02-23 17:47:04', 1),
(18, 2, 4, 1, 1, '2021-04-01 14:35:18', 1),
(19, 2, 4, 3, 1, '2021-04-01 14:35:19', 1),
(20, 2, 1, 1, 1, '2021-04-01 14:35:27', 1),
(21, 2, 1, 3, 1, '2021-04-01 14:35:27', 1),
(22, 2, 1, 2, 1, '2021-04-01 14:35:27', 1),
(23, 2, 5, 3, 1, '2021-04-13 14:59:55', 1),
(24, 1, 2, 3, 1, '2021-04-14 03:32:40', 1),
(28, 2, 6, 1, 1, '2021-05-31 09:12:18', 1),
(29, 2, 6, 2, 1, '2021-05-31 09:12:18', 1),
(30, 2, 6, 3, 1, '2021-05-31 09:12:18', 1),
(31, 2, 6, 7, 1, '2021-05-31 09:12:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_selected_app`
--

CREATE TABLE `fp_product_selected_app` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `app_id` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_selected_app`
--

INSERT INTO `fp_product_selected_app` (`id`, `product_id`, `app_id`, `is_active`) VALUES
(10, 4, 4, 1),
(11, 2, 4, 1),
(12, 6, 4, 1),
(13, 4, 1, 1),
(14, 2, 1, 1),
(26, 1, 2, 1),
(27, 4, 2, 1),
(28, 5, 2, 1),
(29, 6, 2, 1),
(43, 6, 3, 1),
(64, 6, 6, 1),
(65, 4, 6, 1),
(66, 5, 6, 1),
(69, 1, 6, 1),
(70, 1, 7, 1),
(71, 6, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_size`
--

CREATE TABLE `fp_product_size` (
  `size_id` int(11) NOT NULL,
  `size` varchar(50) NOT NULL DEFAULT '',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_size`
--

INSERT INTO `fp_product_size` (`size_id`, `size`, `product_id`, `created_by`, `created_date`, `is_active`) VALUES
(7, 'M', 3, 1, '2021-04-06 06:19:29', 1),
(8, 'L', 3, 1, '2021-04-06 06:19:29', 1),
(9, 'XXL', 3, 1, '2021-04-06 06:19:29', 1),
(14, 'M', 6, 1, '2021-04-06 06:19:29', 1),
(15, 'L', 6, 1, '2021-04-06 06:19:29', 1),
(16, 'XL', 7, 1, '2021-04-06 06:19:29', 1),
(21, 'XL', 14, 1, '2021-04-12 05:45:57', 1),
(22, 'M', 14, 1, '2021-04-12 05:45:57', 1),
(34, 'L', 2, 1, '2021-04-14 03:31:39', 1),
(35, 'M', 2, 1, '2021-04-14 03:31:39', 1),
(42, 'XXL', 12, 1, '2021-04-21 04:42:04', 1),
(43, 'L', 12, 1, '2021-04-21 04:42:04', 1),
(44, 'M', 12, 1, '2021-04-21 04:42:04', 1),
(48, 'XL', 4, 1, '2021-04-21 08:01:15', 1),
(49, 'L', 4, 1, '2021-04-21 08:01:15', 1),
(50, 'M', 4, 1, '2021-04-21 08:01:15', 1),
(51, 'XXL', 1, 1, '2021-04-22 04:27:56', 1),
(52, 'L', 1, 1, '2021-04-22 04:27:56', 1),
(53, 'XXL', 15, 1, '2021-05-06 12:25:41', 1),
(54, 'XL', 15, 1, '2021-05-06 12:25:41', 1),
(55, 'XL', 16, 1, '2021-05-06 12:53:16', 1),
(56, 'L', 16, 1, '2021-05-06 12:53:17', 1),
(58, 'XL', 17, 1, '2021-05-06 13:28:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_product_type`
--

CREATE TABLE `fp_product_type` (
  `type_id` int(11) NOT NULL,
  `product` varchar(150) NOT NULL DEFAULT '',
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_product_type`
--

INSERT INTO `fp_product_type` (`type_id`, `product`, `is_active`) VALUES
(1, 'T-Shirt', 1),
(2, 'Coffee Mug', 1),
(3, 'Cap', 1),
(4, 'Shirts', 1),
(5, 'Jeans', 1),
(6, 'Test New 1', 0),
(7, 'Test New 1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_registration`
--

CREATE TABLE `fp_registration` (
  `reg_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(100) NOT NULL DEFAULT '',
  `last_name` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(150) NOT NULL DEFAULT '',
  `contact` double NOT NULL DEFAULT '0',
  `address_1` varchar(250) NOT NULL DEFAULT '',
  `address_2` varchar(250) NOT NULL DEFAULT '',
  `city` varchar(100) NOT NULL DEFAULT '',
  `zip` varchar(50) NOT NULL DEFAULT '',
  `pre_reg` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_registration`
--

INSERT INTO `fp_registration` (`reg_id`, `event_id`, `first_name`, `last_name`, `email`, `contact`, `address_1`, `address_2`, `city`, `zip`, `pre_reg`, `is_active`) VALUES
(1, 1, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '411058', 0, 1),
(2, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(10, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(11, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(12, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(13, 2, 'Omkar', 'Pandit', 'omi@gmail.com', 9855487584, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(14, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(15, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(16, 3, 'Kamlesh', '', 'omi@gmail.com', 9855487584, 'Pune Hadpsar', 'dsa', '', '411058', 0, 1),
(17, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(18, 2, 'Ajay', 'Singh', 'ajay@demo.com', 9588478888, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(19, 2, 'John', 'Miller', 'john@demo.com', 665899578, 'San Jose', '', '', '', 0, 1),
(20, 2, 'John', 'Doe', 'jdoe@demo.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(21, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(22, 5, '', '', '', 0, '', '', '', '', 0, 1),
(23, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(24, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(25, 2, 'Ajay', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(26, 2, 'Jason', 'Roy', 'jason@fp.com', 9800254454, '', '', '', '', 0, 1),
(27, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(28, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(29, 1, 'Ajay', 'Sinha', '', 0, 'Pune', 'Karve Nagar', '', '', 0, 1),
(30, 1, 'Anisha', 'Varma', '', 0, 'Delhi', 'Gandhi Nagar', '', '', 0, 1),
(31, 3, 'Paul', '', 'paul@gmail.com', 874450101, 'new york', '', '', '', 0, 1),
(32, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(33, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(34, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(35, 2, 'Rajesh', 'Vishwakarma', 'rajesh@gmail.com', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(36, 2, 'Karishma', 'Kapoor', 'karishma@ymail.com', 7844511245, 'Mumbai', '', '', '', 0, 1),
(37, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(38, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(39, 2, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(40, 2, 'Ajay', 'Nayar', '', 9855487584, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(41, 1, 'Laxman', 'Apte', '', 0, 'Mumbai', 'Lonavla', '', '', 0, 1),
(42, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(43, 2, 'Vinay', 'Sharma', 'vinay@outlook.com', 9855421111, 'Gandhi road', '', 'Delhi', '', 0, 1),
(44, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(45, 2, 'Shubham', 'Gill', 'shubham@gmail.com', 8895475444, 'lower parel', '', 'mumbai', '', 0, 1),
(46, 2, 'Nilesh', 'Vishwakarma', 'omi@gmail.com', 9855487584, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(47, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(48, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(49, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(50, 3, 'Nilesh', '', 'test@gmail.com', 77777777777, 'test', '', '', '44555', 0, 1),
(51, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(52, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 9588478888, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(53, 1, 'Nilesh', 'Vishwakarma', '', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(54, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 8954574512, 'Pune Hadpsar', '', 'Pune', '', 0, 1),
(57, 2, 'Ajay', 'Rathod', 'ajay@gmail.com', 9800124560, 'Los Vegas USA', '', '', '', 1, 1),
(58, 2, 'kunal', 'kapoor', 'kunal@gmail.com', 3555124001, 'San Jose USA', '', '', '', 1, 1),
(59, 2, 'Kumar', 'Sanu', 'kumar@yahoo.com', 988854744, 'St Petersbug', '', 'OP', '', 0, 1),
(60, 6, 'Ajay', 'Rathod', 'ajay@gmail.com', 9800124560, 'Los Vegas USA', '', '', '', 1, 1),
(61, 6, 'kunal', 'kapoor', 'kunal@gmail.com', 3555124001, 'San Jose USA', '', '', '', 1, 1),
(62, 2, 'Rancho', 'Chan', 'rancho@gmail.com', 0, 'Main Street', '', '', '', 0, 1),
(63, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(64, 2, 'Nilesh', 'Vishwakarma', 'nilesh233@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(65, 2, 'Nilesh', 'Vishwakarma', 'nilesh233@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(66, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(67, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(68, 2, 'Nilesh', 'Vishwakarma', 'john@demo.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(69, 2, 'John', 'Silva', 'john@demo.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(70, 2, 'Yogesh', 'Tambde', 'yogesh@ymail.com', 0, 'Mumbai', '', '', '', 0, 1),
(71, 2, 'Yogita', 'falke', 'yogita@gmail.com', 0, 'tathavade', '', '', '', 0, 1),
(72, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(73, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(74, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1),
(75, 2, 'Nilesh', 'Vishwakarma', 'nilesh@gmail.com', 0, 'Pune Hadpsar', '', '', '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_registration_app`
--

CREATE TABLE `fp_registration_app` (
  `app_id` int(11) NOT NULL,
  `bg_file_path` varchar(150) NOT NULL DEFAULT '',
  `bg_file_extention` text,
  `is_terms_conditions` tinyint(1) NOT NULL DEFAULT '0',
  `header_title` varchar(100) DEFAULT '',
  `terms_conditions` varchar(2000) NOT NULL DEFAULT '',
  `data_collected` tinyint(1) NOT NULL DEFAULT '0',
  `is_first_name` tinyint(1) NOT NULL DEFAULT '0',
  `is_last_name` tinyint(1) NOT NULL DEFAULT '0',
  `is_phone` tinyint(1) NOT NULL DEFAULT '0',
  `is_email` tinyint(1) NOT NULL DEFAULT '0',
  `is_address_1` tinyint(1) NOT NULL DEFAULT '0',
  `is_address_2` tinyint(1) NOT NULL DEFAULT '0',
  `is_city` tinyint(1) NOT NULL DEFAULT '0',
  `is_zip` tinyint(1) NOT NULL DEFAULT '0',
  `button_color` varchar(100) NOT NULL DEFAULT '',
  `button_text` varchar(100) NOT NULL DEFAULT '',
  `event_id` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  `modified_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_registration_app`
--

INSERT INTO `fp_registration_app` (`app_id`, `bg_file_path`, `bg_file_extention`, `is_terms_conditions`, `header_title`, `terms_conditions`, `data_collected`, `is_first_name`, `is_last_name`, `is_phone`, `is_email`, `is_address_1`, `is_address_2`, `is_city`, `is_zip`, `button_color`, `button_text`, `event_id`, `created_by`, `created_date`, `modified_by`, `modified_date`, `is_active`) VALUES
(1, 'registration/1/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '', 'Testing Desc', 0, 1, 1, 0, 0, 1, 1, 0, 0, '#47d798', 'Add Now', 1, 1, '2021-02-09 17:03:25', 1, '2021-02-09 17:03:25', 1),
(2, 'registration/2/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, 'Registration Form', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 0, 1, 1, 0, 1, 1, 0, 0, 0, '#e31c1c', 'Register Now 1', 2, 1, '2021-02-09 17:44:19', 1, '2021-02-09 17:44:19', 1),
(3, 'registration/3/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '', 'Demo Terms & Conditions', 0, 1, 0, 1, 1, 1, 1, 0, 1, '#28e66b', 'Get Started', 3, 1, '2021-02-16 09:36:47', 1, '2021-02-16 09:36:47', 1),
(4, 'registration/4/download (1).jpg', 'jpg', 0, '', '', 1, 0, 0, 0, 0, 0, 0, 0, 0, '#bd2828', 'Register Now', 6, 1, '2021-04-23 11:37:39', 1, '2021-04-23 11:37:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_thank_you_app`
--

CREATE TABLE `fp_thank_you_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `redirect_url` varchar(200) NOT NULL DEFAULT '',
  `is_message` varchar(50) NOT NULL DEFAULT '',
  `message` varchar(300) DEFAULT '',
  `is_pickup_ins` varchar(10) NOT NULL DEFAULT '0',
  `pickup_ins` varchar(200) DEFAULT '',
  `bg_thankyou_file` varchar(200) NOT NULL DEFAULT '',
  `bg_thankyou_ext` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_thank_you_app`
--

INSERT INTO `fp_thank_you_app` (`app_id`, `event_id`, `redirect_url`, `is_message`, `message`, `is_pickup_ins`, `pickup_ins`, `bg_thankyou_file`, `bg_thankyou_ext`, `created_by`, `created_date`, `is_active`) VALUES
(1, 3, 'www.nectarinfotel.com', '1', 'We have modified', '1', 'Pickup Inst', 'thankyou/1/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '2021-03-03 11:02:29', 1),
(3, 2, 'www.nectarinfotel.com', '1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type a', 'thankyou/3/chad-madden-SUTfFCAHV_A-unsplash.jpg', 'jpg', 1, '2021-03-03 12:53:03', 1),
(4, 1, 'www.nectarinfotel.com', '1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', '1', 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text', 'thankyou/4/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-03-04 06:26:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_ui_element_app`
--

CREATE TABLE `fp_ui_element_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `tile_color` varchar(150) NOT NULL DEFAULT '',
  `btn_text_color` varchar(150) NOT NULL DEFAULT '',
  `btn_bg_color` varchar(150) NOT NULL DEFAULT '',
  `popup_box_color` varchar(150) NOT NULL DEFAULT '',
  `sel_highlight` varchar(150) NOT NULL DEFAULT '',
  `body_text_color` varchar(150) NOT NULL DEFAULT '',
  `toggled_color` varchar(150) NOT NULL DEFAULT '',
  `un_toggled_color` varchar(150) NOT NULL DEFAULT '',
  `front_back_toggle` varchar(150) NOT NULL DEFAULT '',
  `header_typeface` varchar(150) DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_ui_element_app`
--

INSERT INTO `fp_ui_element_app` (`app_id`, `event_id`, `tile_color`, `btn_text_color`, `btn_bg_color`, `popup_box_color`, `sel_highlight`, `body_text_color`, `toggled_color`, `un_toggled_color`, `front_back_toggle`, `header_typeface`, `created_by`, `created_date`, `is_active`) VALUES
(1, 1, '#53c7ee', '#43607a', '#3ee0aa', '#fbbd50', '#ecef1f', '#871212', '#152de0', '#72519a', '#24cc40', 'Old English Text MT', 1, '2021-03-04 06:57:51', 1),
(2, 3, '#ec3c3c', '#f5f5f5', '#e1478c', '#9fca4e', '#ad6767', '#36e6f2', '#5e2fca', '#a42323', '#3b1b36', 'Brush Script MT', 1, '2021-03-04 17:39:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fp_welcome_app`
--

CREATE TABLE `fp_welcome_app` (
  `app_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL DEFAULT '0',
  `welcome_title` varchar(150) NOT NULL DEFAULT '',
  `welcome_desc` varchar(500) NOT NULL DEFAULT '',
  `button_text` varchar(100) NOT NULL DEFAULT '',
  `bg_file_path` varchar(150) NOT NULL DEFAULT '',
  `bg_file_extention` varchar(50) NOT NULL DEFAULT '',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_welcome_app`
--

INSERT INTO `fp_welcome_app` (`app_id`, `event_id`, `welcome_title`, `welcome_desc`, `button_text`, `bg_file_path`, `bg_file_extention`, `created_by`, `created_date`, `is_active`) VALUES
(1, 1, 'Merry Christmas', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'Get Started', 'welcome/1/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-02-09 17:02:14', 1),
(3, 2, 'Welcome Friends', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'Get Started New', 'welcome/3/download (2).jpg', 'jpg', 1, '2021-02-09 17:41:37', 1),
(5, 3, 'Welcome', 'Desc', 'Get Started', 'welcome/5/annie-spratt-VDXtVYJVj7A-unsplash.jpg', 'jpg', 1, '2021-02-14 12:25:34', 1),
(6, 6, 'Welcome', 'Hello Everyone!', 'Get Started', 'welcome/6/Event.jpg', 'jpg', 1, '2021-04-23 11:36:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('03a391c2339f73b24e420fe5449663936e371f2cbb44b468cb5167fd86ddd394acadcbbe49537c83', 1, 1, 'MyApp', '[]', 0, '2021-02-02 00:11:25', '2021-02-02 00:11:25', '2022-02-02 05:41:25'),
('05cabbc9a60143076527764d7f5c10c19c87e984a12525115d17619e7e37f0a7750ba8ad1f6c8cba', 1, 1, 'MyApp', '[]', 0, '2021-01-25 05:48:28', '2021-01-25 05:48:28', '2022-01-25 11:18:28'),
('118aa47612889508637bc70f9f32a553be469e5df16ea98393a20e41a47bb256f96bdf4b6930a332', 1, 1, 'MyApp', '[]', 0, '2021-02-02 00:11:07', '2021-02-02 00:11:07', '2022-02-02 05:41:07'),
('148ffbfdad276711e0862e4b9ebc60e3e97478e0fc2fe3bed85afb1d6e14f4167693894aaa55db72', 1, 1, 'MyApp', '[]', 0, '2021-04-03 23:38:08', '2021-04-03 23:38:08', '2022-04-04 05:08:08'),
('1564d0a4caf296c4abf35b0b47d14f9a3520ca0c4f2eae0ca3a2759acb466aaa99f4af9d85c5553e', 4, 1, 'MyApp', '[]', 0, '2021-02-04 06:19:55', '2021-02-04 06:19:55', '2022-02-04 11:49:55'),
('1595c95fb8d000bb4ec0d47d79584430b62552c08fcee9b53e5c27e4498b8404092720d65d37d043', 1, 1, 'MyApp', '[]', 0, '2021-02-02 02:11:49', '2021-02-02 02:11:49', '2022-02-02 07:41:49'),
('174dc4c780dd0e04b63f38775bedb76e21a24985b827e95b0c6ef48839ff77f2b99f0d5c4b95d119', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:36:27', '2021-01-26 00:36:27', '2022-01-26 06:06:27'),
('17d7d35f56bb0fd24f11d534dd11f15bee41e7ce3e63b0143c92f9876cb32a93ae54702fff12e5ea', 1, 1, 'MyApp', '[]', 0, '2021-02-02 11:19:25', '2021-02-02 11:19:25', '2022-02-02 16:49:25'),
('1bec48ab1a7dbd90e17a9f18df691a666a898fc2b88eca362e27b8e8c08ae6062b28c9813bcf82fd', 1, 1, 'MyApp', '[]', 0, '2021-02-10 23:49:17', '2021-02-10 23:49:17', '2022-02-11 05:19:17'),
('22d26a70fa5c572a2e9767f5a5dfa3eca675f579342fcd164c6ca75f5a28889593e5fac31bdc99bb', 1, 1, 'MyApp', '[]', 0, '2021-02-08 19:52:10', '2021-02-08 19:52:10', '2022-02-09 01:22:10'),
('237a034f88479f0439027ec57d9cc947e58a5746b12eab650d621ee53ac466c5d74675ac2c688952', 1, 1, 'MyApp', '[]', 0, '2021-03-03 00:55:55', '2021-03-03 00:55:55', '2022-03-03 06:25:55'),
('2693d380d802b7407be649e16cba43474735669466087e97324e02ea6369c196fe5424c15ea935ce', 1, 1, 'MyApp', '[]', 0, '2021-02-23 00:50:47', '2021-02-23 00:50:47', '2022-02-23 06:20:47'),
('27b5dea52faf9f82f2d3019d2f90326e5a1c367f9d64a46f9fb41b56b706e54f730f6cf9028f454d', 1, 1, 'MyApp', '[]', 0, '2021-02-08 07:46:02', '2021-02-08 07:46:02', '2022-02-08 13:16:02'),
('2a013b8ac3504e1d22864da1909a2c90f244a0aa6812c6b2664371fcc5fd0d3389cbafe7fe217976', 1, 1, 'MyApp', '[]', 0, '2021-02-02 03:35:03', '2021-02-02 03:35:03', '2022-02-02 09:05:03'),
('2ac18dce848719994b866f2ea779c597d01f5ab17a3be2f0e6303c371c55a05c961242bf24a3fea0', 1, 1, 'MyApp', '[]', 0, '2021-01-31 06:26:14', '2021-01-31 06:26:14', '2022-01-31 11:56:14'),
('2b98576f7efe07a9ac08f135ec19bc2dfc0412fcc4cfec7b57e6c6851878b9e3834502b43aed64dc', 1, 1, 'MyApp', '[]', 0, '2021-02-02 03:36:28', '2021-02-02 03:36:28', '2022-02-02 09:06:28'),
('2c455bc9089a6746df53f354383b308d28fb5d217303f48e9b2742272585390340d061a403d685ed', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:45:42', '2021-01-25 06:45:42', '2022-01-25 12:15:42'),
('30cf9be0823a9ecc5e194b85acec0942d354bed1e11f0ccf2c6137a2ea722272798a33d3853e3138', 1, 1, 'MyApp', '[]', 0, '2021-04-08 23:02:56', '2021-04-08 23:02:56', '2022-04-09 04:32:56'),
('315d5a51f36911d351f888ecf328c767ad7decdf341fbd901d650766ab5b56d58d62d73bfd04f2ab', 1, 1, 'MyApp', '[]', 0, '2021-02-06 23:37:13', '2021-02-06 23:37:13', '2022-02-07 05:07:13'),
('36b5992ff30dd1321161d91346d752c22998ccffc18b173c3fb1e806516a0bb29d583b015dad20f2', 1, 1, 'MyApp', '[]', 0, '2021-04-04 22:17:45', '2021-04-04 22:17:45', '2022-04-05 03:47:45'),
('37ab445ca4bc6ce877f6d9cce77f0910dbec975cbcbd2e58a7a5309fb4d7c0c8d7991a72eddd28d6', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:10:43', '2021-01-25 06:10:43', '2022-01-25 11:40:43'),
('37c816b5fea5a54e8563646c86ef534cac25be4174c3ee9f3da7de62847dbbe4b085b0f9bc0633d7', 1, 1, 'MyApp', '[]', 0, '2021-02-05 03:26:19', '2021-02-05 03:26:19', '2022-02-05 08:56:19'),
('37d102f7acd679d896ccc26188a94f5ff212ad3e300389203113234636cb5d027118380f22324011', 1, 1, 'MyApp', '[]', 0, '2021-02-06 23:14:34', '2021-02-06 23:14:34', '2022-02-07 04:44:34'),
('3ae40e9508af9d75038daca475f186aa7c2b5dbe0cb74666d204863b069db12559c6d7a805350636', 1, 1, 'MyApp', '[]', 0, '2021-01-27 03:47:51', '2021-01-27 03:47:51', '2022-01-27 09:17:51'),
('3e2584b6021f94c7e1a54652ac75fd866ca9a6b581752ab8d3b43932f8af0a0a51ea60fb3263823b', 1, 1, 'MyApp', '[]', 0, '2021-02-04 11:15:42', '2021-02-04 11:15:42', '2022-02-04 16:45:42'),
('400667ab9c7a733368a4ff4483de00bb6ea4402fc72d6ef22cd69e5bc46dd7e6773b1c6a573d32d5', 1, 1, 'MyApp', '[]', 0, '2021-01-25 04:12:41', '2021-01-25 04:12:41', '2022-01-25 09:42:41'),
('409fdb499237bcd7bf99673718af0981d3cf91b585522259619ad7b414e3c40cdf25c9bd71c60a93', 1, 1, 'MyApp', '[]', 0, '2021-04-14 11:10:20', '2021-04-14 11:10:20', '2022-04-14 16:40:20'),
('41b27e70ae0da6aba0e3a5f6d5dd39cb02cfb21cfb5592fe374a9808ae364aceff4d3494549d9cff', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:41:12', '2021-01-25 06:41:12', '2022-01-25 12:11:12'),
('42db7f21b97eec1fc3cde7e75ee24edecd05431e94e7b43479b0fd44d46b5c41779927bbdedbdb8c', 1, 1, 'MyApp', '[]', 0, '2021-05-10 22:50:05', '2021-05-10 22:50:05', '2022-05-11 04:20:05'),
('439bc6e7ab1d4ac87635d190b4fabfeb0366a92d3f04936f14309714daab3729f681796d6fad8cc6', 1, 1, 'MyApp', '[]', 0, '2021-01-28 12:08:11', '2021-01-28 12:08:11', '2022-01-28 17:38:11'),
('4a275fbbd0aa11bc44eb83d0ccb563afb80852b6779269c754a3376d5cee81c6f45ebd14e5be8fc9', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:35:13', '2021-01-25 06:35:13', '2022-01-25 12:05:13'),
('4af9bc09b5eab4072fc02183dbe9863c0efde8b2739a1d4a104304ca235d9445a53b6d0a62522fa9', 1, 1, 'MyApp', '[]', 0, '2021-05-30 23:18:15', '2021-05-30 23:18:15', '2022-05-31 04:48:15'),
('538ba3c6279c44eb2e29915d2998b105b490b0a6c5c75553d52570b142b53a309af6aa1993c625f4', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:35:32', '2021-01-26 00:35:32', '2022-01-26 06:05:32'),
('583fce17861f6245251e039f3ec0b523f7c3cc765a986574a07bb6aea84a5b03596eee7492b871ce', 1, 1, 'MyApp', '[]', 0, '2021-01-25 05:28:43', '2021-01-25 05:28:43', '2022-01-25 10:58:43'),
('5877666e2a64c3e9ca8d0bf3299c06aa48a3fd673517f7c8f48206e56b8f9d95c96865dc70b464f3', 1, 1, 'MyApp', '[]', 0, '2021-02-23 00:50:46', '2021-02-23 00:50:46', '2022-02-23 06:20:46'),
('59bd7d19db4fb81140e95d48c8644e3b4c184d500cc72246d9266b9bf30d764ecc1b4877cd88dd3b', 9, 1, 'MyApp', '[]', 0, '2021-04-14 11:08:15', '2021-04-14 11:08:15', '2022-04-14 16:38:15'),
('5aa56da7e15385e3a5bb21da911eb3af421304e46946c6b10dc086d98bf1a879516e0f889be56126', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:42:13', '2021-01-25 06:42:13', '2022-01-25 12:12:13'),
('5ead45557986cc89c3a0d4e2b547ee089e222338bf5946564bdb0c0ed27dcf850d158b31c384cc6c', 1, 1, 'MyApp', '[]', 0, '2021-04-01 23:24:37', '2021-04-01 23:24:37', '2022-04-02 04:54:37'),
('5fc415000c74659aee5bef215d7c309d490d463532668c3ced835a60f182b9ce32ea99e9bbf3bf50', 1, 1, 'MyApp', '[]', 0, '2021-05-25 09:43:29', '2021-05-25 09:43:29', '2022-05-25 15:13:29'),
('6370208eb7a5ab09ca940dbe528b37d12a6090cc6b81ebe767cf38413c53f7fcc85c3c6e3ecda20f', 1, 1, 'MyApp', '[]', 0, '2021-03-19 01:09:37', '2021-03-19 01:09:37', '2022-03-19 06:39:37'),
('6600a823f79ce5508f5e41aa8357db344d53bce70c72edf8d57c35414eb4197b6e0fcc1c33c33e7a', 1, 1, 'MyApp', '[]', 0, '2021-02-04 06:20:10', '2021-02-04 06:20:10', '2022-02-04 11:50:10'),
('6a0cf00dcba14966ec68d9155a229799a76000033acc976d2683004e24125dde3318082e109ffc28', 1, 1, 'MyApp', '[]', 0, '2021-02-02 11:10:11', '2021-02-02 11:10:11', '2022-02-02 16:40:11'),
('6cee20ef4b055b30abaccadb9a4220e10758d09cfab86ee696f5329be0835d68787a56ede7b19fe8', 1, 1, 'MyApp', '[]', 0, '2021-02-04 06:18:18', '2021-02-04 06:18:18', '2022-02-04 11:48:18'),
('7033f3b7b0bfa56bbb9ce4dbbd7ee948e6f249c353996a3b8b7d465da9cb7c10b75e4165b8000e82', 1, 1, 'MyApp', '[]', 0, '2021-03-07 20:39:53', '2021-03-07 20:39:53', '2022-03-08 02:09:53'),
('72311b8b1dce908a81a45fee4103c00bd14c5b26f4d7a5ff791c772582b7b21298b27a76bcf96cfe', 1, 1, 'MyApp', '[]', 0, '2021-05-18 00:23:58', '2021-05-18 00:23:58', '2022-05-18 05:53:58'),
('7577442da98ffe151dfcbf2c5e9dcfb2a453c72462130c45bb5e5da7b7e8cc46243cc79e632d1112', 1, 1, 'MyApp', '[]', 0, '2021-02-02 07:51:29', '2021-02-02 07:51:29', '2022-02-02 13:21:29'),
('76a5d8f129eb008de3478518b43370b0eaff4e78ab6a4379afdf73e0b4d7e9ffa4664efb408fe84c', 1, 1, 'MyApp', '[]', 0, '2021-01-27 23:06:43', '2021-01-27 23:06:43', '2022-01-28 04:36:43'),
('76da2a928a6da315017faa96549a306c4bb6436cf9c24ce01d32874f46840b6e704e9d5b0bfb1554', 1, 1, 'MyApp', '[]', 0, '2021-04-13 21:41:07', '2021-04-13 21:41:07', '2022-04-14 03:11:07'),
('787cccaccdc7d0b261670dbdbd0b3bfb2b2f3acbde92ab8db7fa78793533583405d6b245e09ca09b', 1, 1, 'MyApp', '[]', 0, '2021-04-01 23:07:42', '2021-04-01 23:07:42', '2022-04-02 04:37:42'),
('78e9e4bc1c91df6c86c498cba3bcd4cf62ef7be4d92375a86ffc0fe5a50dad32793c1829b27f7b21', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:35:33', '2021-01-26 00:35:33', '2022-01-26 06:05:33'),
('7a315e650955b094288255c9732d996350e722e101e0bed170c9abf89f2266bb0e068de6aa87e40f', 1, 1, 'MyApp', '[]', 0, '2021-03-30 05:01:22', '2021-03-30 05:01:22', '2022-03-30 10:31:22'),
('7b2b569cf206fc4e95315296c39cb66dbccefcbed09af2235ea7461f2f373d48d3d4cb7ea0b4aad6', 1, 1, 'MyApp', '[]', 0, '2021-05-18 00:24:01', '2021-05-18 00:24:01', '2022-05-18 05:54:01'),
('832f8a2d36143b685ce9c0e3e20fdab809e770150c8c675457cc9f68457423d19d84870480601622', 1, 1, 'MyApp', '[]', 0, '2021-01-26 01:14:37', '2021-01-26 01:14:37', '2022-01-26 06:44:37'),
('8508b32c4f1023277e713731d5ebb3e9d2b88c621a6c4a60b432b07990e8b7c94a2964a409c4f098', 1, 1, 'MyApp', '[]', 0, '2021-04-01 09:50:38', '2021-04-01 09:50:38', '2022-04-01 15:20:38'),
('87196cc43c528e45da2e12b9e717beb791a67eafab78f420ff3bbb6b8a2de7e732728695f95d899d', 1, 1, 'MyApp', '[]', 0, '2021-01-27 02:55:19', '2021-01-27 02:55:19', '2022-01-27 08:25:19'),
('87a6f7e2f0699dc31ba0bb103ca8a1e53bd88bf49f5ff82aea5daf6a7644ae603c7d4c7e99347ba0', 1, 1, 'MyApp', '[]', 0, '2021-04-22 01:55:27', '2021-04-22 01:55:27', '2022-04-22 07:25:27'),
('88b24057b3a48c4ed9aea638042f3d008189e603d4ab71e3d16ed1193589478ac7fc9c014ec589d5', 1, 1, 'MyApp', '[]', 0, '2021-02-11 00:08:06', '2021-02-11 00:08:06', '2022-02-11 05:38:06'),
('8b2d54e4fadc995dd4b561c2553347655d7a6f255902599ff671b98359ebbc0f11b9005ceda96fd6', 1, 1, 'MyApp', '[]', 0, '2021-02-04 12:08:34', '2021-02-04 12:08:34', '2022-02-04 17:38:34'),
('8c7054635c1cd7d49d67918096c9d01e3ce1d701031ea53d290811d7650d7b796838e52a27c56178', 1, 1, 'MyApp', '[]', 0, '2021-01-26 22:58:50', '2021-01-26 22:58:50', '2022-01-27 04:28:50'),
('8d9f7cb5314fe0159b4ad56fa24fcafdcc178bff9100594df3150fbad213f9e1db77b1682699e4e9', 4, 1, 'MyApp', '[]', 0, '2021-02-04 12:07:59', '2021-02-04 12:07:59', '2022-02-04 17:37:59'),
('8eaf4bbce4a49b217f82401e7e4346706704a2b894b6ad27d1f30ece101b531d3c30a8e5921bd3c9', 1, 1, 'MyApp', '[]', 0, '2021-02-04 05:09:20', '2021-02-04 05:09:20', '2022-02-04 10:39:20'),
('90566ec2bd78d33ee6d3439336085a7390bbeef8b3727c1b55b84390800e9a11756de54eee2635d0', 1, 1, 'MyApp', '[]', 0, '2021-01-28 00:33:16', '2021-01-28 00:33:16', '2022-01-28 06:03:16'),
('927d663cbac9b39ef2a7ee9049e46d9bada232af64bd318cde99a9453022e10d3ea4d631cce7af04', 1, 1, 'MyApp', '[]', 0, '2021-02-08 19:52:08', '2021-02-08 19:52:08', '2022-02-09 01:22:08'),
('93e147bf7b82090d5e89deda91a10965a460981f8be41960ec39a0237c07546a96a1f9ab12f21914', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:35:28', '2021-01-26 00:35:28', '2022-01-26 06:05:28'),
('966e462c89b792e25a355d2c1721b32d8760aba744ff6fb4b3faafb6de4bb6c84d9a7d54f766805d', 1, 1, 'MyApp', '[]', 0, '2021-01-28 00:33:38', '2021-01-28 00:33:38', '2022-01-28 06:03:38'),
('978eac06820f531e428f12d18cb7088967b7853a0dc061d599bff20afe49b5f82b4006131cff338e', 9, 1, 'MyApp', '[]', 0, '2021-04-13 21:40:53', '2021-04-13 21:40:53', '2022-04-14 03:10:53'),
('97c57071ec3539f519891385e68b8f5f4530e76df25b89c5e9b5e5d00d179c1d0492cfa4e19cd3a9', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:52:50', '2021-01-26 00:52:50', '2022-01-26 06:22:50'),
('99a717978951935c25e68bd5f46b47f1821099efb3822a5793cc0919b83fbcbb535e00239345c956', 1, 1, 'MyApp', '[]', 0, '2021-03-07 22:54:39', '2021-03-07 22:54:39', '2022-03-08 04:24:39'),
('9cfc3b035ac7cfa06bcaab5e0dd0b83ac5785ceafff8af66a6bf26a6e09892d0dc1a3ca300d277c0', 1, 1, 'MyApp', '[]', 0, '2021-02-02 03:32:57', '2021-02-02 03:32:57', '2022-02-02 09:02:57'),
('9ee8eba86832465c351329bdf5f1104243a3d5c65b94c9bd34358c5553cc8aad3e8563c2bb55f34f', 1, 1, 'MyApp', '[]', 0, '2021-02-23 00:50:43', '2021-02-23 00:50:43', '2022-02-23 06:20:43'),
('a7f501f9fbd15af2755589050b8dfe3028873286ece2fa0345900e9fa5fbc8ff50bf9bf8875e8ad9', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:32:39', '2021-01-25 06:32:39', '2022-01-25 12:02:39'),
('a84a3f3acce98ff2b1f4cc64cbdcc7a4620b6628b32b2c7b54e829d757b5edb9ca5d2ea6e295aacd', 10, 1, 'MyApp', '[]', 0, '2021-04-14 11:08:49', '2021-04-14 11:08:49', '2022-04-14 16:38:49'),
('ac20b25c913b7da2e349ac27d87eb1b8ffd0e9358594b82fb420a722e5a9e2e2e55652cd1acbf6fa', 9, 1, 'MyApp', '[]', 0, '2021-04-13 21:32:11', '2021-04-13 21:32:11', '2022-04-14 03:02:11'),
('ad7604f3b96b5fb4485d960722d7e43f9090208df3665831c8a41560eef32fa4b21bc36bc0ef58c9', 1, 1, 'MyApp', '[]', 0, '2021-01-25 05:29:17', '2021-01-25 05:29:17', '2022-01-25 10:59:17'),
('ae177a1fbd3f75ba61fde31eedb616ca7e0d34c2f2f0f9ae99a1bc166b86a4a3d1161f314496f3cb', 1, 1, 'MyApp', '[]', 0, '2021-03-30 05:01:19', '2021-03-30 05:01:19', '2022-03-30 10:31:19'),
('b3075604ea4d906f7bf2b57e124f2bbfdd0e6279dc52c75b288177cfef07c5850ac76e4c2eed057f', 8, 1, 'MyApp', '[]', 0, '2021-02-02 12:16:17', '2021-02-02 12:16:17', '2022-02-02 17:46:17'),
('b5074d48afa9dd4e81b793a92733f8e1023f8086b4093bcd1818531d2e18c95639e1b446b4504d91', 2, 1, 'MyApp', '[]', 0, '2021-02-02 07:51:09', '2021-02-02 07:51:09', '2022-02-02 13:21:09'),
('bad66f28a161e0ff603bbfecab4295256360049ab375ed25bb5387121e1cdda9ca7f3ba7f96c958b', 1, 1, 'MyApp', '[]', 0, '2021-05-30 23:18:12', '2021-05-30 23:18:12', '2022-05-31 04:48:12'),
('c288162c767c9ea4e36399680a9663904499cbbce057e37691c038443bde93ed860734837f5be165', 1, 1, 'MyApp', '[]', 0, '2021-01-28 04:28:38', '2021-01-28 04:28:38', '2022-01-28 09:58:38'),
('c2923c59d8f0e8ea2bf83a1b1fdd70745a845a84648c6c81b3cbe8200d036460712ad41a8ebfbab9', 1, 1, 'MyApp', '[]', 0, '2021-04-22 01:55:30', '2021-04-22 01:55:30', '2022-04-22 07:25:30'),
('c359f4416334ebc24b7b2abb9ab9326299009a26efcfd9549a8cca9acea242162c5bb8f2b3989c2c', 1, 1, 'MyApp', '[]', 0, '2021-01-28 22:27:43', '2021-01-28 22:27:43', '2022-01-29 03:57:43'),
('cbd46c15a085a09fce4f1c1b9df4008c9fcd3a2a10819c2ab16f2705a9dcb2280b43373e85ef3942', 1, 1, 'MyApp', '[]', 0, '2021-01-25 05:29:50', '2021-01-25 05:29:50', '2022-01-25 10:59:50'),
('ccabc3a281fcb3fc790e6c14efe33dee5eb7b8a5ee2b9b562bb0700c04b2ab09b3204843237c509d', 1, 1, 'MyApp', '[]', 0, '2021-03-06 12:07:08', '2021-03-06 12:07:08', '2022-03-06 17:37:08'),
('cd32a5acd4484ee44d9192d4cc8095242b9b964e8d8202bc2e9ab171f899f375d333f39f7ed20d24', 1, 1, 'MyApp', '[]', 0, '2021-02-04 02:02:59', '2021-02-04 02:02:59', '2022-02-04 07:32:59'),
('ceb558420a3cec39421cb57224782dd8dbb6749ca2aeca30f57d256418464d0ff3070439c35a4b98', 1, 1, 'MyApp', '[]', 0, '2021-02-05 03:26:21', '2021-02-05 03:26:21', '2022-02-05 08:56:21'),
('d019521d01ced3664b268d78d340b7840827cb6d1d83289971140cc7fbe7171409ca3bdcb3d06e64', 1, 1, 'MyApp', '[]', 0, '2021-04-13 21:32:39', '2021-04-13 21:32:39', '2022-04-14 03:02:39'),
('d4ecaa4415bb2db1cf50ec7b625413e2744f944b2f137d0c41a1b0459ed8b4eba3ef52fdae9b53b3', 1, 1, 'MyApp', '[]', 0, '2021-01-27 03:46:59', '2021-01-27 03:46:59', '2022-01-27 09:16:59'),
('d88e770a86a7a8b118321d5db435156146ab5f475018cf6a6743214f0c44646c0cf145eeacac268a', 1, 1, 'MyApp', '[]', 0, '2021-05-11 01:56:10', '2021-05-11 01:56:10', '2022-05-11 07:26:10'),
('de6dcc0c079389b85aa53cc001ab97ec8353cd6632827a30306ed5cc3196cbeb505194a276c76494', 1, 1, 'MyApp', '[]', 0, '2021-01-28 00:40:42', '2021-01-28 00:40:42', '2022-01-28 06:10:42'),
('dfe9337243c5602f0e1f4e98c149a6e8b463cbcc6a319f70f764bf38ffd21c16e68ca2d69a60ce45', 1, 1, 'MyApp', '[]', 0, '2021-04-01 23:23:39', '2021-04-01 23:23:39', '2022-04-02 04:53:39'),
('e335075cfd2bcb57297d69cbc6a867931febf07db1d70bfc5b9e89e6a11006421cc56dfe580fdec8', 1, 1, 'MyApp', '[]', 0, '2021-01-26 01:09:57', '2021-01-26 01:09:57', '2022-01-26 06:39:57'),
('e4936be8c5e62ceb55b9a8c78357110145a1daa1f0ba397d186d15472caa3f111fb3235c6d725dd4', 1, 1, 'MyApp', '[]', 0, '2021-01-31 06:26:17', '2021-01-31 06:26:17', '2022-01-31 11:56:17'),
('e563378ef501b2ceffd90fdc4b587f7a71644335145a2aee91de1c2e158af7c02a7ed5012861089c', 1, 1, 'MyApp', '[]', 0, '2021-01-28 11:22:43', '2021-01-28 11:22:43', '2022-01-28 16:52:43'),
('e6128792d16e83484cb468c5cdcb526ae755f235eecaddfa977c860b9b8f6e2d5fa52a1f4080d49f', 1, 1, 'MyApp', '[]', 0, '2021-02-02 02:08:49', '2021-02-02 02:08:49', '2022-02-02 07:38:49'),
('e6d78cb12446844f34d33ab82a5866b7988359ce589c42d7105223bfde9e22676dfcbc55229212bf', 1, 1, 'MyApp', '[]', 0, '2021-03-19 00:04:19', '2021-03-19 00:04:19', '2022-03-19 05:34:19'),
('e6e456bccc1e7371baf813cf9d18433ec818ecc564adeda386e8c368bb81883e5bce308afb7680cf', 1, 1, 'MyApp', '[]', 0, '2021-01-25 06:37:44', '2021-01-25 06:37:44', '2022-01-25 12:07:44'),
('e797fc4593a66323f2741ec513cd0b3cd3babed8db801752ba87b645b5ca894829856318c78b5949', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:35:56', '2021-01-26 00:35:56', '2022-01-26 06:05:56'),
('e94db090722ea5c81c3e4d5924ae253a7b7c3f1f08486700231342154a69a53baeeee7ff4f3ac590', 4, 1, 'MyApp', '[]', 0, '2021-02-04 11:15:21', '2021-02-04 11:15:21', '2022-02-04 16:45:21'),
('ea085bc0910e252747b9ef03635e32590b299ab45ecc4fe9ca248d465f719a396829ce66e9fb8c80', 1, 1, 'MyApp', '[]', 0, '2021-04-22 01:55:29', '2021-04-22 01:55:29', '2022-04-22 07:25:29'),
('ef2ef3e3a41fb4c45b0784f56244b9c353ac2dde5bcd22602773a24e093ec26fb9128340b24c5c0b', 1, 1, 'MyApp', '[]', 0, '2021-02-02 03:33:31', '2021-02-02 03:33:31', '2022-02-02 09:03:31'),
('f077d4ed2410217acec44da4289ef9b0136425f5ef5b18f487e992c4731efe32b8bf8746536d9fe1', 1, 1, 'MyApp', '[]', 0, '2021-03-19 01:42:37', '2021-03-19 01:42:37', '2022-03-19 07:12:37'),
('f14258f92135f4d5c20e83f65e38e9370f537ab177283e74d8991606529187b6ffe8364c52853e78', 10, 1, 'MyApp', '[]', 0, '2021-04-13 21:33:20', '2021-04-13 21:33:20', '2022-04-14 03:03:20'),
('f41ee856f9a1878e7182c35f8704293eaa2e1932664fcbf8a9f328108c85ccb33e274f8eb35f76e4', 1, 1, 'MyApp', '[]', 0, '2021-03-22 04:02:24', '2021-03-22 04:02:24', '2022-03-22 09:32:24'),
('f9be79db002662fa125134eddf9311428beb14a3ae9dbebdb7590ba5277761cfbc9c95770087ce51', 4, 1, 'MyApp', '[]', 0, '2021-02-04 06:18:03', '2021-02-04 06:18:03', '2022-02-04 11:48:03'),
('fb9c085cf6fd588ad7738867fac759a15e478da99db07e24b8d17c570464d2f439405154af2d2d81', 1, 1, 'MyApp', '[]', 0, '2021-02-02 12:03:28', '2021-02-02 12:03:28', '2022-02-02 17:33:28'),
('fca8068424551e969388f6c604a073eb0c880e8e209af634f44633a27a519ffceaa22621a27cb728', 1, 1, 'MyApp', '[]', 0, '2021-01-26 00:53:52', '2021-01-26 00:53:52', '2022-01-26 06:23:52'),
('fef1eb1e691a2fd36eccf372b539a8e834e290a17b0c0aa868a173fa9b5ba2a7c0d54b47bfe3fd65', 1, 1, 'MyApp', '[]', 0, '2021-01-29 06:29:38', '2021-01-29 06:29:38', '2022-01-29 11:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'W8FpEO0H51QKDLXXLwtQL8OJA8S6BpfdMgBpcSOK', NULL, 'http://localhost', 1, 0, 0, '2021-01-25 04:07:15', '2021-01-25 04:07:15'),
(2, NULL, 'Laravel Password Grant Client', 'g6mPVDaSguY6IXx1LnlbtBxMNo7qGKfEMowCxEiD', 'users', 'http://localhost', 0, 1, 0, '2021-01-25 04:07:15', '2021-01-25 04:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-01-25 04:07:15', '2021-01-25 04:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT '0' COMMENT '(Default:0,admin:1,Executive:2, Manager:3,Staff:4)',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contact` double DEFAULT '0',
  `location` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `user_type`, `username`, `contact`, `location`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `created_by`, `is_active`) VALUES
(1, 'admin', 'admin@demo.com', 1, 'admin', 88547541, 'California', NULL, '$2y$12$pQGex4/SiHgAoOusS0bBI.6Fi16RfMnz4j4fo3B8EPUf2fdgNasum', NULL, NULL, NULL, 0, 1),
(2, 'Bill Gates', 'nilesh.vishwakarma@nectarinfotel.com', 2, 'executive1', 32544588, 'Berlin', NULL, '$2y$12$pQGex4/SiHgAoOusS0bBI.6Fi16RfMnz4j4fo3B8EPUf2fdgNasum', NULL, NULL, '2021-04-10 03:04:18', 0, 1),
(3, 'Dietrich Mateschitz', 'nilesh.vishwakarma@nectarinfotel.com', 2, 'executive2', 36554787, 'California', NULL, '$2y$12$pQGex4/SiHgAoOusS0bBI.6Fi16RfMnz4j4fo3B8EPUf2fdgNasum', NULL, NULL, '2021-04-10 03:04:37', 0, 1),
(4, 'nilesh', 'nilesh11@gmail.com', 4, 'nilesh_11', 250014000, 'Pune Warje', NULL, '$2y$12$pQGex4/SiHgAoOusS0bBI.6Fi16RfMnz4j4fo3B8EPUf2fdgNasum', NULL, '2021-01-31 06:47:30', '2021-04-17 05:20:43', 1, 1),
(5, 'John Cena', 'john.brasc44o@demo.com', 3, 'John', 83213131312, 'Los Vegas', NULL, '$2y$10$7HLewGXcbgv6tsqCcm8A4u2BQWoVkfwekVzxKQZHP.CTTSERJeMHO', NULL, '2021-01-31 06:55:20', '2021-04-10 02:56:48', 1, 1),
(6, 'Donie', 'donie@gmail.com', 1, 'donie', 64676464644, 'New York', NULL, '$2y$10$.zCybOo.p7kogSdwmPDhOuK7Yb5S2iBK0e8B16STgqWxQvjzTQ0yK', NULL, '2021-01-31 07:03:28', '2021-02-02 01:36:11', 1, 0),
(7, 'adam', 'adam@outlook.com', 4, 'adam', 20124557, 'san jose', NULL, '$2y$10$ZEjNePJsavjyMBTRKfy3l.NM4N2HTxCaSZOYClXsSEajTGM.QItDG', NULL, '2021-02-02 01:48:09', '2021-02-02 12:15:34', 1, 0),
(8, 'alex', 'alex@gmail.com', 1, 'alex', 85475455842, 'new york', NULL, '$2y$10$ZuBrn8ey5vO.WiZrirW1JeZMNGpzILHN5YnOXRAd.PqbpmehYoiw2', NULL, '2021-02-02 12:14:54', '2021-04-17 05:21:01', 1, 0),
(9, 'manager', 'manager@gmail.com', 3, 'manager', 8955475455, 'Pune', NULL, '$2y$10$cc28/o5Ixa2YnUTM7o7/Y.3dW5.VEUgy2FPrU20cr2Ldo2jzQxU6q', NULL, '2021-04-13 21:31:49', '2021-04-13 21:31:49', 1, 1),
(10, 'staff', 'staff@gmail.com', 4, 'staff', 234444335, 'Pune', NULL, '$2y$10$G60DGwm2q6Y0CYnSqspjku1WAl7kuyIASLwvzbv3zjRDfv1YHe24C', NULL, '2021-04-13 21:33:08', '2021-04-13 21:33:08', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fp_artwork`
--
ALTER TABLE `fp_artwork`
  ADD PRIMARY KEY (`artwork_id`);

--
-- Indexes for table `fp_event`
--
ALTER TABLE `fp_event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `fp_event_executive`
--
ALTER TABLE `fp_event_executive`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fp_event_type`
--
ALTER TABLE `fp_event_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `fp_gallery`
--
ALTER TABLE `fp_gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `fp_landing_app`
--
ALTER TABLE `fp_landing_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_orders`
--
ALTER TABLE `fp_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `fp_preview_app`
--
ALTER TABLE `fp_preview_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_print_fonts`
--
ALTER TABLE `fp_print_fonts`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_print_prop`
--
ALTER TABLE `fp_print_prop`
  ADD PRIMARY KEY (`prop_id`);

--
-- Indexes for table `fp_product`
--
ALTER TABLE `fp_product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `fp_product_app`
--
ALTER TABLE `fp_product_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_product_design`
--
ALTER TABLE `fp_product_design`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_product_gallery`
--
ALTER TABLE `fp_product_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fp_product_selected_app`
--
ALTER TABLE `fp_product_selected_app`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fp_product_size`
--
ALTER TABLE `fp_product_size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `fp_product_type`
--
ALTER TABLE `fp_product_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `fp_registration`
--
ALTER TABLE `fp_registration`
  ADD PRIMARY KEY (`reg_id`);

--
-- Indexes for table `fp_registration_app`
--
ALTER TABLE `fp_registration_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_thank_you_app`
--
ALTER TABLE `fp_thank_you_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_ui_element_app`
--
ALTER TABLE `fp_ui_element_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `fp_welcome_app`
--
ALTER TABLE `fp_welcome_app`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fp_artwork`
--
ALTER TABLE `fp_artwork`
  MODIFY `artwork_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `fp_event`
--
ALTER TABLE `fp_event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fp_event_executive`
--
ALTER TABLE `fp_event_executive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fp_event_type`
--
ALTER TABLE `fp_event_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fp_gallery`
--
ALTER TABLE `fp_gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fp_landing_app`
--
ALTER TABLE `fp_landing_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fp_orders`
--
ALTER TABLE `fp_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `fp_preview_app`
--
ALTER TABLE `fp_preview_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fp_print_fonts`
--
ALTER TABLE `fp_print_fonts`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `fp_print_prop`
--
ALTER TABLE `fp_print_prop`
  MODIFY `prop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `fp_product`
--
ALTER TABLE `fp_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `fp_product_app`
--
ALTER TABLE `fp_product_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fp_product_design`
--
ALTER TABLE `fp_product_design`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `fp_product_gallery`
--
ALTER TABLE `fp_product_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `fp_product_selected_app`
--
ALTER TABLE `fp_product_selected_app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `fp_product_size`
--
ALTER TABLE `fp_product_size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `fp_product_type`
--
ALTER TABLE `fp_product_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fp_registration`
--
ALTER TABLE `fp_registration`
  MODIFY `reg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `fp_registration_app`
--
ALTER TABLE `fp_registration_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fp_thank_you_app`
--
ALTER TABLE `fp_thank_you_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fp_ui_element_app`
--
ALTER TABLE `fp_ui_element_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fp_welcome_app`
--
ALTER TABLE `fp_welcome_app`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
