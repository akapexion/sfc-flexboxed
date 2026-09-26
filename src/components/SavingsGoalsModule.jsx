import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGoal, deleteGoal } from '../redux/budgetSlice';
import { Target, Plus, Trash2, Clock, Sparkles, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeroBanner from './PageHeroBanner';
import savingsBannerImg from '../assets/banner_savings.jpg';

const SavingsGoalsModule = () => {
  const dispatch = useDispatch();
  const savedGoals = useSelector((state) => state.budget.goals);

  const [goalName, setGoalName] = useState('New Laptop Goal');
  const [targetAmount, setTargetAmount] = useState('60000');
  const [currentSavings, setCurrentSavings] = useState('15000');
  const [monthlyContribution, setMonthlyContribution] = useState('5000');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!goalName.trim()) {
      errs.goalName = 'Goal name is required.';
    }

    const targetVal = parseFloat(targetAmount);
    if (isNaN(targetVal) || targetVal <= 0) {
      errs.targetAmount = 'Target amount must be a positive number > 0.';
    }

    const currentVal = parseFloat(currentSavings);
    if (isNaN(currentVal) || currentVal < 0) {
      errs.currentSavings = 'Current savings cannot be negative or invalid.';
    } else if (targetVal && currentVal > targetVal) {
      errs.currentSavings = 'Current savings cannot exceed target amount.';
    }

    const monthlyVal = parseFloat(monthlyContribution);
    if (isNaN(monthlyVal) || monthlyVal <= 0) {
      errs.monthlyContribution = 'Monthly contribution must be a positive number > 0.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const target = parseFloat(targetAmount) || 0;
  const current = parseFloat(currentSavings) || 0;
  const monthly = parseFloat(monthlyContribution) || 0;

  const remaining = Math.max(0, target - current);
  const monthsRequired = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  const formatPKR = (val) => {
    return 'Rs. ' + Number(val).toLocaleString('en-PK');
  };

  const handleSaveGoal = (e) => {
    e.preventDefault();
    if (validate()) {
      const newGoal = {
        id: Date.now(),
        name: goalName.trim(),
        target: target,
        current: current,
        monthly: monthly
      };
      dispatch(addGoal(newGoal));
      toast.success(`Savings goal "${newGoal.name}" added successfully!`);
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  const handleDeleteGoal = (id, name) => {
    dispatch(deleteGoal(id));
    toast.success(`Goal "${name}" removed`);
  };

  const getEncouragingTip = (months) => {
    if (progressPercent >= 100) return 'Goal Reached. Congratulations on your financial discipline!';
    if (months <= 3) return 'You are super close. Just a couple of months of steady saving!';
    if (months <= 6) return 'Great timeline. Cutting out 1 extra cafe visit a week will shave off a month!';
    if (months <= 12) return 'Consistent monthly contributions add up fast. Keep your momentum going!';
    return 'Big goals take patience. Consider boosting your monthly contribution slightly if possible!';
  };

  return (
    <>
      <PageHeroBanner
        title="Savings Goals Planner"
        subtitle="Plan target goals in Pakistani Rupees (Rs.), calculate completion timelines, and track your saving progress step by step."
        badge="Goal Tracking"
        bgImage={savingsBannerImg}
      />

      <section id="savings-goals" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Savings Goals & Target Planner</h2>
            <p className="section-description">
              Whether saving for a new study laptop, emergency fund, or college trip, setting clear goals turns your dreams into achievable milestones.
            </p>
          </div>

          <div className="goals-layout">
            <div className="goal-card-box border-only">
              <h3><Target size={22} className="icon-inline text-primary" /> Calculate & Add New Goal</h3>
              <form onSubmit={handleSaveGoal} noValidate>
                <div className="form-group">
                  <label className="form-label">Goal Title:</label>
                  <input
                    type="text"
                    className={`form-input ${errors.goalName ? 'input-error' : ''}`}
                    placeholder="e.g. Course Laptop, Semester Trip..."
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                  />
                  {errors.goalName && <p className="error-text">{errors.goalName}</p>}
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Target Amount (Rs.):</label>
                    <input
                      type="number"
                      min="1"
                      className={`form-input ${errors.targetAmount ? 'input-error' : ''}`}
                      placeholder="60000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                    />
                    {errors.targetAmount && <p className="error-text">{errors.targetAmount}</p>}
                  </div>

                  <div className="form-group half">
                    <label className="form-label">Current Savings (Rs.):</label>
                    <input
                      type="number"
                      min="0"
                      className={`form-input ${errors.currentSavings ? 'input-error' : ''}`}
                      placeholder="15000"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                    />
                    {errors.currentSavings && <p className="error-text">{errors.currentSavings}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Monthly Savings (Rs.):</label>
                  <input
                    type="number"
                    min="1"
                    className={`form-input ${errors.monthlyContribution ? 'input-error' : ''}`}
                    placeholder="5000"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                  />
                  {errors.monthlyContribution && <p className="error-text">{errors.monthlyContribution}</p>}
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  <Plus size={18} /> Save Goal to My List
                </button>
              </form>

              {Object.keys(errors).length === 0 && target > 0 && (
                <div className="goal-estimate-preview">
                  <h4><Clock size={16} className="icon-inline text-primary" /> Timeline Estimation</h4>
                  <div className="estimate-stats">
                    <div className="stat-box border-only">
                      <span className="stat-label">Remaining Needed</span>
                      <span className="stat-val text-primary">{formatPKR(remaining)}</span>
                    </div>
                    <div className="stat-box border-only">
                      <span className="stat-label">Est. Time to Reach</span>
                      <span className="stat-val text-success">{monthsRequired} Months</span>
                    </div>
                  </div>

                  <div className="goal-progress-group">
                    <div className="progress-label-bar">
                      <span>Progress: {progressPercent}%</span>
                      <span>{formatPKR(current)} of {formatPKR(target)}</span>
                    </div>
                    <div className="progress-bg">
                      <div className="progress-fill savings" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>

                  <div className="encouraging-tip">
                    <Sparkles size={16} className="icon-inline" /> {getEncouragingTip(monthsRequired)}
                  </div>
                </div>
              )}
            </div>

            <div className="saved-goals-box border-only">
              <h3>📋 Saved Student Goals ({savedGoals.length})</h3>
              <p className="subtitle">Track your active savings targets below:</p>

              <div className="goals-cards-list">
                {savedGoals.map((goal) => {
                  const gRemaining = Math.max(0, goal.target - goal.current);
                  const gMonths = goal.monthly > 0 ? Math.ceil(gRemaining / goal.monthly) : 0;
                  const gPercent = Math.min(100, Math.round((goal.current / goal.target) * 100));

                  return (
                    <div key={goal.id} className="goal-card-item border-only">
                      <div className="goal-card-top">
                        <h4 className="goal-item-title"><Target size={16} className="icon-inline text-primary" /> {goal.name}</h4>
                        <button
                          className="btn-icon-delete"
                          onClick={() => handleDeleteGoal(goal.id, goal.name)}
                          title="Delete Goal"
                        >
                          <Trash2 size={16} className="text-danger" />
                        </button>
                      </div>

                      <div className="goal-item-details">
                        <div className="goal-detail-row">
                          <span>Target: <strong>{formatPKR(goal.target)}</strong></span>
                          <span>Saved: <strong className="text-success">{formatPKR(goal.current)}</strong></span>
                          <span>Monthly: <strong>{formatPKR(goal.monthly)}</strong></span>
                        </div>

                        <div className="progress-bg">
                          <div className="progress-fill savings" style={{ width: `${gPercent}%` }}></div>
                        </div>

                        <div className="goal-item-footer">
                          <span>Progress: {gPercent}%</span>
                          <span>
                            {gRemaining === 0
                              ? <CheckCircle size={14} className="icon-inline text-success" />
                              : `~${gMonths} month${gMonths > 1 ? 's' : ''} left`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavingsGoalsModule;