import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import DashBoard from "./Components/DashBoard";
// import Test from "./Components/Test";
import Banking from "./Components/Banking";
// import Registration from "./Components/Registration";
import AuthPage from "./Components/AuthPage";
import UserContext from "./UserContext";
import { useState } from "react";

function App() {
  const [uid, setUid] = useState("");
  return (
    <UserContext.Provider value={{ uid, setUid }}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/:test" element={<Banking />} />
          {/* <Route path="/hi" element={<Test />} />
        <Route path="/register" element={<Registration />} /> */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
