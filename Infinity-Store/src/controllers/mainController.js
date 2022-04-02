// const path = require("path");

const controller = {
    index : (req, res) => {
        

let productosOfertas = [
    {
       descripcion :"Silla Gamer 01",
       descuento : "25%",
       precio : "$15000",
    },
    {
        descripcion :"Silla Gamer 02",
        descuento : "35%",
        precio : "$12500",
     },
     {
        descripcion :"Silla Gamer 03",
        descuento : "45%",
        precio : "$10000",
     },
     {
        descripcion :"Silla Gamer 04",
        descuento : "15%",
        precio : "$11000",
     },
     
];
let productosRecomendados = 
{
        descripcion :"Productos Recomendados",
        precio : "$10000",  
};



        res.render('products/index',{productosOfertas, productosRecomendados})}
}

module.exports = controller;