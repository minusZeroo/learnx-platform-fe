import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
// import './App.css'


const App = () => {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/studentdashboard" element={<StudentDashboard />} />
              </Routes>

          </div>

      </Router>
  );
};

export default App;