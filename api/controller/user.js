import User from "../model/user.js";
import bcrypt from "bcrypt";
import { createError } from "../util/error.js";

export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    console.log(req.body);
    const newuser = new User({
      ...req.body,
      password: hash,
    });
    const saveduser = await newuser.save();
    res.status(200).json(saveduser);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "user not found"));
    const passwordcorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordcorrect)
      return next(createError(400, "password is not correct"));

    const { password, ...other } = user._doc;
    res.status(200).json({ details: { ...other } });
  } catch (err) {
    next(err);
  }
};

export const bookticket = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userid },
      { $push: { tickets: req.body } }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getuser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userid });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
