import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  Flame, 
  User, 
  Check, 
  ChevronRight, 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  Activity, 
  Award,
  Clock,
  Heart,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Component Imports
import Dumbbell3D from './components/3d/Dumbbell3D';
import WorkoutPlanner from './components/ui/WorkoutPlanner';
import MacroCalculator from './components/ui/MacroCalculator';
import ClassScheduler from './components/ui/ClassScheduler';
import TransformationSlider from './components/ui/TransformationSlider';

export default function App() {
  // Modal states
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: '', email: '', phone: '', tier: 'titanium' });

  // Booking details for live booking system
  const [toasts, setToasts] = useState([]);

  // Toast trigger helper
  const addToast = (message, title = 'NOTIFICATION') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Callback from ClassScheduler
  const handleBookSpot = (className, instructor) => {
    addToast(`Successfully booked slot in ${className} with Coach ${instructor}!`, 'CLASS BOOKED');
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { x: 0.8, y: 0.8 },
      colors: ['#ff5722', '#ffffff']
    });
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinForm.name || !joinForm.email) return;

    setIsJoinSuccess(true);
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff5722', '#d4ff00', '#ffffff']
    });

    setTimeout(() => {
      setIsJoinModalOpen(false);
      setIsJoinSuccess(false);
      setJoinForm({ name: '', email: '', phone: '', tier: 'titanium' });
      addToast('Welcome to the brotherhood. Your registration package is being processed.', 'REGISTRATION COMPLETED');
    }, 2500);
  };

  // Smooth scroll handler
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Navigation */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(7, 7, 9, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => handleScrollToSection('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--primary)', 
              borderRadius: '6px', 
              width: '32px', 
              height: '32px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(255, 87, 34, 0.4)'
            }}
          >
            <Flame size={18} color="#fff" />
          </div>
          <span 
            className="text-display" 
            style={{ fontSize: '1.6rem', color: '#fff', fontWeight: '400', letterSpacing: '0.04em' }}
          >
            DO HARD
          </span>
        </div>

        {/* Links */}
        <nav 
          style={{ 
            display: 'none', // hidden on mobile, block on larger
            gap: '24px',
            alignItems: 'center'
          }}
          className="md-flex-nav"
        >
          {['AMENITIES', 'SPLITS', 'CLASSES', 'CALCULATOR', 'COACHES'].map((section) => (
            <button
              key={section}
              onClick={() => handleScrollToSection(section.toLowerCase())}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Action Panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Join Button */}
          <button 
            onClick={() => setIsJoinModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: '6px' }}
          >
            JOIN NOW
          </button>
        </div>
      </header>

      {/* CSS injection for responsive desktop navigation & flexbox overrides */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex-nav {
            display: flex !important;
          }
          .hero-split {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>

      {/* 2. Hero Section */}
      <section 
        id="hero" 
        className="hero-gradient"
        style={{ padding: '60px 24px', position: 'relative', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}
      >
        <div 
          className="hero-split"
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span className="badge badge-primary" style={{ width: 'fit-content' }}>
              ⚡ PUSH YOUR LIMITS
            </span>
            
            <h1 
              className="text-display" 
              style={{ 
                fontSize: 'clamp(3rem, 6vw, 4.8rem)', 
                lineHeight: '0.9', 
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)'
              }}
            >
              STRENGTH IS EARNED.<br />
              <span className="shimmer-text">DO HARD.</span>
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5', maxWidth: '520px' }}>
              The ultimate high-performance training ground. World-class lifting rigs, biometric athletic tracking, sub-zero recovery chambers, and coaches who demand absolute commitment.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <button 
                onClick={() => setIsJoinModalOpen(true)}
                className="btn btn-primary"
              >
                CLAIM 3-DAY FREE PASS
              </button>
              <button 
                onClick={() => handleScrollToSection('classes')}
                className="btn btn-secondary"
              >
                VIEW LIVE SCHEDULE
              </button>
            </div>
          </div>

          {/* Hero Right: Interactive 3D Canvas */}
          <div 
            className="titanium-card" 
            style={{ 
              height: '420px', 
              padding: '0', 
              position: 'relative', 
              overflow: 'hidden', 
              background: 'radial-gradient(circle at center, #111116 0%, #070709 100%)',
              border: '1px solid rgba(255, 87, 34, 0.15)'
            }}
          >
            {/* Corner Badge */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 5 }}>
              <span className="badge badge-secondary" style={{ animation: 'pulseGlow 2s infinite ease-in-out' }}>
                INTERACTIVE 3D
              </span>
            </div>
            <Dumbbell3D />
          </div>
        </div>
      </section>

      {/* 3. Stats Banner Grid */}
      <section style={{ backgroundColor: '#070709', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '40px 24px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px' 
          }}
        >
          {[
            { value: '15,000+', label: 'ACTIVE DISCIPLES', desc: 'Pushing limits daily' },
            { value: '50+', label: 'ELITE STRENGTH COACHES', desc: 'Olympic & powerlifting athletes' },
            { value: '24/7/365', label: 'ZERO CLOSED HOURS', desc: 'No excuses, train anytime' },
            { value: '5 LOCATIONS', label: 'METROPOLIS ZONES', desc: 'Access any training ground' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="titanium-card"
              style={{ padding: '24px', border: '1px solid rgba(255, 255, 255, 0.03)', textAlign: 'center' }}
            >
              <h2 className="text-display" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                {stat.value}
              </h2>
              <h4 style={{ fontSize: '0.85rem', color: '#fff', margin: '4px 0 2px 0', letterSpacing: '0.05em' }}>
                {stat.label}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Amenities Section */}
      <section id="amenities" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary">PRIMED ZONE</span>
          <h2 className="text-display" style={{ fontSize: '3rem', color: '#fff', marginTop: '10px' }}>
            WORLD-CLASS FACILITIES
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '12px auto 0 auto', fontSize: '0.95rem' }}>
            We provide raw iron tools paired with cutting-edge bioscience gear. No generic gym setups. Custom calibrated loadouts.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { 
              icon: <Dumbbell size={24} color="var(--primary)" />, 
              title: 'OLYMPIC HEAVY LIFTING RACKS', 
              desc: 'Eleiko bars and competition calibrated bumper plates with solid maple drop platforms.' 
            },
            { 
              icon: <Activity size={24} color="var(--primary)" />, 
              title: 'BIOMETRIC MUSCLE TRACKING', 
              desc: 'Integrated RFID lockers tracking sets, weights, and lifting velocity with real-time HUD dashboard feedback.' 
            },
            { 
              icon: <Shield size={24} color="var(--primary)" />, 
              title: 'SUB-ZERO CRYOTHERAPY SPA', 
              desc: 'Accelerate your recovery cycle inside our -110°C cryo chambers and deep recovery infrared saunas.' 
            },
            { 
              icon: <Flame size={24} color="var(--primary)" />, 
              title: 'POST-LIFT SHAKE & AMINO STATION', 
              desc: 'Clean organic protein shakes, custom raw amino ratios, and premium creatine custom formulas.' 
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="titanium-card" 
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 87, 34, 0.1)', 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 87, 34, 0.2)'
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.15rem', letterSpacing: '0.01em', fontFamily: 'var(--font-heading)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Workout Splits Section */}
      <section id="splits" style={{ padding: '80px 24px', backgroundColor: '#0a0a0e', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <WorkoutPlanner />
        </div>
      </section>

      {/* 6. Class Calendar Section */}
      <section id="classes" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <ClassScheduler onBookSpot={handleBookSpot} />
      </section>

      {/* 7. Nutrition Calculator Section */}
      <section id="calculator" style={{ padding: '80px 24px', backgroundColor: '#0a0a0e', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <MacroCalculator />
        </div>
      </section>

      {/* 8. Transformation Before/After Slider */}
      <section id="transformation" style={{ padding: '80px 24px', maxWidth: '640px', margin: '0 auto' }}>
        <TransformationSlider />
      </section>

      {/* 9. Trainers Section */}
      <section id="coaches" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary">ELITE CADRE</span>
          <h2 className="text-display" style={{ fontSize: '3rem', color: '#fff', marginTop: '10px' }}>
            MEET THE IRON COACHES
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '12px auto 0 auto', fontSize: '0.95rem' }}>
            Highly decorated strength athletes, national level powerlifters, and combat conditioning practitioners.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            {
              name: "REX 'THE ANVIL' STERLING",
              role: "Head Coach of Strength & Powerlifting",
              bio: "12+ years coaching. Former National Powerlifting Gold Medalist. Specializes in maximum torque mechanics.",
              stats: ["Bench PR: 220kg", "Squat PR: 310kg", "Deadlift PR: 345kg"],
              badge: "POWERLIFT"
            },
            {
              name: "ELENA 'STORM' VLASOV",
              role: "Director of Olympic Weightlifting & Mobility",
              bio: "Master of Sport in Weightlifting. Focuses on explosive kinetic energy transfer and joint longevity.",
              stats: ["Clean & Jerk: 140kg", "Snatch: 115kg", "Mobility Specialist"],
              badge: "OLYMPIC"
            },
            {
              name: "MARCUS THORNE",
              role: "Athletic Conditioning & Combat Coach",
              bio: "Ex-Military tactical instructor. Specializes in stamina load capacity, HIIT splits, and high volume GPP.",
              stats: ["VO2 Max: 68 ml/kg", "5k Run: 16:40", "Tactical Fit Cert"],
              badge: "ATHLETIC"
            }
          ].map((coach, idx) => (
            <div 
              key={idx}
              className="titanium-card"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifycontent: 'space-between', height: '400px' }}
            >
              {/* Top block */}
              <div 
                style={{ 
                  height: '140px', 
                  background: 'linear-gradient(135deg, #1f1f2e 0%, #111116 100%)', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    right: '16px', 
                    fontSize: '10px', 
                    color: 'var(--primary)', 
                    border: '1px solid var(--primary-glow)', 
                    backgroundColor: 'rgba(255,87,34,0.1)', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}
                >
                  {coach.badge}
                </span>
                
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{coach.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 'bold' }}>{coach.role}</span>
                </div>
              </div>

              {/* Bio & stats */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  {coach.bio}
                </p>

                {/* Personal records stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0 0 0' }}>
                  {coach.stats.map((stat, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <Check size={14} color="var(--primary)" />
                      <span style={{ color: '#fff', fontWeight: '500' }}>{stat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setJoinForm(prev => ({ ...prev, tier: 'black_diamond' }));
                    setIsJoinModalOpen(true);
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.75rem', marginTop: '16px' }}
                >
                  BOOK CONSULTATION
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#070709', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-secondary">SUPPORT BOARD</span>
            <h2 className="text-display" style={{ fontSize: '2.5rem', color: '#fff', marginTop: '10px' }}>
              FREQUENTLY INQUIRED
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: "What makes DO HARD Gym different from generic commercial health clubs?",
                a: "We design for high-performance training. You will not find lines of unused screen consoles or crowd restrictions. We feature custom calibrated Olympic equipment, heavy powerlifting platform bays, RFID trackers for muscle velocity, and elite coaches working on actual athletes. We are built for those who take training seriously."
              },
              {
                q: "I am a complete beginner. Will I fit in at DO HARD?",
                a: "Yes. Every athlete started at zero. Our 'Rookie' splits are designed to build foundational structural mobility and barbell comfort safely. All coaches are trained to scale compound load movements according to your joint tolerance. If you commit to working hard, you are welcome here."
              },
              {
                q: "How does the RFID biometric tracking function?",
                a: "When you join, you receive a personal RFID wrist strap. Tap it on our plates racks, lifting platforms, and machines to load your training profile. A digital camera HUD tracks your repetition speed and trajectory, recording sets directly to your account. Your stats are accessible via the portal dashboard."
              },
              {
                q: "Are recovery amenities like Cryotherapy included in memberships?",
                a: "Cryotherapy chambers and Infrared Saunas are fully unlimited for our Black Diamond membership tier. Titanium tier members receive two sessions per month, and Steel tier members can purchase individual session passes separately."
              }
            ].map((faq, idx) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div 
                  key={idx}
                  className="titanium-card"
                  style={{ padding: '20px', cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', paddingRight: '12px' }}>
                      {faq.q}
                    </h4>
                    <span style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '12px', lineHeight: '1.5' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer 
        style={{ 
          backgroundColor: '#050507', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '60px 24px 30px 24px'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          {/* Logo & Call */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ backgroundColor: 'var(--primary)', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <Flame size={16} color="#fff" style={{ margin: '0 auto' }} />
              </div>
              <span className="text-display" style={{ fontSize: '1.4rem', color: '#fff' }}>DO HARD GYM</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
              We demand discipline. We design power. Build a body that commands respect. No excuses. Lift heavy. Do hard. Be harder.
            </p>
          </div>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', letterSpacing: '0.05em' }}>TRAINING BASE</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <MapPin size={16} color="var(--primary)" />
              <span>420 Heavy Duty Blvd, Sector 7, Metropolis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Mail size={16} color="var(--primary)" />
              <span>recruitment@dohardgym.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Phone size={16} color="var(--primary)" />
              <span>+1 (800) 555-IRON</span>
            </div>
          </div>

          {/* Hours info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', letterSpacing: '0.05em' }}>HOURS OF COMBAT</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Clock size={16} color="var(--secondary)" />
              <span>General Hours: 24/7/365 Open</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <User size={16} color="var(--secondary)" />
              <span>Coached Splits: Mon-Fri (6AM - 9PM)</span>
            </div>
          </div>
        </div>

        {/* Legal Row */}
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            borderTop: '1px solid rgba(255,255,255,0.04)', 
            paddingTop: '20px', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>© {new Date().getFullYear()} DO HARD GYM INC. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LIABILITY DISCLOSURE</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PRIVACY TERMS</a>
          </div>
        </div>
      </footer>

      {/* 12. Toast Alert Notification Center */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <div 
              style={{ 
                backgroundColor: 'rgba(255, 87, 34, 0.15)', 
                borderRadius: '50%', 
                width: '24px', 
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Check size={14} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fff', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 13. Registration Modal Overlay */}
      {isJoinModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsJoinModalOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="titanium-card pulse-glow"
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: '#0a0a0f',
              border: '2px solid var(--primary)',
              borderRadius: '12px',
              padding: '32px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // prevent close inside modal
          >
            {/* Close */}
            <button
              onClick={() => setIsJoinModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '1.4rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {isJoinSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '16px' }}>💪</span>
                <h3 className="text-display shimmer-text" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                  REGISTRATION COMPLETED!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  The iron gates await you. Check your inbox for access instructions.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-display" style={{ fontSize: '2rem', color: '#fff', marginBottom: '6px' }}>
                  ENTER THE SYSTEM
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                  Input your telemetry parameters. Claim your free access pass or select membership level.
                </p>

                <form onSubmit={handleJoinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.05em' }}>
                      FULL ATHLETE NAME
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Connor McGregor"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm(prev => ({ ...prev, name: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#121217',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '12px',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.05em' }}>
                      EMAIL CORRESPONDENCE
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. connor@strongmail.com"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm(prev => ({ ...prev, email: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#121217',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '12px',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  {/* Membership Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.05em' }}>
                      MEMBERSHIP TIER
                    </label>
                    <select
                      value={joinForm.tier}
                      onChange={(e) => setJoinForm(prev => ({ ...prev, tier: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#121217',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '12px',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="trial">3-DAY FREE TRIAL PASS (Rookie)</option>
                      <option value="steel">STEEL MEMBERSHIP ($49/mo)</option>
                      <option value="titanium">TITANIUM MEMBERSHIP ($79/mo)</option>
                      <option value="black_diamond">BLACK DIAMOND ATHLETE ($149/mo)</option>
                    </select>
                  </div>

                  {/* Checkbox liability */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '4px' }}>
                    <input type="checkbox" required style={{ marginTop: '4px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      I agree to submit myself to rigorous training, follow gym safety regulations, and release DO HARD Gym from physical liability.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: '700', marginTop: '10px' }}
                  >
                    SUBMIT REGISTRATION
                  </button>

                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
