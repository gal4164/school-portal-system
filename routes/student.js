const express = require('express');
const router = express.Router();
const multer = require('multer');
const studentController = require('../controllers/studentController');
const { auth, authorize } = require('../middleware/auth');

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 }
});

// All routes require student role
router.use(auth, authorize('student'));

router.get('/dashboard', studentController.getDashboard);
router.get('/classes', studentController.getClasses);
router.get('/announcements', studentController.getAnnouncements);
router.get('/assignments', studentController.getAssignments);
router.post('/assignments/submit', upload.single('attachment'), studentController.submitAssignment);
router.post('/messages', studentController.sendMessage);
router.get('/teachers', studentController.getTeachers);

module.exports = router;
