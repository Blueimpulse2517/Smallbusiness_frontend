const express = require("express");
const router = express.Router();

const { handleSubmit } = require("../controllers/emailControllers");

router.post("/handleSubmit", handleSubmit);

module.exports = router;
