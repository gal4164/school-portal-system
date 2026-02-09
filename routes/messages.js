const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.get('/inbox', messageController.getInbox);
router.get('/sent', messageController.getSent);
router.get('/conversation/:userId', messageController.getConversation);
router.patch('/:messageId/read', messageController.markAsRead);
router.get('/unread-count', messageController.getUnreadCount);
router.get('/search', messageController.searchMessages);

module.exports = router;
