import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(code);
    if (!stored) {
      alert('Invalid or expired short URL.');
      navigate('/');
      return;
    }

    const { longUrl, expiry } = JSON.parse(stored);
    if (expiry && Date.now() > expiry) {
      alert('This link has expired.');
      navigate('/');
      return;
    }

    window.location.href = longUrl;
  }, [code, navigate]);

  return null;
};

export default RedirectHandler;
