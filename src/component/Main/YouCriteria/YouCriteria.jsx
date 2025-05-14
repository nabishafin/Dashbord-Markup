import { useState } from "react";
import {  Table, ConfigProvider, } from "antd";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";

import { Link } from "react-router-dom";

// Mock JSON Data
const mockData = [
  {
    id: 1,
    name: "Ad Campaign 1",
    email: "campaign1@example.com",
    count: "10",
    days: "7",
    amount: "$100"
  },
  {
    id: 2,
    name: "Ad Campaign 2",
    email: "campaign2@example.com",
    count: "15",
    days: "14",
    amount: "$200"
  },
  {
    id: 3,
    name: "Ad Campaign 3",
    email: "campaign3@example.com",
    count: "20",
    days: "30",
    amount: "$300"
  }
];

const YouCriteria = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const { t } = useTranslation();

  const columns = [
    {
      title: <span>{t("S.No")}</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span>{t("Criteria Name")}</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span>{t("Time")}</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span>{t("Count")}</span>,
      dataIndex: "count",
      key: "count",
    },
    {
      title: <span>{t("Days")}</span>,
      dataIndex: "days",
      key: "days",
    },
    {
      title: <span>{t("Amount")}</span>,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: <span>{t("Action")}</span>,
      key: "action",
      render: (_, record) => (
        <div className="">
          <Link to={`/youCriteria/${record.id}`}>
          <CiEdit
            size={22}
            className="text-gray-black cursor-pointer"
          />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="md:px-5">
      <div className="md:flex justify-between items-center">
        <h1 className="md:text-xl font-semibold py-2">{t("Edit Criteria")}</h1>
        <div className="flex py-[22px] p-2 text-[19px]">
          <button className="flex items-center space-x-4 bg-[#003366] text-white px-2 py-1 rounded-md md:mr-2">
            <Link to={`/addadvertisement`}>{t("Add Criteria's")}</Link>
          </button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#F4F5F7",
            colorPrimary: "#1890ff",
          },
          components: {
            Table: {
              headerBg: "#91A7BD",
              headerColor: "white",
              headerBorderRadius: 2,
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
          dataSource={mockData}
          rowKey="si"
          scroll={{ x: 800 }}
        />
      </ConfigProvider>
    </section>
  );
};

export default YouCriteria;

