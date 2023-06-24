'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.BookingHotel, {
                foreignKey: 'bookingId',
                as: 'booking'
            })
            this.belongsTo(models.BookingDestinationTravel, {
                foreignKey: 'bookingId',
                as: 'bookingDestination'
            })
            this.belongsTo(models.ServiceManager, {
                foreignKey: 'serviceManagerId',
                as: 'serviceManager'
            })
        }
    }
    Payment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            bookingId: DataTypes.UUID,
            amount: DataTypes.INTEGER,
            paymentId: DataTypes.STRING, // payment Id Paypal
            payerId: DataTypes.STRING, // payerId Paypal
            serviceManagerId: DataTypes.UUID,
            commissionAmount: DataTypes.INTEGER,
            isPayedForServiceManager: DataTypes.BOOLEAN // tranfer money to service Manager
        },
        {
            sequelize,
            modelName: 'Payment'
        }
    )
    return Payment
}
