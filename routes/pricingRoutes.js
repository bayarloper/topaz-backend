// routes/pricingRoutes.js
const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

// Get all pricing plans
router.get("/", pricingController.getAllPricing);

// Get a single pricing plan by ID
router.get("/:id", pricingController.getPricingById);

// Add a new pricing plan
router.post("/", pricingController.addPricing);

// Update an existing pricing plan
router.put("/:id", pricingController.updatePricing);

// Delete a pricing plan
router.delete("/:id", pricingController.deletePricing);

module.exports = router;
