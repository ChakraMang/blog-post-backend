import express from 'express';
const router = express.Router();

import { createAuthor, loginUser } from '../Controllers/AuthorController.js';
import { createBlog } from '../Controllers/BlogController.js'

// * Creating the User
router.post('/authors/create', createAuthor);

// * User Login
router.post('/login', loginUser);

// * Creating the Blog 
router.post('/blogs/create', createBlog)

// // * Getting All the Blogs through Filters
// router.get('/blogs/view', getBlogs)

// // * Updating a Blog 
// router.put('/blogs/update/:blogId', updateBlog)




export default router;