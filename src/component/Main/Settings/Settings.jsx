import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import PasswordSettings from "./PasswordSettings";
import PrivacyPolicy from "../../../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsConditions from "../../../page/TermsCondition/TermsconditionPage";
import AboutUs from "../../../page/AboutUs/AboutUsPage";
import UserIcon from "./UserIcon";
import PasswordIcon from "./PasswordIcon";
import FileIcon from "./FileIcon";

const tabs = [
  { key: "general", label: "General", icon: <UserIcon /> },
  { key: "password", label: "Password", icon: <PasswordIcon /> },
  { key: "privacy", label: "Privacy Policy", icon: <FileIcon /> },
  { key: "terms", label: "Terms & Conditions", icon: <FileIcon /> },
  { key: "about", label: "About Us", icon: <FileIcon /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "password":
        return <PasswordSettings />;
      case "privacy":
        return <PrivacyPolicy />;
      case "terms":
        return <TermsConditions />;
      case "about":
        return <AboutUs />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200">
        <h2 className=" text-4xl font-semibold mb-6 text-[#8578AA]">
          Settings
        </h2>
        <nav className="flex flex-col space-y-2">
          {tabs.map(({ key, label, icon }) => (
            <>
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left text-[#8578AA] font-semibold px-4 py-4 transition flex gap-6 ${
                  activeTab === key
                    ? "bg-[#BBA9EF] text-white font-semibold"
                    : "text-[#8578AA] hover:bg-purple-100"
                }`}
                aria-current={activeTab === key ? "page" : undefined}
              >
                <div>{icon}</div>
                {label}
              </div>
            </>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-white">{renderTabContent()}</main>
    </div>
  );
};

export default Settings;
