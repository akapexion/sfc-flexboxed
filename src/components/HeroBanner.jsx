import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, Receipt, ShieldCheck, Zap, Bot } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Your Money, <br />
            <span className="hero-highlight">Build Your Future</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to BudgetBasics. Learn how to manage your student allowance, balance needs versus wants, avoid common money traps, and plan your savings with simple interactive tools.
          </p>

          <div className="hero-cta-buttons">
            <Link to="/basics" className="btn btn-primary">
              Start Learning Basics
            </Link>
            <Link to="/50-30-20-rule" className="btn btn-secondary">
              50 30 20 Calculator
            </Link>
            <Link to="/expense-planner" className="btn btn-outline">
              Expense Planner
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-preview">
            <div className="card-header-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="card-title-text">Student Allowance Planner</span>
            </div>

            <div className="card-body-preview">
              <div className="preview-stat">
                <span className="label">Monthly Allowance:</span>
                <span className="value text-primary">RS400</span>
              </div>

              <div className="preview-bar-group">
                <div className="bar-label">
                  <span>Needs (50%)</span>
                  <span>RS200</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-fill needs"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>

              <div className="preview-bar-group">
                <div className="bar-label">
                  <span>Wants (30%)</span>
                  <span>RS120</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-fill wants"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>

              <div className="preview-bar-group">
                <div className="bar-label">
                  <span>Savings (20%)</span>
                  <span>RS80</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-fill savings"
                    style={{ width: '20%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;