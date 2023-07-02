'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class DestinationTravel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Province, {
                foreignKey: 'provinceId',
                as: 'province'
            })
            this.belongsTo(models.ServiceManager, {
                foreignKey: 'serviceManagerId',
                as: 'serviceManager'
            })
            this.hasMany(models.Image, {
                foreignKey: 'instanceId',
                as: 'images'
            })
            this.hasMany(models.Itinerary, {
                foreignKey: 'destinationTravelId',
                as: 'itineraries'
            })
            this.hasMany(models.Comment, {
                foreignKey: 'instanceId',
                as: 'comments'
            })
            this.belongsToMany(models.Trip, {
                as: 'trips',
                through: 'Trip_Destinationtravel'
            })
            this.belongsToMany(models.TripDate, {
                as: 'TripDates',
                through: 'TripDate_Destinationtravel'
            })
        }
    }
    DestinationTravel.init(
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
            address: DataTypes.STRING,
            longtitude: DataTypes.FLOAT,
            latitude: DataTypes.FLOAT,
            price: DataTypes.FLOAT,
            originalPrice: DataTypes.FLOAT,
            provinceId: DataTypes.INTEGER,
            serviceManagerId: DataTypes.UUID,
            rating: DataTypes.FLOAT,
            totalRating: DataTypes.FLOAT,
            public: DataTypes.BOOLEAN,
            clickCount: DataTypes.FLOAT,
            commissionPercent: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'DestinationTravel'
        }
    )
    return DestinationTravel
}
