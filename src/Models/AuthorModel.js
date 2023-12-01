import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: [true, "Please enter firstname"],
    },
    lname: {
      type: String,
      trim: true,
      required: [true, "Please enter lastname"],
    },
    title: {
      type: String,
      required: [true, "Please enter title"],
      enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter a email address"],
      trim: true,
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please fill a valid email address",
        isAsync: false,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter a password"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
