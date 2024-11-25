import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import success from "../../assets/images/success.png";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("00000");
  const [inputOTP, setInputOTP] = useState(Array(5).fill(""));
  const [expired, setExp] = useState(0);
  const [ivDefault, setIV] = useState("");
  const key = import.meta.env.VITE_AES_KEY;
  const steps = [
    <StepSendEmail
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onClick={() => callOTP()}
      loading={loading}
    />,
    <StepInputOTP
      loading={loading}
      reOTP={() => callOTP()}
      value={inputOTP}
      onClick={() => confirmOTP()}
      onChange={(e, index, refs) =>
        handleInputChange(e.target.value, index, refs)
      }
    />,
    <StepConfirm onClick={() => setStep(step + 1)} />,
    <StepSetPassword
      loading={loading}
      value={password}
      confirm={confirmPassword}
      onChange={(e) => setPassword(e.target.value)}
      onChangeConfirm={(e) => setConfirmPassword(e.target.value)}
      onClick={() => resetPassword()}
    />,
    <StepSuccess />,
  ];

  const decryptData = (ciphertext, ivBase64, keyBase64) => {
    try {
      // Chuyển đổi Key và IV từ Base64 sang WordArray
      const key = CryptoJS.enc.Base64.parse(keyBase64); // Key từ Base64
      const iv = CryptoJS.enc.Base64.parse(ivBase64); // IV từ Base64

      // Giải mã ciphertext
      const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });

      // Chuyển bytes thành chuỗi văn bản UTF-8
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(originalText);
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  const handleInputChange = (value, index, inputRefs) => {
    const updatedValues = [...inputOTP];
    updatedValues[index] = value.charAt(value.length - 1); // Cập nhật giá trị tại vị trí index
    setInputOTP(updatedValues); // Cập nhật state

    if (value !== "" && index < inputOTP.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const callOTP = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email ");
      return;
    }
    if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      toast.error("Email không đúng định dạng");
      return;
    }
    try {
      setLoading(true);
      let result = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/user/forget_password",
        {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      result = await result.json();

      if (result.status >= 400) {
        toast.error(result.body.message);
      } else {
        const { token, iv } = result.body.data;
        const { otp, exp } = decryptData(token, iv, key);
        setIV(iv);
        setOtp(otp);
        setExp(exp);
        if (step == 0) {
          setStep(step + 1);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmOTP = async () => {
    if (otp != inputOTP.join("")) {
      toast.error("OTP không chính xác");
      return;
    }
    try {
      setLoading(true);
      let result = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/user/check_otp",
        {
          method: "POST",
          body: JSON.stringify({
            otp: inputOTP.join(""),
            exp: expired,
            iv: ivDefault,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      result = await result.json();

      if (result.status >= 400) {
        toast.error(result.body.message);
      } else {
        setStep(step + 1);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async () => {
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }
    if (!confirmPassword) {
      toast.error("Vui lòng nhập xác nhận mật khẩu");
      return;
    }
    if (password != confirmPassword) {
      toast.error("Mật khẩu và mật khẩu xác nhận khác nhau");
      return;
    }
    try {
      setLoading(true);
      let result = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/user/reset_password",
        {
          method: "POST",
          body: JSON.stringify({
            otp: inputOTP.join(""),
            exp: expired,
            iv: ivDefault,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      result = await result.json();

      if (result.status >= 400) {
        toast.error(result.body.message);
      } else {
        setStep(step + 1);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center w-screen h-screen">
      <div className="shadow-md p-3 rounded-md max-w-96">{steps[step]}</div>
    </div>
  );
}

function StepSendEmail({ value, onChange, onClick, loading }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Forget password</h2>
      <span className="text-gray-400">
        Please enter your email to reset the password{" "}
      </span>
      <div className="flex gap-2 flex-col mt-2">
        <label className="text-xl font-bold">Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="border-gray-300 border-2 rounded-md px-3 py-2"
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button
        className="bg-[#4E55D7] text-white font-bold rounded-lg text-xl p-2"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </div>
  );
}

function StepInputOTP({ loading, reOTP, onClick, value, onChange }) {
  const inputRefs = useRef([]);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Check your email</h2>
      <div className="flex flex-col">
        <span className="text-gray-400">
          We sent a reset mail to lhqthanh1809@gmail.com
        </span>
        <span className="text-gray-400">
          Enter 5 digit code that mentioned in the email
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="number"
            maxLength="1"
            className="border-gray-300 border-2 rounded-xl p-3 w-16 h-16 font-bold text-4xl text-center block"
            value={value[index]}
            onChange={(e) => onChange(e, index, inputRefs)}
          />
        ))}
      </div>
      <button
        className="bg-[#4E55D7] text-white font-bold rounded-lg text-xl p-2"
        disabled={loading}
        onClick={onClick}
      >
        {loading ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </>
        ) : (
          "Verify Code"
        )}
      </button>

      <div className="flex gap-1 justify-center">
        <span className="text-gray-400">Haven't got the email yet?</span>
        <button className="text-[#4E55D7] underline" onClick={reOTP}>
          Resent email
        </button>
      </div>
    </div>
  );
}

function StepConfirm({ onClick }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Password reset</h2>
      <span className="text-gray-400">
        Your password had been successfully reset. Click confirm to set a new
        password
      </span>
      <button
        className="bg-[#4E55D7] text-white font-bold rounded-lg text-xl p-2"
        onClick={onClick}
      >
        Confirm
      </button>
    </div>
  );
}

function StepSetPassword({
  value,
  confirm,
  onChange,
  onChangeConfirm,
  loading,
  onClick,
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Set a new password</h2>
      <span className="text-gray-400">
        Create a new password. Ensure it differs from previous ones for security
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-col mt-2">
          <label className="text-xl font-bold">Password</label>
          <input
            value={value}
            type="password"
            placeholder="Enter your new password"
            className="border-gray-300 border-2 rounded-md px-3 py-2"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex gap-2 flex-col mt-2">
          <label className="text-xl font-bold">Confirm Password</label>
          <input
            value={confirm}
            type="password"
            placeholder="Re-enter password"
            className="border-gray-300 border-2 rounded-md px-3 py-2"
            onChange={(e) => onChangeConfirm(e)}
          />
        </div>
      </div>
      <button
        className="bg-[#4E55D7] text-white font-bold rounded-lg text-xl p-2 mt-4"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </>
        ) : (
          "Update Password"
        )}
      </button>
    </div>
  );
}

function StepSuccess() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <img src={success} className="w-32 h-32 object-cover" />
      <h2 className="text-2xl font-bold">Successful</h2>
      <span className="text-gray-400 text-xl text-center">
        Congratulation! Your password has been changed. Click continue to login
      </span>
      <Link
        to={"/"}
        className="bg-[#4E55D7] text-white font-bold rounded-lg text-xl p-2 mt-4 text-center w-full"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default ForgotPassword;
