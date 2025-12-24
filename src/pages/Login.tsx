import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
  User,
  Shield,
  Zap,
} from "lucide-react";

type Theme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  bgGradient: string;
};

type AuthFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function LoginPage() {
  const [currentTheme, setCurrentTheme] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [activeInput, setActiveInput] = useState<keyof AuthFormData | "">("");

  
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const themes: Theme[] = [
    {
      name: "Cyber Purple",
      primary: "#8B5CF6",
      secondary: "#A855F7",
      accent: "#C084FC",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      bgGradient: "linear-gradient(45deg, #8B5CF6 0%, #EC4899 100%)",
    },
    {
      name: "Ocean Blue",
      primary: "#0EA5E9",
      secondary: "#7a138aff",
      accent: "#67E8F9",
      gradient: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
      bgGradient: "linear-gradient(45deg, #0EA5E9 0%, #10B981 100%)",
    },
    {
      name: "Sunset Orange",
      primary: "#F97316",
      secondary: "#FB923C",
      accent: "#FDBA74",
      gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
      bgGradient: "linear-gradient(45deg, #F97316 0%, #EF4444 100%)",
    },
    {
      name: "Neon Green",
      primary: "#22C55E",
      secondary: "#16A34A",
      accent: "#4ADE80",
      gradient: "linear-gradient(135deg, #22C55E 0%, #0EA5E9 100%)",
      bgGradient: "linear-gradient(45deg, #22C55E 0%, #0EA5E9 100%)",
    },
  ];

  const features = [
    { icon: <Shield size={16} />, text: "Secure Authentication" },
    { icon: <Zap size={16} />, text: "Lightning Fast" },
    { icon: <User size={16} />, text: "User Friendly" },
  ];

  useEffect(() => {
    const themeInterval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
      setAnimationKey((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(themeInterval);
  }, []);

  const currentColors = themes[currentTheme];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof AuthFormData;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-vh-100 bg-dark text-white position-relative overflow-hidden d-flex align-items-center">
      <div
        className="position-absolute w-100 h-100"
        style={{ background: currentColors.bgGradient, opacity: 0.1, transition: "all 1s ease" }}
      />

      <div className="position-absolute w-100 h-100">
        {[...Array(15)].map((_, i) => (
          <div
            key={`${animationKey}-${i}`}
            className="position-absolute rounded-circle"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: currentColors.primary,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="position-absolute top-0 start-0 w-100 h-100 d-none d-lg-block">
        {features.map((feature, index) => (
          <div
            key={index}
            className="position-absolute card bg-dark bg-opacity-50 border-0 p-2 d-flex flex-row align-items-center"
            style={{
              left: `${10 + index * 25}%`,
              top: `${20 + index * 15}%`,
              backdropFilter: "blur(10px)",
              animation: `floatFeature ${3 + index}s ease-in-out infinite alternate`,
              borderLeft: `3px solid ${currentColors.primary}`,
              transition: "border-color 1s ease",
            }}
          >
            <div className="me-2" style={{ color: currentColors.primary }}>
              {feature.icon}
            </div>
            <small className="text-white">{feature.text}</small>
          </div>
        ))}
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div
              className="card bg-dark bg-opacity-80 border-0 shadow-lg position-relative overflow-hidden"
              style={{
                backdropFilter: "blur(20px)",
                borderTop: `3px solid ${currentColors.primary}`,
                transition: "border-color 1s ease",
              }}
            >
              <div className="card-header bg-transparent border-0 text-center pt-4">
                <div className="mb-3">
                  <Sparkles
                    size={24}
                    style={{
                      color: currentColors.primary,
                      animation: "pulse 2s infinite",
                      transition: "color 1s ease",
                    }}
                  />
                </div>

                <h3
                  className="mb-2 fw-bold"
                  style={{
                    background: currentColors.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 1s ease",
                  }}
                >
                  TS-Vite-BS
                </h3>

                <p className="text-muted small mb-0">
                  {isLogin ? "Welcome back! Please sign in." : "Create your account to get started."}
                </p>
              </div>

              <div className="card-body p-4">
                <div className="d-flex mb-4 p-1 bg-secondary bg-opacity-20 rounded-pill">
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill py-2 rounded-pill border-0 ${isLogin ? "text-white" : "text-muted"}`}
                    style={{ background: isLogin ? currentColors.gradient : "transparent", transition: "all 0.3s ease" }}
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill py-2 rounded-pill border-0 ${!isLogin ? "text-white" : "text-muted"}`}
                    style={{ background: !isLogin ? currentColors.gradient : "transparent", transition: "all 0.3s ease" }}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-3">
                      <div className="position-relative">
                        <User
                          size={16}
                          className="position-absolute top-50 start-0 translate-middle-y ms-3"
                          style={{ color: activeInput === "name" ? currentColors.primary : "#6c757d", transition: "color 0.3s ease" }}
                        />
                        <input
                          type="text"
                          name="name"
                          className="form-control bg-dark bg-opacity-50 border-0 text-white ps-5 py-3"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setActiveInput("name")}
                          onBlur={() => setActiveInput("")}
                          style={{
                            borderBottom: `2px solid ${activeInput === "name" ? currentColors.primary : "#6c757d"}`,
                            transition: "border-color 0.3s ease",
                          }}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="position-relative">
                      <Mail
                        size={16}
                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                        style={{ color: activeInput === "email" ? currentColors.primary : "#6c757d", transition: "color 0.3s ease" }}
                      />
                      <input
                        type="email"
                        name="email"
                        className="form-control bg-dark bg-opacity-50 border-0 text-white ps-5 py-3"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput("email")}
                        onBlur={() => setActiveInput("")}
                        style={{
                          borderBottom: `2px solid ${activeInput === "email" ? currentColors.primary : "#6c757d"}`,
                          transition: "border-color 0.3s ease",
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="position-relative">
                      <Lock
                        size={16}
                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                        style={{ color: activeInput === "password" ? currentColors.primary : "#6c757d", transition: "color 0.3s ease" }}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control bg-dark bg-opacity-50 border-0 text-white ps-5 pe-5 py-3"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput("password")}
                        onBlur={() => setActiveInput("")}
                        style={{
                          borderBottom: `2px solid ${activeInput === "password" ? currentColors.primary : "#6c757d"}`,
                          transition: "border-color 0.3s ease",
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 p-0 text-muted"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <div className="position-relative">
                        <Lock
                          size={16}
                          className="position-absolute top-50 start-0 translate-middle-y ms-3"
                          style={{
                            color: activeInput === "confirmPassword" ? currentColors.primary : "#6c757d",
                            transition: "color 0.3s ease",
                          }}
                        />
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control bg-dark bg-opacity-50 border-0 text-white ps-5 py-3"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          onFocus={() => setActiveInput("confirmPassword")}
                          onBlur={() => setActiveInput("")}
                          style={{
                            borderBottom: `2px solid ${activeInput === "confirmPassword" ? currentColors.primary : "#6c757d"}`,
                            transition: "border-color 0.3s ease",
                          }}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-lg w-100 py-3 mb-3 border-0 fw-bold d-flex align-items-center justify-content-center gap-2"
                    style={{ background: currentColors.gradient, transition: "all 0.3s ease" }}
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight size={16} />
                  </button>

                  <div className="text-center">
                    <p className="text-muted small mb-3">Or continue with</p>
                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-outline-secondary btn-sm flex-fill py-2 d-flex align-items-center justify-content-center gap-2">
                        <Github size={14} /> GitHub
                      </button>
                      <button type="button" className="btn btn-outline-secondary btn-sm flex-fill py-2 d-flex align-items-center justify-content-center gap-2">
                        <Chrome size={14} /> Google
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-footer bg-transparent border-0 text-center py-3">
                <small className="text-muted">
                  Theme: <span style={{ color: currentColors.primary }}>{currentColors.name}</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 100% { transform: translateY(-10px); } }
        @keyframes floatFeature { 0% { transform: translateY(0px) translateX(0px); } 100% { transform: translateY(-15px) translateX(5px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .btn:hover { transform: translateY(-2px); transition: all 0.3s ease; }
        .form-control:focus { box-shadow: none; background-color: rgba(255, 255, 255, 0.1) !important; }
      `}</style>
    </div>
  );
}
