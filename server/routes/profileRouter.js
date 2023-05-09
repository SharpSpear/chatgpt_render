const router = require("express").Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

router.get("/read", auth, async (req, res) => {
  // get all informations
  // const users = await User.find({});
  // let userInfos = userInfo.map(({email, displayName}) => ({email, displayName}));

  const userInfo = await User.findById(req.user);
  res.json({
    email: userInfo.email,
    displayName: userInfo.displayName,
  });
});

router.post("/register", async (req, res) => {
  // get all informations
  // const users = await User.find({});
  // let userInfos = userInfo.map(({email, displayName}) => ({email, displayName}));

  console.log("ppppppppp", req.body);

  const existingUser = await Message.findOne({ email: req.body.Email });
  if (existingUser)
    return res
      .status(400)
      .json({ msg: "An message with this email already exists." });

  const userInfo = await User.findById(req.user);
  const newMessage = new Message({
    firstname: req.body.FirstName,
    email: req.body.Email,
    message: req.body.Message,
  });
  const savedUser = await newMessage.save();
  res.json(savedUser);
});

module.exports = router;