'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Province extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Hotel, {
                foreignKey: 'provinceId',
                as: 'hotels'
            })
            this.hasMany(models.Restaurant, {
                foreignKey: 'provinceId',
                as: 'restaurants'
            })
        }
    }
    Province.init(
        {
            name: DataTypes.STRING,
            longtitude: DataTypes.FLOAT,
            latitude: DataTypes.FLOAT,
            image: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Province'
        }
    )
    return Province
}

