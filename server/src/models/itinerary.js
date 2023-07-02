'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Itinerary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.DestinationTravel, {
                foreignKey: 'destinationTravelId',
                as: 'destinationTravel'
            })
        }
    }
    Itinerary.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            descriptionVN: DataTypes.TEXT,
            image: DataTypes.STRING,
            address: DataTypes.STRING,
            longtitude: DataTypes.FLOAT,
            latitude: DataTypes.FLOAT,
            step: DataTypes.INTEGER,
            destinationTravelId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Itinerary'
        }
    )
    return Itinerary
}
