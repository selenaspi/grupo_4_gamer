module.exports = {
  "users": {
    "id": 9,
    "name": "carla",
    "lastName": "tomasi",
    "password": "$2a$10$aUoFshiF80CCDZzaJsV4jeBL2OJ3bgshX87Bun.wyZaBTOqtQ80dy",
    "email": "carla_t@gmail.com",
    "phone": "0636156166",
    "role": "user",
    "image": "image-1650841972789-48743459.png",
    "alta": true,
    "database": "users.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "products": {
    "id": 1,
    "name": "PENDRIVE PATRIOT BIT+ 64GB USB 3.2 GEN1",
    "idCategory": 1,
    "description": "La unidad flash USB Bit+ de Patriot ofrece una interfaz USB 3.2 Gen 1 de alta velocidad para una conexión sencilla y una transferencia de datos rápida en cualquier PC o portátil. ¡Bit+ está configurado para una calidad favorable y una confiabilidad sólida al almacenar documentos personales, datos importantes, sus películas favoritas, los juegos más recientes y más! Encerrado en una carcasa aerodinámica totalmente negra con un peso superligero de 1,7 gramos, el Bit+ es la solución flash plug and play perfecta y fácil de usar. Con un diseño compacto y sin tapa, el Bit+ se mantiene protegido mientras viaja. Un diseño pequeño y portátil permite que el USB quepa en su bolsillo, mochila o cartera. Lleva tus archivos contigo dondequiera que viajes. Creado teniendo en cuenta la compatibilidad, Bit+ se sincroniza sin problemas en los sistemas operativos más recientes. Simplemente conecte la unidad flash e inmediatamente acceda a un poco más de almacenamiento. Acceda al instante a Bit+ de Patriot con capacidades que se adaptan a todas sus necesidades de almacenamiento digital. Arrastra y suelta para transferir toda tu información y trabajar más rápido que nunca, manteniendo la productividad constante. ",
    "data_sheet": [],
    "image": "PENDRIVE-PATRIOT-BIT+-64GB-USB-3.2-GEN1.jpg",
    "color": [],
    "price": 1964,
    "offSale": false,
    "discount": 0,
    "stock": 0,
    "database": "products.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "product_cart": {
    "id": 1,
        "id_user": 12,
        "alta": true,
    "database": "product_cart.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "product_cart_products": {
    "id": 1,
    "id_product": 1,
    "id_product_cart": 1,
    "alta": true,
    "cantidad": 5,
    "database": "product_cart_products.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "opinions": {
    "id" : 1,
    "idUsuario" : 1,
    "idProduct" : 1,
    "rating" : 5,
    "message" : "Muy bueno (?",
    "database": "opinions.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "category": {
    "id" : 1,
    "name" : "Accesorios",
    "image" : "accesorio-icon.png",
    "database": "category.json",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
