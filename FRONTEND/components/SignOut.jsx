import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/sign-out",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/sign-in");
    }
  };

  return (
    <div className="root">
      <div className="modal">
        <div className="logout-card">
          <div className="logout-icon">↪</div>

          <h2>Logout</h2>

          <p>
            Are you sure you want to logout from your account?
          </p>

          <div className="logout-actions">
            <button
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;