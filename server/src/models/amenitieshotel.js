'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class AmenitiesHotel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AmenitiesHotel.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'AmenitiesHotel'
        }
    )
    return AmenitiesHotel
}
