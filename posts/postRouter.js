const express = require('express');

const postDb = require('./postDb'); //imported postDb

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
  .then(posts =>{
    console.log(posts)
    res.status(200).json(posts)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error: "error fetching posts"})
  })
});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
 res.status(200).json(req.post)
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
  .then(totalDeleted =>{
    console.log('totalDeleted:', totalDeleted)
    res.status(200).json({message: "successfully deleted post!"})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error:"error deleting post"})
  })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  if(!req.body.text){
    res.status(404).json({message: "no text to update was provided"})
  }
  postDb.update(req.params.id, req.body)
  .then( totalUpdated =>{
    console.log('total updated:', totalUpdated)
    res.status(200).json({message: "post successfully updated!"})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error:"error updating post"})
  })
});


//```````` custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id)
  .then( post =>{
    console.log('validatePostId post:', post)
    if(!post){
      res.status(404).json({error:"invalid post id"})
    }else{
      req.post = post
      next()
    }
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error:"error validating post id"})
  })
}

module.exports = router;
