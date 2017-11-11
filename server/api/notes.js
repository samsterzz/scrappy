const router = require('express').Router()
const {Note} = require('../db/models')
module.exports = router

router.get('/:userid/draft', (req, res, next) => {
  Note.findOne({
    where: {
      userId: req.params.userid,
      isPublished: false
    }
  })
    .then(notes => res.json(notes))
    .catch(next)
})

router.get('/:userid', (req, res, next) => {
  Note.findAll({
    where: {
      userId: req.params.userid,
      isPublished: true
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