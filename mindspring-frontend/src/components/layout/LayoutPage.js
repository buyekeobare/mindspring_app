import React from "react";
import UpperToolbar from "../homepage/UpperToolbar";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <UpperToolbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;