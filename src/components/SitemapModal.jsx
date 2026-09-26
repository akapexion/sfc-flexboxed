import React from 'react';
import { Link } from 'react-router-dom';
import { Map, X, ArrowRight } from 'lucide-react';

const SitemapModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content sitemap-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3><Map size={22} className="icon-inline text-primary" /> BudgetBasics Information Architecture & Sitemap Flow</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body sitemap-body">
          <p className="sitemap-intro">
            Click on any branch node below to navigate directly to that page!
          </p>

          <div className="sitemap-tree">
            <div className="sitemap-root-card">
              <p>Main menu, live clock, visitor counter, tips ticker & call-to-action banner</p>
            </div>

            <div className="sitemap-branches-grid">
              <div className="branch-card">
                <div className="branch-header">Learn Budgeting</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/basics" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Budgeting Basics</strong> (Concepts, budget table, quiz)
                    </Link>
                  </li>
                  <li>
                    <Link to="/needs-wants" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Needs vs Wants</strong> (Classifier game & guide)
                    </Link>
                  </li>
                  <li>
                    <Link to="/50-30-20-rule" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>50-30-20 Rule</strong> (Calculator & breakdown)
                    </Link>
                  </li>
                  <li>
                    <Link to="/money-mistakes" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Money Mistakes</strong> (Scenario cards & solutions)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card">
                <div className="branch-header">Practice Planning</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/savings-goals" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Savings Goals</strong> (Timeline planner & target tracker)
                    </Link>
                  </li>
                  <li>
                    <Link to="/expense-planner" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Expense Planner</strong> (Daily tracker & edit/delete)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card">
                <div className="branch-header">Explore Resources</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/infographics" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Infographics Gallery</strong> (Visual guides & lightbox)
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>Search, Sort & Filter</strong> (Global keywords & topics)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card">
                <div className="branch-header">Get Help & Connect</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/chatbot" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>AI Q&A Assistant</strong> (Smart chatbot & prompts)
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-contact" onClick={onClose}>
                      <ArrowRight size={14} className="icon-inline" /> <strong>About Us & Contact</strong> (Project info & FAQs)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapModal;