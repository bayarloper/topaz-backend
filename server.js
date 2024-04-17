// server.js
const cors = require("cors");
const express = require("express");
const sqlite = require("better-sqlite3");
const path = require("path");

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, "mydatabase.db");

// Create a new SQLite database connection
const db = new sqlite(dbPath);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Define your API endpoints
app.get("/api/about", (req, res) => {
  const data = db.prepare("SELECT * FROM about").all();
  res.json(data);
});

app.get("/api/blogpost", (req, res) => {
  const data = db.prepare("SELECT * FROM blog_posts").all();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
