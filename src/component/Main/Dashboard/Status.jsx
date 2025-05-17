import { HiOutlineUserGroup } from "react-icons/hi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import TotalUserIcon from "./totalUserIcon";
import ActiveUserIcon from "./activeUserIcon";
import InactiveUserIcon from "./inactiveUserIcon";
import NewUserIcon from "./newUserIcon";
import CountUp from "react-countup";

const Status = () => {
  const { data } = useGetDashboardStatusQuery();
  console.log(data);

  const totalUsers = data?.totalUsers ?? 100;
  const activeUsers = data?.activeUsers ?? 80;
  const inactiveUsers = data?.inactiveUsers ?? 20;
  const newUsers = data?.newUsers ?? 15;
  

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="w-[90%] flex  items-center p-6 rounded-lg border-2 border-[#A28DD6] hover:border-[#c4a1e3] bg-[#F8F6FD] hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items text-[#49005A]">
          <TotalUserIcon className="w-10 h-10 mr-5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#49005A] ">Total User</h1>
          <h1 className=" text-4xl font-bold text-[#49005A] ">
            <CountUp start={0} end={totalUsers} duration={2} separator="," className="font-bold" />
          </h1>
        </div>
      </div>
      <div className="w-[90%] flex  items-center p-6 rounded-lg border-2 border-[#A28DD6] hover:border-[#c4a1e3] bg-[#F8F6FD] hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items text-[#49005A]">
          <ActiveUserIcon className="w-10 h-10 mr-5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#49005A] ">
            Active Users
          </h1>
          <h1 className=" text-4xl font-bold text-[#49005A] "><CountUp start={0} end={activeUsers} duration={2} separator="," className="font-bold" /></h1>
        </div>
      </div>
      <div className="w-[90%] flex  items-center p-6 rounded-lg border-2 border-[#A28DD6] hover:border-[#c4a1e3] bg-[#F8F6FD] hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items text-[#49005A]">
          <InactiveUserIcon className="w-10 h-10 mr-5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#49005A] ">
            Inactive User
          </h1>
          <h1 className=" text-4xl font-bold text-[#49005A] "><CountUp start={0} end={inactiveUsers} duration={2} separator="," className="font-bold" /></h1>
        </div>
      </div>
      <div className="w-[90%] flex  items-center p-6 rounded-lg border-2 border-[#A28DD6] hover:border-[#c4a1e3] bg-[#F8F6FD] hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items text-[#49005A]">
          <NewUserIcon className="w-10 h-10 mr-5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[#49005A] ">New User</h1>
          <h1 className=" text-4xl font-bold text-[#49005A] "><CountUp start={0} end={newUsers} duration={2} separator="," className="font-bold" /></h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
