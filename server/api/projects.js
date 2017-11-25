const router = require('express').Router()
const {Project, Note} = require('../db/models')
module.exports = router

router.get('/archived/:userId', (req, res, next) => {
    Project.findAll({
        where: {
            userId: req.params.userId,
            isArchived: true
        }
    })
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/name/:name', (req, res, next) => {
    Project.findOne({
        where: {
            name: req.params.name
        }
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

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

router.put('/archive', (req, res, next) => {
    Project.update(
        {isArchived: true},
        {where: {id: req.body}}
    )
    .then(projects => res.json(projects));
})

router.put('/unarchive', (req, res, next) => {
    Project.update(
        {isArchived: false},
        {where: {id: req.body}}
    )
    .then(projects => res.json(projects));
})