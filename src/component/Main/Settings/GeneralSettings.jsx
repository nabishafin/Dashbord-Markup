import { useState, useEffect } from "react";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDispatch } from "react-redux";
import { updateUser as updateUserAction } from "../../../redux/features/auth/authSlice";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";

const GeneralSettings = () => {
  const { data, refetch, isFetching } = useGetUserQuery();
  const user = data?.attributes?.user;

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    imageFile: null,
    imagePreview: null,
  });

  const [error, setError] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      imageFile: null,
      imagePreview: null,
    });
    setError("");
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const validate = () => {
    if (!formData.fullName.trim()) {
      setError("Full Name is required.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

      const updatedResponse = await updateUser(payload).unwrap();

      // Extract user attributes correctly
      const updatedUser = updatedResponse?.attributes?.user;
      console.log("Updated User:", updatedUser);

      dispatch(updateUserAction({ user: updatedUser }));

      setIsEditing(false);
      refetch();
    } catch (e) {
      setError("Failed to update profile. Please try again.");
      console.error(e);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="h-[718px] p-10 bg-white inline-flex justify-start items-start gap-2.5">
      <div className="w-[507px] inline-flex flex-col justify-start items-start gap-8">
        {/* Profile Picture */}
        <div className="w-28 flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-neutral-400 text-base font-bold font-['Mulish']">
            Profile Picture
          </div>
          <img
            className="self-stretch h-28 rounded-full object-cover"
            src={
              formData.imagePreview
                ? formData.imagePreview
                : user?.image
                ? `${imageBaseUrl}${user.image}`
                : "/src/assets/user.png"
            }
            alt="Profile"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          )}
        </div>

        {/* User Name */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            User Name
          </div>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 text-base font-bold font-['Mulish'] focus:outline-none"
            />
          ) : (
            <div
              data-property-1="Variant4"
              className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
            >
              <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
                {user?.fullName}
              </div>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            Email
          </div>
          
            <div
              data-property-1="Variant4"
              className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
            >
              <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
                {user?.email}
              </div>
            </div>
          
        </div>

        {/* Phone Number */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            Phone Number
          </div>
          
            <div
              data-property-1="Variant4"
              className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
            >
              <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
                {user?.phoneNumber || "Not Provided"}
              </div>
            </div>
         
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm font-semibold mt-2">{error}</div>
        )}

        {/* Buttons */}
        <div
          data-property-1="Default"
          className="self-stretch h-14 p-2.5 bg-violet-400 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-center items-center gap-2.5"
        >
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-32 text-center text-white text-base font-bold font-['Mulish'] disabled:opacity-60"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="w-32 text-center text-white text-base font-bold font-['Mulish'] bg-gray-500 rounded ml-4 disabled:opacity-60"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-32 text-center text-white text-base font-bold font-['Mulish']"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
