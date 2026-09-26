import React, { useState } from 'react';
import {
  ShoppingBag,
  CreditCard,
  Coffee,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  FolderPlus
} from 'lucide-react';
import budgetData from '../data/budgetData.json';
import PageHeroBanner from './PageHeroBanner';
import mistakesBannerImg from '../assets/banner_mistakes.jpg';

const MoneyMistakesModule = ({ searchQuery }) => {
  const [expandedIds, setExpandedIds] = useState(['impulse']);

  const getMistakeIcon = (iconName) => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag size={24} className="text-warning" />;
      case 'CreditCard':
        return <CreditCard size={24} className="text-warning" />;
      case 'Coffee':
        return <Coffee size={24} className="text-warning" />;
      case 'DollarSign':
        return <DollarSign size={24} className="text-warning" />;
      case 'Clock':
        return <Clock size={24} className="text-warning" />;
      default:
        return <ShoppingBag size={24} className="text-warning" />;
    }
  };

  const toggleCard = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const expandAll = () => {
    setExpandedIds(budgetData.moneyMistakesList.map((m) => m.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const filteredMistakes = budgetData.moneyMistakesList.filter((m) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    return (
      m.title.toLowerCase().includes(query) ||
      m.studentScenario.toLowerCase().includes(query) ||
      m.correctiveAction.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <PageHeroBanner
        title="Money Mistakes & Pitfalls"
        subtitle="Avoid impulse purchases, forgotten subscriptions, and late fees with practical corrective guidelines."
        badge="Pitfall Awareness"
        bgImage={mistakesBannerImg}
      />

      <section id="mistakes" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Common Student Money Mistakes & Prevention
            </h2>

            <p className="section-description">
              Recognizing spending traps before they happen is the secret to avoiding money stress. Click on any mistake card to reveal the student scenario and solution!
            </p>
          </div>

          <div className="accordion-controls">
            <button className="btn btn-outline" onClick={expandAll}>
              <FolderOpen size={16} className="icon-inline" /> Expand All Cards
            </button>

            <button className="btn btn-outline" onClick={collapseAll}>
              <FolderPlus size={16} className="icon-inline" /> Collapse All Cards
            </button>
          </div>

          <div className="accordion-container">
            {filteredMistakes.length > 0 ? (
              filteredMistakes.map((mistake) => {
                const isExpanded = expandedIds.includes(mistake.id);

                return (
                  <div
                    key={mistake.id}
                    className={`accordion-card border-only ${
                      isExpanded ? 'is-open' : ''
                    }`}
                  >
                    <div
                      className="accordion-header"
                      onClick={() => toggleCard(mistake.id)}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleCard(mistake.id);
                        }
                      }}
                    >
                      <div className="accordion-title-box">
                        <span className="mistake-icon">
                          {getMistakeIcon(mistake.iconName)}
                        </span>

                        <h3 className="mistake-title">{mistake.title}</h3>

                        <span className="mistake-category-badge">
                          {mistake.category}
                        </span>
                      </div>

                      <span className="accordion-toggle-icon">
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="accordion-body">
                        <div className="scenario-box">
                          <h4>Realistic Student Scenario:</h4>
                          <p>{mistake.studentScenario}</p>

                          <p className="impact-text">
                            <strong>Financial Impact:</strong> {mistake.impact}
                          </p>
                        </div>

                        <div className="action-box">
                          <h4>Practical Corrective Action:</h4>
                          <p>{mistake.correctiveAction}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="no-results-box">
                <p>
                  No money mistakes found matching your search keyword.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MoneyMistakesModule;