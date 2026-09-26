import React, { useState } from 'react';

import {
  Mail,
  Phone,
  Globe,
  Send,
  CheckCircle,
  MapPin,
} from 'lucide-react';

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

  // Name validation
  const namePattern = /^[A-Za-zÀ-ÿ\s'-]{2,50}$/;

  // Email validation
  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Subject validation
  const subjectPattern =
    /^[A-Za-z0-9À-ÿ\s.,!?'"()&:/_-]{3,100}$/;

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = contactMessage.trim();

    // Name
    if (!trimmedName) {
      errors.name = 'Name is required.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    } else if (trimmedName.length > 50) {
      errors.name = 'Name cannot exceed 50 characters.';
    } else if (!namePattern.test(trimmedName)) {
      errors.name =
        'Name can only contain letters, spaces, hyphens and apostrophes.';
    }

    // Email
    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    } else if (trimmedEmail.length > 100) {
      errors.email = 'Email cannot exceed 100 characters.';
    } else if (!emailPattern.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Subject
    if (trimmedSubject) {
      if (trimmedSubject.length < 3) {
        errors.subject =
          'Subject must be at least 3 characters.';
      } else if (trimmedSubject.length > 100) {
        errors.subject =
          'Subject cannot exceed 100 characters.';
      } else if (!subjectPattern.test(trimmedSubject)) {
        errors.subject =
          'Subject contains invalid characters.';
      }
    }

    // Message
    if (!trimmedMessage) {
      errors.message = 'Message is required.';
    } else if (trimmedMessage.length < 10) {
      errors.message =
        'Message must be at least 10 characters.';
    } else if (trimmedMessage.length > 1000) {
      errors.message =
        'Message cannot exceed 1000 characters.';
    }

    setContactErrors(errors);

    if (Object.keys(errors).length === 0) {
      setContactSubmitted(true);

      toast.success(
        '✉️ Contact message sent successfully!'
      );

      // Reset form
      setContactName('');
      setContactEmail('');
      setSubject('');
      setContactMessage('');
      setContactErrors({});
    } else {
      toast.error(
        '⚠️ Please fix errors in the contact form.'
      );
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

      <section
        id="contact-page"
        className="module-section bg-light"
      >
        <div className="container">

          <div className="contact-page-grid">

            {/* Contact Details */}
            <div className="contact-details-card border-only">

              <h3>Get In Touch</h3>

              <p className="form-subtitle">
                We are here to support your financial literacy journey.
              </p>

              <div className="contact-info-list">

                {/* Email */}
                <div className="contact-info-item">

                  <div className="contact-icon-box">
                    <Mail
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <h4>Email Support</h4>

                    <p>
                      support@budgetbasics.pk
                    </p>

                    <span className="info-note">
                      Response within 24 hours
                    </span>
                  </div>

                </div>

                {/* Phone */}
                <div className="contact-info-item">

                  <div className="contact-icon-box">
                    <Phone
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <h4>Student Helpline</h4>

                    <p>
                      +92 3482237240
                    </p>

                    <span className="info-note">
                      Student support
                    </span>
                  </div>

                </div>

                {/* Social Media */}
                <div className="contact-info-item">

                  <div className="contact-icon-box">
                    <Globe
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <h4>Social Media</h4>

                    <p>
                      @BudgetBasics_Edu
                    </p>

                    <span className="info-note">
                      Instagram / X / LinkedIn
                    </span>
                  </div>

                </div>

                {/* Location */}
                <div className="contact-info-item">

                  <div className="contact-icon-box">
                    <MapPin
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <h4>Campus Desk</h4>

                    <p>
                      NextGen BudgetBee Hub, Aptech
                      Shahrah e Faisal Center Karachi
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="form-card border-only">

              <h3>Send Us a Message</h3>

              <p className="form-subtitle">
                Fill out the form below for student support or general queries.
              </p>

              {contactSubmitted ? (

                <div className="success-banner">

                  <h4>
                    <CheckCircle
                      size={20}
                      className="icon-inline"
                    />

                    Message Sent Successfully!
                  </h4>

                  <p>
                    Thank you for reaching out. Your message
                    has been received by our student support team.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setContactSubmitted(false)}
                  >
                    Send Another Message
                  </button>

                </div>

              ) : (

                <form
                  onSubmit={handleContactSubmit}
                  noValidate
                >

                  {/* Name */}
                  <div className="form-group">

                    <label className="form-label">
                      Full Name:
                    </label>

                    <input
                      type="text"
                      className={`form-input ${
                        contactErrors.name
                          ? 'input-error'
                          : ''
                      }`}
                      value={contactName}
                      onChange={(e) =>
                        setContactName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      pattern="[A-Za-zÀ-ÿ\s'-]{2,50}"
                      minLength="2"
                      maxLength="50"
                      autoComplete="name"
                      required
                    />

                    {contactErrors.name && (
                      <p className="error-text">
                        {contactErrors.name}
                      </p>
                    )}

                  </div>

                  {/* Email */}
                  <div className="form-group">

                    <label className="form-label">
                      Email Address:
                    </label>

                    <input
                      type="email"
                      className={`form-input ${
                        contactErrors.email
                          ? 'input-error'
                          : ''
                      }`}
                      value={contactEmail}
                      onChange={(e) =>
                        setContactEmail(e.target.value)
                      }
                      placeholder="example@email.com"
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                      maxLength="100"
                      autoComplete="email"
                      required
                    />

                    {contactErrors.email && (
                      <p className="error-text">
                        {contactErrors.email}
                      </p>
                    )}

                  </div>

                  {/* Subject */}
                  <div className="form-group">

                    <label className="form-label">
                      Subject (Optional):
                    </label>

                    <input
                      type="text"
                      className={`form-input ${
                        contactErrors.subject
                          ? 'input-error'
                          : ''
                      }`}
                      value={subject}
                      onChange={(e) =>
                        setSubject(e.target.value)
                      }
                      placeholder="Enter subject"
                      pattern="[A-Za-z0-9À-ÿ\s.,!?&:'\()/_-]{3,100}"
                      minLength="3"
                      maxLength="100"
                    />

                    {contactErrors.subject && (
                      <p className="error-text">
                        {contactErrors.subject}
                      </p>
                    )}

                  </div>

                  {/* Message */}
                  <div className="form-group">

                    <label className="form-label">
                      Your Message:
                    </label>

                    <textarea
                      rows="4"
                      className={`form-textarea ${
                        contactErrors.message
                          ? 'input-error'
                          : ''
                      }`}
                      value={contactMessage}
                      onChange={(e) =>
                        setContactMessage(e.target.value)
                      }
                      placeholder="Write your message..."
                      minLength="10"
                      maxLength="1000"
                      required
                    />

                    {contactErrors.message && (
                      <p className="error-text">
                        {contactErrors.message}
                      </p>
                    )}

                    <small>
                      {contactMessage.length}/1000 characters
                    </small>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                  >
                    <Send size={16} />
                    Send Direct Message
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default ContactPage;