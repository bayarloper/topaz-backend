const sqlite = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAllDoctors = (req, res) => {
    try {
        const stmt = db.prepare("SELECT * FROM doctors");
        const rows = stmt.all();
        res.json({ doctors: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctorById = (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare("SELECT * FROM doctors WHERE id = ?");
        const row = stmt.get(id);
        res.json({ doctor: row });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDoctor = (req, res) => {
    const { name, title } = req.body;
    const image = req.file ? `/uploads/doctors/${req.file.filename}` : null;

    try {
        const stmt = db.prepare(`INSERT INTO doctors (name, title, image) VALUES (?, ?, ?)`);
        const info = stmt.run(name, title, image);
        res.json({ id: info.lastInsertRowid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDoctor = (req, res) => {
    const { id } = req.params;
    const { name, title } = req.body;
    const image = req.file ? `/uploads/doctors/${req.file.filename}` : req.body.image;

    try {
        const stmt = db.prepare(`UPDATE doctors SET name = ?, title = ?, image = ? WHERE id = ?`);
        stmt.run(name, title, image, id);
        res.json({ updatedID: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDoctor = (req, res) => {
    const { id } = req.params;

    try {
        const selectStmt = db.prepare("SELECT image FROM doctors WHERE id = ?");
        const row = selectStmt.get(id);

        if (row && row.image) {
            const imagePath = path.join(__dirname, '..', row.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
            });
        }

        const deleteStmt = db.prepare("DELETE FROM doctors WHERE id = ?");
        deleteStmt.run(id);
        res.json({ deletedID: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
