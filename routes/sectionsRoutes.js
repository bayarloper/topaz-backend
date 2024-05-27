// routes/sectionsRoutes.js
const express = require('express');
const router = express.Router();
const sectionsController = require('../controllers/sectionsController');

router.get('/', sectionsController.getAllSections);
router.post('/', sectionsController.upload, sectionsController.createSection);
router.put('/:id', sectionsController.upload, sectionsController.updateSection);
router.delete('/:id', sectionsController.deleteSection);

module.exports = router;
