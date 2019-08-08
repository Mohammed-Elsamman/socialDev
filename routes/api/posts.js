const express = require("express");
const router = express.Router();
router.get('/test', (req, res) => res.json({msg: "posts is works"}));

module.exports = router;