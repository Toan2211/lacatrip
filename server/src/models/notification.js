'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Notification.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            senderId: DataTypes.UUID,
            receiverId: DataTypes.UUID,
            tripID: DataTypes.UUID,
            message: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: 'Notification'
        }
    )
    return Notification
}
