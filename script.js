/**
 * ADITYA PAWAR - DATA & BUSINESS ANALYST PORTFOLIO
 * Core JavaScript: Interactive Animations, Chart.js Live Engine, Particle Canvas, Modals & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initHeroMiniChart();
  initInteractiveSandbox();
  initProjectFilters();
  initCaseStudyModals();
  initResumeModal();
  initContactForm();
  initNavbarScroll();
  initCopyButtons();
});

/* ==========================================================================
   1. AMBIENT PARTICLES DATA-NETWORK CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(59, 130, 246, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw and move particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typedElem = document.getElementById('typed-text');
  if (!typedElem) return;

  const phrases = [
    'Data Analyst',
    'Business Analyst',
    'Power BI & SQL Specialist',
    'Financial & Variance Modeler',
    'Inventory Optimization Architect'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedElem.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElem.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. HERO MINI CHART (Chart.js)
   ========================================================================== */
let heroChartInstance = null;
function initHeroMiniChart() {
  const ctx = document.getElementById('heroMiniChart');
  if (!ctx) return;

  const labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  heroChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Sales Revenue Lift (%)',
          data: [2.1, 4.5, 7.2, 9.8, 11.4, 12.2],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#06b6d4',
          pointRadius: 3
        },
        {
          label: 'Stockout Incidents (%)',
          data: [24.0, 21.5, 17.0, 11.2, 7.5, 4.0],
          borderColor: '#10b981',
          borderDash: [4, 4],
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#94a3b8',
            font: { size: 10, family: 'Plus Jakarta Sans' },
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: '#0e1626',
          titleColor: '#fff',
          bodyColor: '#38bdf8',
          borderColor: 'rgba(6, 182, 212, 0.4)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748b', font: { size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748b', font: { size: 10 } }
        }
      }
    }
  });
}

/* ==========================================================================
   4. INTERACTIVE ANALYTICS SANDBOX (Live Simulator)
   ========================================================================== */
let sandboxChartInstance = null;

const sandboxScenarios = {
  inventory: {
    title: 'Perishable Grocery Inventory: Days of Supply vs. Reorder Level',
    metric1: { label: 'Total SKUs Monitored', val: '54 SKUs', note: 'Dairy, Produce, Meats' },
    metric2: { label: 'Stockout Incidents', val: '-20.4%', note: 'Lead-time auto flag' },
    metric3: { label: 'Sales Lift', val: '+12.0%', note: 'Dynamic stock markdown' },
    metric4: { label: 'Spoilage Waste', val: '-18.5%', note: 'Pre-expiry markdown alert' },
    insight: 'By tracking stock depletion velocity against supplier replenishment lead times, reorder triggers fire dynamically before reaching critical zero thresholds, reducing grocery stockouts by ~20%.',
    chartType: 'bar',
    labels: ['Fresh Milk', 'Organic Berries', 'Greek Yogurt', 'Whole Artisan Bread', 'Free-Range Eggs', 'Farm Greens'],
    datasets: [
      {
        label: 'Current On-Hand Units',
        data: [42, 18, 65, 24, 88, 30],
        backgroundColor: '#06b6d4',
        borderRadius: 6
      },
      {
        label: 'Dynamic Safety Stock',
        data: [25, 20, 30, 20, 35, 25],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 6
      },
      {
        label: 'Expiry Danger Threshold (<3 Days)',
        data: [5, 12, 8, 14, 4, 10],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 6
      }
    ]
  },
  sales: {
    title: 'Sales Velocity & Revenue Lift Under Dynamic Markdown Model',
    metric1: { label: 'Weekly Revenue Target', val: '₹4.8 Lakhs', note: 'Aggregate baseline' },
    metric2: { label: 'Realized Revenue', val: '₹5.38 Lakhs', note: '+12.1% net outperformance' },
    metric3: { label: 'Markdown Conversion', val: '74.2%', note: 'Discounted goods sold' },
    metric4: { label: 'Customer Basket Size', val: '+9.5%', note: 'Cross-selling perishables' },
    insight: 'Rather than writing off expiring inventory at 100% loss, graduated 15% - 30% markdown tiers timed 48 hours prior to expiry cleared 74% of at-risk goods and drove 12% revenue growth.',
    chartType: 'line',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Optimized Revenue with Markdown (₹K)',
        data: [420, 445, 470, 495, 510, 525, 532, 548],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5
      },
      {
        label: 'Traditional Static Model Baseline (₹K)',
        data: [415, 420, 422, 430, 435, 440, 442, 450],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        tension: 0.2,
        borderWidth: 2
      }
    ]
  },
  finance: {
    title: 'Student Association Budget vs. Actual Expenditure & Variance Reconciliation',
    metric1: { label: 'Total Budget Allocated', val: '₹1.50 Lakh', note: 'Fiscal Year 2025-26' },
    metric2: { label: 'Variance Discrepancy', val: '0.00%', note: '100% Reconciled audit' },
    metric3: { label: 'Reserve Retained', val: '18.4%', note: 'Surplus contingency fund' },
    metric4: { label: 'Ledger Audit Status', val: 'PASS', note: 'Certified by Advisory Board' },
    insight: 'As Treasurer, meticulous tracking across income, event logistics, and speaker allocations prevented budget deficits and maintained an 18.4% surplus reserve fund for future student cohorts.',
    chartType: 'bar',
    labels: ['Technical Workshops', 'Hackathon Logistics', 'Guest Honorariums', 'Web & Cloud Hosting', 'Marketing Collateral', 'Annual Fest'],
    datasets: [
      {
        label: 'Allocated Budget (₹)',
        data: [35000, 45000, 20000, 15000, 12000, 23000],
        backgroundColor: '#3b82f6',
        borderRadius: 6
      },
      {
        label: 'Actual Spend Reconciled (₹)',
        data: [31500, 43200, 18500, 14200, 10800, 21800],
        backgroundColor: '#8b5cf6',
        borderRadius: 6
      }
    ]
  }
};

function renderSandbox(scenarioKey) {
  const scenario = sandboxScenarios[scenarioKey] || sandboxScenarios.inventory;

  // Update KPI Cards
  document.getElementById('metric1-label').textContent = scenario.metric1.label;
  document.getElementById('metric1-val').textContent = scenario.metric1.val;
  document.getElementById('metric1-note').textContent = scenario.metric1.note;

  document.getElementById('metric2-label').textContent = scenario.metric2.label;
  document.getElementById('metric2-val').textContent = scenario.metric2.val;
  document.getElementById('metric2-note').textContent = scenario.metric2.note;

  document.getElementById('metric3-label').textContent = scenario.metric3.label;
  document.getElementById('metric3-val').textContent = scenario.metric3.val;
  document.getElementById('metric3-note').textContent = scenario.metric3.note;

  document.getElementById('metric4-label').textContent = scenario.metric4.label;
  document.getElementById('metric4-val').textContent = scenario.metric4.val;
  document.getElementById('metric4-note').textContent = scenario.metric4.note;

  // Update Insight & Title
  document.getElementById('sim-chart-title').innerHTML = `<i class="fa-solid fa-chart-area text-cyan"></i> ${scenario.title}`;
  document.getElementById('sim-insight-text').textContent = scenario.insight;

  // Rebuild Chart
  const ctx = document.getElementById('interactiveCanvas');
  if (!ctx) return;

  if (sandboxChartInstance) {
    sandboxChartInstance.destroy();
  }

  sandboxChartInstance = new Chart(ctx, {
    type: scenario.chartType,
    data: {
      labels: scenario.labels,
      datasets: scenario.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1',
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '500' },
            boxWidth: 14
          }
        },
        tooltip: {
          backgroundColor: '#090d16',
          titleColor: '#fff',
          bodyColor: '#38bdf8',
          borderColor: 'rgba(6, 182, 212, 0.4)',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { size: 11 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { size: 11 } }
        }
      }
    }
  });
}

function initInteractiveSandbox() {
  const tabs = document.querySelectorAll('.sim-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const scenario = tab.getAttribute('data-scenario');
      renderSandbox(scenario);
      showToast(`Loaded ${tab.textContent.trim()} dataset`);
    });
  });

  const refreshBtn = document.getElementById('refresh-sim-data');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.sim-tab.active');
      const scenario = activeTab ? activeTab.getAttribute('data-scenario') : 'inventory';
      renderSandbox(scenario);
      showToast('Simulated real-time data update complete!');
    });
  }

  // Initial render
  renderSandbox('inventory');
}

/* ==========================================================================
   5. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. CASE STUDY MODAL DETAILS (Rich Content)
   ========================================================================== */
const caseStudiesData = {
  'grocery-modal': {
    title: 'Grocery Chain Perishable Goods Inventory Analytics Dashboard',
    subtitle: 'Excel Modeling | Stockout Reduction | Sales Lift Engine',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Client / Context:</strong> Regional Grocery Chain (50+ Perishable SKUs)</div>
          <div class="cs-meta-item"><strong>Role:</strong> Lead Data Analyst & Inventory Modeler</div>
          <div class="cs-meta-item"><strong>Core Tools:</strong> Microsoft Excel, Advanced Pivot Tables, Dynamic Formulas, SQL</div>
          <div class="cs-meta-item"><strong>Key Impact:</strong> ~20% Stockout Reduction, +12% Sales Uplift</div>
        </div>

        <h4 class="cs-h4"><i class="fa-solid fa-triangle-exclamation text-yellow"></i> The Business Problem</h4>
        <p>
          Perishable retail categories (dairy, fresh produce, meats, bakery) present a volatile operational trade-off: overstocking leads to rapid spoilage and direct write-off losses, whereas understocking causes severe stockouts on everyday grocery staples, frustrating shoppers and leaking market share to competitors.
        </p>

        <h4 class="cs-h4"><i class="fa-solid fa-screwdriver-wrench text-cyan"></i> The Analytical Approach</h4>
        <ul>
          <li><strong>Data Cleaning & Transformation:</strong> Normalized multi-store transaction and supplier shipment sheets in Excel, standardizing SKU taxonomy, unit measurements, and vendor delivery lead-times.</li>
          <li><strong>Real-Time Days-of-Supply (DoS) Engine:</strong> Calculated dynamic consumption velocity against live stock balances, flagging SKUs where on-hand quantity dipped below supplier reorder replenishment cycles.</li>
          <li><strong>Pre-Expiry Markdown Logic:</strong> Built an automated alert model that detects batches approaching 3 days to expiration. The model recommends progressive 15% - 30% markdown discounts to clear stock before total loss.</li>
          <li><strong>Executive Pivot Dashboards:</strong> Designed interactive slicers allowing store managers to filter by product velocity (Fast, Medium, Slow), supplier reliability, and markdown ROI.</li>
        </ul>

        <h4 class="cs-h4"><i class="fa-solid fa-chart-line text-emerald"></i> Measurable Business ROI</h4>
        <div class="cs-roi-banner">
          <div><span class="roi-num text-emerald">-20%</span> <span class="roi-txt">Reduction in Out-Of-Stock events across top 50 SKUs</span></div>
          <div><span class="roi-num text-cyan">+12%</span> <span class="roi-txt">Overall gross revenue lift from markdown conversions</span></div>
          <div><span class="roi-num text-violet">-18.5%</span> <span class="roi-txt">Cut in avoidable spoilage write-offs</span></div>
        </div>
      </div>
    `
  },
  'finance-modal': {
    title: 'Financial Budget & Variance Analysis System — Student Association',
    subtitle: 'Treasurer Stewardship | Ledger Reconciliation | Zero Audit Discrepancies',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Organization:</strong> Data Science Student Association, RTMNU, Nagpur</div>
          <div class="cs-meta-item"><strong>Role:</strong> Treasurer (2025 - 2026)</div>
          <div class="cs-meta-item"><strong>Scope:</strong> 20+ Member Council, Multi-Event Budgeting</div>
          <div class="cs-meta-item"><strong>Audit Integrity:</strong> 100% Balanced Ledgers (Zero Discrepancies)</div>
        </div>

        <h4 class="cs-h4"><i class="fa-solid fa-scale-balanced text-blue"></i> Objective & Responsibility</h4>
        <p>
          Entrusted with the complete financial oversight and fiduciary governance of the student association. The mandate required establishing a transparent financial tracking mechanism, eliminating cash flow ambiguities, and ensuring institutional audit compliance.
        </p>

        <h4 class="cs-h4"><i class="fa-solid fa-list-check text-cyan"></i> Methodologies Implemented</h4>
        <ul>
          <li><strong>Variance Analysis Architecture:</strong> Developed structured financial spreadsheets tracking allocated budget vs. actual realized expenditure per category (technical workshops, guest speakers, annual fest).</li>
          <li><strong>Account Reconciliation:</strong> Audited monthly bank statements against physical receipts and vendor vouchers, rectifying variances immediately.</li>
          <li><strong>Quarterly Executive Reporting:</strong> Synthesized financial dashboards presented directly to the Department Advisory Board, communicating fiscal health and reserve allocations.</li>
        </ul>

        <h4 class="cs-h4"><i class="fa-solid fa-shield-check text-emerald"></i> Tangible Impact</h4>
        <p>
          Maintained flawless ledger accuracy with 0% unverified transactions, securing complete audit approval from faculty advisors while preserving an 18.4% contingency reserve surplus.
        </p>
      </div>
    `
  },
  'deloitte-modal': {
    title: 'Deloitte Australia — Data Analytics Job Simulation',
    subtitle: 'Customer Segmentation | Data Quality Assurance | Executive Briefing',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Company:</strong> Deloitte Australia (Virtual Simulation)</div>
          <div class="cs-meta-item"><strong>Track:</strong> Data Analytics & Strategic Insights</div>
          <div class="cs-meta-item"><strong>Tools & Methods:</strong> Exploratory Data Analysis, Data Hygiene, Segmentation</div>
        </div>
        <h4 class="cs-h4"><i class="fa-solid fa-magnifying-glass-chart text-cyan"></i> Simulation Overview</h4>
        <p>
          Analyzed a simulated client dataset comprising customer demographic and telemetry information. Conducted comprehensive data cleaning, resolved corrupted entries, and performed RFM (Recency, Frequency, Monetary) style customer grouping.
        </p>
        <h4 class="cs-h4"><i class="fa-solid fa-lightbulb text-yellow"></i> Strategic Deliverables</h4>
        <ul>
          <li>Structured data hygiene pipelines identifying outlier patterns and inconsistent data inputs.</li>
          <li>Delivered a structured slide deck summarizing actionable marketing recommendations to improve retention across the highest-value customer cohorts.</li>
        </ul>
      </div>
    `
  },
  'tata-modal': {
    title: 'Tata — Data Visualisation: Empowering Business with Effective Insights',
    subtitle: 'Executive Storytelling | Power BI Visuals | Retail Global Insights',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Company:</strong> Tata Insights and Quants (Virtual Simulation)</div>
          <div class="cs-meta-item"><strong>Track:</strong> Data Visualisation & Executive Decision Making</div>
          <div class="cs-meta-item"><strong>Focus:</strong> C-Suite Retail Intelligence & Metric Prioritization</div>
        </div>
        <h4 class="cs-h4"><i class="fa-solid fa-chart-pie text-cyan"></i> Simulation Focus</h4>
        <p>
          Tasked by the CEO and CMO of an online retail company to evaluate global transaction metrics and provide strategic guidance on international expansion and revenue optimization.
        </p>
        <h4 class="cs-h4"><i class="fa-solid fa-bullseye text-emerald"></i> Executive Visuals Delivered</h4>
        <ul>
          <li>Designed uncluttered, high-impact visuals answering questions about top-performing regions, seasonality demand spikes, and unit-margin distributions.</li>
          <li>Practiced presenting data-driven answers to non-technical executive stakeholders.</li>
        </ul>
      </div>
    `
  },
  'jpmorgan-modal': {
    title: 'J.P. Morgan — Quantitative Research Virtual Job Simulation',
    subtitle: 'Quantitative Modeling | Financial Engineering | Risk Analysis',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Institution:</strong> J.P. Morgan (Virtual Simulation)</div>
          <div class="cs-meta-item"><strong>Track:</strong> Quantitative Research</div>
          <div class="cs-meta-item"><strong>Focus:</strong> Mathematical Modeling, Algorithmic Decision Trees, Risk Pricing</div>
        </div>
        <h4 class="cs-h4"><i class="fa-solid fa-brain text-violet"></i> Quantitative Reasoning</h4>
        <p>
          Explored quantitative pricing models and probability matrices used in investment banking environments. Analyzed datasets with financial mathematics to forecast commodity and equity price behaviors.
        </p>
      </div>
    `
  },
  'eduskill-modal': {
    title: 'EduSkill — Web Full Stack Developer Virtual Internship',
    subtitle: 'Frontend & Backend Architecture | APIs | Full-Stack Integration',
    html: `
      <div class="case-study-content">
        <div class="cs-meta-grid">
          <div class="cs-meta-item"><strong>Program:</strong> EduSkill Foundation Virtual Internship</div>
          <div class="cs-meta-item"><strong>Focus:</strong> Full Stack Web Engineering Fundamentals</div>
          <div class="cs-meta-item"><strong>Stack:</strong> HTML5, CSS3, JavaScript, Database Foundations</div>
        </div>
        <h4 class="cs-h4"><i class="fa-solid fa-code text-cyan"></i> Full-Stack Edge for a Data Analyst</h4>
        <p>
          Mastering modern web fundamentals gives me a distinct advantage when deploying custom interactive data web apps, integrating REST APIs, and understanding software architectures alongside development teams.
        </p>
      </div>
    `
  }
};

function initCaseStudyModals() {
  const modal = document.getElementById('caseStudyModal');
  const overlay = document.getElementById('caseStudyOverlay');
  const closeBtn = document.getElementById('closeCaseModal');
  const titleElem = document.getElementById('modalCaseTitle');
  const bodyElem = document.getElementById('modalCaseBody');

  const openBtns = document.querySelectorAll('.open-modal-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = caseStudiesData[modalKey];

      if (data && modal && titleElem && bodyElem) {
        titleElem.textContent = data.title;
        bodyElem.innerHTML = data.html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. RESUME MODAL & PRINT HANDLER
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const resumeOverlay = document.getElementById('resumeOverlay');
  const closeResumeBtn = document.getElementById('closeResumeModal');
  const btnViewResume = document.getElementById('btn-view-resume');
  const btnDownloadResumeBottom = document.getElementById('btn-download-resume-bottom');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnViewResume) btnViewResume.addEventListener('click', openResume);
  if (btnDownloadResumeBottom) btnDownloadResumeBottom.addEventListener('click', openResume);
  if (resumeOverlay) resumeOverlay.addEventListener('click', closeResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   8. COPY TO CLIPBOARD HELPER & TOAST
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

function initCopyButtons() {
  const email = 'adityapawar739@gmail.com';
  const copyHeroBtn = document.getElementById('btn-copy-email-hero');
  const copyContactBtn = document.getElementById('btn-copy-email');

  function copyAction() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        prompt('Copy email:', email);
      });
    } else {
      prompt('Copy email:', email);
    }
  }

  if (copyHeroBtn) copyHeroBtn.addEventListener('click', copyAction);
  if (copyContactBtn) copyContactBtn.addEventListener('click', copyAction);
}

/* ==========================================================================
   9. NAVBAR SCROLL & MOBILE MENU
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking on nav link
    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   10. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
    const emailBody = encodeURIComponent(
      `Hello Aditya,\n\nName: ${name}\nEmail: ${email}\nOpportunity: ${subject}\n\nMessage:\n${message}\n\n---\nSent via Portfolio Website`
    );

    showToast('Opening your email client to send message...');

    setTimeout(() => {
      window.location.href = `mailto:adityapawar739@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    }, 600);
  });
}
