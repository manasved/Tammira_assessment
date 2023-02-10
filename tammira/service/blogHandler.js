const mongoose = require("mongoose");


const { Blog } = require("../models/blog");
const { checkUserExist, createUser } = require("./authorHandler");

async function createBlog(blog) {
    let user = await checkUserExist(blog.author);
    if (user == null) {
      user = await createUser(blog.author);
    }

    let newBlog = Blog.init();
    newBlog = new Blog({
      title: blog.title,
      subtitle: blog.subtitle,
      content: blog.content,
      slug: blog.slug,
      tags: blog.tags,
      created_date: blog.created_date != null ? blog.created_date : new Date(),
      modified_date: blog.modified_date != null ? blog.modified_date : new Date(),
      author: user._id
    });

    newBlog._id = new mongoose.Types.ObjectId();
    const insertedBlog = await newBlog.save();
    return insertedBlog;

}

async function updateBlog(blog, id) {
  try {
    let user = null
    if (blog.author) {
      user = await checkUserExist(blog.author);
      if (user == null) {
        user = await createUser(blog.author);
      }
    }
    let blogToUpdate = blog
    blogToUpdate['author'] = user._id;
    blogToUpdate['modified_date'] = new Date();

    const updatedBlog = await Blog.updateOne({ _id: id }, { ...blogToUpdate }, {upsert:true});
    return updatedBlog != null && updatedBlog.matchedCount > 0
  } catch(e) {
    console.log(e)
    return false
  }
}

async function fetchBlogs(page) {
    const PAGE = page
    const BLOGS_PER_PAGE = 5;

    let blogs = await Blog.find(null, null, { skip: PAGE*BLOGS_PER_PAGE, limit: BLOGS_PER_PAGE }).populate({
      path: 'author',
      model: 'users'
    });
    return blogs
}


async function fetchBlogsByTags(tags) {
    return await Blog.find({tags: {$in: tags}}).populate({
        path: 'author',
        model: 'users'
      });
}


module.exports = {
    createBlog,
    updateBlog,
    fetchBlogs,
    fetchBlogsByTags
}