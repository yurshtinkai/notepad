# Firebase Setup Guide for Modern Notepad

This application now uses Firebase as a serverless backend. Follow these steps to set up your Firebase project.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "modern-notepad")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## Step 2: Enable Authentication

1. In your Firebase project, go to **Build** > **Authentication**
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and provide a support email

## Step 3: Create Firestore Database

1. Go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (we'll set up rules next)
4. Select a location closest to your users
5. Click "Enable"

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Notes collection - users can only access their own notes
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Archived notes collection - users can only access their own archived notes
    match /archived_notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click "Publish"

## Step 5: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Modern Notepad Web")
6. Copy the Firebase configuration object

## Step 6: Configure Your Application

1. In the `MODERN-NOTEPAD-FRONTEND` folder, create a `.env` file
2. Copy the contents from `.env.example`
3. Fill in your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 7: Install Dependencies and Run

1. Open a terminal in the `MODERN-NOTEPAD-FRONTEND` folder
2. Install Firebase:
   ```bash
   npm install firebase
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

✅ **Email/Password Authentication** - Users can sign up with email and password
✅ **Google Sign-In** - One-click authentication with Google
✅ **Secure Notes Storage** - All notes are stored in Firestore with user-specific access
✅ **Real-time Sync** - Notes sync across devices automatically
✅ **Archive System** - Move notes to archive and restore them later
✅ **Password Management** - Users can change their password securely

## Firestore Data Structure

### Notes Collection (`notes`)
```javascript
{
  userId: string,          // Firebase Auth UID
  title: string,
  content: string,
  reminderDatetime: string | null,
  reminderSent: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Archived Notes Collection (`archived_notes`)
```javascript
{
  userId: string,          // Firebase Auth UID
  title: string,
  content: string,
  createdAt: timestamp,
  archivedAt: timestamp
}
```

## Troubleshooting

### "Firebase: Error (auth/popup-blocked)"
- Allow pop-ups for your application domain in your browser settings

### "Missing or insufficient permissions"
- Check that your Firestore security rules are properly configured
- Ensure the user is authenticated before accessing Firestore

### "Firebase: Error (auth/invalid-api-key)"
- Verify that your `.env` file has the correct Firebase configuration
- Make sure all environment variables start with `VITE_`

## Production Deployment

When deploying to production:

1. Update Firestore rules if needed for production environment
2. Add your production domain to Firebase Authentication's authorized domains:
   - Go to Authentication > Settings > Authorized domains
   - Add your production domain
3. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
4. Build your application: `npm run build`

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
