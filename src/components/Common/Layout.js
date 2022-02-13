import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../assets/scss/Layout.scss";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="layout__container">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
