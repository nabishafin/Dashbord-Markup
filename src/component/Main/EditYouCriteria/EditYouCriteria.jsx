import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AiOutlineHourglass, AiOutlineClockCircle, AiOutlineCalendar, AiOutlineDollarCircle } from "react-icons/ai";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const EditYouCriteria = () => {
  const { t } = useTranslation();

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const criteriaData = {
      criteriaName: formData.get("criteriaName"),
      time: formData.get("time"),
      count: formData.get("count"),
      days: formData.get("days"),
      amount: formData.get("amount"),
    };

    console.log("Form Data Submitted:", criteriaData);

    // You can replace this with an API call or other logic
  };

  return (
    <div className="mt-10">
      <div className="w-[90%] md:w-[40%] p-6 shadow-lg rounded-lg bg-white">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/youCriteria" className="flex items-center text-gray-700 text-lg font-semibold">
            <ArrowLeftOutlined className="mr-2" /> {t("Edit Criteria")}
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Criteria Name */}
          <div className="mb-4">
            <label htmlFor="criteriaName" className="block text-sm font-medium text-gray-700 mb-1">
              {t("Criteria Name")}
            </label>
            <input
              type="text"
              id="criteriaName"
              name="criteriaName"
              placeholder="Enter Criteria Name"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              {t("Time")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <AiOutlineHourglass className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                id="time"
                name="time"
                placeholder="Enter how long ad will run"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Count */}
          <div className="mb-4">
            <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
              {t("Count")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <AiOutlineClockCircle className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                id="count"
                name="count"
                placeholder="Enter how many times ad will run"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Days */}
          <div className="mb-4">
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
              {t("Days")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <AiOutlineCalendar className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                id="days"
                name="days"
                placeholder="Enter how many days ad will run"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              {t("Amount")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <AiOutlineDollarCircle className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder="Enter ad amount"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Save Criteria Button */}
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full bg-[#002D62] text-white font-semibold rounded-md"
          >
            {t("Save Criteria")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditYouCriteria;
