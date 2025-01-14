const express = require('express');
const router = express.Router();

const postionController = require('../controllers/positionController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy
router.post('/save-position', authMiddleware.AuthAdmin, postionController.createPosition);
router.get('/get-positions', authMiddleware.AuthAdmin, postionController.getAllPositions);
router.get('/get-storage-positions', authMiddleware.AuthUser, postionController.getPositionByStorage);
router.get('/get-storage-positions/:storageId', authMiddleware.AuthAdmin, postionController.getPositionByStorage);
router.delete('/delete-position/:storageId', authMiddleware.AuthAdmin, postionController.deletePosition);

module.exports = router;