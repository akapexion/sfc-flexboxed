import React, { useState } from "react";
import {
  BookOpen,
  Target,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import budgetData from "../data/budgetData.json";
import PageHeroBanner from "./PageHeroBanner";
import aboutBannerImg from "../assets/banner_about.jpg";
import siteLogo from "../assets/logo.svg";

const AboutPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <>
      <PageHeroBanner
        title="About BudgetBasics"
        subtitle="Empowering students and personal finance beginners with interactive budgeting tools and financial literacy."
        badge="Mission & Vision"
        bgImage={aboutBannerImg}
      />

      <section id="about-page" className="module-section bg-light">
        <div className="container">
          <div className="about-card border-only">
            <div className="about-header">
              <img
                src={siteLogo}
                alt="BudgetBasics Logo"
                className="about-site-logo"
              />
              <div>
                <h3>BudgetBasics Project</h3>
                <p className="about-subtitle">
                  Category: <strong>Web Innovation Unleashed</strong>
                </p>
              </div>
            </div>

            <div className="about-body">
              <p>
                <strong>BudgetBasics</strong> is an interactive Single Page
                Application (SPA) designed to help college students and personal
                finance beginners build practical financial management skills.
              </p>
              <p>
                Managing allowances, student income, and daily expenses without
                a plan often leads to unnecessary money stress. BudgetBasics
                provides simple calculators, interactive classification tools,
                expense tracking in Pakistani Rupees (Rs.), visual infographics,
                and instant AI guidance to create healthy spending habits early
                in life.
              </p>

              <div className="audience-box border-only">
                <h4>
                  <Target size={18} className="icon-inline text-primary" />
                  Primary Audience & Stakeholders
                </h4>
                <p>
                  College learners, university students, personal finance
                  beginners, trainers, and academic evaluators.
                </p>
              </div>
            </div>
          </div>

          <div className="about-features-grid">
            <div className="feature-card border-only">
              <div className="feature-card-icon">
                <BookOpen size={24} className="text-primary" />
              </div>
              <h4>Educational Modules</h4>
              <p>
                Interactive guides on budgeting basics, 50-30-20 allocations,
                and identifying common money pitfalls.
              </p>
            </div>

            <div className="feature-card border-only">
              <div className="feature-card-icon">
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <h4>Interactive Tools</h4>
              <p>
                Smart calculators for monthly savings goals, daily Rupee expense
                logging, and Needs vs Wants classification.
              </p>
            </div>

            <div className="feature-card border-only">
              <div className="feature-card-icon">
                <ShieldCheck size={24} className="text-primary" />
              </div>
              <h4>Client-Side Privacy</h4>
              <p>
                Your financial data remains strictly local in your browser
                session for maximum security and ease of use.
              </p>
            </div>
          </div>

          <div className="faqs-container border-only">
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
                      <span>{isOpen ? "➖" : "➕"}</span>
                    </button>
                    {isOpen && <p className="faq-answer">{faq.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;