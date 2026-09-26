import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight, Home, BookOpen, Calculator, BarChart2, Info, Mail, MessageSquare } from 'lucide-react';
import PageHeroBanner from './PageHeroBanner';
import sitemapBannerImg from '../assets/banner_sitemap.jpg';

const SitemapPage = () => {
  return (
    <>
      <PageHeroBanner
        title="Website Sitemap"
        subtitle="Complete information architecture and navigation map of BudgetBasics."
        badge="Architecture"
        bgImage={sitemapBannerImg}
      />

      <section className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><Map size={26} className="icon-inline text-primary" /> BudgetBasics Sitemap</h2>
            <p className="section-description">
              Explore the complete structure of BudgetBasics. Click any page link below to navigate directly!
            </p>
          </div>

          <div className="sitemap-tree">
            <div className="sitemap-root-card border-only">
              <h4><Home size={20} className="icon-inline text-primary" /> <Link to="/">Home Dashboard (/)</Link></h4>
              <p>Welcome hero slider, live clock, visitor counter, tips ticker, quick search, and interactive module 3D flip cards.</p>
            </div>

            <div className="sitemap-branches-grid">
              <div className="branch-card border-only">
                <div className="branch-header"><BookOpen size={18} className="icon-inline" /> Educational Guides</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/basics">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Budgeting Basics</strong> (/basics) - Concepts & quiz
                    </Link>
                  </li>
                  <li>
                    <Link to="/needs-wants">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Needs vs Wants</strong> (/needs-wants) - Classifier game & guide
                    </Link>
                  </li>
                  <li>
                    <Link to="/money-mistakes">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Money Mistakes</strong> (/money-mistakes) - Pitfalls & solutions
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card border-only">
                <div className="branch-header"><Calculator size={18} className="icon-inline" /> Interactive Calculators</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/50-30-20-rule">
                      <ArrowRight size={14} className="icon-inline" /> <strong>50-30-20 Rule</strong> (/50-30-20-rule) - Split estimator & stacked chart
                    </Link>
                  </li>
                  <li>
                    <Link to="/savings-goals">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Savings Goals</strong> (/savings-goals) - Goal timeline in Pakistani Rupees (Rs.)
                    </Link>
                  </li>
                  <li>
                    <Link to="/expense-planner">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Expense Planner</strong> (/expense-planner) - Daily purchase log table in Rs.
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card border-only">
                <div className="branch-header"><BarChart2 size={18} className="icon-inline" /> Visual Resources & AI</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/infographics">
                      <ArrowRight size={14} className="icon-inline" /> <strong>Infographics Gallery</strong> (/infographics) - Filterable visual graphics
                    </Link>
                  </li>
                  <li>
                    <Link to="/chatbot">
                      <ArrowRight size={14} className="icon-inline" /> <strong>AI Chatbot</strong> (/chatbot) - Smart student assistant
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="branch-card border-only">
                <div className="branch-header"><Info size={18} className="icon-inline" /> Project & Contact</div>
                <ul className="branch-list">
                  <li>
                    <Link to="/about">
                      <ArrowRight size={14} className="icon-inline" /> <strong>About Us</strong> (/about) - Project theme & FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <ArrowRight size={14} className="icon-inline text-primary" /> <strong>Contact Us</strong> (/contact) - Direct support & help desk
                    </Link>
                  </li>
                  <li>
                    <Link to="/feedback">
                      <ArrowRight size={14} className="icon-inline text-primary" /> <strong>Student Feedback</strong> (/feedback) - Ratings & reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SitemapPage;