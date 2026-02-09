const bcrypt = require('bcryptjs');
const { query, run } = require('../config/database');

// Dashboard statistics
exports.getDashboard = async (req, res) => {
  try {
    const teachers = await query('SELECT COUNT(*) as count FROM users WHERE role = ?', ['teacher']);
    const students = await query('SELECT COUNT(*) as count FROM users WHERE role = ?', ['student']);
    const classes = await query('SELECT COUNT(*) as count FROM classes WHERE is_active = 1');
    const messages = await query('SELECT COUNT(*) as count FROM messages');
    const announcements = await query('SELECT COUNT(*) as count FROM announcements WHERE is_active = 1');

    res.json({
      success: true,
      stats: {
        teachers: teachers.rows[0].count,
        students: students.rows[0].count,
        classes: classes.rows[0].count,
        messages: messages.rows[0].count,
        announcements: announcements.rows[0].count
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register teacher
exports.registerTeacher = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await run(
      'INSERT INTO users (email, password, role, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, 'teacher', first_name, last_name, phone]
    );

    res.status(201).json({
      success: true,
      message: 'Teacher registered successfully',
      teacherId: result.lastID
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Register teacher error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register student
exports.registerStudent = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await run(
      'INSERT INTO users (email, password, role, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, 'student', first_name, last_name, phone]
    );

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      studentId: result.lastID
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Register student error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const result = await query(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.is_active, u.created_at,
             GROUP_CONCAT(DISTINCT tc.subject) as subjects
      FROM users u
      LEFT JOIN teacher_classes tc ON u.id = tc.teacher_id
      WHERE u.role = ?
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `, ['teacher']);
    
    res.json({ success: true, teachers: result.rows });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, email, first_name, last_name, phone, is_active, created_at FROM users WHERE role = ? ORDER BY created_at DESC',
      ['student']
    );
    res.json({ success: true, students: result.rows });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    
    await run(
      'UPDATE users SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ? AND role != ?',
      [userId, 'admin']
    );

    res.json({ success: true, message: 'User status updated' });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create class
exports.createClass = async (req, res) => {
  try {
    const { name, grade_level, section, academic_year } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Class name is required' });
    }

    const result = await run(
      'INSERT INTO classes (name, grade_level, section, academic_year) VALUES (?, ?, ?, ?)',
      [name, grade_level, section, academic_year]
    );

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      classId: result.lastID
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const result = await query('SELECT * FROM classes ORDER BY created_at DESC');
    res.json({ success: true, classes: result.rows });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign teacher to class
exports.assignTeacherToClass = async (req, res) => {
  try {
    const { teacher_id, class_id, subject } = req.body;

    if (!teacher_id || !class_id) {
      return res.status(400).json({ error: 'Teacher and class are required' });
    }

    await run(
      'INSERT OR REPLACE INTO teacher_classes (teacher_id, class_id, subject) VALUES (?, ?, ?)',
      [teacher_id, class_id, subject]
    );

    res.json({ success: true, message: 'Teacher assigned to class' });
  } catch (error) {
    console.error('Assign teacher error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Enroll student in class
exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, class_id } = req.body;

    if (!student_id || !class_id) {
      return res.status(400).json({ error: 'Student and class are required' });
    }

    await run(
      'INSERT OR IGNORE INTO student_classes (student_id, class_id) VALUES (?, ?)',
      [student_id, class_id]
    );

    res.json({ success: true, message: 'Student enrolled in class' });
  } catch (error) {
    console.error('Enroll student error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Post global announcement
exports.postAnnouncement = async (req, res) => {
  try {
    const { title, content, target_audience, class_id } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const result = await run(
      'INSERT INTO announcements (user_id, title, content, target_audience, class_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, content, target_audience || 'all', class_id || null]
    );

    // Create notifications for target audience
    let userQuery = 'SELECT id FROM users WHERE is_active = 1';
    const params = [];
    
    if (target_audience === 'teachers') {
      userQuery += ' AND role = ?';
      params.push('teacher');
    } else if (target_audience === 'students') {
      userQuery += ' AND role = ?';
      params.push('student');
    } else if (target_audience === 'class' && class_id) {
      userQuery = 'SELECT student_id as id FROM student_classes WHERE class_id = ?';
      params.push(class_id);
    }

    const users = await query(userQuery, params);
    
    for (const user of users.rows) {
      await run(
        'INSERT INTO notifications (user_id, title, message, type, reference_id) VALUES (?, ?, ?, ?, ?)',
        [user.id, title, content, 'announcement', result.lastID]
      );
    }

    res.status(201).json({ success: true, message: 'Announcement posted' });
  } catch (error) {
    console.error('Post announcement error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all announcements (admin view)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await query(`
      SELECT a.*, u.first_name, u.last_name, c.name as class_name
      FROM announcements a
      INNER JOIN users u ON a.user_id = u.id
      LEFT JOIN classes c ON a.class_id = c.id
      WHERE a.is_active = 1
      ORDER BY a.created_at DESC
      LIMIT 100
    `);

    res.json({ success: true, announcements: announcements.rows });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
