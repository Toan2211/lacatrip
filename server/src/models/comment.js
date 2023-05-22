'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
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
            this.hasMany(models.Image, {
                foreignKey: 'instanceId',
                as: 'images'
            })
        }
    }
    Comment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            instanceId: DataTypes.UUID,
            userId: DataTypes.UUID,
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            rating: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Comment'
        }
    )
    return Comment
}
