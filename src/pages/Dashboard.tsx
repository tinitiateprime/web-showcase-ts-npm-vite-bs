import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaBell,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f1f2f6";
    return () => {
      document.body.style.background = "";
    };
  }, [darkMode]);

  const stats = [
    { label: "Products", value: 128, icon: <FaBox />, color: "#ff5722" },
    { label: "Users", value: 542, icon: <FaUsers />, color: "#9c27b0" },
    { label: "Orders", value: 87, icon: <FaShoppingCart />, color: "#4caf50" },
    { label: "Revenue", value: "₹12,34,567", icon: <FaMoneyBillWave />, color: "#ffc107" },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 15, 22, 28, 35],
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  const notifications = [
    "3 new orders pending approval",
    "User John signed up",
    "Stock for Laptop 12 is low",
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: darkMode
            ? "linear-gradient(180deg, #333, #111)"
            : "linear-gradient(180deg,rgb(138, 42, 131), #512da8)",
          color: "white",
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        <h4 className="mb-4" style={{ letterSpacing: 1 }}>My Dashboard</h4>
        <ul className="list-unstyled">
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <FaHome className="me-2" /> Home
          </li>
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/reports")}>
            <FaChartBar className="me-2" /> Reports
          </li>
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/settings")}>
            <FaCog className="me-2" /> Settings
          </li>
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => alert("Logging out...")}>
            <FaSignOutAlt className="me-2" /> Logout
          </li>
          <li
            className="mt-4"
            style={{ cursor: "pointer" }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}{" "}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ color: darkMode ? "white" : "black" }}>
        {/* Header */}
        <div
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #222, #444)"
              : "linear-gradient(135deg, #ff5722, #e91e63)",
            borderRadius: "12px",
            color: "white",
            padding: "1rem 2rem",
            marginBottom: "2rem",
          }}
        >
          <h2>Dashboard</h2>
          <p>Professional admin panel with charts, sidebar, notifications, dark mode</p>
        </div>

        {/* Stat cards */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div
                className="text-center p-4 shadow"
                style={{
                  background: darkMode ? "#222" : "white",
                  borderTop: `5px solid ${stat.color}`,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ fontSize: "2.5rem", color: stat.color }}>{stat.icon}</div>
                <h4 className="mt-2">{stat.value}</h4>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="shadow rounded p-4 mb-4" style={{ background: darkMode ? "#222" : "white" }}>
          <h5 className="mb-3">Sales Overview</h5>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Notifications */}
        <div className="shadow rounded p-4" style={{ background: darkMode ? "#222" : "white" }}>
          <h5 className="mb-3">
            <FaBell className="me-2" />
            Notifications
          </h5>
          <ul>
            {notifications.map((n, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
