'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Hotels', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            website: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            hotelClass: {
                type: Sequelize.INTEGER
            },
            hotelStyle: {
                type: Sequelize.STRING
            },
            longtitude: {
                type: Sequelize.FLOAT,
            },
            latitude: {
                type: Sequelize.FLOAT,
            },
            rating: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            totalRating: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            public: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            cheapestPrice: {
                type: Sequelize.FLOAT
            },
            provinceId: {
                type: Sequelize.INTEGER
            },
            serviceManagerId: {
                type: Sequelize.UUID
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Hotels')
    }
}
