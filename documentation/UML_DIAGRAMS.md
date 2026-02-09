# UML Diagrams

## Use Case Diagram

```
                    Teacher-Student Communication Portal
                    
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│  ┌──────────┐                                                  │
│  │  Admin   │                                                  │
│  └────┬─────┘                                                  │
│       │                                                         │
│       ├──────► Register Teacher                                │
│       ├──────► Register Student                                │
│       ├──────► Create Class                                    │
│       ├──────► Assign Teacher to Class                         │
│       ├──────► Enroll Student in Class                         │
│       ├──────► Activate/Deactivate User                        │
│       ├──────► Post Global Announcement                        │
│       └──────► View System Statistics                          │
│                                                                 │
│                                                                 │
│  ┌──────────┐                                                  │
│  │ Teacher  │                                                  │
│  └────┬─────┘                                                  │
│       │                                                         │
│       ├──────► View Dashboard                                  │
│       ├──────► View Assigned Classes                           │
│       ├──────► View Class Students                             │
│       ├──────► Send Private Message ◄────┐                     │
│       ├──────► Send Group Message        │                     │
│       ├──────► Post Class Announcement   │                     │
│       ├──────► Create Assignment         │                     │
│       ├──────► View Submissions          │                     │
│       └──────► View Messages             │                     │
│                                          │                     │
│                                          │                     │
│  ┌──────────┐                            │                     │
│  │ Student  │                            │                     │
│  └────┬─────┘                            │                     │
│       │                                  │                     │
│       ├──────► View Dashboard            │                     │
│       ├──────► View Enrolled Classes     │                     │
│       ├──────► View Announcements        │                     │
│       ├──────► View Assignments          │                     │
│       ├──────► Submit Assignment         │                     │
│       ├──────► Send Message to Teacher ──┘                     │
│       └──────► View Messages                                   │
│                                                                 │
│                                                                 │
│  ┌──────────────────────────────────────┐                     │
│  │  Common Use Cases (All Roles)        │                     │
│  ├──────────────────────────────────────┤                     │
│  │  • Login                             │                     │
│  │  • Logout                            │                     │
│  │  • Change Password                   │                     │
│  │  • View Notifications                │                     │
│  │  • Mark Notifications as Read        │                     │
│  └──────────────────────────────────────┘                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Class Diagram

```
┌─────────────────────────┐
│        User             │
├─────────────────────────┤
│ - id: int               │
│ - email: string         │
│ - password: string      │
│ - role: enum            │
│ - firstName: string     │
│ - lastName: string      │
│ - phone: string         │
│ - isActive: boolean     │
│ - createdAt: timestamp  │
├─────────────────────────┤
│ + login()               │
│ + logout()              │
│ + changePassword()      │
│ + getProfile()          │
└───────────┬─────────────┘
            │
            │ inherits
    ┌───────┼───────┐
    │       │       │
    ▼       ▼       ▼
┌────────┐ ┌────────┐ ┌────────┐
│ Admin  │ │Teacher │ │Student │
├────────┤ ├────────┤ ├────────┤
│        │ │        │ │        │
├────────┤ ├────────┤ ├────────┤
│+register│ │+view   │ │+view   │
│ Teacher│ │ Classes│ │ Classes│
│+register│ │+send   │ │+view   │
│ Student│ │ Message│ │ Assign-│
│+create │ │+create │ │ ments  │
│ Class  │ │ Assign-│ │+submit │
│+assign │ │ ment   │ │ Assign-│
│ Teacher│ │+post   │ │ ment   │
│+enroll │ │ Announ-│ │+send   │
│ Student│ │ cement │ │ Message│
│+post   │ │+view   │ │+view   │
│ Announ-│ │ Submis-│ │ Announ-│
│ cement │ │ sions  │ │ cements│
└────────┘ └────────┘ └────────┘
                │           │
                │           │
                ▼           ▼
        ┌─────────────────────┐
        │      Class          │
        ├─────────────────────┤
        │ - id: int           │
        │ - name: string      │
        │ - gradeLevel: string│
        │ - section: string   │
        │ - academicYear: str │
        │ - isActive: boolean │
        ├─────────────────────┤
        │ + getStudents()     │
        │ + getTeachers()     │
        │ + getAssignments()  │
        └──────────┬──────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Message  │ │Announce- │ │Assign-   │
│          │ │ment      │ │ment      │
├──────────┤ ├──────────┤ ├──────────┤
│-id: int  │ │-id: int  │ │-id: int  │
│-sender   │ │-userId   │ │-teacherId│
│-receiver │ │-title    │ │-classId  │
│-subject  │ │-content  │ │-title    │
│-message  │ │-target   │ │-descrip- │
│-type     │ │-classId  │ │ tion     │
│-isRead   │ │-isActive │ │-dueDate  │
├──────────┤ ├──────────┤ ├──────────┤
│+send()   │ │+post()   │ │+create() │
│+markRead│ │+deacti-  │ │+getSubmis│
│()        │ │ vate()   │ │ sions()  │
└──────────┘ └──────────┘ └────┬─────┘
                                │
                                │ 1:N
                                ▼
                        ┌──────────────┐
                        │ Submission   │
                        ├──────────────┤
                        │ -id: int     │
                        │ -assignmentId│
                        │ -studentId   │
                        │ -content     │
                        │ -attachment  │
                        │ -submittedAt │
                        ├──────────────┤
                        │ +submit()    │
                        │ +update()    │
                        └──────────────┘

┌─────────────────────┐
│   Notification      │
├─────────────────────┤
│ - id: int           │
│ - userId: int       │
│ - title: string     │
│ - message: string   │
│ - type: enum        │
│ - referenceId: int  │
│ - isRead: boolean   │
│ - createdAt: time   │
├─────────────────────┤
│ + create()          │
│ + markAsRead()      │
│ + delete()          │
└─────────────────────┘
```

## Sequence Diagram - Messaging Flow

```
Student          API Gateway      Auth Middleware    Message Controller    Database
  │                  │                   │                    │                │
  │  POST /messages  │                   │                    │                │
  ├─────────────────►│                   │                    │                │
  │                  │  Verify Token     │                    │                │
  │                  ├──────────────────►│                    │                │
  │                  │                   │  Token Valid       │                │
  │                  │◄──────────────────┤                    │                │
  │                  │                   │                    │                │
  │                  │  Send Message     │                    │                │
  │                  ├───────────────────┴───────────────────►│                │
  │                  │                                        │                │
  │                  │                                        │ INSERT message │
  │                  │                                        ├───────────────►│
  │                  │                                        │                │
  │                  │                                        │ Message ID     │
  │                  │                                        │◄───────────────┤
  │                  │                                        │                │
  │                  │                                        │ INSERT notif   │
  │                  │                                        ├───────────────►│
  │                  │                                        │                │
  │                  │                                        │ Success        │
  │                  │                                        │◄───────────────┤
  │                  │                                        │                │
  │                  │  Success Response                      │                │
  │                  │◄───────────────────────────────────────┤                │
  │                  │                                        │                │
  │  200 OK          │                                        │                │
  │◄─────────────────┤                                        │                │
  │                  │                                        │                │


Teacher          API Gateway      Auth Middleware    Message Controller    Database
  │                  │                   │                    │                │
  │  GET /inbox      │                   │                    │                │
  ├─────────────────►│                   │                    │                │
  │                  │  Verify Token     │                    │                │
  │                  ├──────────────────►│                    │                │
  │                  │                   │  Token Valid       │                │
  │                  │◄──────────────────┤                    │                │
  │                  │                   │                    │                │
  │                  │  Get Inbox        │                    │                │
  │                  ├───────────────────┴───────────────────►│                │
  │                  │                                        │                │
  │                  │                                        │ SELECT messages│
  │                  │                                        ├───────────────►│
  │                  │                                        │                │
  │                  │                                        │ Messages       │
  │                  │                                        │◄───────────────┤
  │                  │                                        │                │
  │                  │  Messages Array                        │                │
  │                  │◄───────────────────────────────────────┤                │
  │                  │                                        │                │
  │  200 OK + Data   │                                        │                │
  │◄─────────────────┤                                        │                │
  │                  │                                        │                │
```

## Activity Diagram - Assignment Submission Flow

```
                    Student Assignment Submission
                    
        ┌─────────────────────────────────────────┐
        │           Start                         │
        └──────────────┬──────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────────┐
        │     Student Logs In                     │
        └──────────────┬──────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────────┐
        │     Navigate to Assignments             │
        └──────────────┬──────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────────┐
        │     View Assignment List                │
        └──────────────┬──────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────────┐
        │     Select Assignment                   │
        └──────────────┬──────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Already       │
              │  Submitted?    │
              └────┬───────┬───┘
                   │       │
              Yes  │       │ No
                   │       │
                   ▼       ▼
        ┌──────────────┐  ┌──────────────────────┐
        │ Show         │  │ Show Submission Form │
        │ Submission   │  └──────────┬───────────┘
        │ Details      │             │
        └──────┬───────┘             ▼
               │          ┌──────────────────────┐
               │          │ Enter Text Content   │
               │          └──────────┬───────────┘
               │                     │
               │                     ▼
               │          ┌──────────────────────┐
               │          │ Upload File          │
               │          │ (Optional)           │
               │          └──────────┬───────────┘
               │                     │
               │                     ▼
               │          ┌──────────────────────┐
               │          │ Click Submit         │
               │          └──────────┬───────────┘
               │                     │
               │                     ▼
               │          ┌──────────────────────┐
               │          │ Validate Input       │
               │          └──────────┬───────────┘
               │                     │
               │                     ▼
               │              ┌──────────┐
               │              │  Valid?  │
               │              └──┬───┬───┘
               │                 │   │
               │            No   │   │ Yes
               │                 │   │
               │                 ▼   ▼
               │     ┌──────────────┐ ┌──────────────┐
               │     │ Show Error   │ │ Save to DB   │
               │     │ Message      │ └──────┬───────┘
               │     └──────┬───────┘        │
               │            │                │
               │            └────────┐       ▼
               │                     │ ┌──────────────┐
               │                     │ │ Create       │
               │                     │ │ Notification │
               │                     │ └──────┬───────┘
               │                     │        │
               │                     │        ▼
               │                     │ ┌──────────────┐
               │                     │ │ Show Success │
               │                     │ │ Message      │
               │                     │ └──────┬───────┘
               │                     │        │
               └─────────────────────┴────────┘
                                     │
                                     ▼
                          ┌──────────────────┐
                          │      End         │
                          └──────────────────┘
```

## State Diagram - Message Status

```
                    Message State Transitions
                    
        ┌─────────────────────────────────────────┐
        │         [Initial State]                 │
        │                                         │
        │            ┌────────┐                   │
        │            │  New   │                   │
        │            └───┬────┘                   │
        │                │                        │
        │                │ Message Created        │
        │                │                        │
        │                ▼                        │
        │            ┌────────┐                   │
        │            │  Sent  │                   │
        │            └───┬────┘                   │
        │                │                        │
        │                │ Delivered to Server    │
        │                │                        │
        │                ▼                        │
        │          ┌──────────┐                   │
        │          │Delivered │                   │
        │          └─────┬────┘                   │
        │                │                        │
        │                │ Receiver Views Message │
        │                │                        │
        │                ▼                        │
        │            ┌────────┐                   │
        │            │  Read  │                   │
        │            └────────┘                   │
        │                                         │
        │         [Final State]                   │
        └─────────────────────────────────────────┘


                    Assignment Status
                    
        ┌─────────────────────────────────────────┐
        │         [Initial State]                 │
        │                                         │
        │          ┌──────────┐                   │
        │          │ Created  │                   │
        │          └─────┬────┘                   │
        │                │                        │
        │                │ Posted to Class        │
        │                │                        │
        │                ▼                        │
        │          ┌──────────┐                   │
        │          │ Active   │                   │
        │          └─────┬────┘                   │
        │                │                        │
        │        ┌───────┼───────┐               │
        │        │               │               │
        │        │ Due Date      │ Student       │
        │        │ Passed        │ Submits       │
        │        │               │               │
        │        ▼               ▼               │
        │   ┌─────────┐    ┌──────────┐         │
        │   │ Overdue │    │Submitted │         │
        │   └─────────┘    └──────────┘         │
        │                                         │
        │         [Final States]                  │
        └─────────────────────────────────────────┘
```
