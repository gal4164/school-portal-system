# 📧 Teacher-Student Communication Guide

## How Communication Works

The portal provides **secure, role-based communication** between teachers and students.

---

## 🔄 Communication Flow

```
Teacher ←→ Student (Private Messages)
Teacher → Class (Group Messages)
Admin → Everyone (Announcements)
```

---

## 👨‍🏫 For Teachers

### 1. Send Private Message to Student

**Steps:**
1. Login as teacher
2. Click **"Messages"** in sidebar
3. Click **"Compose Message"**
4. Select student from dropdown
5. Enter subject (optional)
6. Type your message
7. Click **"Send"**

**Example:**
```
To: Alice Johnson
Subject: Assignment Question
Message: Hi Alice, I noticed you had a question about problem 15. 
Let me know if you need clarification.
```

### 2. Send Group Message to Class

**Steps:**
1. Click **"Messages"** in sidebar
2. Click **"Compose Group Message"**
3. Select class from dropdown
4. Enter subject
5. Type your message
6. Click **"Send"**

**Example:**
```
To: Mathematics 10A
Subject: Class Reminder
Message: Reminder: Tomorrow we will have a review session for 
the upcoming quiz. Please bring your textbooks.
```

### 3. View Received Messages

**Steps:**
1. Click **"Messages"** → **"Inbox"**
2. See all messages from students
3. Unread messages are highlighted
4. Click on a message to read it

### 4. Reply to Student

**Steps:**
1. Open the message in inbox
2. Click **"Reply"**
3. Type your response
4. Click **"Send"**

---

## 🧑‍🎓 For Students

### 1. Send Message to Teacher

**Steps:**
1. Login as student
2. Click **"Messages"** in sidebar
3. Click **"Compose Message"**
4. Select teacher from dropdown
5. Enter subject (optional)
6. Type your message
7. Click **"Send"**

**Example:**
```
To: Mr. Smith
Subject: Question about Assignment
Message: Dear Mr. Smith, I have a question about problem 15 
in the algebra assignment. Could you please clarify?
```

### 2. View Messages from Teachers

**Steps:**
1. Click **"Messages"** → **"Inbox"**
2. See all messages from teachers
3. Unread messages are highlighted
4. Click on a message to read it

### 3. View Group Messages

**Steps:**
1. Go to **"Messages"** → **"Inbox"**
2. Group messages show the class name
3. These are sent to your entire class

---

## 🔔 Notification System

### How Notifications Work:

1. **New Message** → Notification created
2. **New Assignment** → Notification created
3. **New Announcement** → Notification created
4. **Badge shows count** → Unread notifications

### View Notifications:

1. Click notification icon (top right)
2. See notification count badge
3. Click to view all notifications
4. Click notification to mark as read

---

## 📋 Communication Setup Process

### Step 1: Admin Creates Users and Classes

```
Admin → Register Teachers
Admin → Register Students
Admin → Create Classes
```

### Step 2: Admin Assigns Relationships

```
Admin → Assign Teacher to Class
Admin → Enroll Student in Class
```

### Step 3: Communication Enabled!

```
Teacher ←→ Student (Can now message each other)
```

---

## 🎯 Complete Example Workflow

### Scenario: Teacher sends assignment question to student

**1. Admin Setup:**
```
✓ Register Teacher: John Smith (john.smith@school.com)
✓ Register Student: Alice Johnson (alice.johnson@student.school.com)
✓ Create Class: Mathematics 10A
✓ Assign John Smith to Mathematics 10A
✓ Enroll Alice Johnson in Mathematics 10A
```

**2. Teacher Sends Message:**
```
Login: john.smith@school.com
Go to: Messages → Compose Message
Select: Alice Johnson
Subject: Assignment Clarification
Message: Hi Alice, regarding problem 15...
Click: Send
```

**3. Student Receives:**
```
Login: alice.johnson@student.school.com
Notification: "You have a new message"
Go to: Messages → Inbox
See: Message from Mr. Smith
Click: Open message
Read: Assignment clarification
```

**4. Student Replies:**
```
Click: Reply
Message: Thank you Mr. Smith, that helps!
Click: Send
```

**5. Teacher Receives Reply:**
```
Notification: "You have a new message from a student"
Go to: Messages → Inbox
See: Reply from Alice Johnson
```

---

## 🔐 Security Features

### Access Control:
- ✅ Students can only message their assigned teachers
- ✅ Teachers can only message their enrolled students
- ✅ Messages are private and secure
- ✅ No cross-class unauthorized communication

### Verification:
- System checks if student is enrolled in teacher's class
- System checks if teacher is assigned to student's class
- Access denied if no relationship exists

---

## 📊 Message Types

### 1. Private Messages
- **One-to-one** communication
- Teacher ↔ Student
- Appears in both inboxes
- Private and secure

### 2. Group Messages
- **One-to-many** communication
- Teacher → Entire Class
- All students in class receive it
- Shows class name

### 3. Announcements
- **Broadcast** messages
- Admin → All users
- Teacher → Class
- Appears in announcements section

---

## 💡 Best Practices

### For Teachers:
1. ✅ Use clear subject lines
2. ✅ Respond to student messages promptly
3. ✅ Use group messages for class-wide info
4. ✅ Keep messages professional
5. ✅ Check inbox regularly

### For Students:
1. ✅ Be respectful in messages
2. ✅ Use proper grammar
3. ✅ Include clear subject lines
4. ✅ Check messages daily
5. ✅ Reply to teacher messages

---

## 🛠️ Technical Details

### Database Structure:
```sql
messages table:
- id (unique identifier)
- sender_id (who sent it)
- receiver_id (who receives it)
- class_id (for group messages)
- subject (message subject)
- message (message content)
- message_type (private/group)
- is_read (read status)
- created_at (timestamp)
```

### API Endpoints:
```
POST /api/teacher/messages - Send private message
POST /api/teacher/messages/group - Send group message
POST /api/student/messages - Send message to teacher
GET /api/messages/inbox - Get inbox
GET /api/messages/sent - Get sent messages
GET /api/messages/conversation/:userId - Get conversation
```

---

## 🎓 Quick Start Guide

### For Teachers:
1. Login to portal
2. Go to "My Classes"
3. View students in each class
4. Click "Messages" to communicate
5. Select student and send message

### For Students:
1. Login to portal
2. Go to "My Classes"
3. View your teachers
4. Click "Messages" to communicate
5. Select teacher and send message

---

## ❓ FAQ

**Q: Can students message each other?**
A: No, only teacher-student communication is allowed.

**Q: Can I delete sent messages?**
A: No, messages cannot be deleted once sent.

**Q: How do I know if my message was read?**
A: Messages show "read" status once opened.

**Q: Can I attach files to messages?**
A: Currently, file attachments are supported for assignments only.

**Q: How many messages can I send?**
A: No limit on number of messages.

**Q: Are messages private?**
A: Yes, only sender and receiver can see private messages.

---

## 🚀 Getting Started

1. **Admin:** Set up users and classes
2. **Admin:** Assign relationships
3. **Teachers:** Start messaging students
4. **Students:** Reply to teachers
5. **Everyone:** Check notifications regularly

---

**Communication is now fully functional! Start messaging!** 📧
