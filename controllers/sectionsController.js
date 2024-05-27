// controllers/sectionsController.js
const sqlite = require("better-sqlite3");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.upload = upload.single('image');

exports.getAllSections = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM sections").all();
    res.json({ data: rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createSection = (req, res) => {
  const { title, text } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const stmt = db.prepare("INSERT INTO sections (title, text, imageUrl) VALUES (?, ?, ?)");
    const result = stmt.run(title, text, imageUrl);
    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSection = (req, res) => {
  const { title, text } = req.body;
  const { id } = req.params;
  let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageUrl) {
    const row = db.prepare("SELECT imageUrl FROM sections WHERE id = ?").get(id);
    imageUrl = row.imageUrl;
  }

  try {
    const stmt = db.prepare("UPDATE sections SET title = ?, text = ?, imageUrl = ? WHERE id = ?");
    const result = stmt.run(title, text, imageUrl, id);
    res.json({ changes: result.changes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSection = (req, res) => {
  const { id } = req.params;
  try {
    const row = db.prepare("SELECT imageUrl FROM sections WHERE id = ?").get(id);
    if (row && row.imageUrl) {
      const filePath = path.join(__dirname, "..", row.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    const stmt = db.prepare("DELETE FROM sections WHERE id = ?");
    const result = stmt.run(id);
    res.json({ changes: result.changes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
