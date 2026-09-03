
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ComplaintDetails.css";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Load complaint using URL ID
  useEffect(() => {
    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const selectedComplaint = complaints.find(
      (item) => String(item.id) === String(id)
    );

    if (selectedComplaint) {
      setComplaint(selectedComplaint);
      setSelectedStatus(selectedComplaint.status);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [id]);

  // Update complaint status
  const handleStatusUpdate = () => {
    if (!complaint) {
      return;
    }

    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updatedComplaints = complaints.map((item) => {
      if (String(item.id) === String(id)) {
        return {
          ...item,
          status: selectedStatus,
        };
      }

      return item;
    });

    // Save updated complaints
    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    // Update displayed complaint
    const updatedComplaint = {
      ...complaint,
      status: selectedStatus,
    };

    setComplaint(updatedComplaint);

    setSuccessMessage(
      "Complaint status updated successfully!"
    );

    // Remove success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Complaint does not exist
  if (notFound) {
    return (
      <div className="details-page">
        <div className="not-found-card">
          <div className="not-found-icon">
            !
          </div>

          <h1>Complaint Not Found</h1>

          <p>
            The complaint you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            to="/complaints"
            className="back-button"
          >
            ← Back to Complaints
          </Link>
        </div>
      </div>
    );
  }

  // Loading
  if (!complaint) {
    return (
      <div className="details-page">
        <div className="loading-message">
          Loading complaint...
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-container">

        {/* Back button */}
        <Link
          to="/complaints"
          className="back-link"
        >
          ← Back to Complaints
        </Link>

        {/* Header */}
        <div className="details-header">
          <div>
            <p className="details-label">
              Complaint Details
            </p>

            <h1>{complaint.title}</h1>

            <p className="complaint-number">
              Complaint ID: #{complaint.id}
            </p>
          </div>

          <span
            className={`details-status-badge ${getStatusClass(
              complaint.status
            )}`}
          >
            {complaint.status}
          </span>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="update-success-message">
            ✓ {successMessage}
          </div>
        )}

        <div className="details-layout">

          {/* Complaint Information */}
          <div className="complaint-information-card">
            <h2>Complaint Information</h2>

            <div className="information-grid">

              <div className="information-item">
                <span>Student Name</span>
                <strong>
                  {complaint.studentName}
                </strong>
              </div>

              <div className="information-item">
                <span>Student ID</span>
                <strong>
                  {complaint.studentId}
                </strong>
              </div>

              <div className="information-item">
                <span>Email</span>
                <strong>
                  {complaint.email || "Not provided"}
                </strong>
              </div>

              <div className="information-item">
                <span>Category</span>
                <strong>
                  {complaint.category}
                </strong>
              </div>

              <div className="information-item">
                <span>Priority</span>

                <strong
                  className={getPriorityClass(
                    complaint.priority
                  )}
                >
                  {complaint.priority}
                </strong>
              </div>

              <div className="information-item">
                <span>Date Submitted</span>
                <strong>
                  {complaint.date}
                </strong>
              </div>

            </div>

            <div className="description-section">
              <span>Description</span>

              <p>
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Status Management */}
          <div className="status-management-card">
            <h2>Status Management</h2>

            <p>
              Update the current progress of this complaint.
            </p>

            <div className="current-status-section">
              <span>Current Status</span>

              <div
                className={`current-status ${getStatusClass(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </div>
            </div>

            <div className="status-form-group">
              <label htmlFor="status">
                Update Status
              </label>

              <select
                id="status"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value)
                }
              >
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

            <button
              className="update-status-button"
              onClick={handleStatusUpdate}
              disabled={
                selectedStatus === complaint.status
              }
            >
              Update Status
            </button>

            {selectedStatus === complaint.status && (
              <p className="same-status-message">
                Select a different status to update.
              </p>
            )}
          </div>

        </div>

        {/* Status Progress */}
        <div className="progress-card">
          <h2>Complaint Progress</h2>

          <div className="progress-steps">

            <div className="progress-step active-step">
              <div className="progress-circle">
                ✓
              </div>

              <div>
                <strong>Submitted</strong>
                <p>
                  Complaint received
                </p>
              </div>
            </div>

            <div
              className={`progress-step ${
                complaint.status === "In Progress" ||
                complaint.status === "Resolved"
                  ? "active-step"
                  : ""
              }`}
            >
              <div className="progress-circle">
                2
              </div>

              <div>
                <strong>In Progress</strong>
                <p>
                  Complaint being reviewed
                </p>
              </div>
            </div>

            <div
              className={`progress-step ${
                complaint.status === "Resolved"
                  ? "active-step"
                  : ""
              }`}
            >
              <div className="progress-circle">
                3
              </div>

              <div>
                <strong>Resolved</strong>
                <p>
                  Complaint completed
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Status CSS helper
function getStatusClass(status) {
  if (status === "Resolved") {
    return "status-resolved";
  }

  if (status === "In Progress") {
    return "status-progress";
  }

  return "status-pending";
}

// Priority CSS helper
function getPriorityClass(priority) {
  if (priority === "High") {
    return "priority-high";
  }

  if (priority === "Medium") {
    return "priority-medium";
  }

  return "priority-low";
}

export default ComplaintDetails;