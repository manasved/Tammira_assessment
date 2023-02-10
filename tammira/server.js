const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');



const { createUser } = require("./service/authorHandler");
const { createBlog, updateBlog, fetchBlogs, fetchBlogsByTags } = require("./service/blogHandler");
const { validateTags } = require("./helpers/stringHelper");
const DBCONSTANTS = require("./constants/dbConstants");


const app = express()
app.use(cors());
app.use(express.json());

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Welcome to Tammira Blogs')
})

app.post("/user", async (req, res) => {
  const insertedUser = await createUser(req.body);
  return res.status(201).json(insertedUser);
});


app.post("/blog", async (req, res) => {
  let response = {}
  let responseCode = 201

  if (req.body == null || req.body.author == null || req.body.title == null) {
    response['error'] = "The request doesn't contain one of the fields - Author/Title"
    responseCode = 400
  } else {
    response = await createBlog(req.body);
  }
  return res.status(responseCode).json(response);
});


app.put("/blog", async (req, res) => {
  let response = {}
  let responseCode = 200

  if (req.query == null || req.query.id == null) {
    response['error'] = 'Please mention the Blog ID'
    responseCode = 400
  } else {
    response['isSuccess'] = await updateBlog(req.body, req.query.id);
  }
  return res.status(responseCode).json(response);
});


app.get("/blog", async (req, res) => {
  
  let response = {}
  let responseCode = 200

  if (req.query == null || req.query.page == null) {
    response['error'] = 'Request does not contain page information'
    responseCode = 400
  } else {
    response = await fetchBlogs(req.query.page);
  }
  return res.status(responseCode).json(response);
});

app.get("/blog/tags", async (req, res) => {
  let tags = []
  if (req.query != null && req.query.tags != null) {
    tags = validateTags(req.query.tags);
  }
  let blogs = await fetchBlogsByTags(tags);
  return res.status(200).json(blogs);
});



const start = async () => {
  try {
    await mongoose.connect(
      DBCONSTANTS.MONGO_CONNECTION_URL
    );
    app.listen(PORT, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();