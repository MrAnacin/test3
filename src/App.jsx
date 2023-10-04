import { Routes, Route } from 'react-router-dom';
import LeftMenu from './Components/leftmenu';
import S from './app.module.scss';

import HomePage from './Pages/homepage';
import Eror from './Pages/eror';
import Me from './Pages/me';
import User from './Pages/User';

function App() {
  return (
    <div className={S.root}>
      <LeftMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<Me />} />
        <Route path="user" element={<User />} />
        <Route path="*" element={<Eror />} />
      </Routes>
    </div>
  );
}

export default App;
