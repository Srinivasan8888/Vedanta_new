import "./App.css";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
// import ThreeScene from "./Assets/components/Model/ThreeScene";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Analytics from "./pages/Analytics/Analytics";
import NoPage from "./pages/Nopage/Nopage";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./Assets/components/ProtectedRouter/ProtectedRouter";
import Heatmap from "./pages/Heatmap/Heatmap";
import Test from "./pages/Test";
import CollectorBar from "./pages/CollectorBar/CollectorBar";
// import helmet from "helmet";

// App.use(helmet());
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/admin_xyma_signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/CollectorBar" element={<CollectorBar />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Heatmap" element={<Heatmap />} />
            <Route path="/Test" element={<Test />} />
          </Route>

          {/* 404 route - should be last */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
