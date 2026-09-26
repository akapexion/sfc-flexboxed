import React, { useState } from 'react';
import { Mail, Phone, Globe, Send, CheckCircle, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeroBanner from './PageHeroBanner';
import contactBannerImg from '../assets/banner_contact.jpg';

const ContactPage = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
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
      toast.success('✉️ Contact message sent successfully!');
      setContactName('');
      setContactEmail('');
      setSubject('');
      setContactMessage('');
    } else {
      toast.error('⚠️ Please fix errors in the contact form.');
    }
  };

  return (
    <>
      <PageHeroBanner
        title="Contact Us"
        subtitle="Have questions, technical inquiries, or need guidance? Get in touch with our educational support team."
        badge="Direct Support"
        bgImage={contactBannerImg}
      />

      <section id="contact-page" className="module-section bg-light">
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Details Card */}
            <div className="contact-details-card border-only">
              <h3>Get In Touch</h3>
              <p className="form-subtitle">We are here to support your financial literacy journey.</p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4>Email Support</h4>
                    <p>support@budgetbasics.pk</p>
                    <span className="info-note">Response within 24 hours</span>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4>Student Helpline</h4>
                    <p>+92 3482237240</p>
                    <span className="info-note">Toll-free student support</span>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <Globe size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4>Social Media</h4>
                    <p>@BudgetBasics_Edu</p>
                    <span className="info-note">Instagram / X / LinkedIn</span>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4>Campus Desk</h4>
                    <p>NextGen BudgetBee Hub, Aptech Shahrah e Faisal Center Karachi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form Card */}
            <div className="form-card border-only">
              <h3>Send Us a Message</h3>
              <p className="form-subtitle">Fill out the form below for student support or general queries.</p>

              {contactSubmitted ? (
                <div className="success-banner">
                  <h4><CheckCircle size={20} className="icon-inline" /> Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. Your message has been received by our student support team.</p>
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
                    <label className="form-label">Full Name:</label>
                    <input
                      type="text"
                      className={`form-input ${contactErrors.name ? 'input-error' : ''}`}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                    {contactErrors.name && <p className="error-text">{contactErrors.name}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address:</label>
                    <input
                      type="email"
                      className={`form-input ${contactErrors.email ? 'input-error' : ''}`}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    {contactErrors.email && <p className="error-text">{contactErrors.email}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject (Optional):</label>
                    <input
                      type="text"
                      className="form-input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message:</label>
                    <textarea
                      rows="4"
                      className={`form-textarea ${contactErrors.message ? 'input-error' : ''}`}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    ></textarea>
                    {contactErrors.message && <p className="error-text">{contactErrors.message}</p>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">
                    <Send size={16} /> Send Direct Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;