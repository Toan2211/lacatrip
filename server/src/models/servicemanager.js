'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ServiceManager extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
            this.hasMany(models.Hotel, {
                foreignKey: 'serviceManagerId',
                as: 'hotels'
            })
            this.hasMany(models.Restaurant, {
                foreignKey: 'serviceManagerId',
                as: 'Restaurants'
            })
            this.hasMany(models.DestinationTravel, {
                foreignKey: 'serviceManagerId',
                as: 'DestinationTravels'
            })
            this.hasMany(models.Payment, {
                foreignKey: 'serviceManagerId',
                as: 'payments'
            })
            this.hasMany(models.BookingHotel, {
                foreignKey: 'serviceManagerId',
                as: 'bookingHotels'
            })
            this.hasMany(models.BookingDestinationTravel, {
                foreignKey: 'serviceManagerId',
                as: 'bookingDestinationTravels'
            })
        }
    }
    ServiceManager.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            userId: DataTypes.UUID,
            paymentAccount: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'ServiceManager'
        }
    )
    return ServiceManager
}
