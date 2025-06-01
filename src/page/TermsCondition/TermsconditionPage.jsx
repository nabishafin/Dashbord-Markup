// TermsconditionPage.jsx

import { IoChevronBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useTranslation } from "react-i18next";
import {
  useGetAllTermConditionQuery,
  useUpdateTermConditionMutation,
} from "../../redux/features/TermsConditions/TermsConditionsApi";

const TermsconditionPage = () => {
  const { t } = useTranslation();

  // Fetch existing Terms & Conditions
  const { data, error, isLoading } = useGetAllTermConditionQuery();
  const [updateTermCondition] = useUpdateTermConditionMutation();

  // Local state for content + editing mode
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Whenever API data arrives, populate `content`
  useEffect(() => {
    if (data?.data?.attributes[0]?.content) {
      setContent(data.data.attributes[0].content);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Terms and Conditions</div>;

  // Save handler: send updated HTML back to the server
  const handleSave = async () => {
    // Strip HTML tags to ensure non‐empty content
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    if (!plainText) {
      message.error("Content cannot be empty.");
      return;
    }

    try {
      // Send full HTML content (you can adjust if your API expects plain text)
      const result = await updateTermCondition({ content });
      if ("data" in result) {
        message.success("Terms and Conditions updated successfully!");
        setIsEditing(false);
      } else {
        throw new Error("Update failed");
      }
    } catch {
      message.error("Failed to update Terms and Conditions.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen p-5">
      {/* Header */}
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          {/* <Link to="/settings">
              <IoChevronBack className="text-xl" />
            </Link> */}
          <h1 className="text-2xl font-semibold text-[#8578AA]">
            {t("Terms Of Conditions")}
          </h1>
        </div>
      </div>

      {/* Content container (view or editor) */}
      <div className="min-h-[100px] bg-white rounded-md text-black whitespace-pre-wrap">
        {!isEditing && (
          // Display stored HTML as formatted text
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}

        {isEditing && (
          <>
            <style>{`
              /* Remove default Quill borders/shadows */
              .ql-container {
                border: none !important;
                box-shadow: none !important;
              }
            `}</style>

            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["clean"],
                ],
              }}
              style={{ minHeight: "300px" }}
            />
          </>
        )}
      </div>

      {/* Edit / Cancel & Update Buttons (same positioning & style as PrivacyPolicyPage) */}
      {!isEditing ? (
        <button
          data-property-1="Default"
          className="w-36 h-14 p-2.5 bg-[#A28DD6] rounded-lg 
                     shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] 
                     inline-flex justify-center items-center gap-2.5 mt-10"
          onClick={() => setIsEditing(true)}
        >
          <div className="w-32 text-center text-white text-base font-bold font-['Mulish']">
            {t("Edit")}
          </div>
        </button>
      ) : (
        <div className="flex gap-4 mt-10">
          <button
            className="w-36 h-14 p-2.5 bg-gray-400 rounded-lg 
                       shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] 
                       text-white font-bold font-['Mulish']"
            onClick={() => setIsEditing(false)}
          >
            {t("Cancel")}
          </button>
          <button
            className="w-36 h-14 p-2.5 bg-[#A28DD6] rounded-lg 
                       shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] 
                       text-white font-bold font-['Mulish']"
            onClick={handleSave}
          >
            {t("Update")}
          </button>
        </div>
      )}
    </section>
  );
};

export default TermsconditionPage;
