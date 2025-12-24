import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  specs: string;
  price: string; // keep consistent with catalog
  image: string;
};

const safeParse = <T,>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function ComparisonPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedIds = safeParse<number[]>(localStorage.getItem("selectedIds"), []);
    const allProducts = safeParse<Product[]>(localStorage.getItem("products"), []);
    setSelectedIds(storedIds);
    setProducts(allProducts);
  }, []);

  const handleRemove = (id: number) => {
    setSelectedIds((prev) => {
      const updatedIds = prev.filter((pid) => pid !== id);
      localStorage.setItem("selectedIds", JSON.stringify(updatedIds));
      return updatedIds;
    });
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
              <th style={{ padding: 10 }}>Card #</th>
              <th style={{ padding: 10 }}>Name</th>
              <th style={{ padding: 10 }}>Specs</th>
              <th style={{ padding: 10 }}>Price</th>
              <th style={{ padding: 10 }}>Image</th>
              <th style={{ padding: 10 }}>Remove</th>
            </tr>
          </thead>

          <tbody>
            {selectedProducts.map((item) => (
              <tr key={item.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{item.id}</td>
                <td style={{ padding: 10 }}>{item.name}</td>
                <td style={{ padding: 10 }}>{item.specs}</td>
                <td style={{ padding: 10 }}>{item.price}</td>
                <td style={{ padding: 10 }}>
                  <img src={item.image} alt={item.name} width={100} style={{ borderRadius: 8 }} />
                </td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
