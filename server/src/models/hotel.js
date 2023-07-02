'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {
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
            this.hasMany(models.Image, {
                foreignKey: 'instanceId',
                as: 'images'
            })
            this.belongsTo(models.Province, {
                foreignKey: 'provinceId',
                as: 'province'
            })
            this.belongsToMany(models.AmenitiesHotel, {
                as: 'amenitieshotel',
                through: 'Hotel_Amenitieshotel'
            })
            this.hasMany(models.Room, {
                foreignKey: 'hotelId',
                as: 'rooms'
            })
            this.hasMany(models.Comment, {
                foreignKey: 'instanceId',
                as: 'comments'
            })
            // trip - hotel
            this.belongsToMany(models.Trip, {
                as: 'trips',
                through: 'Trip_Hotel'
            })
            this.belongsToMany(models.TripDate, {
                as: 'TripDates',
                through: 'TripDate_Hotel'
            })
            this.hasMany(models.RoomDetail, {
                foreignKey: 'hotelId',
                as: 'roomDetails'            
            })
            // booking
            this.hasMany(models.BookingHotel, {
                foreignKey: 'hotelId',
                as: 'bookingHotels'
            })
        }
    }
    Hotel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            hotelClass: DataTypes.INTEGER,
            hotelStyle: DataTypes.STRING,
            rating: DataTypes.FLOAT,
            longtitude: DataTypes.FLOAT,
            latitude: DataTypes.FLOAT,
            totalRating: DataTypes.FLOAT,
            public: DataTypes.BOOLEAN,
            cheapestPrice: DataTypes.FLOAT,
            provinceId: DataTypes.INTEGER,
            serviceManagerId: DataTypes.UUID,
            clickCount: DataTypes.FLOAT,
            commissionPercent: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Hotel'
        }
    )
    return Hotel
}
