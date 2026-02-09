const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');

// All routes require admin role
router.use(auth, authorize('admin'));

router.get('/dashboard', adminController.getDashboard);
router.post('/teachers', adminController.registerTeacher);
router.post('/students', adminController.registerStudent);
router.get('/teachers', adminController.getTeachers);
router.get('/students', adminController.getStudents);
router.patch('/users/:userId/toggle-status', adminController.toggleUserStatus);
router.post('/classes', adminController.createClass);
router.get('/classes', adminController.getClasses);
router.post('/assign-teacher', adminController.assignTeacherToClass);
router.post('/enroll-student', adminController.enrollStudent);
router.get('/announcements', adminController.getAnnouncements);
router.post('/announcements', adminController.postAnnouncement);

module.exports = router;
