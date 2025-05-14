import { useState } from "react";
import { Table, ConfigProvider, Button, Form } from "antd";
import { useTranslation } from "react-i18next";
import { IoEyeSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetAllReportQuery } from "../../../redux/features/report/report";
import { Link } from "react-router-dom";

const ContentModeration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const { data } = useGetAllReportQuery();
  const allData = data?.data?.attributes || [];

  // Handle the opening of the modal
  const handleView = (record) => {
    setSelectedAd(record);
    setIsModalOpen(true);
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter and map data based on search text
  const filteredData = allData
    ?.filter((product) => {
      return (
        product.createdBy.fullName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        product.createdBy.email.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    ?.map((product, index) => ({
      key: product.id,
      si: index + 1,
      pName: product.createdBy.fullName,
      description: product.productDescription || "N/A",
      reportedBy: product.createdBy?.fullName || "N/A",
      reason: product.reasonOfReport || "N/A",
      mediaUrls: product.mediaUrls || [],
      reportDate: product.createdAt || "N/A",
      createdBy: product.createdBy,
      email: product.createdBy.email,
      profile: product.createdBy.profileImage,
    }));

  // Table columns
  const columns = [
    {
      title: t("SI"),
      dataIndex: "si",
      key: "si",
    },
    {
      title: <span>{t("User Name")}</span>,
      dataIndex: "pName",
      key: "pName",
      render: (_, record) => (
        <div className="flex items-center space-x-2 ">
          <img
            src={`${imageBaseUrl}/${record.profile}`}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <h1>{record.pName}</h1>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Reported By"),
      dataIndex: "reportedBy",
      key: "reportedBy",
    },
    {
      title: t("Report Date"),
      dataIndex: "reportDate",
      key: "reportDate",
      render: (createdAt) =>
        createdAt
          ? new Date(createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A",
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Link to={`/ContentModeration/${record.key}`}>
            <IoEyeSharp size={20} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="md:pr-1">
      <div className="flex justify-between">
        <h1 className="md:text-xl font-semibold py-4">{t("All Report")}</h1>
        <div className="my-5 mr-5">
          <Form className="w-full  flex items-center border border-gray-300 rounded-md p-2 shadow-sm">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={t("Search...")}
              className="flex-1 outline-none bg-transparent border-none focus:border-none"
              value={searchText}
              onChange={handleSearchChange}
            />
          </Form>
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: { colorBgContainer: "#F4F5F7", colorPrimary: "#1890ff" },
          components: {
            Table: {
              headerBg: "#EDD9B7",
              headerColor: "#000000",
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
          }}
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          scroll={{ x: 800 }}
        />
      </ConfigProvider>
    </section>
  );
};

export default ContentModeration;
