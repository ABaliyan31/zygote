const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const healthController = require("../controllers/healthController");

router.get("/", indexController.index);
router.get("/health", healthController.check);

module.exports = router;
