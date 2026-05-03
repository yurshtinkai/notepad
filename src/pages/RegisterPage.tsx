// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail, loginWithGoogle } from '../services/firebaseAuth';
import { useAuth } from '../hooks/useAuth';

// --- SVGs for Register Page ---
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const RegisterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const NoteLogo = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
// --- End of SVGs ---


const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerWithEmail(email.trim(), password);
      setUser(user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err?.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err?.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      const user = await loginWithGoogle();
      setUser(user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else if (err?.code === 'auth/popup-blocked') {
        setError('Pop-up blocked. Please allow pop-ups for this site.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Floating visuals */}
      <div className="floating-shapes" aria-hidden>
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
        <div className="shape shape-6" />
      </div>
      <div className="particles" aria-hidden>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <div className="auth-split-container">
        <section className="auth-left" aria-label="Marketing">
          <div className="main-logo" aria-hidden>
            <NoteLogo />
          </div>
          <h1 className="logo-title">Modern Notepad</h1>
          <p className="logo-subtitle">Secure note-taking made simple</p>

          <ul className="feature-list" aria-hidden>
            <li className="feature-item">
              <span className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>Auto-save your notes</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                </svg>
              </span>
              <span>Sync across devices</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span>End-to-end encryption</span>
            </li>
          </ul>
        </section>

        <main className="auth-right" aria-label="Register form">
          {/* This wrapper div centers and nudges the content */}
          <div className="auth-right-content">
            <div className="login-header">
              <h2 className="login-title">Create Account</h2>
              <p className="login-subtitle">Get started in seconds</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden>
                    <UserIcon />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden>
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a strong password (min 6 characters)"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden>
                    <LockIcon />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {error && <div className="error-message" role="alert">{error}</div>}

              <button type="submit" className="btn" disabled={isLoading} aria-disabled={isLoading}>
                {isLoading ? 'Creating Account...' : (
                  <>
                    <RegisterIcon />
                    <span>Sign Up</span>
                  </>
                )}
              </button>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '20px 0',
                gap: '12px'
              }}>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                <span style={{ color: '#64748b', fontSize: '14px' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              </div>

              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#1f2937',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: isGoogleLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                  opacity: isGoogleLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isGoogleLoading) {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {isGoogleLoading ? (
                  'Signing up...'
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with Google</span>
                  </>
                )}
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;