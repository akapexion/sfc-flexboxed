import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, setSelectedCategory } from './redux/budgetSlice';
import { Toaster } from 'react-hot-toast';
import {
  BookOpen,
  Scale,
  Calculator,
  Target,
  Receipt,
  AlertTriangle,
  BarChart2,
  Bot,
  Info,
  Mail,
  MessageSquare,
  Map,
  ArrowRight,
  RotateCw
} from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import SearchFilterBar from './components/SearchFilterBar';
import BudgetBasicsModule from './components/BudgetBasicsModule';
import NeedsVsWantsModule from './components/NeedsVsWantsModule';
import Budget503020Module from './components/Budget503020Module';
import SavingsGoalsModule from './components/SavingsGoalsModule';
import ExpensePlannerModule from './components/ExpensePlannerModule';
import MoneyMistakesModule from './components/MoneyMistakesModule';
import InfographicsGallery from './components/InfographicsGallery';
import AIChatbotModule from './components/AIChatbotModule';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FeedbackPage from './components/FeedbackPage';
import SitemapPage from './components/SitemapPage';
import FloatingWidgets from './components/FloatingWidgets';
import Footer from './components/Footer';
import './App.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.budget.searchQuery);
  const selectedCategory = useSelector((state) => state.budget.selectedCategory);
  const sortBy = useSelector((state) => state.budget.sortBy);

  const modulesList = [
    {
      id: 'basics',
      title: 'Budgeting Basics',
      category: 'Budgeting',
      icon: <BookOpen size={34} className="text-primary" />,
      desc: 'Master income, fixed vs variable expenses, and student budget structures.',
      highlights: ['Income vs Expenses', 'Sample Student Budget', 'Interactive Quiz'],
      path: '/basics',
      btnText: 'Learn Basics'
    },
    {
      id: 'needs-wants',
      title: 'Needs vs Wants',
      category: 'Needs',
      icon: <Scale size={34} className="text-primary" />,
      desc: 'Classify spending items with our interactive sorting game & decision tree.',
      highlights: ['Sorting Game', 'Instant Feedback', '4-Step Decision Tree'],
      path: '/needs-wants',
      btnText: 'Play Classifier'
    },
    {
      id: '50-30-20-rule',
      title: '50-30-20 Rule',
      category: 'Budgeting',
      icon: <Calculator size={34} className="text-primary" />,
      desc: 'Calculate your suggested split of 50% Needs, 30% Wants, and 20% Savings.',
      highlights: ['Custom Presets', 'Ratio Adjuster', 'Stacked Visual Bar'],
      path: '/50-30-20-rule',
      btnText: 'Use Calculator'
    },
    {
      id: 'savings-goals',
      title: 'Savings Goals',
      category: 'Goals',
      icon: <Target size={34} className="text-primary" />,
      desc: 'Plan target goals in Pakistani Rupees (Rs.), calculate timeline months, and track progress.',
      highlights: ['Goal Calculator', 'Timeline Estimates', 'Encouragement Tips'],
      path: '/savings-goals',
      btnText: 'Plan Goals'
    },
    {
      id: 'expense-planner',
      title: 'Expense Planner',
      category: 'Expenses',
      icon: <Receipt size={34} className="text-primary" />,
      desc: 'Log daily purchases in Pakistani Rupees (Rs.), edit/delete entries, and track remaining balance.',
      highlights: ['PKR Tracking (Rs.)', 'Real-time Balance', 'Log Table'],
      path: '/expense-planner',
      btnText: 'Track Expenses'
    },
    {
      id: 'money-mistakes',
      title: 'Money Mistakes',
      category: 'Mistakes',
      icon: <AlertTriangle size={34} className="text-warning" />,
      desc: 'Avoid impulse buying, forgotten subscriptions, and late fee traps.',
      highlights: ['Impulse Traps', 'Forgotten Subscriptions', '48-Hour Rule'],
      path: '/money-mistakes',
      btnText: 'View Pitfalls'
    },
    {
      id: 'infographics',
      title: 'Infographics Gallery',
      category: 'Infographics',
      icon: <BarChart2 size={34} className="text-primary" />,
      desc: 'Visual breakdown guides and downloadable-style summary graphics.',
      highlights: ['Category Filters', 'High-Res Modals', 'Visual Summaries'],
      path: '/infographics',
      btnText: 'Explore Gallery'
    },
    {
      id: 'chatbot',
      title: 'AI Q&A Chatbot',
      category: 'Budgeting',
      icon: <Bot size={34} className="text-primary" />,
      desc: 'Ask financial queries or click suggested prompts for instant assistance.',
      highlights: ['Instant Answers', 'Prompt Chips', '24/7 AI Guide'],
      path: '/chatbot',
      btnText: 'Chat with AI'
    },
    {
      id: 'about',
      title: 'About BudgetBasics',
      category: 'Budgeting',
      icon: <Info size={34} className="text-primary" />,
      desc: 'Learn about our mission, NextGen BudgetBee theme, and student FAQs.',
      highlights: ['Project Mission', 'Interactive FAQs', 'Target Audience'],
      path: '/about',
      btnText: 'About Us'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      category: 'Budgeting',
      icon: <Mail size={34} className="text-primary" />,
      desc: 'Get in touch with our educational support team and campus helpline.',
      highlights: ['Helpline Number', 'Direct Message Form', 'Email Support'],
      path: '/contact',
      btnText: 'Contact Us'
    },
    {
      id: 'feedback',
      title: 'Student Feedback',
      category: 'Budgeting',
      icon: <MessageSquare size={34} className="text-primary" />,
      desc: 'Leave validated feedback, rate our tools, or review community input.',
      highlights: ['1-5 Star Ratings', 'Student Reviews', 'Community Feedback'],
      path: '/feedback',
      btnText: 'Give Feedback'
    },
    {
      id: 'sitemap',
      title: 'Website Sitemap',
      category: 'Budgeting',
      icon: <Map size={34} className="text-primary" />,
      desc: 'View the complete information architecture and navigation map of BudgetBasics.',
      highlights: ['Full Architecture', 'Direct Nav Links', 'Tree View'],
      path: '/sitemap',
      btnText: 'View Sitemap'
    }
  ];

  // Filter modules according to search query and selected category tag
  let filteredModules = modulesList.filter((mod) => {
    const matchesSearch =
      !searchQuery ||
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      mod.category.toLowerCase() === selectedCategory.toLowerCase() ||
      mod.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      mod.desc.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Sort modules
  if (sortBy === 'a-z') {
    filteredModules.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'topic') {
    filteredModules.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <>
      <HeroSlider />
      <SearchFilterBar />

      {(searchQuery || selectedCategory !== 'All' || sortBy !== 'default') && (
        <div className="active-filter-indicator">
          <div className="container">
            <span>
              Filtering view for: <strong>"{searchQuery || selectedCategory}"</strong>{' '}
              {sortBy !== 'default' ? `(Sorted by ${sortBy})` : ''}
            </span>

            <button
              className="btn-inline-reset"
              onClick={() => dispatch(resetFilters())}
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      <section className="module-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Learning Modules & Tools</h2>
            <p className="section-description">
              Select any topic filter above or search to explore matching financial learning modules.
            </p>
          </div>

          {filteredModules.length > 0 ? (
            <div className="modules-cards-grid">
              {filteredModules.map((mod) => (
                <div key={mod.id} className="module-flip-card">
                  <div className="module-flip-inner">

                    {/* Front Side */}
                    <div className="module-flip-front">
                      <div className="card-top-content">
                        <div className="card-nav-icon">{mod.icon}</div>
                        <h3 className="card-title">{mod.title}</h3>
                        <p className="card-text">{mod.desc}</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="module-flip-back">
                      <div className="card-back-content">
                        <h4 className="card-back-title">{mod.title} Features</h4>
                        <ul className="card-highlights-list">
                          {mod.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>

                      <Link to={mod.path} className="btn btn-primary btn-full">
                        {mod.btnText} <ArrowRight size={16} />
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="no-results-box"
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <h3>No Modules Found</h3>
              <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px 0' }}>
                No learning modules match your current filter or search criteria.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => dispatch(resetFilters())}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Budget503020Module />
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.budget.darkMode);
  const searchQuery = useSelector((state) => state.budget.searchQuery);
  const selectedCategory = useSelector((state) => state.budget.selectedCategory);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('budgetbasics_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('budgetbasics_theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="app-main-wrapper">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/basics"
              element={
                <BudgetBasicsModule
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              }
            />
            <Route path="/needs-wants" element={<NeedsVsWantsModule />} />
            <Route path="/50-30-20-rule" element={<Budget503020Module />} />
            <Route path="/savings-goals" element={<SavingsGoalsModule />} />
            <Route path="/expense-planner" element={<ExpensePlannerModule />} />
            <Route
              path="/money-mistakes"
              element={<MoneyMistakesModule searchQuery={searchQuery} />}
            />
            <Route
              path="/infographics"
              element={
                <InfographicsGallery
                  selectedCategory={selectedCategory}
                  setSelectedCategory={(cat) => dispatch(setSelectedCategory(cat))}
                />
              }
            />
            <Route path="/chatbot" element={<AIChatbotModule />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWidgets />
      </div>
    </Router>
  );
};

export default App;