'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Hotel, {
                foreignKey: 'instanceId',
                as: 'hotel'
            })
            this.belongsTo(models.Restaurant, {
                foreignKey: 'instanceId',
                as: 'restaurant'
            })
            this.belongsTo(models.DestinationTravel, {
                foreignKey: 'instanceId',
                as: 'destinationTravel'
            })
            this.belongsTo(models.Comment, {
                foreignKey: 'instanceId',
                as: 'comment'
            })
        }
    }
    Image.init(
        {
            url: DataTypes.STRING,
            instanceId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Image'
        }
    )
    return Image
}
