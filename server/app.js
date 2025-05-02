if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const UserController = require('./controllers/userController')
const authentication = require('./middleware/authentication')
const JobsController = require('./controllers/jobsController')
const RoadmapController = require('./controllers/roadmapController')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.post('/login/google', UserController.loginGoogle)

app.use(authentication)

app.get('/jobs', JobsController.getJobs)
app.get('/jobs/:id', JobsController.getJobsById)

app.post('/roadmaps/generate/:id', RoadmapController.generateRoadmap)
app.get('/roadmaps', RoadmapController.getRoadmap)
app.get('/roadmaps/:id', RoadmapController.getRoadmapById)
app.delete('/roadmaps/:id', RoadmapController.deleteRoadmap)

app.use(errorHandler)

module.exports = app