# 🎓 School Portal System

A comprehensive, secure web-based communication and management platform for schools featuring role-based access, messaging, announcements, and assignment management.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 👨‍💼 Admin Features
- User management (Teachers & Students)
- Class creation and management
- Teacher-to-class assignments
- Student enrollment
- System-wide announcements
- View all system statistics

### 👨‍🏫 Teacher Features
- Send messages to individual students or entire classes
- Create announcements for students or classes
- Create and manage assignments with file attachments
- View assignment submissions
- Manage multiple classes
- View class rosters

### 👨‍🎓 Student Features
- Receive and read messages from teachers
- View announcements
- Submit assignments with file attachments
- View assignment files (PDF, DOC, etc.)
- Track assignment deadlines
- View enrolled classes

### 🎨 Beautiful UI
- **Role-based color themes:**
  - Admin: Purple/Indigo gradient
  - Teacher: Orange/Amber gradient
  - Student: Blue/Cyan gradient
- Smooth animations and transitions
- Responsive design for all devices
- Modern, intuitive interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/gal4164/school-portal-system.git
cd school-portal-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and set your configuration
```

4. **Setup database**
```bash
npm run setup
```

5. **Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

6. **Access the application**
```
Open your browser and go to: http://localhost:3002
```

### Default Login Credentials

**Admin Account:**
- Email: `admin@school.com`
- Password: `Admin@123`

**Test Teacher Account:**
- Email: `teacher@school.com`
- Password: `Teacher@123`

**Test Student Account:**
- Email: `student@school.com`
- Password: `Student@123`

> ⚠️ **Important:** Change these default passwords after first login!

## 📚 Documentation

Comprehensive documentation is available in the `/documentation` folder:

| Document | Description |
|----------|-------------|
| [Installation Guide](documentation/INSTALLATION_GUIDE.md) | Detailed installation instructions |
| [User Manual](documentation/USER_MANUAL.md) | Complete user guide for all roles |
| [API Documentation](documentation/API_DOCUMENTATION.md) | REST API endpoints reference |
| [Database Schema](documentation/DATABASE_SCHEMA.md) | Database structure and relationships |
| [Project Documentation](documentation/PROJECT_DOCUMENTATION.md) | Technical architecture overview |

### Quick Guides
- [Quick Start Guide](QUICK_START.md) - Get up and running fast
- [Easy Setup Guide](EASY_SETUP_GUIDE.md) - Step-by-step setup
- [Testing Guide](TESTING_GUIDE.md) - How to test the system

## 🏗️ Project Structure

```
school-portal-system/
├── config/              # Database configuration
├── controllers/         # Request handlers
│   ├── adminController.js
│   ├── teacherController.js
│   ├── studentController.js
│   └── ...
├── routes/              # API routes
├── middleware/          # Authentication & authorization
├── public/              # Frontend files
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   └── *.html          # HTML pages
├── documentation/       # Project documentation
├── setup/              # Database setup scripts
├── uploads/            # File upload directory
└── server.js           # Application entry point
```

## 🔧 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer

### Frontend
- **HTML5** & **CSS3**
- **JavaScript** (ES6+)
- **Bootstrap 5** - UI Framework
- **Responsive Design**

## 🎨 Screenshots

### Admin Dashboard
Beautiful purple/indigo gradient theme with comprehensive statistics and management tools.

### Teacher Dashboard
Warm orange/amber theme for managing classes, assignments, and student communication.

### Student Dashboard
Cool blue/cyan theme for accessing classes, assignments, and messages.

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- SQL injection prevention
- XSS protection
- Secure file upload handling
- Environment variable configuration

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin Routes
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/teachers` - Register teacher
- `POST /api/admin/students` - Register student
- `POST /api/admin/classes` - Create class
- `POST /api/admin/assign-teacher` - Assign teacher to class
- `POST /api/admin/enroll-student` - Enroll student in class

### Teacher Routes
- `GET /api/teacher/classes` - Get assigned classes
- `POST /api/teacher/messages` - Send message to student
- `POST /api/teacher/messages/group` - Send group message
- `POST /api/teacher/announcements` - Create announcement
- `POST /api/teacher/assignments` - Create assignment

### Student Routes
- `GET /api/student/classes` - Get enrolled classes
- `GET /api/student/assignments` - Get assignments
- `POST /api/student/assignments/submit` - Submit assignment
- `POST /api/student/messages` - Send message to teacher

See [API Documentation](documentation/API_DOCUMENTATION.md) for complete details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Geleta**
- GitHub: [@gal4164](https://github.com/gal4164)
- Email: geletasisay44@gmail.com

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for educational institutions
- Focus on user experience and security

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Documentation](documentation/)
2. Review the [Installation Guide](documentation/INSTALLATION_GUIDE.md)
3. Open an issue on GitHub
4. Contact the author

---

**Made with ❤️ for education**

⭐ Star this repository if you find it helpful!
