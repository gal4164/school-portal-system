# PostgreSQL Setup Guide for Windows

## ✅ What's Changed

The project now uses **PostgreSQL** instead of MySQL!

PostgreSQL is easier to install and more reliable on Windows.

---

## 📥 Step 1: Install PostgreSQL

### Option A: Download PostgreSQL Installer (Recommended)

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Choose the latest version (16.x)
   - Download the Windows x86-64 installer

2. **Run the Installer:**
   - Double-click the downloaded file
   - Click "Next" through the setup
   - **Important:** Remember the password you set for the `postgres` user!
   - Default port: 5432 (keep it)
   - Complete the installation

3. **Verify Installation:**
   - Open Command Prompt
   - Type: `psql --version`
   - You should see: `psql (PostgreSQL) 16.x`

---

## ⚙️ Step 2: Configure the Project

1. **Open `.env` file** (in the project folder)

2. **Update the password:**
   ```env
   DB_PASSWORD=your_postgres_password
   ```
   Replace `your_postgres_password` with the password you set during PostgreSQL installation.

3. **Save the file**

---

## 🗄️ Step 3: Setup Database

Open Command Prompt in the project folder and run:

```cmd
npm run setup
```

**Expected Output:**
```
Connected to PostgreSQL server
Database 'school_portal' created
Users table created
Classes table created
Teacher-Classes table created
Student-Classes table created
Messages table created
Announcements table created
Assignments table created
Submissions table created
Notifications table created
Default admin account created

✅ Database setup completed successfully!

Default Admin Credentials:
Email: admin@school.com
Password: Admin@123
```

---

## 🚀 Step 4: Start the Server

```cmd
npm start
```

**Expected Output:**
```
Server running on port 3001
Visit http://localhost:3001
```

---

## 🌐 Step 5: Open in Browser

1. Open your browser
2. Go to: `http://localhost:3001`
3. Click "Login"
4. Enter:
   - Email: `admin@school.com`
   - Password: `Admin@123`
5. You're in! 🎉

---

## 🔧 Troubleshooting

### Problem: "psql: command not found"

**Solution:**
- PostgreSQL is not in your PATH
- Add PostgreSQL to PATH:
  1. Search "Environment Variables" in Windows
  2. Click "Environment Variables"
  3. Under "System variables", find "Path"
  4. Click "Edit"
  5. Click "New"
  6. Add: `C:\Program Files\PostgreSQL\16\bin`
  7. Click OK
  8. Restart Command Prompt

### Problem: "password authentication failed"

**Solution:**
- Check the password in `.env` file
- Make sure it matches your PostgreSQL password
- Try resetting PostgreSQL password:
  ```cmd
  psql -U postgres
  ALTER USER postgres PASSWORD 'newpassword';
  ```

### Problem: "database already exists"

**Solution:**
- The setup script drops and recreates the database
- If you get errors, manually drop it:
  ```cmd
  psql -U postgres
  DROP DATABASE school_portal;
  \q
  ```
- Then run `npm run setup` again

### Problem: "port 5432 already in use"

**Solution:**
- Another PostgreSQL instance is running
- Stop it from Services (Windows + R → services.msc)
- Or change port in `.env`: `DB_PORT=5433`

### Problem: "Cannot connect to database"

**Solution:**
- Make sure PostgreSQL service is running
- Open Services (Windows + R → services.msc)
- Find "postgresql-x64-16"
- Right-click → Start

---

## 🎯 Quick Commands

### Check if PostgreSQL is running:
```cmd
pg_isready
```

### Connect to PostgreSQL:
```cmd
psql -U postgres
```

### List databases:
```sql
\l
```

### Connect to school_portal database:
```sql
\c school_portal
```

### List tables:
```sql
\dt
```

### View users:
```sql
SELECT * FROM users;
```

### Exit psql:
```sql
\q
```

---

## 📊 Database Management Tools

### pgAdmin (Recommended)

PostgreSQL comes with pgAdmin - a graphical interface:

1. Search "pgAdmin" in Windows Start Menu
2. Open pgAdmin 4
3. Enter your master password
4. Connect to PostgreSQL server
5. Browse databases visually

### Alternative: DBeaver

Free universal database tool:
- Download: https://dbeaver.io/download/
- Supports PostgreSQL and many other databases

---

## 🔐 Default Configuration

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres  # Change this!
DB_NAME=school_portal
DB_PORT=5432
```

---

## ✨ Advantages of PostgreSQL

- ✅ Easier to install on Windows
- ✅ Better performance
- ✅ More reliable
- ✅ Better error messages
- ✅ Built-in GUI (pgAdmin)
- ✅ Better support for modern features

---

## 🎓 Next Steps

After successful setup:

1. **Login as admin**
2. **Change admin password**
3. **Register teachers and students**
4. **Create classes**
5. **Test the system**

Read the **USER_MANUAL.md** for detailed instructions!

---

## 📞 Need Help?

- Check PostgreSQL logs: `C:\Program Files\PostgreSQL\16\data\log`
- Verify service is running: Services → postgresql-x64-16
- Test connection: `psql -U postgres -h localhost`

---

**You're all set! Enjoy your portal! 🚀**
