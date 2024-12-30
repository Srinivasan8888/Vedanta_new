import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThreeSceen from "./Assets/model/ThreeScene";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Analytics from "./pages/Analytics/Analytics";
import NoPage from "./pages/Nopage/Nopage";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./Assets/components/ProtectedRouter/ProtectedRouter";
import DataScience from "./Assets/components/DataScience/DataScience";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/admin_xyma_signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Model3D" element={<ThreeSceen />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/DataScience" element={<DataScience />} />
            <Route path="/Test" element={<Test />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
