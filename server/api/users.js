const router = require('express').Router()
const {User, Project} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Project.findAll({
        where: {
            userId: req.params.id
        }
    })
    .then(projects => res.json(projects))
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next)
})