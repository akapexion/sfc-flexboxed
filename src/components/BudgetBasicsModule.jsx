import React, { useState } from 'react';
import { Wallet, Home, TrendingUp, Scale, PiggyBank, HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import budgetData from '../data/budgetData.json';
import PageHeroBanner from './PageHeroBanner';
import basicsBannerImg from '../assets/banner_basics.jpg';

const BudgetBasicsModule = ({ searchQuery, selectedCategory }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const getConceptIcon = (iconName) => {
    switch (iconName) {
      case 'Wallet': return <Wallet size={28} className="text-primary" />;
      case 'Home': return <Home size={28} className="text-primary" />;
      case 'TrendingUp': return <TrendingUp size={28} className="text-primary" />;
      case 'Scale': return <Scale size={28} className="text-primary" />;
      case 'PiggyBank': return <PiggyBank size={28} className="text-primary" />;
      default: return <Wallet size={28} className="text-primary" />;
    }
  };

  const filteredConcepts = budgetData.basicConcepts.filter((concept) => {
    const matchesSearch =
      !searchQuery ||
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.example.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      selectedCategory === 'Budgeting' ||
      concept.title.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    budgetData.quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <>
      <PageHeroBanner
        title="Budgeting Basics & Fundamentals"
        subtitle="Master income streams, fixed vs variable expenses, and student budget structures with practical guides and interactive quizzes."
        badge="Core Literacy"
        bgImage={basicsBannerImg}
      />

      <section id="basics" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Key Budgeting Concepts</h2>
            <p className="section-description">
              Understanding money flow is the first step toward financial freedom. Learn how income, fixed expenses, variable expenses, and savings interact in a student budget.
            </p>
          </div>

          <div className="concepts-grid">
            {filteredConcepts.length > 0 ? (
              filteredConcepts.map((concept) => (
                <div key={concept.id} className="concept-card border-only">
                  <div className="concept-icon-header">
                    <span className="concept-icon">{getConceptIcon(concept.iconName)}</span>
                    <h3 className="concept-title">{concept.title}</h3>
                  </div>
                  <p className="concept-description">{concept.description}</p>
                  <div className="concept-example">
                    <strong>Real Example:</strong> {concept.example}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-box">
                <p>No budgeting concepts match your search criteria. Try resetting filters.</p>
              </div>
            )}
          </div>

          <div className="sample-budget-container border-only">
            <div className="card-header">
              <h3>📊 Sample Student Monthly Budget (Rs. 15,000 Allowance Example)</h3>
              <p className="card-subtitle">
                Here is a practical breakdown of how a college student distributes a Rs. 15,000 monthly allowance.
              </p>
            </div>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Monthly Amount</th>
                    <th>% of Income</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.sampleStudentBudget.items.map((item, index) => {
                    const rupeeAmount = item.amount * 30; // Scale to realistic Rupees
                    const percentage = ((item.amount / budgetData.sampleStudentBudget.totalIncome) * 100).toFixed(1);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <span className={`badge category-badge ${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.category}
                          </span>
                        </td>
                        <td>{item.description}</td>
                        <td className="font-semibold">Rs. {rupeeAmount.toLocaleString('en-PK')}</td>
                        <td>{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right font-bold">Total Budget Allocated:</td>
                    <td className="font-bold text-success">Rs. 15,000.00</td>
                    <td className="font-bold">100.0%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="quiz-container border-only">
            <div className="quiz-header">
              <h3><HelpCircle size={22} className="icon-inline text-primary" /> Interactive Knowledge Check</h3>
              <p>Test your understanding of student budgeting basics!</p>
            </div>

            <div className="quiz-questions-list">
              {budgetData.quizQuestions.map((q, qIndex) => {
                const isSelected = userAnswers[q.id] !== undefined;
                const selectedOption = userAnswers[q.id];
                const isCorrect = selectedOption === q.correctIndex;

                return (
                  <div key={q.id} className="quiz-question-box border-only">
                    <h4 className="question-text">
                      Q{qIndex + 1}: {q.question}
                    </h4>
                    <div className="options-list">
                      {q.options.map((option, optIndex) => {
                        let optionClass = 'quiz-option-btn';
                        if (showResults || isSelected) {
                          if (optIndex === q.correctIndex) {
                            optionClass += ' correct';
                          } else if (selectedOption === optIndex) {
                            optionClass += ' incorrect';
                          }
                        } else if (selectedOption === optIndex) {
                          optionClass += ' selected';
                        }

                        return (
                          <button
                            key={optIndex}
                            className={optionClass}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                          >
                            <span className="option-letter">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {(showResults || isSelected) && (
                      <div className={`quiz-feedback ${isCorrect ? 'correct-msg' : 'incorrect-msg'}`}>
                        {isCorrect ? <CheckCircle size={16} className="icon-inline" /> : <XCircle size={16} className="icon-inline" />}
                        {' '}{q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="quiz-actions">
              {!showResults ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                >
                  Check My Answers
                </button>
              ) : (
                <div className="quiz-result-summary">
                  <h4>
                    🎯 Your Score: {calculateScore()} / {budgetData.quizQuestions.length}
                  </h4>
                  <p>
                    {calculateScore() === budgetData.quizQuestions.length
                      ? '🎉 Excellent! You have mastered the budget basics!'
                      : 'Good attempt! Review the explanations above to solidify your knowledge.'}
                  </p>
                  <button className="btn btn-secondary" onClick={resetQuiz}>
                    <RotateCcw size={16} className="icon-inline" /> Try Quiz Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BudgetBasicsModule;