# Database Schema Documentation

## Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │
│ email           │
│ password        │
│ role            │
│ first_name      │
│ last_name       │
│ phone           │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
        │
        │ 1:N
        ├──────────────────────────────┐
        │                              │
        ▼                              ▼
┌─────────────────┐          ┌─────────────────┐
│teacher_classes  │          │student_classes  │
├─────────────────┤          ├─────────────────┤
│ id (PK)         │          │ id (PK)         │
│ teacher_id (FK) │          │ student_id (FK) │
│ class_id (FK)   │          │ class_id (FK)   │
│ subject         │          │ enrolled_at     │
│ assigned_at     │          └─────────────────┘
└─────────────────┘                  │
        │                            │
        │                            │
        └────────────┬───────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │    classes      │
            ├─────────────────┤
            │ id (PK)         │
            │ name            │
            │ grade_level     │
            │ section         │
            │ academic_year   │
            │ is_active       │
            │ created_at      │
            └─────────────────┘
                     │
                     │ 1:N
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
        ▼            ▼            ▼              ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│  messages   │ │announce- │ │assign-   │ │              │
│             │ │ments     │ │ments     │ │              │
├─────────────┤ ├──────────┤ ├──────────┤ │              │
│ id (PK)     │ │ id (PK)  │ │ id (PK)  │ │              │
│ sender_id   │ │ user_id  │ │teacher_id│ │              │
│ receiver_id │ │ title    │ │ class_id │ │              │
│ class_id    │ │ content  │ │ title    │ │              │
│ subject     │ │ target   │ │descrip-  │ │              │
│ message     │ │ class_id │ │tion      │ │              │
│ type        │ │ is_active│ │ due_date │ │              │
│ parent_id   │ │created_at│ │attach-   │ │              │
│ is_read     │ └──────────┘ │ment_path │ │              │
│ created_at  │              │created_at│ │              │
└─────────────┘              └──────────┘ │              │
                                    │     │              │
                                    │ 1:N │              │
                                    ▼     │              │
                            ┌──────────────┐             │
                            │ submissions  │             │
                            ├──────────────┤             │
                            │ id (PK)      │             │
                            │assignment_id │             │
                            │ student_id   │             │
                            │ content      │             │
                            │ attachment   │             │
                            │ submitted_at │             │
                            └──────────────┘             │
                                                         │
                                                         ▼
                                                ┌──────────────┐
                                                │notifications │
                                                ├──────────────┤
                                                │ id (PK)      │
                                                │ user_id (FK) │
                                                │ title        │
                                                │ message      │
                                                │ type         │
                                                │ reference_id │
                                                │ is_read      │
                                                │ created_at   │
                                                └──────────────┘
```

## Table Definitions

### users
Stores all user accounts (Admin, Teacher, Student)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| role | ENUM | NOT NULL | User role: admin, teacher, student |
| first_name | VARCHAR(100) | NOT NULL | User first name |
| last_name | VARCHAR(100) | NOT NULL | User last name |
| phone | VARCHAR(20) | NULL | Contact phone number |
| is_active | BOOLEAN | DEFAULT true | Account active status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes:**
- idx_email (email)
- idx_role (role)

### classes
Stores class/course information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique class identifier |
| name | VARCHAR(100) | NOT NULL | Class name |
| grade_level | VARCHAR(20) | NULL | Grade level (e.g., "10th Grade") |
| section | VARCHAR(10) | NULL | Section identifier (e.g., "A", "B") |
| academic_year | VARCHAR(20) | NULL | Academic year (e.g., "2023-2024") |
| is_active | BOOLEAN | DEFAULT true | Class active status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Class creation time |

**Indexes:**
- idx_name (name)

### teacher_classes
Maps teachers to classes they teach

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique mapping identifier |
| teacher_id | INT | FOREIGN KEY (users.id), NOT NULL | Teacher user ID |
| class_id | INT | FOREIGN KEY (classes.id), NOT NULL | Class ID |
| subject | VARCHAR(100) | NULL | Subject taught |
| assigned_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Assignment time |

**Constraints:**
- UNIQUE (teacher_id, class_id)
- ON DELETE CASCADE

### student_classes
Maps students to classes they're enrolled in

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique enrollment identifier |
| student_id | INT | FOREIGN KEY (users.id), NOT NULL | Student user ID |
| class_id | INT | FOREIGN KEY (classes.id), NOT NULL | Class ID |
| enrolled_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Enrollment time |

**Constraints:**
- UNIQUE (student_id, class_id)
- ON DELETE CASCADE

### messages
Stores all messages (private and group)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique message identifier |
| sender_id | INT | FOREIGN KEY (users.id), NOT NULL | Sender user ID |
| receiver_id | INT | FOREIGN KEY (users.id), NULL | Receiver user ID (for private) |
| class_id | INT | FOREIGN KEY (classes.id), NULL | Class ID (for group) |
| subject | VARCHAR(255) | NULL | Message subject |
| message | TEXT | NOT NULL | Message content |
| message_type | ENUM | DEFAULT 'private' | Type: private, group |
| parent_message_id | INT | FOREIGN KEY (messages.id), NULL | Parent message for threading |
| is_read | BOOLEAN | DEFAULT false | Read status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Message creation time |

**Indexes:**
- idx_sender (sender_id)
- idx_receiver (receiver_id)
- idx_created (created_at)

**Constraints:**
- ON DELETE CASCADE

### announcements
Stores system and class announcements

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique announcement identifier |
| user_id | INT | FOREIGN KEY (users.id), NOT NULL | Creator user ID |
| title | VARCHAR(255) | NOT NULL | Announcement title |
| content | TEXT | NOT NULL | Announcement content |
| target_audience | ENUM | DEFAULT 'all' | Target: all, teachers, students, class |
| class_id | INT | FOREIGN KEY (classes.id), NULL | Target class ID |
| is_active | BOOLEAN | DEFAULT true | Active status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |

**Indexes:**
- idx_created (created_at)

**Constraints:**
- ON DELETE CASCADE (user_id)
- ON DELETE SET NULL (class_id)

### assignments
Stores assignment information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique assignment identifier |
| teacher_id | INT | FOREIGN KEY (users.id), NOT NULL | Teacher user ID |
| class_id | INT | FOREIGN KEY (classes.id), NOT NULL | Class ID |
| title | VARCHAR(255) | NOT NULL | Assignment title |
| description | TEXT | NULL | Assignment description |
| due_date | DATETIME | NULL | Due date and time |
| attachment_path | VARCHAR(500) | NULL | File attachment path |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |

**Indexes:**
- idx_due_date (due_date)

**Constraints:**
- ON DELETE CASCADE

### submissions
Stores student assignment submissions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique submission identifier |
| assignment_id | INT | FOREIGN KEY (assignments.id), NOT NULL | Assignment ID |
| student_id | INT | FOREIGN KEY (users.id), NOT NULL | Student user ID |
| content | TEXT | NULL | Submission text content |
| attachment_path | VARCHAR(500) | NULL | File attachment path |
| submitted_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Submission time |

**Constraints:**
- UNIQUE (assignment_id, student_id)
- ON DELETE CASCADE

### notifications
Stores user notifications

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique notification identifier |
| user_id | INT | FOREIGN KEY (users.id), NOT NULL | Target user ID |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| type | ENUM | DEFAULT 'system' | Type: message, announcement, assignment, system |
| reference_id | INT | NULL | Reference to related entity |
| is_read | BOOLEAN | DEFAULT false | Read status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |

**Indexes:**
- idx_user_read (user_id, is_read)
- idx_created (created_at)

**Constraints:**
- ON DELETE CASCADE

## Relationships

1. **users → teacher_classes**: One-to-Many (A teacher can teach multiple classes)
2. **users → student_classes**: One-to-Many (A student can enroll in multiple classes)
3. **classes → teacher_classes**: One-to-Many (A class can have multiple teachers)
4. **classes → student_classes**: One-to-Many (A class can have multiple students)
5. **users → messages (sender)**: One-to-Many (A user can send multiple messages)
6. **users → messages (receiver)**: One-to-Many (A user can receive multiple messages)
7. **classes → messages**: One-to-Many (A class can have multiple group messages)
8. **users → announcements**: One-to-Many (A user can create multiple announcements)
9. **classes → announcements**: One-to-Many (A class can have multiple announcements)
10. **users → assignments**: One-to-Many (A teacher can create multiple assignments)
11. **classes → assignments**: One-to-Many (A class can have multiple assignments)
12. **assignments → submissions**: One-to-Many (An assignment can have multiple submissions)
13. **users → submissions**: One-to-Many (A student can make multiple submissions)
14. **users → notifications**: One-to-Many (A user can have multiple notifications)

## Sample Queries

### Get all students in a teacher's classes
```sql
SELECT DISTINCT u.id, u.first_name, u.last_name, u.email
FROM users u
INNER JOIN student_classes sc ON u.id = sc.student_id
INNER JOIN teacher_classes tc ON sc.class_id = tc.class_id
WHERE tc.teacher_id = ? AND u.is_active = true;
```

### Get unread messages for a user
```sql
SELECT m.*, u.first_name, u.last_name
FROM messages m
INNER JOIN users u ON m.sender_id = u.id
WHERE m.receiver_id = ? AND m.is_read = false
ORDER BY m.created_at DESC;
```

### Get pending assignments for a student
```sql
SELECT a.*, c.name as class_name
FROM assignments a
INNER JOIN student_classes sc ON a.class_id = sc.class_id
LEFT JOIN submissions s ON a.id = s.assignment_id AND s.student_id = ?
WHERE sc.student_id = ? AND s.id IS NULL
ORDER BY a.due_date ASC;
```
