import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Comparison1 = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const selectedIds = JSON.parse(localStorage.getItem("selectedIds") || "[]");
    const filtered = allProducts.filter((p) => selectedIds.includes(p.id));
    setSelectedProducts(filtered);
  }, []);

  if (selectedProducts.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h3>No products selected. Please go back to catalog.</h3>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 10,
            border: "none",
            background: "#007bff",
            color: "white",
          }}
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{
        background: "linear-gradient(120deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 className="text-center fw-bold mb-4">Selected Product Comparison</h1>
      <div className="row g-4">
        {selectedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="col-md-4"
            whileHover={{ scale: 1.05, rotateX: 4, rotateY: 4 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div
              className="card shadow-lg"
              style={{
                borderRadius: "2rem",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                overflow: "hidden",
                color: "white",
              }}
            >
              <div
                className="card-header text-center fw-bold fs-4"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  borderTopLeftRadius: "2rem",
                  borderTopRightRadius: "2rem",
                }}
              >
                {product.name}
              </div>
              <div className="card-body text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                  }}
                />
                <h5>{product.specs}</h5>
                <div
                  style={{
                    color: "#0f0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                  }}
                >
                  {product.price}
                </div>
              </div>
              <div className="card-footer text-center bg-transparent border-0">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#ffdd00",
                    color: "#000",
                    boxShadow: "0 0 25px #ffdd00",
                  }}
                  className="btn btn-outline-light"
                  style={{
                    borderRadius: "30px",
                    borderColor: "#ffdd00",
                    fontWeight: "bold",
                    transition: "all 0.4s ease",
                    boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                  }}
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/")}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "none",
            background: "#007bff",
            color: "white",
          }}
        >
          Back to Catalog
        </button>
      </div>
    </div>
  );
};

export default Comparison1;
