const path = require('path');
function Producto(name = "Sin nombre", precio = 0, cantidad = 0, foto = "") {
    this.name = name;
    this.precio = precio;
    this.cantidad = cantidad;
    this.foto = foto;
}

let teclado = new Producto("TECLADO GAMER EVGA Z15 RGB COLOR LINEAR SILVER SPANISH", 6870, 3, "/images/TECLADO GAMER EVGA Z15 RGB COLOR LINEAR SILVER SPANISH.jpg");
let notebook = new Producto("NOTEBOOK MSI CREATOR 15 A10SE", 380638, 1, "/images/NOTEBOOK MSI CREATOR 15 A10SE.jpg");
let silla = new Producto("SILLA GAMER PRIMUS THRONOS 100T BLACK/YELLOW", 46840, 1, "/images/SILLA GAMER PRIMUS THRONOS 100T BLACK-AMARILLA.jpg")

let listaProductos = [teclado, notebook, silla];


const controller = {
    mostrarDetalleProducto : (req, res) => {
        let productosSimilares = {
            descripcion :"Productos Similares",
            precio : "$10000",  
        };
        res.render("products/productDetails",{productos: listaProductos,productosSimilares})},
    crearProducto : (req,res) => {res.render("products/productCreationEdition", {existe : false, name : null, descripcion : null, foto : null, categoria : null, precio : null} )},
    editarProducto : (req, res) => {res.render("products/productCreationEdition", {existe : true, name : "Compu gamer", descripcion : "Aquí una descripción del producto", categoria : "teclado", foto : null})}



} 

module.exports = controller;

