'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class CorpTour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CorpTour.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'CorpTour'
        }
    )
    return CorpTour
}
