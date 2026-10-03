import React from 'react';
import './Features.css';

import exam1 from "../../img/Exam.jpeg";
import exam2 from "../../img/Exam2.jpeg";
import exam3 from "../../img/CR.jpg";

const Features = () => {
  const exams = [
    {
      title: "Goethe-Zertifikat",
      levels: "A1 • A2 • B1 • B2",
      desc: "Internationally recognized certification by the Goethe-Institut for study and employment visas across Germany.",
      img: exam1,
      badge: "Worldwide Standard"
    },
    {
      title: "TELC Language Exam",
      levels: "A1 • A2 • B1 • B2 (Nursing / Work)",
      desc: "Targeted exam formats with deep emphasis on workplace dialogue, healthcare licensing, and technical terminology.",
      img: exam2,
      badge: "Workplace & Visa"
    },
    {
      title: "ÖSD Austrian Diploma",
      levels: "A1 • A2 • B1 • B2",
      desc: "Austrian German Language Diploma recognized across Austria, Germany, and Switzerland for residence and university admissions.",
      img: exam3,
      badge: "EU Recognized"
    }
  ];

  const highlights = [
    "Full-length timed mock exams simulating real testing conditions",
    "Comprehensive writing corrections with line-by-line grammar feedback",
    "Pair & group speaking simulations to conquer exam room anxiety",
    "Official question bank analysis and time management strategies",
    "Personalized readiness assessment before you book your official exam date"
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">Targeted Exam Success</span>
          <h2 className="section-title">Exam Preparation With Proven Confidence</h2>
          <p className="section-subtitle">
            Don't risk retaking expensive certification exams. Our focused preparation modules ensure you master the exact patterns, time constraints, and scoring rubrics.
          </p>
        </div>

        {/* Highlights Bar */}
        <div className="exam-highlights-card glass-card">
          <div className="highlights-title-group">
            <span className="highlight-mini-tag">Our Preparation Protocol</span>
            <h3>What You Receive in Every Prep Batch</h3>
          </div>

          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <div className="highlight-item" key={index}>
                <div className="check-icon-circle">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="var(--brand-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Exam Types Grid */}
        <div className="features-grid">
          {exams.map((item, index) => (
            <div className="feature-item glass-card" key={index}>
              <div className="feature-img-wrapper">
                <img src={item.img} alt={item.title} className="feature-image" />
                <span className="feature-badge">{item.badge}</span>
              </div>
              <div className="feature-content">
                <span className="feature-levels">{item.levels}</span>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;