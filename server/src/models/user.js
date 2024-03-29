'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Role, {
                foreignKey: 'roleId',
                as: 'role'
            })
            this.hasOne(models.ServiceManager, {
                foreignKey: 'userId',
                as: 'servicemanager'
            })
            this.hasMany(models.Comment, {
                foreignKey: 'userId',
                as: 'comments'
            })
            this.hasMany(models.Trip, {
                foreignKey: 'createdby',
                as: 'trips'
            })
            this.hasMany(models.Message, {
                foreignKey: 'senderId',
                as: 'messages'
            })
            this.hasMany(models.BookingHotel, {
                foreignKey: 'userId',
                as: 'bookingHotels'
            })
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            phone: DataTypes.STRING,
            confirm: DataTypes.BOOLEAN,
            confirmtoken: DataTypes.STRING,
            block: DataTypes.BOOLEAN,
            avatar: DataTypes.STRING,
            country: DataTypes.STRING,
            roleId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'User'
        }
    )
    return User
}
