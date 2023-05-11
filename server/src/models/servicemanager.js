'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ServiceManager extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
            this.hasMany(models.Hotel, {
                foreignKey: 'serviceManagerId',
                as: 'hotels'
            })
            this.hasMany(models.Restaurant, {
                foreignKey: 'serviceManagerId',
                as: 'Restaurants'
            })
        }
    }
    ServiceManager.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'ServiceManager'
        }
    )
    return ServiceManager
}
