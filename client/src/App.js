import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/main" element={<Main />} />
        <Route path="/studylist" element={<StudyList />} />
        <Route path="/makestudy" element={<MakeStudy />} />
        <Route path="/studylist/detail/:id" element={<StudyListDetail />} />
        <Route path="/studylist/modify/:d" element={<ModifyStudy />} />
        <Route path="/modifyuser" element={<ModifyUser />} />
        <Route path="/studyboard" element={<StudyBoard />} />
      </Routes>
    </div>
  );
}

export default App;
