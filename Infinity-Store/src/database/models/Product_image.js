module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        alta: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1
        }
    }

    let config = {
        tableName: "product_image", charset: 'utf8',
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true,
        createdAt: "created_at",
    }

    const Product_image = sequelize.define("Product_image", cols, config)

    Product_image.associate = function (models) {
        Product_image.belongsTo(models.Product, {
            as: "images",
            foreignKey: "product_id"
        })
        Product_image.hasMany(models.Product_image, {
            as: "productos",
            foreignKey: "product_id"
        })
        Product_image.belongsToMany(models.Product, {
            as: "product_image",
            through: "products",
            foreignKey: "product_id",
            timestamps: true
        })
    }
    return Product_image;
}
