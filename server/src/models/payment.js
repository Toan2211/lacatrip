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
            paymentType: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            paymentId: DataTypes.STRING,
            payerId: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Payment'
        }
    )
    return Payment
}
