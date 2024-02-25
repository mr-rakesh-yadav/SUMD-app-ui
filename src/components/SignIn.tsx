import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Popup from './Popup';
import FormInput from './FormInput';
import { authService } from '../services/reqresService';
import { loginSuccess } from '../store/authSlice';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const { token } = await authService.login(email, password);

      dispatch(loginSuccess(token));

      console.log('Login successful', token);
      setPopup({ message: 'Login successful', type: 'success' });
      navigate('/protected')
    } catch (error) {
      setPopup({ message: 'Login failed. Please check your credentials and try again.', type: 'error' });
    }
  }, [dispatch, email, navigate, password]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <FormInput label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <Link to="/signup" className="text-gray-500 hover:text-gray-700">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
      {popup ? <Popup message={popup.message} type={popup.type} onClose={closePopup} /> : null}

    </div>
  );
};

export default SignIn;
