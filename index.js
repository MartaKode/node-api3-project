// code away! --------->modified for the purposes of api4 project(deployment)
const server = require('./server.js')

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`)  
})
