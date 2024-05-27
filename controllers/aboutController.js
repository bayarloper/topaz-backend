// controllers/aboutController.js
const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAboutPage = (req, res) => {
  const data = db.prepare("SELECT id, title, description FROM about").all();
  res.json(data);
};

exports.updateAboutPage = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    db.prepare("UPDATE about SET description = ? WHERE id = ?").run(
      description,
      id
    );
    res
      .status(200)
      .json({ message: "About page description updated successfully" });
  } catch (error) {
    console.error("Error updating about page description:", error);
    res
      .status(500)
      .json({ message: "Error updating about page description", error });
  }
};
