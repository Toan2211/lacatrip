'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class TripDate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Trip, {
                foreignKey: 'tripId',
                as: 'trip'
            })
            this.belongsToMany(models.Hotel, {
                as: 'hotels',
                through: 'TripDate_Hotel'
            })
            this.belongsToMany(models.Restaurant, {
                as: 'restaurants',
                through: 'TripDate_Restaurant'
            })
            this.belongsToMany(models.DestinationTravel, {
                as: 'destinationTravels',
                through: 'TripDate_Destinationtravel'
            })
        }
    }
    TripDate.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            tripId: DataTypes.UUID,
            date: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'TripDate'
        }
    )
    return TripDate
}
