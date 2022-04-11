const  products  = require("../database/products.json");
const fs = require('fs');
const path = require('path')
// let productsJSON = JSON.stringify(products);
// let productsList = JSON.parse(productsJSON);

const productosfilePath = path.join(__dirname,'../database/products.json');
const productos = JSON.parse(fs.readFileSync(productosfilePath,'utf-8'));

function Producto(name = "Sin nombre", precio = 0, cantidad = 0, foto = "") {
    this.name = name;
    this.precio = precio;
    this.cantidad = cantidad;
    this.foto = foto;
}

const controller = {
    mostrarDetalleProducto: (req, res) => {
        let idProducto = Number(req.params.id);
        let listaProductos = [ productsList[idProducto], productsList[idProducto + 1], productsList[idProducto + 2], productsList[idProducto + 3] ];
        

        res.render("products/productDetails",{similares: listaProductos, detalle: productsList[idProducto - 1]})
    },
    formCreation: (req, res) => { res.render("products/productCreationEdition", { existe: false, name: null, descripcion: null, foto: null, categoria: null, precio: null, descuento: null }) },
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
    },
    crearProducto: (req,res) => {
        const newproduct ={
            id: products[products.length -1].id+1,
            name: req.body.name,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            image: req.body.image,
            // inSale: req.body.checkDescuento,
            // discount: req.body.inDescuento,

        }
        productos.push(newproduct);
        fs.writeFileSync(productosfilePath,JSON.stringify(productos));
        console.log(req.body);
        res.redirect('/');
    }
}


module.exports = controller;

