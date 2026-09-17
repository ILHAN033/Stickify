import { useNavigate } from "react-router-dom";
import "../src/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">
        <div className="logo">
          <span className="logo-icon">✓</span>
          <span className="logo-title">Stickify</span>
        </div>

        <div className="nav-actions">
          <button
            className="nav-login"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </button>

          <button
            className="nav-signup"
            onClick={() => navigate("/sign-up")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ Your productivity, simplified
          </div>

          <h1>
            Organize your work.
            <br />
            <span>Achieve your goals.</span>
          </h1>

          <p>
            Manage your tasks, create notes, track your progress,
            and keep everything you need in one beautiful workspace.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/sign-up")}
            >
              Get Started
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </div>

          <div className="hero-info">
            <span>✓ Easy to use</span>
            <span>✓ Secure</span>
            <span>✓ All in one place</span>
          </div>
        </div>

        {/* ================= DASHBOARD PREVIEW ================= */}
        <div className="dashboard-preview">
          <div className="preview-header">
            <div>
              <span className="preview-label">Dashboard</span>

              <h3>Good evening 👋</h3>
            </div>

            <div className="preview-avatar">U</div>
          </div>

          {/* Stats */}
          <div className="preview-stats">
            <div className="preview-card">
              <span>Tasks</span>

              <strong>24</strong>

              <small>+12% this week</small>
            </div>

            <div className="preview-card">
              <span>Completed</span>

              <strong>18</strong>

              <small>75% completion</small>
            </div>

            <div className="preview-card">
              <span>Notes</span>

              <strong>12</strong>

              <small>3 updated today</small>
            </div>
          </div>

          {/* Workspace */}
          <div className="preview-workspace">
            {/* Chart */}
            <div className="preview-chart">
              <div className="workspace-title">
                <span>Weekly Activity</span>

                <span className="chart-value">82%</span>
              </div>

              <div className="bars">
                <span style={{ height: "35%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "45%" }}></span>
                <span style={{ height: "75%" }}></span>
                <span style={{ height: "60%" }}></span>
                <span style={{ height: "90%" }}></span>
                <span style={{ height: "70%" }}></span>
              </div>

              <div className="days">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>

            {/* Notes */}
            <div className="preview-notes">
              <div className="workspace-title">
                <span>Quick Notes</span>

                <span>+</span>
              </div>

              <div className="mini-note">
                <span>📌</span>
                Finish project UI
              </div>

              <div className="mini-note">
                <span>💡</span>
                New feature ideas
              </div>

              <div className="mini-note">
                <span>📝</span>
                Review today's tasks
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="section-heading">
          <span>POWERFUL FEATURES</span>

          <h2>Everything you need to stay productive</h2>

          <p>
            A simple workspace designed to help you focus on what matters.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">📋</div>

            <h3>Task Management</h3>

            <p>
              Create, organize, and track your tasks so nothing
              gets forgotten.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">📌</div>

            <h3>Sticky Notes</h3>

            <p>
              Capture quick ideas and important information with
              movable notes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Track Progress</h3>

            <p>
              Visualize your productivity with charts and useful
              statistics.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3>Secure Account</h3>

            <p>
              Protect your account with secure authentication and
              password recovery.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to get organized?</h2>

          <p>
            Start managing your tasks and ideas in one place.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/sign-up")}
          >
            Create Your Account
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="logo">
          <span className="logo-icon">✓</span>
          <span className="logo-title">Stickify</span>
        </div>

        <p>© 2026 Stickify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;