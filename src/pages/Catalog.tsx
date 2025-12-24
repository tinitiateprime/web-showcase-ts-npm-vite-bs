import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  image: string;
  specs: string;
  price: string; // stored as INR formatted string
};

const priceToNumber = (price: string): number =>
  Number(String(price).replace(/[^\d]/g, ""));

const generateProducts = (count: number = 50): Product[] => {
  const names = ["Laptop", "Phone", "Camera", "Tablet", "Speaker", "Watch", "Monitor", "Keyboard", "Mouse", "Drone"];
  const specsList = ["8GB RAM", "16GB RAM", "256GB SSD", "512GB SSD", "4K Display", "Touchscreen", "Wireless", "GPS", "Heart Rate", "Waterproof"];

  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const priceValue = Math.floor(id * 1000) + 10000;
    const price = priceValue.toLocaleString("en-IN", { style: "currency", currency: "INR" });

    return {
      id,
      name: `${names[i % names.length]} ${id}`,
      image: `https://picsum.photos/seed/${id}/200/150`,
      specs: `${specsList[i % specsList.length]}, ${specsList[(i + 3) % specsList.length]}`,
      price,
    };
  });
};

const safeParse = <T,>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function CatalogPage() {
  const navigate = useNavigate();

  const [products] = useState<Product[]>(() => {
    const existing = safeParse<Product[]>(localStorage.getItem("products"), []);
    if (existing.length > 0) return existing;

    const newProducts = generateProducts(50);
    localStorage.setItem("products", JSON.stringify(newProducts));
    return newProducts;
  });

  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    return safeParse<number[]>(localStorage.getItem("selectedIds"), []);
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ compute min/max safely and only once per products change
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) return { minPrice: 0, maxPrice: 0 };
    const prices = products.map((p) => priceToNumber(p.price));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [products]);

  // ✅ initial range based on min/max; if products change, reset safely
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((p) => {
      const numericPrice = priceToNumber(p.price);

      const matchesSearch =
        term.length === 0 ||
        p.name.toLowerCase().includes(term) ||
        p.id.toString().includes(term);

      const withinRange = numericPrice >= priceRange[0] && numericPrice <= priceRange[1];

      return matchesSearch && withinRange;
    });
  }, [products, searchTerm, priceRange]);

  const onMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange(([_, max]) => [Math.min(val, max), max]);
  };

  const onMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange(([min, _]) => [min, Math.max(val, min)]);
  };

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
            marginRight: 10,
          }}
        />

        <span style={{ marginLeft: 20, fontWeight: "bold" }}>Price Range:</span>

        <input
          type="number"
          value={priceRange[0]}
          min={minPrice}
          max={priceRange[1]}
          onChange={onMinPriceChange}
          style={{ margin: "0 10px", width: 100 }}
        />
        to
        <input
          type="number"
          value={priceRange[1]}
          min={priceRange[0]}
          max={maxPrice}
          onChange={onMaxPriceChange}
          style={{ margin: "0 10px", width: 100 }}
        />

        <button
          onClick={() => navigate("/comparison")}
          style={{
            marginLeft: 20,
            padding: 8,
            borderRadius: 10,
            background: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Go to Comparison ({selectedIds.length})
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
              position: "relative",
              border: selectedIds.includes(p.id) ? "3px solid blue" : "1px solid #ccc",
              borderRadius: 12,
              boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              background: "white",
              userSelect: "none",
            }}
          >
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
                fontWeight: "bold",
              }}
            >
              {p.price}
            </div>

            <h5 style={{ marginTop: 30 }}>Card #{p.id}</h5>
            <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 8 }} />
            <h4>{p.name}</h4>
            <p style={{ marginBottom: 0 }}>{p.specs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
