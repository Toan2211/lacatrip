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
        await queryInterface.addColumn(
            'Payments',
            'serviceManagerId',
            {
                type: Sequelize.UUID
            }
        )
        await queryInterface.addColumn(
            'Payments',
            'commissionAmount',
            {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        )
        await queryInterface.addColumn(
            'Payments',
            'isPayedForServiceManager',
            {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        await queryInterface.removeColumn(
            'Payments',
            'isPayedForServiceManager'
        )
        await queryInterface.removeColumn(
            'Payments',
            'isPayedForServiceManager'
        )
        await queryInterface.removeColumn(
            'Payments',
            'isPayedForServiceManager'
        )
    }
}
