import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const route = useHistory();

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

  const logOut = () => {
    window.localStorage.clear('user');
    route.push('/');
  };

  return (
    <div>
      <Header
        title="Profile"
      />
      <h3 data-testid="profile-email">{ profile }</h3>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => route.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => route.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logOut }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
