const router = require('express').Router()
const {Note} = require('../db/models')
const multer = require('multer');
const form = multer();
module.exports = router

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

router.get('/search/:terms', (req, res, next) => {
  let terms = req.params.terms
  Note.findAll({
    where: {
      text: {
        $like: '%' + terms + '%'
      }
    }
  })
  .then(notes => res.json(notes))
})

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

router.post('/add', form.single('image'), (req, res, next) => {

  Note.create(req.body)
    .then(note => {

      if (req.file) {
        // test.something.png
        let parts = req.file.originalname.split('.');
        let params = {
          Bucket: 'scrappynotes', 
          Key: note.id + '.' + parts[parts.length - 1], 
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ACL: "public-read"
        };

        s3.putObject(params, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log("Successfully uploaded data to myBucket/myKey");
            
            note.update({
              image: params.Key
            })
          }

          res.json(note)
        });
      } else {
        res.json(note)
      }
    })
    .catch(next)
})

router.put('/edit/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => note.update(req.body))
  .catch(next)
})

router.delete('/remove/:id', (req, res, next) => {
    Note.findById(req.params.id)
    .then(note => note.destroy())
    .catch(next);
})