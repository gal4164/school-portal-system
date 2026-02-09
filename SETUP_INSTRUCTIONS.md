# Complete Setup Instructions for Windows

## Step 1: Install MySQL

### Option A: Download MySQL Installer (Recommended)
1. Go to: https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer
4. Choose "Developer Default" setup
5. Set a root password (remember this!)
6. Complete the installation

### Option B: Use XAMPP (Easier for beginners)
1. Go to: https://www.apachefriends.org/
2. Download XAMPP for Windows
3. Install XAMPP
4. Open XAMPP Control Panel
5. Start "MySQL" service
6. Default password is empty (no password)

## Step 2: Configure Environment File

Open the `.env` file in a text editor and update these lines:

```env
# If using MySQL directly:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=school_portal
DB_PORT=3306

# If using XAMPP:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=school_portal
DB_PORT=3306
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password!

## Step 3: Setup Database

Open Command Prompt in the project folder and run:

```cmd
npm run setup
```

This will:
- Create the database
- Create all tables
- Insert default admin account

## Step 4: Start the Server

```cmd
npm start
```

You should see:
```
Server running on port 3000
Visit http://localhost:3000
```

## Step 5: Access the Portal

1. Open your browser
2. Go to: http://localhost:3000
3. Click "Login"
4. Use these credentials:
   - Email: admin@school.com
   - Password: Admin@123

## Troubleshooting

### MySQL Not Found Error
- Make sure MySQL is installed
- Or use XAMPP and start MySQL service
- Add MySQL to your PATH environment variable

### Can't Connect to Database
- Check MySQL is running
- Verify password in `.env` file
- Try connecting with MySQL Workbench first

### Port 3000 Already in Use
- Change PORT=3001 in `.env` file
- Or stop the application using port 3000

## Quick Test Without MySQL

If you want to test the frontend without database:

1. Comment out database calls in `server.js`
2. Run: `npm start`
3. Visit: http://localhost:3000

The home page will work, but login won't work without database.

## Next Steps After Setup

1. Login as admin
2. Change admin password
3. Register teachers
4. Register students
5. Create classes
6. Assign teachers to classes
7. Enroll students in classes

## Need Help?

Check the documentation folder for:
- USER_MANUAL.md - How to use the system
- INSTALLATION_GUIDE.md - Detailed installation
- API_DOCUMENTATION.md - API reference
