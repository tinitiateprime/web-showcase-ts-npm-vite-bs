import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">
            <span style={{color: '#fff'}}>🚀 YourApp</span>
          </a>
          <a href="/" className="btn btn-outline-light rounded-pill px-4">
            🏠 Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{minHeight: '80vh'}}>
          <div className="col-11 col-md-8 col-lg-6 col-xl-5">
            
            {/* Login Card */}
            <div className="card border-0 shadow-lg" style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-body p-5">
                
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="mb-3">
                    <span style={{
                      fontSize: '4rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      🔐
                    </span>
                  </div>
                  <h2 className="fw-bold mb-2" style={{color: '#2c3e50'}}>
                    Welcome Back!
                  </h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* Form */}
                <div onSubmit={handleSubmit}>
                  
                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{color: '#495057'}}>
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0" style={{
                        background: 'transparent',
                        border: '2px solid #e9ecef',
                        borderRadius: '15px 0 0 15px'
                      }}>
                        📧
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '0 15px 15px 0',
                          padding: '12px 15px',
                          fontSize: '16px'
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{color: '#495057'}}>
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0" style={{
                        background: 'transparent',
                        border: '2px solid #e9ecef',
                        borderRadius: '15px 0 0 15px'
                      }}>
                        🔒
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 15px',
                          fontSize: '16px'
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="btn border-start-0"
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '0 15px 15px 0',
                          background: 'transparent'
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="/forgot-password" className="text-decoration-none" style={{
                      color: '#667eea',
                      fontSize: '14px'
                    }}>
                      Forgot Password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold text-white position-relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    🚀 Sign In
                  </button>

                  {/* Divider */}
                  <div className="d-flex align-items-center my-4">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted small">OR</span>
                    <hr className="flex-grow-1" />
                  </div>

                  {/* Social Login */}
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2"
                        style={{borderRadius: '12px'}}
                      >
                        🔵 Google
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2"
                        style={{borderRadius: '12px'}}
                      >
                        📘 Facebook
                      </button>
                    </div>
                  </div>

                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="mb-0 text-muted">
                    Don't have an account?{' '}
                    <a
                      href="/signup"
                      className="text-decoration-none fw-bold"
                      style={{
                        color: '#667eea',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#764ba2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#667eea';
                      }}
                    >
                      Create Account 🎉
                    </a>
                  </p>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-white-50 small">
                © 2025 YourApp. Secure & Trusted Login
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;