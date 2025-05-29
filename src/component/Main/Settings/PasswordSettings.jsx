import { useEffect, useState, useRef } from "react";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";
import { Form, Input, Button, message } from "antd";
import { useChangePasswordMutation } from "../../../redux/features/profile/profileApi";
import { ImSpinner6 } from "react-icons/im";

const PasswordSettings = () => {
    const { data, refetch, isFetching } = useGetUserQuery();
  const user = data?.attributes?.user;
  const [form] = Form.useForm();
  const [changePassWithOldPass, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (values) => {
    try {
      const { oldPassword, newPassword } = values;
      const res = await changePassWithOldPass({ oldPassword, newPassword });
      if (res?.data?.code === 200) {
        message.success(res?.data?.message || "Password updated successfully");
        form.resetFields();
      } else {
        message.error(res?.error?.data?.message || "Password update failed");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="h-[718px] p-10 bg-white inline-flex justify-start items-start gap-2.5">
    <div className="w-[507px] inline-flex flex-col justify-start items-start gap-8">
        <div className="w-28 flex flex-col justify-start items-start gap-5">
            <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">Profile Picture</div>
            <img className="self-stretch h-28 rounded-full" src={`${imageBaseUrl}${user?.image}`} />
        </div>
        <div data-property-1="Default" className="self-stretch h-14 p-2.5 bg-violet-400 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-start text-white text-base font-bold font-['Mulish']">Change Password</div>
        </div>
    </div>
</div>
  );
};

export default PasswordSettings;
