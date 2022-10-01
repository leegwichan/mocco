import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) navigate('/login', { from: location.pathname });
  }, []);
  return element;
};

export default PrivateRoute;
