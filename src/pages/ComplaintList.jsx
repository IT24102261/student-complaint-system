import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ComplaintList.css";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Load complaints from localStorage
  useEffect(() => {
    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(savedComplaints);
  }, []);

  // Search + Filter logic
  const filteredComplaints = complaints.filter((complaint) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      complaint.title?.toLowerCase().includes(search) ||
      complaint.studentName?.toLowerCase().includes(search) ||
      complaint.studentId?.toLowerCase().includes(search) ||
      String(complaint.id).includes(search);

    const matchesCategory =
      categoryFilter === "All" ||
      complaint.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      complaint.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority
    );
  });

  const clearFilters = () => {
    setSearchText("");
    setCategoryFilter("All");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div className="complaint-list-page">
      <div className="complaint-list-container">

        {/* Header */}
        <div className="list-header">
          <div>
            <p className="list-label">Complaint Management</p>

            <h1>All Complaints</h1>

            <p>
              Search, filter and view complaints submitted by students.
            </p>
          </div>

          <Link to="/submit" className="new-complaint-button">
            + New Complaint
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="filter-section">

          <div className="search-box">
            <label htmlFor="search">
              Search Complaints
            </label>

            <input
              type="text"
              id="search"
              placeholder="Search by title, student, ID..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />
          </div>

          <div className="filter-grid">

            {/* Category */}
            <div className="filter-group">
              <label>Category</label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="All">
                  All Categories
                </option>

                <option value="WiFi">
                  WiFi
                </option>

                <option value="Lab">
                  Lab
                </option>

                <option value="Library">
                  Library
                </option>

                <option value="Classroom">
                  Classroom
                </option>

                <option value="Timetable">
                  Timetable
                </option>

                <option value="Facilities">
                  Facilities
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Status */}
            <div className="filter-group">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>
              </select>
            </div>

            {/* Priority */}
            <div className="filter-group">
              <label>Priority</label>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
              >
                <option value="All">
                  All Priorities
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

            <button
              className="clear-filter-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        </div>

        {/* Result count */}
        <div className="results-info">
          <p>
            Showing{" "}
            <strong>{filteredComplaints.length}</strong>{" "}
            of{" "}
            <strong>{complaints.length}</strong>{" "}
            complaints
          </p>
        </div>

        {/* Complaint Cards */}
        {filteredComplaints.length > 0 ? (
          <div className="complaints-grid">

            {filteredComplaints.map((complaint) => (
              <div
                className="complaint-card"
                key={complaint.id}
              >

                <div className="complaint-card-top">
                  <span className="complaint-id">
                    #{complaint.id}
                  </span>

                  <span
                    className={`status-badge ${getStatusClass(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <h2>
                  {complaint.title}
                </h2>

                <p className="complaint-description">
                  {complaint.description}
                </p>

                <div className="complaint-details">

                  <div>
                    <span>Student</span>
                    <strong>
                      {complaint.studentName}
                    </strong>
                  </div>

                  <div>
                    <span>Student ID</span>
                    <strong>
                      {complaint.studentId}
                    </strong>
                  </div>

                  <div>
                    <span>Category</span>
                    <strong>
                      {complaint.category}
                    </strong>
                  </div>

                  <div>
                    <span>Priority</span>

                    <strong
                      className={`priority-text ${getPriorityClass(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority}
                    </strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>
                      {complaint.date}
                    </strong>
                  </div>

                </div>

                <Link
                  to={`/complaints/${complaint.id}`}
                  className="view-details-button"
                >
                  View Details
                </Link>

              </div>
            ))}

          </div>
        ) : (
          <div className="empty-state">
            <h2>No complaints found</h2>

            <p>
              Try changing your search or filter options.
            </p>

            <button
              onClick={clearFilters}
              className="empty-clear-button"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Status CSS class
function getStatusClass(status) {
  if (status === "Resolved") {
    return "status-resolved";
  }

  if (status === "In Progress") {
    return "status-progress";
  }

  return "status-pending";
}

// Priority CSS class
function getPriorityClass(priority) {
  if (priority === "High") {
    return "priority-high";
  }

  if (priority === "Medium") {
    return "priority-medium";
  }

  return "priority-low";
}

export default ComplaintList;