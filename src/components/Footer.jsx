import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import siteLogo from "../assets/logo2.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link to="/">
              <img src={siteLogo} alt="BudgetBasics Logo" className="footer-site-logo" />
            </Link>
            <p className="footer-tagline">
              Master Your Money, Build Your Future. Designed for college students and personal finance beginners.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Learning Modules</h4>
            <ul>
              <li><Link to="/basics">Budgeting Basics</Link></li>
              <li><Link to="/needs-wants">Needs vs Wants</Link></li>
              <li><Link to="/50-30-20-rule">50 30 20 Rule</Link></li>
              <li><Link to="/savings-goals">Savings Goals</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Interactive Tools</h4>
            <ul>
              <li><Link to="/expense-planner">Expense Planner</Link></li>
              <li><Link to="/money-mistakes">Money Mistakes</Link></li>
              <li><Link to="/infographics">Infographics Gallery</Link></li>
              <li><Link to="/chatbot">AI Chatbot Assistant</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/feedback">Student Feedback</Link></li>
              <li><Link to="/sitemap">Website Sitemap</Link></li>
              <li>
                <button onClick={scrollToTop} className="btn-link">
                  <ArrowUp size={14} className="icon-inline" /> Back to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <strong>BudgetBasics</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;