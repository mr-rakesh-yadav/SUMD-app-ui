import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/authSlice";
import useAuth from "../hooks/useAuth";

const ProtectedDashboard: React.FC = () => {
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/signin");
  }, [dispatch, navigate]);

  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center min-w-fit">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Protected Dashboard
        </h1>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute right-2 top-1"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProtectedDashboard;
