import logo from "../../../src/assets/images/eFishery-logo.png";
import "../../assets/scss/Navbar.scss";

function Navbar() {
  return (
    <nav className="siteNavbar">
      <div className="container-fluid container-lg">
        <div className="siteNavbar__logo">
          <a href="/">
            <img src={logo} alt="eFishery-logo" title="eFishery-logo" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
