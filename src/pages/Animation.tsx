import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLeaf, FaBrain, FaSmile, FaMoon, FaSun } from "react-icons/fa";

const features = [
  { icon: <FaLeaf />, title: "Organic Effects", desc: "Natural motion curves and timing." },
  { icon: <FaBrain />, title: "Smart Triggers", desc: "Scroll-based logic & view detection." },
  { icon: <FaSmile />, title: "UI Delight", desc: "Hover-friendly joyful animations." },
];

const SplitAnimationPage = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div
      className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}
      style={{
        minHeight: "100vh",
        paddingTop: 80,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG floating blobs */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: "absolute",
          top: "-50px",
          right: "-60px",
          width: "200px",
          height: "200px",
          background: "#0dcaf0",
          borderRadius: "50%",
          opacity: 0.15,
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "180px",
          height: "180px",
          background: "#6610f2",
          borderRadius: "50%",
          opacity: 0.12,
          zIndex: 0,
        }}
      />

      <Container fluid>
        <Row className="align-items-center" style={{ position: "relative", zIndex: 1 }}>
          {/* Left column with staggered features */}
          <Col md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.25,
                  },
                },
              }}
            >
              <motion.h1
                className="fw-bold text-primary mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                ✨ Modern Animation UX
              </motion.h1>
              <motion.p
                className="text-muted mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                A fresh design split page with motion visual logic, hover joy, and dynamic visual focus.
              </motion.p>

              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="mb-4 p-3 rounded shadow-sm"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 fs-5">
                    <span className="text-info">{f.icon}</span>
                    <div>
                      <strong>{f.title}</strong>
                      <p className="text-muted mb-0 small">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Button
                  variant={theme === "dark" ? "light" : "dark"}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}
                  Toggle Theme
                </Button>
              </motion.div>
            </motion.div>
          </Col>

          {/* Right animated image/preview */}
          <Col md={6} className="text-center mt-5 mt-md-0">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #212529, #343a40)"
                    : "linear-gradient(135deg, #ffffff, #f8f9fa)",
                borderRadius: "25px",
                padding: "40px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              }}
            >
              <motion.div
                animate={{ rotateY: [0, 180, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  perspective: "1000px",
                }}
              >
                <img
                  src="https://source.unsplash.com/400x300/?technology,animation"
                  alt="Animation"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%", transformStyle: "preserve-3d" }}
                />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SplitAnimationPage;
