import React from "react";
import Navbar from "../../parts/Navbar";
import Footer from "../../parts/Footer";
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
