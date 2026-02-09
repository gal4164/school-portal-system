# User Manual - Teacher-Student Communication Portal

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Admin Guide](#admin-guide)
4. [Teacher Guide](#teacher-guide)
5. [Student Guide](#student-guide)
6. [Common Features](#common-features)
7. [FAQ](#faq)

---

## Introduction

The Teacher-Student Communication Portal is a web-based platform designed to facilitate efficient communication within high school environments. The system supports three user roles:

- **Admin**: Manages the entire system, users, and classes
- **Teacher**: Communicates with students, posts assignments, and announcements
- **Student**: Receives messages, submits assignments, and views announcements

---

## Getting Started

### Accessing the Portal

1. Open your web browser
2. Navigate to: `http://localhost:3000` (or your school's portal URL)
3. Click the "Login" button

### First Time Login

**Default Admin Account:**
- Email: admin@school.com
- Password: Admin@123

**⚠️ Important**: Change the default admin password immediately after first login!

### Changing Your Password

1. Log in to your account
2. Navigate to your profile settings
3. Click "Change Password"
4. Enter current password
5. Enter new password (twice)
6. Click "Save"

---

## Admin Guide

### Admin Dashboard

After logging in as admin, you'll see:
- Total number of teachers
- Total number of students
- Total number of classes
- Total messages in the system
- Active announcements

### Managing Teachers

#### Register a New Teacher

1. Click "Teachers" in the sidebar
2. Click "Register Teacher" button
3. Fill in the form:
   - Email address
   - Password
   - First name
   - Last name
   - Phone number (optional)
4. Click "Submit"

#### View All Teachers

- Navigate to "Teachers" section
- View list with:
  - Name
  - Email
  - Phone
  - Status (Active/Inactive)

#### Activate/Deactivate Teacher

1. Go to "Teachers" section
2. Find the teacher in the list
3. Click "Toggle Status" button
4. Confirm the action

### Managing Students

#### Register a New Student

1. Click "Students" in the sidebar
2. Click "Register Student" button
3. Fill in the form:
   - Email address
   - Password
   - First name
   - Last name
   - Phone number (optional)
4. Click "Submit"

#### View All Students

- Navigate to "Students" section
- View list with student details

#### Activate/Deactivate Student

1. Go to "Students" section
2. Find the student in the list
3. Click "Toggle Status" button

### Managing Classes

#### Create a New Class

1. Click "Classes" in the sidebar
2. Click "Create Class" button
3. Fill in the form:
   - Class name (e.g., "Mathematics 10A")
   - Grade level (e.g., "10th Grade")
   - Section (e.g., "A")
   - Academic year (e.g., "2023-2024")
4. Click "Submit"

#### Assign Teacher to Class

1. Go to "Classes" section
2. Click "Assign Teacher"
3. Select:
   - Teacher from dropdown
   - Class from dropdown
   - Subject (optional)
4. Click "Assign"

#### Enroll Student in Class

1. Go to "Classes" section
2. Click "Enroll Student"
3. Select:
   - Student from dropdown
   - Class from dropdown
4. Click "Enroll"

### Posting Global Announcements

1. Click "Announcements" in sidebar
2. Click "Create Announcement"
3. Fill in:
   - Title
   - Content
   - Target audience:
     - All users
     - Teachers only
     - Students only
4. Click "Post"

---

## Teacher Guide

### Teacher Dashboard

Your dashboard displays:
- Number of classes you teach
- Unread messages count
- Total assignments created
- List of your classes with student counts

### Managing Classes

#### View Your Classes

1. Click "My Classes" in sidebar
2. View all assigned classes
3. See:
   - Class name
   - Grade level
   - Number of students
   - Subject you teach

#### View Students in a Class

1. Go to "My Classes"
2. Click on a class
3. View list of enrolled students with:
   - Name
   - Email
   - Phone number

### Messaging

#### Send Private Message to Student

1. Click "Messages" in sidebar
2. Click "Compose Message"
3. Select student from dropdown
4. Enter subject (optional)
5. Type your message
6. Click "Send"

#### Send Group Message to Class

1. Click "Messages" in sidebar
2. Click "Compose Group Message"
3. Select class from dropdown
4. Enter subject
5. Type your message
6. Click "Send"

#### View Inbox

1. Click "Messages" → "Inbox"
2. View received messages
3. Unread messages are highlighted
4. Click on a message to read

#### View Sent Messages

1. Click "Messages" → "Sent"
2. View all messages you've sent
3. See delivery status

#### Search Messages

1. Go to "Messages"
2. Use search box at top
3. Enter keywords
4. View search results

### Assignments

#### Create Assignment

1. Click "Assignments" in sidebar
2. Click "Create Assignment"
3. Fill in the form:
   - Select class
   - Assignment title
   - Description
   - Due date and time
   - Upload file (optional)
5. Click "Create"

#### View Assignments

1. Go to "Assignments"
2. View all your assignments
3. See:
   - Title
   - Class
   - Due date
   - Number of submissions

#### View Submissions

1. Go to "Assignments"
2. Click on an assignment
3. Click "View Submissions"
4. See list of students who submitted
5. View submission details:
   - Student name
   - Submission time
   - Content
   - Attached files

### Announcements

#### Post Class Announcement

1. Click "Announcements"
2. Click "Create Announcement"
3. Fill in:
   - Title
   - Content
   - Select class
4. Click "Post"

#### View Announcements

- Navigate to "Announcements"
- View all announcements you've posted
- See creation date and target class

---

## Student Guide

### Student Dashboard

Your dashboard shows:
- Number of classes enrolled
- Unread messages count
- Pending assignments count
- List of your classes with teacher names

### Viewing Classes

1. Click "My Classes" in sidebar
2. View all enrolled classes
3. See:
   - Class name
   - Teacher name
   - Subject

### Viewing Announcements

1. Click "Announcements" in sidebar
2. View all announcements:
   - School-wide announcements
   - Class-specific announcements
3. See:
   - Title
   - Content
   - Posted by
   - Date

### Assignments

#### View Assignments

1. Click "Assignments" in sidebar
2. View all assignments:
   - Pending (not submitted)
   - Submitted
   - Overdue
3. See:
   - Title
   - Description
   - Class
   - Teacher
   - Due date
   - Submission status

#### Submit Assignment

1. Go to "Assignments"
2. Find the assignment
3. Click "Submit" button
4. Fill in:
   - Text response (optional)
   - Upload file (optional)
5. Click "Submit"

**Note**: You can resubmit assignments before the due date.

### Messaging

#### Send Message to Teacher

1. Click "Messages" in sidebar
2. Click "Compose Message"
3. Select teacher from dropdown
4. Enter subject (optional)
5. Type your message
6. Click "Send"

#### View Inbox

1. Click "Messages" → "Inbox"
2. View received messages
3. Unread messages are highlighted
4. Click to read

#### View Sent Messages

1. Click "Messages" → "Sent"
2. View messages you've sent

---

## Common Features

### Notifications

#### View Notifications

1. Click notification icon in top navigation
2. See notification count badge
3. View list of notifications:
   - New messages
   - New assignments
   - New announcements

#### Mark as Read

- Click on a notification to mark it as read
- Or click "Mark All as Read" button

#### Delete Notifications

- Click delete icon next to notification
- Confirm deletion

### Profile Management

#### View Profile

1. Click your name in top navigation
2. View your profile information:
   - Name
   - Email
   - Role
   - Phone

#### Change Password

1. Go to profile settings
2. Click "Change Password"
3. Enter:
   - Current password
   - New password
   - Confirm new password
4. Click "Save"

### Logout

1. Click "Logout" button in top navigation
2. You'll be redirected to login page

---

## FAQ

### General Questions

**Q: I forgot my password. What should I do?**
A: Contact your school administrator to reset your password.

**Q: Can I access the portal from my phone?**
A: Yes, the portal is responsive and works on mobile devices.

**Q: How do I know if someone read my message?**
A: Messages show a "read" status once the recipient opens them.

### For Teachers

**Q: Can I edit an assignment after posting?**
A: Currently, you cannot edit assignments. You'll need to create a new one.

**Q: How do I download student submissions?**
A: Click on the submission to view details and download attached files.

**Q: Can I message multiple students at once?**
A: Yes, use the "Group Message" feature to message an entire class.

### For Students

**Q: Can I submit an assignment after the due date?**
A: This depends on your teacher's policy. The system allows late submissions, but they're marked as overdue.

**Q: Can I delete a message I sent?**
A: No, messages cannot be deleted once sent.

**Q: How do I know if I have new assignments?**
A: Check your dashboard for pending assignments count, or look for notifications.

### For Admins

**Q: Can I delete a user account?**
A: You can deactivate accounts. Deletion would require database access.

**Q: How do I backup the system?**
A: Refer to the Installation Guide for database backup procedures.

**Q: Can I export user lists?**
A: This feature is not currently available in the interface.

---

## Tips for Effective Use

### For Teachers
- Post announcements regularly to keep students informed
- Set clear due dates for assignments
- Respond to student messages promptly
- Use group messages for class-wide communications

### For Students
- Check the portal daily for new messages and assignments
- Submit assignments before the due date
- Keep your profile information updated
- Use clear subject lines in messages

### For Admins
- Regularly review system statistics
- Keep user accounts organized
- Deactivate accounts for users who leave
- Post important school-wide announcements

---

## Getting Help

If you encounter issues:
1. Check this user manual
2. Contact your school's IT support
3. Contact the system administrator

---

## System Requirements

### Browser Compatibility
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

### Internet Connection
- Stable internet connection required
- Minimum 1 Mbps recommended

### File Upload Limits
- Maximum file size: 5MB
- Supported formats: PDF, DOC, DOCX, JPG, PNG

---

## Security Best Practices

1. **Never share your password** with anyone
2. **Log out** when using shared computers
3. **Use strong passwords** with letters, numbers, and symbols
4. **Change your password** regularly
5. **Report suspicious activity** to administrators

---

## Glossary

- **Dashboard**: Main page showing overview and statistics
- **Announcement**: Public message to multiple users
- **Assignment**: Task given by teacher to students
- **Submission**: Student's response to an assignment
- **Notification**: Alert about new activity
- **Class**: Group of students taught by teacher(s)
- **Enrollment**: Student's registration in a class

---

*Last Updated: 2024*
*Version: 1.0*
