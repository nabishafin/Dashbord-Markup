/* eslint-disable react/no-unescaped-entities */
import signinImageBackground from "../../../assets/auth/loginbg.png";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../public/logo/logo.png";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateToken } from "../../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message);
        // console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        // console.log(res.data?.data?.token)
        dispatch(
          updateToken({
            token: res.data?.data?.token,
          })
        );
        navigate(`/auth/otp/${values?.email}`);
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
        <div className="mb-2 flex justify-between">
          <h1 className="font-bold text-4xl text-[#8578AA]">Forgot Password</h1>
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] mb-5 rounded-md mx-auto"
          />
        </div>
        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design form submission
          initialValues={{ email: "" }} // Set initial form values
        >
          {/* CustomInput wrapped in Form.Item for validation */}
          <Form.Item
            label={<span className="text-[#8578AA]">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <CustomInput
              type="email"
              icon={HiOutlineMail}
              placeholder="Enter your email"
              className=" text-[#9384bb] text-base border-b border-t-0 border-x-0 border-[#BBA9EF] bg-white hover:border-[#8578AA] "
            />
          </Form.Item>

          {/* CustomButton for submit */}
          <Form.Item>
            <CustomButton
              loading={isLoading}
              border
              type="submit"
              className="w-full"
            >
              {t("Send OTP")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
