import React from "react";
import { Card } from "antd";
import { Area } from "@ant-design/plots";

const data = [
  { month: "Jan", value: 620 },
  { month: "Feb", value: 500 },
  { month: "Mar", value: 980 },
  { month: "Apr", value: 730 },
  { month: "May", value: 940 },
  { month: "Jun", value: 500 },
  { month: "Jul", value: 840 },
  { month: "Aug", value: 1000 },
  { month: "Sep", value: 190 },
  { month: "Oct", value: 570 },
  { month: "Nov", value: 670 },
  { month: "Dec", value: 770 },
];

const UserRatioChart = () => {
  const config = {
    data,
    xField: "month",
    yField: "value",
    smooth: true,
    style: {
      fill: "#81C78499", // green with transparency
    },
    lineStyle: {
      stroke: "rgba(0, 0, 0, 1)",
      lineWidth: 2,
    },
    point: {
      size: 6,
      shape: "circle",
      style: {
        fill: "#81C78499",
        stroke: "#81C78499",
      },
    },
    xAxis: {
      label: {
        style: {
          fill: "#00000", // Tailwind's gray-500
          fontWeight: 500,
        },
      },
      line: {
        style: {
          stroke: "#00000", // Tailwind's purple-500-ish for border
        },
      },
      grid: null,
    },
    yAxis: {
      label: {
        style: {
          fill: "#00000",
          fontWeight: 500,
        },
      },
      line: {
        style: {
          stroke: "#00000",
        },
      },
      grid: null,
      min: 0,
      max: 1100,
      tickCount: 5,
    },
    padding: "auto",
    height: 261,
  };

  return (
    <div className="w-full h-full rounded-xl p-6 bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-neutral-400">
      <Card
        className=""
        bodyStyle={{ padding: "16px" }}
        bordered={false}
        title={
          <h3 className=" self-stretch justify-start text-[#000] text-3xl font-bold font-['Mulish']">
            User Ratio
          </h3>
        }
      >
        <div className="border border-purple-300 rounded-md p-2">
          <Area {...config} />
        </div>
      </Card>
    </div>
  );
};

export default UserRatioChart;
