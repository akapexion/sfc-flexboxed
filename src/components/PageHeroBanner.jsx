import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeroBanner = ({ title, subtitle, badge, bgImage }) => {
  return (
    <section className="page-hero-banner">
      <div
        className="page-hero-bg"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 58, 138, 0.78)), url(${bgImage})`
        }}
      />

      <div className="container page-hero-content">
        <div className="page-hero-breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>{title}</span>
        </div>

        {badge && <span className="page-hero-badge">{badge}</span>}

        <h1 className="page-hero-title">{title}</h1>

        {subtitle && (
          <p className="page-hero-subtitle">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHeroBanner;