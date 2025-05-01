import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import {
    FiBell,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiExternalLink,
    FiFilter,
    FiSearch,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import Container from "../Container";
import "../../assets/Style/Announcement.css"

const API_BASE_URL = "http://localhost:8080";

const Announcement = () => {
    const [cookies] = useCookies(["user", "_id"]);
    const [newsItems, setNewsItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        category: "all",
        sortBy: "newest",
        showExpired: false,
    });
    const [showFilters, setShowFilters] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    const categories = [
        "All",
        "Events",
        "Announcements",
        "Community News",
        "Updates",
        "Alerts",
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/news`);
                if (response.data && response.data.data) {
                    setNewsItems(response.data.data);
                    setFilteredItems(response.data.data);
                } else {
                    throw new Error("Invalid data received");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                toast.error("Failed to load news & announcements");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        filterAndSortItems();
    }, [searchTerm, filters, newsItems]);

    const filterAndSortItems = () => {
        let result = [...newsItems];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(term) ||
                    item.content.toLowerCase().includes(term) ||
                    (item.tags &&
                        item.tags.some((tag) => tag.toLowerCase().includes(term)))
            );
        }

        // Filter by category
        if (filters.category !== "all") {
            result = result.filter((item) => item.category === filters.category);
        }

        // Filter expired events
        if (!filters.showExpired) {
            const now = new Date();
            result = result.filter(
                (item) => !item.endDate || new Date(item.endDate) > now
            );
        }

        // Sort items
        if (filters.sortBy === "newest") {
            result.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        } else if (filters.sortBy === "oldest") {
            result.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        } else if (filters.sortBy === "eventDate") {
            result.sort((a, b) => {
                const dateA = a.eventDate ? new Date(a.eventDate) : new Date(0);
                const dateB = b.eventDate ? new Date(b.eventDate) : new Date(0);
                return dateA - dateB;
            });
        }

        setFilteredItems(result);
    };

    const toggleExpand = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: "2-digit", minute: "2-digit" };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    if (loading) {
        return (
                <div className="news-loading">
                    <div className="news-skeleton-header"></div>
                    <div className="news-skeleton-filters"></div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="news-skeleton-item"></div>
                    ))}
                </div>
        );
    }

    return (
        // <Container>
            <div
                className="news-announcements-container"
                style={{  width:"100%"}}
            >
                {/* Header Section */}
                <div className="news-header">
                    <div className="news-header-content">
                        <h1>
                            <FiBell className="icon" /> News & Announcements
                        </h1>
                        <p>
                            Stay updated with the latest community events and important
                            announcements
                        </p>
                    </div>
                    <div className="news-header-image"></div>
                </div>

                {/* Search and Filters */}
                <div className="news-controls">
                    <div className="news-search">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search news, events, announcements..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        className="filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FiFilter /> Filters{" "}
                        {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="news-filters">
                        <div className="filter-group">
                            <label>Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) =>
                                    setFilters({ ...filters, category: e.target.value })
                                }
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat.toLowerCase()}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Sort By</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) =>
                                    setFilters({ ...filters, sortBy: e.target.value })
                                }
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="eventDate">Event Date</option>
                            </select>
                        </div>

                        <div className="filter-group checkbox-group">
                            <input
                                type="checkbox"
                                id="showExpired"
                                checked={filters.showExpired}
                                onChange={(e) =>
                                    setFilters({ ...filters, showExpired: e.target.checked })
                                }
                            />
                            <label htmlFor="showExpired">Show expired events</label>
                        </div>
                    </div>
                )}

                {/* News Items */}
                <div className="news-items">
                    {filteredItems.length === 0 ? (
                        <div className="no-results">
                            <img src="/images/no-results.svg" alt="No results" />
                            <h3>No news items found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <div
                                key={item._id}
                                className={`news-item ${item.isFeatured ? "featured" : ""} ${item.category
                                    }`}
                            >
                                {item.isFeatured && (
                                    <div className="featured-badge">Featured</div>
                                )}

                                <div
                                    className="news-item-header"
                                    onClick={() => toggleExpand(item._id)}
                                >
                                    <div className="news-item-category">{item.category}</div>
                                    <h3>{item.title}</h3>
                                    <div className="news-item-meta">
                                        <span>
                                            <FiCalendar /> {formatDate(item.publishDate)}
                                        </span>
                                        {item.eventDate && (
                                            <span>
                                                <FiClock /> {formatTime(item.eventDate)}
                                            </span>
                                        )}
                                        {item.location && (
                                            <span>
                                                <FiMapPin /> {item.location}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`news-item-content ${expandedItem === item._id ? "expanded" : ""
                                        }`}
                                >
                                    <div className="news-item-body">
                                        <p>{item.content}</p>

                                        {item.image && (
                                            <div className="news-item-image">
                                                <img
                                                    src={`${API_BASE_URL}/uploads/${item.image}`}
                                                    alt={item.title}
                                                />
                                            </div>
                                        )}

                                        {item.eventDate && (
                                            <div className="event-details">
                                                <h4>Event Details</h4>
                                                <div className="event-details-grid">
                                                    <div>
                                                        <strong>Date:</strong>
                                                        <p>{formatDate(item.eventDate)}</p>
                                                    </div>
                                                    <div>
                                                        <strong>Time:</strong>
                                                        <p>{formatTime(item.eventDate)}</p>
                                                    </div>
                                                    {item.endDate && (
                                                        <div>
                                                            <strong>Ends:</strong>
                                                            <p>{formatDate(item.endDate)}</p>
                                                        </div>
                                                    )}
                                                    {item.location && (
                                                        <div>
                                                            <strong>Location:</strong>
                                                            <p>{item.location}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="news-item-tags">
                                                {item.tags.map((tag) => (
                                                    <span key={tag} className="tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="news-item-footer">
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-item-link"
                                            >
                                                <FiExternalLink /> Learn More
                                            </a>
                                        )}
                                        <button
                                            className="read-more-btn"
                                            onClick={() => toggleExpand(item._id)}
                                        >
                                            {expandedItem === item._id ? "Show Less" : "Read More"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        // </Container>
    );
};

export default Announcement;