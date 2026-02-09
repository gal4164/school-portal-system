# Quick Start Guide

Get the Teacher-Student Communication Portal up and running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- MySQL 5.7+ installed and running
- Basic command line knowledge

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env` and set your MySQL password:
```env
DB_PASSWORD=your_mysql_password
```

### 3. Setup Database

```bash
npm run setup
```

This creates the database, tables, and default admin account.

### 4. Start Server

```bash
npm start
```

### 5. Access Portal

Open browser and go to: `http://localhost:3000`

## Default Login

**Admin Account:**
- Email: `admin@school.com`
- Password: `Admin@123`

⚠️ **Change this password immediately after first login!**

## First Steps After Login

### As Admin:

1. **Change Admin Password**
   - Go to profile settings
   - Click "Change Password"

2. **Register Teachers**
   - Click "Teachers" in sidebar
   - Click "Register Teacher"
   - Fill in details

3. **Register Students**
   - Click "Students" in sidebar
   - Click "Register Student"
   - Fill in details

4. **Create Classes**
   - Click "Classes" in sidebar
   - Click "Create Class"
   - Enter class details

5. **Assign Teachers to Classes**
   - Go to "Classes"
   - Click "Assign Teacher"
   - Select teacher and class

6. **Enroll Students in Classes**
   - Go to "Classes"
   - Click "Enroll Student"
   - Select student and class

## Testing the System

### Test Teacher Account

1. Register a teacher (as admin)
2. Logout
3. Login with teacher credentials
4. Explore teacher dashboard
5. Try sending a message
6. Create an assignment

### Test Student Account

1. Register a student (as admin)
2. Enroll student in a class
3. Logout
4. Login with student credentials
5. View assignments
6. Send a message to teacher

## Common Commands

```bash
# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Setup/Reset database
npm run setup
```

## Troubleshooting

### Can't connect to database?
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database user has permissions

### Port 3000 already in use?
- Change `PORT=3001` in `.env`
- Or stop the process using port 3000

### Login not working?
- Clear browser cookies
- Check database was setup correctly
- Verify credentials

## Next Steps

- Read the [User Manual](documentation/USER_MANUAL.md) for detailed features
- Check [API Documentation](documentation/API_DOCUMENTATION.md) for integration
- Review [Installation Guide](documentation/INSTALLATION_GUIDE.md) for production setup

## Need Help?

- Check documentation in `/documentation` folder
- Review error messages in console
- Ensure all prerequisites are installed

## Project Structure

```
teacher-student-portal/
├── config/              # Database configuration
├── controllers/         # Business logic
├── middleware/          # Authentication
├── routes/             # API routes
├── public/             # Frontend files
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript
│   └── *.html         # HTML pages
├── uploads/            # File uploads
├── documentation/      # Project docs
└── setup/             # Database setup
```

## Features Overview

✅ Role-based authentication (Admin, Teacher, Student)
✅ Private messaging
✅ Group messaging
✅ Announcements
✅ Assignment management
✅ File uploads
✅ Notifications
✅ Responsive design

## Security Notes

- Change default admin password
- Use strong passwords
- Keep JWT_SECRET secure
- Use HTTPS in production
- Regular database backups

---

**Ready to go!** Start by logging in as admin and setting up your school's users and classes.
