import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { FaFileDownload, FaEye, FaFileAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

const Reports = () => {
  const [hoverCard, setHoverCard] = useState(null);

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Conversions",
        data: [120, 150, 180, 160, 200, 250],
        borderColor: "#00ffff",
        backgroundColor: "rgba(0,255,255,0.1)",
        tension: 0.4,
      },
    ],
  };

  const donutData = {
    labels: ["Returning", "New"],
    datasets: [
      {
        label: "Customer Retention",
        data: [65, 35],
        backgroundColor: ["#0d6efd", "#6610f2"],
      },
    ],
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "linear-gradient(135deg, #111 20%, #222 80%)",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        className="p-4 mb-4 rounded"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 20px rgba(0,255,255,0.3)",
        }}
      >
        <h2 style={{ fontWeight: 700, letterSpacing: 1 }}>📊 Reports Dashboard</h2>
        <p className="mb-0">Unique visual analytics for conversions & retention</p>
      </div>

      {/* CARDS */}
      <div className="row g-4">
        {[
          { title: "Monthly Overview", desc: "Detailed monthly data report" },
          { title: "Conversion Rate", desc: "Trends and patterns" },
          { title: "Retention Analysis", desc: "Returning customers data" },
        ].map((card, i) => (
          <div
            key={i}
            className="col-md-4"
            onMouseEnter={() => setHoverCard(i)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <div
              className="p-4 rounded"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: hoverCard === i ? "2px solid #0d6efd" : "2px solid rgba(255,255,255,0.1)",
                boxShadow: hoverCard === i
                  ? "0 0 20px rgba(0,123,255,0.5)"
                  : "0 4px 15px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                cursor: "pointer"
              }}
            >
              <h5 className="mb-2" style={{ color: "#00ffff" }}>{card.title}</h5>
              <p style={{ opacity: 0.85 }}>{card.desc}</p>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-info btn-sm">
                  <FaEye className="me-1" /> View
                </button>
                <button className="btn btn-outline-success btn-sm">
                  <FaFileDownload className="me-1" /> Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row g-4 mt-4">
        <div className="col-md-8">
          <div
            className="p-4 rounded"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 15px rgba(0,255,255,0.2)",
            }}
          >
            <h5 style={{ marginBottom: 16, color: "#0d6efd" }}>Conversion Trends</h5>
            <Line data={lineData} />
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-4 rounded"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 15px rgba(255,0,255,0.2)",
            }}
          >
            <h5 style={{ marginBottom: 16, color: "#6610f2" }}>Customer Retention</h5>
            <Doughnut data={donutData} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-5 text-center text-muted">
        <small>🚀 Generated insights as of {new Date().toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default Reports;
