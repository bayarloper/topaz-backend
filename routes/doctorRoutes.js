const express = require('express');
const multer = require('multer');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/doctors');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', upload.single('image'), doctorController.createDoctor);
router.put('/:id', upload.single('image'), doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
