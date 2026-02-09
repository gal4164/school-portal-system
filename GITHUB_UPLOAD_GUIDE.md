# How to Upload Your School Portal to GitHub

## ✅ Steps Already Completed

1. ✅ Git is installed on your computer
2. ✅ Git repository initialized
3. ✅ All files added to Git
4. ✅ Initial commit created

## 📋 Next Steps to Upload to GitHub

### Step 1: Create a GitHub Account (if you don't have one)

1. Go to [https://github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process

### Step 2: Create a New Repository on GitHub

1. Log in to your GitHub account
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `school-portal-system` (or any name you prefer)
   - **Description**: "School Portal System with messaging, announcements, assignments, and role-based UI"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize this repository with a README" (we already have files)
5. Click **"Create repository"**

### Step 3: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

#### Option A: If you see the commands on GitHub, copy them

GitHub will show something like:
```bash
git remote add origin https://github.com/YOUR-USERNAME/school-portal-system.git
git branch -M main
git push -u origin main
```

#### Option B: Manual Commands

Replace `YOUR-USERNAME` and `REPOSITORY-NAME` with your actual GitHub username and repository name:

```bash
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 4: Enter Your GitHub Credentials

When you run `git push`, you'll be asked for credentials:

- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

#### How to Create a Personal Access Token:

1. Go to GitHub → Click your profile picture → **Settings**
2. Scroll down and click **Developer settings** (left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name: "School Portal Upload"
6. Select expiration: Choose your preference
7. Check the **repo** checkbox (this gives full repository access)
8. Scroll down and click **Generate token**
9. **IMPORTANT**: Copy the token immediately (you won't see it again!)
10. Use this token as your password when pushing to GitHub

### Step 5: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded!

## 🔄 Future Updates

After the initial upload, when you make changes:

```bash
# Check what files changed
git status

# Add all changed files
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## 📝 Quick Reference Commands

```bash
# Check repository status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes from GitHub
git pull

# View commit history
git log

# View remote repository URL
git remote -v
```

## ⚠️ Important Notes

1. **Never commit sensitive data**: The `.env` file is already in `.gitignore`, so your secrets are safe
2. **Database file**: The `school_portal.db` file is included. Consider adding it to `.gitignore` if it contains sensitive data
3. **Node modules**: Already excluded via `.gitignore` (good!)
4. **Uploads folder**: Only the `.gitkeep` file is tracked, not the actual uploads

## 🆘 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Authentication Failed
- Make sure you're using a Personal Access Token, not your password
- Check that the token has the correct permissions (repo access)

## 🎉 Success!

Once uploaded, you can:
- Share your repository URL with others
- Collaborate with team members
- Track changes and version history
- Deploy your project from GitHub

Your repository URL will be:
`https://github.com/YOUR-USERNAME/REPOSITORY-NAME`

---

**Need help?** Feel free to ask if you encounter any issues during the upload process!
