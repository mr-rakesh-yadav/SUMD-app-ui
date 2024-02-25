import React, { useState, useEffect, useCallback } from 'react';

interface PopupProps {
  message: string;
  type: 'error' | 'warning' | 'success';
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const getBackgroundColor = useCallback(() => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }, [type]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${getBackgroundColor()} ${
        isVisible ? 'animate-fade-in' : 'animate-fade-out'
      }`}
    >
      {message}
    </div>
  );
};

export default Popup;
