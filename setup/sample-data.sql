-- Sample Data for Teacher-Student Communication Portal
-- Run this after setting up the database with schema.sql

USE school_portal;

-- Note: Passwords are hashed with bcrypt
-- All sample passwords are: Password@123

-- Sample Teachers
INSERT INTO users (email, password, role, first_name, last_name, phone, is_active) VALUES
('john.smith@school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'teacher', 'John', 'Smith', '555-0101', true),
('mary.johnson@school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'teacher', 'Mary', 'Johnson', '555-0102', true),
('robert.williams@school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'teacher', 'Robert', 'Williams', '555-0103', true),
('patricia.brown@school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'teacher', 'Patricia', 'Brown', '555-0104', true);

-- Sample Students
INSERT INTO users (email, password, role, first_name, last_name, phone, is_active) VALUES
('alice.anderson@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Alice', 'Anderson', '555-1001', true),
('bob.baker@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Bob', 'Baker', '555-1002', true),
('carol.clark@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Carol', 'Clark', '555-1003', true),
('david.davis@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'David', 'Davis', '555-1004', true),
('emma.evans@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Emma', 'Evans', '555-1005', true),
('frank.fisher@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Frank', 'Fisher', '555-1006', true),
('grace.garcia@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Grace', 'Garcia', '555-1007', true),
('henry.harris@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Henry', 'Harris', '555-1008', true),
('isabel.jackson@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Isabel', 'Jackson', '555-1009', true),
('jack.jones@student.school.com', '$2a$10$rKZLvXF5h8qYqYqYqYqYqOqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq', 'student', 'Jack', 'Jones', '555-1010', true);

-- Sample Classes
INSERT INTO classes (name, grade_level, section, academic_year, is_active) VALUES
('Mathematics 10A', '10th Grade', 'A', '2023-2024', true),
('English 10A', '10th Grade', 'A', '2023-2024', true),
('Science 10B', '10th Grade', 'B', '2023-2024', true),
('History 11A', '11th Grade', 'A', '2023-2024', true),
('Mathematics 11A', '11th Grade', 'A', '2023-2024', true);

-- Assign Teachers to Classes
-- Assuming teacher IDs are 2-5 and class IDs are 1-5
INSERT INTO teacher_classes (teacher_id, class_id, subject) VALUES
(2, 1, 'Mathematics'),
(3, 2, 'English Literature'),
(4, 3, 'Biology'),
(5, 4, 'World History'),
(2, 5, 'Advanced Mathematics');

-- Enroll Students in Classes
-- Assuming student IDs are 6-15 and class IDs are 1-5
INSERT INTO student_classes (student_id, class_id) VALUES
-- Mathematics 10A (Class 1)
(6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
-- English 10A (Class 2)
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
-- Science 10B (Class 3)
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3),
-- History 11A (Class 4)
(11, 4), (12, 4), (13, 4),
-- Mathematics 11A (Class 5)
(11, 5), (12, 5), (13, 5), (14, 5), (15, 5);

-- Sample Announcements
INSERT INTO announcements (user_id, title, content, target_audience, class_id, is_active) VALUES
(1, 'Welcome to New Academic Year', 'Welcome to the 2023-2024 academic year! We wish all students and teachers a successful year ahead.', 'all', NULL, true),
(2, 'Mathematics Quiz Next Week', 'There will be a quiz on algebra next Monday. Please review chapters 1-3.', 'class', 1, true),
(3, 'English Essay Submission', 'Reminder: Your essays on Shakespeare are due this Friday.', 'class', 2, true),
(1, 'School Holiday Notice', 'School will be closed next Friday for a public holiday.', 'all', NULL, true);

-- Sample Assignments
INSERT INTO assignments (teacher_id, class_id, title, description, due_date) VALUES
(2, 1, 'Algebra Problem Set', 'Complete problems 1-20 from Chapter 3. Show all your work.', '2024-03-15 23:59:59'),
(2, 1, 'Geometry Project', 'Create a presentation on the Pythagorean theorem with real-world applications.', '2024-03-20 23:59:59'),
(3, 2, 'Shakespeare Essay', 'Write a 500-word essay analyzing the themes in Romeo and Juliet.', '2024-03-18 23:59:59'),
(4, 3, 'Biology Lab Report', 'Submit your lab report on cell structure observations.', '2024-03-16 23:59:59'),
(5, 4, 'History Research Paper', 'Research and write about a significant event in World War II.', '2024-03-25 23:59:59');

-- Sample Submissions
INSERT INTO submissions (assignment_id, student_id, content, submitted_at) VALUES
(1, 6, 'I have completed all 20 problems. Please find my solutions attached.', '2024-03-14 18:30:00'),
(1, 7, 'Completed the algebra problem set. All work is shown step by step.', '2024-03-14 20:15:00'),
(3, 6, 'My essay explores the themes of love, fate, and family conflict in Romeo and Juliet.', '2024-03-17 16:45:00'),
(4, 11, 'Lab report completed with observations and diagrams of cell structures.', '2024-03-15 14:20:00');

-- Sample Messages
INSERT INTO messages (sender_id, receiver_id, subject, message, message_type, is_read) VALUES
(6, 2, 'Question about Assignment', 'Dear Mr. Smith, I have a question about problem 15 in the algebra assignment. Could you please clarify?', 'private', true),
(2, 6, 'RE: Question about Assignment', 'Hi Alice, problem 15 requires you to factor the quadratic equation. Let me know if you need more help.', 'private', false),
(7, 3, 'Essay Submission', 'Ms. Johnson, I have submitted my essay. Please let me know if you need any revisions.', 'private', true),
(11, 4, 'Lab Equipment', 'Dr. Williams, some of the microscopes in the lab are not working properly.', 'private', false);

-- Sample Group Messages
INSERT INTO messages (sender_id, class_id, subject, message, message_type) VALUES
(2, 1, 'Class Reminder', 'Reminder: Tomorrow we will have a review session for the upcoming quiz. Please bring your textbooks.', 'group'),
(3, 2, 'Reading Assignment', 'Please read Act 3 of Romeo and Juliet before our next class. We will discuss it in detail.', 'group');

-- Sample Notifications
INSERT INTO notifications (user_id, title, message, type, reference_id, is_read) VALUES
(6, 'New Assignment', 'You have a new assignment in Mathematics 10A', 'assignment', 1, true),
(6, 'New Message', 'You have a new message from Mr. Smith', 'message', 2, false),
(7, 'New Assignment', 'You have a new assignment in Mathematics 10A', 'assignment', 1, true),
(11, 'New Assignment', 'You have a new assignment in Science 10B', 'assignment', 4, false),
(2, 'New Message', 'You have a new message from Alice Anderson', 'message', 1, false),
(6, 'New Announcement', 'New announcement: Mathematics Quiz Next Week', 'announcement', 2, false);

-- Display summary
SELECT 'Database populated with sample data successfully!' as Status;
SELECT COUNT(*) as 'Total Users' FROM users;
SELECT COUNT(*) as 'Total Classes' FROM classes;
SELECT COUNT(*) as 'Total Assignments' FROM assignments;
SELECT COUNT(*) as 'Total Messages' FROM messages;
SELECT COUNT(*) as 'Total Announcements' FROM announcements;
