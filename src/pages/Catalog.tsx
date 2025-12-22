import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const generateProducts = (count = 50) => {
  const names = [
    "Laptop", "Phone", "Camera", "Tablet", "Speaker",
    "Watch", "Monitor", "Keyboard", "Mouse", "Drone"
  ];
  const specsList = [
    "8GB RAM", "16GB RAM", "256GB SSD", "512GB SSD",
    "4K Display", "Touchscreen", "Wireless", "GPS",
    "Heart Rate", "Waterproof"
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/200/150`,
    specs: `${specsList[i % specsList.length]}, ${specsList[(i + 3) % specsList.length]}`,
    price: (Math.floor((i + 1) * 1000) + 10000).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    }),
  }));
};

const CatalogPage = () => {
  const [products] = useState(() => {
    const existing = localStorage.getItem("products");
    if (existing) return JSON.parse(existing);
    const newProducts = generateProducts();
    localStorage.setItem("products", JSON.stringify(newProducts));
    return newProducts;
  });

  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = localStorage.getItem("selectedIds");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  // calculate price range dynamically
  const minPrice = Math.min(...products.map(p => parseInt(p.price.replace(/[^\d]/g, ""))));
  const maxPrice = Math.max(...products.map(p => parseInt(p.price.replace(/[^\d]/g, ""))));
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((p) => {
    const numericPrice = parseInt(p.price.replace(/[^\d]/g, ""));
    return (
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)) &&
      numericPrice >= priceRange[0] &&
      numericPrice <= priceRange[1]
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Catalog</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 10,
            border: "1px solid #ccc",
            marginRight: 10
          }}
        />
        <span style={{ marginLeft: 20, fontWeight: "bold" }}>Price Range:</span>
        <input
          type="number"
          value={priceRange[0]}
          min={minPrice}
          max={priceRange[1]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          style={{ margin: "0 10px", width: 80 }}
        />
        to
        <input
          type="number"
          value={priceRange[1]}
          min={priceRange[0]}
          max={maxPrice}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          style={{ margin: "0 10px", width: 80 }}
        />
        <button
          onClick={() => navigate("/comparison")}
          style={{
            marginLeft: 20,
            padding: 8,
            borderRadius: 10,
            background: "#007bff",
            color: "white",
            border: "none"
          }}
        >
          Go to Comparison
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => toggleSelect(p.id)}
            style={{
              width: 220,
              padding: 16,
              margin: 10,
              position: "relative", // needed for absolute
              border: selectedIds.includes(p.id) ? "3px solid blue" : "1px solid #ccc",
              borderRadius: 12,
              boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              background: "white"
            }}
          >
            {/* price badge top-left */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "green",
                color: "white",
                padding: "4px 8px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: "bold"
              }}
            >
              {p.price}
            </div>
            <h5 style={{ marginTop: 30 }}>Card #{p.id}</h5>
            <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 8 }} />
            <h4>{p.name}</h4>
            <p>{p.specs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
