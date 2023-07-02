'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Image, {
                foreignKey: 'instanceId',
                as: 'images'
            })
            this.belongsTo(models.Province, {
                foreignKey: 'provinceId',
                as: 'province'
            })
            this.belongsTo(models.ServiceManager, {
                foreignKey: 'serviceManagerId',
                as: 'serviceManager'
            })
            this.hasMany(models.Comment, {
                foreignKey: 'instanceId',
                as: 'comments'
            })
            this.belongsToMany(models.Trip, {
                as: 'Trips',
                through: 'Trip_Restaurant'
            })
            this.belongsToMany(models.TripDate, {
                as: 'TripDates',
                through: 'TripDate_Restaurant'
            })
        }
    }
    Restaurant.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            descriptionVN: DataTypes.TEXT,
            phone: DataTypes.STRING,
            minPrice: DataTypes.INTEGER,
            maxPrice: DataTypes.INTEGER,
            cusines: DataTypes.STRING,
            specialDiets: DataTypes.STRING,
            address: DataTypes.STRING,
            longtitude: DataTypes.FLOAT,
            latitude: DataTypes.FLOAT,
            provinceId: DataTypes.INTEGER,
            serviceManagerId: DataTypes.UUID,
            limitBookPerDay: DataTypes.INTEGER,
            public: DataTypes.BOOLEAN,
            rating: DataTypes.FLOAT,
            totalRating: DataTypes.FLOAT,
            clickCount: DataTypes.FLOAT
        },
        {
            sequelize,
            modelName: 'Restaurant'
        }
    )
    return Restaurant
}
