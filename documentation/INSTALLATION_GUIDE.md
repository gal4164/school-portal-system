# Installation Guide

## Prerequisites

Before installing the Teacher-Student Communication Portal, ensure you have the following software installed:

### Required Software
1. **Node.js** (version 14.x or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MySQL** (version 5.7 or higher)
   - Download from: https://dev.mysql.com/downloads/
   - Verify installation: `mysql --version`

3. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

### System Requirements
- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: Minimum 10GB free space
- **Network**: Internet connection for package installation

## Installation Steps

### Step 1: Download the Project

```bash
# If using Git
git clone <repository-url>
cd teacher-student-portal

# Or extract the ZIP file and navigate to the directory
cd teacher-student-portal
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required Node.js packages including:
- express
- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- multer
- express-validator
- cookie-parser

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

2. Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_portal
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Important**: 
- Replace `your_mysql_password` with your actual MySQL root password
- Change `JWT_SECRET` to a strong, random string for production
- Adjust `PORT` if 3000 is already in use

### Step 4: Create Upload Directory

```bash
# Windows
mkdir uploads

# macOS/Linux
mkdir -p uploads
```

### Step 5: Setup Database

Run the database setup script:

```bash
npm run setup
```

This script will:
- Create the `school_portal` database
- Create all required tables
- Set up foreign key relationships
- Create indexes for optimization
- Insert a default admin account

**Default Admin Credentials:**
- Email: admin@school.com
- Password: Admin@123

### Step 6: Start the Server

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

You should see:
```
Server running on port 3000
Visit http://localhost:3000
```

### Step 7: Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the home page of the portal.

## Verification

### Test the Installation

1. **Access Home Page**
   - Navigate to `http://localhost:3000`
   - Verify the home page loads correctly

2. **Test Login**
   - Click "Login" button
   - Use default admin credentials:
     - Email: admin@school.com
     - Password: Admin@123
   - Verify successful login and redirect to dashboard

3. **Check Database Connection**
   - Login should work (confirms database connection)
   - Dashboard should display statistics

4. **Test File Upload Directory**
   - Verify `uploads/` directory exists
   - Check write permissions

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution**:
- Verify MySQL is running
- Check database credentials in `.env` file
- Ensure MySQL user has proper permissions:
```sql
GRANT ALL PRIVILEGES ON school_portal.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

#### 2. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
- Change PORT in `.env` file to another port (e.g., 3001)
- Or stop the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

#### 3. npm Install Fails

**Error**: Various npm errors during installation

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you have internet connection

#### 4. Database Setup Fails

**Error**: Database tables not created

**Solution**:
- Manually create database:
```sql
CREATE DATABASE school_portal;
```
- Run setup script again: `npm run setup`
- Check MySQL error logs for details

#### 5. File Upload Not Working

**Error**: Cannot upload files

**Solution**:
- Verify `uploads/` directory exists
- Check directory permissions:
```bash
# macOS/Linux
chmod 755 uploads/

# Windows - Right-click folder → Properties → Security
```

#### 6. JWT Token Errors

**Error**: `JsonWebTokenError` or authentication fails

**Solution**:
- Ensure `JWT_SECRET` is set in `.env`
- Clear browser cookies and localStorage
- Try logging in again

## MySQL Setup (Detailed)

### Windows

1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run installer and choose "Developer Default"
3. Set root password during installation
4. Complete installation wizard
5. MySQL should start automatically

### macOS

```bash
# Using Homebrew
brew install mysql
brew services start mysql
mysql_secure_installation
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

## Production Deployment

### Additional Steps for Production

1. **Set Environment to Production**
```env
NODE_ENV=production
```

2. **Use Strong JWT Secret**
```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

3. **Enable HTTPS**
- Use reverse proxy (nginx/Apache)
- Install SSL certificate (Let's Encrypt)

4. **Configure Firewall**
```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

5. **Use Process Manager**
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name school-portal

# Enable startup script
pm2 startup
pm2 save
```

6. **Setup Database Backups**
```bash
# Create backup script
mysqldump -u root -p school_portal > backup_$(date +%Y%m%d).sql
```

7. **Configure Logging**
- Set up application logging
- Monitor error logs
- Use log rotation

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Restart server
npm start

# Or with PM2
pm2 restart school-portal
```

## Uninstallation

```bash
# Stop server
# Press Ctrl+C or stop PM2 process

# Drop database
mysql -u root -p
DROP DATABASE school_portal;
exit;

# Remove application files
cd ..
rm -rf teacher-student-portal

# Uninstall global packages (optional)
npm uninstall -g pm2
```

## Support

For issues or questions:
- Check documentation in `/documentation` folder
- Review error logs
- Contact system administrator

## Next Steps

After successful installation:
1. Read the [User Manual](USER_MANUAL.md)
2. Change default admin password
3. Register teachers and students
4. Create classes
5. Assign teachers and enroll students
