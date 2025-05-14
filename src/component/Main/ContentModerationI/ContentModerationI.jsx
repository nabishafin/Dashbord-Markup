import { useParams } from "react-router-dom";
import {
  useDeclientReportMutation,
  useDeleteReportMutation,
  useGetSingleContentModerationQuery,
} from "../../../redux/features/report/report";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useEffect, useState } from "react";
import { message } from "antd";

const ContentModerationI = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  // Fetch the report data with the query hook
  const { data, refetch,  isLoading, isError } = useGetSingleContentModerationQuery(id);

  // Update the state when data is fetched
  useEffect(() => {
    if (data) {
      setReport(data?.data?.attributes[0]); // Get the first report (since it's an array)
    }
  }, [data]);

  // Setup delete mutation
  const [deletereport] = useDeleteReportMutation();

  const handelDeleteReport = async (id) => {
    const data = { reportId: id };
    try {
      const res = await deletereport(data);
      console.log("Deleted report response:", res);
      if (res?.data) {
        message.success("Report deleted successfully");
        // You can redirect the user or update the UI accordingly
        refetch()
      }
    } catch (error) {
      console.error("Error deleting report:", error?.error?.data?.message);
      message("Failed to delete ", error?.error?.data?.message);
    }
  };

  const [DeclientRepor] = useDeclientReportMutation();
  const handelDeclientReport = async (id) => {
    const data = { reportId: id };
    try {
      const res = await DeclientRepor(data);
      console.log("DeclientRepor  response:", res);
      if (res?.data) {
        message.success("Declient Reporsuccessfully");
        // You can redirect the user or update the UI accordingly
        refetch()
      }
    } catch (error) {
      console.error("Error Declient Repor", error);
      message("Failed  Declient Repor ");
    }
  };

  // Handle image click to open modal (you may want to implement the modal function)
  const handleImageClick = (imageUrl) => {
    console.log(`Image clicked: ${imageUrl}`);
    // You can open the image in a modal or any other functionality
  };
  // Handle decline action (placeholder function)
  const handleDecline = (imageUrl) => {
    console.log(`Decline image: ${imageUrl}`);
    // You can call an API here to decline the image
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !report) {
    return <p>No report found or error fetching the data.</p>;
  }

  return (
    <div className="my-5">
      {/* Header and basic information */}
      <h1>Content Moderation Report</h1>
      <div>
        <h3>User: {report.createdBy?.fullName}</h3>
        <p>Reported By: {report.profile?.fullName}</p>
        <p>Message: {report.message}</p>
        <p>Created At: {new Date(report.createdAt).toLocaleString()}</p>
      </div>

      {/* Display images and action buttons */}
      <div>
        <h3>Reported Images:</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mt-3">
          <div style={{ textAlign: "center" }}>
            <img
              src={`${imageBaseUrl}/${report?.image}`}
              alt={`Reported Image`}
              className="w-full h-[40vh] rounded-md"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(report?.image)} // Open modal when image is clicked
            />
            <div className="flex justify-between mt-3">
              <button
                style={{
                  backgroundColor: "#F29D9D",
                  color: "#FFFFFF",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  margin: "5px",
                }}
                onClick={() => handelDeleteReport(id)} // Delete action
              >
                Delete
              </button>
              <button
                style={{
                  backgroundColor: "#F1C57A",
                  color: "#000000",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  margin: "5px",
                }}
                onClick={() => handelDeclientReport(id)} // Decline action
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModerationI;
