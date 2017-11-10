const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    }
})

module.exports = Project