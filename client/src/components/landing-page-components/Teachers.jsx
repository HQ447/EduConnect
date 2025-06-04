import React from "react";

export default function Teachers() {
  return (
    <div>
      <div className="w-full h-auto flex flex-col items-center gap-8 py-10 bg-white">
        <h1 className="text-center text-3xl font-semibold py-2">
          Teacher Showcase
        </h1>
        <div className="h-auto flex flex-1 flex-wrap justify-center items-center gap-5">
          {/* {Popular_Teachers.filter((e) => e.Popular == true).map((e, index) => (
            <div
              key={index}
              className="flex flex-col  items-center  shadow-[0px_4px_20px_#2626261F] gap-5 w-[350px] rounded-xl px-5 h-[370px] py-5 bg-white"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <img
                    className="w-32 h-32 rounded-[100%]"
                    src={e.image}
                    alt="img"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[20px] font-semibold">{e.name}</h1>
                    <h1 className="text-[15px] font-semibold">{e.Category}</h1>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-24">
                <h1>{e.Subject}</h1>
                <h1>{e.City}</h1>
              </div>
              <p className="text-center text-[#A5A5A5]">{e.Description}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
