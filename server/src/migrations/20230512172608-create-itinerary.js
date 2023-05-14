'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Itineraries', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
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
            step: {
                type: Sequelize.INTEGER
            },
            destinationTravelId: {
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
        await queryInterface.dropTable('Itineraries')
    }
}
