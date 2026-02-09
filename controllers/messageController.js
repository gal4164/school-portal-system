const { query, run } = require('../config/database');

// Get inbox messages
exports.getInbox = async (req, res) => {
  try {
    const messages = await query(`
      SELECT m.*, 
             u.first_name as sender_first_name, 
             u.last_name as sender_last_name,
             u.role as sender_role,
             c.name as class_name
      FROM messages m
      INNER JOIN users u ON m.sender_id = u.id
      LEFT JOIN classes c ON m.class_id = c.id
      WHERE m.receiver_id = ? OR (m.message_type = 'group' AND m.class_id IN (
        SELECT class_id FROM student_classes WHERE student_id = ?
      ))
      ORDER BY m.created_at DESC
      LIMIT 100
    `, [req.user.id, req.user.id]);

    res.json({ success: true, messages: messages.rows });
  } catch (error) {
    console.error('Get inbox error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get sent messages
exports.getSent = async (req, res) => {
  try {
    const messages = await query(`
      SELECT m.*, 
             u.first_name as receiver_first_name, 
             u.last_name as receiver_last_name,
             c.name as class_name
      FROM messages m
      LEFT JOIN users u ON m.receiver_id = u.id
      LEFT JOIN classes c ON m.class_id = c.id
      WHERE m.sender_id = ?
      ORDER BY m.created_at DESC
      LIMIT 100
    `, [req.user.id]);

    res.json({ success: true, messages: messages.rows });
  } catch (error) {
    console.error('Get sent error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get conversation
exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await query(`
      SELECT m.*, 
             u1.first_name as sender_first_name, 
             u1.last_name as sender_last_name,
             u2.first_name as receiver_first_name,
             u2.last_name as receiver_last_name
      FROM messages m
      INNER JOIN users u1 ON m.sender_id = u1.id
      LEFT JOIN users u2 ON m.receiver_id = u2.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?) 
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `, [req.user.id, userId, userId, req.user.id]);

    // Mark messages as read
    await run(
      'UPDATE messages SET is_read = 1 WHERE receiver_id = ? AND sender_id = ?',
      [req.user.id, userId]
    );

    res.json({ success: true, messages: messages.rows });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    await run(
      'UPDATE messages SET is_read = 1 WHERE id = ? AND receiver_id = ?',
      [messageId, req.user.id]
    );

    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const result = await query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0',
      [req.user.id]
    );

    res.json({ success: true, count: result.rows[0].count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Search messages
exports.searchMessages = async (req, res) => {
  try {
    const { query: searchQuery } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const messages = await query(`
      SELECT m.*, 
             u1.first_name as sender_first_name, 
             u1.last_name as sender_last_name,
             u2.first_name as receiver_first_name,
             u2.last_name as receiver_last_name
      FROM messages m
      INNER JOIN users u1 ON m.sender_id = u1.id
      LEFT JOIN users u2 ON m.receiver_id = u2.id
      WHERE (m.sender_id = ? OR m.receiver_id = ?)
        AND (m.subject LIKE ? OR m.message LIKE ?)
      ORDER BY m.created_at DESC
      LIMIT 50
    `, [req.user.id, req.user.id, `%${searchQuery}%`, `%${searchQuery}%`]);

    res.json({ success: true, messages: messages.rows });
  } catch (error) {
    console.error('Search messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
