import jwt from 'jsonwebtoken';
import Blog from '../Models/BlogModel';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


const secretKey = process.env.JWT_SECRET_KEY || "room 37"; // Secret key should be in environment variables

export const authentication = async (req, res, next) =>  {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "Token must be present" });

               let decodedToken = jwt.verify(token, secretKey); // Validate and decode token in one go
        if (!decodedToken) return res.status(401).send({ status: false, msg: "Token is invalid" });

        // Store decoded token information in request object if needed in next middleware
        req.user = decodedToken;

        next();
    } catch (error) {
        // Token verification fail will also enter this catch block
        res.status(401).send({ status: false, msg: "Token is invalid", error: error.message });
    }
};

export const authorisation = async (req, res, next) =>  {
    try {
        let blogId = req.params.blogId;
        if (!ObjectId.isValid(blogId)) return res.status(404).send({ status: false, msg: "Blog Id is invalid" });

        let blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).send({ status: false, msg: "Blog not found" }); // Not found rather than bad request

        // Assuming authentication passed, we can use authorId from the user stored in req by authentication
        let loggedInAuthorId = req.user.authorId;
        if (blog.authorId.toString() !== loggedInAuthorId) {
            return res.status(403).send({ status: false, msg: "User is not authorized to perform this operation" });
        }

        next();
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};
