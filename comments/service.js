const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')

app = express()

app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    res.status(200).json({
        status: 'success',
        comments: commentsByPostId[id]
    })
})

app.post('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    const comments = commentsByPostId[id] || []
    const newComment = req.body
    comments.push({ id: randomBytes(4).toString('hex'), content: newComment })
    res.status(201).json({
        status: 'success',
        comments
    })
})


app.listen(4001, () => {
    console.log('Server started')
})