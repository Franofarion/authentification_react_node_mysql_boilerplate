CREATE DATABASE `test`;

USE `test`;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creator` int,
  `title` varchar(255),
  `content` longtext,
  `created_at` timestamp
);

ALTER TABLE `posts` ADD FOREIGN KEY (`creator`) REFERENCES `users` (`id`);