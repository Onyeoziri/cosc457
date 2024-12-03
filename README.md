# Guide: Installing `pnpm`, Cloning a Git Repository, Creating a New Branch, and Making Your First Commit

## 1. Installing `pnpm`
`pnpm` is a fast, disk-space-efficient package manager. Follow these steps to install it:

1. **Install Node.js**:  
   Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

2. **Install pnpm using npm:**
Alternatively, you can use npm to install pnpm globally:
   ```bash
   npm install -g pnpm


   Check if pnpm is installed:
   pnpm --version


# How to Clone a Git Repository, Create a New Branch, Make the First Commit, and Push It

## 1. Clone a Git Repository
To clone a repository from GitHub (or any Git server), use the following command:
```bash
   git clone <repository-url>
   ```

## 2. Navigate to the Cloned Repository
   ```bash
   cd repo-name
   ```
## 3. Create a New Branch
   ```bash
   git checkout -b <branch-name>
   ```
   For example:
   ```bash
   git checkout -b feature/new-feature
   ```
## 4. Make Changes
   Edit or create files in the repository as needed.
## 5. Stage the Changes
   ```bash
   git add <file-name>
   ```
   To add all changes:
   ```bash
   git add .
   ```
## 6. Commit the Changes
   ```bash
   git commit -m "Initial commit on new branch"
   ```
## 7. Push the New Branch to the Remote Repository
   ```bash
   git push origin <branch-name>
   ```
   For example:
   ```bash
   git push origin feature/new-feature
   ```
