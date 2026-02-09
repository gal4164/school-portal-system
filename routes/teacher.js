const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const teacherController = require('../controllers/teacherController');
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

// All routes require teacher role
router.use(auth, authorize('teacher'));

router.get('/dashboard', teacherController.getDashboard);
router.get('/classes', teacherController.getClasses);
router.get('/classes/:classId/students', teacherController.getClassStudents);
router.post('/messages', teacherController.sendMessage);
router.post('/messages/group', teacherController.sendGroupMessage);
router.get('/announcements', teacherController.getAnnouncements);
router.post('/announcements', teacherController.postAnnouncement);
router.post('/announcements/individual', teacherController.postIndividualAnnouncement);
router.post('/assignments', upload.single('attachment'), teacherController.createAssignment);
router.get('/assignments', teacherController.getAssignments);
router.get('/assignments/:assignmentId/submissions', teacherController.getSubmissions);

module.exports = router;
