const db = require('../../database/models');//traigo los modelos de mi base de datos//
const sequelize = db.sequelize;
const User = require('../../database/models/User');

const apiUsersController = {
    list: (req,res) =>{
      res.header("Access-Control-Allow-Origin", "*");
      db.User.findAll({
            attributes: ['id', 'name', 'email'],
            }).then(users => {
                return res.status(200).json({
                 url:"http://localhost:3030/api/users",//url para obtener el detalle
                 total:users.length,  
                 data: users,
            
                })
            //.catch(err =>{
              //  return res.status(404).send({message:err});
            });
    },
   detail: (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
        db.User.findByPk(req.params.id,{
            attributes: ['id','created_at','updated_at','name','last_name','email','phone','image','alta','date_of_birth','home_adress']
          })                                         
        .then(users => {
           return res.status(200).json({
             data:{...users.dataValues,image:'http://localhost:3030/images/usuarios/'+users.image},
             status: 200,
             url:"api/users/detail/:id",
            })
         })
 }
}
module.exports = apiUsersController;