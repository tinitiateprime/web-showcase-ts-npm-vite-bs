import React, { useState, useEffect } from 'react';
import { Code, Zap, Layers, ArrowRight, Star, Github, Play, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const themes = [
    {
      name: 'Cyber Purple',
      primary: '#8B5CF6',
      secondary: '#A855F7',
      accent: '#C084FC',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      bgGradient: 'linear-gradient(45deg, #8B5CF6 0%, #EC4899 100%)'
    },
    {
      name: 'Ocean Blue',
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#67E8F9',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)',
      bgGradient: 'linear-gradient(45deg, #0EA5E9 0%, #10B981 100%)'
    },
    {
      name: 'Sunset Orange',
      primary: '#F97316',
      secondary: '#FB923C',
      accent: '#FDBA74',
      gradient: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
      bgGradient: 'linear-gradient(45deg, #F97316 0%, #EF4444 100%)'
    },
    {
      name: 'Neon Green',
      primary: '#22C55E',
      secondary: '#16A34A',
      accent: '#4ADE80',
      gradient: 'linear-gradient(135deg, #22C55E 0%, #0EA5E9 100%)',
      bgGradient: 'linear-gradient(45deg, #22C55E 0%, #0EA5E9 100%)'
    }
  ];

  const features = [
    {
      icon: <Code size={24} />,
      title: "TypeScript Ready",
      description: "Type-safe development experience"
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Vite-powered instant builds"
    },
    {
      icon: <Layers size={24} />,
      title: "Modern Stack",
      description: "Bootstrap 5 + React hooks"
    }
  ];

  const stats = [
    { number: "10k+", label: "Downloads" },
    { number: "500+", label: "Stars" },
    { number: "99%", label: "Uptime" }
  ];

  useEffect(() => {
    const themeInterval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
      setAnimationKey(prev => prev + 1);
    }, 4000);

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => {
      clearInterval(themeInterval);
      clearInterval(featureInterval);
    };
  }, []);

  const currentColors = themes[currentTheme];

  return (
    <div className="min-vh-100 bg-dark text-white position-relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="position-absolute w-100 h-100" 
        style={{
          background: currentColors.bgGradient,
          opacity: 0.1,
          transition: 'all 1s ease'
        }} 
      />
      
      {/* Animated Particles */}
      <div className="position-absolute w-100 h-100">
        {[...Array(12)].map((_, i) => (
          <div
            key={`${animationKey}-${i}`}
            className="position-absolute rounded-circle"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: currentColors.primary,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `float ${Math.random() * 2 + 1}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="d-flex align-items-center justify-content-center position-relative py-4" style={{ minHeight: '50vh' }}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="mb-3">
                <Sparkles 
                  size={32} 
                  style={{ color: currentColors.primary, animation: 'pulse 2s infinite' }} 
                />
              </div>
              <h1 
                className="display-4 fw-bold mb-3" 
                style={{
                  background: currentColors.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 1s ease'
                }}
              >
                TS-Vite-BS Stack
              </h1>
              <p className="mb-4 text-light opacity-75">
                Modern development with TypeScript, Vite & Bootstrap
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button 
                  className="btn btn-lg px-4 py-2 d-flex align-items-center gap-2 shadow-lg border-0"
                  style={{ 
                    background: currentColors.gradient,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Play size={16} /> Start Building
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-2 d-flex align-items-center gap-2">
                  <Github size={16} /> GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-3 position-relative">
        <div className="container">
          <div className="row g-3">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4">
                <div 
                  className={`card bg-transparent border-2 h-100 text-center p-3 ${
                    activeFeature === index ? 'border-primary' : 'border-secondary'
                  }`}
                  style={{ 
                    transition: 'all 0.5s ease',
                    borderColor: activeFeature === index ? currentColors.primary : '#6c757d',
                    transform: activeFeature === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0)',
                    boxShadow: activeFeature === index ? `0 10px 30px ${currentColors.primary}20` : 'none'
                  }}
                >
                  <div className="card-body p-2">
                    <div 
                      className="mb-2" 
                      style={{ 
                        color: activeFeature === index ? currentColors.primary : '#6c757d',
                        transition: 'color 0.5s ease'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h6 className="card-title fw-bold mb-1">{feature.title}</h6>
                    <p className="card-text text-muted small">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-3" style={{ backgroundColor: `${currentColors.primary}10` }}>
        <div className="container">
          <div className="row g-3">
            {stats.map((stat, index) => (
              <div key={index} className="col-4 text-center">
                <h4 
                  className="fw-bold mb-0" 
                  style={{ color: currentColors.primary, transition: 'color 1s ease' }}
                >
                  {stat.number}
                </h4>
                <small className="text-muted">{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h4 className="fw-bold mb-2">Quick Start</h4>
              <p className="text-muted mb-3 small">
                Get started with our optimized development setup
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-secondary">
                  <Star size={12} className="me-1" />
                  HMR
                </span>
                <span className="badge bg-secondary">
                  <Star size={12} className="me-1" />
                  TypeScript
                </span>
                <span className="badge bg-secondary">
                  <Star size={12} className="me-1" />
                  Bootstrap 5
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-dark rounded-2 p-3 shadow">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-danger rounded-circle me-1" style={{ width: '8px', height: '8px' }}></div>
                  <div className="bg-warning rounded-circle me-1" style={{ width: '8px', height: '8px' }}></div>
                  <div className="bg-success rounded-circle me-1" style={{ width: '8px', height: '8px' }}></div>
                  <small className="text-muted ms-2">Terminal</small>
                </div>
                <pre className="text-success mb-0" style={{ fontSize: '0.75rem' }}>
                  <code>{`$ npm create ts-vite-bs@latest
$ cd my-project && npm install
$ npm run dev

🚀 Ready at localhost:3000`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-3" style={{ background: currentColors.gradient }}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h4 className="fw-bold mb-2">Ready to Build?</h4>
              <p className="mb-3 opacity-90 small">
                Join developers building with our modern stack
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button className="btn btn-light btn-sm px-3 py-2">
                  <ArrowRight size={14} className="me-1" /> Get Started
                </button>
                <button className="btn btn-outline-light btn-sm px-3 py-2">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="py-3 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h6 className="mb-1">TS-Vite-BS</h6>
              <p className="text-muted mb-0 small">Modern web development stack</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end gap-3 mt-2 mt-md-0">
                <a href="#" className="text-muted">
                  <Github size={16} />
                </a>
                <span className="text-muted small">
                  Theme: <span style={{ color: currentColors.primary }}>{currentColors.name}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .btn:hover {
          transform: translateY(-1px);
          transition: all 0.3s ease;
        }
        
        .card {
          transition: all 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default HomePage;