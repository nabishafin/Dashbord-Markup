import Logo from "../../../../public/logo/logo.png";
import signinImageBackground from "../../../assets/auth/loginbg.png";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const NewPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email } = useParams();
  console.log(email);

  const submit = async (values) => {
    const { password } = values;
    console.log(password);

    try {
      const res = await resetPassword({ email, password }).unwrap();
      console.log(res);

      // Handle the response from the API
      if (res?.code === 200) {
        // You can access the `message` and `data.attributes` here for further customization
        console.log("Attributes:", res.data?.attributes); // Display the attributes if needed

        // Navigate to the login page or wherever necessary
        navigate("/auth");
        toast.success(res.message || "Password updated successfully!");
      } else {
        // In case the code is not 200, handle it accordingly
        toast.error(res?.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "An unexpected error occurred");
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
            Reset <br/> Password
          </h1>
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px]  rounded-md"
          />
        </div>

        <Form
          layout="vertical"
          onFinish={submit}
          initialValues={{ password: "", confirmPassword: "" }}
        >
          <Form.Item
            label={<span className="text-[#8578AA]">New Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please input your new password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <CustomInput isPassword type="password" placeholder="* * * * * * * *" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#8578AA]">Confirm Password</span>}
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <CustomInput
              isPassword
              type="password"
              placeholder="* * * * * * * *"
            />
          </Form.Item>

          <Form.Item>
            <CustomButton loading={isLoading} border className="w-full">
              {t("Update Password")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
