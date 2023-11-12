const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    comments: commentsByPostId[id] || [],
  });
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = req.params.id;
  const comments = commentsByPostId[id] || [];
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: id },
  });
  console.log(comments);
  res.status(201).json({
    comments,
  });
});

app.post("/events", (req, res) => {
  console.log("Event : " + req.body.type);
  res.send('ok');
});

app.listen(4001, () => {
  console.log("Server started : 127.0.0.1:4001");
});
