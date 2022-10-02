import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from './atom/atom';
import PrivateRoute from './components/Common/Authentication/PrivateRoute';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import StudyList from './pages/StudyList';
import MakeStudy from './pages/MakeStudy';
import StudyListDetail from './pages/StudyListDetail';
import ModifyStudy from './pages/ModifyStudy';
import ModifyUser from './pages/ModifyUser';
import FindPassword from './pages/FindPassword';
import StudyBoard from './pages/StudyBoard';
import Header from './components/Common/Header/Header';
import Callback from './pages/Callback';

function App() {
  const authenticated = !!useRecoilValue(userInfoState);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/makestudy"
          element={
            <PrivateRoute
              authenticated={authenticated}
              element={<MakeStudy />}
            />
          }
        />
        {!authenticated && <Route path="/login" element={<LogIn />} />}
        {!authenticated && <Route path="/signup" element={<SignUp />} />}
        {/* <Route path="/login" element={<LogIn />} /> */}
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/studylist" element={<StudyList />} />
        {/* <Route path="/makestudy" element={<MakeStudy />} /> */}
        <Route path="/studylist/detail/:id" element={<StudyListDetail />} />
        <Route path="/studylist/modify/:id" element={<ModifyStudy />} />
        <Route path="/modifyuser" element={<ModifyUser />} />
        <Route path="/studyboard/:studyId/:memberId" element={<StudyBoard />} />
        <Route path="/oauthcallback" exact={true} element={<Callback />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
