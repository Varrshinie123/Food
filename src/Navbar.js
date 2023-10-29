import React, { useState } from 'react';
import './Navbar.css';
import './UserSidebar.css';
import UserSidebar from './UserSidebar';
import { useAuth } from './AuthContext';

function Navbar() {
    const { loggedIn, logout } = useAuth();
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light length-100%">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Foodie
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isSidebarActive ? 'open' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/home">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/recipes">
                                    Recipes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/res_review">
                                    Restaurant Review
                                </a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutme">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/blogs">
                                    Blogs
                                </a>
                            </li>
                            {loggedIn ? (
                                <li className="nav-item" onClick={logout}>
                                    <a className="nav-link">Logout</a>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                            )}
                            {loggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link" onClick={toggleSidebar}>
                                        User Sidebar
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                {loggedIn && (
                    <div className="user-sidebar">
                        <ul>
                            <a href="/privacy"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Privacy</li>
                            </a>
                            
                            <a href="/blogposts"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Blog Posts</li>
                            </a>

                            <a href="/followers"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Followers</li>
                            </a>
                            
                            
                            <a href="/liked-posts"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Likes</li>
                            </a>

                            <a href="/res-page"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Recipes</li>
                            </a>

                            <a href="/reviews"> {/* Wrap the "Privacy" link in an anchor tag */}
                                <li>Reviews</li>
                            </a>
                            
                            {/* Add more items as needed */}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
