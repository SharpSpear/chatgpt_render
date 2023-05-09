const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Chatgpt = require("../models/messageModel");
const fetch = require("node-fetch");

router.post("/register", async (req, res) => {
  try {
    let { email, password, firstName, lastName } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
 
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.firstName + " " + user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/survey", async (req, res) => {
  try {
    const token = req.body.token;
    const result = await fetch("https://api.typeform.com/forms/ScbxJImG/responses", {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    });    
    console.log("bbbbbbbbbbbbbbbbbbbb",result);
		//if(!result.ok) return;
		const data = await result.json();    
    console.log("ddddddddddddddddd",data);
    const items = data.items[0].answers;
    console.log("gggggggggggggggggggg");
    let item = [];
    for(let i = 0 ; i < items.length ; i++){
      item.push(items[i].number);
    }
    console.log("3333333333", item);
		res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {

  try {
    let { input, output1} = req.body;
    if (!input || !output1)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    
    const input_history = await Chatgpt.findOne({ input: input });
    if (input_history)
      return res
        .status(400)
        .json({ msg: "The question already exists." });

    const newAnswer = new Chatgpt({
      input:input,
      output:output1
    });
    
    const savedAnswer = await newAnswer.save();
    res.json({msg: "Save successfully!"});
    console.log("!@#", input, output1)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
