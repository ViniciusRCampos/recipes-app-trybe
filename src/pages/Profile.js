import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [profile, setProfile] = useState('');

  const loginEmail = () => {
    const user = window.localStorage.getItem('user');
    if (user === null) {
      setProfile('');
    } else {
      const { email } = JSON.parse(user);
      setProfile(email);
    }
  };
  useEffect(() => loginEmail(), []);

  console.log(JSON.parse(window.localStorage.getItem('user')));
  return (
    <div>
      <Header
        title="Profile"
      />
      <h3 data-testid="profile-email">{ profile }</h3>
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
