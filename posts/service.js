const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const Posts = {}

app.get('/posts', (req, res) => {
    res.status(200).json(Posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const post = {
        id,
        name: req.body
    }
    Posts[id] = post
    await axios.post("http://localhost:4005/events", { type: 'PostCreated', data: post })
    res.status(201).json({
        status: 'success',
        post
    })
})


app.listen(4000, () => {
    console.log('Server up and running : localhost:4000')
})