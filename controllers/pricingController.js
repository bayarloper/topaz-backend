// controllers/pricingController.js
const sqlite = require("better-sqlite3");
const path = require("path");

// Define the path to the SQLite database file
const dbPath = path.resolve(__dirname, "../mydatabase.db");

// Connect to the SQLite database
const db = new sqlite(dbPath);

// Function to get all pricing plans
exports.getAllPricing = (req, res) => {
  const query = "SELECT * FROM pricing";
  try {
    const pricing = db.prepare(query).all();
    res.json(pricing);
  } catch (err) {
    console.error("Error fetching pricing plans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get a single pricing plan by ID
exports.getPricingById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM pricing WHERE id = ?";
  try {
    const pricing = db.prepare(query).get(id);
    if (!pricing) {
      return res.status(404).json({ error: "Pricing plan not found" });
    }
    res.json(pricing);
  } catch (err) {
    console.error("Error fetching pricing plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to add a new pricing plan
exports.addPricing = (req, res) => {
  const { title, serviceList, price } = req.body;
  const query =
    "INSERT INTO pricing (title, serviceList, price) VALUES (?, ?, ?)";
  try {
    const result = db.prepare(query).run(title, serviceList, price);
    res.json({
      id: result.lastInsertRowid,
      message: "Pricing plan added successfully",
    });
  } catch (err) {
    console.error("Error adding pricing plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to update an existing pricing plan
exports.updatePricing = (req, res) => {
  const id = req.params.id;
  const { title, serviceList, price } = req.body;
  const query =
    "UPDATE pricing SET title = ?, serviceList = ?, price = ? WHERE id = ?";
  try {
    const result = db.prepare(query).run(title, serviceList, price, id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Pricing plan not found" });
    }
    res.json({ message: "Pricing plan updated successfully" });
  } catch (err) {
    console.error("Error updating pricing plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a pricing plan
exports.deletePricing = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM pricing WHERE id = ?";
  try {
    const result = db.prepare(query).run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Pricing plan not found" });
    }
    res.json({ message: "Pricing plan deleted successfully" });
  } catch (err) {
    console.error("Error deleting pricing plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
