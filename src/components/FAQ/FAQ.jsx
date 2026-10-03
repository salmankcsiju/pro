import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How long does it typically take to reach B1 from absolute beginner?",
      answer: "Starting from scratch, reaching solid B1 fluency usually requires 6 to 8 months of consistent study in our structured batches (typically 6–8 weeks per level). Fast-track intensive tracks are also available for students with urgent visa or university deadlines."
    },
    {
      question: "Are your classes live interactive sessions or pre-recorded?",
      answer: "All Pro2Deutsch sessions are 100% live, interactive online classes led by experienced certified trainers. We prioritize active two-way speaking and immediate error correction. Every session is recorded so you can review complex grammar topics at your own pace."
    },
    {
      question: "Do you provide exam registration guidance and mock tests?",
      answer: "Yes! We walk you through the entire Goethe-Zertifikat, TELC, and ÖSD registration process. More importantly, we conduct timed full-length mock exams and individual readiness evaluations before you register to ensure you pass on your first attempt."
    },
    {
      question: "I am a working professional / full-time student. Are schedules flexible?",
      answer: "Absolutely. We offer dedicated evening batches on weekdays as well as weekend-only intensive batches tailored specifically for working professionals, doctors, nurses, and engineering students."
    },
    {
      question: "What happens if I miss a live class due to work or emergencies?",
      answer: "You never fall behind. Full HD recordings of every class are uploaded to our student portal alongside class slides, homework assignments, and tutor notes. You can also request a brief doubt-clearing catchup with your instructor."
    },
    {
      question: "How do I know which level I should enroll in?",
      answer: "If you have prior German learning experience, you can take our free 5-Minute Online Proficiency Quiz on this website. Our academic team will also conduct a brief 1-on-1 assessment during your Free Demo Class to place you accurately."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">Frequently Asked Questions</span>
          <h2 className="section-title">Everything You Need To Know</h2>
          <p className="section-subtitle">
            Transparent answers to common questions about our teaching methodology, batch schedules, exams, and support.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                className={`faq-item glass-card ${isOpen ? 'active' : ''}`}
                key={index}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <div className={`faq-icon-wrapper ${isOpen ? 'rotate' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                <div className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}>
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-bottom-banner">
          <p>Have a question not covered here?</p>
          <a 
            href="https://wa.me/917892793468?text=Hi%20Pro2Deutsch,%20I%20have%20a%20question%20about%20your%20courses." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-gold"
          >
            Chat Directly on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
