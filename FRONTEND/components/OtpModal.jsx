
import { useEffect, useRef, useState } from "react";

const OtpModal = ({ onVerified, onResend, isSubmitting = false }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);

  const inputRefs = useRef([]);

  const otpMerge = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer === 0) return undefined;

    const timeout = setTimeout(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }

    onVerified(enteredOtp);
  };

  const handleResend = async () => {
    await onResend();
    setOtp(["", "", "", "", "", ""]);
    setTimer(45);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="root">
      <div className="modal">
          <div className="otp">
            <h2>Verify OTP</h2>

            <p className="description">
              Enter the 6-digit code sent to you
            </p>

            <p className="timer">
              Time Left: <span>{timer}s</span>
            </p>

            <div className="otp-fields">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  className="field"
                  maxLength={1}
                  inputMode="numeric"
                  autoFocus={index === 0}
                  value={digit}
                  onChange={(e) =>
                    otpMerge(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                />
              ))}
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Verify OTP"}
            </button>

            <button
              className="resend-btn"
              onClick={handleResend}
              disabled={isSubmitting || timer > 0}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
      </div>
    </div>
  );
};

export default OtpModal;

