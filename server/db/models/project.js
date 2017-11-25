const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    isArchived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Project