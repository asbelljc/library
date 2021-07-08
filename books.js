const express = require('express')
const router = express.Router();

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', (req, res) => {
    console.log("testing");
    res.send("testing");
    console.log("testing2");
});

router.get('/test', (req, res) => {
  console.log("testing");
  res.send("testing");
  console.log("testing2");
});

module.exports = router
