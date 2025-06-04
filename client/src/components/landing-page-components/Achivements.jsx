import React from "react";

function Achivements() {
  return (
    <div>
      <div className="w-full h-auto py-7 bg-[#FFFFFF] flex justify-center items-center">
        <div className="w-[80%] h-auto py-5 px-3 bg-[#1E90FF] rounded-xl flex flex-col justify-center items-center gap-6 text-white">
          <div>
            <h1 className="text-center text-3xl font-semibold py-2">
              Our Achievements
            </h1>
            <h1 className="text-lg">
              Get information from here who you become the member of our team
            </h1>
          </div>

          <div className="flex flex-wrap shrink justify-center h-auto grow gap-5 text-black">
            <div className="w-[200px] h-[120px] bg-slate-100 text-2xl font-semibold flex flex-col justify-center items-center gap-2">
              <h1>15K+</h1>
              <h1 className="text-[#1E90FF]">Students</h1>
            </div>

            <div className="w-[200px] h-[120px] bg-slate-100 text-2xl font-semibold flex flex-col justify-center items-center gap-2">
              <h1>50+</h1>
              <h1 className="text-[#1E90FF]">Courses</h1>
            </div>

            <div className="w-[200px] h-[120px] bg-slate-100 text-2xl font-semibold flex flex-col justify-center items-center gap-2">
              <h1>4K+</h1>
              <h1 className="text-[#1E90FF]">Review</h1>
            </div>

            <div className="w-[200px] h-[120px] bg-slate-100 text-2xl font-semibold flex flex-col justify-center items-center gap-2">
              <h1>4.8</h1>
              <h1 className="text-[#1E90FF]">Rating</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achivements;
