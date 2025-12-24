import { useMemo, useState, type ChangeEvent } from "react";
import {
  Search,
  ChevronRight,
  MessageCircle,
  Book,
  Zap,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

const backgroundThemes = {
  default: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
  ocean: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
  sunset: "bg-gradient-to-br from-orange-50 via-pink-50 to-red-50",
  forest: "bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50",
  cosmic: "bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100",
  warm: "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50",
  cool: "bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50",
  minimal: "bg-white",
  animated: "animated-gradient",
  particles: "particles-bg",
  waves: "waves-bg",
  stars: "stars-bg",
  matrix: "matrix-bg",
} as const;

type BgTheme = keyof typeof backgroundThemes;

type CategoryId = "getting-started" | "account" | "features" | "troubleshooting";

const categories = [
  { id: "getting-started", name: "Getting Started", icon: Zap, color: "primary" },
  { id: "account", name: "Account & Profile", icon: Users, color: "success" },
  { id: "features", name: "Features & Tools", icon: Book, color: "info" },
  { id: "troubleshooting", name: "Troubleshooting", icon: MessageCircle, color: "warning" },
] as const;

type Article = { title: string; desc: string; time: string };

const helpArticles: Record<CategoryId, Article[]> = {
  "getting-started": [
    { title: "Welcome to Our Platform", desc: "Learn the basics and get up to speed quickly", time: "5 min read" },
    { title: "Your First Project", desc: "Step-by-step guide to creating your first project", time: "10 min read" },
    { title: "Essential Features Overview", desc: "Discover the core features that will boost your productivity", time: "8 min read" },
  ],
  account: [
    { title: "Profile Settings", desc: "Customize your profile and preferences", time: "3 min read" },
    { title: "Privacy & Security", desc: "Manage your privacy settings and security options", time: "7 min read" },
    { title: "Subscription Management", desc: "Handle billing, plans, and subscription details", time: "5 min read" },
  ],
  features: [
    { title: "Advanced Analytics", desc: "Deep dive into data insights and reporting", time: "12 min read" },
    { title: "Collaboration Tools", desc: "Work effectively with teams and share resources", time: "9 min read" },
    { title: "API Integration", desc: "Connect with third-party services and automate workflows", time: "15 min read" },
  ],
  troubleshooting: [
    { title: "Common Issues", desc: "Quick fixes for the most frequent problems", time: "6 min read" },
    { title: "Performance Optimization", desc: "Speed up your experience and resolve slowdowns", time: "8 min read" },
    { title: "Error Messages Guide", desc: "Understand and resolve error notifications", time: "10 min read" },
  ],
};

const faqs = [
  { q: "How do I reset my password?", a: 'Click on "Forgot Password" on the login page, enter your email, and follow the reset instructions sent to your inbox.' },
  { q: "Can I upgrade my plan anytime?", a: "Yes! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately." },
  { q: "Is there a mobile app available?", a: "We offer progressive web app support that works great on mobile devices. Native apps are coming soon!" },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime from your billing settings. Your access continues until the end of your billing period." },
];

const quickActions = [
  { title: "Contact Support", desc: "Get help from our team", icon: MessageCircle, color: "primary" },
  { title: "Video Tutorials", desc: "Watch step-by-step guides", icon: Book, color: "info" },
  { title: "Community Forum", desc: "Connect with other users", icon: Users, color: "success" },
] as const;

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("getting-started");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [bgTheme, setBgTheme] = useState<BgTheme>("default");

  const articles = useMemo(() => helpArticles[activeCategory], [activeCategory]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`min-h-screen ${backgroundThemes[bgTheme]} position-relative overflow-hidden`}>
      {/* Animated Background Elements */}
      {bgTheme === "animated" && <div className="animated-bg-overlay"></div>}

      {bgTheme === "particles" && (
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${i % 5}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {bgTheme === "waves" && (
        <div className="waves-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      )}

      {bgTheme === "stars" && (
        <div className="stars-container">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {bgTheme === "matrix" && (
        <div className="matrix-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {[...Array(30)].map((_, j) => (
                <span key={j} className="matrix-char">
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Theme selector */}
      <div className="position-fixed top-0 end-0 p-3 z-3">
        <div className="dropdown">
          <button className="btn btn-light btn-sm dropdown-toggle shadow-sm" type="button" data-bs-toggle="dropdown">
            🎨 Theme
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {(Object.keys(backgroundThemes) as BgTheme[]).map((theme) => (
              <li key={theme}>
                <button
                  className={`dropdown-item ${bgTheme === theme ? "active" : ""}`}
                  onClick={() => setBgTheme(theme)}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  {["animated", "particles", "waves", "stars", "matrix"].includes(theme) && " ✨"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hero */}
      <div className="text-white py-5 position-relative z-2 bg-primary">
        <div className="container">
          <div className="text-center">
            <h1 className="display-6 fw-bold mb-3">How can we help you today?</h1>
            <p className="lead mb-4">
              Find answers, tutorials, and support resources to get the most out of our platform
            </p>

            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-0">
                <Search className="text-muted" size={20} />
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-dark border-0 px-4">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 position-relative z-2">
        {/* Quick Actions */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="h4 mb-4 text-center">Quick Actions</h2>
            <div className="row g-4">
              {quickActions.map((action, index) => (
                <div key={index} className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="rounded-circle bg-light p-3 d-inline-flex mb-3">
                        <action.icon size={24} />
                      </div>
                      <h5 className="card-title">{action.title}</h5>
                      <p className="card-text text-muted">{action.desc}</p>
                      <button className="btn btn-primary btn-sm">
                        Get Started <ArrowRight size={16} className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card border-0 shadow-sm sticky-top">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0">Browse by Category</h5>
              </div>
              <div className="list-group list-group-flush">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon size={20} className="me-3" />
                    <span className="flex-grow-1">{category.name}</span>
                    {activeCategory === category.id && <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-9">
            {/* Articles */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-light border-0">
                <h4 className="mb-0">{categories.find((c) => c.id === activeCategory)?.name} Articles</h4>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {articles.map((article, index) => (
                    <div key={index} className="col-12">
                      <div className="border rounded-3 p-4 hover-card bg-white">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-2">{article.title}</h6>
                            <p className="text-muted mb-2">{article.desc}</p>
                            <small className="text-primary">
                              <CheckCircle size={14} className="me-1" />
                              {article.time}
                            </small>
                          </div>
                          <button className="btn btn-outline-primary btn-sm">
                            Read <ArrowRight size={14} className="ms-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light border-0">
                <h4 className="mb-0">Frequently Asked Questions</h4>
              </div>

              <div className="card-body">
                <div className="accordion">
                  {faqs.map((faq, index) => (
                    <div key={index} className="accordion-item border-0 mb-3">
                      <div className="accordion-header">
                        <button
                          className={`accordion-button ${expandedFaq === index ? "" : "collapsed"} bg-light border-0 rounded-3`}
                          type="button"
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        >
                          <Star size={16} className="me-2 text-warning" />
                          {faq.q}
                        </button>
                      </div>
                      {expandedFaq === index && (
                        <div className="accordion-body bg-white border-0 rounded-bottom-3">
                          <p className="mb-0 text-muted">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-white py-5 mt-5 bg-dark">
        <div className="container text-center">
          <h3 className="mb-3">Still need help?</h3>
          <p className="mb-4">Our support team is here to assist you 24/7</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-light btn-lg">
              <MessageCircle size={20} className="me-2" />
              Live Chat
            </button>
            <button className="btn btn-outline-light btn-lg">Send Email</button>
          </div>
        </div>
      </div>

      <style>{`
        .hover-card { transition: all 0.3s ease; }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
        .sticky-top { top: 20px; }

        /* Animated Gradient Background */
        .animated-gradient {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
        }
        .animated-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          opacity: 0.1;
          z-index: 1;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Particles */
        .particles-bg {
          background: radial-gradient(circle at 25% 25%, #4f46e5 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%),
                      linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
        }
        .particles-container { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
        .particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; animation: float linear infinite; }
        .particle-0 { background: #4f46e5; }
        .particle-1 { background: #06b6d4; }
        .particle-2 { background: #8b5cf6; }
        .particle-3 { background: #10b981; }
        .particle-4 { background: #f59e0b; }
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        /* Waves */
        .waves-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .waves-container { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
        .wave {
          position: absolute; bottom: 0; left: 0;
          width: 200%; height: 200px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: wave 6s linear infinite;
        }
        .wave1 { animation-delay: 0s; }
        .wave2 { animation-delay: -2s; }
        .wave3 { animation-delay: -4s; }
        @keyframes wave { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }

        /* Stars */
        .stars-bg { background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); }
        .stars-container { position: absolute; inset: 0; z-index: 1; }
        .star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: twinkle linear infinite; }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Matrix */
        .matrix-bg { background: #000; color: #0f0; }
        .matrix-container { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
        .matrix-column {
          position: absolute; top: -100%;
          width: 20px; height: 100%;
          font-family: 'Courier New', monospace;
          font-size: 12px; color: #0f0; text-shadow: 0 0 5px #0f0;
          animation: matrixFall linear infinite;
        }
        .matrix-char { display: block; height: 20px; opacity: 0.8; }
        @keyframes matrixFall { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }

        @media (max-width: 768px) {
          .particle { width: 2px; height: 2px; }
          .star { width: 1px; height: 1px; }
          .matrix-column { width: 15px; font-size: 10px; }
        }
      `}</style>
    </div>
  );
}
