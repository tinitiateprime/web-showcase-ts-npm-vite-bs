import { Line, Bar } from "react-chartjs-2";
import { useState } from "react";
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
  Filler,
  LineController,
  BarController,
  type ChartData,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  LineController,
  BarController
);

const DashboardAnalytics = () => {
  const [hover, setHover] = useState<number | null>(null);

  const lineData: ChartData<"line"> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [300, 450, 500, 650, 700, 850],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true } },
    },
  };

  const barData: ChartData<"bar"> = {
    labels: ["Returning", "New", "Lost"],
    datasets: [
      {
        label: "Retention",
        data: [60, 30, 10],
        backgroundColor: ["#6610f2", "#198754", "#dc3545"],
        borderRadius: 10,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true }, beginAtZero: true, max: 100 },
    },
  };

  const stats = [
    { name: "Total Users", stat: 1250, color: "#0d6efd" },
    { name: "Conversion Rate", stat: "5.3%", color: "#198754" },
    { name: "Retention Rate", stat: "68%", color: "#6610f2" },
  ] as const;

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "linear-gradient(135deg, #111 20%, #222 80%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
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

      <div className="row g-4 mb-4">
        {stats.map((item, i) => (
          <div className="col-md-4" key={i}>
            <div
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: hover === i ? `2px solid ${item.color}` : "2px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 24,
                boxShadow: hover === i ? `0 0 20px ${item.color}` : "0 4px 12px rgba(0,0,0,0.4)",
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

            {/* height wrapper to avoid Chart stretching issues */}
            <div style={{ height: 320 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
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

            <div style={{ height: 320 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-muted">
        <small>🚀 Analytics generated on {new Date().toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
