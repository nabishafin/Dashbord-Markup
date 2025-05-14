import { ConfigProvider, Table } from "antd";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import moment from "moment/moment";

const RecentTransactions = () => {
  const { data, error, isLoading } = useGetDashboardStatusQuery();

  // Handle cases where data might be undefined or not an array
  const dataSource = Array.isArray(data?.recentUserData)
    ? data.recentUserData.slice(0, 5).map((user, index) => ({
        key: user._id,
        si: index + 1,
        name: user?.fullName,
        email: user?.email,
        subscription: user?.subscription?.status,
        createDate: user?.createdAt,
        photo: user?.profileImage,
        phone: user?.phoneNumber // Using the first photo for the avatar
      }))
    : [];

  const columns = [
    {
      title: "S. No",
      dataIndex: "si",
      key: "si",
    },
    {
      title: <span>User Name</span>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <img
            src={`${imageBaseUrl}/${record.photo}`}
            alt="User"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <h1>{record.name}</h1>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex:"phone",
      key:"phone"
    },
    {
      title: "Create",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => moment(text).format("DD/MM/YYYY"), // Format the date
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (status) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "8px",
            backgroundColor: status === "trialing" ? "rgba(255, 165, 0, 0.1)" : "rgba(0, 255, 0, 0.1)",
            color: status === "trialing" ? "orange" : "green",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  // Loading and error states handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#EDD9B7",
              headerColor: "#000000",
              headerBorderRadius: 1,
            },
          },
        }}
      >
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </ConfigProvider>
    </div>
  );
};

export default RecentTransactions;
