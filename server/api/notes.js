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

router.put('/add', (req, res, next) => {
  console.log('REQ BOOOOOOOOODY', req.body)
  Note.findById(req.body.id)
    .then(note => {
      note.update({
        projectId: req.body.projectId,
        text: req.body.text,
        image: req.body.image,
        isPublished: true
      })
    })
    .then(note => res.json(note))
    .catch(next)
})

router.delete('/remove/:id', (req, res, next) => {
    Note.findById(req.params.id)
    .then(note => note.destroy())
    .catch(next);
})