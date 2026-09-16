import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OtpModal from "./OtpModal";
import "../src/Auth.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setShowOtpModal(true);
  };

  const handleOtpVerified = async (otp) => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        "http://localhost:3000/api/user/password/reset-password",
        { otp, new_password: password },
        { withCredentials: true }
      );
      alert("Password reset successfully!");
      navigate("/sign-in");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/password/forgot-password",
        { email: state?.email },
        { withCredentials: true }
      );
    } catch (error) {
      alert(error.response?.data?.message || "Unable to resend OTP");
      throw error;
    }
  };

  if (showOtpModal) {
    return (
      <OtpModal
        onVerified={handleOtpVerified}
        onResend={handleResendOtp}
        isSubmitting={isSubmitting}
      />
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔒</div>
        <h1>Reset Password</h1>
        <p className="auth-description">
          Create a new password for your account.
        </p>

        <form onSubmit={handlePasswordSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Continue to OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;