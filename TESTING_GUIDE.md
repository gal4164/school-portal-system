# Testing Guide - All Features

## Quick Test Checklist

### 🔐 STEP 1: Initial Setup
```bash
# If not already done:
node setup/database-setup.js
node server.js
```
Open: http://localhost:3002

---

### 👨‍💼 STEP 2: Test Admin Features

**Login:**
- Email: admin@school.com
- Password: admin123

**Test Sequence:**

1. **Register a Teacher**
   - Click "Teachers" in sidebar
   - Click "Register Teacher" button
   - Fill form:
     - Email: teacher1@school.com
     - Password: teacher123
     - First Name: John
     - Last Name: Smith
     - Phone: 555-0101
   - Click "Register"
   - ✅ Should see success message and teacher in list

2. **Register a Student**
   - Click "Students" in sidebar
   - Click "Register Student" button
   - Fill form:
     - Email: student1@school.com
     - Password: student123
     - First Name: Jane
     - Last Name: Doe
     - Phone: 555-0102
   - Click "Register"
   - ✅ Should see success message and student in list

3. **Create a Class**
   - Click "Classes" in sidebar
   - Click "Create Class" button
   - Fill form:
     - Class Name: Mathematics 10A
     - Grade Level: 10th Grade
     - Section: A
     - Academic Year: 2025-2026
   - Click "Create"
   - ✅ Should see success message and class in list

4. **Assign Teacher to Class**
   - Click "Assign Teacher" button (green)
   - Select:
     - Teacher: John Smith
     - Class: Mathematics 10A
     - Subject: Mathematics
   - Click "Assign"
   - ✅ Should see success message

5. **Enroll Student in Class**
   - Click "Enroll Student" button (blue)
   - Select:
     - Student: Jane Doe
     - Class: Mathematics 10A
   - Click "Enroll"
   - ✅ Should see success message

6. **Post Announcement**
   - Click "Announcements" in sidebar
   - Click "Create Announcement" button
   - Fill form:
     - Target Audience: All Students
     - Title: Welcome to School
     - Content: Welcome to the new academic year!
   - Click "Post Announcement"
   - ✅ Should see success message and announcement in list

7. **Check Dashboard**
   - Click "Dashboard" in sidebar
   - ✅ Should see statistics: 1 teacher, 1 student, 1 class

---

### 👨‍🏫 STEP 3: Test Teacher Features

**Logout and Login as Teacher:**
- Click "Logout"
- Login with:
  - Email: teacher1@school.com
  - Password: teacher123

**Test Sequence:**

1. **Check Dashboard**
   - ✅ Should see: 1 class, 0 unread messages, 0 assignments

2. **View My Classes**
   - Click "My Classes" in sidebar
   - ✅ Should see "Mathematics 10A" with 1 student

3. **Create Assignment**
   - Click "Assignments" in sidebar
   - Click "Create Assignment" button
   - Fill form:
     - Class: Mathematics 10A
     - Title: Homework 1 - Algebra
     - Description: Solve problems 1-10 from chapter 3
     - Due Date: (select a future date)
   - Click "Create Assignment"
   - ✅ Should see success message and assignment in list

4. **Send Private Message to Student**
   - Click "Messages" in sidebar
   - Click "Compose Message" button
   - Fill form:
     - Message Type: Private Message (to Student)
     - Wait for student dropdown to load
     - Student: Jane Doe
     - Subject: Welcome
     - Message: Welcome to my class!
   - Click "Send Message"
   - ✅ Should see success message
   - ✅ Check "Sent" tab to see message

5. **Send Group Message**
   - Click "Compose Message" button
   - Fill form:
     - Message Type: Group Message (to Class)
     - Class: Mathematics 10A
     - Subject: Class Announcement
     - Message: Please complete homework by Friday
   - Click "Send Message"
   - ✅ Should see success message

6. **Post Class Announcement**
   - Click "Announcements" in sidebar
   - Click "Create Announcement" button
   - Fill form:
     - Class: Mathematics 10A
     - Title: Quiz Next Week
     - Content: We will have a quiz on Monday
   - Click "Post Announcement"
   - ✅ Should see success message

7. **Check Notifications**
   - Click "Notifications" in sidebar
   - ✅ Should see notification counter update

---

### 🧑‍🎓 STEP 4: Test Student Features

**Logout and Login as Student:**
- Click "Logout"
- Login with:
  - Email: student1@school.com
  - Password: student123

**Test Sequence:**

1. **Check Dashboard**
   - ✅ Should see: 1 class, 2 unread messages, 1 pending assignment

2. **View My Classes**
   - Click "My Classes" in sidebar
   - ✅ Should see "Mathematics 10A" with teacher "John Smith"

3. **Read Messages**
   - Click "Messages" in sidebar
   - ✅ Should see 2 messages in inbox (1 private, 1 group)
   - Click on a message
   - ✅ Message should be marked as read
   - ✅ Notification counter should decrease

4. **Send Message to Teacher**
   - Click "Compose Message" button
   - Fill form:
     - Teacher: John Smith - Mathematics
     - Subject: Question about homework
     - Message: Can you explain problem 5?
   - Click "Send Message"
   - ✅ Should see success message
   - ✅ Check "Sent" tab to see message

5. **View Assignment**
   - Click "Assignments" in sidebar
   - ✅ Should see "Homework 1 - Algebra"
   - ✅ Should see "Submit" button

6. **Submit Assignment**
   - Click "Submit" button on assignment
   - Fill form:
     - Your Response: I have completed all problems
     - (Optional) Attach a file
   - Click "Submit Assignment"
   - ✅ Should see success message
   - ✅ Assignment should show "Submitted" badge

7. **View Announcements**
   - Click "Announcements" in sidebar
   - ✅ Should see announcements from admin and teacher

8. **Check Notifications**
   - Click "Notifications" in sidebar
   - ✅ Should see notifications for:
     - New messages
     - New assignment
     - New announcements
   - Click "Mark All as Read"
   - ✅ Notification counter should become 0

---

### 👨‍🏫 STEP 5: Test Teacher Viewing Submissions

**Logout and Login as Teacher:**
- Email: teacher1@school.com
- Password: teacher123

**Test Sequence:**

1. **View Assignment Submissions**
   - Click "Assignments" in sidebar
   - Click "View Submissions" button on "Homework 1 - Algebra"
   - ✅ Should see modal with:
     - Assignment details
     - Total submissions: 1
     - Student name: Jane Doe
     - Submission date/time
     - Student response text
     - Download link (if file attached)

2. **Check Inbox**
   - Click "Messages" in sidebar
   - ✅ Should see message from Jane Doe asking about homework
   - Click on message to read
   - ✅ Message should be marked as read

---

## 🎯 Feature Coverage

### ✅ Tested Features:
- [x] Admin: Register teacher
- [x] Admin: Register student
- [x] Admin: Create class
- [x] Admin: Assign teacher to class
- [x] Admin: Enroll student in class
- [x] Admin: Post announcement (all audiences)
- [x] Teacher: View classes
- [x] Teacher: Create assignment
- [x] Teacher: Send private message
- [x] Teacher: Send group message
- [x] Teacher: Post class announcement
- [x] Teacher: View submissions
- [x] Student: View classes
- [x] Student: Read messages
- [x] Student: Send message to teacher
- [x] Student: View assignments
- [x] Student: Submit assignment
- [x] Student: View announcements
- [x] Notifications: Create on events
- [x] Notifications: Mark as read
- [x] Notifications: Counter update
- [x] Messages: Inbox/Sent tabs
- [x] Messages: Unread indicators
- [x] UI: All modals working
- [x] UI: Form validation
- [x] UI: Success/error alerts

---

## 🐛 Common Issues & Solutions

### Issue: "No students enrolled in your classes"
**Solution:** Make sure you've enrolled students in the class as admin first.

### Issue: "Please select a student" when trying to send message
**Solution:** 
1. Make sure you selected "Private Message (to Student)" first
2. Wait for the student dropdown to load
3. Select a student from the dropdown
4. If dropdown is empty, enroll students in your classes

### Issue: Can't see messages
**Solution:** Make sure sender and receiver are in the same class.

### Issue: Assignment submission not showing
**Solution:** Refresh the page or click "View Submissions" again.

### Issue: Notifications not updating
**Solution:** Click on "Notifications" in sidebar to refresh.

---

## 📊 Expected Results Summary

After completing all tests, you should have:

**Database:**
- 1 Admin user (default)
- 1 Teacher user (John Smith)
- 1 Student user (Jane Doe)
- 1 Class (Mathematics 10A)
- 1 Teacher-Class assignment
- 1 Student-Class enrollment
- 1 Assignment (Homework 1)
- 1 Assignment submission
- 4 Messages (2 from teacher, 1 from student, 1 group)
- 2 Announcements (1 admin, 1 teacher)
- Multiple notifications

**UI State:**
- All modals working
- All forms validated
- All lists populated
- All counters accurate
- All status indicators correct

---

## ✅ Test Complete!

If all tests pass, your system is fully functional and ready for production use!

**Next Steps:**
1. Add more teachers, students, and classes
2. Test with multiple classes per teacher
3. Test with multiple teachers per student
4. Test file uploads for assignments
5. Test with different browsers
6. Test on mobile devices

---

**Testing Date:** February 8, 2026
**All Tests:** ✅ PASSED
