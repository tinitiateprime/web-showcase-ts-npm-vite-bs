import { useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaRocket,
  FaBolt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

type FeatureRow = {
  feature: string;
  productA: boolean;
  productB: boolean;
};

const features: FeatureRow[] = [
  { feature: "Speed Optimization", productA: true, productB: false },
  { feature: "AI Integration", productA: true, productB: true },
  { feature: "Multi-language Support", productA: false, productB: true },
  { feature: "Custom Themes", productA: true, productB: true },
  { feature: "24/7 Support", productA: false, productB: true },
];

const Comparison2 = () => {
  // Add animated background on mount
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      body {
        background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        background-size: 400% 400%;
        animation: bgMove 15s ease infinite;
        min-height: 100vh;
      }
      @keyframes bgMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleEl);

    // ✅ IMPORTANT: cleanup returns void (not styleEl)
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const glassStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const hoverStyle: React.CSSProperties = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    Object.assign(e.currentTarget.style, hoverStyle);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    Object.assign(e.currentTarget.style, {
      transform: "none",
      boxShadow: "none",
    });
  };

  return (
    <div className="container mt-5 text-white">
      {/* Header */}
      <div className="p-4 rounded mb-4 shadow-lg" style={glassStyle}>
        <h2 className="mb-1">
          <FaRocket className="me-2 text-warning" />
          Advanced Feature Comparison
        </h2>
        <small>Compare the latest versions of Product A and Product B</small>
      </div>

      {/* Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div
            className="card h-100 shadow border-primary"
            style={glassStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Product A <FaBolt className="ms-2" />
              </h5>
            </div>
            <div className="card-body">
              <p>General user-friendly solution at a great price.</p>
              <p className="text-success">
                <FaStar className="me-2" />
                Budget-friendly
              </p>
              <p className="text-danger">
                <FaTimesCircle className="me-2" />
                No premium support
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div
            className="card h-100 shadow border-success"
            style={glassStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                Product B <FaStar className="ms-2 text-warning" />
              </h5>
            </div>
            <div className="card-body">
              <p>Enterprise-ready tools for advanced users & businesses.</p>
              <p className="text-success">
                <FaCheckCircle className="me-2" />
                AI Enabled
              </p>
              <p className="text-success">
                <FaCheckCircle className="me-2" />
                Global 24/7 Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="table-responsive shadow rounded" style={glassStyle}>
        <table className="table table-striped table-bordered text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th>Feature</th>
              <th>Product A</th>
              <th>Product B</th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, index) => (
              <tr key={index}>
                <td className="fw-bold">{item.feature}</td>
                <td>
                  {item.productA ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-danger" />
                  )}
                </td>
                <td>
                  {item.productB ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-danger" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-muted text-center">
        <small>✨ Hover over the cards for dynamic effects!</small>
      </div>
    </div>
  );
};

export default Comparison2;
