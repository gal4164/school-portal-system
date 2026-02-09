const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'school_portal.db');

// Delete existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Existing database deleted');
}

const db = new sqlite3.Database(dbPath);

const setupDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        console.log('Creating database tables...');

        // Enable foreign keys
        db.run('PRAGMA foreign_keys = ON');

        // Users table
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone TEXT,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('✓ Users table created');

        // Classes table
        db.run(`
          CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            grade_level TEXT,
            section TEXT,
            academic_year TEXT,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('✓ Classes table created');

        // Teacher-Class mapping
        db.run(`
          CREATE TABLE IF NOT EXISTS teacher_classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teacher_id INTEGER NOT NULL,
            class_id INTEGER NOT NULL,
            subject TEXT,
            assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
            UNIQUE(teacher_id, class_id)
          )
        `);
        console.log('✓ Teacher-Classes table created');

        // Student-Class enrollment
        db.run(`
          CREATE TABLE IF NOT EXISTS student_classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            class_id INTEGER NOT NULL,
            enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
            UNIQUE(student_id, class_id)
          )
        `);
        console.log('✓ Student-Classes table created');

        // Messages table
        db.run(`
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id INTEGER NOT NULL,
            receiver_id INTEGER,
            class_id INTEGER,
            subject TEXT,
            message TEXT NOT NULL,
            message_type TEXT DEFAULT 'private' CHECK (message_type IN ('private', 'group')),
            parent_message_id INTEGER,
            is_read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
            FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE CASCADE
          )
        `);
        console.log('✓ Messages table created');

        // Announcements table
        db.run(`
          CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'teachers', 'students', 'class')),
            class_id INTEGER,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
          )
        `);
        console.log('✓ Announcements table created');

        // Assignments table
        db.run(`
          CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teacher_id INTEGER NOT NULL,
            class_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            due_date DATETIME,
            attachment_path TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
          )
        `);
        console.log('✓ Assignments table created');

        // Submissions table
        db.run(`
          CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assignment_id INTEGER NOT NULL,
            student_id INTEGER NOT NULL,
            content TEXT,
            attachment_path TEXT,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
            FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(assignment_id, student_id)
          )
        `);
        console.log('✓ Submissions table created');

        // Notifications table
        db.run(`
          CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            type TEXT DEFAULT 'system' CHECK (type IN ('message', 'announcement', 'assignment', 'system')),
            reference_id INTEGER,
            is_read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          )
        `);
        console.log('✓ Notifications table created');

        // Create default admin account
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        db.run(
          'INSERT INTO users (email, password, role, first_name, last_name, is_active) VALUES (?, ?, ?, ?, ?, ?)',
          ['admin@school.com', hashedPassword, 'admin', 'System', 'Administrator', 1],
          (err) => {
            if (err) {
              console.error('Error creating admin:', err);
            } else {
              console.log('✓ Default admin account created');
            }

            console.log('\n✅ Database setup completed successfully!');
            console.log('\nDefault Admin Credentials:');
            console.log('Email: admin@school.com');
            console.log('Password: Admin@123');
            console.log('\n⚠️  Please change the admin password after first login!');
            
            db.close();
            resolve();
          }
        );
      } catch (error) {
        console.error('Error setting up database:', error);
        reject(error);
      }
    });
  });
};

setupDatabase().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
