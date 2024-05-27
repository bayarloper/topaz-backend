// controllers/faqController.js
const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAllFAQs = (req, res) => {
  try {
    const faqs = db.prepare("SELECT * FROM faqs").all();
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFAQById = (req, res) => {
  const id = req.params.id;
  try {
    const faq = db.prepare("SELECT * FROM faqs WHERE id = ?").get(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json(faq);
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addFAQ = (req, res) => {
  const { question, answer } = req.body;
  try {
    const result = db
      .prepare("INSERT INTO faqs (question, answer) VALUES (?, ?)")
      .run(question, answer);
    res.json({ id: result.lastInsertRowid, message: "FAQ added successfully" });
  } catch (error) {
    console.error("Error adding FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateFAQ = (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  try {
    const result = db
      .prepare("UPDATE faqs SET question = ?, answer = ? WHERE id = ?")
      .run(question, answer, id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json({ message: "FAQ updated successfully" });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteFAQ = (req, res) => {
  const id = req.params.id;
  try {
    const result = db.prepare("DELETE FROM faqs WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
