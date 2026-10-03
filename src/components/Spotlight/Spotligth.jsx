import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProficiencyTest from '../ProficiencyTest/ProficiencyTest';
import './Spotligth.css';

const TOTAL_FRAMES = 274;

// Helper to format frame path: ezgif-frame-001.jpg ... ezgif-frame-274.jpg
const getFrameUrl = (frameIndex) => {
  const padded = String(frameIndex).padStart(3, '0');
  return `/frames/ezgif-frame-001.jpg`.replace('001', padded);
};

function Spotlight({ coursesData = [] }) {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [framesLoadedPercent, setFramesLoadedPercent] = useState(0);

  const canvasRef = useRef(null);
  const progressFillRef = useRef(null);
  const frameCounterRef = useRef(null);
  
  // Cache for loaded HTMLImageElements: frameNumber -> HTMLImageElement
  const loadedFramesRef = useRef(new Map());
  const activeFrameIndexRef = useRef(1);
  const currentFrameFloatRef = useRef(1);
  const targetFrameIndexRef = useRef(1);
  const animFrameIdRef = useRef(null);

  // Pathways data (Preserved from existing design)
  const pathways = [
    {
      id: 'study',
      tag: 'Academic Track',
      level: 'A1 → B2',
      title: 'Study in Germany',
      desc: 'Structured curriculum to help you meet university admission criteria, pass language proficiency exams, and study tuition-free at top German universities.',
      points: ['Public university entrance prep', 'Academic reading & essay writing', 'Goethe & TELC B1/B2 certifications'],
      cta: 'Explore Study Pathway'
    },
    {
      id: 'career',
      tag: 'Professional Track',
      level: 'B1 → B2 Fluency',
      title: 'Work & Professional Career',
      desc: 'Designed for IT professionals, engineers, and healthcare workers (nurses & physicians) needing job-ready German for the workplace and licensing.',
      points: ['German CV & job interview training', 'Workplace emails & meetings', 'Specialized medical/technical vocabulary'],
      cta: 'Explore Career Pathway'
    },
    {
      id: 'relocate',
      tag: 'Lifestyle & Relocation',
      level: 'A1 → B1',
      title: 'Relocation & Visa Integration',
      desc: 'Fast-track modules designed for spouse visas, Opportunity Card (Chancenkarte), and immigrants who want everyday conversational confidence in Germany.',
      points: ['A1 visa requirement guarantee', 'Real-life speaking simulations', 'Cultural norms & official paperwork'],
      cta: 'Explore Relocation Pathway'
    }
  ];

  const teachingPillars = [
    {
      title: 'Structured Progression',
      desc: 'Clear CEFR-aligned learning goals for every level. Step-by-step grammar explanations without confusing jargon.'
    },
    {
      title: 'Guided Speaking in Every Class',
      desc: 'Active verbal practice from Day 1. Break the hesitation barrier with simulated real-world scenarios.'
    },
    {
      title: 'Honest Exam Strategy',
      desc: 'Timed mock evaluations, speaking drills, and personalized essay corrections for Goethe, TELC, and ÖSD.'
    },
    {
      title: 'Personalized Attention',
      desc: 'Small batch sizes (6–10 students) ensure every learner receives individual correction and support.'
    }
  ];

  // Draw a frame onto the canvas using "cover" aspect-ratio logic
  const drawFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the requested image or the nearest available loaded frame
    let img = loadedFramesRef.current.get(frameNumber);
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame to prevent any blank canvas or flicker
      let bestDiff = Infinity;
      let fallbackImg = null;
      for (const [idx, loadedImg] of loadedFramesRef.current.entries()) {
        if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
          const diff = Math.abs(idx - frameNumber);
          if (diff < bestDiff) {
            bestDiff = diff;
            fallbackImg = loadedImg;
          }
        }
      }
      img = fallbackImg;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Calculate 'cover' fit
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // Set canvas resolution handling devicePixelRatio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);
    
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      drawFrame(activeFrameIndexRef.current);
    }
  }, [drawFrame]);

  // PROGRESSIVE PRELOAD ENGINE:
  // Phase 1: Frame 1 immediately
  // Phase 2: Keyframes distributed across 274 timeline
  // Phase 3: Background fill of remaining frames during idle time
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadSingleImage = (index) => {
      if (loadedFramesRef.current.has(index)) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            loadedFramesRef.current.set(index, img);
            loadedCount++;
            setFramesLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            // If this is frame 1 and it's the first draw, render immediately
            if (index === 1 && activeFrameIndexRef.current === 1) {
              drawFrame(1);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // 1. Load First Frame Instantly
    loadSingleImage(1).then(() => {
      if (isCancelled) return;
      resizeCanvas();

      // 2. Preload Keyframes (every 3rd frame for immediate responsive scrub)
      const keyframes = [];
      const step = window.innerWidth < 768 ? 4 : 3;
      for (let i = 1; i <= TOTAL_FRAMES; i += step) {
        if (i !== 1) keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES)) keyframes.push(TOTAL_FRAMES);

      // Batch load keyframes in chunks of 8
      const loadBatch = async (items, batchSize) => {
        for (let i = 0; i < items.length; i += batchSize) {
          if (isCancelled) break;
          const chunk = items.slice(i, i + batchSize);
          await Promise.all(chunk.map(idx => loadSingleImage(idx)));
        }
      };

      loadBatch(keyframes, 8).then(() => {
        if (isCancelled) return;
        // 3. Background fill of all remaining intermediate frames
        const remaining = [];
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
          if (!loadedFramesRef.current.has(i)) {
            remaining.push(i);
          }
        }
        loadBatch(remaining, 6);
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, resizeCanvas]);

  // Window Resize Listener
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // GLOBAL SCROLL SCRUBBING: Maps page scroll through Hero down to Footer across 274 frames
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footer = document.querySelector('.website-footer') || document.querySelector('.site-footer');
      const footerHeight = footer ? footer.offsetHeight : 450;

      // Scrollable distance before the footer is fully in view
      const totalScrollableDistance = Math.max(1, docHeight - viewportHeight - footerHeight);
      const rawProgress = Math.max(0, Math.min(1, scrollY / totalScrollableDistance));

      if (progressFillRef.current) {
        progressFillRef.current.style.height = `${Math.round(rawProgress * 100)}%`;
      }

      // Map 0% = Frame 1, 100% = Frame 274
      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(rawProgress * (TOTAL_FRAMES - 1)) + 1));
      targetFrameIndexRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Lerp animation loop for smooth cinematic scrubbing without sudden jumps
    const renderLoop = () => {
      const currentFloat = currentFrameFloatRef.current;
      const target = targetFrameIndexRef.current;
      const diff = target - currentFloat;

      if (Math.abs(diff) > 0.001) {
        // Interpolation factor 0.11 for smooth cinematic momentum
        const factor = 0.11;
        let nextFloat = currentFloat + diff * factor;

        // Snapping threshold when very close to target so it never hangs or mismatches
        if (Math.abs(target - nextFloat) < 0.15) {
          nextFloat = target;
        }

        currentFrameFloatRef.current = nextFloat;
        const displayFrame = Math.round(nextFloat);

        if (displayFrame !== activeFrameIndexRef.current) {
          activeFrameIndexRef.current = displayFrame;
          drawFrame(displayFrame);

          if (frameCounterRef.current) {
            frameCounterRef.current.textContent = `Frame ${displayFrame}/${TOTAL_FRAMES}`;
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <div className="spotlight-wrapper">
      {/* ===================================================================
          GLOBAL CINEMATIC SCROLL-DRIVEN BACKGROUND
          =================================================================== */}
      <div className="cinematic-fixed-background">
        {/* HTML5 Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="cinematic-canvas"
        />

        {/* Cinematic Vignette & Ambient Glow Overlays */}
        <div className="cinematic-vignette"></div>
        <div className="cinematic-light-glow"></div>

        {/* Floating Side Progress Indicator */}
        <div className="cinematic-progress-bar">
          <div 
            ref={progressFillRef}
            className="cinematic-progress-fill" 
            style={{ height: '0%' }}
          ></div>
          <span ref={frameCounterRef} className="cinematic-frame-counter">
            Frame 1/{TOTAL_FRAMES}
          </span>
        </div>
      </div>

      {/* ===================================================================
          1. CINEMATIC HERO SECTION (Over Cinematic Canvas)
          =================================================================== */}
      <section className="cinematic-hero-section">
        <div className="container">
          <div className="hero-content-inner">
            <div className="section-tag">
              German Language Academy • Live Online
            </div>

            <h1 className="cinematic-hero-title">
              Learn German.<br />
              <span className="gradient-text-gold">Open New Paths.</span>
            </h1>

            <p className="cinematic-hero-desc">
              Experience structured German language coaching from A1 to B2. Certified native-level mentors, interactive small batches, and official exam training for higher education and global careers.
            </p>

            <div className="cinematic-cta-group">
              <a href="#enroll-now" className="btn btn-gold cinematic-cta-main">
                <span>Book Free Demo Class</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10.833 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <button 
                type="button" 
                className="btn btn-outline-gold"
                onClick={() => setIsTestOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                <span>Check My Level (5 Min)</span>
              </button>
            </div>

            <div className="cinematic-trust-strip">
              <div className="trust-pill-mini">⭐️ 98% Exam Pass Rate</div>
              <div className="trust-pill-mini">🎓 Goethe, TELC & ÖSD Prep</div>
              <div className="trust-pill-mini">👥 Small Interactive Batches</div>
            </div>

            <div className="cinematic-scroll-prompt">
              <span>↓ Scroll to explore courses & your journey</span>
              <div className="scroll-chevron-anim"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. THREE PATHWAYS SECTION (Over Cinematic Canvas)
          =================================================================== */}
      <section className="pathways-section" id="pathways">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Targeted Roadmaps</span>
            <h2 className="section-title">Where Do You Want German To Take You?</h2>
            <p className="section-subtitle">
              Every learner has a specific destination. We tailor your vocabulary, speaking drills, and exam training to match your real-world goal.
            </p>
          </div>

          <div className="pathways-grid">
            {pathways.map((item) => (
              <div className="pathway-card glass-card" key={item.id}>
                <div className="pathway-header">
                  <span className="pathway-tag">{item.tag}</span>
                  <span className="pathway-level">{item.level}</span>
                </div>

                <h3 className="pathway-title">{item.title}</h3>
                <p className="pathway-desc">{item.desc}</p>

                <ul className="pathway-points">
                  {item.points.map((pt, i) => (
                    <li key={i}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="var(--brand-gold)" strokeWidth="1.5"/>
                        <path d="M6 10l3 3 5-6" stroke="var(--brand-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a href="#enroll-now" className="pathway-link">
                  <span>{item.cta}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. CORE CURRICULUM BENTO SECTION (Over Cinematic Canvas)
          =================================================================== */}
      <section className="curriculum-section" id="curriculum">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Comprehensive Levels</span>
            <h2 className="section-title">Structured German Curriculum (CEFR A1–B2)</h2>
            <p className="section-subtitle">
              From foundational phonetics and everyday communication to professional debates and complex grammar.
            </p>
          </div>

          <div className="curriculum-grid">
            {coursesData.map((course) => (
              <div className="course-card glass-card" key={course.id}>
                <div className="course-media">
                  <img src={course.image} alt={course.name} className="course-img" />
                  <span className={`badge badge-${course.level.toLowerCase()} course-level-badge`}>
                    {course.level} Level
                  </span>
                </div>

                <div className="course-body">
                  <h3 className="course-name">{course.name}</h3>
                  <p className="course-desc">{course.description}</p>

                  <div className="course-topics">
                    <span className="topics-heading">Core Modules:</span>
                    <div className="topics-tags">
                      {course.topics.map((t, idx) => (
                        <span className="topic-pill" key={idx}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="course-outcome-box">
                    <span className="outcome-label">Expected Outcome:</span>
                    <p className="outcome-text">{course.outcome}</p>
                  </div>

                  <div className="course-actions">
                    <Link to={`/course/${course.id}`} className="btn btn-outline-gold course-btn">
                      <span>View Syllabus</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </Link>
                    <a href="#enroll-now" className="btn btn-gold course-enroll-btn">
                      Enroll
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="curriculum-footer-cta">
            <p>Need targeted coaching for Goethe exams, speaking fluency, or healthcare vocabulary?</p>
            <Link to="/courses" className="btn btn-secondary">
              View All 6 Specialized Programs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. OUR TEACHING PILLARS (Over Cinematic Canvas)
          =================================================================== */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-card glass-card">
            <div className="pillars-intro">
              <span className="section-tag">The Pro2Deutsch Difference</span>
              <h2>Why Serious Learners Choose Our Academy</h2>
              <p>
                Learning a complex language like German requires more than app drills and pre-recorded videos. We combine rigorous academic structure with encouraging, continuous human mentorship.
              </p>
              
              <div className="pillars-action">
                <button 
                  className="btn btn-gold"
                  onClick={() => setIsTestOpen(true)}
                >
                  Test Your German Proficiency Now
                </button>
              </div>
            </div>

            <div className="pillars-grid">
              {teachingPillars.map((pillar, i) => (
                <div className="pillar-item" key={i}>
                  <div className="pillar-num">0{i + 1}</div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROFICIENCY TEST MODAL */}
      {isTestOpen && (
        <ProficiencyTest onClose={() => setIsTestOpen(false)} />
      )}
    </div>
  );
}

export default Spotlight;