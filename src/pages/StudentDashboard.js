import {Link} from "react-router-dom";
import './studentDashboard.css';

const StudentDashboard = () =>{
    return (
        <div className="dashboard-container">
            <h2>Student Dashboard</h2>
            <div>
                <ul>
                    <li>
                        <Link to="studentdashboard">Self-study lessons</Link>
                    </li>
                    <li>
                        <Link to="studentdashboard">Attempt a test</Link>
                    </li>
                    <li>
                        <Link to="studentdashboard">Book a Tutorial</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default StudentDashboard;