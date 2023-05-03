'use strict'
const db = require('../models')
const dataProvinces = require('../constants/provinces')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all(
            dataProvinces.map(async data => {
                try {
                    await db.Province.findOrCreate({
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
