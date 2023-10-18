const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors=require('cors')

app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    res.status(200).json({
        status: 'success',
        comments: commentsByPostId[id] || []
    })
})

app.post('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    const comments = commentsByPostId[id] || []
    const { content } = req.body
    comments.push({ id: randomBytes(4).toString('hex'), content })
    commentsByPostId[id] = comments
    res.status(201).json({
        status: 'success',
        comments
    })
})


app.listen(4001, () => {
    console.log('Server started : 127.0.0.1:4001')
})