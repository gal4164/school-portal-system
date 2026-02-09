# 🚀 Easy Setup Guide - 5 Minutes!

## ✅ What's Already Done
- ✅ Project files created
- ✅ Dependencies installed (npm packages)
- ✅ Environment file configured
- ✅ Port set to 3001

## ❌ What You Need to Do

### 🔴 STEP 1: Install MySQL Database

You have **2 options**. Choose the easier one:

#### Option A: XAMPP (Recommended for Beginners) ⭐

1. **Download XAMPP:**
   ```
   https://www.apachefriends.org/download.html
   ```
   - Click "Download" for Windows
   - File size: ~150MB

2. **Install XAMPP:**
   - Run the downloaded file
   - Click "Next" through the installer
   - Install to default location: `C:\xampp`

3. **Start MySQL:**
   - Open "XAMPP Control Panel" (search in Windows)
   - Click "Start" button next to "MySQL"
   - MySQL should turn green ✅

4. **Configure Password:**
   - Open `.env` file (in project folder)
   - Find line: `DB_PASSWORD=your_password`
   - Change to: `DB_PASSWORD=` (leave it empty)
   - Save the file

#### Option B: MySQL Directly

1. **Download MySQL:**
   ```
   https://dev.mysql.com/downloads/installer/
   ```
   - Choose "Windows (x86, 32-bit), MSI Installer"

2. **Install MySQL:**
   - Run installer
   - Choose "Developer Default"
   - Set a root password (remember it!)
   - Complete installation

3. **Configure Password:**
   - Open `.env` file
   - Find: `DB_PASSWORD=your_password`
   - Change to: `DB_PASSWORD=YourActualPassword`
   - Save the file

---

### 🟡 STEP 2: Setup Database

Open **Command Prompt** in the project folder:

1. Press `Windows Key + R`
2. Type: `cmd`
3. Press Enter
4. Navigate to project folder:
   ```cmd
   cd "C:\Users\hp\Desktop\Teacher–Student Communication Portal"
   ```

5. Run setup command:
   ```cmd
   npm run setup
   ```

**Expected Output:**
```
Connected to MySQL server
Database created
Users table created
Classes table created
...
✅ Database setup completed successfully!

Default Admin Credentials:
Email: admin@school.com
Password: Admin@123
```

---

### 🟢 STEP 3: Start the Server

In the same Command Prompt, run:

```cmd
npm start
```

**Expected Output:**
```
Server running on port 3001
Visit http://localhost:3001
```

**Keep this window open!** Don't close it.

---

### 🔵 STEP 4: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge)
2. Go to: `http://localhost:3001`
3. You should see the School Portal home page! 🎉

---

### 🟣 STEP 5: Login

1. Click the "Login" button
2. Enter:
   - **Email:** `admin@school.com`
   - **Password:** `Admin@123`
3. Click "Login"
4. You're in! 🎊

---

## 🎯 What to Do After Login

### First Time Setup:

1. **Change Admin Password:**
   - Click your name (top right)
   - Go to Settings
   - Change password

2. **Register a Teacher:**
   - Click "Teachers" in sidebar
   - Click "Register Teacher"
   - Fill in details:
     - Email: teacher@school.com
     - Password: Teacher@123
     - First Name: John
     - Last Name: Smith
   - Click Submit

3. **Register a Student:**
   - Click "Students" in sidebar
   - Click "Register Student"
   - Fill in details:
     - Email: student@school.com
     - Password: Student@123
     - First Name: Alice
     - Last Name: Johnson
   - Click Submit

4. **Create a Class:**
   - Click "Classes" in sidebar
   - Click "Create Class"
   - Fill in:
     - Name: Mathematics 10A
     - Grade Level: 10th Grade
     - Section: A
     - Academic Year: 2024-2025
   - Click Submit

5. **Assign Teacher to Class:**
   - Go to "Classes"
   - Click "Assign Teacher"
   - Select teacher and class
   - Enter subject: Mathematics
   - Click Assign

6. **Enroll Student in Class:**
   - Go to "Classes"
   - Click "Enroll Student"
   - Select student and class
   - Click Enroll

---

## 🧪 Test the System

### Test as Teacher:

1. Logout (top right)
2. Login with:
   - Email: teacher@school.com
   - Password: Teacher@123
3. Explore teacher dashboard
4. Try sending a message to student
5. Create an assignment

### Test as Student:

1. Logout
2. Login with:
   - Email: student@school.com
   - Password: Student@123
3. View assignments
4. Send message to teacher
5. Submit an assignment

---

## ❓ Troubleshooting

### Problem: "Cannot connect to database"

**Solution:**
- Make sure MySQL is running (XAMPP Control Panel shows green)
- Check `.env` file has correct password
- Try restarting MySQL in XAMPP

### Problem: "Port 3001 already in use"

**Solution:**
- Open `.env` file
- Change `PORT=3001` to `PORT=3002`
- Restart server
- Go to `http://localhost:3002`

### Problem: "npm run setup" fails

**Solution:**
- Make sure MySQL is running
- Check MySQL credentials in `.env`
- Try running XAMPP as Administrator

### Problem: Can't see the website

**Solution:**
- Make sure server is running (don't close Command Prompt)
- Check you're using correct port: `http://localhost:3001`
- Try different browser

### Problem: Login doesn't work

**Solution:**
- Make sure you ran `npm run setup`
- Check database was created successfully
- Clear browser cookies
- Try default credentials again

---

## 📚 More Help

- **Full Documentation:** See `documentation/` folder
- **User Manual:** `documentation/USER_MANUAL.md`
- **API Docs:** `documentation/API_DOCUMENTATION.md`
- **Installation Guide:** `documentation/INSTALLATION_GUIDE.md`

---

## 🎉 You're All Set!

Once you complete these steps, you'll have a fully functional school communication portal!

**Features you can use:**
- ✅ User management (Admin, Teachers, Students)
- ✅ Private messaging
- ✅ Group messaging
- ✅ Announcements
- ✅ Assignment creation and submission
- ✅ File uploads
- ✅ Notifications
- ✅ Responsive design (works on mobile)

**Enjoy your new portal!** 🚀
