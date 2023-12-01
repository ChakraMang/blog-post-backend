import jwt from 'jsonwebtoken';
import Blog from '../Models/BlogModel.js';
import Author from '../Models/AuthorModel.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const createBlog = async (req, res) => {
    try {
      let blog = req.body
      if (Object.keys(blog).length == 0) {
        return res.status(400).send({ status: false, msg: "No data to create a blog" })
      }
      let author_id = blog.authorId
      if (!author_id) {
        return res.status(400).send({ status: false, msg: "Author Id should be present in the blog data" })
      }
      if (!ObjectId.isValid(author_id)) {
        return res.status(404).send({ status: false, msg: "AuthorId invalid" });
      }
      let validAuthor = await Author.findById(author_id)
      if (!validAuthor) {
        return res.status(404).send({ status: false, msg: "Author data not found" });
      }
      let token = req.headers["x-api-key"]
      let decodedToken = jwt.verify(token, "room 37");
      let authorLoggedIn = decodedToken.authorId
      if (authorLoggedIn != author_id) {
        return res.status(403).send({ status: false, msg: "Author logged in cannot create blog with another author's Id" })
      }
      let is_published = blog.isPublished
      if (is_published == true) {
        blog.publishedAt = new Date()
        let blogCreated = await Blog.create(blog)
        return res.status(201).send({ status: true, data: blogCreated })
      }
      let blogCreated = await Blog.create(blog)
      return res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
    }
  }

  export const getBlog = async (req, res) => {
    try {
      if (Object.keys(req.query).length == 0) {
        let result = await Blog.find({ isDeleted: false, isPublished: true })
        if (result.length != 0)
          return res.status(200).send({status:true, data: result})
        if (result.length == 0)
          return res.status(400).send({ status: false, msg: "No blog found" })
      }
  
      let blogKeys = ["title", "auhtorId", "tags", "category", "subCategory"]
      for (let i = 0; i < Object.keys(req.query).length; i++) {
        let keyPresent = blogKeys.includes(Object.keys(req.query)[i])
        if (!keyPresent)
          return res.status(400).send({ status: false, msg: "Wrong Key present" })
      }
  
      let filterDetails = req.query;
      filterDetails.isDeleted = false;
      filterDetails.isPublished = true;
  
      let result = await Blog.find(filterDetails)
      if (result.length != 0)
        return res.status(200).send({status : true, data: result});
  
      if (result.length == 0)
        return res.status(404).send({ status: false, msg: " No blog data found" })
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
    }
  }
  

  export const updateBlog = async (req, res) => {
  try {
    let blog_id = req.params.blogId;
    if (!blog_id)
      return res.status(400).send({ status: false, msg: "Please enter blog Id" })

    if (Object.keys(req.body).length == 0)
      return res.status(400).send({ status: false, msg: "Please enter data to update" })

    let blogKeys = ["title", "body", "auhtorId", "tags", "category", "subCategory"]
    for (let i = 0; i < Object.keys(req.body).length; i++) {
      let keyPresent = blogKeys.includes(Object.keys(req.body)[i])
      if (!keyPresent)
        return res.status(400).send({ status: false, msg: "Wrong Key present" })
    }
    let updatedBlog = await Blog.findOneAndUpdate(
      { _id: blog_id, isDeleted: false },
      { $set: { title: req.body.title, body: req.body.body, category: req.body.category, isPublished: true }, $addToSet: { tags: req.body.tags, subCategory: req.body.subCategory }, $currentDate: { publishedAt: true } },
      { new: true });
    if (!updatedBlog)
      res.status(404).send({ status: false, msg: "No blog data" })
    res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}