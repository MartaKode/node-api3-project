const express = require('express');
const cors = require('cors') //~~~~Stretch~~~
const userRouter = require('./users/userRouter.js') //importing userRouter
const postRouter = require('./posts/postRouter.js') //~~Stretch~~~~

const server = express();

//global middleware:
server.use(express.json())
server.use(cors()) //~~~~~~Stretch~~~~~

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger) //applies to every request made to the API (/api 's below)

server.use('/api/users', userRouter) //added api enpoint for users operations 
server.use('/api/posts', postRouter) //~~~Stretch~~~~~~

function logger(req, res, next) {
console.log(`method:${req.method} url:${req.url} timestamp:[${new Date().toISOString()}]`)

next()
}


module.exports = server;
