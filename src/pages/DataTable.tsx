import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Eye, Edit, Trash2, Plus, Filter, Download } from 'lucide-react';

const DataTable = () => {
  // Sample data
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT', status: 'Active', joinDate: '2023-01-15', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', department: 'HR', status: 'Active', joinDate: '2023-02-20', salary: 65000 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', department: 'IT', status: 'Inactive', joinDate: '2023-03-10', salary: 60000 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Designer', department: 'Design', status: 'Active', joinDate: '2023-04-05', salary: 55000 },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Analyst', department: 'Finance', status: 'Active', joinDate: '2023-05-12', salary: 50000 },
    { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', role: 'Coordinator', department: 'Marketing', status: 'Active', joinDate: '2023-06-18', salary: 45000 },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Specialist', department: 'IT', status: 'Inactive', joinDate: '2023-07-22', salary: 52000 },
    { id: 8, name: 'Amy Taylor', email: 'amy@example.com', role: 'Lead', department: 'Design', status: 'Active', joinDate: '2023-08-30', salary: 58000 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Filtering and sorting logic
  const filteredData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All' || item.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDepartment;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, statusFilter, departmentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
    setSelectedRows(prev => prev.filter(rowId => rowId !== id));
  };

  const handleBulkDelete = () => {
    setData(prev => prev.filter(item => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'Active' ? 'badge bg-success' : 'badge bg-danger';
    return <span className={badgeClass}>{status}</span>;
  };

  const departments = ['All', ...new Set(data.map(item => item.department))];
  const statuses = ['All', 'Active', 'Inactive'];

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">
                <i className="fas fa-table me-2"></i>
                Employee DataTable
              </h4>
            </div>
            <div className="col-auto">
              <button className="btn btn-light btn-sm">
                <Plus size={16} className="me-1" />
                Add New
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Controls Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="btn-group w-100">
                <button className="btn btn-outline-secondary btn-sm">
                  <Download size={16} />
                </button>
                {selectedRows.length > 0 && (
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="row mb-3">
            <div className="col">
              <small className="text-muted">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
              </small>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th width="50">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedRows.length === currentData.length && currentData.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="d-flex align-items-center">
                      Name {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('email')}
                  >
                    <div className="d-flex align-items-center">
                      Email {getSortIcon('email')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('role')}
                  >
                    <div className="d-flex align-items-center">
                      Role {getSortIcon('role')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('department')}
                  >
                    <div className="d-flex align-items-center">
                      Department {getSortIcon('department')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('status')}
                  >
                    <div className="d-flex align-items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="d-flex align-items-center">
                      Join Date {getSortIcon('joinDate')}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer user-select-none"
                    onClick={() => handleSort('salary')}
                  >
                    <div className="d-flex align-items-center">
                      Salary {getSortIcon('salary')}
                    </div>
                  </th>
                  <th width="150">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map(item => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'table-primary' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar bg-primary text-white rounded-circle me-2" style={{width: '32px', height: '32px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          {item.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <span className="badge bg-secondary">{item.role}</span>
                    </td>
                    <td>{item.department}</td>
                    <td>{getStatusBadge(item.status)}</td>
                    <td>{new Date(item.joinDate).toLocaleDateString()}</td>
                    <td>${item.salary.toLocaleString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="View">
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-outline-warning" title="Edit">
                          <Edit size={14} />
                        </button>
                        <button 
                          className="btn btn-outline-danger" 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row mt-3">
              <div className="col-md-6">
                <nav>
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return pageNumber <= totalPages ? (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ) : null;
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        Last
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-6 text-end">
                <small className="text-muted">
                  Page {currentPage} of {totalPages}
                </small>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .table th {
          border-top: none;
          font-weight: 600;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.075);
        }
        .avatar {
          font-size: 12px;
          font-weight: 600;
        }
        .card {
          border: none;
          border-radius: 10px;
        }
        .card-header {
          border-radius: 10px 10px 0 0;
        }
        .btn-group-sm .btn {
          padding: 0.25rem 0.5rem;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </div>
  );
};

export default DataTable;

