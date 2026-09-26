import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/budgetSlice";
import toast from "react-hot-toast";
import {
  Map,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  ClipboardList,
  Search,
  MessageSquare
} from "lucide-react";
import budgetData from "../data/budgetData.json";
import siteLogo from "../assets/logo2.png";

const navGroups = [
  {
    key: "learn",
    label: "Learn Budgeting",
    items: [
      { label: "Budgeting Basics", path: "/basics" },
      { label: "Needs vs Wants", path: "/needs-wants" },
    ]
  },
  {
    key: "practice",
    label: "Practice Planning",
    items: [
      { label: "Savings Goals", path: "/savings-goals" },
      { label: "Expense Planner", path: "/expense-planner" },
      { label: "Money Mistakes", path: "/money-mistakes" }
    ]
  },
  {
    key: "explore",
    label: "Explore Resources",
    items: [
      { label: "Infographics & Learning Gallery", path: "/infographics" },
      { label: "About Us", path: "/about" }
    ]
  },
  {
    key: "help",
    label: "Get Help / Connect",
    items: [
      { label: "AI Q&A Assistant", path: "/chatbot" },
      { label: "Contact us", path: "/contact" },
      { label: "Give a Feedback", path: "/feedback" }
    ]
  }
];

const MIN_FONT_SCALE = 80;
const MAX_FONT_SCALE = 130;
const FONT_STEP = 10;

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.budget.darkMode);
  const location = useLocation();
  const navRef = useRef(null);

  const [now, setNow] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1042);
  const [fontScale, setFontScale] = useState(100);
  const [openGroup, setOpenGroup] = useState(null); 

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const sessionKey = "budgetbasics_visitor_session";
    const isNewSession = !sessionStorage.getItem(sessionKey);

    (async () => {
      try {
        const endpoint = isNewSession
          ? "https://abacus.jasoncameron.dev/hit/budgetbasics/visitors"
          : "https://abacus.jasoncameron.dev/get/budgetbasics/visitors";

        if (isNewSession) sessionStorage.setItem(sessionKey, "true");

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Visitor API failed: ${res.status}`);

        const data = await res.json();
        if (isMounted && typeof data?.value === "number") {
          setVisitorCount(data.value);
        }
      } catch (err) {
        console.error("Visitor counter error:", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // push the font scale onto the root element so it affects the whole app
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  // close whichever dropdown is open when the route changes
  useEffect(() => {
    setOpenGroup(null);
  }, [location]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
    toast.success(darkMode ? "Switched to Light Mode" : "Switched to Dark Mode", {
      duration: 2000
    });
  };

  const decreaseFont = () => setFontScale((s) => Math.max(MIN_FONT_SCALE, s - FONT_STEP));
  const increaseFont = () => setFontScale((s) => Math.min(MAX_FONT_SCALE, s + FONT_STEP));

  const toggleGroup = (key) => {
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  const isGroupActive = (group) => group.items.some((item) => item.path === location.pathname);

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-info">
            <span>
              {dateStr} - {timeStr} - Visitors: {visitorCount}
            </span>
          </div>

          <div className="top-actions">
            <Link to="/sitemap" className="btn-sitemap-link" title="View Website Sitemap">
              <Map size={14} className="icon-inline" /> Sitemap
            </Link>
          </div>
        </div>
      </div>

      <div className="tips-ticker-bar">
        <div className="container ticker-container">
          <span className="ticker-label">Tip</span>

          {/* yes, the actual marquee tag - deprecated but still works everywhere */}
          <marquee className="ticker-text" behavior="scroll" direction="left" scrollAmount="5">
            {budgetData.tickerTips.join("     •     ")}
          </marquee>
        </div>
      </div>

      <div className="main-nav-bar">
        <div className="container nav-container">
          <Link to="/" className="brand-box" title="BudgetBasics Home">
            <img src={siteLogo} alt="BudgetBasics Logo" className="header-site-logo" />
          </Link>

          <nav className="nav-links" ref={navRef}>
            <Link to="/" className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>

            {navGroups.map((group) => {
              const isOpen = openGroup === group.key;

              return (
                <div className="nav-dropdown" key={group.key}>
                  <button
                    className={`nav-btn dropdown-toggle-btn ${
                      isGroupActive(group) ? "active" : ""
                    }`}
                    onClick={() => toggleGroup(group.key)}
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <ChevronDown size={14} className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="dropdown-menu">
                      {group.items.map((item) => (
                        <Link key={item.path} to={item.path} className="dropdown-item">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              className="theme-toggle-icon-btn"
              onClick={handleThemeToggle}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;