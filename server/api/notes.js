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

router.post('/add', (req, res, next) => {
  Note.create(req.body)
    .then(note => res.json(note))
    .catch(next)
})

router.delete('/remove/:id', (req, res, next) => {
    Note.findById(req.params.id)
    .then(note => note.destroy())
    .catch(next);
})