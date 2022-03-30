const path = require('path');

const controller = {
    mostrarDetalleProducto: (req, res) => {
        let productosSimilares = {
            descripcion: "Productos Similares",
            precio: "$10000",
        };
        res.render("products/productDetails", { productosSimilares })
    },
    crearProducto: (req, res) => { res.render("products/productCreationEdition", { existe: false, name: null, descripcion: null, foto: null, categoria: null, precio: null, descuento: null }) },
    editarProducto: (req, res) => {
        res.render("products/productCreationEdition", {
            existe: true,
            name: "Teclado Mecánico Inalámbrico Redragon Draconic K530W-RGB White",
            descripcion: `Disfrutá de tus partidas en otro nivel con Redragon, marca reconocida que se especializa en brindar la mejor experiencia de juego al público gamer desde hace más de 20 años. Sus teclados se adaptan a todo tipo de jugadores y esto los convierten en un fiel reflejo de la alta gama y calidad que la compañía ofrece.`,
            foto: null,
            categoria: "teclado",
            precio: 7310,
            descuento: 15
        })
    }
}


module.exports = controller;

