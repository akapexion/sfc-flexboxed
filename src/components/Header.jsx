import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/budgetSlice";
import toast from "react-hot-toast";
import {
  Map,
  ChevronDown,
  Sun,
  Moon,
  MessageSquare,
  Mail
} from "lucide-react";
import budgetData from "../data/budgetData.json";
import siteLogo from "../assets/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.budget.darkMode);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1042);
  const [tickerIndex, setTickerIndex] = useState(0);

  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const sessionKey = "budgetbasics_visitor_session";
    const isNewSession = !sessionStorage.getItem(sessionKey);

    const updateVisitorCount = async () => {
      try {
        let endpoint;

        if (isNewSession) {
          sessionStorage.setItem(sessionKey, "true");
          endpoint = "https://abacus.jasoncameron.dev/hit/budgetbasics/visitors";
        } else {
          endpoint = "https://abacus.jasoncameron.dev/get/budgetbasics/visitors";
        }

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Visitor API failed: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted && data && typeof data.value === "number") {
          setVisitorCount(data.value);
        }
      } catch (error) {
        console.error("Visitor counter error:", error);
      }
    };

    updateVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex(
        (prev) => (prev + 1) % budgetData.tickerTips.length
      );
    }, 5000);

    return () => clearInterval(tickerInterval);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());

    if (!darkMode) {
      toast.success("Switched to Dark Mode", { duration: 2000 });
    } else {
      toast.success("Switched to Light Mode", { duration: 2000 });
    }
  };

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const isModuleActive = [
    "/basics",
    "/needs-wants",
    "/50-30-20-rule",
    "/savings-goals",
    "/expense-planner",
    "/money-mistakes",
    "/infographics",
    "/chatbot",
    "/sitemap"
  ].includes(location.pathname);

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-info">
            <span>
              {formattedDate} - {formattedTime} - Visitors: {visitorCount}
            </span>
          </div>

          <div className="top-actions">
            {/* Dark/Light mode button in Navbar Top Bar */}
            <button
              className="navbar-theme-toggle-btn"
              onClick={handleThemeToggle}
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <>
                  <Sun size={15} className="text-warning" /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={15} /> Dark Mode
                </>
              )}
            </button>

            <Link
              to="/sitemap"
              className="btn-sitemap-link"
              title="View Website Sitemap"
            >
              <Map size={14} className="icon-inline" /> Sitemap
            </Link>
          </div>
        </div>
      </div>

      <div className="tips-ticker-bar">
        <div className="container ticker-container">
          <span className="ticker-label">Smart Tip</span>

          <span className="ticker-text">
            {budgetData.tickerTips[tickerIndex]}
          </span>
        </div>
      </div>

      <div className="main-nav-bar">
        <div className="container nav-container">
          {/* New SVG Logo - Old icon and text removed */}
          <Link
            to="/"
            className="brand-box"
            title="BudgetBasics Home"
          >
            <img
              src={siteLogo}
              alt="BudgetBasics Logo"
              className="header-site-logo"
            />
          </Link>

          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-btn ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`nav-btn ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>

            {/* Modules Dropdown */}
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                className={`nav-btn dropdown-toggle-btn ${
                  isModuleActive ? "active" : ""
                }`}
                onClick={() =>
                  setIsDropdownOpen((prev) => !prev)
                }
                aria-expanded={isDropdownOpen}
              >
                Modules{" "}
                <ChevronDown
                  size={14}
                  className={`dropdown-arrow ${
                    isDropdownOpen ? "open" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/basics" className="dropdown-item">
                    Budgeting Basics
                  </Link>

                  <Link to="/needs-wants" className="dropdown-item">
                    Needs vs Wants
                  </Link>

                  <Link
                    to="/50-30-20-rule"
                    className="dropdown-item"
                  >
                    50 30 20 Rule
                  </Link>

                  <Link
                    to="/savings-goals"
                    className="dropdown-item"
                  >
                    Savings Goals
                  </Link>

                  <Link
                    to="/expense-planner"
                    className="dropdown-item"
                  >
                    Expense Planner
                  </Link>

                  <Link
                    to="/money-mistakes"
                    className="dropdown-item"
                  >
                    Money Mistakes
                  </Link>

                  <Link
                    to="/infographics"
                    className="dropdown-item"
                  >
                    Infographics Gallery
                  </Link>

                  <Link to="/chatbot" className="dropdown-item">
                    Chatbot
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`nav-btn ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>

            <Link
              to="/feedback"
              className={`nav-btn ${
                location.pathname === "/feedback" ? "active" : ""
              }`}
            >
              Feedback
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;