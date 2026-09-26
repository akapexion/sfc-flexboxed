import React, { useState } from 'react';
import { Calculator, Shield, Sparkles, PiggyBank, PieChart, AlertCircle, Settings } from 'lucide-react';
import PageHeroBanner from './PageHeroBanner';
import banner503020Img from '../assets/banner_503020.jpg';

const Budget503020Module = () => {
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [customRatio, setCustomRatio] = useState({ needs: 50, wants: 30, savings: 20 });

  const incomeValue = parseFloat(monthlyIncomeInput);
  const isValid = !isNaN(incomeValue) && incomeValue > 0;

  const needsAmount = isValid ? (incomeValue * (customRatio.needs / 100)) : 0;
  const wantsAmount = isValid ? (incomeValue * (customRatio.wants / 100)) : 0;
  const savingsAmount = isValid ? (incomeValue * (customRatio.savings / 100)) : 0;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMonthlyIncomeInput(value);

    if (value.trim() === '') {
      setErrorMessage('Income amount cannot be blank.');
    } else if (isNaN(value) || Number(value) <= 0) {
      setErrorMessage('Please enter a valid positive number greater than 0.');
    } else {
      setErrorMessage('');
    }
  };

  const setQuickIncome = (amount) => {
    setMonthlyIncomeInput(amount.toString());
    setErrorMessage('');
  };

  const formatPKR = (val) => {
    return 'Rs. ' + Number(val).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
    {location.pathname == "/50-30-20-rule" ?
    (
      <PageHeroBanner
        title="50-30-20 Rule Budget Calculator"
        subtitle="Divide your monthly allowance into 50% Needs, 30% Wants, and 20% Savings in Pakistani Rupees (Rs.)."
        badge="Calculator Tool"
        bgImage={banner503020Img}
      />
    )  
    :
    ""
  }
      

      <section id="budget-503020" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The 50-30-20 Rule Budget Calculator</h2>
            <p className="section-description">
              The 50 30 20 rule is a world-renowned formula to easily balance your finances: 50% for Needs, 30% for Wants, and 20% for Savings.
            </p>
          </div>

          <div className="calc-layout-grid">
            <div className="calc-card border-only">
              <h3>Calculate Your Monthly Split</h3>
              <p className="calc-subtitle">Enter your total monthly allowance or earnings below in Pakistani Rupees (Rs.):</p>

              <div className="form-group">
                <label htmlFor="income-input" className="form-label">
                  Monthly Income / Allowance (Rs.):
                </label>
                <div className="input-prefix-wrapper">
                  <input
                    id="income-input"
                    type="number"
                    min="1"
                    step="100"
                    className={`form-input ${errorMessage ? 'input-error' : ''}`}
                    value={monthlyIncomeInput}
                    onChange={handleInputChange}
                  />
                </div>

                {errorMessage && (
                  <p className="error-text">
                    <AlertCircle size={14} className="icon-inline" /> {errorMessage}
                  </p>
                )}
              </div>

              <div className="quick-presets">
                <span className="preset-label">Quick Presets:</span>
                <button className="preset-btn" onClick={() => setQuickIncome(8000)}>Rs. 8,000</button>
                <button className="preset-btn" onClick={() => setQuickIncome(15000)}>Rs. 15,000</button>
                <button className="preset-btn" onClick={() => setQuickIncome(25000)}>Rs. 25,000</button>
                <button className="preset-btn" onClick={() => setQuickIncome(40000)}>Rs. 40,000</button>
              </div>

              <div className="ratio-adjuster">
                <h4><Settings size={16} className="icon-inline" /> Adjustable Split Guidelines:</h4>
                <p className="small-text">Default ratio is 50 / 30 / 20. Adjust if you have higher savings goals!</p>

                <div className="ratio-preset-buttons">
                  <button
                    className={`ratio-btn ${customRatio.needs === 50 ? 'active' : ''}`}
                    onClick={() => setCustomRatio({ needs: 50, wants: 30, savings: 20 })}
                  >
                    Standard (50/30/20)
                  </button>
                  <button
                    className={`ratio-btn ${customRatio.savings === 30 ? 'active' : ''}`}
                    onClick={() => setCustomRatio({ needs: 45, wants: 25, savings: 30 })}
                  >
                    Super Saver (45/25/30)
                  </button>
                </div>
              </div>
            </div>

            <div className="calc-card results-card border-only">
              <h3>Budget Allocation Breakdown</h3>

              {isValid ? (
                <div className="results-content">
                  <div className="total-display-box">
                    <span className="total-label">Total Monthly Budget:</span>
                    <span className="total-value">{formatPKR(incomeValue)}</span>
                  </div>

                  <div className="allocation-cards-list">
                    <div className="alloc-card needs-border border-only">
                      <div className="alloc-header">
                        <span className="alloc-title">Needs ({customRatio.needs}%)</span>
                        <span className="alloc-amount">{formatPKR(needsAmount)}</span>
                      </div>
                      <p className="alloc-desc">Rent, meals, transportation, course textbooks, utilities.</p>
                      <div className="progress-bg">
                        <div className="progress-fill needs" style={{ width: `${customRatio.needs}%` }}></div>
                      </div>
                    </div>

                    <div className="alloc-card wants-border border-only">
                      <div className="alloc-header">
                        <span className="alloc-title">Wants ({customRatio.wants}%)</span>
                        <span className="alloc-amount">{formatPKR(wantsAmount)}</span>
                      </div>
                      <p className="alloc-desc">Dining out, snacks, movies, gaming, subscription services.</p>
                      <div className="progress-bg">
                        <div className="progress-fill wants" style={{ width: `${customRatio.wants}%` }}></div>
                      </div>
                    </div>

                    <div className="alloc-card savings-border border-only">
                      <div className="alloc-header">
                        <span className="alloc-title">Savings ({customRatio.savings}%)</span>
                        <span className="alloc-amount">{formatPKR(savingsAmount)}</span>
                      </div>
                      <p className="alloc-desc">Emergency fund, laptop goal, future trip, investment.</p>
                      <div className="progress-bg">
                        <div className="progress-fill savings" style={{ width: `${customRatio.savings}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="visual-chart-box">
                    <h4>Visual Budget Share</h4>
                    <div className="stacked-bar-container">
                      <div className="bar-segment needs" style={{ width: `${customRatio.needs}%` }} title={`Needs: ${formatPKR(needsAmount)}`}>
                        {customRatio.needs}% Needs
                      </div>
                      <div className="bar-segment wants" style={{ width: `${customRatio.wants}%` }} title={`Wants: ${formatPKR(wantsAmount)}`}>
                        {customRatio.wants}% Wants
                      </div>
                      <div className="bar-segment savings" style={{ width: `${customRatio.savings}%` }} title={`Savings: ${formatPKR(savingsAmount)}`}>
                        {customRatio.savings}% Savings
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="placeholder-results">
                  <p>Please enter a valid income amount in the input box to see your calculated budget split.</p>
                </div>
              )}

              <div className="disclaimer-callout">
                <strong>Educational Note:</strong> This calculator provides an estimated guideline for educational purposes only. Depending on your personal living conditions, hostel fees, or location, you can adjust these ratios to suit your needs!
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Budget503020Module;