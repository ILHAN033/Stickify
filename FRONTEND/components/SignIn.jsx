import { useState } from "react";
import axios from "axios";
import "../src/Auth.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/user/sign-in",
        formData,
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-modal">
        <div className="auth-card">

          <div className="auth-header">
            <h2>Welcome Back</h2>

            <p>
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <button
              type="button"
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Sign In
            </button>

          </form>

          <div className="auth-footer">
            <span  >Don't have an account?</span>

            <button type="button" onClick={()=>navigate('/sign-up')}>
             Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;