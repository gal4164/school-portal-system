# 👋 READ THIS FIRST!

## 📦 What You Have

A complete **Teacher-Student Communication Portal** with:
- Admin, Teacher, and Student roles
- Messaging system
- Assignment management
- Announcements
- Notifications
- File uploads
- Responsive design

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install MySQL

**Easiest way - Use XAMPP:**
- Download: https://www.apachefriends.org/
- Install it
- Open XAMPP Control Panel
- Click "Start" next to MySQL

### 2️⃣ Setup Database

Open Command Prompt here and run:
```cmd
npm run setup
```

### 3️⃣ Start Server

```cmd
npm start
```

Then open: **http://localhost:3001**

Login:
- Email: `admin@school.com`
- Password: `Admin@123`

## 📖 Detailed Guides

Choose based on your experience:

| Guide | For Who | File |
|-------|---------|------|
| 🟢 **Easy Setup** | Beginners | `EASY_SETUP_GUIDE.md` |
| 🟡 **Quick Start** | Some experience | `QUICK_START.md` |
| 🔴 **Full Installation** | Advanced users | `documentation/INSTALLATION_GUIDE.md` |

## 🆘 Need Help?

1. **Can't install MySQL?**
   - Read: `SETUP_INSTRUCTIONS.md`
   - Use XAMPP instead of MySQL directly

2. **Database errors?**
   - Make sure MySQL is running
   - Check `.env` file password

3. **Port already in use?**
   - Already changed to port 3001
   - If still issues, change to 3002 in `.env`

4. **Want to understand the system?**
   - Read: `documentation/USER_MANUAL.md`
   - Read: `documentation/PROJECT_DOCUMENTATION.md`

## 📁 Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Configuration (edit this!)
├── config/                # Database config
├── controllers/           # Business logic
├── routes/                # API routes
├── middleware/            # Authentication
├── public/                # Frontend (HTML/CSS/JS)
├── uploads/               # File uploads
├── documentation/         # Full documentation
└── setup/                 # Database setup scripts
```

## ✅ What's Already Done

- ✅ All code files created
- ✅ Dependencies installed
- ✅ Environment configured
- ✅ Port set to 3001
- ✅ Documentation written

## ❌ What You Need to Do

- ❌ Install MySQL/XAMPP
- ❌ Run database setup
- ❌ Start the server
- ❌ Login and test

## 🎯 After Setup

1. Login as admin
2. Change admin password
3. Register teachers
4. Register students
5. Create classes
6. Assign teachers to classes
7. Enroll students in classes

## 🚀 Features

- **Admin Module:**
  - User management
  - Class management
  - System statistics
  - Global announcements

- **Teacher Module:**
  - View assigned classes
  - Send messages to students
  - Create assignments
  - Post announcements
  - View submissions

- **Student Module:**
  - View enrolled classes
  - View assignments
  - Submit assignments
  - Message teachers
  - View announcements

- **Common Features:**
  - Secure authentication
  - Real-time notifications
  - File attachments
  - Message history
  - Responsive design

## 📞 Support Files

| File | Purpose |
|------|---------|
| `START_HERE.txt` | Simple text instructions |
| `EASY_SETUP_GUIDE.md` | Step-by-step with screenshots |
| `QUICK_START.md` | Fast setup for experienced users |
| `SETUP_INSTRUCTIONS.md` | Windows-specific setup |
| `documentation/USER_MANUAL.md` | How to use the system |
| `documentation/INSTALLATION_GUIDE.md` | Complete installation |
| `documentation/API_DOCUMENTATION.md` | API reference |

## 🎓 Learning Resources

- **Database Schema:** `documentation/DATABASE_SCHEMA.md`
- **UML Diagrams:** `documentation/UML_DIAGRAMS.md`
- **Project Docs:** `documentation/PROJECT_DOCUMENTATION.md`

## 💡 Tips

1. **Use XAMPP** - It's easier than installing MySQL separately
2. **Keep Command Prompt open** - Server needs to run
3. **Use Chrome** - Best browser compatibility
4. **Read USER_MANUAL.md** - Learn all features
5. **Change default passwords** - Security first!

## 🎉 Ready?

**Start with:** `EASY_SETUP_GUIDE.md`

It has pictures and step-by-step instructions!

---

**Good luck! 🚀**
