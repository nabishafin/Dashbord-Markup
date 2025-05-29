import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useChangePasswordMutation } from "../../../redux/features/profile/profileApi";
import { ImSpinner6 } from "react-icons/im";

const PasswordSettings = () => {
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
    <div className="h-[718px] p-10 bg-white inline-flex justify-start items-center gap-2.5">
    <div className="w-[507px] inline-flex flex-col justify-start items-start gap-8">
        <div className="inline-flex justify-start items-end gap-8">
            <div className="w-28 inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Roboto']">Profile Picture</div>
                <img className="self-stretch h-28 rounded-full" src="https://placehold.co/120x120" />
            </div>
            <div className="flex justify-start items-center gap-3">
                <div className="h-9 p-1.5 bg-violet-400 rounded-[5.05px] shadow-[0px_1.2631579637527466px_2.526315927505493px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-slate-500 flex justify-start items-center gap-1.5">
                    <div className="text-center justify-start text-white text-base font-bold font-['Mulish']">Change Picture</div>
                </div>
                <div className="w-28 h-9 p-1.5 rounded-[5.05px] shadow-[0px_1.2631579637527466px_2.526315927505493px_0px_rgba(0,0,0,0.25)] outline outline-[0.63px] outline-offset-[-0.63px] outline-red-400 flex justify-center items-center gap-1.5">
                    <div className="justify-start text-red-400 text-base font-bold font-['Mulish']">Delete</div>
                </div>
            </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">User Name</div>
            <div data-property-1="Variant4" className="self-stretch h-14 p-2.5 rounded outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-start items-center gap-3">
                <div className="justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">Anika Alam</div>
            </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">Email</div>
            <div data-property-1="Variant4" className="self-stretch h-14 p-2.5 rounded outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-start items-center gap-3">
                <div className="justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">anika@gmail.com</div>
            </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">Phone Number</div>
            <div data-property-1="Variant4" className="self-stretch h-14 p-2.5 rounded outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-start items-center gap-3">
                <div className="justify-start text-neutral-400 text-base font-normal font-['Kantumruy_Pro']">0188888134</div>
            </div>
        </div>
        <div data-property-1="Default" className="self-stretch h-14 p-2.5 bg-violet-400 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-center items-center gap-2.5">
            <div className="w-32 text-center justify-start text-white text-base font-bold font-['Mulish']">Edit Profile</div>
        </div>
    </div>
</div>
  );
};

export default PasswordSettings;
