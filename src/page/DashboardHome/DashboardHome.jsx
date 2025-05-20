import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import RecentUsers from "../../component/Main/Dashboard/RecentUsers";
import Status from "../../component/Main/Dashboard/Status";
import UserRatioChart from "../../component/Main/Dashboard/UserRatioChart";

const DashboardHome = () => {
  return (
    <section>
      <div className="py-7">
        <Status />
        <br />
        {/* <div className="flex justify-between items-center pr-2">
          <h1 className="text-xl font-semibold mb-3">Recent Users</h1>
          <a href="/users">
            <h1 className="  font-semibold mb-3 text-[#e4af3ce5]">View all</h1>
          </a>
        </div>

        <RecentTransactions /> */}
        
        <div className="w-full h-[475px] flex justify-between mt-12 gap-12">

          <UserRatioChart/>
          
          <RecentUsers/>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default DashboardHome;
