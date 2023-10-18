const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

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

app.post('/posts/:id/comments', async (req, res) => {
    const id = req.params.id
    const comments = commentsByPostId[id] || []
    const { content } = req.body
    const commentId = randomBytes(4).toString('hex')
    comments.push({ id: commentId, content })
    commentsByPostId[id] = comments
    await axios.post('http://localhost:4005/events', { type: 'CommentCreated', data: { id: commentId, content, postId: id } })
    res.status(201).json({
        status: 'success',
        comments
    })
})


app.listen(4001, () => {
    console.log('Server started : 127.0.0.1:4001')
})