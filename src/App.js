import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import BlogPage from './BlogPage';
import AboutMePage from './AboutMePage';
import ReviewsPage from './ReviewsPage';
import RecipesPage from './RecipesPage';
import FollowersPage from './Followers';
import BlogPosts from './BlogPosts';
import ReviewPage from './ReviewPage';
import CreateAccountPage from './CreateAccountPage';

import PrivacyPage from './PrivacyPage';
import LikedPosts from './LikedPosts';
import RecipeDetailPage from './RecipeDetailPage';
import RecipePage from './RecipePage';
import { AuthProvider } from './AuthContext'; // Correct the import

function App() {
    return (
        <Router>
            <div>
                <AuthProvider> {/* Ensure AuthProvider wraps your entire application */}
                    <Navbar />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/aboutme" component={AboutMePage} />
                        <Route path="/recipes" component={RecipesPage} />
                        <Route path="/blogs" component={BlogPage} />
                        <Route path="/res-page" component={RecipePage} />
                        <Route path="/res_review" component={ReviewsPage} />
                        <Route path="/reviews" component={ReviewPage} />
                        <Route path="/followers" component={FollowersPage} />
                        <Route path="/create-account" component={CreateAccountPage} />
                        <Route path="/privacy" component={PrivacyPage} />
                        <Route path="/blogposts" component={BlogPosts} />
                        <Route path="/recipe/:recipeId" component={RecipeDetailPage} />
                        <Route path="/liked-posts" component={LikedPosts} />
                    </Switch>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
