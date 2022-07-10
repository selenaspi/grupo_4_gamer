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
  `created_at` datetime NOT NULL DEFAULT NOW(),
   `updated_at` datetime NULL DEFAULT NULL,
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

LOCK TABLES `users` WRITE;
INSERT INTO users VALUES (1, NOW(), NULL, "Nicolás", "Gerez", "gerez.nicolas@gmail.com", "$2a$10$3UUg2uVc7c2S1COmEl7XiOMQWppzMtjPu1c4O5ZuLUlFpmH7SIZDu", 1112345678, "image-1651885376904-84193745.png", 1, "2000/09/02", "Av. Siempreviva 3306", 1), (2, NOW(), NULL, "Carla", "Tomasi", "carla_t@gmail.com", "$2a$10$aUoFshiF80CCDZzaJsV4jeBL2OJ3bgshX87Bun.wyZaBTOqtQ80dy", 0636156166, "image-1650841972789-48743459.png", 1, "2000/09/02", "Av. Siempreviva 3306", 1), (3, NOW(), NULL, "Martina", "Colomé", "manu@gmail.com", "$2a$10$8isdBZlwi0MDnz0VQOofjOrpqF7jUIeV3HN/adl.keCH34qNJ6FLu", 0343156165116, "image-1651515375999-486954713.jpg", 1, "2000/09/02", "Av. Siempreviva 3306", 1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `image` text NOT NULL, /*agregar imagen por default*/ /*¿Las imágenes deberían ir en otra tabla y linkearlas?*/
  PRIMARY KEY (`id`)
) CHARSET=utf8;

LOCK TABLES `product_categories` WRITE;
INSERT INTO `product_categories` VALUES (1, 'Accesorios', 'accesorio-icon.png'), (2, 'Almacenamiento', 'storage-icon.png'), (3, 'Auriculares', 'listener-icon.png'), (4, 'Cámaras digitales', 'camera-icon.png'), (5, 'Conectividad', 'conectividad-icon.png'), (6, 'Fan Coolers', 'fan-cooler-icon.png'), (7, 'Fuentes', 'fuente-icon.png'), (8, 'Gabinetes', 'computer-tower-icon.png'), (9, 'Impresoras', 'printer-icon.png'), (10, 'Joysticks', 'joystick-icon.png'), (11, 'Memorias RAM', 'ram-icon.png'), (12, 'Micrófonos', 'microphone-icon.png'), (13, 'Microprocesadores', 'microprocessor-icon.png'), (14, 'Monitores', 'desktop-icon.png'), (15, 'Motherboards', 'motherboard-icon.png'), (16, 'Mouse', 'mouse-icon.png'), (17, 'Mouse Pads', 'mouse-pad-icon.png'), (18, 'Notebooks', 'laptop-icon.png'), (19, 'Parlantes', 'speaker-icon.png'), (20, 'PC armadas', 'computer-desktop-icon.png'), (21, 'Placas de sonido', 'sonic-icon.png'), (22, 'Placas de video', 'graphics-card-icon.png'), (23, 'Sillas gamer', 'gaming-chair-icon.png'), (24, 'Smartphones', 'mobile-phone-icon.png'), (25, 'Tablets', 'tablet-icon.png'), (26, 'Teclados', 'keyboard-icon.png'), (27, 'Webcams', 'webcam-icon.png'), (28, 'Otros', 'otros-icon.png');
UNLOCK TABLES;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `updated_at` datetime NULL DEFAULT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` text NOT NULL, /*agregar imagen por default*/
  `price` decimal NOT NULL,
  `off_sale` tinyint(1) DEFAULT 0,
  `discount` tinyint DEFAULT NULL,
  `stock` int NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 1,
  `product_category_id` int unsigned NOT NULL, /*default opción usuario*/
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_category_id`) REFERENCES `product_categories`(`id`)
) CHARSET=utf8;

LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (1, NOW(), NULL,'PENDRIVE PATRIOT BIT+ 64GB USB 3.2 GEN1', 'La unidad flash USB Bit+ de Patriot ofrece una interfaz USB 3.2 Gen 1 de alta velocidad para una conexión sencilla y una transferencia de datos rápida en cualquier PC o portátil. ¡Bit+ está configurado para una calidad favorable y una confiabilidad sólida al almacenar documentos personales, datos importantes, sus películas favoritas, los juegos más recientes y más! Encerrado en una carcasa aerodinámica totalmente negra con un peso superligero de 1,7 gramos, el Bit+ es la solución flash plug and play perfecta y fácil de usar. Con un diseño compacto y sin tapa, el Bit+ se mantiene protegido mientras viaja. Un diseño pequeño y portátil permite que el USB quepa en su bolsillo, mochila o cartera. Lleva tus archivos contigo dondequiera que viajes. Creado teniendo en cuenta la compatibilidad, Bit+ se sincroniza sin problemas en los sistemas operativos más recientes. Simplemente conecte la unidad flash e inmediatamente acceda a un poco más de almacenamiento. Acceda al instante a Bit+ de Patriot con capacidades que se adaptan a todas sus necesidades de almacenamiento digital. Arrastra y suelta para transferir toda tu información y trabajar más rápido que nunca, manteniendo la productividad constante. ', 'PENDRIVE-PATRIOT-BIT+-64GB-USB-3.2-GEN1.jpg', 1964, 0, NULL, 0, 0, 1), (2, NOW(), NULL, 'REGULAR DE VOLTAJE FORZA FVR-902A 220V 900VA/450W 4-IRAM', NULL, 'REGULADOR-DE-VOLTAJE-FORZA-FVR902A-220V-900VA450W-4IRAM.jpg', 3051, 0, NULL, 2, 1, 1), (3, NOW(), NULL, 'DISCO SSD 2TB ADATA XPG SPECTRIX S40G RGB NVME', 'Con la unidad en estado sólido XPG vas a incrementar la capacidad de respuesta de tu equipo. Gracias a esta tecnología podrás invertir en velocidad y eficiencia para el inicio, la carga y la transferencia de datos. Este disco transfiere datos a través de sus interfaces PCIe 3.0 y NVMe 1.3, lo que te permite transmitir una mayor cantidad de información de una sola vez.', 'DISCO-SSD-2TB-ADATA-XPG-SPECTRIX-S40G-RGB-NVME.jpg', 42109, 1, 15, 5, 1, 2), (4, NOW(), NULL, 'LENTE NIKON 70-200 F4 ED VR', NULL, 'Lente-Nikon-70-200-F4-ED-VR.jpg', 390000, 0, NULL, 1, 1, 4), (5, NOW(), NULL, 'COOLER AEROCOOL VERKHO 2 (1150/1151/1156/775/FM2/FM1/FM2/AM3', 'Dos heatpipes proporcionan una superficie perfectamente plana que asegura una disipación de calor más rápida. Las tiras abiertas a lo largo de los lados del ventilador aseguran un flujo de aire mejorado y más fuerte que otros ventiladores regulares de 90 mm, manteniendo el nivel de ruido al mínimo. El diseño irregular de la superficie de la aleta crea un área de disipación de calor. Es compatible con la mayoría de las CPUs debido a un diseño compacto.', 'COOLER-AEROCOOL-VERKHO-2.jpg', 2218, 0, NULL, 6, 1, 6), (6, NOW(), NULL, 'FAN AEROCOOL ASTRO 12 ARGB DUAL RING', 'Combinando un exclusivo diseño LED RGB Omni y un acabado de estilo fibra de carbono para conseguir una estética nunca vista, el ventilador ASTRO 12 de Aerocool te garantiza la mejor refrigeración y la mejor decoración interna para tu PC. Hasta 16.8 millones de colores con placas base ARGB y prestaciones profesionales para conseguir un rendimiento óptimo.', 'FAN-AEROCOOL-ASTRO-12-ARGB-DUAL-RING.jpg', 3184, 0, NULL, 8, 1, 6), (7, NOW(), NULL, 'FUENTE 850W CoolerMaster MWE GOLD FULL MODULAR', 'El MWE Gold - V2 (Full Modular) es el siguiente paso en la evolución de la línea de unidades de suministro de energía 80 PLUS Gold de Cooler Master. La serie MWE Gold original se creó para ofrecer una opción con calificación Gold más simple y asequible para ayudar a los usuarios a hacer más accesible la transición de las unidades de suministro de energía 80 PLUS White y Bronze. La eficiencia siempre ha sido uno de los factores más importantes para los usuarios a la hora de elegir su fuente de alimentación. Si bien hay una variedad de opciones de eficiencia, 80 PLUS Gold ha sido la opción ideal durante los últimos años y continúa siendo considerada el estándar en gran parte del mundo. El MWE Gold - V2 ofrece una certificación 80 PLUS Gold, lo que garantiza una eficiencia mínima típica del 90%.', 'FUENTE-850W-CoolerMaster-MWE-GOLD-FULL-MODULAR.png', 34160, 1, 8, 1, 1, 7), (8, NOW(), NULL, 'MEMORIA UDIMM MUSHKIN SILVERLINE DDR4 16GB 3200MHZ 1.2V BULK', 'Los módulos de memoria Ram Mushkin Silverline DDR4 están diseñados para exceder los estándares de la industria y garantizar la mayor compatibilidad con PC Intel y AMD. Su disipador de calor de nuevo diseño está hecho de aluminio de grado aeronáutico, lo que le da al módulo de memoria un aspecto refinado y elegante que complementa perfectamente su potencia. Ideal para Gamers y clientes que buscan la mejor performance, sin descuidar sus costos.', 'MEMORIA-UDIMM-MUSHKIN-SILVERLINE-DDR4-16GB-3200MHZ-1.2V-BULK.jpg', 14738, 1, 10, 3, 1, 11), (9, NOW(), NULL, 'MEMORIA DDR3 HYNIX 2GB 1600MHz', NULL, 'Memoria-DDR3-HYNIX-2GB-1600MHz.jpg', 1364, 0, NULL, 15, 1, 11), (10, NOW(), NULL, 'MICROFONO RAZER SEIREN MINI ULTRA QUARTZ', 'Hecho para configuraciones minimalistas o más pequeñas, este micrófono de condensador compacto apenas ocupa espacio en el escritorio y es discreto en la cámara para que el foco siempre esté en ti. También es fácil de llevar si necesita llevar su transmisión o trabajar a otra parte.', 'MICROFONO-RAZER-SEIREN-MINI-ULTRA-QUARTZ.jpg', 11042, 0, NULL, 5, 1, 12), (11, NOW(), NULL, 'MICRÓFONO DE EXPANSIÓN LOGINTECH', 'Amplía el alcance del sistema de videoconferencia GROUP con micrófonos de expansión Logitech GROUP. Puede haber hasta 20 personas en una sala grande y se oirá la voz de todas y cada una de ellas. Basta con conectar los microfonos al altavoz de GROUP. Se reconocerán y configurarán automáticamente. Un indicador luminoso muestra cuándo se ha silenciado el micrófono, cuándo hay una llamada activada y cuándo se ha iniciado el emparejamiento inalámbrico Bluetooth®. Altura: 83 mm Ancho: 83 mm Profundidad: 21 mm Peso: 230 g Tipo de conexión: Plug and Play Indicadores luminosos (LED): LED para confirmar streaming de video, silenciamiento de micrófono, llamada en espera y emparejamiento Bluetooth. Tipo de micrófono: Mono, banda ancha, supresión de ruido Botones/Conmutador: Silenciar micrófono', 'Micrófonos-de-Expansión-Logitech.jpg', 69909, 1, 15, 1, 1, 12), (12, NOW(), NULL, 'MICROFONO RAZER SEIREN EMOTE', 'Sorprende a tus seguidores y lleva tus dotes escénicas a otro nivel con Razer Seiren Emote, el primer micrófono USB que utiliza emoticonos para interactuar con tu público. Da un toque divertido y fresco a tus retransmisiones y deja a tu público con ganas de más con un nuevo nivel de entretenimiento que te permite destacar entre los demás. ', 'MICROFONO-RAZER-SEIREN-EMOTE.jpg', 34854, 1, 20, 5, 1, 12), (13, NOW(), NULL, 'MICROPROCESADOR AMD (AM4) RYZEN 5 5600X 6 NÚCLEO', 'Obtenga rendimiento de alta velocidad en los juegos, con el mejor procesador para computadoras de escritorio del mundo. Los núcleos más rápidos del mundo para los jugadores de PC.Software que combina la velocidad de SSD con la capacidad de disco duro en una sola unidad rápida y fácil de administrar, gratuitamente con la placa madre AMD Serie 400. La utilidad de overclocking sencilla ya la vez potente para los procesadores AMD Ryzen™', 'MPROCESADOR-AMD(AM4)-RYZEN-5-5600X-6-NÚCLEO.jpg', 53291, 0, NULL, 6, 1, 13), (14, NOW(), NULL, 'MB AMD (AM4) ASUS PRO A320M-R WI-FI-SI (90MB10I0-M0ECY1)', 'Tecnología de recuperación de BIOS automática exclusiva de ASUS para la recuperación automática del BIOS del sistema desde una copia de seguridad verificada Pueto LPC dedicada y tarjeta de depuración con pantalla LCD para una resolución de problemas más rápida. Registro de eventos para capturar y administrar información detallada del sistema. Las tarjetas madre comerciales ASUS Pro ofrecen características mejoradas para suavizar sus operaciones de TI, que incluyen protección integral del sistema, estabilidad y confiabilidad las 24 horas del día, los 7 días de la semana y un paquete de administración mejorado para una personalización más fácil. Conocida como la marca de tarjetas madre más grande y conocida del mundo, ASUS ofrece un servicio posventa de clase mundial y una disponibilidad garantizada a largo plazo para maximizar su inversión durante el ciclo de vida del producto y ofrece una solución de alta calidad optimizada para TCO para su negocio necesidades informáticas.', 'MB-AMD(AM4)-ASUS-PRO-A320M-R-WI-FI-SI-(90MB10I0-M0ECY1).png', 11786, 1, 5, 8, 1, 15);
UNLOCK TABLES;

DROP TABLE IF EXISTS `product_carts`;
CREATE TABLE `product_carts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `closed_at` datetime NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL, 
  `alta` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

-- agregar quantity
DROP TABLE IF EXISTS `product_carts_products`;
CREATE TABLE `product_carts_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `updated_at` datetime NULL DEFAULT NULL,
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
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `updated_at` datetime NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL, 
  `product_id` int(10) unsigned NOT NULL,
  `rating` int(2) NOT NULL, 
  `message` text DEFAULT NULL,
  `alta` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);

LOCK TABLES `opinions` WRITE;
  INSERT INTO `opinions` VALUES (1, NOW(), NULL, 1, 1, 5, "Muy buena calidad", 1), (2, NOW(), NULL, 1, 2, 3, "Me duró poco", 1), (3, NOW(), NULL, 1, 3, 3, "No me gustó", 1),(4, NOW(), NULL, 1, 4, 5, "Muy buena calidad", 1),(5, NOW(), NULL, 1, 5, 1, "No vale la pena", 1),(6, NOW(), NULL, 1, 6, 4, "Muy buena calidad", 1),(7, NOW(), NULL, 1, 7, 5, "Muy buena calidad", 1),(8, NOW(), NULL, 1, 8, 2, NULL, 1),(9, NOW(), NULL, 1, 9, 1, "Horrible", 1),(10, NOW(), NULL, 2, 1, 1, "Me llegó en mal estado", 1),(11, NOW(), NULL, 2, 3, 5, "Muy bueno", 1),(12, NOW(), NULL, 2, 6, 3, "Está bien", 1),(13, NOW(), NULL, 2, 7, 1, NULL, 1),(14, NOW(), NULL, 2, 10, 2, "No me convenció", 1),(15, NOW(), NULL, 2, 13, 5, NULL, 1),(16, NOW(), NULL, 3, 3, 1, "Horrible", 1),(17, NOW(), NULL, 2, 8, 5, NULL, 1),(18, NOW(), NULL, 2, 4, 4, NULL, 1),(19, NOW(), NULL, 2, 14, 5, "Realmente muy bueno", 1),(20, NOW(), NULL, 3, 14, 5, NULL, 1), (21, NOW(), NULL, 1, 10, 5, "Muy buena calidad", 1), (22, NOW(), NULL, 1, 11, 4.5, "El envoltorio estaba dañado pero el resto muy bien", 1), (23, NOW(), NULL, 1, 12, 2, "Esperaba algo más", 1), (24, NOW(), NULL, 1, 13, 5, "Excelente", 1), (25, NOW(), NULL, 1, 14, 4.5, "Está god", 1), (26, NOW(), NULL, 3, 8, 5, "Me gustó, muy buena atención", 1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
`id` int unsigned NOT NULL AUTO_INCREMENT UNIQUE,
`product_id` int unsigned NOT NULL,
`name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
`alta` tinyint(1) NOT NULL DEFAULT 1,
`created_at` datetime NOT NULL DEFAULT NOW(),
`updated_at` datetime NULL DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);
