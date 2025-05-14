
import { HiOutlineUserGroup } from "react-icons/hi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

const Status = () => {
  const {data} = useGetDashboardStatusQuery()
  console.log(data)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="w-[90%] flex justify-between items-center p-3 rounded-lg border-2 border-[#E4AE3C]">
        <div className=" p-4 flex justify-center items-center rounded-full  text-[#e4af3ce5] ">
          <HiOutlineUserGroup className="size-8 mr-5" />
          <h1 className=" ml-2 text-xl font-semibold text-[#222222]">
            Total User
          </h1>
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-2xl font-semibold text-[#222222]">
            {data?.totalUser}
          </h1>
        </div>
      </div>
      <div className="w-[90%] flex justify-between items-center p-3 rounded-lg border-2 border-[#E4AE3C]">
        <div className=" p-4 flex justify-center items-center rounded-full bg-primary text-[#e4af3ce5]">
          <HiOutlineUserGroup className="size-8 mr-5" />
          <h1 className=" ml-2 text-xl font-semibold text-[#222222]">
            Total Product
          </h1>
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-2xl font-semibold text-[#222222]">
            {data?.recentUserData.length}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;



