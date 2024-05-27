// controllers/blogController.js
const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAllBlogPosts = (req, res) => {
    const data = db.prepare("SELECT * FROM blog_posts").all();
    res.json(data);
};

exports.addBlogPost = (req, res) => {
    const { title, content, author, created_at, image, content_full } = req.body;

    try {
        const stmt = db.prepare("INSERT INTO blog_posts (title, content, author, created_at, image, content_full) VALUES (?, ?, ?, ?, ?, ?)");
        const result = stmt.run(title, content, author, created_at, image, content_full);

        res.status(201).json({
            message: "Blog post added successfully",
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error("Error adding blog post:", error);
        res.status(500).json({ message: "Error adding blog post", error });
    }
};

exports.updateBlogPost = (req, res) => {
    const { id } = req.params;
    const { title, content, author, created_at, image, content_full } = req.body;

    try {
        const stmt = db.prepare("UPDATE blog_posts SET title = ?, content = ?, author = ?, created_at = ?, image = ?, content_full = ? WHERE id = ?");
        const result = stmt.run(title, content, author, created_at, image, content_full, id);

        if (result.changes > 0) {
            res.json({ message: "Blog post updated successfully" });
        } else {
            res.status(404).json({ message: "Blog post not found" });
        }
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ message: "Error updating blog post", error });
    }
};

exports.deleteBlogPost = (req, res) => {
    const { id } = req.params;

    try {
        const result = db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);

        if (result.changes > 0) {
            res.json({ message: "Blog post deleted successfully" });
        } else {
            res.status(404).json({ message: "Blog post not found" });
        }
    } catch (error) {
        console.error("Error deleting blog post:", error);
        res.status(500).json({ message: "Error deleting blog post", error });
    }
};
