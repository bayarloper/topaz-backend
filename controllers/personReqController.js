// controllers/personReqController.js
const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = sqlite(dbPath);

exports.getAllRequests = (req, res) => {
  const query = "SELECT * FROM personReq";
  const requests = db.prepare(query).all();
  res.json(requests);
};

exports.getRequestById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM personReq WHERE id = ?";
  const request = db.prepare(query).get(id);
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json(request);
};

exports.addRequest = (req, res) => {
  const { title, number } = req.body;
  const query = "INSERT INTO personReq (title, number) VALUES (?, ?)";
  const result = db.prepare(query).run(title, number);
  res.json({
    id: result.lastInsertRowid,
    message: "Request added successfully",
  });
};

exports.updateRequest = (req, res) => {
  const id = req.params.id;
  const { title, number } = req.body;
  const query = "UPDATE personReq SET title = ?, number = ? WHERE id = ?";
  const result = db.prepare(query).run(title, number, id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json({ message: "Request updated successfully" });
};

exports.deleteRequest = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM personReq WHERE id = ?";
  const result = db.prepare(query).run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json({ message: "Request deleted successfully" });
};
