import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  specs: string;
  price: string | number;
  image: string;
};

const safeParse = <T,>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const ComparisonPage = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedIds = safeParse<number[]>(localStorage.getItem("selectedIds"), []);
    const allProducts = safeParse<Product[]>(localStorage.getItem("products"), []);
    setSelectedIds(storedIds);
    setProducts(allProducts);
  }, []);

  const handleRemove = (id: number) => {
    const updatedIds = selectedIds.filter((pid) => pid !== id);
    setSelectedIds(updatedIds);
    localStorage.setItem("selectedIds", JSON.stringify(updatedIds));
  };

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.includes(p.id)),
    [products, selectedIds]
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Comparison Table</h2>

      {selectedProducts.length === 0 ? (
        <p>No cards selected for comparison.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th>Card #</th>
              <th>Name</th>
              <th>Specs</th>
              <th>Price</th>
              <th>Image</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((item) => (
              <tr
                key={item.id}
                style={{ textAlign: "center", borderBottom: "1px solid #eee" }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.specs}</td>
                <td>{typeof item.price === "number" ? `$${item.price}` : item.price}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={100}
                    style={{ borderRadius: 8 }}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonPage;
