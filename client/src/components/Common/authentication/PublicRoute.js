import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ authenticated, element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) navigate('/');
  }, [authenticated]);
  return element;
};

export default PublicRoute;
