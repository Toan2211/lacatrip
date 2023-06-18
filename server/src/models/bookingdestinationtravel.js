'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class BookingDestinationTravel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.Payment, {
                foreignKey: 'bookingId',
                as: 'payment'
            })
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
            this.belongsTo(models.ServiceManager, {
                foreignKey: 'serviceManagerId',
                as: 'serviceManager'
            })
            this.belongsTo(models.DestinationTravel, {
                foreignKey: 'destinationTravelId',
                as: 'destinationTravel'
            })
        }
    }
    BookingDestinationTravel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            userId: DataTypes.UUID,
            serviceManagerId: DataTypes.UUID,
            destinationTravelId: DataTypes.UUID,
            date: DataTypes.DATE,
            countPeople: DataTypes.INTEGER,
            amount: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'BookingDestinationTravel'
        }
    )
    return BookingDestinationTravel
}
