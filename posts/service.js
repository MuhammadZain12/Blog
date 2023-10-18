const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors=require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const Posts = {}

app.get('/posts', (req, res) => {
    res.status(200).json(Posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    console.log(id)
    const post={
        id,
        name: req.body
    }
    Posts[id] = post
    res.status(201).json({
        status:'success',
        post
    })
})


app.listen(4000,()=>{
    console.log('Server up and running : localhost:4000')
})