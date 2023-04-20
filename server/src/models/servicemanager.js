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
                foreignKey: 'UserId',
                as: 'user'
            })
        }
    }
    ServiceManager.init(
        {
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'ServiceManager'
        }
    )
    return ServiceManager
}
