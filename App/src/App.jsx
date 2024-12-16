import './App.css';
import ThreeSceen from "./Assets/model/ThreeScene"
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Analytics from './pages/Analytics/Analytics';
import NoPage from './pages/Nopage/Nopage'; // Corrected casing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Report from './pages/Report/Report';
import Settings from './pages/Settings/Settings';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/admin_xyma_signup' element={<Signup />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Model3D' element={<ThreeSceen />} />
          <Route path='/Analytics' element={<Analytics />} />
          <Route path='/Report' element={<Report />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;