import './App.css';
import ThreeSceen from "./Assets/model/ThreeScene"
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoPage from './pages/Nopage/Nopage'; // Corrected casing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <ThreeSceen /> */}
      {/* <Login/> */}
      {/* <Signup/>
      <Dashboard /> */}

      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Model3D' element={<ThreeSceen />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;