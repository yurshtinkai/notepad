# Modern Notepad - Firebase Edition

A modern, secure note-taking application built with React, TypeScript, and Firebase.

## Features

- 🔐 **Secure Authentication** - Email/Password and Google Sign-In
- 📝 **Rich Note Editor** - Create and edit notes with auto-save
- 🔄 **Real-time Sync** - Your notes sync across all devices
- 📦 **Archive System** - Archive old notes and restore them later
- 🎨 **Beautiful UI** - Modern, responsive design
- 🔒 **Privacy First** - Your notes are private and secure

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Firebase (Serverless)
  - Authentication (Email/Password + Google)
  - Firestore Database
- **Styling**: Custom CSS with modern animations

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication (Email/Password and Google)
- Set up Firestore Database
- Configure security rules
- Get your Firebase configuration

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/       # React components
│   ├── common/      # Shared components
│   ├── notes/       # Note-related components
│   └── profile/     # Profile modal
├── config/          # Firebase configuration
├── contexts/        # React contexts (Auth)
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # Firebase services
│   ├── firebaseAuth.ts    # Authentication
│   └── firebaseNotes.ts   # Notes CRUD
├── styles/          # CSS files
├── types.ts         # TypeScript types
└── App.tsx          # Main app component
```

## Authentication

The app supports two authentication methods:

1. **Email/Password** - Traditional sign-up and login
2. **Google Sign-In** - One-click authentication with Google account

## Security

- All notes are stored in Firestore with user-specific access rules
- Only authenticated users can access their own notes
- Passwords are managed securely by Firebase Authentication
- Firestore security rules prevent unauthorized access

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
