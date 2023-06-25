'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'BookingDestinationTravels',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4
                },
                userId: {
                    type: Sequelize.UUID
                },
                serviceManagerId: {
                    type: Sequelize.UUID
                },
                destinationTravelId: {
                    type: Sequelize.UUID
                },
                date: {
                    type: Sequelize.DATE
                },
                countPeople: {
                    type: Sequelize.INTEGER
                },
                amount: {
                    type: Sequelize.INTEGER
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }
        )
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BookingDestinationTravels')
    }
}
