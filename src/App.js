import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";


const App = () => {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/studentdashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;