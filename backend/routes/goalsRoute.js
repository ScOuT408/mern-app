const router = require("express").Router();
const Goal = require("../models/Goals");
const { verifyToken, verifyTokenAndAuth } = require("./auth");

// @desc    Set goal
// @route   POST /api/goals
// @access  Private

router.post("/create", verifyToken, async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ status: false, message: "Please add text" });
  }

  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  if (newGoal) {
    return res.status(201).json(newGoal);
  }
});

// @Update Goal Route
// @PUT http://localhost:5000/api/goals/:id
// @PRIVATE

router.put("/:id", verifyToken, async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(500).json("Goal Not Found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json(updatedGoal);
});

// @Delete Goal Route
// @DELETE http://localhost:5000/api/goals/:id
// @PRIVATE

router.delete("/:id", verifyToken, async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json("Goal Not Found");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

// @Get Single Goal Route
// @GET http://localhost:5000/api/goals/:id
// @PRIVATE

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const getSingleGoal = await Goal.findById(req.params.id);
    if (getSingleGoal) {
      return res.status(200).json(getSingleGoal);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// @Get All Goal Route
// @GET http://localhost:5000/api/goals/
// @PRIVATE

router.get("/", verifyToken, async (req, res) => {
  try {
    const Goals = await Goal.find({ user: req.user.id });
    res.status(200).json(Goals);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
