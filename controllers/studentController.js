const { query, run } = require('../config/database');

// Student dashboard
exports.getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const classes = await query(`
      SELECT c.*, tc.subject, u.first_name as teacher_first_name, u.last_name as teacher_last_name
      FROM classes c
      INNER JOIN student_classes sc ON c.id = sc.class_id
      LEFT JOIN teacher_classes tc ON c.id = tc.class_id
      LEFT JOIN users u ON tc.teacher_id = u.id
      WHERE sc.student_id = ?
    `, [studentId]);

    const unreadMessages = await query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0',
      [studentId]
    );

    const pendingAssignments = await query(`
      SELECT COUNT(*) as count FROM assignments a
      INNER JOIN student_classes sc ON a.class_id = sc.class_id
      LEFT JOIN submissions s ON a.id = s.assignment_id AND s.student_id = ?
      WHERE sc.student_id = ? AND s.id IS NULL
    `, [studentId, studentId]);

    res.json({
      success: true,
      stats: {
        classes: classes.rows.length,
        unreadMessages: unreadMessages.rows[0].count,
        pendingAssignments: pendingAssignments.rows[0].count
      },
      classes: classes.rows
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get enrolled classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await query(`
      SELECT c.*, tc.subject, u.first_name as teacher_first_name, u.last_name as teacher_last_name, u.email as teacher_email
      FROM classes c
      INNER JOIN student_classes sc ON c.id = sc.class_id
      LEFT JOIN teacher_classes tc ON c.id = tc.class_id
      LEFT JOIN users u ON tc.teacher_id = u.id
      WHERE sc.student_id = ?
    `, [req.user.id]);

    res.json({ success: true, classes: classes.rows });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await query(`
      SELECT a.*, u.first_name, u.last_name, c.name as class_name
      FROM announcements a
      INNER JOIN users u ON a.user_id = u.id
      LEFT JOIN classes c ON a.class_id = c.id
      WHERE a.is_active = 1 
      AND (
        a.target_audience = 'all' 
        OR a.target_audience = 'students'
        OR (a.target_audience = 'class' AND a.class_id IN (
          SELECT class_id FROM student_classes WHERE student_id = ?
        ))
      )
      ORDER BY a.created_at DESC
      LIMIT 50
    `, [req.user.id]);

    res.json({ success: true, announcements: announcements.rows });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await query(`
      SELECT a.*, c.name as class_name, 
             u.first_name as teacher_first_name, u.last_name as teacher_last_name,
             s.id as submission_id, s.submitted_at
      FROM assignments a
      INNER JOIN classes c ON a.class_id = c.id
      INNER JOIN student_classes sc ON c.id = sc.class_id
      INNER JOIN users u ON a.teacher_id = u.id
      LEFT JOIN submissions s ON a.id = s.assignment_id AND s.student_id = ?
      WHERE sc.student_id = ?
      ORDER BY a.due_date ASC, a.created_at DESC
    `, [req.user.id, req.user.id]);

    res.json({ success: true, assignments: assignments.rows });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Submit assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignment_id, content } = req.body;

    if (!assignment_id) {
      return res.status(400).json({ error: 'Assignment ID is required' });
    }

    // Verify student has access to this assignment
    const access = await query(`
      SELECT a.id FROM assignments a
      INNER JOIN student_classes sc ON a.class_id = sc.class_id
      WHERE a.id = ? AND sc.student_id = ?
    `, [assignment_id, req.user.id]);

    if (access.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const attachment_path = req.file ? req.file.path : null;

    await run(
      'INSERT OR REPLACE INTO submissions (assignment_id, student_id, content, attachment_path) VALUES (?, ?, ?, ?)',
      [assignment_id, req.user.id, content, attachment_path]
    );

    res.json({ success: true, message: 'Assignment submitted' });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Send message to teacher
exports.sendMessage = async (req, res) => {
  try {
    const { teacher_id, subject, message } = req.body;

    if (!teacher_id || !message) {
      return res.status(400).json({ error: 'Teacher and message are required' });
    }

    // Verify teacher exists and student has access
    const teacher = await query(`
      SELECT u.id FROM users u
      INNER JOIN teacher_classes tc ON u.id = tc.teacher_id
      INNER JOIN student_classes sc ON tc.class_id = sc.class_id
      WHERE u.id = ? AND u.role = 'teacher' AND sc.student_id = ?
    `, [teacher_id, req.user.id]);

    if (teacher.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await run(
      'INSERT INTO messages (sender_id, receiver_id, subject, message, message_type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, teacher_id, subject, message, 'private']
    );

    // Create notification
    await run(
      'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
      [teacher_id, subject || 'New Message', 'You have a new message from a student', 'message', result.lastID]
    );

    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await query(`
      SELECT DISTINCT u.id, u.first_name, u.last_name, u.email, tc.subject
      FROM users u
      INNER JOIN teacher_classes tc ON u.id = tc.teacher_id
      INNER JOIN student_classes sc ON tc.class_id = sc.class_id
      WHERE sc.student_id = ? AND u.is_active = 1
    `, [req.user.id]);

    res.json({ success: true, teachers: teachers.rows });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
