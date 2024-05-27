// routes/personReqRoutes.js
const express = require("express");
const router = express.Router();
const personReqController = require("../controllers/personReqController");

router.get("/", personReqController.getAllRequests);
router.get("/:id", personReqController.getRequestById);
router.post("/", personReqController.addRequest);
router.put("/:id", personReqController.updateRequest);
router.delete("/:id", personReqController.deleteRequest);

module.exports = router;
