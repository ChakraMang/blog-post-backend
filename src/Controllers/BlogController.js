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
      let validAuthor = await AuthorModel.findById(author_id)
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