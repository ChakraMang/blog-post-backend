import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please enter a title"],
    },

    body: {
      type: String,
      trim: true,
      required: [true, "Please enter body"],
    },

    authorId: {
      type: ObjectId,
      ref: "Author",
      required: [true, "Please enter author Id"],
    },

    tags: {
      type: [],
    },

    category: {
      type: String,
      trim: true,
      required: [true, "Please enter a category"],
    },

    subCategory: {
      type: [],
    },
    deletedAt: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },

    publishedAt: String,

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
