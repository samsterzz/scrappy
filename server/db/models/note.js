const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
    subject: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.BLOB
    },
    isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Note