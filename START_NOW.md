# 🎯 START HERE - PostgreSQL Version

## ✅ What's Ready

- ✅ PostgreSQL package installed
- ✅ Database configuration updated
- ✅ Setup script ready
- ✅ Core features converted
- ✅ Environment configured

## 🔴 What You Need

**Install PostgreSQL** - That's it!

## 📥 Install PostgreSQL (5 Minutes)

### Windows Installation:

1. **Download:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Choose latest version (16.x)
   - Download Windows x86-64

2. **Install:**
   - Run the downloaded file
   - Click "Next" through setup
   - **IMPORTANT:** Set a password for postgres user
   - Write it down! You'll need it!
   - Port: 5432 (default - keep it)
   - Finish installation

3. **Verify:**
   - Open Command Prompt
   - Type: `psql --version`
   - Should show: `psql (PostgreSQL) 16.x`

## ⚙️ Configure (1 Minute)

1. Open `.env` file in notepad
2. Find this line:
   ```
   DB_PASSWORD=postgres
   ```
3. Change `postgres` to your actual password
4. Save the file

## 🗄️ Setup Database (1 Minute)

Open Command Prompt in project folder:

```cmd
npm run setup
```

**You should see:**
```
Connected to PostgreSQL server
Database 'school_portal' created
Users table created
Classes table created
...
✅ Database setup completed successfully!

Default Admin Credentials:
Email: admin@school.com
Password: Admin@123
```

## 🚀 Start Server (30 Seconds)

```cmd
npm start
```

**You should see:**
```
Server running on port 3001
Visit http://localhost:3001
```

## 🌐 Open & Login (30 Seconds)

1. Open browser
2. Go to: **http://localhost:3001**
3. Click "Login"
4. Enter:
   - Email: `admin@school.com`
   - Password: `Admin@123`
5. **You're in!** 🎉

## 🎯 Test It Out

After login, try these:

1. **View Dashboard** - See system statistics
2. **Register Teacher:**
   - Click "Teachers"
   - Click "Register Teacher"
   - Fill in details
   - Submit

3. **Register Student:**
   - Click "Students"
   - Click "Register Student"
   - Fill in details
   - Submit

4. **Create Class:**
   - Click "Classes"
   - Click "Create Class"
   - Enter: "Mathematics 10A"
   - Submit

## ❓ Troubleshooting

### "psql: command not found"
- PostgreSQL not installed or not in PATH
- Reinstall PostgreSQL
- Or add to PATH: `C:\Program Files\PostgreSQL\16\bin`

### "password authentication failed"
- Wrong password in `.env` file
- Check your PostgreSQL password
- Update `.env` file

### "Cannot connect to database"
- PostgreSQL service not running
- Open Services (Windows + R → services.msc)
- Find "postgresql-x64-16"
- Right-click → Start

### "Port 3001 already in use"
- Change port in `.env`: `PORT=3002`
- Restart server
- Go to http://localhost:3002

## 📚 More Help

- **Full Guide:** `POSTGRESQL_SETUP.md`
- **User Manual:** `documentation/USER_MANUAL.md`
- **Conversion Info:** `CONVERSION_COMPLETE.md`

## 🎊 That's It!

**Total Time: ~7 minutes**

1. Install PostgreSQL (5 min)
2. Configure password (1 min)
3. Run setup (1 min)
4. Start & login (30 sec)

**Enjoy your portal!** 🚀

---

## 💡 Quick Tips

- Keep Command Prompt open while server runs
- Use Chrome for best compatibility
- Change admin password after first login
- Read USER_MANUAL.md to learn all features

## 🔗 Important Links

- PostgreSQL Download: https://www.postgresql.org/download/windows/
- Project runs on: http://localhost:3001
- Admin email: admin@school.com
- Admin password: Admin@123

**Ready? Let's go!** 🎯
