import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { BarChart2, ZoomIn, X, Image as ImageIcon } from 'lucide-react';

import budgetData from '../data/budgetData.json';

import PageHeroBanner from './PageHeroBanner';

import bannerImg from '../assets/banner_infographics.jpg';

import img503020 from '../assets/infographic_503020.jpg';

import imgMatrix from '../assets/infographic_matrix.jpg';

import imgCycle from '../assets/infographic_cycle.jpg';

import imgChallenge from '../assets/infographic_challenge.jpg';

const infographicImages = {
  1: img503020,
  2: imgMatrix,
  3: imgCycle,
  4: imgChallenge
};

const InfographicsGallery = ({ selectedCategory, setSelectedCategory }) => {
  const [activeModalItem, setActiveModalItem] = useState(null);

  const searchQuery = useSelector((state) => state.budget.searchQuery);

  const filteredInfographics = budgetData.infographicsData.filter((item) => {
    // Category filter
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query filter
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.some((d) =>
        d.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHeroBanner
        title="Infographics Gallery"
        subtitle="Visual breakdown guides and downloadable-style summary infographics making complex financial concepts crystal clear."
        badge="Visual Learning"
        bgImage={bannerImg}
      />

      <section id="infographics" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Visual Infographics</h2>
            <p className="section-description">
              Filter by category below or search for specific budgeting topics. Click any graphic to open full view!
            </p>
          </div>

          <div className="gallery-filter-tabs">
            {['All', 'Budgeting', 'Savings', 'Spending'].map((cat) => (
              <button
                key={cat}
                className={`gallery-tab-btn ${
                  selectedCategory === cat ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredInfographics.length > 0 ? (
            <div className="gallery-grid">
              {filteredInfographics.map((item) => {
                const cardImg = infographicImages[item.id] || img503020;

                return (
                  <div key={item.id} className="infographic-card">
                    <div className="card-image-wrapper">
                      <img
                        src={cardImg}
                        alt={item.title}
                        className="infographic-card-image"
                      />

                      <div className="infographic-badge">
                        {item.category}
                      </div>

                      <div
                        className="card-image-overlay"
                        onClick={() => setActiveModalItem(item)}
                      >
                        <ZoomIn size={32} className="zoom-icon" />
                      </div>
                    </div>

                    <div className="infographic-card-body">
                      <h3 className="infographic-card-title">
                        {item.title}
                      </h3>

                      <p className="infographic-caption">
                        {item.caption}
                      </p>

                      <div className="infographic-bullets">
                        {item.details.map((point, idx) => (
                          <div key={idx} className="bullet-point">
                            {point}
                          </div>
                        ))}
                      </div>

                      <button
                        className="btn btn-outline btn-full"
                        onClick={() => setActiveModalItem(item)}
                      >
                        <ZoomIn size={16} className="icon-inline" /> View
                        High-Res Infographic
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state-box">
              <p>
                🔍 No infographics found matching your filter criteria. Try
                clearing search or selecting 'All'.
              </p>
            </div>
          )}

          {/* Modal Preview */}
          {activeModalItem && (
            <div
              className="modal-overlay"
              onClick={() => setActiveModalItem(null)}
            >
              <div
                className="modal-content infographic-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>
                    <BarChart2
                      size={20}
                      className="icon-inline text-primary"
                    />{' '}
                    {activeModalItem.title}
                  </h3>

                  <button
                    className="modal-close-btn"
                    onClick={() => setActiveModalItem(null)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="modal-body">
                  <div className="modal-infographic-image-container">
                    <img
                      src={
                        infographicImages[activeModalItem.id] || img503020
                      }
                      alt={activeModalItem.title}
                      className="modal-full-image"
                    />
                  </div>

                  <div className="modal-infographic-details">
                    <h4>
                      {activeModalItem.title} - Key Takeaways:
                    </h4>

                    <p className="modal-caption-text">
                      {activeModalItem.caption}
                    </p>

                    <ul>
                      {activeModalItem.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-disclaimer">
                    <p>
                      💡 Tip: You can save or screenshot this visual guide for
                      quick reference during your monthly budgeting!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default InfographicsGallery;