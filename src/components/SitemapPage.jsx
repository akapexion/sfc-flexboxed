import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Calculator,
  Target,
  Wallet,
  Gamepad2,
  ShieldAlert,
  Eye,
  Image,
  Bot,
  Star
} from 'lucide-react';

const sections = [
  {
    title: 'Core Financial Calculators & Planners',
    icon: Calculator,
    modules: [
      {
        icon: Calculator,
        badge: 'Fresh Module',
        badgeClass: 'badge-blue',
        title: '50-30-20 Budget Allocation Tool',
        desc: 'Smartly distributes monthly allowance across essential needs, personal wants, and savings using flexible budgeting presets.',
        path: '/50-30-20-rule'
      },
      {
        icon: Target,
        badge: 'Goal Planner',
        badgeClass: 'badge-teal',
        title: 'Savings Target Calculator',
        desc: 'Breaks down your savings target into achievable daily and monthly milestones with an interactive progress tracker.',
        path: '/savings-goals'
      },
      {
        icon: Wallet,
        badge: 'Expense Tracker',
        badgeClass: 'badge-rose',
        title: 'Personal Spending Planner',
        desc: 'A lightweight expense workspace for recording purchases, assigning categories, monitoring limits, and tracking available funds.',
        path: '/expense-planner'
      }
    ]
  },
  {
    title: 'Gamified Decision Making',
    icon: Gamepad2,
    modules: [
      {
        icon: Gamepad2,
        badge: 'Interactive Challenge',
        badgeClass: 'badge-purple',
        title: 'Needs vs Wants Challenge',
        desc: 'Test your financial judgment through realistic student spending situations, instant feedback, streaks, and achievement badges.',
        path: '/needs-wants'
      },
      {
        icon: ShieldAlert,
        badge: 'Financial Safety',
        badgeClass: 'badge-orange',
        title: 'Student Money Pitfalls',
        desc: 'Explore practical guides to avoid subscription traps, BNPL risks, unnecessary spending, and weak emergency-fund habits.',
        path: '/money-mistakes'
      }
    ]
  },
  {
    title: 'Visual Knowledge & Communication',
    icon: Eye,
    modules: [
      {
        icon: Image,
        badge: 'Visual Insights',
        badgeClass: 'badge-teal',
        title: 'Financial Insights Gallery',
        desc: 'Explore visual explainers covering compound growth, cash-flow basics, spending behavior, and smart credit decisions.',
        path: '/infographics'
      },
      {
        icon: Bot,
        badge: 'Smart Assistant',
        badgeClass: 'badge-pink',
        title: 'BudgetBae AI Money Guide',
        desc: 'An interactive AI-style assistant that delivers quick answers and practical financial guidance through keyword-based conversations.',
        path: '/chatbot'
      },
      {
        icon: Star,
        badge: 'User Reviews',
        badgeClass: 'badge-green',
        title: 'Feedback & Review Center',
        desc: 'Collect and showcase user feedback through validated submissions, star-based ratings, instant notifications, and community reviews.',
        path: '/feedback'
      }
    ]
  }
];

const SitemapPage = () => {
  return (
    <section className="sitemap-section-wrap">
      <div className="container">
        <div className="sitemap-page-header">
          <span>
            <Sparkles size={14} className="icon-inline" /> Structured App Architecture
          </span>

          <h1 className="sitemap-title">Interactive SPA Sitemap</h1>

          <p className="sitemap-subtitle">
            A comprehensive architectural index of all modules built with BudgetBasics for the Aptech
            TechViz competition. Click any module card to smoothly navigate to its interface.
          </p>
        </div>

        {sections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div className="sitemap-group" key={section.title}>
              <h3 className="sitemap-group-title">
                <SectionIcon size={18} className="icon-inline text-primary" /> {section.title}
              </h3>

              <div className="module-grid">
                {section.modules.map((mod) => {
                  const ModIcon = mod.icon;

                  return (
                    <Link to={mod.path} className="module-card" key={mod.path}>
                      <div className="module-card-top">
                        <div className="module-icon-wrap">
                          <ModIcon size={20} />
                        </div>

                        <span className={`module-badge ${mod.badgeClass}`}>
                          {mod.badge}
                        </span>
                      </div>

                      <h4 className="module-title">{mod.title}</h4>

                      <p className="module-desc">{mod.desc}</p>

                      <span className="open-module-link">
                        Explore Module <ArrowRight size={14} className="icon-inline" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SitemapPage;