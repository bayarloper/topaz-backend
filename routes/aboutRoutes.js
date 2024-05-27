const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.getAboutPage);
router.put("/update/:id", aboutController.updateAboutPage);

module.exports = router;
