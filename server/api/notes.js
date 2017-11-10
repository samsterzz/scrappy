const router = require('express').Router()
const {Note} = require('../db/models')
module.exports = router

router.get('/:userid', (req, res, next) => {
  Note.findAll({
    where: {
      userId: req.params.userid
    }
  })
    .then(notes => res.json(notes))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Note.findAll()
    .then(notes => res.json(notes))
    .catch(next)
})