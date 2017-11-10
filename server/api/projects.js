const router = require('express').Router()
const {Project} = require('../db/models')
module.exports = router

router.get('/single/:projectname', (req, res, next) => {
    Project.findOne({
        where: {
            name: req.params.projectname
        }
    })
    .then(project => res.json(project))
    .catch(next)
})

router.get('/:userid', (req, res, next) => {
    Project.findAll({
        where: {
            userId: req.params.userid
        }
    })
    .then(projects => res.json(projects))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Project.findAll()
    .then(projects => res.json(projects))
    .catch(next)
})