import React, { useState } from 'react';
import { Mail, Phone, Globe, Send, Star, CheckCircle, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import budgetData from '../data/budgetData.json';

const AboutContactModule = () => {
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbRating, setFbRating] = useState('5');
  const [fbComments, setFbComments] = useState('');
  const [fbErrors, setFbErrors] = useState({});
  const [fbSubmitted, setFbSubmitted] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!fbName.trim()) errors.name = 'Name is required.';
    if (!fbEmail.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(fbEmail)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!fbComments.trim()) errors.comments = 'Comments are required.';

    setFbErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFbSubmitted(true);
      toast.success('💬 Feedback submitted successfully!');
      setFbName('');
      setFbEmail('');
      setFbRating('5');
      setFbComments('');
    } else {
      toast.error('Please fix errors in the feedback form.');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!contactName.trim()) errors.name = 'Name is required.';
    if (!contactEmail.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(contactEmail)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!contactMessage.trim()) errors.message = 'Message is required.';

    setContactErrors(errors);

    if (Object.keys(errors).length === 0) {
      setContactSubmitted(true);
      toast.success('Contact message sent successfully!');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } else {
      toast.error('⚠️ Please fix errors in the contact form.');
    }
  };

  return (
    <section id="about-contact" className="module-section bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Us, Feedback & Contact</h2>
          <p className="section-description">
            Learn more about the BudgetBasics initiative, leave your feedback, or get in touch with our educational team.
          </p>
        </div>

        <div className="about-card">
          <div className="about-header">
            <div className="about-logo">🐝</div>
            <div>
              <h3>About BudgetBasics</h3>
              <p className="about-subtitle">Project Theme: <strong>NextGen BudgetBee</strong> | Category: <strong>Web Innovation Unleashed</strong></p>
            </div>
          </div>

          <div className="about-body">
            <p>
              <strong>BudgetBasics</strong> is an innovative, student-friendly Single Page Application (SPA) designed to solve a critical life problem: financial literacy among college students and young adults.
            </p>
            <p>
              Managing allowances, part-time earnings, and expenses without a plan often leads to mid-month money crunches. BudgetBasics provides interactive tools, clear visual infographics, 50-30-20 rule estimators, expense tracking, and AI guidance—helping students build responsible money habits early in life.
            </p>

            <div className="audience-box">
              <h4>🎯 Primary Audience & Stakeholders</h4>
              <p>College learners, university students, trainers, evaluators, and personal finance beginners.</p>
            </div>
          </div>
        </div>

        <div className="forms-grid">
          <div className="form-card">
            <h3>Student Feedback Form</h3>
            <p className="form-subtitle">We value your thoughts! Let us know how BudgetBasics helped you.</p>

            {fbSubmitted ? (
              <div className="success-banner">
                <h4><CheckCircle size={20} className="icon-inline" /> Thank You for Your Feedback!</h4>
                <p>Your response has been validated and recorded locally. We appreciate your input!</p>
                <button
                  className="btn btn-outline"
                  onClick={() => setFbSubmitted(false)}
                >
                  Send Another Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">Your Full Name:</label>
                  <input
                    type="text"
                    className={`form-input ${fbErrors.name ? 'input-error' : ''}`}
                    value={fbName}
                    onChange={(e) => setFbName(e.target.value)}
                  />
                  {fbErrors.name && <p className="error-text">{fbErrors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address:</label>
                  <input
                    type="email"
                    className={`form-input ${fbErrors.email ? 'input-error' : ''}`}
                    value={fbEmail}
                    onChange={(e) => setFbEmail(e.target.value)}
                  />
                  {fbErrors.email && <p className="error-text">{fbErrors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (1 to 5 Stars):</label>
                  <select
                    className="form-select"
                    value={fbRating}
                    onChange={(e) => setFbRating(e.target.value)}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                    <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                    <option value="3">⭐⭐⭐ 3 - Good</option>
                    <option value="2">⭐⭐ 2 - Average</option>
                    <option value="1">⭐ 1 - Needs Improvement</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Comments & Suggestions:</label>
                  <textarea
                    rows="3"
                    className={`form-textarea ${fbErrors.comments ? 'input-error' : ''}`}
                    value={fbComments}
                    onChange={(e) => setFbComments(e.target.value)}
                  ></textarea>
                  {fbErrors.comments && <p className="error-text">{fbErrors.comments}</p>}
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  <Send size={16} /> Submit Feedback
                </button>
              </form>
            )}
          </div>

          <div className="form-card">
            <h3>Contact Us</h3>
            <p className="form-subtitle">Have questions or project suggestions? Send us a direct message.</p>

            <div className="contact-info-list">
              <div className="contact-item">
                <Mail size={18} className="text-primary" />
                <div>
                  <strong>Email:</strong> support@budgetbasics.edu
                </div>
              </div>
              <div className="contact-item">
                <Phone size={18} className="text-primary" />
                <div>
                  <strong>Student Helpline:</strong> +1 (800) 555-BUDGET
                </div>
              </div>
              <div className="contact-item">
                <Globe size={18} className="text-primary" />
                <div>
                  <strong>Socials:</strong> @BudgetBasics_Edu (Instagram / X / LinkedIn)
                </div>
              </div>
            </div>

            {contactSubmitted ? (
              <div className="success-banner">
                <h4><CheckCircle size={20} className="icon-inline" /> Message Sent Successfully!</h4>
                <p>Thank you for reaching out. Your client-side validation passed!</p>
                <button
                  className="btn btn-outline"
                  onClick={() => setContactSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className={`form-input ${contactErrors.name ? 'input-error' : ''}`}
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                  {contactErrors.name && <p className="error-text">{contactErrors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className={`form-input ${contactErrors.email ? 'input-error' : ''}`}
                    placeholder="your.email@domain.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  {contactErrors.email && <p className="error-text">{contactErrors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Message:</label>
                  <textarea
                    rows="3"
                    className={`form-textarea ${contactErrors.message ? 'input-error' : ''}`}
                    placeholder="Type your query or message here..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  ></textarea>
                  {contactErrors.message && <p className="error-text">{contactErrors.message}</p>}
                </div>

                <button type="submit" className="btn btn-secondary btn-full">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="faqs-container">
          <h3>Frequently Asked Questions</h3>

          <div className="faqs-list">
            {budgetData.contactFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <span>{isOpen ? '➖' : '➕'}</span>
                  </button>
                  {isOpen && <p className="faq-answer">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutContactModule;