# Teacher-Student Communication Portal

A secure, web-based communication platform for high schools using **PostgreSQL**.

## 🚀 Quick Start

### 1. Install PostgreSQL
Download: https://www.postgresql.org/download/windows/
- Remember your postgres password!

### 2. Configure
Edit `.env` file:
```env
DB_PASSWORD=your_postgres_password
```

### 3. Setup Database
```cmd
npm run setup
```

### 4. Start Server
```cmd
npm start
```

### 5. Open Browser
Go to: http://localhost:3001

**Login:**
- Email: admin@school.com
- Password: Admin@123

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| **POSTGRESQL_SETUP.md** | Complete PostgreSQL installation guide |
| **CONVERSION_COMPLETE.md** | What's been converted to PostgreSQL |
| **EASY_SETUP_GUIDE.md** | Step-by-step setup instructions |
| **documentation/USER_MANUAL.md** | How to use the system |

## ✅ Features

- Role-based access (Admin, Teacher, Student)
- User management
- Class management
- Messaging system
- Announcements
- Assignment management
- Notifications
- File uploads
- Responsive design

## 🔧 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **Authentication:** JWT

## 📞 Support

Read `POSTGRESQL_SETUP.md` for troubleshooting and help.

---

**Made with ❤️ for education**
