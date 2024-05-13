import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import photo from './download.jpeg'
// import './App.css'


const App = () => {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Routes>
                  <Route path="/studentdashboard" element={<StudentDashboard/>}/>
              </Routes>
              <img
                  src={photo}
                  style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) scale(3)',
                      zIndex: '-1', // Ensure the image is behind other content
                  }}
                  alt="logo"
              />

          </div>

      </Router>
  );
};

export default App;