require('dotenv').config()

const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const UserController = require('./controllers/userController')
const authentication = require('./middleware/authentication')
const JobsController = require('./controllers/jobsController')
const RoadmapController = require('./controllers/roadmapController')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', UserController.register)
app.post('/login', UserController.login)

app.use(authentication)

app.get('/jobs', JobsController.getJobs)
app.get('/jobs/:id', JobsController.getJobsById)

app.post('/roadmaps/generate', RoadmapController.generateRoadmap)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
