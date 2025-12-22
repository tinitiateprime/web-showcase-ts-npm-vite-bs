import { useState } from "react";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      icon: '🚀',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['React & Vue.js', 'Node.js Backend', 'Responsive Design', 'SEO Optimized'],
      price: 'Starting at $1,500',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['React Native', 'Flutter', 'App Store Deployment', 'Push Notifications'],
      price: 'Starting at $2,500',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interface and experience design',
      features: ['Figma Prototypes', 'User Research', 'Wireframing', 'Design Systems'],
      price: 'Starting at $800',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions',
      features: ['AWS/Azure Setup', 'DevOps Pipeline', 'Auto Scaling', '24/7 Monitoring'],
      price: 'Starting at $1,200',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Training'],
      price: 'Starting at $2,000',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      icon: '📊',
      title: 'Data Analytics',
      description: 'Turn your data into actionable insights and business intelligence',
      features: ['Dashboard Creation', 'Machine Learning', 'Data Visualization', 'Reporting'],
      price: 'Starting at $1,800',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Startup Inc.',
      text: 'Amazing work! They delivered exactly what we needed.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Digital Agency',
      text: 'Professional team with excellent communication.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      company: 'E-commerce Store',
      text: 'Our sales increased by 300% after the redesign!',
      rating: 5
    }
  ];

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
          <div className="navbar-nav ms-auto">
            <a href="/" className="nav-link text-white">Home</a>
            <a href="/about" className="nav-link text-white">About</a>
            <a href="/services" className="nav-link text-white fw-bold">Services</a>
            <a href="/contact" className="nav-link text-white">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5">
        <div className="text-center text-white mb-5">
          <h1 className="display-4 fw-bold mb-3">
            Our Premium Services
          </h1>
          <p className="lead mb-4">
            Transforming ideas into digital reality with cutting-edge solutions
          </p>
          <div className="d-flex justify-content-center gap-3">
            <span className="badge bg-light text-dark px-3 py-2">✨ Premium Quality</span>
            <span className="badge bg-light text-dark px-3 py-2">⚡ Fast Delivery</span>
            <span className="badge bg-light text-dark px-3 py-2">🛡️ Secure</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container pb-5">
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-lg-4 col-md-6">
              <div 
                className="card h-100 border-0 shadow-lg position-relative overflow-hidden"
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                {/* Service Icon */}
                <div className="position-absolute top-0 end-0 p-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: service.color,
                      fontSize: '24px'
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                <div className="card-body p-4">
                  <h4 className="card-title fw-bold mb-3" style={{color: '#2c3e50'}}>
                    {service.title}
                  </h4>
                  <p className="card-text text-muted mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-2" style={{color: '#495057'}}>
                      Key Features:
                    </h6>
                    <div className="row g-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="col-6">
                          <small className="badge bg-light text-dark rounded-pill px-2 py-1">
                            ✓ {feature}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bold fs-5" style={{color: '#2c3e50'}}>
                      {service.price}
                    </span>
                    <button
                      className="btn btn-sm text-white px-3"
                      style={{
                        background: service.color,
                        border: 'none',
                        borderRadius: '25px'
                      }}
                    >
                      Get Quote
                    </button>
                  </div>

                  {/* Expandable Details */}
                  {activeService === service.id && (
                    <div 
                      className="border-top pt-3 mt-3"
                      style={{
                        animation: 'slideDown 0.3s ease'
                      }}
                    >
                      <h6 className="fw-bold mb-2">Project Timeline:</h6>
                      <p className="small text-muted mb-2">
                        📅 2-6 weeks depending on complexity
                      </p>
                      <h6 className="fw-bold mb-2">What's Included:</h6>
                      <ul className="small text-muted mb-0">
                        <li>Initial consultation & planning</li>
                        <li>Development & testing</li>
                        <li>Deployment & training</li>
                        <li>3 months free support</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div 
              className="card border-0 shadow-lg mb-5"
              style={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="card-body p-5">
                <h2 className="text-center fw-bold mb-5" style={{color: '#2c3e50'}}>
                  Our Process
                </h2>
                <div className="row g-4">
                  {[
                    {step: '01', title: 'Discovery', desc: 'Understanding your needs and goals', icon: '🔍'},
                    {step: '02', title: 'Planning', desc: 'Creating detailed project roadmap', icon: '📋'},
                    {step: '03', title: 'Design', desc: 'Crafting beautiful user experiences', icon: '🎨'},
                    {step: '04', title: 'Development', desc: 'Building with latest technologies', icon: '⚙️'},
                    {step: '05', title: 'Testing', desc: 'Ensuring quality and performance', icon: '🧪'},
                    {step: '06', title: 'Launch', desc: 'Deploying and going live', icon: '🚀'}
                  ].map((process, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="text-center">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            fontSize: '24px'
                          }}
                        >
                          {process.icon}
                        </div>
                        <h5 className="fw-bold mb-2" style={{color: '#2c3e50'}}>
                          {process.step}. {process.title}
                        </h5>
                        <p className="text-muted small">{process.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container pb-5">
        <div className="text-center text-white mb-5">
          <h2 className="fw-bold mb-3">What Our Clients Say</h2>
          <p className="lead">Don't just take our word for it</p>
        </div>
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-4">
              <div 
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-warning">⭐</span>
                    ))}
                  </div>
                  <p className="text-muted mb-3">"{testimonial.text}"</p>
                  <h6 className="fw-bold mb-1" style={{color: '#2c3e50'}}>
                    {testimonial.name}
                  </h6>
                  <small className="text-muted">{testimonial.company}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container pb-5">
        <div 
          className="card border-0 shadow-lg text-center"
          style={{
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="card-body p-5">
            <h2 className="fw-bold mb-3" style={{color: '#2c3e50'}}>
              Ready to Get Started?
            </h2>
            <p className="lead text-muted mb-4">
              Let's discuss your project and bring your vision to life
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-lg text-white px-4 py-3"
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📞 Contact Us
              </button>
              <button
                className="btn btn-lg btn-outline-dark px-4 py-3"
                style={{
                  borderRadius: '25px',
                  transition: 'all 0.3s ease'
                }}
              >
                📄 View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-white-50 small mb-0">
          © 2025 YourApp. Premium Digital Solutions
        </p>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Services;