/* eslint-disable no-unused-vars */
import signinImageBackground from "../../../assets/auth/loginbg.png";
import Logo from "../../../../public/logo/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";

import { toast } from "sonner";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const Otp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  console.log(email);
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    console.log(otpValue);
    setOtp(otpValue);
  };
  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ code: otp, email });
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res?.data?.message);
        // const changePasswordToken = res?.data?.data?.attributes?.tokens?.access?.token;
        // dispatch(
        //   updatePasswordChangeToken({
        //     changePasswordToken: changePasswordToken,
        //   })
        // );
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className="w-[1618px] h-[724px] m-[80px] mx-auto rounded-3xl grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-20 gap-8 bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${signinImageBackground})` }}
    >
      <div className=" bg-white rounded-md w-[485px] h-[465px] py-[46px] px-[65px] flex flex-col justify-between ml-[200px] shadow-custom-heavy">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="font-bold text-4xl text-[#8578AA]">
            Verify Email
          </h1>
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] rounded-md"
          />
        </div>
        <p className="text-[#8578AA]">OTP</p>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="otp-container"
          inputStyle={{
            width: "100%",
            maxWidth: "6.5rem",
            height: "3.5rem",
            margin: "0 0.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #BBA9EF",
            textAlign: "center",
            outline: "none",
            borderRadius: "8px",
          }}
        />
        <div onClick={handleMatchOtp} className="mt-5">
          <CustomButton loading={isLoading} border className="w-full">
            {t("Verify")}
          </CustomButton>
        </div>
        {/* <div className="flex justify-between items-center my-4 px-2">
          <h1 className="text-[#8578AA]">Didn’t receive code?</h1>
          <button onClick={handleResendPassword} className="text-[#8578AA]">
            {t("Resend")}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Otp;
