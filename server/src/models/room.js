'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
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
        }
    }
    Room.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT,
            originalPrice: DataTypes.FLOAT,
            maxPeople: DataTypes.INTEGER,
            hotelId: DataTypes.UUID,
            roomNo: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Room'
        }
    )
    return Room
}
