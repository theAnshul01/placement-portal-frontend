import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()

    const handleStudentClick = () => {
        navigate("/student/dashboard")
    }
    const handleRecruiterClick = () => {
        navigate("/recruiter/dashboard")
    }
    const handleOfficerClick = () => {
        navigate("/officer/dashboard")
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">
                Dashboard
            </h2>
            <p className="text-gray-700">
                This page is protected.
            </p>
            <div className="buttons mt-2">
                <button className="mr-2 rounded-s-md rounded-e-md p-2 bg-red-300"
                    onClick={handleStudentClick}
                >Student</button>
                <button className="mr-2 rounded-s-md rounded-e-md p-2 bg-red-300"
                    onClick={handleRecruiterClick}
                >Recruiter</button>
                <button className="mr-2 rounded-s-md rounded-e-md p-2 bg-red-300"
                    onClick={handleOfficerClick}
                >Officer</button>
            </div>
        </div>
    );
};

export default Dashboard;
