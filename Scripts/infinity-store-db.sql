DROP DATABASE IF EXISTS infinity_store_db;
CREATE DATABASE infinity_store_db;
USE infinity_store_db;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8;

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (1, 'User'), (2, 'Admin'), (3, 'Salesman');
UNLOCK TABLES;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  /*`created_at` datetime NOT NULL NOW(),
   `updated_at` datetime NULL DEFAULT NULL,*/  
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) NOT NULL UNIQUE,
  `password` text NOT NULL,
  `phone` bigint DEFAULT NULL,
  `image` text, /*agregar imagen por default*/
  `alta` tinyint(1) NOT NULL DEFAULT 1,
  `date_of_birth` date NOT NULL,
  `home_adress` text,
  `role_id` int unsigned NOT NULL, /*default opción usuario*/
  PRIMARY KEY (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
) CHARSET=utf8;

DROP TABLE IF EXISTS `product_categorys`;
CREATE TABLE `product_categorys` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `image` text NOT NULL, /*agregar imagen por default*/ /*¿Las imágenes deberían ir en otra tabla y linkearlas?*/
  PRIMARY KEY (`id`)
) CHARSET=utf8;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal NOT NULL,
  `discount` tinyint DEFAULT NULL,
  `stock` int NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 1,
  `off_sale` int DEFAULT NULL,
  `image` text NOT NULL, /*agregar imagen por default*/
  `product_category_id` int unsigned NOT NULL, /*default opción usuario*/
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_category_id`) REFERENCES `product_categorys`(`id`)
) CHARSET=utf8;

DROP TABLE IF EXISTS `product_carts`;
CREATE TABLE `product_carts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `user_id` int(10) unsigned NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

DROP TABLE IF EXISTS `product_carts_products`;
CREATE TABLE `product_carts_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `product_id` int(10) unsigned NOT NULL, 
  `product_cart_id` int(10) unsigned NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
  FOREIGN KEY (`product_cart_id`) REFERENCES `product_carts`(`id`)
);

DROP TABLE IF EXISTS `opinions`;
CREATE TABLE `opinions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  /*`created_at` datetime NOT NULL NOW(),
  `updated_at` datetime NULL DEFAULT NULL,*/  
  `user_id` int(10) unsigned NOT NULL, 
  `product_id` int(10) unsigned NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 1,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);