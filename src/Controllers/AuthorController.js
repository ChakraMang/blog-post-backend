import Author from "../Models/AuthorModel.js";
import jwt from "jsonwebtoken";

export const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "No data to create author" });

    let duplicateEmail = await Author.findOne({ email: data.email });
    if (duplicateEmail)
      return res
        .status(400)
        .send({ status: false, msg: "email is already present" });

    let savedData = await Author.create(data);
    return res.status(201).send({ status: true, msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    let userName = req.body.email;
    let password = req.body.password;
    if (!userName || !password)
      return res
        .status(401)
        .send({
          status: false,
          msg: "Username or the password is not entered",
        });

    let author = await Author.findOne({ email: userName, password: password });
    if (!author)
      return res
        .status(400)
        .send({
          status: false,
          msg: "Username or the password is not corerct",
        });

    let token = jwt.sign({ authorId: author._id.toString() }, "room 37");
    res.status(201).send({ status: true, data: token });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
