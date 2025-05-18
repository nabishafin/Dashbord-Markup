import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";

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
        <div className="w-full h-[475px] bg-green-300 flex justify-between">
          <div className="bg-red-500">
             
          </div>
          <div className="bg-blue-500 ">
            <div className="w-[624px] h-[473px] p-6 bg-white rounded shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex flex-col justify-start items-start gap-8">
    <div className="self-stretch justify-start text-[#8578AA] text-3xl font-bold font-['Mulish']">Recent Users</div>
    <div className="self-stretch h-96 flex flex-col justify-between items-start">
        <div className="self-stretch px-2.5 py-4 bg-white rounded outline outline-1 outline-offset-[-1px] outline-violet-300 inline-flex justify-between items-center">
            <div className="w-44 flex justify-start items-center gap-3">
                <img className="w-14 h-14 rounded-xl" src="https://placehold.co/60x60" />
                <div className="inline-flex flex-col justify-center items-start gap-1">
                    <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">User Name</div>
                    <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Anika</div>
                </div>
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-1">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">Joining Date</div>
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">9 March, 2025</div>
            </div>
            <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Status</div>
                <div data-property-1="Frame 2147226369" className="w-20 h-7 px-2.5 bg-green-50 inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 text-center justify-start text-green-300 text-base font-normal font-['Mulish']">Active</div>
                </div>
            </div>
        </div>
        <div className="self-stretch px-2.5 py-4 bg-white rounded outline outline-1 outline-offset-[-1px] outline-violet-300 inline-flex justify-between items-center">
            <div className="w-44 flex justify-start items-center gap-3">
                <img className="w-14 h-14 rounded-xl" src="https://placehold.co/60x60" />
                <div className="inline-flex flex-col justify-center items-start gap-1">
                    <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">User Name</div>
                    <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Anika</div>
                </div>
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-1">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">Joining Date</div>
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">9 March, 2025</div>
            </div>
            <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Status</div>
                <div data-property-1="Frame 2147226369" className="w-20 h-7 px-2.5 bg-green-50 inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 text-center justify-start text-green-300 text-base font-normal font-['Mulish']">Active</div>
                </div>
            </div>
        </div>
        <div className="self-stretch px-2.5 py-4 bg-white rounded outline outline-1 outline-offset-[-1px] outline-violet-300 inline-flex justify-between items-center">
            <div className="w-44 flex justify-start items-center gap-3">
                <img className="w-14 h-14 rounded-xl" src="https://placehold.co/60x60" />
                <div className="inline-flex flex-col justify-center items-start gap-1">
                    <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">User Name</div>
                    <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Anika</div>
                </div>
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-1">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Mulish']">Joining Date</div>
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">9 March, 2025</div>
            </div>
            <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-slate-500 text-base font-normal font-['Mulish']">Status</div>
                <div data-property-1="Frame 2147226369" className="w-20 h-7 px-2.5 bg-green-50 inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 text-center justify-start text-green-300 text-base font-normal font-['Mulish']">Active</div>
                </div>
            </div>
        </div>
    </div>
</div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default DashboardHome;
