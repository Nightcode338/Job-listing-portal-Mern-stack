import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'; // Google icon from react-icons

const Login = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [user, setUser] = useState(null); // User state
  const [email, setEmail] = useState(''); // Email state for input
  const [password, setPassword] = useState(''); // Password state for input

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Handle Google Login
  const handleGoogleLogin = () => {
    setLoading(true); // Start loading
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user); // Store user info
        setLoading(false); // Stop loading
        setError(''); // Reset error state
      })
      .catch((error) => {
        setLoading(false); // Stop loading on error
        setError(error.message); // Set error message
      });
  };

  // Handle Email/Password Login
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault(); // Prevent form submission reload
    setLoading(true); // Start loading
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user); // Store user info
        setLoading(false); // Stop loading
        setError(''); // Reset error state
      })
      .catch((error) => {
        setLoading(false); // Stop loading on error
        setError(error.message); // Set error message
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 shadow-lg rounded-lg text-center w-96'>
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        <p className='text-sm text-gray-500 mb-8'>Sign in with your Google account or use your email and password</p>

        {/* Display loading indicator */}
        {loading && <p className='text-blue-500 mb-4'>Loading...</p>}

        {/* Display user info after login */}
        {user && (
          <div className='mb-4'>
            <p className='text-green-500'>Welcome, {user.displayName || user.email}!</p>
          </div>
        )}

        {/* Display error message if there’s an error */}
        {error && <p className='text-red-500 mb-4'>{error}</p>}

        {/* Email/Password Login Form */}
        {!user && (
          <form onSubmit={handleEmailPasswordLogin} className='mb-4'>
            <input 
              type="email" 
              placeholder="Email" 
              className="border border-gray-300 p-2 w-full mb-4 rounded-md" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="border border-gray-300 p-2 w-full mb-4 rounded-md" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              className='bg-green-500 px-8 py-2 text-white rounded-sm hover:bg-green-600 transition w-full'
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login with Email'}
            </button>
          </form>
        )}

        {/* Google Login Button */}
        {!user && (
          <button 
            className='bg-blue-500 px-8 py-2 text-white rounded-sm hover:bg-blue-600 transition flex items-center justify-center gap-2 w-full'
            onClick={handleGoogleLogin}
            disabled={loading} // Disable button while loading
          >
            <FcGoogle className="text-2xl" /> {/* Google Icon */}
            {loading ? 'Logging in...' : 'Login with Google'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
