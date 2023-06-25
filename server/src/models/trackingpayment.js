'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class TrackingPayment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ServiceManager, {
                foreignKey: 'serviceManagerId',
                as: 'serviceManager'
            })
        }
    }
    TrackingPayment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            serviceManagerId: DataTypes.UUID,
            paymentAccount: DataTypes.STRING,
            amount: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'TrackingPayment'
        }
    )
    return TrackingPayment
}
