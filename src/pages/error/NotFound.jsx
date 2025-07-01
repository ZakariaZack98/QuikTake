import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/")
  };

  return (
    <div className='w-screen h-screen flex flex-col gap-y-3 justify-center items-center'>
      <h1>404 Error: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleGoBack}>Go back to homepage</button>
    </div>
  );
};

export default NotFound;