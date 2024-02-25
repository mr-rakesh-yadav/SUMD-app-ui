import { PayloadAction } from '@reduxjs/toolkit';
import authReducer, { loginSuccess, logout, AuthState } from '../store/authSlice';

describe('authSlice', () => {
  describe('actions', () => {
    it('should create an action to log in', () => {
      const expectedAction = {
        type: loginSuccess.type,
        payload: 'mockToken',
      };
      expect(loginSuccess('mockToken')).toEqual(expectedAction);
    });

    it('should create an action to log out', () => {
      const expectedAction = {
        type: logout.type,
      };
      expect(logout()).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should handle login success', () => {
      const initialState: AuthState = {
        isAuthenticated: false,
        token: null,
      };
      const action: PayloadAction<string> = {
        type: loginSuccess.type,
        payload: 'mockToken',
      };
      const nextState = authReducer(initialState, action);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.token).toBe('mockToken');
    });
    it('should handle logout', () => {
        const initialState: AuthState = {
          isAuthenticated: true,
          token: 'mockToken',
        };
  
        const action: PayloadAction<void> = {
            type: logout.type,
            payload: undefined
        };
  
        const nextState = authReducer(initialState, action);
  
        expect(nextState.isAuthenticated).toBe(false);
        expect(nextState.token).toBe(null);
    });
  });
});
