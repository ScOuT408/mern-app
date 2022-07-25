const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAuth } = require("./auth");

// @Create User Route
// @POST http://localhost:5000/api/users/
// @PUBLIC
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: "false", message: "Fill All The Fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ status: "false", message: "This Email Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    if (saveUser) {
      res.status(200).json(saveUser);
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// @Login User Route
// @POST http://localhost:5000/api/login
// @PUBLIC

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "false", message: "Fill All The Fields" });
  }

  const findUser = await User.findOne({ email });

  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    const accesstoken = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    return res.status(201).json({
      _id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token: accesstoken,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
});

// @Get Single User Detail
// @POST http://localhost:5000/api/users/find/:id
// @PRIVATE

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json({
      _id: getUser.id,
      name: getUser.name,
      email: getUser.email,
    });
  } catch (err) {
    res.status(500).json({
      status: "false",
      message: err.message,
    });
  }
});

module.exports = router;
