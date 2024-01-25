import { FC } from 'react';
import './assets/index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Screens from './pages/screens';
import Screen from './pages/screen';
import Dashboard from './pages/dashborad';

const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/screens" element={<Screens />}>
          <Route path=":screenId" element={<Screen />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
