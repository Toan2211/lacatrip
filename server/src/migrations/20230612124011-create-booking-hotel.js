'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookingHotels', {
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
            hotelId: {
                type: Sequelize.UUID
            },
            roomTypeId: {
                type: Sequelize.UUID
            },
            checkIn: {
                type: Sequelize.DATE
            },
            checkOut: {
                type: Sequelize.DATE
            },
            countAdults: {
                type: Sequelize.INTEGER
            },
            countChildrens: {
                type: Sequelize.INTEGER
            },
            countRooms: {
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
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BookingHotels')
    }
}
