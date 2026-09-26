import React, { useState } from 'react';
import { Send, CheckCircle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeroBanner from './PageHeroBanner';
import feedbackBannerImg from '../assets/banner_feedback.jpg';

const ratingOptions = [
  { value: '5', label: '5 - Excellent' },
  { value: '4', label: '4 - Very Good' },
  { value: '3', label: '3 - Good' },
  { value: '2', label: '2 - Average' },
  { value: '1', label: '1 - Needs Improvement' },
];

const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="stars-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          className="icon-inline"
          fill={value <= rating ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

const FeedbackPage = () => {
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbRating, setFbRating] = useState('5');
  const [fbCategory, setFbCategory] = useState('General Feedback');
  const [fbComments, setFbComments] = useState('');

  const [fbErrors, setFbErrors] = useState({});
  const [fbSubmitted, setFbSubmitted] = useState(false);

  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  // Name: letters, spaces, hyphen and apostrophe
  const namePattern = /^[A-Za-zÀ-ÿ\s'-]{2,50}$/;

  // Email pattern
  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    const trimmedName = fbName.trim();
    const trimmedEmail = fbEmail.trim();
    const trimmedComments = fbComments.trim();

    // Name validation
    if (!trimmedName) {
      errors.name = 'Name is required.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    } else if (trimmedName.length > 50) {
      errors.name = 'Name cannot exceed 50 characters.';
    } else if (!namePattern.test(trimmedName)) {
      errors.name = 'Name can only contain letters, spaces, hyphens and apostrophes.';
    }

    // Email validation
    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    } else if (trimmedEmail.length > 100) {
      errors.email = 'Email cannot exceed 100 characters.';
    } else if (!emailPattern.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Comments validation
    if (!trimmedComments) {
      errors.comments = 'Comments are required.';
    } else if (trimmedComments.length < 10) {
      errors.comments = 'Comments must be at least 10 characters.';
    } else if (trimmedComments.length > 500) {
      errors.comments = 'Comments cannot exceed 500 characters.';
    }

    setFbErrors(errors);

    if (Object.keys(errors).length === 0) {
      const newFeedback = {
        id: Date.now(),
        name: trimmedName,
        rating: parseInt(fbRating, 10),
        category: fbCategory,
        comment: trimmedComments,
        date: 'Just now',
      };

      setRecentFeedbacks((prev) => [newFeedback, ...prev]);

      setFbSubmitted(true);

      toast.success('Thank you! Feedback submitted successfully.');

      // Reset form
      setFbName('');
      setFbEmail('');
      setFbRating('5');
      setFbCategory('General Feedback');
      setFbComments('');
      setFbErrors({});
    } else {
      toast.error('Please review the form before submitting.');
    }
  };

  return (
    <>
      {location.pathname === '/feedback' && (
        <PageHeroBanner
          title="Student Feedback"
          subtitle="We value your thoughts! Share your experience with BudgetBasics and help us continuously improve our educational tools."
          badge="Community Input"
          bgImage={feedbackBannerImg}
        />
      )}

      <section id="feedback-page" className="module-section bg-light">
        <div className="container">
          <div className="feedback-page-grid">

            {/* Feedback Form */}
            <div className="form-card border-only">

              <h3>Submit Your Feedback</h3>

              <p className="form-subtitle">
                Let us know how BudgetBasics helped you manage your student finances.
              </p>

              {fbSubmitted ? (
                <div className="success-banner">

                  <h4>
                    <CheckCircle
                      size={20}
                      className="icon-inline"
                    />
                    Thank You for Your Feedback!
                  </h4>

                  <p>
                    Your response has been recorded and added to our
                    student feedback log. We appreciate your continuous support!
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setFbSubmitted(false)}
                  >
                    Submit Another Feedback
                  </button>

                </div>
              ) : (

                <form
                  onSubmit={handleFeedbackSubmit}
                  noValidate
                >

                  {/* Name */}
                  <div className="form-group">

                    <label className="form-label">
                      Your Name:
                    </label>

                    <input
                      type="text"
                      className={`form-input ${
                        fbErrors.name ? 'input-error' : ''
                      }`}
                      value={fbName}
                      onChange={(e) => setFbName(e.target.value)}
                      placeholder="Enter your full name"
                      pattern="[A-Za-zÀ-ÿ\s'-]{2,50}"
                      minLength="2"
                      maxLength="50"
                      autoComplete="name"
                      required
                    />

                    {fbErrors.name && (
                      <p className="error-text">
                        {fbErrors.name}
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
                        fbErrors.email ? 'input-error' : ''
                      }`}
                      value={fbEmail}
                      onChange={(e) => setFbEmail(e.target.value)}
                      placeholder="example@email.com"
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                      maxLength="100"
                      autoComplete="email"
                      required
                    />

                    {fbErrors.email && (
                      <p className="error-text">
                        {fbErrors.email}
                      </p>
                    )}

                  </div>

                  {/* Category */}
                  <div className="form-group">

                    <label className="form-label">
                      Feedback Category:
                    </label>

                    <select
                      className="form-select"
                      value={fbCategory}
                      onChange={(e) => setFbCategory(e.target.value)}
                      required
                    >
                      <option value="General Feedback">
                        General Feedback
                      </option>

                      <option value="Calculators">
                        Calculators & Tools
                      </option>

                      <option value="Expense Tracker">
                        Expense Tracker
                      </option>

                      <option value="Infographics">
                        Infographics & Visuals
                      </option>

                      <option value="AI Chatbot">
                        AI Chatbot
                      </option>
                    </select>

                  </div>

                  {/* Rating */}
                  <div className="form-group">

                    <label className="form-label">
                      Rating:
                    </label>

                    <select
                      className="form-select"
                      value={fbRating}
                      onChange={(e) => setFbRating(e.target.value)}
                      required
                    >
                      {ratingOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <StarRating
                      rating={parseInt(fbRating, 10)}
                      size={18}
                    />

                  </div>

                  {/* Comments */}
                  <div className="form-group">

                    <label className="form-label">
                      Comments & Suggestions:
                    </label>

                    <textarea
                      rows="4"
                      className={`form-textarea ${
                        fbErrors.comments ? 'input-error' : ''
                      }`}
                      value={fbComments}
                      onChange={(e) => setFbComments(e.target.value)}
                      placeholder="Share your feedback or suggestions..."
                      minLength="10"
                      maxLength="500"
                      required
                    />

                    {fbErrors.comments && (
                      <p className="error-text">
                        {fbErrors.comments}
                      </p>
                    )}

                    <small>
                      {fbComments.length}/500 characters
                    </small>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                  >
                    <Send size={16} />
                    Submit Feedback
                  </button>

                </form>
              )}

            </div>

            {/* Recent Feedback */}
            <div className="feedback-reviews-card border-only">

              <h3>What Students Say</h3>

              <p className="form-subtitle">
                Recent reviews and community input from fellow learners.
              </p>

              <div className="feedback-list">

                {recentFeedbacks.length === 0 ? (

                  <div className="empty-feedback">
                    <p>
                      No feedback submitted yet.
                    </p>
                  </div>

                ) : (

                  recentFeedbacks.map((fb) => (

                    <div
                      key={fb.id}
                      className="feedback-item border-only"
                    >

                      <div className="feedback-item-header">

                        <div>
                          <strong>
                            {fb.name}
                          </strong>

                          <span className="feedback-cat-tag">
                            {fb.category}
                          </span>
                        </div>

                        <StarRating
                          rating={fb.rating}
                          size={14}
                        />

                      </div>

                      <p className="feedback-text">
                        "{fb.comment}"
                      </p>

                      <span className="feedback-date">
                        {fb.date}
                      </span>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default FeedbackPage;