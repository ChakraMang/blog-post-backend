import express from 'express';
const router = express.Router();

import { createAuthor, loginUser } from '../Controllers/AuthorController.js';
import { createBlog, getBlogs, updateBlog } from '../Controllers/BlogController.js'

// * Checking the server

router.get('/test', (req, res) => {
    console.log('Every things is working fine!')

    return res.json('Welcome! Every thing is working Fine')
})

// * Creating the User
router.post('/authors/create', createAuthor);

// * User Login
router.post('/login', loginUser);

// * Creating the Blog 
router.post('/blogs/create', createBlog)

// * Getting All the Blogs through Filters
router.get('/blogs/view', getBlogs)

// * Updating a Blog 
router.put('/blogs/update/:blogId', updateBlog)




export default router;