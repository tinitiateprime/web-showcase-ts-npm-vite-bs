// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { FaUserFriends, FaShoppingBag, FaWallet, FaChartArea, FaBell } from "react-icons/fa";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const DashboardAnalytics = () => {
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setNotification("📢 New analytics data available!");
//     }, 2000);
//     setTimeout(() => {
//       setNotification(null);
//     }, 6000);
//   }, []);

//   const stats = [
//     { label: "Active Users", value: 560, icon: <FaUserFriends />, color: "#00e676" },
//     { label: "Sales", value: 180, icon: <FaShoppingBag />, color: "#ff9100" },
//     { label: "Earnings", value: "₹7,80,000", icon: <FaWallet />, color: "#00b0ff" },
//   ];

//   const metrics = [
//     { label: "User Growth", progress: 80, color: "#4caf50" },
//     { label: "Conversion Rate", progress: 65, color: "#f44336" },
//     { label: "Customer Retention", progress: 90, color: "#2196f3" },
//   ];

//   const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "User Growth",
//         data: [120, 190, 300, 250, 320, 400],
//         fill: false,
//         borderColor: "#00e676",
//         tension: 0.4,
//       },
//       {
//         label: "Conversion Rate",
//         data: [30, 45, 60, 55, 70, 80],
//         fill: false,
//         borderColor: "#f44336",
//         tension: 0.4,
//       },
//       {
//         label: "Customer Retention",
//         data: [50, 60, 65, 70, 75, 85],
//         fill: false,
//         borderColor: "#2196f3",
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, labels: { color: "#fff" } },
//       title: { display: true, text: "Key Metrics Over Time", color: "#fff" },
//     },
//     scales: {
//       x: { ticks: { color: "#fff" } },
//       y: { ticks: { color: "#fff" } },
//     },
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(120deg, #212121, #000000)",
//         color: "white",
//         padding: "2rem",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* animated background */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           background: "linear-gradient(270deg, #ff4081, #7c4dff, #448aff, #00e676)",
//           backgroundSize: "800% 800%",
//           animation: "gradientShift 20s ease infinite",
//           opacity: 0.15,
//           zIndex: 0,
//         }}
//       ></div>

//       {/* toast notification */}
//       {notification && (
//         <div
//           style={{
//             position: "fixed",
//             top: 20,
//             right: 20,
//             background: "#333",
//             color: "white",
//             padding: "1rem 1.5rem",
//             borderRadius: 10,
//             boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
//             zIndex: 9999,
//             display: "flex",
//             alignItems: "center",
//             gap: "0.5rem",
//           }}
//         >
//           <FaBell color="#ffc107" /> {notification}
//         </div>
//       )}

//       {/* glass header */}
//       <div
//         style={{
//           backdropFilter: "blur(12px)",
//           background: "rgba(255,255,255,0.05)",
//           borderRadius: "20px",
//           padding: "2rem",
//           textAlign: "center",
//           zIndex: 1,
//           position: "relative",
//           border: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <h1 style={{ fontWeight: 700, letterSpacing: 1 }}>📊 Dashboard Analytics</h1>
//         <p style={{ opacity: 0.8 }}>Multi-metric advanced tracking</p>
//       </div>

//       {/* stat cards */}
//       <div className="row g-4 mt-4" style={{ position: "relative", zIndex: 1 }}>
//         {stats.map((s, i) => (
//           <div className="col-lg-4 col-md-6" key={i}>
//             <div
//               style={{
//                 background: "rgba(255,255,255,0.1)",
//                 backdropFilter: "blur(8px)",
//                 borderRadius: "16px",
//                 padding: "1.5rem",
//                 textAlign: "center",
//                 border: `1px solid ${s.color}`,
//                 color: "#fff",
//                 transition: "all 0.4s ease",
//                 cursor: "pointer",
//                 boxShadow: `0 0 20px ${s.color}`,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.boxShadow = `0 0 40px ${s.color}`;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.boxShadow = `0 0 20px ${s.color}`;
//               }}
//             >
//               <div style={{ fontSize: "2rem", color: s.color }}>{s.icon}</div>
//               <h3 style={{ marginTop: "0.5rem", fontWeight: 600 }}>{s.value}</h3>
//               <p>{s.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* advanced metrics progress bars */}
//       <div
//         style={{
//           marginTop: "2rem",
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(10px)",
//           borderRadius: "20px",
//           padding: "2rem",
//           zIndex: 1,
//           position: "relative",
//           border: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <h3>📈 Advanced Metrics</h3>
//         {metrics.map((m, i) => (
//           <div key={i} style={{ marginBottom: "1rem" }}>
//             <div style={{ fontSize: "0.9rem", marginBottom: 4 }}>{m.label}</div>
//             <div
//               style={{
//                 height: 10,
//                 width: "100%",
//                 borderRadius: 5,
//                 background: "#555",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${m.progress}%`,
//                   height: "100%",
//                   background: m.color,
//                   borderRadius: 5,
//                   transition: "width 0.6s ease",
//                 }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* combined graph */}
//       <div
//         style={{
//           marginTop: "2rem",
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(10px)",
//           borderRadius: "16px",
//           padding: "2rem",
//           zIndex: 1,
//           position: "relative",
//           border: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <Line data={chartData} options={chartOptions} />
//       </div>

//       <style>
//         {`
//           @keyframes gradientShift {
//             0% {background-position: 0% 50%;}
//             50% {background-position: 100% 50%;}
//             100% {background-position: 0% 50%;}
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DashboardAnalytics;



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
  const [hover, setHover] = useState(null);

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
                border: hover === i ? `2px solid ${item.color}` : "2px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 24,
                boxShadow:
                  hover === i
                    ? `0 0 20px ${item.color}`
                    : "0 4px 12px rgba(0,0,0,0.4)",
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
