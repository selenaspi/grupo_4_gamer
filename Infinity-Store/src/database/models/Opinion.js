module.exports = (sequelize, DataTypes) => {

    let cols = {

        id : {
            type: DataTypes.INTEGER,
            autoIncrement : true,
			allowNull : false, 
			primaryKey : true, 
			unique : true
        }, 
        created_at : {
			type : DataTypes.DATE,
			defaultValue : DataTypes.NOW,
			allowNull : false
		}, 
		updated_at : {
			type : DataTypes.DATE,
			defaultValue : null
		},
        rating : {
            type : DataTypes.INTEGER(2),
            allowNull : false,
			max : 5, 
			min : 1
        }, 
        message : {
            type: DataTypes.TEXT,
            defaultValue : null
        },
        alta : {
			type : DataTypes.TINYINT(1),
			allowNull : false,
			defaultValue : 0
		}
    }

    let config = {
		tableName : "opinions",
		charset: 'utf8',
		collate: 'utf8_unicode_ci',
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	}

    const Opinion = sequelize.define("Opinion", cols, config);


	Opinion.associate = function(models) {
		Opinion.belongsTo(models.Product, {
			as: "product",
			foreignKey: "product_id"
		})

		Opinion.belongsTo(models.User, {
			as: "user",
			foreignKey: "user_id"
		})
	}

    return Opinion

}