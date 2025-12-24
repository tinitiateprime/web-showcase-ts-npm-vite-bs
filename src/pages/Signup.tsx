import { useEffect, useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // optional: page style
    document.body.style.background = "#0b1220";
    document.body.style.color = "white";
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Account created (demo).");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }, 900);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card bg-dark bg-opacity-75 border-0 shadow-lg rounded-4">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-1">Create Account</h3>
              <p className="text-muted mb-4">Sign up to get started</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted">Full Name</label>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Email</label>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Password</label>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted">Confirm Password</label>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Sign Up"}
                </button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Already have an account? <a href="/login">Sign in</a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <style>{`
            a { color: #7aa7ff; text-decoration: none; }
            a:hover { text-decoration: underline; }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
