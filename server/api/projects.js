const router = require('express').Router()
const {Project, Note} = require('../db/models')
module.exports = router

router.get('/:name', (req, res, next) => {
    Project.findOne({
        where: {
            name: req.params.name
        }
    })
    .then(project => {
        Note.findAll({
            where: {
                projectId: project.id
            }
        })
        .then(notes => res.json(notes))
        .catch(next)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Project.findAll()
    .then(projects => res.json(projects))
    .catch(next)
})

router.post('/add', (req, res, next) => {
  Project.create(req.body)
    .then(project => res.json(project))
    .catch(next)
})