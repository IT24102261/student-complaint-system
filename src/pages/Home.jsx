import { Link } from "react-router-dom";

function Home() {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  const total = complaints.length;

  const pending = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">Student Support Portal</p>

          <h1>Student Complaint Management System</h1>

          <p>
            Report campus-related issues quickly and keep track of their
            progress from one simple platform.
          </p>

          <div className="hero-buttons">
            <Link to="/submit" className="btn btn-primary">
              Submit Complaint
            </Link>

            <Link to="/complaints" className="btn btn-secondary">
              View Complaints
            </Link>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Complaint Overview</h2>
          <p>Quick summary of complaints currently in the system.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Complaints</h3>
            <p>{total}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{inProgress}</p>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <p>{resolved}</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-heading">
          <h2>How It Works</h2>
          <p>Submit and manage complaints in three simple steps.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Submit</h3>
            <p>Enter the details of your issue using the complaint form.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Track</h3>
            <p>View submitted complaints and check their current status.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Resolve</h3>
            <p>Staff can update complaints until the issue is resolved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
