import React from "react";
import { NavLink } from "react-router-dom";

function Contact() {
  return (
    <div className="w-full h-[280px] bg-[#252525] text-white flex flex-col justify-evenly items-center px-10">
      <div>
        <h1 id="Contact" className="text-center text-3xl font-semibold py-3">
          Contact us
        </h1>
        <h1>
          Get information from here who you become the memeber of our team
        </h1>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="flex justify-center items-center w-[50%] px-5">
          <h1 className="text-4xl font-semibold">
            Join thousands of satisfied students and teachers!
          </h1>
        </div>
        <div className="flex justify-center items-center w-[50%]">
          <button className="rounded-3xl  bg-white text-[#1E90FF] px-[90px] py-2 font-semibold">
            <NavLink to="/register">Create your free account</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
