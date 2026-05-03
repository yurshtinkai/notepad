# How to Install Firebase

You're seeing this error because Firebase isn't installed yet:
```
Error: The following dependencies are imported but could not be resolved:
  firebase/auth
  firebase/app
  firebase/firestore
```

## Solution: Install Firebase

### Option 1: Using the Batch File (Easiest)
1. Double-click `install-firebase.bat` in the `MODERN-NOTEPAD-FRONTEND` folder
2. Wait for installation to complete
3. Press any key to close
4. Run `npm run dev` again

### Option 2: Using Command Prompt
1. Open **Command Prompt** (not PowerShell)
2. Navigate to the frontend folder:
   ```cmd
   cd C:\Users\Admin\Desktop\Notepad-project\MODERN-NOTEPAD-FRONTEND
   ```
3. Install Firebase:
   ```cmd
   npm install firebase
   ```
4. Run the dev server:
   ```cmd
   npm run dev
   ```

### Option 3: Using PowerShell (if you enable it)
1. Open PowerShell as Administrator
2. Run this command to allow scripts:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Close and reopen PowerShell (normal, not admin)
4. Navigate to the frontend folder:
   ```powershell
   cd C:\Users\Admin\Desktop\Notepad-project\MODERN-NOTEPAD-FRONTEND
   ```
5. Install Firebase:
   ```powershell
   npm install firebase
   ```
6. Run the dev server:
   ```powershell
   npm run dev
   ```

## After Installation

Once Firebase is installed, you'll need to:

1. **Set up your Firebase project** (see `FIREBASE_SETUP.md`)
2. **Create a `.env` file** with your Firebase configuration
3. **Run the app**: `npm run dev`

## Verify Installation

After running the install command, you should see:
```
+ firebase@11.2.0
added 1 package
```

Then when you run `npm run dev`, the app should start without errors!

## Still Having Issues?

If you still see errors after installing Firebase:

1. **Check that Firebase is in package.json**:
   - Open `package.json`
   - Look for `"firebase"` in the `dependencies` section

2. **Try deleting node_modules and reinstalling**:
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   npm install firebase
   npm run dev
   ```

3. **Check Node.js version**:
   ```cmd
   node --version
   ```
   Should be v16 or higher

## Next Steps

After Firebase is installed and the dev server runs:
1. Follow `QUICK_START.md` to set up Firebase
2. Create your `.env` file
3. Test the application!
