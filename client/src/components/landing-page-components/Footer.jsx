import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col items-center px-6 py-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row md:justify-between w-full max-w-7xl gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-4 max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight">SkillSkout</h1>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed aliqua.
            Ut enim ad d
          </p>
          <NavLink>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors">
              Contact us
            </button>
          </NavLink>
        </div>

        <div className="flex flex-col items-start gap-3 text-base">
          <h1 className="text-xl font-bold tracking-tight">Company</h1>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            About us
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Service
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Community
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Testimonial
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 text-base">
          <h1 className="text-xl font-bold tracking-tight">Links</h1>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Courses
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Become A Teacher
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Services
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            All in One
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 text-base">
          <h1 className="text-xl font-bold tracking-tight">Support</h1>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Help Center
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Webnier
          </p>
          <p className="hover:text-blue-200 cursor-pointer transition-colors">
            Feedback
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 text-base">
          <h1 className="text-xl font-bold tracking-tight">Contact Us</h1>
          <p>+1(555)123-4357</p>
          <p>etechinfo@gmail.com</p>
        </div>
      </div>
      <hr className="w-full max-w-7xl border-blue-400 my-8" />
      <div className="text-lg font-medium">
        Copyright &copy; 2025 All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
