/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useTranslation } from "react-i18next";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className=" w-full md:h-[80px] px-3  md:flex justify-between items-center  text-white sticky top-0 left-0 z-10 bg-[#202020]">
      <div className="flex items-center gap-3 py-1 px-3 md:w-8/12 rounded">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
        <div>
          <h1 className=" font-semibold text-white">
            {t("Welcome")}, Thaddeus
          </h1>
          <h1 className="text-white">Have a nice day</h1>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 pl-2 mr-5">
        <div></div>
        {/* <Link to={"/notification"}>
          <div className="relative inline-block p-1 mt-2">
            <div className="text-[#FFFFFF] p-3 rounded-full">
              <MdOutlineNotificationsActive className="size-8 text-[#FFFFFF]" />
            </div>

            <span
              className="absolute top-5 right-4 bg-yellow-400 text-black font-bold text-sm rounded-full w-5 h-5 flex items-center justify-center shadow-md"
              style={{ transform: "translate(25%, -25%)" }} // Adjust badge positioning
            >
              {12}
            </span>
          </div>
        </Link> */}
        <img
          onClick={() => navigate("/personal-info")}
          src={
            user?.profileImage
              ? `${imageBaseUrl}${user?.profileImage}`
              : "/src/assets/user.png"
          }
          className="size-12 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
