import React from "react";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 px-6 py-12 md:px-16 lg:px-24">
      <div className="text-center mb-10">
        <h1 id="About" className="text-4xl font-bold text-gray-800 md:text-5xl">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how you can join our team and become part of our mission.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-between gap-12">
        <div className="flex flex-col items-start gap-6 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            SkillSkout: Empowering Students Worldwide
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Install our top-rated dropshipping app to your e-commerce site and
            get access to US Suppliers, AliExpress vendors, and the best
            dropshipping and custom products. Start selling the right products
            to the customer base that you know best. We connect you to
            inventory, so you can focus on creating a catalog of profitable
            products for your online store.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Install our top-rated dropshipping app to your e-commerce site and
            get access to US Suppliers, AliExpress vendors, and the best
            dropshipping and custom products. Start selling the right products
            to the customer base that you know best. We connect you to
            inventory.
          </p>
          <NavLink to="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
              Join Us
            </button>
          </NavLink>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md rounded-2xl shadow-lg"
            src="pic.png"
            alt="SkillSkout illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
