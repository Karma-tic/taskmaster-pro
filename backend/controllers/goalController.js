const asyncHandler = require('express-async-handler')
const redisClient = require('../config/redis'); // Import our new Redis client
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  // 1. Define a unique cache key based on the User ID
  // We use the user ID so users don't see each other's cached goals
  const cacheKey = `goals:${req.user.id}`;

  // 2. Check Redis (Cache)
  const cachedGoals = await redisClient.get(cacheKey);

  if (cachedGoals) {
    // HIT: Found in cache! Return it immediately.
    console.log('Serving from Redis Cache');
    return res.status(200).json(JSON.parse(cachedGoals));
  }

  // MISS: Not in cache. Get from MongoDB.
  console.log('Serving from MongoDB');
  const goals = await Goal.find({ user: req.user.id });

  // 3. Save to Redis (Cache)
  // Set expiration to 3600 seconds (1 hour) so it doesn't stay stale forever
  await redisClient.set(cacheKey, JSON.stringify(goals), {
    EX: 3600 
  });

  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
const cacheKey = `goals:${req.user.id}`;
await redisClient.del(cacheKey);

res.status(200).json(goal);
  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
