const products = require("../database/products.json");
const opinions = require("../database/opinions.json");
const category = require("../database/category.json")

let productsJSON = JSON.stringify(products);
let productsList = JSON.parse(productsJSON);
let opinionsJSON = JSON.stringify(opinions);
let opinionList = JSON.parse(opinionsJSON);
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

const path = require("path");

function Producto(name = "Sin nombre", precio = 0, cantidad = 0, foto = "") {
    this.name = name;
    this.precio = precio;
    this.cantidad = cantidad;
    this.foto = foto;
}

function Impuesto(name = "Sin nombre", valor = 0) {
    this.name = name,
    this.valor = valor
}

function Descuento(name = "Sin nombre", valor = 0) {
    this.name = name,
        this.valor = -valor
}

let teclado = new Producto("TECLADO GAMER EVGA Z15 RGB COLOR LINEAR SILVER SPANISH", 6870, 3, "/images/TECLADO GAMER EVGA Z15 RGB COLOR LINEAR SILVER SPANISH.jpg");
let notebook = new Producto("NOTEBOOK MSI CREATOR 15 A10SE", 380638, 1, "/images/NOTEBOOK MSI CREATOR 15 A10SE.jpg");
let silla = new Producto("SILLA GAMER PRIMUS THRONOS 100T BLACK/YELLOW", 46840, 1, "/images/SILLA GAMER PRIMUS THRONOS 100T BLACK-AMARILLA.jpg")

let listaProductos = [teclado, notebook, silla];

let envios = {
    retiroSucursal: false,
    precio: this.retiroSucursal ? 0 : 600
}

let listaImpuestos = [new Impuesto("Impuesto 1", 400), new Impuesto("Impuesto 2", 50), new Impuesto("Impuesto 3", 380)];

let listaDescuentos = [new Descuento("Descuento 1", 450)];

let detallesCompra = {
    destallesProductos: listaProductos,
    envio: {
        destino: envios.retiroSucursal ? "Retiro por sucursal" : "Envío a domicilio: Rosario",
        precio: envios.precio
    },
    impuestos: listaImpuestos,
    descuentos: listaDescuentos,
    calcularTotal : function() {
        productList = this.destallesProductos;
        impuestosList = this.impuestos;
        descuestosList = this.descuentos;
        let total = 0;
        for(i = 0; i < productList.length; i++) {
            let totalXProducto = productList[i].cantidad * productList[i].precio;
            total += totalXProducto;
        }

        for(i = 0; i < impuestosList.length; i++) {
            total += impuestosList[i].valor
        }

        for(i = 0; i < descuestosList.length; i++) {
            total += descuestosList[i].valor
        }

        total += this.envio.precio;
        return total;
    }
}








const controller = {
    mostrarCarrito: (req, res) => {
        res.render("generales/no-found")
        // res.render("products/productCart", { productos: listaProductos, envio: envios, detallesDeLaCompra: detallesCompra, categoryList})
    }
}

module.exports = controller;