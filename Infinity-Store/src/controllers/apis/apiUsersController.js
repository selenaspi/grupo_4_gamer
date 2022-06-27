const db = require('../../database/models');//traigo los modelos de mi base de datos//
const sequelize = db.sequelize;


const apiUsersController = {
    list: (req, res) => {
        db.User.findAll()
            .then(users => {
               return res.status(200).json({
                total:users.length,
                    data:users,
               })
            })
    },
   /* detail: (req, res) => {//me da el detalle de una película en especial//
       db.Genre.findByPk(req.params.id)
        .then(genre => {
           return res.status(200).json({
             data:genre,
             status: 200,
             url:"api/genres/detail/:id",
            })
         })
 },*/

}

module.exports = apiUsersController;