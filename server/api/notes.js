const router = require('express').Router()
const {Note} = require('../db/models')
module.exports = router

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

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
    .then(note => {
      console.log('THE NOTE image', note)
      let params = {
        Bucket: 'scrappynotes', 
        Key: note.id + '.jpg', 
        Body: req.body.image,
        ContentType: "image/jpeg",
        ACL: "public-read"
      };

      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully uploaded data to myBucket/myKey");
        }
      });

      res.json(note)
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


// if (err) {
//    console.log(err);
// } else {
//   let params = {Bucket: 'scrappynotes', Key: myKey, Body: 'Hello!'};

//   s3.putObject(params, function(err, data) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// }

