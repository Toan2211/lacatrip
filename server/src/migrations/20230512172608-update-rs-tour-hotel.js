'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            'DestinationTravels',
            'clickCount',
            {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0
            }
        )
        await queryInterface.addColumn('Restaurants', 'clickCount', {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0
        })
        await queryInterface.addColumn('Hotels', 'clickCount', {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Hotels')
        await queryInterface.dropTable('Restaurants')
        await queryInterface.dropTable('DestinationTravels')
    }
}
