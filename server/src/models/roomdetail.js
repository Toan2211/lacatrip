'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class RoomDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Hotel, {
                foreignKey: 'hotelId',
                as: 'hotel'
            })
            this.belongsTo(models.Room, {
                foreignKey: 'roomTypeId',
                as: 'roomType'
            })
            this.belongsToMany(models.BookingHotel, {
                as: 'booking',
                through: 'BookingHotel_RoomDetail'
            })
        }
    }
    RoomDetail.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            roomNo: DataTypes.INTEGER,
            roomTypeId: DataTypes.UUID,
            hotelId: DataTypes.UUID,
            isOpen: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'RoomDetail'
        }
    )
    return RoomDetail
}
