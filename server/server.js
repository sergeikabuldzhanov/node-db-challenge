//Dependenccies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Routers
const projectRouter = require('./projectRouter')
const taskRouter = require('./taskRouter')
const resourceRouter = require('./resourceRouter')
//Server setup
const server = express();

//Middleware plug in
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/projects', projectRouter)
server.use('/api/tasks', taskRouter)
server.use('/api/resources', resourceRouter)


//Export the server
module.exports = server;