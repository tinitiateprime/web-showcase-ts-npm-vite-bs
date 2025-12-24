import { useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeftSidebar = () => {
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [comparisonDropdownOpen, setComparisonDropdownOpen] = useState(false);

  const dropdownStyle: React.CSSProperties = {
    cursor: "pointer",
    color: "white",
    backgroundColor: "rgba(255,255,255,0.1)",
    transition: "background 0.3s",
    textDecoration: "none",
  };

  const hoverStyle =
    (isEnter: boolean) =>
    (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = isEnter
        ? "rgba(255,255,255,0.3)"
        : "rgba(255,255,255,0.1)";
    };

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #3498db, #2c3e50)",
        color: "white",
      }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src="/favicon_new.png"
          alt="Logo"
          className="img-fluid rounded-circle"
          style={{ maxWidth: "100px", border: "2px solid white" }}
        />
      </div>

      <nav className="nav flex-column">
        {/* Home Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setHomeDropdownOpen((v) => !v)}
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          🏠 Home ▾
        </div>
        {homeDropdownOpen && (
          <div className="ms-3">
            <Link to="/" className="nav-link text-white py-1">
              🏠 Main Home
            </Link>
            <Link to="/home1" className="nav-link text-white py-1">
              🏡 Home 1
            </Link>
            <Link to="/home2" className="nav-link text-white py-1">
              🚀 Home 2
            </Link>
          </div>
        )}

        {/* Profile Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setProfileDropdownOpen((v) => !v)}
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          👤 Profile ▾
        </div>
        {profileDropdownOpen && (
          <div className="ms-3">
            <Link to="/profile" className="nav-link text-white py-1">
              👤 My Profile
            </Link>
            <Link to="/editprofile" className="nav-link text-white py-1">
              ✏️ Edit Profile
            </Link>
          </div>
        )}

        {/* Login */}
        <Link
          to="/login"
          className="nav-link px-3 py-2 mb-2 rounded"
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          🔑 Login
        </Link>

        {/* Signup */}
        <Link
          to="/signup"
          className="nav-link px-3 py-2 mb-2 rounded"
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          📝 Signup
        </Link>

        {/* Catalog */}
        <Link
          to="/catalog"
          className="nav-link px-3 py-2 mb-2 rounded"
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          📚 Catalog
        </Link>

        {/* Services Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setServicesDropdownOpen((v) => !v)}
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          🛠 Services ▾
        </div>
        {servicesDropdownOpen && (
          <div className="ms-3">
            <Link to="/services" className="nav-link text-white py-1">
              🛠 Main Services
            </Link>
            <Link to="/services1" className="nav-link text-white py-1">
              ⚙️ Service 1
            </Link>
          </div>
        )}

        {/* Comparison Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setComparisonDropdownOpen((v) => !v)}
          style={dropdownStyle}
          onMouseEnter={hoverStyle(true)}
          onMouseLeave={hoverStyle(false)}
        >
          📊 Comparison ▾
        </div>
        {comparisonDropdownOpen && (
          <div className="ms-3">
            <Link to="/comparison" className="nav-link text-white py-1">
              📊 Main Comparison
            </Link>
            <Link to="/comparison1" className="nav-link text-white py-1">
              📑 Comparison 1
            </Link>
            <Link to="/comparison2" className="nav-link text-white py-1">
              📈 Comparison 2
            </Link>
          </div>
        )}

        {/* Standalone Other Links */}
        {[
          ["/search", "🔍 Search"],
          ["/comparisontable", "📑 Comparison Table"],
          ["/forms", "📝 Forms"],
          ["/datatable", "📋 Data Tables"],
          ["/infographics", "📈 Infographics"],
          ["/audio", "🎵 Audio"],
          ["/video", "🎬 Video"],
          ["/animation", "🎞️ Animation"],
          ["/dragdrop", "🖱️ Drag & Drop"],
          ["/editor", "✏️ Online Editor"],
          ["/shoppingcart", "🛒 Shopping Cart"],
          ["/calendar", "📅 Calendar"],
          ["/dashboard", "📊 Dashboard"],
          ["/dashboard/analytics", "📈 Analytics"],
          ["/security", "🔒 Security"],
          ["/contact", "📞 Contact"],
          ["/help", "❓ Help"],
        ].map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="nav-link px-3 py-2 mb-2 rounded"
            style={dropdownStyle}
            onMouseEnter={hoverStyle(true)}
            onMouseLeave={hoverStyle(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;
