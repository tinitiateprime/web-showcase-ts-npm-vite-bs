import { useState } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = [
    {
      id: 1,
      title: 'Complete Guide to React Development',
      description: 'Learn React from basics to advanced concepts with hands-on projects and real-world examples.',
      category: 'tutorial',
      author: 'Sarah Johnson',
      date: '2024-12-15',
      rating: 4.8,
      views: 15420,
      image: '📚',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Modern Web Design Principles',
      description: 'Discover the latest trends in web design and how to create stunning user experiences.',
      category: 'design',
      author: 'Mike Chen',
      date: '2024-12-10',
      rating: 4.6,
      views: 8930,
      image: '🎨',
      tags: ['Design', 'UI/UX', 'CSS']
    },
    {
      id: 3,
      title: 'Cloud Computing Best Practices',
      description: 'Essential strategies for deploying and managing applications in the cloud.',
      category: 'technology',
      author: 'Emma Davis',
      date: '2024-12-08',
      rating: 4.9,
      views: 12350,
      image: '☁️',
      tags: ['Cloud', 'AWS', 'DevOps']
    },
    {
      id: 4,
      title: 'AI and Machine Learning Fundamentals',
      description: 'Introduction to artificial intelligence and machine learning concepts for beginners.',
      category: 'technology',
      author: 'David Wilson',
      date: '2024-12-05',
      rating: 4.7,
      views: 18720,
      image: '🤖',
      tags: ['AI', 'Machine Learning', 'Python']
    },
    {
      id: 5,
      title: 'Mobile App Development Trends',
      description: 'Latest trends and technologies in mobile app development for 2025.',
      category: 'mobile',
      author: 'Lisa Anderson',
      date: '2024-12-03',
      rating: 4.5,
      views: 9840,
      image: '📱',
      tags: ['Mobile', 'React Native', 'Flutter']
    },
    {
      id: 6,
      title: 'Database Optimization Techniques',
      description: 'Advanced techniques for optimizing database performance and scalability.',
      category: 'tutorial',
      author: 'John Smith',
      date: '2024-12-01',
      rating: 4.8,
      views: 7650,
      image: '🗄️',
      tags: ['Database', 'SQL', 'Performance']
    }
  ];

  const filters = [
    { key: 'all', label: 'All Results', icon: '📋' },
    { key: 'tutorial', label: 'Tutorials', icon: '📚' },
    { key: 'design', label: 'Design', icon: '🎨' },
    { key: 'technology', label: 'Technology', icon: '⚙️' },
    { key: 'mobile', label: 'Mobile', icon: '📱' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const filteredResults = searchResults.filter(item => 
    selectedFilter === 'all' || item.category === selectedFilter
  ).filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">
            <span style={{color: '#fff'}}>🔍 SearchHub</span>
          </a>
          <div className="navbar-nav ms-auto">
            <a href="/" className="nav-link text-white">Home</a>
            <a href="/search" className="nav-link text-white fw-bold">Search</a>
            <a href="/trending" className="nav-link text-white">Trending</a>
            <a href="/favorites" className="nav-link text-white">Favorites</a>
          </div>
        </div>
      </nav>

      {/* Search Hero Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div 
              className="card border-0 shadow-lg"
              style={{
                borderRadius: '25px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="display-5 fw-bold mb-3" style={{color: '#2c3e50'}}>
                    Discover Amazing Content
                  </h1>
                  <p className="lead text-muted">
                    Search through thousands of tutorials, articles, and resources
                  </p>
                </div>

                {/* Search Form */}
                <div onSubmit={handleSearch} className="mb-4">
                  <div className="input-group input-group-lg">
                    <span className="input-group-text border-0" style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '20px 0 0 20px'
                    }}>
                      <span style={{color: 'white', fontSize: '20px'}}>🔍</span>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Search for tutorials, guides, tips..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        fontSize: '18px',
                        padding: '15px'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn text-white border-0 px-4"
                      style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '0 20px 20px 0',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {isSearching ? (
                        <div className="spinner-border spinner-border-sm text-white" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        'Search'
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Search Suggestions */}
                <div className="text-center">
                  <small className="text-muted me-3">Popular searches:</small>
                  {['React', 'JavaScript', 'Design', 'AI', 'Mobile'].map((tag, index) => (
                    <button
                      key={index}
                      className="btn btn-sm btn-outline-secondary rounded-pill me-2 mb-2"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      <div className="container pb-5">
        <div className="row">
          
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div 
              className="card border-0 shadow-lg sticky-top"
              style={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                top: '20px'
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{color: '#2c3e50'}}>
                  🎯 Filters
                </h5>
                
                {/* Category Filters */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2" style={{color: '#495057'}}>
                    Categories
                  </h6>
                  {filters.map((filter) => (
                    <div key={filter.key} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id={filter.key}
                        checked={selectedFilter === filter.key}
                        onChange={() => setSelectedFilter(filter.key)}
                      />
                      <label className="form-check-label" htmlFor={filter.key}>
                        {filter.icon} {filter.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2" style={{color: '#495057'}}>
                    Sort By
                  </h6>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{borderRadius: '12px'}}
                  >
                    <option value="relevance">📊 Relevance</option>
                    <option value="date">📅 Date</option>
                    <option value="rating">⭐ Rating</option>
                    <option value="views">👁️ Views</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div>
                  <h6 className="fw-semibold mb-2" style={{color: '#495057'}}>
                    View Mode
                  </h6>
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('grid')}
                      style={{borderRadius: '12px 0 0 12px'}}
                    >
                      🔲 Grid
                    </button>
                    <button
                      type="button"
                      className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('list')}
                      style={{borderRadius: '0 12px 12px 0'}}
                    >
                      📋 List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="col-lg-9">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 text-white">
              <div>
                <h4 className="fw-bold mb-1">
                  Search Results
                </h4>
                <p className="mb-0 opacity-75">
                  Found {sortedResults.length} results {searchQuery && `for "${searchQuery}"`}
                </p>
              </div>
              <div className="badge bg-light text-dark px-3 py-2">
                {selectedFilter === 'all' ? 'All Categories' : filters.find(f => f.key === selectedFilter)?.label}
              </div>
            </div>

            {/* Results Grid/List */}
            {isSearching ? (
              <div className="text-center py-5">
                <div className="spinner-border text-white" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-white mt-3">Searching...</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'row g-4' : ''}>
                {sortedResults.map((result) => (
                  <div key={result.id} className={viewMode === 'grid' ? 'col-md-6 col-lg-4' : 'mb-4'}>
                    <div 
                      className="card border-0 shadow-lg h-100"
                      style={{
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div className={`card-body p-4 ${viewMode === 'list' ? 'd-flex' : ''}`}>
                        
                        {/* Result Icon */}
                        <div className={`${viewMode === 'list' ? 'me-4' : 'text-center mb-3'}`}>
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                            style={{
                              width: '60px',
                              height: '60px',
                              background: 'linear-gradient(135deg, #667eea, #764ba2)',
                              fontSize: '24px',
                              flexShrink: 0
                            }}
                          >
                            {result.image}
                          </div>
                        </div>

                        <div className="flex-grow-1">
                          {/* Result Title */}
                          <h5 className="card-title fw-bold mb-2" style={{color: '#2c3e50'}}>
                            {result.title}
                          </h5>

                          {/* Result Description */}
                          <p className="card-text text-muted mb-3">
                            {result.description}
                          </p>

                          {/* Result Meta */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <small className="text-muted">
                              👤 {result.author}
                            </small>
                            <small className="text-muted">
                              📅 {new Date(result.date).toLocaleDateString()}
                            </small>
                          </div>

                          {/* Result Stats */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                              <span className="text-warning me-1">⭐</span>
                              <small className="text-muted">{result.rating}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="text-info me-1">👁️</span>
                              <small className="text-muted">{result.views.toLocaleString()}</small>
                            </div>
                          </div>

                          {/* Result Tags */}
                          <div className="mb-3">
                            {result.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="badge bg-light text-dark rounded-pill me-1 mb-1"
                                style={{fontSize: '11px'}}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Button */}
                          <button
                            className="btn btn-primary w-100"
                            style={{
                              background: 'linear-gradient(135deg, #667eea, #764ba2)',
                              border: 'none',
                              borderRadius: '12px'
                            }}
                          >
                            📖 Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isSearching && sortedResults.length === 0 && (
              <div className="text-center py-5">
                <div className="mb-4">
                  <span style={{fontSize: '4rem'}}>🔍</span>
                </div>
                <h3 className="text-white fw-bold mb-3">
                  No results found
                </h3>
                <p className="text-white-50 mb-4">
                  Try adjusting your search query or filters
                </p>
                <button
                  className="btn btn-light px-4 py-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Pagination */}
            {sortedResults.length > 0 && (
              <nav className="mt-5">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" style={{borderRadius: '12px 0 0 12px'}}>
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" style={{borderRadius: '0 12px 12px 0'}}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-white-50 small mb-0">
          © 2025 SearchHub. Discover, Learn, Grow
        </p>
      </div>
    </div>
  );
};

export default SearchPage;