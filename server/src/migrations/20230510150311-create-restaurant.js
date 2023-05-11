'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Restaurants', {
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
                type: Sequelize.TEXT
            },
            phone: {
                type: Sequelize.STRING
            },
            website: {
                type: Sequelize.STRING
            },
            minPrice: {
                type: Sequelize.INTEGER
            },
            maxPrice: {
                type: Sequelize.INTEGER
            },
            cusines: {
                type: Sequelize.STRING
            },
            specialDiets: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            longtitude: {
                type: Sequelize.FLOAT
            },
            latitude: {
                type: Sequelize.FLOAT
            },
            provinceId: {
                type: Sequelize.INTEGER
            },
            serviceManagerId: {
                type: Sequelize.UUID
            },
            limitBookPerDay: {
                type: Sequelize.INTEGER
            },
            public: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            rating: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            totalRating: {
                type: Sequelize.FLOAT,
                defaultValue: 0
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
        await queryInterface.dropTable('Restaurants')
    }
}
