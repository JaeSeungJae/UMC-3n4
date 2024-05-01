import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading.jsx'

function LocationAwareComponent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();
  }, [location]);

  return loading ? <Loading /> : null;
}

export default LocationAwareComponent
