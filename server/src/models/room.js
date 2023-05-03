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
            this.belongsTo(models.Room, {
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
            hotelId: DataTypes.UUID,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            originalPrice: DataTypes.FLOAT,
            salePrice: DataTypes.FLOAT,
            maxPeople: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Room'
        }
    )
    return Room
}
