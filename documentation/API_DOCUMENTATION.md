# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Or as a cookie:
```
Cookie: token=<token>
```

---

## Authentication Endpoints

### POST /auth/login
Login to the system

**Request Body:**
```json
{
  "email": "user@school.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@school.com",
    "role": "teacher",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### POST /auth/logout
Logout from the system

**Headers:** Requires authentication

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
Get current user information

**Headers:** Requires authentication

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@school.com",
    "role": "teacher",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "555-0123"
  }
}
```

### POST /auth/change-password
Change user password

**Headers:** Requires authentication

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Admin Endpoints

All admin endpoints require authentication with admin role.

### GET /admin/dashboard
Get admin dashboard statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "teachers": 10,
    "students": 150,
    "classes": 20,
    "messages": 500,
    "announcements": 15
  }
}
```

### POST /admin/teachers
Register a new teacher

**Request Body:**
```json
{
  "email": "teacher@school.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Smith",
  "phone": "555-0123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Teacher registered successfully",
  "teacherId": 5
}
```

### GET /admin/teachers
Get all teachers

**Response:**
```json
{
  "success": true,
  "teachers": [
    {
      "id": 2,
      "email": "teacher@school.com",
      "first_name": "John",
      "last_name": "Smith",
      "phone": "555-0123",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### POST /admin/students
Register a new student

**Request Body:**
```json
{
  "email": "student@school.com",
  "password": "password123",
  "first_name": "Alice",
  "last_name": "Johnson",
  "phone": "555-0456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "studentId": 10
}
```

### GET /admin/students
Get all students

**Response:**
```json
{
  "success": true,
  "students": [
    {
      "id": 6,
      "email": "student@school.com",
      "first_name": "Alice",
      "last_name": "Johnson",
      "phone": "555-0456",
      "is_active": true,
      "created_at": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

### PATCH /admin/users/:userId/toggle-status
Activate or deactivate a user account

**Response:**
```json
{
  "success": true,
  "message": "User status updated"
}
```

### POST /admin/classes
Create a new class

**Request Body:**
```json
{
  "name": "Mathematics 10A",
  "grade_level": "10th Grade",
  "section": "A",
  "academic_year": "2023-2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Class created successfully",
  "classId": 5
}
```

### GET /admin/classes
Get all classes

**Response:**
```json
{
  "success": true,
  "classes": [
    {
      "id": 1,
      "name": "Mathematics 10A",
      "grade_level": "10th Grade",
      "section": "A",
      "academic_year": "2023-2024",
      "is_active": true,
      "created_at": "2024-01-10T09:00:00.000Z"
    }
  ]
}
```

### POST /admin/assign-teacher
Assign a teacher to a class

**Request Body:**
```json
{
  "teacher_id": 2,
  "class_id": 1,
  "subject": "Mathematics"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Teacher assigned to class"
}
```

### POST /admin/enroll-student
Enroll a student in a class

**Request Body:**
```json
{
  "student_id": 6,
  "class_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student enrolled in class"
}
```

### POST /admin/announcements
Post a global announcement

**Request Body:**
```json
{
  "title": "School Holiday",
  "content": "School will be closed next Friday.",
  "target_audience": "all"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Announcement posted"
}
```

---

## Teacher Endpoints

All teacher endpoints require authentication with teacher role.

### GET /teacher/dashboard
Get teacher dashboard

**Response:**
```json
{
  "success": true,
  "stats": {
    "classes": 3,
    "unreadMessages": 5,
    "assignments": 10
  },
  "classes": [
    {
      "id": 1,
      "name": "Mathematics 10A",
      "grade_level": "10th Grade",
      "student_count": 25
    }
  ]
}
```

### GET /teacher/classes
Get assigned classes

**Response:**
```json
{
  "success": true,
  "classes": [
    {
      "id": 1,
      "name": "Mathematics 10A",
      "subject": "Mathematics",
      "student_count": 25
    }
  ]
}
```

### GET /teacher/classes/:classId/students
Get students in a class

**Response:**
```json
{
  "success": true,
  "students": [
    {
      "id": 6,
      "email": "student@school.com",
      "first_name": "Alice",
      "last_name": "Johnson",
      "phone": "555-0456"
    }
  ]
}
```

### POST /teacher/messages
Send a private message to a student

**Request Body:**
```json
{
  "receiver_id": 6,
  "subject": "Assignment Question",
  "message": "Please review your submission."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent"
}
```

### POST /teacher/messages/group
Send a group message to a class

**Request Body:**
```json
{
  "class_id": 1,
  "subject": "Class Reminder",
  "message": "Don't forget about tomorrow's quiz."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Group message sent"
}
```

### POST /teacher/announcements
Post a class announcement

**Request Body:**
```json
{
  "title": "Quiz Next Week",
  "content": "There will be a quiz on Monday.",
  "class_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Announcement posted"
}
```

### POST /teacher/assignments
Create an assignment (multipart/form-data)

**Request Body:**
```
title: "Algebra Problem Set"
description: "Complete problems 1-20"
class_id: 1
due_date: "2024-03-15T23:59:59"
attachment: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Assignment created"
}
```

### GET /teacher/assignments
Get all assignments

**Response:**
```json
{
  "success": true,
  "assignments": [
    {
      "id": 1,
      "title": "Algebra Problem Set",
      "description": "Complete problems 1-20",
      "class_name": "Mathematics 10A",
      "due_date": "2024-03-15T23:59:59.000Z",
      "submission_count": 15
    }
  ]
}
```

### GET /teacher/assignments/:assignmentId/submissions
Get submissions for an assignment

**Response:**
```json
{
  "success": true,
  "submissions": [
    {
      "id": 1,
      "student_id": 6,
      "first_name": "Alice",
      "last_name": "Johnson",
      "email": "student@school.com",
      "content": "I have completed all problems.",
      "attachment_path": "uploads/1234567890-file.pdf",
      "submitted_at": "2024-03-14T18:30:00.000Z"
    }
  ]
}
```

---

## Student Endpoints

All student endpoints require authentication with student role.

### GET /student/dashboard
Get student dashboard

**Response:**
```json
{
  "success": true,
  "stats": {
    "classes": 5,
    "unreadMessages": 2,
    "pendingAssignments": 3
  },
  "classes": [
    {
      "id": 1,
      "name": "Mathematics 10A",
      "subject": "Mathematics",
      "teacher_first_name": "John",
      "teacher_last_name": "Smith"
    }
  ]
}
```

### GET /student/classes
Get enrolled classes

**Response:**
```json
{
  "success": true,
  "classes": [
    {
      "id": 1,
      "name": "Mathematics 10A",
      "subject": "Mathematics",
      "teacher_first_name": "John",
      "teacher_last_name": "Smith",
      "teacher_email": "teacher@school.com"
    }
  ]
}
```

### GET /student/announcements
Get announcements

**Response:**
```json
{
  "success": true,
  "announcements": [
    {
      "id": 1,
      "title": "Quiz Next Week",
      "content": "There will be a quiz on Monday.",
      "first_name": "John",
      "last_name": "Smith",
      "class_name": "Mathematics 10A",
      "created_at": "2024-03-10T10:00:00.000Z"
    }
  ]
}
```

### GET /student/assignments
Get assignments

**Response:**
```json
{
  "success": true,
  "assignments": [
    {
      "id": 1,
      "title": "Algebra Problem Set",
      "description": "Complete problems 1-20",
      "class_name": "Mathematics 10A",
      "teacher_first_name": "John",
      "teacher_last_name": "Smith",
      "due_date": "2024-03-15T23:59:59.000Z",
      "submission_id": null,
      "submitted_at": null
    }
  ]
}
```

### POST /student/assignments/submit
Submit an assignment (multipart/form-data)

**Request Body:**
```
assignment_id: 1
content: "I have completed all problems."
attachment: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Assignment submitted"
}
```

### POST /student/messages
Send a message to a teacher

**Request Body:**
```json
{
  "teacher_id": 2,
  "subject": "Question about Assignment",
  "message": "I have a question about problem 15."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent"
}
```

### GET /student/teachers
Get teachers

**Response:**
```json
{
  "success": true,
  "teachers": [
    {
      "id": 2,
      "first_name": "John",
      "last_name": "Smith",
      "email": "teacher@school.com",
      "subject": "Mathematics"
    }
  ]
}
```

---

## Message Endpoints

Available to all authenticated users.

### GET /messages/inbox
Get inbox messages

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "sender_id": 2,
      "sender_first_name": "John",
      "sender_last_name": "Smith",
      "sender_role": "teacher",
      "subject": "Assignment Question",
      "message": "Please review your submission.",
      "is_read": false,
      "created_at": "2024-03-14T10:30:00.000Z"
    }
  ]
}
```

### GET /messages/sent
Get sent messages

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 2,
      "receiver_id": 6,
      "receiver_first_name": "Alice",
      "receiver_last_name": "Johnson",
      "subject": "Assignment Question",
      "message": "I have a question about problem 15.",
      "created_at": "2024-03-14T09:00:00.000Z"
    }
  ]
}
```

### GET /messages/conversation/:userId
Get conversation with a user

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "sender_id": 6,
      "sender_first_name": "Alice",
      "sender_last_name": "Johnson",
      "receiver_id": 2,
      "receiver_first_name": "John",
      "receiver_last_name": "Smith",
      "subject": "Question",
      "message": "I have a question.",
      "created_at": "2024-03-14T09:00:00.000Z"
    }
  ]
}
```

### PATCH /messages/:messageId/read
Mark a message as read

**Response:**
```json
{
  "success": true,
  "message": "Message marked as read"
}
```

### GET /messages/unread-count
Get unread message count

**Response:**
```json
{
  "success": true,
  "count": 5
}
```

### GET /messages/search?query=keyword
Search messages

**Response:**
```json
{
  "success": true,
  "messages": [...]
}
```

---

## Notification Endpoints

Available to all authenticated users.

### GET /notifications
Get notifications

**Response:**
```json
{
  "success": true,
  "notifications": [
    {
      "id": 1,
      "title": "New Assignment",
      "message": "You have a new assignment in Mathematics 10A",
      "type": "assignment",
      "reference_id": 1,
      "is_read": false,
      "created_at": "2024-03-14T10:00:00.000Z"
    }
  ]
}
```

### GET /notifications/unread-count
Get unread notification count

**Response:**
```json
{
  "success": true,
  "count": 3
}
```

### PATCH /notifications/:notificationId/read
Mark notification as read

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### PATCH /notifications/read-all
Mark all notifications as read

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### DELETE /notifications/:notificationId
Delete a notification

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider implementing rate limiting to prevent abuse.

## File Upload Specifications

- **Maximum file size**: 5MB (configurable in .env)
- **Supported formats**: PDF, DOC, DOCX, JPG, PNG, GIF
- **Upload endpoint**: Uses multipart/form-data
- **Storage location**: `/uploads` directory

## Notes

- All timestamps are in ISO 8601 format
- All endpoints return JSON responses
- Authentication tokens expire after 7 days (configurable)
- File paths in responses are relative to the server root
