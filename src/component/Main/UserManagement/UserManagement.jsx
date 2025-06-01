import { useState } from "react";
import { Space, Table, Form, ConfigProvider, Spin, Modal } from "antd";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useToggleBlockUserMutation, // <-- import your toggle mutation hook here
} from "../../../redux/features/user-management/user-management";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { toast } from "react-toastify";
import BlockUserIcon from "./blockUserIcon";
import UnblockUserIcon from "./unblockUserIcon";

const UserManagement = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Unblock modal
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Block modal
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [removeUser] = useDeleteUserMutation();
  const [toggleBlockUser, { isLoading: toggleLoading }] =
    useToggleBlockUserMutation();

  const { data: userData, isLoading, error } = useGetAllUsersQuery();

  const allUserDatas = userData?.data?.attributes?.results || [];

  // Modal open handlers
  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true); // Open unblock confirmation modal
  };
  const handleView2 = (record) => {
    setUser(record);
    setIsModalOpen2(true); // Open block confirmation modal
  };

  // Modal close handlers
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const filteredData = allUserDatas
    .filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    )
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
      id: user.id,
    }));

  // Remove user handler
  const handleremoveUser = async () => {
    if (user) {
      const data = { userId: user.id };
      try {
        const response = await removeUser(data);
        if (response.data) {
          toast.success(response?.data?.message || "User removed successfully");
          handleCancel();
        }
      } catch {
        toast.error("Failed to remove user");
      }
    }
  };

  // Confirm unblock API call
  const handleConfirmUnblock = async () => {
    if (!user) return;
    try {
      console.log(user);
      await toggleBlockUser(user.id);
      toast.success(`${user.fullName} has been unblocked`);
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to unblock user");
    }
  };

  // Confirm block API call
  const handleConfirmBlock = async () => {
    if (!user) return;
    try {
      await toggleBlockUser(user.id);
      toast.success(`${user.fullName} has been blocked`);
      setIsModalOpen2(false);
    } catch {
      toast.error("Failed to block user");
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
              <div className="w-20 h-7 px-2.5 bg-[#F2F9F3] inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 text-center justify-start text-[#81C784] text-base font-normal font-['Mulish']">
                  Active
                </div>
              </div>
            ) : (
              <div className="w-20 h-7 px-2.5 bg-[#FCF1F1] inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 text-center justify-start text-[#E57373] text-base font-normal font-['Mulish']">
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: <span>{t("Role")}</span>,
      dataIndex: "role",
      key: "role",
      render: (_, record) =>
        record.role === "admin" ? (
          <button className="bg-red-200 px-3 py-1 rounded text-black">
            Admin
          </button>
        ) : (
          <button className="bg-green-200 px-3 py-1 rounded text-black">
            User
          </button>
        ),
    },
    {
      title: <span>{t("Actions")}</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.isBlocked ? (
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
            onChange={handleSearchChange}
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
            dataSource={filteredData}
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
        {/* Your existing unblock modal design code, no changes */}
        <div className="">
          <div className="w-full px-2.5 py-6 rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-center items-center gap-6">
              {/* SVG and content omitted for brevity (your existing code) */}
              <div className="self-stretch flex flex-col justify-center items-center gap-3">
                <div className="text-center justify-center">
                  <span className="text-slate-500 text-base font-normal font-['Mulish']">
                    Are you sure want to unblock
                  </span>
                  <span className="text-[#81C784] text-lg font-semibold font-['Mulish']">
                    {" "}
                    {user?.fullName}
                  </span>
                  <span className="text-slate-500 text-base font-normal font-['Mulish']">
                    ?
                  </span>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-center items-end gap-2.5 flex-wrap content-end">
                {/* "No" button - close modal */}
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                  onClick={handleCancel}
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-slate-500 text-base font-normal font-['Mulish']">
                        No
                      </div>
                    </div>
                  </div>
                </div>
                {/* "Yes" button - confirm unblock */}
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 bg-[#81C784] rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                  onClick={handleConfirmUnblock}
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-white text-base font-normal font-['Mulish']">
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

      {/* Block modal (unchanged design) */}
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
              {/* SVG and content omitted for brevity (your existing code) */}
              <div className="self-stretch flex flex-col justify-start items-center gap-3">
                <div className="text-center justify-center">
                  <span className="text-slate-500 text-base font-normal font-['Mulish']">
                    Are you sure want to block
                  </span>
                  <span className="text-red-400 text-lg font-semibold font-['Mulish']">
                    {" "}
                    {user?.fullName}
                  </span>
                  <span className="text-slate-500 text-base font-normal font-['Mulish']">
                    ?
                  </span>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-center items-end gap-2.5 flex-wrap content-end">
                {/* "No" button - close modal */}
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] outline outline-1 outline-offset-[-1px] outline-slate-500 inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                  onClick={handleCancel2}
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-slate-500 text-base font-normal font-['Mulish']">
                        No
                      </div>
                    </div>
                  </div>
                </div>
                {/* "Yes" button - confirm block */}
                <div
                  data-property-1="Variant6"
                  className="w-20 h-8 px-1.5 py-1.5 bg-red-400 rounded-lg shadow-[0px_4px_4px_1px_rgba(228,174,60,0.10)] inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                  onClick={handleConfirmBlock}
                >
                  <div className="inline-flex justify-start items-center gap-52">
                    <div className="w-20 flex justify-start items-center gap-1.5">
                      <div className="w-20 text-center justify-start text-white text-base font-normal font-['Mulish']">
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
