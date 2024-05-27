const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAllServices = (req, res) => {
  const data = db.prepare("SELECT * FROM services").all();
  res.json(data);
};

exports.addService = (req, res) => {
  const { title, details, icon } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO services (title, details, icon) VALUES (?, ?, ?)"
    );
    const result = stmt.run(title, details, icon);

    res.status(201).json({
      message: "Service added successfully",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Error adding service", error });
  }
};

exports.updateService = (req, res) => {
  const { id } = req.params;
  const { title, details, icon } = req.body;

  try {
    const stmt = db.prepare(
      "UPDATE services SET title = ?, details = ?, icon = ? WHERE id = ?"
    );
    const result = stmt.run(title, details, icon, id);

    if (result.changes > 0) {
      res.json({ message: "Service updated successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Error updating service", error });
  }
};

exports.deleteService = (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare("DELETE FROM services WHERE id = ?").run(id);

    if (result.changes > 0) {
      res.json({ message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};
