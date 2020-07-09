const express = require('express');

const userDb = require('./userDb.js');// database for user
const postDb = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(newUser => {
      console.log(newUser)
      res.status(201).json(newUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error posting new user; user name must be unique" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => { //!!!!!!!!!!!!!!
  // do your magic!
  postDb.insert(req.upgradedPost)
    .then(newPost => {
      console.log("new post POST:", newPost)
      res.status(201).json(newPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: `error posting new post to user id ${req.params.id}` })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Users info could not be retrieved" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      console.log(posts)
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not fetch posts for that user" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(totalDeleted => {
      console.log('total deleted:', totalDeleted)
      res.status(200).json({ message: "user successfully deleted" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error deleting user" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  if(!req.body.name){
    res.status(404).json({message: "name to update was not provided"})
  }
  userDb.update(req.params.id, req.body)
    .then(totalUpdated => {
      console.log('total updated:', totalUpdated)
      res.status(200).json({message: `user successfully updated`})
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({error:"error modifying user; that name is not unique"})
    })
});


//`````````custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  console.log("validateUserId id:", req.params.id)
  userDb.getById(req.params.id)
    .then(user => {
      // console.log(user)
      if (!user) {
        res.status(404).json({ message: "invalid user id" })
      } else {
        req.user = user
        console.log('validateUserId user:', user)
        next()
      }
    })
    .catch(er => {
      console.log(err)
      res.status(500).json({ error: "error validating the user id" })
    })

}

function validateUser(req, res, next) {
  // do your magic!
  console.log('validateUser req.body keys:',Object.keys(req.body))
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  req.upgradedPost = {...req.body, user_id: Number(req.params.id)}
console.log("validatePost:", req.upgradedPost)
  if (Object.keys(req.upgradedPost).length === 1) { //had to change 0 to 1 after adding the id to req.body
    res.status(400).json({ message: "missing post data" })
  } else if (!req.upgradedPost.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

module.exports = router;
