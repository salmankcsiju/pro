import React, { useState } from 'react';
import './Enrollment.css';

const Enrollment = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Securing your reservation...");
    setIsSuccess(false);

    const scriptURL = "https://script.google.com/macros/s/AKfycbz-2cKBB2A-2R29B6sT0wRAUBiq63c_Pb0zkBO8sh1Yo0-VgPj8ob_a1f6vnYz8br-fjA/exec";
    const formData = new FormData(e.target);

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(() => {
        setStatus("Success! Your free demo class has been requested. Our academic coordinator will contact you via WhatsApp / Phone within 24 hours.");
        setIsSuccess(true);
        setLoading(false);
        e.target.reset();
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setStatus("Unable to send request right now. Please message us directly on WhatsApp (+91 7892793468).");
        setIsSuccess(false);
        setLoading(false);
      });
  };

  return (
    <section id="enroll-now" className="enroll-section">
      <div className="container">
        <div className="enroll-card glass-card">
          {/* Left Column: Value Proposition */}
          <div className="enroll-info">
            <span className="section-tag">Start Your Journey</span>
            <h2 className="enroll-title">Book Your Free Live Demo Class</h2>
            <p className="enroll-desc">
              Experience our interactive teaching methodology firsthand. Connect with certified tutors, assess your starting level, and receive a customized roadmap for your German goals.
            </p>

            <div className="enroll-guarantees">
              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <strong>Guaranteed 24-Hour Response</strong>
                  <p>Our team reaches out promptly with batch timings.</p>
                </div>
              </div>

              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <strong>Direct Teacher Consultation</strong>
                  <p>Get personalized guidance based on your academic background.</p>
                </div>
              </div>

              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <strong>Zero Obligation & 100% Free</strong>
                  <p>Attend the demo session with no commitment required.</p>
                </div>
              </div>
            </div>

            <div className="direct-wa-box">
              <span>Prefer fast messaging?</span>
              <a 
                href="https://wa.me/917892793468?text=Hi%20Pro2Deutsch,%20I'd%20like%20to%20book%20a%20free%20demo%20class." 
                target="_blank" 
                rel="noreferrer"
                className="direct-wa-link"
              >
                Chat on WhatsApp (+91 7892793468) &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Webhook Form */}
          <div className="enroll-form-wrapper">
            <div className="form-card-inner">
              <h3 className="form-heading">Demo Class Registration</h3>
              <p className="form-subheading">Fill out your details to reserve your slot.</p>

              <form className="enroll-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="enroll-name">Full Name *</label>
                  <input 
                    id="enroll-name"
                    type="text" 
                    name="name" 
                    placeholder="e.g. Rahul Sharma" 
                    required 
                    className="form-input"
                  />
                </div>

                <div className="form-row-dual">
                  <div className="input-group">
                    <label htmlFor="enroll-email">Email Address *</label>
                    <input 
                      id="enroll-email"
                      type="email" 
                      name="email" 
                      placeholder="name@example.com" 
                      required 
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="enroll-phone">Phone / WhatsApp Number *</label>
                    <input 
                      id="enroll-phone"
                      type="tel" 
                      name="phone" 
                      placeholder="+91 98765 43210" 
                      required 
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-dual">
                  <div className="input-group">
                    <label htmlFor="enroll-current">Current German Level *</label>
                    <select id="enroll-current" name="currentLevel" required className="form-select" defaultValue="">
                      <option value="" disabled>Select Current Level</option>
                      <option value="none">Absolute Beginner (Never studied)</option>
                      <option value="A1">A1 Completed</option>
                      <option value="A2">A2 Completed</option>
                      <option value="B1">B1 Completed</option>
                      <option value="B2">B2 (Advanced)</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="enroll-target">Target Level *</label>
                    <select id="enroll-target" name="targetLevel" required className="form-select" defaultValue="">
                      <option value="" disabled>Select Target Level</option>
                      <option value="A1">A1 Certification</option>
                      <option value="A2">A2 Elementary</option>
                      <option value="B1">B1 (Study / Visa Required)</option>
                      <option value="B2">B2 (Career / Medical Licensing)</option>
                      <option value="Fluency">General Speaking Fluency</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="enroll-goal">Primary Learning Goal *</label>
                  <select id="enroll-goal" name="learningGoal" required className="form-select" defaultValue="">
                    <option value="" disabled>Select Primary Goal</option>
                    <option value="study">Study in Germany (Bachelors / Masters)</option>
                    <option value="work">Work Visa / Job Seekers (Opportunity Card)</option>
                    <option value="medical">Healthcare / Nursing Licensing</option>
                    <option value="exam">Goethe / TELC Exam Preparation</option>
                    <option value="other">Personal Relocation / General Interest</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-gold form-submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="submit-loading">
                      <span className="spinner"></span>
                      Saving details...
                    </span>
                  ) : (
                    <span>Confirm Free Demo Class</span>
                  )}
                </button>

                {status && (
                  <div className={`form-feedback-banner ${isSuccess ? 'success' : 'error'}`}>
                    <p>{status}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enrollment;