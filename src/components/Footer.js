import React from 'react';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <a href="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </a>
      <a href="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal icon" />
      </a>

    </footer>
  );
}

export default Footer;
