'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'createdby',
                as: 'user'
            })
            this.belongsToMany(models.Hotel, {
                as: 'hotels',
                through: 'Trip_Hotel'
            })
            this.belongsToMany(models.Restaurant, {
                as: 'restaurants',
                through: 'Trip_Restaurant'
            })
            this.belongsToMany(models.DestinationTravel, {
                as: 'destinationTravels',
                through: 'Trip_Destinationtravel'
            })
            this.hasMany(models.TripDate, {
                foreignKey: 'tripId',
                as: 'tripDates'
            })
            this.hasMany(models.Message, {
                foreignKey: 'tripId',
                as: 'messages'
            })
        }
    }
    Trip.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            startDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            createdby: DataTypes.UUID,
            image: DataTypes.STRING,
            numPlace: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Trip'
        }
    )
    return Trip
}
