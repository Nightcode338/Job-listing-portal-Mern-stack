import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import app from '../Firebase/firebase.config';

const SignUp = () => {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [user, setUser] = useState(null); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Handle Google Signup
  const handleGoogleSignup = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  // Handle Email/Password Signup
  const handleEmailPasswordSignup = (e) => {
    e.preventDefault(); // Prevent form submission reload
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 shadow-lg rounded-lg text-center w-96'>
        <h1 className='text-2xl font-bold mb-4'>Signup</h1>
        <p className='text-sm text-gray-500 mb-8'>Create your account with Google or your email</p>

        {/* Display loading indicator */}
        {loading && <p className='text-blue-500 mb-4'>Loading...</p>}

        {/* Display user info after signup */}
        {user && (
          <div className='mb-4'>
            <p className='text-green-500'>Welcome, {user.displayName || user.email}!</p>
          </div>
        )}

        {/* Display error message if there's an error */}
        {error && <p className='text-red-500 mb-4'>{error}</p>}

        {/* Email/Password Signup Form */}
        {!user && (
          <form onSubmit={handleEmailPasswordSignup} className='mb-4'>
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
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Signup with Email'}
            </button>
          </form>
        )}

        {/* Google Signup Button */}
        {!user && (
          <button 
          className='bg-blue-500 px-8 py-2 text-white rounded-sm hover:bg-blue-600 transition  justify-start gap-2 w-full'
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <FcGoogle className="text-2xl" /> {/* Google Icon */}
          <span className="flex-1 text-center"> {/* Ensures text is centered */}
            {loading ? 'Signing up...' : 'Signup with Google'}
          </span>
        </button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
