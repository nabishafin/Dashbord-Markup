import { useEffect, useState, useRef } from "react";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";
const GeneralSettings = () => {
    const { data, refetch, isFetching } = useGetUserQuery();
  const user = data?.attributes?.user;
  return (
    <div className="h-[718px] p-10 bg-white inline-flex justify-start items-center gap-2.5">
      <div className="w-[507px] inline-flex flex-col justify-start items-start gap-8">
        <div className="w-28 flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-neutral-400 text-base font-bold font-['Mulish']">
            Profile Picture
          </div>
          <img className="self-stretch h-28 rounded-full" src={`${imageBaseUrl}${user?.image}`} />
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            User Name
          </div>
          <div
            data-property-1="Variant4"
            className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
          >
            <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
              Tania
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            Email
          </div>
          <div
            data-property-1="Variant4"
            className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
          >
            <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
              tania@gmail.com
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-neutral-400 text-sm font-normal font-['Mulish']">
            Phone Number
          </div>
          <div
            data-property-1="Variant4"
            className="self-stretch h-14 pr-2.5 py-2.5 border-b border-slate-500 inline-flex justify-start items-center gap-3"
          >
            <div className="justify-start text-neutral-400 text-base font-bold font-['Mulish']">
              0188888134
            </div>
          </div>
        </div>
        <div
          data-property-1="Default"
          className="self-stretch h-14 p-2.5 bg-violet-400 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex justify-center items-center gap-2.5"
        >
          <div className="w-32 text-center justify-start text-white text-base font-bold font-['Mulish']">
            Edit Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
