import { useEffect, useState } from "react";
import { Modal, Table, ConfigProvider, Button, message, Input } from "antd";
import { useTranslation } from "react-i18next";
import {
  useMakeScriptionMutation,
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/subscription/subscription";

const Subscribers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalADDOpen, setIsModalADDOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});

  useEffect(() => {
    // You can add logic here if you need to do something when selectedAd changes
  }, [selectedAd]);

  const { t } = useTranslation();

  // Fetch subscription data
  const { data, refetch } = useGetAllSubscriptionQuery();
  const AllData = data?.data?.attributes?.results || [];

  // Mutation to add a subscription
  const [makeScription] = useMakeScriptionMutation();

  // Mutation to update a subscription
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const handleView = (record) => {
    console.log(record);
    setSelectedAd(record); // Set selected subscription to state
    setIsModalOpen(true); // Open edit modal
  };

  const handleAddSubscriber = () => {
    setIsModalADDOpen(true); // Open add modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close edit modal
    setIsModalADDOpen(false); // Close add modal
    setSelectedAd({}); // Reset selected subscription
  };

  // Add new subscription
  const handleAddSubscription = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.subscriptionName.value,
      limitation: form.limitation.value,
      amount: form.fee.value,
      stripePriceId: form.stripePriceId.value,
    };

    try {
      const res = await makeScription(formData); // Call the mutation
      if (res.data) {
        message.success(t("Add New Subscription successfully!"));
        setIsModalADDOpen(false);
        handleCancel();
        refetch();
      }
    } catch (error) {
      message.error(t("Something went wrong"));
    }
  };

  // Update subscription
  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.subscriptionName.value,
      limitation: form.limitation.value,
      amount: form.fee.value,
      stripePriceId: form.stripePriceId.value,
    };

    try {
      const res = await updateSubscription({
        id: selectedAd.key,
        data: updatedData,
      });
      if (res.data) {
        message.success(t("Update Subscription successfully!"));
        setIsModalOpen(false);
        handleCancel();
        refetch();
      }
    } catch (error) {
      message.error(t("Something went wrong"));
    }
  };

  // Mapping subscription data for the table
  const filteredData = AllData.map((subscription, index) => ({
    key: subscription.id,
    si: index + 1,
    title: subscription.title || "N/A",
    limitation: subscription.limitation || "N/A",
    stripePriceId: subscription.stripePriceId || "N/A",
    days: subscription.days || "N/A",
    amount: subscription.amount || "N/A",
    createdAt: subscription.createdAt || "N/A",
  }));

  // Define the columns for the Table
  const columns = [
    {
      title: t("SI"),
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Subscription Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subscription Fee",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Validity",
      dataIndex: "limitation",
      key: "limitation",
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleView(record)}>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="md:pr-1">
      <div className="flex justify-between space-x-2">
        <h1 className="md:text-xl font-semibold py-4">All Subscribers</h1>
        <div className="mr-2 py-2 bg-[#E4AE3C] px-3 my-2 text-white rounded-md">
          <button onClick={handleAddSubscriber}>Add Subscribers</button>
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

      {/* Edit Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-5">Edit Subscription</h1>
          <form onSubmit={handleUpdateSubscription}>
            <div className="mb-4">
              <label htmlFor="subscriptionName">Subscription Name</label>
              <Input
                id="subscriptionName"
                value={selectedAd?.title || ""}
                onChange={(e) => setSelectedAd({ ...selectedAd, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stripePriceId">Stripe Price ID</label>
              <Input
                id="stripePriceId"
                value={selectedAd?.stripePriceId || ""}
                onChange={(e) => setSelectedAd({ ...selectedAd, stripePriceId: e.target.value })}
              />
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="limitation">Limitation</label>
                <Input
                  id="limitation"
                  value={selectedAd?.limitation || ""}
                  onChange={(e) => setSelectedAd({ ...selectedAd, limitation: e.target.value })}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="fee">Fee</label>
                <Input
                  id="fee"
                  value={selectedAd?.amount || ""}
                  onChange={(e) => setSelectedAd({ ...selectedAd, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal
        open={isModalADDOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-5">Add New Subscription</h1>
          <form onSubmit={handleAddSubscription}>
            <div className="mb-4">
              <label htmlFor="subscriptionName">Subscription Name</label>
              <Input id="subscriptionName" required />
            </div>
            <div className="mb-4">
              <label htmlFor="stripePriceId">Stripe Price ID</label>
              <Input id="stripePriceId" required />
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="limitation">Limitation</label>
                <Input id="limitation" required />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="fee">Fee</label>
                <Input id="fee" required />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default Subscribers;
