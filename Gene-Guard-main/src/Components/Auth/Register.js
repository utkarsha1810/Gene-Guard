import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import '../Pages/Home.css';

// Password strength helper
const getPwStrength = (pw) => {
  if (!pw) return { score: 0, label: '', cls: '' };
  let s = 0;
  if (pw.length >= 8)  s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: 1, label: 'Weak',   cls: 'weak' };
  if (s === 2) return { score: 2, label: 'Fair',   cls: 'fair' };
  if (s === 3) return { score: 3, label: 'Good',   cls: 'good' };
  return         { score: 4, label: 'Strong', cls: 'strong' };
};

const ErrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// Translation data
const translations = {
  en: {
    navLinks: {
      learnGenetics: 'Learn Genetics',
      geneticDisorders: 'Genetic Disorders',
      counselling: 'Counselling',
      geneticAssessment: 'Genetic Assessment AI',
      dnaTesting: 'DNA Testing',
      aboutUs: 'About Us',
      login: 'Login',
      signup: 'Sign Up'
    }
  },
  hi: {
    navLinks: {
      learnGenetics: 'आनुवंशिकी सीखें',
      geneticDisorders: 'आनुवंशिक विकार',
      counselling: 'परामर्श',
      geneticAssessment: 'आनुवंशिक मूल्यांकन AI',
      dnaTesting: 'DNA परीक्षण',
      aboutUs: 'हमारे बारे में',
      login: 'लॉगिन',
      signup: 'साइन अप'
    }
  },
  mr: {
    navLinks: {
      learnGenetics: 'अनुवांशिकी शिका',
      geneticDisorders: 'अनुवांशिक विकार',
      counselling: 'समुपदेशन',
      geneticAssessment: 'अनुवांशिक मूल्यांकन AI',
      dnaTesting: 'DNA चाचणी',
      aboutUs: 'आमच्याबद्दल',
      login: 'लॉगिन',
      signup: 'साइन अप'
    }
  },
  te: {
    navLinks: {
      learnGenetics: 'జన్యుశాస్త్రం నేర్చుకోండి',
      geneticDisorders: 'జన్యు రుగ్మతలు',
      counselling: 'కౌన్సెలింగ్',
      geneticAssessment: 'జన్యు అంచనా AI',
      dnaTesting: 'DNA పరీక్ష',
      aboutUs: 'మా గురించి',
      login: 'లాగిన్',
      signup: 'సైన్ అప్'
    }
  }
};

const Navbar = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`home-main-navbar ${isScrolled ? 'home-navbar-scrolled' : ''}`}>
        <div className="home-nav-content">
          <div className="home-nav-logo" onClick={() => navigate('/home')}>
            <div className="home-logo-circle"></div>
            <span className="home-logo-brand">Gene Guard</span>
          </div>

          <div className="home-nav-right-section">
            <div className="home-nav-links">
              <Link to="/learn-genetics" className="home-nav-link">{t.navLinks.learnGenetics}</Link>
              <Link to="/genetic-disorders" className="home-nav-link">{t.navLinks.geneticDisorders}</Link>
              <Link to="/counselling" className="home-nav-link">{t.navLinks.counselling}</Link>
              <Link to="/genetic-assessment" className="home-nav-link">{t.navLinks.geneticAssessment}</Link>
              <Link to="/dna" className="home-nav-link">{t.navLinks.dnaTesting}</Link>
              <Link to="/about" className="home-nav-link">{t.navLinks.aboutUs}</Link>
            </div>

            <div className="home-language-buttons">
              <button className={`home-lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
              <button className={`home-lang-btn ${language === 'hi' ? 'active' : ''}`} onClick={() => setLanguage('hi')}>हिं</button>
              <button className={`home-lang-btn ${language === 'mr' ? 'active' : ''}`} onClick={() => setLanguage('mr')}>मर</button>
              <button className={`home-lang-btn ${language === 'te' ? 'active' : ''}`} onClick={() => setLanguage('te')}>తె</button>
            </div>

            <button
              className={`home-hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="home-hamburger-line"></span>
              <span className="home-hamburger-line"></span>
              <span className="home-hamburger-line"></span>
            </button>

            <div className="home-profile-container" ref={dropdownRef}>
              <button
                className={`home-profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User Profile"
              >
                <svg className="home-profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="home-profile-dropdown">
                  <div className="home-dropdown-glow"></div>
                  {/* Keep Login link only when on Register page */}
                  <Link to="/login" className="home-dropdown-item home-signup-special">{t.navLinks.login}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="home-mobile-menu-overlay">
          <Link to="/learn-genetics" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.learnGenetics}</Link>
          <Link to="/genetic-disorders" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticDisorders}</Link>
          <Link to="/counselling" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.counselling}</Link>
          <Link to="/genetic-assessment" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticAssessment}</Link>
          <Link to="/dna" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.dnaTesting}</Link>
          <Link to="/about" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.aboutUs}</Link>
        </div>
      )}
    </>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    gender: '', password: '', confirmPassword: '',
  });

  const [showPw, setShowPw]           = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTerms]     = useState(false);
  const [errors, setErrors]           = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading]     = useState(false);
  const [success, setSuccess]         = useState(false);

  const pwStrength = useMemo(() => getPwStrength(form.password), [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (globalError) setGlobalError('');
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required';
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email';
    }
    if (form.phone && !/^\+?[\d\s\-(]{7,15}$/.test(form.phone)) {
      e.phone = 'Enter a valid phone number';
    }
    if (!form.password) {
      e.password = 'Password is required';
    } else if (form.password.length < 8) {
      e.password = 'Minimum 8 characters required';
    }
    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    if (!termsAccepted) e.terms = 'Please accept the terms to continue';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsLoading(true);
    setGlobalError('');
    try {
      // Replace with your actual API call
      await new Promise(res => setTimeout(res, 1600));
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1300);
    } catch {
      setGlobalError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reg-page">

      {/* ── Decorative shapes ── */}
      <div className="reg-shape reg-shape-top-big"></div>
      <div className="reg-shape reg-shape-top-small"></div>
      <div className="reg-shape reg-shape-right-circle"></div>
      <div className="reg-shape reg-shape-right-small"></div>
      <div className="reg-shape reg-shape-bottom-left"></div>

      {/* ── Navbar ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ── Main Content ── */}
      <div className="reg-container">
        <h2>Register</h2>
        <div className="reg-underline"></div>

        <p className="reg-sub-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in here</span>
        </p>

        {/* Banners */}
        {success && (
          <div className="reg-success-banner" style={{ marginBottom: '14px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
            Account created! Redirecting to login…
          </div>
        )}

        {globalError && (
          <div className="reg-error-banner" style={{ marginBottom: '14px' }}>
            <ErrIcon /> {globalError}
          </div>
        )}

        <form className="reg-form" onSubmit={handleSubmit} noValidate>

          {/* First name + Last name */}
          <div className="reg-row">
            <div className="reg-input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName" type="text" name="firstName"
                value={form.firstName} onChange={handleChange}
                className={errors.firstName ? 'reg-error' : ''}
                autoComplete="given-name"
              />
              {errors.firstName && <div className="reg-field-error"><ErrIcon />{errors.firstName}</div>}
            </div>

            <div className="reg-input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName" type="text" name="lastName"
                value={form.lastName} onChange={handleChange}
                className={errors.lastName ? 'reg-error' : ''}
                autoComplete="family-name"
              />
              {errors.lastName && <div className="reg-field-error"><ErrIcon />{errors.lastName}</div>}
            </div>
          </div>

          {/* Email */}
          <div className="reg-input-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email" type="email" name="email"
              value={form.email} onChange={handleChange}
              className={errors.email ? 'reg-error' : ''}
              autoComplete="email"
            />
            {errors.email && <div className="reg-field-error"><ErrIcon />{errors.email}</div>}
          </div>

          {/* Phone + Gender */}
          <div className="reg-row">
            <div className="reg-input-group">
              <label htmlFor="phone">Phone <span style={{ color: '#9abcca', fontWeight: 400 }}>(optional)</span></label>
              <input
                id="phone" type="tel" name="phone"
                placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange}
                className={errors.phone ? 'reg-error' : ''}
                autoComplete="tel"
              />
              {errors.phone && <div className="reg-field-error"><ErrIcon />{errors.phone}</div>}
            </div>

            <div className="reg-input-group reg-select-wrap">
              <label htmlFor="gender">Biological Sex</label>
              <select
                id="gender" name="gender"
                value={form.gender} onChange={handleChange}
              >
                <option value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <span className="reg-select-caret">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="6,9 12,15 18,9"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="reg-input-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type={showPw ? 'text' : 'password'}
              name="password"
              placeholder="Min. 8 characters"
              value={form.password} onChange={handleChange}
              className={errors.password ? 'reg-error' : ''}
              autoComplete="new-password"
            />
            <button type="button" className="reg-pw-toggle"
              onClick={() => setShowPw(p => !p)}
              aria-label={showPw ? 'Hide password' : 'Show password'}>
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {/* Strength bar */}
            {form.password && (
              <div className="reg-strength-wrap">
                <div className="reg-strength-bars">
                  {[1,2,3,4].map(i => (
                    <div key={i}
                      className={`reg-strength-bar ${i <= pwStrength.score ? pwStrength.cls : ''}`}
                    />
                  ))}
                </div>
                <span className={`reg-strength-label ${pwStrength.cls}`}>
                  {pwStrength.label} password
                </span>
              </div>
            )}
            {errors.password && <div className="reg-field-error"><ErrIcon />{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="reg-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword} onChange={handleChange}
              className={errors.confirmPassword ? 'reg-error' : ''}
              autoComplete="new-password"
            />
            <button type="button" className="reg-pw-toggle"
              onClick={() => setShowConfirm(p => !p)}
              aria-label={showConfirm ? 'Hide' : 'Show'}>
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {errors.confirmPassword && <div className="reg-field-error"><ErrIcon />{errors.confirmPassword}</div>}
          </div>

          {/* Terms */}
          <div>
            <label className="reg-terms">
              <input type="checkbox" checked={termsAccepted}
                onChange={e => {
                  setTerms(e.target.checked);
                  if (errors.terms) setErrors(p => ({ ...p, terms: '' }));
                }}
              />
              <div className="reg-checkbox-box">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor">
                  <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    points="2,6 5,9 10,3"/>
                </svg>
              </div>
              <span className="reg-terms-text">
                I agree to the <a href="#terms">Terms of Service</a> and{' '}
                <a href="#privacy">Privacy Policy</a>. Your data is protected under HIPAA.
              </span>
            </label>
            {errors.terms && (
              <div className="reg-field-error" style={{ marginTop: '6px' }}>
                <ErrIcon />{errors.terms}
              </div>
            )}
          </div>

          {/* Register Button */}
          <button type="submit" className="reg-btn" disabled={isLoading || success}>
            {isLoading ? (
              <><span className="reg-btn-spinner"></span> Creating account…</>
            ) : success ? (
              '✓  Account Created!'
            ) : (
              <><span className="reg-btn-icon">⊙</span> CREATE ACCOUNT</>
            )}
          </button>



          {/* Bottom link */}
          <p className="reg-bottom-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
