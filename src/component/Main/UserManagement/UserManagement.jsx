import { useState } from "react";
import { Space, Table, Form, ConfigProvider, Button, Spin, Modal } from "antd";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/user-management/user-management";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import BlockUserIcon from "./blockUserIcon";
import UnblockUserIcon from "./unblockUserIcon";

const UserManagement = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search text state

  const [removeUser] = useDeleteUserMutation();

  const { data: userData, isLoading, error } = useGetAllUsersQuery();

  const allUserDatas = userData?.data?.attributes?.results || [];

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };
  const handleView2 = (record) => {
    setUser(record);
    setIsModalOpen2(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const filteredData = allUserDatas
    .filter((user) => {
      return (
        user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .map((user, index) => ({
      si: index + 1,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      isActive: user.isActive,
      image: user.image,
      role: user.role,
      isBlocked: user.isBlocked,
      _id: user.id,
    }));

  // Function to remove user
  const handleremoveUser = async () => {
    if (user) {
      const data = { userId: user.id }; // Ensure that you're using the correct user ID
      try {
        const response = await removeUser(data); // Remove user API call
        if (response.data) {
          toast.success(response?.data?.message || "User removed successfully");
          handleCancel(); // Close the modal after successful deletion
        }
      } catch (error) {
        toast.error("Failed to remove user");
      }
    }
  };

  const columns = [
    {
      title: <span>{t("Profile Name")}</span>,
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center space-x-2 ">
          <img
            src={`${imageBaseUrl}/${record.image}`}
            alt="User"
            className="w-14 h-14 rounded-xl"
          />
          <h1 className="text-[#8578AA]">{record.fullName}</h1>
        </div>
      ),
    },
    {
      title: <span>{t("Email")}</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span>{t("Joining Date")}</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: <span>{t("Status")}</span>,
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => (
        <div className="w-20 h-7 px-2.5 bg-[#F2F9F3] inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 text-center justify-start text-[#81C784] text-base font-normal font-['Mulish']">
            {record.isActive ? (
              <>
                <div className="w-20 h-7 px-2.5 bg-[#F2F9F3] inline-flex justify-center items-center gap-2.5">
                  <div className="flex-1 text-center justify-start text-[#81C784] text-base font-normal font-['Mulish']">
                    Active
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-7 px-2.5 bg-[#FCF1F1] inline-flex justify-center items-center gap-2.5">
                  <div className="flex-1 text-center justify-start text-[#E57373] text-base font-normal font-['Mulish']">
                    Inactive
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      title: <span>{t("Role")}</span>,
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <div>
          {record.role === "admin" ? (
            <>
              <button className="bg-red-200 px-3 py-1 rounded text-black">
                Admin
              </button>
            </>
          ) : (
            <>
              <button className="bg-green-200 px-3 py-1 rounded text-black">
                User
              </button>
            </>
          )}
        </div>
      ),
    },
    {
      title: <span>{t("Actions")}</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <IoEyeSharp
            onClick={() => handleView(record)}
            size={22}
            className="text-gray-500 cursor-pointer"
          /> */}

          {record.isBlocked === true ? (
            <UnblockUserIcon
              onClick={() => handleView(record)}
              className="text-gray-500 cursor-pointer"
            />
          ) : (
            <BlockUserIcon
              onClick={() => handleView2(record)}
              className="text-gray-500 cursor-pointer"
            />
          )}
        </Space>
      ),
    },
  ];

  // Filter the data based on search text

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update search term on input change
  };

  return (
    <section className="mr-2">
      <div className="md:flex justify-between items-center mt-2">
        <h1 className="md:text-3xl font-semibold py-2 text-[#8578AA]">
          {t("Users")}
        </h1>
        <Form className="w-full md:w-[25%] flex items-center border border-[#BBA9EF] rounded-full p-3 shadow-sm bg-[#F8F6FD]">
          <FiSearch className="text-black mr-2" />
          <input
            type="text"
            placeholder={t("Search Text")}
            className="flex-1 outline-none bg-transparent border-none focus:border-none"
            value={searchText}
            onChange={handleSearchChange} // Call handleSearchChange on input change
          />
        </Form>
      </div>

      <br />

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error fetching users.</p>
      ) : (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#FEFCFF",
              colorPrimary: "#1890ff",
            },
            components: {
              Table: {
                headerBg: "#F8F6FD",
                headerColor: "#8578AA",
                headerBorderRadius: 1,
              },
            },
          }}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              onChange: setCurrentPage,
              pageSize: 5,
            }}
            columns={columns}
            dataSource={filteredData} // Use filtered data here
            rowKey="id"
            scroll={{ x: 1 }}
            rowClassName={() => "custom-row"}
          />
        </ConfigProvider>
      )}

      {/* Modal to show all details of the user */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        className="modal-container"
      >
        <div className="">
          <div className="w-full px-2.5 py-6 rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-center items-center gap-6">
              <svg
                width="65"
                height="64"
                viewBox="0 0 65 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="63"
                  height="63"
                  rx="31.5"
                  stroke="#81C784"
                />
                <path
                  d="M42.9834 44.2191H28.7066C28.4694 44.2191 28.2345 44.1724 28.0154 44.0816C27.7962 43.9908 27.5971 43.8578 27.4294 43.6901C27.2617 43.5223 27.1286 43.3232 27.0379 43.1041C26.9471 42.885 26.9004 42.6501 26.9004 42.4129V31.6621C26.9004 31.4249 26.9471 31.1901 27.0379 30.9709C27.1286 30.7518 27.2617 30.5527 27.4294 30.385C27.5971 30.2173 27.7962 30.0842 28.0154 29.9934C28.2345 29.9027 28.4694 29.856 28.7066 29.856H42.9834C43.4625 29.856 43.9219 30.0463 44.2606 30.385C44.5993 30.7237 44.7896 31.1831 44.7896 31.6621V42.4129C44.7896 42.8919 44.5993 43.3513 44.2606 43.6901C43.9219 44.0288 43.4625 44.2191 42.9834 44.2191ZM28.7066 30.6809C28.442 30.6809 28.1883 30.786 28.0013 30.973C27.8142 31.1601 27.7091 31.4138 27.7091 31.6783V42.4129C27.7091 42.6774 27.8142 42.9311 28.0013 43.1182C28.1883 43.3053 28.442 43.4103 28.7066 43.4103H42.9834C43.248 43.4103 43.5017 43.3053 43.6887 43.1182C43.8758 42.9311 43.9809 42.6774 43.9809 42.4129V31.6621C43.9766 31.4004 43.8697 31.1508 43.6831 30.9673C43.4965 30.7837 43.2452 30.6808 42.9834 30.6809H28.7066Z"
                  fill="#81C784"
                />
                <path
                  d="M32.1896 30.6812H29.4938C29.3866 30.6812 29.2838 30.6386 29.2079 30.5627C29.1321 30.4869 29.0895 30.384 29.0895 30.2768V24.9338C29.0895 23.9442 28.6964 22.9953 27.9967 22.2956C27.297 21.5959 26.348 21.2028 25.3585 21.2028C24.369 21.2028 23.42 21.5959 22.7203 22.2956C22.0206 22.9953 21.6276 23.9442 21.6276 24.9338V28.0339C21.6262 28.1407 21.5831 28.2428 21.5076 28.3183C21.432 28.3938 21.33 28.4369 21.2232 28.4383H18.5274C18.4206 28.4369 18.3186 28.3938 18.243 28.3183C18.1675 28.2428 18.1244 28.1407 18.123 28.0339V24.9338C18.123 23.0119 18.8865 21.1688 20.2454 19.8099C21.6044 18.4509 23.4475 17.6875 25.3693 17.6875C27.2911 17.6875 29.1342 18.4509 30.4932 19.8099C31.8521 21.1688 32.6156 23.0119 32.6156 24.9338V30.2606C32.6179 30.3169 32.6084 30.3731 32.5878 30.4256C32.5671 30.478 32.5358 30.5255 32.4956 30.5651C32.4555 30.6047 32.4076 30.6355 32.3549 30.6555C32.3022 30.6755 32.2459 30.6842 32.1896 30.6812ZM29.8874 29.8724H31.7853V24.9338C31.7853 23.2264 31.107 21.589 29.8998 20.3817C28.6925 19.1745 27.0551 18.4962 25.3477 18.4962C23.6404 18.4962 22.003 19.1745 20.7957 20.3817C19.5885 21.589 18.9102 23.2264 18.9102 24.9338V27.6295H20.808V24.9338C20.808 23.7298 21.2863 22.5751 22.1377 21.7237C22.989 20.8724 24.1437 20.3941 25.3477 20.3941C26.5517 20.3941 27.7064 20.8724 28.5578 21.7237C29.4091 22.5751 29.8874 23.7298 29.8874 24.9338V29.8724ZM37.1822 40.0787H34.4864C34.425 40.0785 34.3645 40.0643 34.3093 40.0372C34.2542 40.0101 34.206 39.9708 34.1683 39.9223C34.131 39.874 34.1053 39.8177 34.0932 39.7579C34.081 39.6981 34.0827 39.6363 34.0982 39.5772L34.6374 37.3451C34.3323 37.1043 34.1098 36.7744 34.0008 36.4013C33.8918 36.0282 33.9017 35.6303 34.0292 35.2631C34.1566 34.8959 34.3953 34.5775 34.7121 34.3522C35.0288 34.1269 35.4079 34.0058 35.7966 34.0058C36.1853 34.0058 36.5644 34.1269 36.8811 34.3522C37.1978 34.5775 37.4365 34.8959 37.564 35.2631C37.6915 35.6303 37.7014 36.0282 37.5924 36.4013C37.4834 36.7744 37.2609 37.1043 36.9558 37.3451L37.5273 39.5772C37.5428 39.6363 37.5445 39.6981 37.5324 39.7579C37.5202 39.8177 37.4945 39.874 37.4572 39.9223C37.3898 40.0087 37.2909 40.0649 37.1822 40.0787ZM35.0256 39.2699H36.6431L36.1039 37.2643C36.0809 37.1779 36.0875 37.0864 36.1227 37.0043C36.1579 36.9222 36.2196 36.8542 36.298 36.8114C36.4694 36.7237 36.6143 36.5918 36.7175 36.4292C36.8207 36.2667 36.8785 36.0794 36.8849 35.887C36.8912 35.6946 36.846 35.5039 36.7538 35.3349C36.6616 35.1658 36.5258 35.0246 36.3605 34.9258C36.1953 34.827 36.0066 34.7742 35.814 34.773C35.6215 34.7717 35.4321 34.8221 35.2656 34.9188C35.0991 35.0155 34.9615 35.155 34.8672 35.3228C34.7728 35.4907 34.7251 35.6807 34.7291 35.8732C34.7283 36.0632 34.7778 36.2501 34.8724 36.4148C34.9671 36.5796 35.1037 36.7164 35.2682 36.8114C35.3476 36.8534 35.4105 36.921 35.4467 37.0031C35.4829 37.0853 35.4903 37.1773 35.4677 37.2643L35.0256 39.2699Z"
                  fill="#81C784"
                />
              </svg>

              <div className="self-stretch flex flex-col justify-start items-center gap-3">
                <div className="text-center justify-center">
                  <span class="text-slate-500 text-base font-normal font-['Mulish']">
                    Are you sure want to unblock
                  </span>
                  <span class="text-[#81C784] text-lg font-semibold font-['Mulish']">
                    {" "}
                    {user?.fullName}
                  </span>
                  <span class="text-slate-500 text-base font-normal font-['Mulish']">
                    ?
                  </span>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-center items-end gap-2.5 flex-wrap content-end">
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex flex-col justify-center items-center gap-2.5"
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-slate-500 text-base font-normal font-['Mulish'] cursor-pointer">
                        No
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 bg-[#81C784] rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] inline-flex flex-col justify-center items-center gap-2.5"
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-white text-base font-normal font-['Mulish'] cursor-pointer">
                        Yes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={isModalOpen2}
        onCancel={handleCancel2}
        footer={null}
        centered={true}
        className="modal-container"
      >
        <div className="">
          <div className="w-full px-2.5 py-6 rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-center items-center gap-6">
              <svg
                width="65"
                height="64"
                viewBox="0 0 65 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="63"
                  height="63"
                  rx="31.5"
                  fill="#F8F6FD"
                />
                <rect
                  x="1"
                  y="0.5"
                  width="63"
                  height="63"
                  rx="31.5"
                  stroke="#E57373"
                />
                <path
                  d="M32.5001 18.6665C25.1401 18.6665 19.1667 24.6399 19.1667 31.9998C19.1667 39.3598 25.1401 45.3332 32.5001 45.3332C39.86 45.3332 45.8334 39.3598 45.8334 31.9998C45.8334 24.6399 39.8601 18.6665 32.5001 18.6665ZM22.9356 31.9998C22.9356 26.7021 27.2378 22.3998 32.5001 22.3998C34.4912 22.3998 36.3757 23.0043 37.9045 24.0709L24.6068 37.4043C23.5401 35.8754 22.9356 33.991 22.9356 31.9998ZM32.5001 41.5643C30.509 41.5643 28.6245 40.9598 27.0956 39.8932L40.3934 26.5954C41.4601 28.1243 42.0645 30.0087 42.0645 31.9998C42.0645 37.2976 37.7979 41.5643 32.5001 41.5643Z"
                  fill="#E57373"
                />
              </svg>

              <div className="self-stretch flex flex-col justify-start items-center gap-3">
                <div className="text-center justify-center">
                  <span class="text-slate-500 text-base font-normal font-['Mulish']">
                    Are you sure want to block
                  </span>
                  <span class="text-red-400 text-lg font-semibold font-['Mulish']">
                    {" "}
                    {user?.fullName}
                  </span>
                  <span class="text-slate-500 text-base font-normal font-['Mulish']">
                    ?
                  </span>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-center items-end gap-2.5 flex-wrap content-end">
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex flex-col justify-center items-center gap-2.5"
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-slate-500 text-base font-normal font-['Mulish'] cursor-pointer">
                        No
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 bg-red-400 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] inline-flex flex-col justify-center items-center gap-2.5"
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-white text-base font-normal font-['Mulish'] cursor-pointer">
                        Yes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default UserManagement;
