'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
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
            this.belongsTo(models.User, {
                foreignKey: 'senderId',
                as: 'user'
            })
        }
    }
    Message.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            tripId: DataTypes.UUID,
            senderId: DataTypes.UUID,
            content: DataTypes.TEXT,
            image: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Message'
        }
    )
    return Message
}
