import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  qty: number;
};

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Phone", price: 599, image: "https://via.placeholder.com/100" },
    { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/100" },
    { id: 4, name: "Watch", price: 299, image: "https://via.placeholder.com/100" },
  ]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) => (item.id === id ? { ...item, qty } : item));
    });
  };

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const pageStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
  };

  const btnPrimary: React.CSSProperties = {
    backgroundColor: "#7b1fa2",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const btnOutline: React.CSSProperties = {
    border: "1px solid #7b1fa2",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    padding: 0,
    fontWeight: "bold",
    color: "#7b1fa2",
    backgroundColor: "white",
    cursor: "pointer",
    lineHeight: "28px",
  };

  const cartBtn: React.CSSProperties = {
    backgroundColor: "#43a047",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div className="container">
        <h2 className="mb-4 text-center" style={{ color: "#4a148c", fontWeight: "bold" }}>
          🛍 Shopping Cart
        </h2>

        <div className="row">
          {/* Products */}
          <div className="col-md-8">
            <h4 style={{ color: "#6a1b9a" }}>Products</h4>
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-sm-6 mb-3">
                  <div className="card" style={cardStyle}>
                    <img
                      src={product.image}
                      className="card-img-top p-3"
                      alt={product.name}
                      style={{ borderRadius: "12px" }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title" style={{ fontWeight: "bold" }}>
                        {product.name}
                      </h6>
                      <p className="card-text text-muted">${product.price}</p>
                      <button style={btnPrimary} onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="col-md-4">
            <h4 style={{ color: "#6a1b9a" }}>Cart ({cart.length})</h4>
            <div className="card" style={cardStyle}>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p className="text-muted">Cart is empty</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom"
                      >
                        <div>
                          <small className="fw-bold">{item.name}</small>
                          <br />
                          <small className="text-muted">${item.price} each</small>
                        </div>

                        <div className="d-flex align-items-center">
                          <button style={btnOutline} onClick={() => updateQty(item.id, item.qty - 1)}>
                            −
                          </button>
                          <span className="mx-2">{item.qty}</span>
                          <button style={btnOutline} onClick={() => updateQty(item.id, item.qty + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="mt-3 pt-3 border-top">
                      <h5>Total: ${total.toFixed(2)}</h5>

                      <button style={cartBtn}>Checkout</button>

                      <button
                        className="btn btn-outline-danger w-100 mt-2"
                        onClick={() => setCart([])}
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
