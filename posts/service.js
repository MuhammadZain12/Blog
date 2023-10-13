const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const app = express()

const Posts = {}

app.get('/posts', (req, res) => {
    res.status(200).json(Posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    console.log(id)
    Posts[id] = {
        id,
        name: req.body
    }
})


app.listen(4000,()=>{
    console.log('Server up and running')
})