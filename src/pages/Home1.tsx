import React, { useState } from "react";
import { Rocket, Shield, Layers, Users, Cloud, Zap } from "lucide-react";

const Home1: React.FC = () => {
  const [dark, setDark] = useState(false);

  const features = [
    {
      icon: <Rocket size={32} />,
      title: "Rapid Learning",
      desc: "Accelerate your skills with top courses",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Platform",
      desc: "Enterprise-grade data protection",
    },
    {
      icon: <Layers size={32} />,
      title: "Modular Design",
      desc: "Build your learning path your way",
    },
    {
      icon: <Users size={32} />,
      title: "Global Community",
      desc: "Connect with peers worldwide",
    },
    {
      icon: <Cloud size={32} />,
      title: "Cloud Access",
      desc: "Access from any device, anytime",
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      desc: "Smooth, high-performance experience",
    },
  ];

  return (
    <div
      className={`min-vh-100 ${
        dark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container py-5">
        {/* Dark mode toggle */}
        <div className="d-flex justify-content-end mb-3">
          <button
            onClick={() => setDark((prev) => !prev)}
            className="btn btn-outline-primary"
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Hero */}
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold mb-3">🚀 Welcome to Home1</h1>
          <p className="lead">
            Your one-stop hub for advanced learning, community, and
            professional growth.
          </p>
          <button className="btn btn-primary btn-lg mt-3">Get Started</button>
        </div>

        {/* Features */}
        <div className="row mt-5 g-4">
          {features.map((f, idx) => (
            <div className="col-md-4" key={idx}>
              <div
                className="card h-100 border-0 shadow rounded text-center p-3"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="mb-2 text-primary">{f.icon}</div>
                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted small">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="mt-5 p-5 rounded text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,110,253,0.8), rgba(0,123,255,0.7))",
            color: "#fff",
          }}
        >
          <h2 className="fw-bold mb-3">🌟 Ready to take the next step?</h2>
          <p className="mb-3">
            Join thousands of learners building a brighter future today.
          </p>
          <button className="btn btn-light btn-lg text-primary fw-bold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home1;
