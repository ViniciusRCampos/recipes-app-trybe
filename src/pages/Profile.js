import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header
        title="Profile"
      />
      <h3 data-testid="profile-email"> email </h3>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
