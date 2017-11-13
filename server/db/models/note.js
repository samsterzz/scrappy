const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
    text: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
})

module.exports = Note