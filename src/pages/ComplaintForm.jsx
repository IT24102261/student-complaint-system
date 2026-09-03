import { useState } from "react";
import "./ComplaintForm.css";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    category: "",
    title: "",
    description: "",
    priority: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [complaintId, setComplaintId] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error when user starts correcting field
    setErrors({
      ...errors,
      [name]: "",
    });

    setSuccessMessage("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.category) {
      newErrors.category = "Please select a complaint category";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Complaint title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must contain at least 5 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "Description must contain at least 10 characters";
    }

    if (!formData.priority) {
      newErrors.priority = "Please select a priority";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setComplaintId("");

    if (!validateForm()) {
      return;
    }

    // Get previous complaints from localStorage
    const existingComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    // Generate complaint ID
    const newId = Date.now();

    const newComplaint = {
      id: newId,
      studentName: formData.studentName.trim(),
      studentId: formData.studentId.trim(),
      email: formData.email.trim(),
      category: formData.category,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    // Add new complaint
    const updatedComplaints = [
      ...existingComplaints,
      newComplaint,
    ];

    // Save to localStorage
    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    setSuccessMessage(
      "Complaint submitted successfully!"
    );

    setComplaintId(newId);

    // Clear form
    setFormData({
      studentName: "",
      studentId: "",
      email: "",
      category: "",
      title: "",
      description: "",
      priority: "",
    });

    setErrors({});
  };

  return (
    <div className="complaint-form-page">
      <div className="complaint-form-container">
        <div className="form-header">
          <p className="form-label">
            Student Support
          </p>

          <h1>Submit a Complaint</h1>

          <p>
            Tell us about the issue you are facing.
            Please provide accurate information so the
            complaint can be handled properly.
          </p>
        </div>

        {successMessage && (
          <div className="success-message">
            <strong>✓ {successMessage}</strong>

            <p>
              Complaint ID:{" "}
              <strong>{complaintId}</strong>
            </p>

            <p>Status: Pending</p>
          </div>
        )}

        <form
          className="complaint-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="studentName">
              Student Name *
            </label>

            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={handleChange}
            />

            {errors.studentName && (
              <span className="error-message">
                {errors.studentName}
              </span>
            )}
          </div>

          {/* Student ID */}
          <div className="form-group">
            <label htmlFor="studentId">
              Student ID *
            </label>

            <input
              type="text"
              id="studentId"
              name="studentId"
              placeholder="Example: IT241002"
              value={formData.studentId}
              onChange={handleChange}
            />

            {errors.studentId && (
              <span className="error-message">
                {errors.studentId}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address *
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">
              Complaint Category *
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">
                Select Category
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

            {errors.category && (
              <span className="error-message">
                {errors.category}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="form-group full-width">
            <label htmlFor="title">
              Complaint Title *
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a short title for the complaint"
              value={formData.title}
              onChange={handleChange}
            />

            {errors.title && (
              <span className="error-message">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description">
              Description *
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe your complaint in detail..."
              value={formData.description}
              onChange={handleChange}
            />

            <div className="description-info">
              <span>
                {formData.description.length} characters
              </span>
            </div>

            {errors.description && (
              <span className="error-message">
                {errors.description}
              </span>
            )}
          </div>

          {/* Priority */}
          <div className="form-group full-width">
            <label>
              Priority *
            </label>

            <div className="priority-options">
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={
                    formData.priority === "Low"
                  }
                  onChange={handleChange}
                />

                <span>Low</span>
              </label>

              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={
                    formData.priority === "Medium"
                  }
                  onChange={handleChange}
                />

                <span>Medium</span>
              </label>

              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={
                    formData.priority === "High"
                  }
                  onChange={handleChange}
                />

                <span>High</span>
              </label>
            </div>

            {errors.priority && (
              <span className="error-message">
                {errors.priority}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setFormData({
                  studentName: "",
                  studentId: "",
                  email: "",
                  category: "",
                  title: "",
                  description: "",
                  priority: "",
                });

                setErrors({});
                setSuccessMessage("");
              }}
            >
              Clear
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;
