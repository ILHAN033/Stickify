import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/Auth.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        "http://localhost:3000/api/user/password/forgot-password",
        { email },
        { withCredentials: true }
      );
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      alert(error.response?.data?.message || "Unable to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>Forgot Password?</h1>

        <p className="auth-description">
          We'll send an OTP to your account email
          to reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your account email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              pattern={emailPattern.source}
              title="Enter a valid email address"
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>

        </form>

        <button
          className="back-btn"
          onClick={() => navigate("/sign-in")}
        >
          ← Back to Sign In
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;