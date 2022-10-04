import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ authenticated, element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!authenticated)
      navigate('/login', { state: { from: location.pathname } });
  }, [authenticated]);
  return element;
};

export default PrivateRoute;
