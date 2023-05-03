'use strict'
const db = require('../models')
const dataAmenitiesHotel = require('../constants/amenitiesHotel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all(
            dataAmenitiesHotel.map(async data => {
                try {
                    await db.AmenitiesHotel.findOrCreate({
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
