/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useTranslation } from "react-i18next";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };
  const { user } = useSelector((state) => state.auth);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (path) => location.pathname === path;

  // Build image URL properly
  const profileImageSrc =
    user?.image && !user.image.startsWith("http")
      ? `${imageBaseUrl}${user.image}`
      : user?.image || "/src/assets/user.png";

  return (
    <div className=" w-full md:h-[148px] px-3 md:flex justify-between items-center text-[#8578AA] sticky top-0 left-0 z-10 bg-[#fff] mt-[30px]">
      <div>
        <img
          onClick={() => navigate("/")}
          src="/public/logo/logo.png"
          alt="logo"
          className="size-16 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-3 py-1 px-3 rounded">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-[#8578AA] text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
        <div>
          <ul className="hidden md:flex gap-32 ">
            <li>
              <button
                className={`text-[#8578AA] font-bold border-b-2 ${
                  isActive("/") ? "border-[#8578AA]" : "border-transparent"
                }`}
                onClick={() => navigate("/")}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                className={`text-[#8578AA] font-bold border-b-2 ${
                  isActive("/users") ? "border-[#8578AA]" : "border-transparent"
                }`}
                onClick={() => navigate("/users")}
              >
                Users
              </button>
            </li>
            <li>
              <button
                className={`text-[#8578AA] font-bold border-b-2 ${
                  isActive("/settings") ? "border-[#8578AA]" : "border-transparent"
                }`}
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 pl-2 mr-5">
        <Link to={"/notification"}>
          <div className="relative inline-block p-1 mt-2">
            <div className="text-[#FFFFFF] p-5 rounded-full">
              <img src="/src/assets/notification.png" alt="" />
            </div>

            <span
              className="absolute top-5 right-4 bg-yellow-400 text-black font-bold text-sm rounded-full w-5 h-5 flex items-center justify-center shadow-md"
              style={{ transform: "translate(25%, -25%)" }} // Adjust badge positioning
            >
              {12}
            </span>
          </div>
        </Link>
        <img
          onClick={() => navigate("/settings")}
          src={profileImageSrc}
          className="size-16 rounded-full cursor-pointer"
          alt="User Profile"
        />
        <button
          onClick={handleLogout}
          className="flex items-center px-4 text-red-500 mt-5 mb-5 rounded-lg transition-all duration-200"
        >
          <img src="/src/assets/logout.png" alt="Logout" />
        </button>
      </div>
    </div>
  );
};

export default Header;
