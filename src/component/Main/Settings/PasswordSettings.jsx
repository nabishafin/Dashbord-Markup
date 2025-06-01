import { useState } from "react";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetUserQuery,
  useChangePasswordMutation,
} from "../../../redux/features/profile/profileApi";
import { message } from "antd";
import { ImSpinner6 } from "react-icons/im";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// Moved outside the main component to avoid re-creation every render
const InputWithIcons = ({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => (
  <div className="flex flex-col gap-1 w-full max-w-md">
    <label className="text-neutral-600 font-semibold font-['Mulish']">
      {label}
    </label>
    <div className="relative w-full">
      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full pl-10 pr-10 py-3 border border-violet-400 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>
);

const PasswordSettings = () => {
  const { data } = useGetUserQuery();
  const user = data?.attributes?.user;

  const [showForm, setShowForm] = useState(false);

  // Manage visibility of each password input
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.oldPassword) {
      message.error("Please enter old password");
      return false;
    }
    if (!formData.newPassword) {
      message.error("Please enter new password");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      message.error("New password and confirm password do not match");
      return false;
    }
    return true;
  };

  const handleSavePassword = async () => {
    if (!validateForm()) return;

    try {
      const res = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (res?.data?.code === 200) {
        message.success(res.data.message || "Password updated successfully");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setShowForm(false);
        setShowOldPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else {
        message.error(res?.error?.data?.message || "Password update failed");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="h-[718px] p-10 bg-white flex flex-col items-start gap-8">
      <div className="w-28 flex flex-col items-start gap-5">
        <div className="text-neutral-400 text-base font-bold font-['Mulish']">
          Profile Picture
        </div>
        <img
          className="h-28 w-28 rounded-full object-cover"
          src={
            user?.image
              ? `${imageBaseUrl}${user.image}`
              : "/src/assets/user.png"
          }
          alt="Profile"
        />
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="self-stretch h-14 w-[500px] px-5 bg-violet-400 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.25)] text-white text-base font-bold font-['Mulish']"
        >
          Change Password
        </button>
      )}

      {showForm && (
        <div className="flex flex-col gap-6 w-full max-w-md">
          <InputWithIcons
            label="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            showPassword={showOldPassword}
            setShowPassword={setShowOldPassword}
          />

          <InputWithIcons
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
          />

          <InputWithIcons
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />

          <button
            onClick={handleSavePassword}
            disabled={isLoading}
            className="w-full h-14 bg-violet-400 text-white font-bold rounded disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {isLoading && <ImSpinner6 className="animate-spin" />}
            Save Password
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordSettings;
