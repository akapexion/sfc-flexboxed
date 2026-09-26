import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  ArrowRight,
  BookOpen,
  Calculator,
  Receipt,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import slide1Img from '../assets/slider_slide1.jpg';
import slide2Img from '../assets/slider_slide2.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

  return (
    <section id="hero-slider-section" className="hero-slider-section">
      <div className="hero-slider-container">
        <div
          className="hero-slider-track"
          style={{ transform: `translateX(-${currentSlide * 50}%)` }}
        >
          {/* Slide 1 */}
          <div className="hero-slide-cell">
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.75)), url(${slide1Img})`,
              }}
            />

            <div className="container hero-slide-content">
              <span className="hero-badge">
                <Sparkles size={16} className="icon-inline" /> NextGen BudgetBee Platform
              </span>

              <h1 className="hero-slide-title">
                Master Your Money, <br />
                <span className="hero-highlight">Build Your Future</span>
              </h1>

              <p className="hero-slide-subtitle">
                Welcome to BudgetBasics. Learn how to manage your student allowance, balance needs versus wants, avoid common money traps, and plan your savings with simple interactive tools.
              </p>

              <div className="hero-cta-buttons">
                <Link to="/basics" className="btn btn-primary btn-lg">
                  <BookOpen size={18} /> Start Learning Basics
                </Link>

                <Link to="/50-30-20-rule" className="btn btn-secondary btn-lg">
                  <Calculator size={18} /> 50-30-20 Calculator
                </Link>

                <Link
                  to="/expense-planner"
                  className="btn btn-outline btn-lg text-white border-white"
                >
                  <Receipt size={18} /> Expense Planner
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="hero-slide-cell">
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(13, 148, 136, 0.75)), url(${slide2Img})`,
              }}
            />

            <div className="container hero-slide-content">
              <span className="hero-badge badge-teal">
                <Target size={16} className="icon-inline" /> Smart Financial Habits
              </span>

              <h1 className="hero-slide-title">
                Smart 50-30-20 Budgeting <br />
                <span className="hero-highlight-teal">
                  & Pakistani Rupee (Rs.) Tracking
                </span>
              </h1>

              <p className="hero-slide-subtitle">
                Allocate 50% to Needs, 30% to Wants, and 20% to Savings. Log daily student purchases in Pakistani Rupees (Rs.) and stay on top of your financial goals with real-time balance updates!
              </p>

              <div className="hero-cta-buttons">
                <Link to="/50-30-20-rule" className="btn btn-primary btn-lg">
                  <Calculator size={18} /> Calculate 50-30-20 Split
                </Link>

                <Link to="/expense-planner" className="btn btn-secondary btn-lg">
                  <Receipt size={18} /> Track Daily Expenses
                </Link>

                <Link
                  to="/savings-goals"
                  className="btn btn-outline btn-lg text-white border-white"
                >
                  <Target size={18} /> Set Savings Goals <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="slider-nav-btn prev-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="slider-nav-btn next-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="slider-dots-container">
          <button
            className={`slider-dot ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(0)}
            aria-label="Go to slide 1"
          />

          <button
            className={`slider-dot ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(1)}
            aria-label="Go to slide 2"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;