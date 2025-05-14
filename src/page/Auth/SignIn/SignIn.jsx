import signinImageBackground from "../../../assets/auth/loginbg.png";
import Logo from "../../../../public/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import {
  loggedUser,
  updateToken,
} from "../../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password });
      // console.log(res)
      if (res?.data?.code === 200) {
        const user = res?.data?.data?.attributes?.user;
        const token = res?.data?.data?.attributes?.tokens?.access?.token;
        console.log(user, token);
        dispatch(loggedUser({ user, token }));
        // Show success message
        toast.success(res.data.message || "Login successful!");
        // Navigate to the root page
        navigate("/");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during login:", error);
      toast.error("Something went wrong");
    }
  };

  const { t } = useTranslation();

  return (
    <div
      className="w-[1618px] m-[80px] mx-auto rounded-3xl grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-20 gap-8 bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${signinImageBackground})` }}
    >
      <div className=" bg-white rounded-md w-[485px] h-[565px] py-[56px] px-[65px] flex flex-col justify-between ml-[200px] shadow-custom-heavy">
        <div className="mb-2 flex justify-between ">
          <h1 className=" text-3xl font-bold text-[#8578AA] text-center">
            Sign In
          </h1>
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px]  mb-5 rounded-md"
          />
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label={<span className="text-[#8578AA] text-base">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <CustomInput
              type="email"
              icon={HiOutlineMail}
              placeholder="Enter your email"
              className=" text-[#9384bb] text-base border-b border-t-0 border-x-0 border-[#BBA9EF] bg-white hover:border-[#8578AA] "
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-black">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <CustomInput
              type="password"
              icon={HiOutlineLockClosed}
              placeholder="Enter your password"
              isPassword
              className="placeholder-[#8578AA] text-[#9384bb] text-base border-b border-t-0 border-x-0 border-[#BBA9EF] bg-white hover:border-[#8578AA]"
            />
          </Form.Item>

          <div className="flex justify-between items-center text-black">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className=""
              noStyle
            >
              <Checkbox className="text-[#8578AA]">Remember me</Checkbox>
            </Form.Item>
            <Link
              to="/auth/forget-password"
              className="text-[#8578AA] font-bold text-lg"
            >
              Forgot Password?
            </Link>
          </div>

          <Form.Item>
            <CustomButton
              loading={isLoading}
              className="w-full font-semibold"
              border={true}
            >
              {t("Sign Up")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
