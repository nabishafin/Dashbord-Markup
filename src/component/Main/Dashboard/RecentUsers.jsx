const RecentUsers = () =>{

    return (
        <>
        <div className="">
            <div className="w-[624px] h-[473px] p-6 bg-white rounded-xl shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-[#8578AA] text-3xl font-bold font-['Mulish']">
                Recent Users
              </div>
              <div className="self-stretch h-96 flex flex-col justify-between items-start">
                <div className="self-stretch px-2.5 py-4 bg-[#FEFCFF] rounded outline outline-1 outline-offset-[-1px] outline-violet-300 inline-flex justify-between items-center">
                  <div className="w-44 flex justify-start items-center gap-3 bg-cover">
                    <img
                      className="w-16 h-16 rounded-xl object-cover"
                      src="https://inclusive.sakibahmad.com/uploads/users/mainUser.png"
                    />
                    <div className="inline-flex flex-col justify-center items-start gap-1">
                      <div className="justify-start text-[#8578AA] text-sm font-normal font-['Mulish']">
                        User Name
                      </div>
                      <div className="justify-start text-[#8578AA] text-base font-normal font-['Mulish']">
                        Anika
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col justify-center items-start gap-1">
                    <div className="justify-start text-[#8578AA] text-sm font-normal font-['Mulish']">
                      Joining Date
                    </div>
                    <div className="justify-start text-[#8578AA] text-base font-normal font-['Mulish']">
                      9 March, 2025
                    </div>
                  </div>
                  <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                    <div className="justify-start text-[#8578AA] text-base font-normal font-['Mulish']">
                      Status
                    </div>
                    <div
                      data-property-1="Frame 2147226369"
                      className="w-20 h-7 px-2.5 bg-[#f2f9f3] inline-flex justify-center items-center gap-2.5"
                    >
                      <div className="flex-1 text-center justify-start text-[#81c784] text-base font-normal font-['Mulish']">
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default RecentUsers;