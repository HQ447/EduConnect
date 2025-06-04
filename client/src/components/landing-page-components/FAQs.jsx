import React from "react";

function FAQs() {
  return (
    <div>
      <div className="w-full h-auto px-12 py-12 flex flex-col justify-center gap-6 items-center bg-white">
        <div>
          <h1 className="text-center text-3xl font-semibold py-2">
            Frequently Asked Questions (FAQs)
          </h1>
          <h1 className="text-center">
            Install our top-rated dropshipping app to your e-commerce site and
            get access to US Suppliers, AliExpress vendors, and the best.
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* {FAQs.map((e, index) => (
            <div
              key={index}
              className="w-[450px] h-[110px] px-5 py-2 rounded-md bg-white shadow-[0px_4px_20px_#2626261F]"
            >
              <h1>{e.Question}</h1>
              <h1>{e.Answer}</h1>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
