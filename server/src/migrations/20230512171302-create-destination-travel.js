'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DestinationTravels', {
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
            address: {
                type: Sequelize.STRING
            },
            longtitude: {
                type: Sequelize.FLOAT
            },
            latitude: {
                type: Sequelize.FLOAT
            },
            price: {
                type: Sequelize.FLOAT
            },
            originalPrice: {
                type: Sequelize.FLOAT
            },
            provinceId: {
                type: Sequelize.INTEGER
            },
            serviceManagerId: {
                type: Sequelize.UUID
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
        await queryInterface.dropTable('DestinationTravels')
    }
}
