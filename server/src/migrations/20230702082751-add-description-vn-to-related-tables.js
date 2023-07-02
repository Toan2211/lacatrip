'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('Hotels', 'descriptionVN', {
            type: Sequelize.TEXT
        })
        await queryInterface.addColumn('Rooms', 'descriptionVN', {
            type: Sequelize.TEXT
        })
        await queryInterface.addColumn(
            'Restaurants',
            'descriptionVN',
            {
                type: Sequelize.TEXT
            }
        )
        await queryInterface.addColumn(
            'DestinationTravels',
            'descriptionVN',
            {
                type: Sequelize.TEXT
            }
        )
        await queryInterface.addColumn(
            'Itineraries',
            'descriptionVN',
            {
                type: Sequelize.TEXT
            }
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('Hotels', 'descriptionVN')
        await queryInterface.removeColumn('Rooms', 'descriptionVN')
        await queryInterface.removeColumn(
            'Restaurants',
            'descriptionVN'
        )
        await queryInterface.removeColumn(
            'DestinationTravels',
            'descriptionVN'
        )
        await queryInterface.removeColumn(
            'Itineraries',
            'descriptionVN'
        )
    }
}
