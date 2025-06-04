import React from "react";
import Navbar from "../components/landing-page-components/Navbar";
import Home from "../components/landing-page-components/Home";
import About from "../components/landing-page-components/About";
import Footer from "../components/landing-page-components/Footer";
import Contact from "../components/landing-page-components/Contact";
import Features from "../components/landing-page-components/Features";
import Work from "../components/landing-page-components/Work";
import Categories from "../components/landing-page-components/Categories";
import Teachers from "../components/landing-page-components/Teachers";
import Achivements from "../components/landing-page-components/Achivements";
import FAQs from "../components/landing-page-components/FAQs";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Home />
      <Features />
      <Work />
      <Categories />
      <Teachers />
      <Achivements />
      <About />
      <FAQs />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
