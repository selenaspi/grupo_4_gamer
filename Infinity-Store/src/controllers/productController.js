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
    mostrarDetalleProducto: (req, res) => {
        let productosSimilares = {
            descripcion: "Productos Similares",
            precio: "$10000",
        };
        res.render("products/productDetails",{productos: listaProductos,productosSimilares})
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

