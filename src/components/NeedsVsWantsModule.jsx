import React, { useState } from 'react';
import {
  BookOpen,
  Gamepad2,
  Bus,
  Coffee,
  Utensils,
  Tv,
  Pill,
  ShoppingBag,
  Shield,
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import budgetData from '../data/budgetData.json';
import PageHeroBanner from './PageHeroBanner';
import needsWantsBannerImg from '../assets/banner_needs_wants.jpg';

const NeedsVsWantsModule = () => {
  const [userChoices, setUserChoices] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  const getItemIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen size={24} className="text-primary" />;
      case 'Gamepad2':
        return <Gamepad2 size={24} className="text-primary" />;
      case 'Bus':
        return <Bus size={24} className="text-primary" />;
      case 'Coffee':
        return <Coffee size={24} className="text-primary" />;
      case 'Utensils':
        return <Utensils size={24} className="text-primary" />;
      case 'Tv':
        return <Tv size={24} className="text-primary" />;
      case 'Pill':
        return <Pill size={24} className="text-primary" />;
      case 'ShoppingBag':
        return <ShoppingBag size={24} className="text-primary" />;
      default:
        return <ShoppingBag size={24} className="text-primary" />;
    }
  };

  const handleClassify = (itemId, choice) => {
    setUserChoices((prev) => ({
      ...prev,
      [itemId]: choice
    }));
  };

  const resetGame = () => {
    setUserChoices({});
  };

  const totalItems = budgetData.classificationItems.length;
  const classifiedCount = Object.keys(userChoices).length;

  const correctCount = Object.entries(userChoices).reduce(
    (acc, [id, choice]) => {
      const item = budgetData.classificationItems.find(
        (i) => i.id === parseInt(id, 10)
      );

      return item && item.category === choice ? acc + 1 : acc;
    },
    0
  );

  return (
    <>
      <PageHeroBanner
        title="Needs vs. Wants Classifier"
        subtitle="Separate mandatory living expenses from optional spending items with our interactive sorting game and decision matrix."
        badge="Smart Sorting"
        bgImage={needsWantsBannerImg}
      />

      <section id="needs-wants" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Needs vs. Wants Sorting Guide</h2>
            <p className="section-description">
              A key budgeting habit is separating essential needs from optional wants. Test your judgment with our interactive sorting tool below!
            </p>
          </div>

          <div className="classifier-card border-only">
            <div className="classifier-header">
              <h3>Interactive Item Classification Game</h3>
              <p>
                Classify each item as either a <strong>Need</strong> or a{' '}
                <strong>Want</strong> and get instant feedback!
              </p>

              <div className="game-progress">
                <span>
                  Progress: {classifiedCount} / {totalItems} classified
                </span>

                {classifiedCount === totalItems && (
                  <span className="score-pill">
                    Result: {correctCount} / {totalItems} Correct!
                  </span>
                )}
              </div>
            </div>

            <div className="items-grid">
              {budgetData.classificationItems.map((item) => {
                const userChoice = userChoices[item.id];
                const isClassified = userChoice !== undefined;
                const isCorrect = userChoice === item.category;

                return (
                  <div
                    key={item.id}
                    className={`item-card border-only ${
                      isClassified
                        ? isCorrect
                          ? 'classified-correct'
                          : 'classified-wrong'
                        : ''
                    }`}
                  >
                    <div className="item-icon-title">
                      <span className="item-emoji">
                        {getItemIcon(item.iconName)}
                      </span>
                      <h4 className="item-title">{item.name}</h4>
                    </div>

                    <div className="item-actions">
                      <button
                        className={`btn-choice btn-need ${
                          userChoice === 'Need' ? 'selected' : ''
                        }`}
                        onClick={() => handleClassify(item.id, 'Need')}
                      >
                        <Shield size={14} className="icon-inline" /> Need
                      </button>

                      <button
                        className={`btn-choice btn-want ${
                          userChoice === 'Want' ? 'selected' : ''
                        }`}
                        onClick={() => handleClassify(item.id, 'Want')}
                      >
                        <Sparkles size={14} className="icon-inline" /> Want
                      </button>
                    </div>

                    {isClassified && (
                      <div
                        className={`choice-feedback ${
                          isCorrect
                            ? 'feedback-success'
                            : 'feedback-error'
                        }`}
                      >
                        <div className="feedback-badge">
                          {isCorrect ? (
                            <CheckCircle
                              size={14}
                              className="icon-inline"
                            />
                          ) : (
                            <XCircle
                              size={14}
                              className="icon-inline"
                            />
                          )}

                          {isCorrect
                            ? ' Correct!'
                            : ` Incorrect (It is a ${item.category})`}
                        </div>

                        <p className="feedback-text">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {classifiedCount > 0 && (
              <div className="classifier-footer">
                <button
                  className="btn btn-outline"
                  onClick={resetGame}
                >
                  <RotateCcw size={16} className="icon-inline" /> Reset
                  Classification Game
                </button>
              </div>
            )}
          </div>

          <div className="decision-guide-box border-only">
            <div className="guide-header">
              <h3>Visual Decision Guide: "Should I Buy This?"</h3>
              <p>
                Follow this 4-step mental guide before making any impulse
                purchase.
              </p>
            </div>

            <div className="decision-steps">
              <div
                className={`step-card border-only ${
                  activeStep === 1 ? 'active-step' : ''
                }`}
                onClick={() => setActiveStep(1)}
              >
                <div className="step-number">Step 1</div>
                <h4>
                  Is it essential for survival, health, or studies?
                </h4>
                <p>YES : It's a Need. Prioritize it!</p>
                <p>NO : Proceed to Step 2.</p>
              </div>

              <div
                className={`step-card border-only ${
                  activeStep === 2 ? 'active-step' : ''
                }`}
                onClick={() => setActiveStep(2)}
              >
                <div className="step-number">Step 2</div>
                <h4>
                  Do I already own something that serves this purpose?
                </h4>
                <p>YES : Skip purchase & save money.</p>
                <p>NO : Proceed to Step 3.</p>
              </div>

              <div
                className={`step-card border-only ${
                  activeStep === 3 ? 'active-step' : ''
                }`}
                onClick={() => setActiveStep(3)}
              >
                <div className="step-number">Step 3</div>
                <h4>Can I wait 48 hours to think about it?</h4>
                <p>YES : Apply the 48-Hour delay rule.</p>
                <p>NO : Ask if it fits your 30% Want budget.</p>
              </div>

              <div
                className={`step-card border-only ${
                  activeStep === 4 ? 'active-step' : ''
                }`}
                onClick={() => setActiveStep(4)}
              >
                <div className="step-number">Step 4</div>
                <h4>
                  Does it fit within your 30% Wants budget limit?
                </h4>
                <p>YES : Enjoy responsibly without guilt.</p>
                <p>NO : Delay until next month's allowance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NeedsVsWantsModule;