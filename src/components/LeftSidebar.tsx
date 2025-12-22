import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeftSidebar = () => {
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [comparisonDropdownOpen, setComparisonDropdownOpen] = useState(false);

  const dropdownStyle = {
    cursor: "pointer",
    color: "white",
    backgroundColor: "rgba(255,255,255,0.1)",
    transition: "background 0.3s",
  };

  const hoverStyle = (e: React.MouseEvent, isEnter: boolean) => {
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
          onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
          style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)}
          onMouseLeave={(e) => hoverStyle(e, false)}
        >
          🏠 Home ▾
        </div>
        {homeDropdownOpen && (
          <div className="ms-3">
            <Link to="/" className="nav-link text-white py-1">🏠 Main Home</Link>
            <Link to="/home1" className="nav-link text-white py-1">🏡 Home 1</Link>
            <Link to="/home2" className="nav-link text-white py-1">🚀 Home 2</Link>
          </div>
        )}

        {/* Profile Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)}
          onMouseLeave={(e) => hoverStyle(e, false)}
        >
          👤 Profile ▾
        </div>
        {profileDropdownOpen && (
          <div className="ms-3">
            <Link to="/profile" className="nav-link text-white py-1">👤 My Profile</Link>
            <Link to="/editprofile" className="nav-link text-white py-1">✏️ Edit Profile</Link>
          </div>
        )}

        {/* Login */}
        <Link to="/login" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🔑 Login
        </Link>

        {/* Signup */}
        <Link to="/signup" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📝 Signup
        </Link>

        {/* Catalog */}
        <Link to="/catalog" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📚 Catalog
        </Link>

        {/* Services Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
          style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)}
          onMouseLeave={(e) => hoverStyle(e, false)}
        >
          🛠 Services ▾
        </div>
        {servicesDropdownOpen && (
          <div className="ms-3">
            <Link to="/services" className="nav-link text-white py-1">🛠 Main Services</Link>
            <Link to="/services1" className="nav-link text-white py-1">⚙️ Service 1</Link>
          </div>
        )}

        {/* Comparison Dropdown */}
        <div
          className="nav-link px-3 py-2 mb-2 rounded"
          onClick={() => setComparisonDropdownOpen(!comparisonDropdownOpen)}
          style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)}
          onMouseLeave={(e) => hoverStyle(e, false)}
        >
          📊 Comparison ▾
        </div>
        {comparisonDropdownOpen && (
          <div className="ms-3">
            <Link to="/comparison" className="nav-link text-white py-1">📊 Main Comparison</Link>
            <Link to="/comparison1" className="nav-link text-white py-1">📑 Comparison 1</Link>
            <Link to="/comparison2" className="nav-link text-white py-1">📈 Comparison 2</Link>
          </div>
        )}

        {/* Standalone Other Links */}
        <Link to="/search" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🔍 Search
        </Link>
        <Link to="/comparisontable" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📑 Comparison Table
        </Link>
        <Link to="/forms" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📝 Forms
        </Link>
        <Link to="/datatable" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📋 Data Tables
        </Link>
        <Link to="/infographics" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📈 Infographics
        </Link>
        <Link to="/audio" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🎵 Audio
        </Link>
        <Link to="/video" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🎬 Video
        </Link>
        <Link to="/animation" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🎞️ Animation
        </Link>
        <Link to="/dragdrop" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🖱️ Drag & Drop
        </Link>
        <Link to="/editor" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          ✏️ Online Editor
        </Link>
        <Link to="/shoppingcart" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🛒 Shopping Cart
        </Link>
        <Link to="/calendar" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📅 Calendar
        </Link>
        <Link to="/dashboard" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📊 Dashboard
        </Link>
        <Link to="/dashboard/analytics" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📈 Analytics
        </Link>
        <Link to="/security" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          🔒 Security
        </Link>
        <Link to="/contact" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          📞 Contact
        </Link>
        <Link to="/help" className="nav-link px-3 py-2 mb-2 rounded" style={dropdownStyle}
          onMouseEnter={(e) => hoverStyle(e, true)} onMouseLeave={(e) => hoverStyle(e, false)}>
          ❓ Help
        </Link>
      </nav>
    </div>
  );
};

export default LeftSidebar;
