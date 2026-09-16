import { useState } from "react";
import "../src/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
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

    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/sign-up",
        formData,
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-modal">
        <div className="auth-card">

          <div className="auth-header">
            <h2>Create Account</h2>

            <p>
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

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
                pattern={emailPattern.source}
                title="Enter a valid email address"
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
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

            <button
              type="submit"
              className="auth-btn"
            >
              Create Account
            </button>

          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>

            <button type="button" onClick={()=>navigate("/sign-in")} >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;