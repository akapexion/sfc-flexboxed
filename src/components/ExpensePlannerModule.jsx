import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllowance, addExpense, updateExpense, deleteExpense, clearAllExpenses } from '../redux/budgetSlice';
import { Plus, Edit3, Trash2, Receipt, Calendar, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeroBanner from './PageHeroBanner';
import expenseBannerImg from '../assets/banner_expense.jpg';

const ExpensePlannerModule = () => {
  const dispatch = useDispatch();
  const allowance = useSelector((state) => state.budget.allowance);
  const expenses = useSelector((state) => state.budget.expenses);

  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const categories = ['Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Miscellaneous'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!description.trim()) {
      setFormError('Please enter an expense description.');
      toast.error('⚠️ Please enter an expense description.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setFormError('Please enter a valid amount greater than 0.');
      toast.error('⚠️ Please enter a valid amount greater than 0.');
      return;
    }

    if (editingId) {
      const updatedItem = {
        id: editingId,
        date: entryDate,
        category,
        description: description.trim(),
        amount: numericAmount
      };

      dispatch(updateExpense(updatedItem));
      toast.success('✏️ Expense entry updated successfully!');
      setEditingId(null);
    } else {
      const newExp = {
        id: Date.now(),
        date: entryDate,
        category,
        description: description.trim(),
        amount: numericAmount
      };

      dispatch(addExpense(newExp));
      toast.success('Expense entry added!');
    }

    setDescription('');
    setAmount('');
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEntryDate(exp.date);
    setCategory(exp.category);
    setDescription(exp.description);
    setAmount(exp.amount.toString());
    setFormError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDescription('');
    setAmount('');
    setFormError('');
  };

  const removeEntry = (id) => {
    dispatch(deleteExpense(id));
    toast.success('🗑️ Expense entry removed');

    if (editingId === id) {
      cancelEdit();
    }
  };

  const handleClearAll = () => {
    dispatch(clearAllExpenses());
    toast.success('🗑️ All expenses cleared');
  };

  const totalPlannedExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const numericAllowance = parseFloat(allowance) || 0;
  const remainingBalance = numericAllowance - totalPlannedExpenses;

  const formatPKR = (val) => {
    return 'Rs. ' + Number(val).toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <>
      <PageHeroBanner
        title="Student Expense Planner"
        subtitle="Track and manage daily student purchases in Pakistani Rupees (Rs.). Monitor remaining allowance balance in real time!"
        badge="Interactive Planner"
        bgImage={expenseBannerImg}
      />

      <section id="expense-planner" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Expense Planner Demonstration</h2>
            <p className="section-description">
              Log daily purchases in Pakistani Rupees (Rs.), edit or delete entries, and watch your balance calculate live.
            </p>
          </div>

          <div className="planner-summary-strip">
            <div className="summary-card">
              <span className="sum-label">Monthly Allowance (Rs.):</span>
              <div className="editable-allowance">
                <span>Rs.</span>
                <input
                  type="number"
                  className="allowance-input"
                  value={allowance}
                  onChange={(e) => dispatch(setAllowance(e.target.value))}
                />
              </div>
            </div>

            <div className="summary-card">
              <span className="sum-label">Total Planned Expenses:</span>
              <span className="sum-value text-danger">
                {formatPKR(totalPlannedExpenses)}
              </span>
            </div>

            <div className="summary-card">
              <span className="sum-label">Remaining Balance:</span>
              <span className={`sum-value ${remainingBalance >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatPKR(remainingBalance)}
              </span>
            </div>
          </div>

          <div className="planner-grid">
            <div className="planner-form-card border-only">
              <h3>
                {editingId ? (
                  <Edit3 size={20} className="icon-inline" />
                ) : (
                  <Plus size={20} className="icon-inline" />
                )}{' '}
                {editingId ? 'Edit Expense Entry' : 'Add New Expense'}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Date:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category:</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Lunch at canteen, Metro pass..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Amount (Rs.):</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    className="form-input"
                    placeholder="e.g. 250"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {formError && (
                  <p className="error-text">
                    <AlertCircle size={14} className="icon-inline" /> {formError}
                  </p>
                )}

                <div className="form-action-btns">
                  <button type="submit" className="btn btn-primary btn-full">
                    {editingId ? <Edit3 size={16} /> : <Plus size={16} />}{' '}
                    {editingId ? 'Save Changes' : 'Add Expense Entry'}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-outline btn-full"
                      onClick={cancelEdit}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="planner-table-card border-only">
              <div className="table-header-flex">
                <h3>📋 Logged Expenses ({expenses.length})</h3>

                {expenses.length > 0 && (
                  <button className="btn-clear-all" onClick={handleClearAll}>
                    <Trash2 size={14} className="icon-inline" /> Clear All
                  </button>
                )}
              </div>

              {expenses.length > 0 ? (
                <div className="table-responsive">
                  <table className="custom-table planner-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {expenses.map((exp) => (
                        <tr
                          key={exp.id}
                          className={editingId === exp.id ? 'highlight-row' : ''}
                        >
                          <td>{exp.date}</td>

                          <td>
                            <span className={`category-tag cat-${exp.category.toLowerCase()}`}>
                              {exp.category}
                            </span>
                          </td>

                          <td>{exp.description}</td>

                          <td className="font-semibold">
                            {formatPKR(exp.amount)}
                          </td>

                          <td>
                            <div className="table-actions">
                              <button
                                className="btn-action edit"
                                onClick={() => startEdit(exp)}
                                title="Edit Entry"
                              >
                                <Edit3 size={12} className="icon-inline" /> Edit
                              </button>

                              <button
                                className="btn-action delete"
                                onClick={() => removeEntry(exp.id)}
                                title="Delete Entry"
                              >
                                <Trash2 size={12} className="icon-inline" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colSpan="3" className="font-bold text-right">
                          Total Expenses:
                        </td>

                        <td className="font-bold text-danger">
                          {formatPKR(totalPlannedExpenses)}
                        </td>

                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="empty-expenses-state">
                  <p>
                    🛒 No expenses added yet. Use the form on the left to log your daily purchases in Pakistani Rupees (Rs.)!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpensePlannerModule;