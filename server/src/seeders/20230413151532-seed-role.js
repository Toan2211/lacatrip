'use strict'

const db = require('../models')
const dataRole = require('../constants/role')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all(
            dataRole.map(async data => {
                try {
                    await db.Role.findOrCreate({
                        where: data,
                        defaults: data
                    })
                } catch (error) {
                    console.log(error)
                }
            })
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
}
