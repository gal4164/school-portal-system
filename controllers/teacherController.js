const { query, run } = require('../config/database');

// Teacher dashboard
exports.getDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const classes = await query(`
      SELECT c.*, COUNT(DISTINCT sc.student_id) as student_count
      FROM classes c
      INNER JOIN teacher_classes tc ON c.id = tc.class_id
      LEFT JOIN student_classes sc ON c.id = sc.class_id
      WHERE tc.teacher_id = ?
      GROUP BY c.id
    `, [teacherId]);

    const unreadMessages = await query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0',
      [teacherId]
    );

    const assignments = await query(
      'SELECT COUNT(*) as count FROM assignments WHERE teacher_id = ?',
      [teacherId]
    );

    res.json({
      success: true,
      stats: {
        classes: classes.rows.length,
        unreadMessages: unreadMessages.rows[0].count,
        assignments: assignments.rows[0].count
      },
      classes: classes.rows
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get assigned classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await query(`
      SELECT c.*, tc.subject, COUNT(DISTINCT sc.student_id) as student_count
      FROM classes c
      INNER JOIN teacher_classes tc ON c.id = tc.class_id
      LEFT JOIN student_classes sc ON c.id = sc.class_id
      WHERE tc.teacher_id = ?
      GROUP BY c.id
    `, [req.user.id]);

    res.json({ success: true, classes: classes.rows });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get students in a class
exports.getClassStudents = async (req, res) => {
  try {
    const { classId } = req.params;

    // Verify teacher has access to this class
    const access = await query(
      'SELECT id FROM teacher_classes WHERE teacher_id = ? AND class_id = ?',
      [req.user.id, classId]
    );

    if (access.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const students = await query(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.phone
      FROM users u
      INNER JOIN student_classes sc ON u.id = sc.student_id
      WHERE sc.class_id = ? AND u.is_active = 1
      ORDER BY u.last_name, u.first_name
    `, [classId]);

    res.json({ success: true, students: students.rows });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Send private message to student
exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, subject, message } = req.body;

    if (!receiver_id || !message) {
      return res.status(400).json({ error: 'Receiver and message are required' });
    }

    const result = await run(
      'INSERT INTO messages (sender_id, receiver_id, subject, message, message_type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, receiver_id, subject, message, 'private']
    );

    // Create notification
    await run(
      'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
      [receiver_id, subject || 'New Message', 'You have a new message', 'message', result.lastID]
    );

    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Send group message to class
exports.sendGroupMessage = async (req, res) => {
  try {
    const { class_id, subject, message } = req.body;

    if (!class_id || !message) {
      return res.status(400).json({ error: 'Class and message are required' });
    }

    // Verify teacher has access
    const access = await query(
      'SELECT id FROM teacher_classes WHERE teacher_id = ? AND class_id = ?',
      [req.user.id, class_id]
    );

    if (access.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await run(
      'INSERT INTO messages (sender_id, class_id, subject, message, message_type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, class_id, subject, message, 'group']
    );

    // Get all students in class and create notifications
    const students = await query(
      'SELECT student_id FROM student_classes WHERE class_id = ?',
      [class_id]
    );

    for (const student of students.rows) {
      await run(
        'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
        [student.student_id, subject || 'New Group Message', 'You have a new group message', 'message', result.lastID]
      );
    }

    res.status(201).json({ success: true, message: 'Group message sent' });
  } catch (error) {
    console.error('Send group message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Post announcement
exports.postAnnouncement = async (req, res) => {
  try {
    const { title, content, class_id } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (class_id) {
      // Verify teacher has access
      const access = await query(
        'SELECT id FROM teacher_classes WHERE teacher_id = ? AND class_id = ?',
        [req.user.id, class_id]
      );

      if (access.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    const result = await run(
      'INSERT INTO announcements (user_id, title, content, target_audience, class_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, content, 'class', class_id]
    );

    // Create notifications for students in class
    if (class_id) {
      const students = await query(
        'SELECT student_id FROM student_classes WHERE class_id = ?',
        [class_id]
      );

      for (const student of students.rows) {
        await run(
          'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
          [student.student_id, title, content, 'announcement', result.lastID]
        );
      }
    }

    res.status(201).json({ success: true, message: 'Announcement posted' });
  } catch (error) {
    console.error('Post announcement error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Post announcement to individual student
exports.postIndividualAnnouncement = async (req, res) => {
  try {
    const { student_id, title, content } = req.body;

    if (!student_id || !title || !content) {
      return res.status(400).json({ error: 'Student, title and content are required' });
    }

    // Verify teacher has access to this student (student is in one of teacher's classes)
    const access = await query(`
      SELECT sc.student_id 
      FROM student_classes sc
      INNER JOIN teacher_classes tc ON sc.class_id = tc.class_id
      WHERE tc.teacher_id = ? AND sc.student_id = ?
    `, [req.user.id, student_id]);

    if (access.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied - student not in your classes' });
    }

    const result = await run(
      'INSERT INTO announcements (user_id, title, content, target_audience) VALUES (?, ?, ?, ?)',
      [req.user.id, title, content, 'individual']
    );

    // Create notification for the student
    await run(
      'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
      [student_id, title, content, 'announcement', result.lastID]
    );

    res.status(201).json({ success: true, message: 'Announcement posted' });
  } catch (error) {
    console.error('Post individual announcement error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get announcements (teacher view)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await query(`
      SELECT a.*, u.first_name, u.last_name, c.name as class_name
      FROM announcements a
      INNER JOIN users u ON a.user_id = u.id
      LEFT JOIN classes c ON a.class_id = c.id
      WHERE a.is_active = 1 
      AND (
        a.user_id = ?
        OR a.target_audience = 'all'
        OR a.target_audience = 'teachers'
        OR (a.target_audience = 'class' AND a.class_id IN (
          SELECT class_id FROM teacher_classes WHERE teacher_id = ?
        ))
      )
      ORDER BY a.created_at DESC
      LIMIT 50
    `, [req.user.id, req.user.id]);

    res.json({ success: true, announcements: announcements.rows });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create assignment
exports.createAssignment = async (req, res) => {
  try {
    const { class_id, title, description, due_date } = req.body;

    if (!class_id || !title) {
      return res.status(400).json({ error: 'Class and title are required' });
    }

    // Verify teacher has access
    const access = await query(
      'SELECT id FROM teacher_classes WHERE teacher_id = ? AND class_id = ?',
      [req.user.id, class_id]
    );

    if (access.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const attachment_path = req.file ? req.file.path : null;

    const result = await run(
      'INSERT INTO assignments (teacher_id, class_id, title, description, due_date, attachment_path) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, class_id, title, description, due_date, attachment_path]
    );

    // Notify students
    const students = await query(
      'SELECT student_id FROM student_classes WHERE class_id = ?',
      [class_id]
    );

    for (const student of students.rows) {
      await run(
        'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
        [student.student_id, 'New Assignment', title, 'assignment', result.lastID]
      );
    }

    res.status(201).json({ success: true, message: 'Assignment created' });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await query(`
      SELECT a.*, c.name as class_name, COUNT(s.id) as submission_count
      FROM assignments a
      INNER JOIN classes c ON a.class_id = c.id
      LEFT JOIN submissions s ON a.id = s.assignment_id
      WHERE a.teacher_id = ?
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `, [req.user.id]);

    res.json({ success: true, assignments: assignments.rows });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get submissions for assignment
exports.getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Verify teacher owns this assignment
    const assignment = await query(
      'SELECT id FROM assignments WHERE id = ? AND teacher_id = ?',
      [assignmentId, req.user.id]
    );

    if (assignment.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const submissions = await query(`
      SELECT s.*, u.first_name, u.last_name, u.email
      FROM submissions s
      INNER JOIN users u ON s.student_id = u.id
      WHERE s.assignment_id = ?
      ORDER BY s.submitted_at DESC
    `, [assignmentId]);

    res.json({ success: true, submissions: submissions.rows });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
