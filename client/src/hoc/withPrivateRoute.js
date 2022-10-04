import { useRecoilValue } from 'recoil';
import { useLocation, Navigate } from 'react-router-dom';
import { userInfoState } from '../atom/atom';

function withPrivateRoute(Element) {
  const Component = (props) => {
    const authenticated = !!useRecoilValue(userInfoState);
    const location = useLocation();
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location.pathname }} />;
    }
    return <Element {...props} />;
  };
  return Component;
}

export default withPrivateRoute;
