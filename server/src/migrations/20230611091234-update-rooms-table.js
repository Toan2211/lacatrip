'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Rooms', 'image', {
            type: Sequelize.STRING
        })
        await queryInterface.addColumn('Rooms', 'childrenCount', {
            type: Sequelize.INTEGER
        })
        await queryInterface.addColumn('Rooms', 'adultCount', {
            type: Sequelize.INTEGER
        })
        await queryInterface.addColumn('Rooms', 'area', {
            type: Sequelize.INTEGER
        })
        await queryInterface.addColumn('Rooms', 'bedCount', {
            type: Sequelize.INTEGER
        })
        await queryInterface.removeColumn('Rooms', 'maxPeople')
        await queryInterface.removeColumn('Rooms', 'roomNo')
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Rooms', 'image')
        await queryInterface.removeColumn('Rooms', 'childrenCount')
        await queryInterface.removeColumn('Rooms', 'adultCount')
        await queryInterface.removeColumn('Rooms', 'area')
        await queryInterface.removeColumn('Rooms', 'bedCount')
    }
}
