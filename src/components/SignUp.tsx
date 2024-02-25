import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Popup from './Popup';
import FormInput from './FormInput';
import { authService } from '../services/reqresService';
import { loginSuccess } from '../store/authSlice';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSignUp = useCallback(async () => {
    try {
      const token = await authService.signup(email, password);
      setPopup({ message: 'Sign Up successful', type: 'success' });
      dispatch(loginSuccess(token));
      navigate('/signin');
    } catch (error) {
      setPopup({ message: 'Sign Up failed. Please check your details and try again.', type: 'error' });
    }
  }, [dispatch, email, navigate, password]);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <FormInput
          label="Email"
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
      {popup ? <Popup message={popup.message} type={popup.type} onClose={closePopup} /> : null}
    </div>
  );
};

export default SignUp;
