'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class BookingHotel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Payment, {
                foreignKey: 'bookingId',
                as: 'payment'
            })
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
            this.belongsTo(models.Hotel, {
                foreignKey: 'hotelId',
                as: 'hotel'
            })
            this.belongsTo(models.Room, {
                foreignKey: 'roomTypeId',
                as: 'roomType'
            })
            this.belongsToMany(models.RoomDetail, {
                as: 'roomDetails',
                through: 'BookingHotel_RoomDetail'
            })
        }
    }
    BookingHotel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            userId: DataTypes.UUID,
            serviceManagerId: DataTypes.UUID,
            hotelId: DataTypes.UUID,
            roomTypeId: DataTypes.UUID,
            checkIn: DataTypes.DATE,
            checkOut: DataTypes.DATE,
            countAdults: DataTypes.INTEGER,
            countChildrens: DataTypes.INTEGER,
            countRooms: DataTypes.INTEGER,
            amount: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'BookingHotel'
        }
    )
    return BookingHotel
}
