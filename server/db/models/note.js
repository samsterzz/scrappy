const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
    subject: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.TEXT
    },
    imagePath: {
        type: Sequelize.VIRTUAL,
        get() {
            // return s3 pathname + this.id?
        }
    }
})

module.exports = Note