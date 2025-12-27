const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

// IMPORT THE UPLOAD MIDDLEWARE
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(protect, getGoals)
  // UPDATE THIS LINE: Add upload.single('image')
  .post(protect, upload.single('image'), setGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;