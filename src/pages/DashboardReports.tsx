import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const DashboardAnalytics = () => {
  // ✅ FIX: type hover correctly
  const [hover, setHover] = useState<number | null>(null);

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [300, 450, 500, 650, 700, 850],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Returning", "New", "Lost"],
    datasets: [
      {
        label: "Retention",
        data: [60, 30, 10],
        backgroundColor: ["#6610f2", "#198754", "#dc3545"],
      },
    ],
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "linear-gradient(135deg, #111 20%, #222 80%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        className="p-4 mb-4 rounded"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 20px rgba(0,255,255,0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: 700, letterSpacing: 1 }}>📈 Analytics Dashboard</h2>
        <p style={{ opacity: 0.85 }}>Visualize user growth, conversions & retention trends</p>
      </div>

      {/* Cards */}
      <div className="row g-4 mb-4">
        {[
          { name: "Total Users", stat: 1250, color: "#0d6efd" },
          { name: "Conversion Rate", stat: "5.3%", color: "#198754" },
          { name: "Retention Rate", stat: "68%", color: "#6610f2" },
        ].map((item, i) => (
          <div className="col-md-4" key={i}>
            <div
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border:
                  hover === i ? `2px solid ${item.color}` : "2px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 24,
                boxShadow:
                  hover === i ? `0 0 20px ${item.color}` : "0 4px 12px rgba(0,0,0,0.4)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <h5 style={{ color: item.color }}>{item.name}</h5>
              <h2>{item.stat}</h2>
              <small className="text-light">as of today</small>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div
            className="p-4 rounded"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 15px rgba(0,255,255,0.2)",
            }}
          >
            <h5 style={{ marginBottom: 16, color: "#0d6efd" }}>User Growth Over Time</h5>
            <Line data={lineData} />
          </div>
        </div>

        <div className="col-lg-4">
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
            <Bar data={barData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 text-center text-muted">
        <small>🚀 Analytics generated on {new Date().toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
