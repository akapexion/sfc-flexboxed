import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Star, ThumbsUp, UserCheck } from 'lucide-react';
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
      const newFeedback = {
        id: Date.now(),
        name: fbName.trim(),
        rating: parseInt(fbRating, 10),
        category: fbCategory,
        comment: fbComments.trim(),
        date: 'Just now'
      };

      setRecentFeedbacks([newFeedback, ...recentFeedbacks]);
      setFbSubmitted(true);
      toast.success('Thank you! Feedback submitted successfully.');
      setFbName('');
      setFbEmail('');
      setFbRating('5');
      setFbComments('');
    } else {
      toast.error('Please review the form before submitting.');
    }
  };

  return (
    <>
    {location.pathname == "/feedback" ?
    (
      <PageHeroBanner
        title="Student Feedback"
        subtitle="We value your thoughts! Share your experience with BudgetBasics and help us continuously improve our educational tools."
        badge="Community Input"
        bgImage={feedbackBannerImg}
      />
    )
    :
    ""
  }

      <section id="feedback-page" className="module-section bg-light">
        <div className="container">
          <div className="feedback-page-grid">
            <div className="form-card border-only">
              <h3>Submit Your Feedback</h3>
              <p className="form-subtitle">
                Let us know how BudgetBasics helped you manage your student finances.
              </p>

              {fbSubmitted ? (
                <div className="success-banner">
                  <h4>
                    <CheckCircle size={20} className="icon-inline" /> Thank You for Your Feedback!
                  </h4>

                  <p>
                    Your response has been recorded and added to our student feedback log. We appreciate your continuous support!
                  </p>

                  <button
                    className="btn btn-outline"
                    onClick={() => setFbSubmitted(false)}
                  >
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label">Your Name:</label>

                    <input
                      type="text"
                      className={`form-input ${fbErrors.name ? 'input-error' : ''}`}
                      value={fbName}
                      onChange={(e) => setFbName(e.target.value)}
                    />

                    {fbErrors.name && (
                      <p className="error-text">{fbErrors.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address:</label>

                    <input
                      type="email"
                      className={`form-input ${fbErrors.email ? 'input-error' : ''}`}
                      value={fbEmail}
                      onChange={(e) => setFbEmail(e.target.value)}
                    />

                    {fbErrors.email && (
                      <p className="error-text">{fbErrors.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Feedback Category:</label>

                    <select
                      className="form-select"
                      value={fbCategory}
                      onChange={(e) => setFbCategory(e.target.value)}
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Calculators">Calculators & Tools</option>
                      <option value="Expense Tracker">Expense Tracker</option>
                      <option value="Infographics">Infographics & Visuals</option>
                      <option value="AI Chatbot">AI Chatbot</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating:</label>

                    <select
                      className="form-select"
                      value={fbRating}
                      onChange={(e) => setFbRating(e.target.value)}
                    >
                      {ratingOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <StarRating
                      rating={parseInt(fbRating, 10)}
                      size={18}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Comments & Suggestions:</label>

                    <textarea
                      rows="4"
                      className={`form-textarea ${fbErrors.comments ? 'input-error' : ''}`}
                      value={fbComments}
                      onChange={(e) => setFbComments(e.target.value)}
                    ></textarea>

                    {fbErrors.comments && (
                      <p className="error-text">{fbErrors.comments}</p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">
                    <Send size={16} /> Submit Feedback
                  </button>
                </form>
              )}
            </div>

            <div className="feedback-reviews-card border-only">
              <h3>What Students Say</h3>

              <p className="form-subtitle">
                Recent reviews and community input from fellow learners.
              </p>

              <div className="feedback-list">
                {recentFeedbacks.map((fb) => (
                  <div key={fb.id} className="feedback-item border-only">
                    <div className="feedback-item-header">
                      <div>
                        <strong>{fb.name}</strong>
                        <span className="feedback-cat-tag">{fb.category}</span>
                      </div>

                      <StarRating rating={fb.rating} size={14} />
                    </div>

                    <p className="feedback-text">"{fb.comment}"</p>
                    <span className="feedback-date">{fb.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedbackPage;