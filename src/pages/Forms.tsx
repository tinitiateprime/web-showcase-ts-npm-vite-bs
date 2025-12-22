import { useState } from "react";

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Professional Information
    company: '',
    position: '',
    experience: '',
    skills: [],
    portfolio: '',
    
    // Project Details
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: [],
    
    // Preferences
    communication: '',
    notifications: {
      email: false,
      sms: false,
      push: false
    },
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  const skillOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP',
    'Design', 'Marketing', 'SEO', 'Content Writing', 'Data Analysis'
  ];

  const requirementOptions = [
    'Responsive Design', 'SEO Optimization', 'E-commerce Integration',
    'Payment Gateway', 'Admin Panel', 'Mobile App', 'Analytics'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('notifications.')) {
        const notificationType = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationType]: checked
          }
        }));
      } else if (name === 'skills' || name === 'requirements') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        break;
      case 2:
        if (!formData.company) newErrors.company = 'Company is required';
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.experience) newErrors.experience = 'Experience is required';
        break;
      case 3:
        if (!formData.projectType) newErrors.projectType = 'Project type is required';
        if (!formData.budget) newErrors.budget = 'Budget is required';
        if (!formData.timeline) newErrors.timeline = 'Timeline is required';
        if (!formData.description) newErrors.description = 'Description is required';
        break;
      case 4:
        if (!formData.communication) newErrors.communication = 'Communication preference is required';
        if (!formData.terms) newErrors.terms = 'You must accept the terms';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Form submitted successfully!');
        console.log('Form Data:', formData);
      }, 2000);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Professional Background';
      case 3: return 'Project Details';
      case 4: return 'Preferences & Confirmation';
      default: return 'Form';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return '👤';
      case 2: return '💼';
      case 3: return '📋';
      case 4: return '✅';
      default: return '📝';
    }
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
            <span style={{color: '#fff'}}>📝 FormHub</span>
          </a>
          <div className="navbar-nav ms-auto">
            <a href="/" className="nav-link text-white">Home</a>
            <a href="/forms" className="nav-link text-white fw-bold">Forms</a>
            <a href="/contact" className="nav-link text-white">Contact</a>
            <a href="/help" className="nav-link text-white">Help</a>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Progress Header */}
            <div 
              className="card border-0 shadow-lg mb-4"
              style={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h1 className="display-6 fw-bold mb-2" style={{color: '#2c3e50'}}>
                    {getStepIcon()} {getStepTitle()}
                  </h1>
                  <p className="text-muted mb-0">
                    Step {currentStep} of {totalSteps}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="progress" style={{height: '8px', borderRadius: '10px'}}>
                  <div 
                    className="progress-bar"
                    style={{
                      width: `${(currentStep / totalSteps) * 100}%`,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>

                {/* Step Indicators */}
                <div className="d-flex justify-content-between mt-3">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`d-flex align-items-center justify-content-center rounded-circle ${
                        step <= currentStep ? 'text-white' : 'text-muted'
                      }`}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: step <= currentStep 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)'
                          : '#e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div 
              className="card border-0 shadow-lg"
              style={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="card-body p-5">
                
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          👤 First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          👤 Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          📧 Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          📱 Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          🎂 Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          className="form-control"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          ⚧ Gender
                        </label>
                        <select
                          name="gender"
                          className="form-select"
                          value={formData.gender}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Information */}
                {currentStep === 2 && (
                  <div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          🏢 Company Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                          placeholder="Enter your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.company && (
                          <div className="invalid-feedback">{errors.company}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          💼 Position *
                        </label>
                        <input
                          type="text"
                          name="position"
                          className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                          placeholder="Enter your position"
                          value={formData.position}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.position && (
                          <div className="invalid-feedback">{errors.position}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          📊 Experience Level *
                        </label>
                        <select
                          name="experience"
                          className={`form-select ${errors.experience ? 'is-invalid' : ''}`}
                          value={formData.experience}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        >
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">Senior Level (6-10 years)</option>
                          <option value="expert">Expert Level (10+ years)</option>
                        </select>
                        {errors.experience && (
                          <div className="invalid-feedback">{errors.experience}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          🛠️ Skills & Technologies
                        </label>
                        <div className="row g-2 mt-1">
                          {skillOptions.map((skill) => (
                            <div key={skill} className="col-md-4 col-sm-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="skills"
                                  value={skill}
                                  id={`skill-${skill}`}
                                  checked={formData.skills.includes(skill)}
                                  onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor={`skill-${skill}`}>
                                  {skill}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          🌐 Portfolio/Website URL
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          className="form-control"
                          placeholder="https://yourportfolio.com"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          📋 Project Type *
                        </label>
                        <select
                          name="projectType"
                          className={`form-select ${errors.projectType ? 'is-invalid' : ''}`}
                          value={formData.projectType}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        >
                          <option value="">Select project type</option>
                          <option value="website">Website Development</option>
                          <option value="mobile">Mobile Application</option>
                          <option value="ecommerce">E-commerce Platform</option>
                          <option value="design">UI/UX Design</option>
                          <option value="consulting">Consulting Services</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.projectType && (
                          <div className="invalid-feedback">{errors.projectType}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          💰 Budget Range *
                        </label>
                        <select
                          name="budget"
                          className={`form-select ${errors.budget ? 'is-invalid' : ''}`}
                          value={formData.budget}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="over-50k">Over $50,000</option>
                        </select>
                        {errors.budget && (
                          <div className="invalid-feedback">{errors.budget}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          ⏰ Project Timeline *
                        </label>
                        <select
                          name="timeline"
                          className={`form-select ${errors.timeline ? 'is-invalid' : ''}`}
                          value={formData.timeline}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (Rush Job)</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-months-plus">6+ months</option>
                          <option value="flexible">Flexible timeline</option>
                        </select>
                        {errors.timeline && (
                          <div className="invalid-feedback">{errors.timeline}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          📝 Project Description *
                        </label>
                        <textarea
                          name="description"
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          rows="4"
                          placeholder="Describe your project in detail..."
                          value={formData.description}
                          onChange={handleInputChange}
                          style={{borderRadius: '12px', padding: '12px 16px'}}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">{errors.description}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          ✨ Additional Requirements
                        </label>
                        <div className="row g-2 mt-1">
                          {requirementOptions.map((requirement) => (
                            <div key={requirement} className="col-md-4 col-sm-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="requirements"
                                  value={requirement}
                                  id={`req-${requirement}`}
                                  checked={formData.requirements.includes(requirement)}
                                  onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor={`req-${requirement}`}>
                                  {requirement}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Preferences & Confirmation */}
                {currentStep === 4 && (
                  <div>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          💬 Preferred Communication Method *
                        </label>
                        <div className="row g-2 mt-1">
                          {['email', 'phone', 'slack', 'teams', 'skype'].map((method) => (
                            <div key={method} className="col-md-4 col-sm-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="communication"
                                  value={method}
                                  id={`comm-${method}`}
                                  checked={formData.communication === method}
                                  onChange={handleInputChange}
                                />
                                <label className="form-check-label text-capitalize" htmlFor={`comm-${method}`}>
                                  {method}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.communication && (
                          <div className="text-danger small mt-1">{errors.communication}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          🔔 Notification Preferences
                        </label>
                        <div className="row g-2 mt-1">
                          <div className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="notifications.email"
                                id="notif-email"
                                checked={formData.notifications.email}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="notif-email">
                                📧 Email Notifications
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="notifications.sms"
                                id="notif-sms"
                                checked={formData.notifications.sms}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="notif-sms">
                                📱 SMS Notifications
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="notifications.push"
                                id="notif-push"
                                checked={formData.notifications.push}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="notif-push">
                                🔔 Push Notifications
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="newsletter"
                            id="newsletter"
                            checked={formData.newsletter}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="newsletter">
                            📰 Subscribe to our newsletter for updates and tips
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                            type="checkbox"
                            name="terms"
                            id="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="terms">
                            ✅ I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a> *
                          </label>
                          {errors.terms && (
                            <div className="invalid-feedback d-block">{errors.terms}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Navigation */}
                <div className="d-flex justify-content-between mt-5">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    style={{borderRadius: '12px'}}
                  >
                    ← Previous
                  </button>
                  
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      className="btn text-white px-4 py-2"
                      onClick={handleNext}
                      style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: '12px'
                      }}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn text-white px-4 py-2"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      style={{
                        background: 'linear-gradient(135deg, #28a745, #20c997)',
                        border: 'none',
                        borderRadius: '12px'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        '✅ Submit Form'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-white-50 small mb-0">
          © 2025 FormHub. Secure & Professional Forms
        </p>
      </div>
    </div>
  );
};

export default FormPage;