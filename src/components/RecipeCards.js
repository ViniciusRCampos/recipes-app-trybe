import React from 'react';
import PropTypes from 'prop-types';

function RecipeCards(props) {
  const { onClick, onKeyDown, str, strThumb, testId, testImg, testName } = props;
  return (
    <div
      onClick={ onClick }
      role="button"
      onKeyDown={ onKeyDown }
      tabIndex={ 0 }
      data-testid={ testId }
    >
      <p data-testid={ testName }>{str}</p>
      <img src={ strThumb } alt={ str } width="60px" data-testid={ testImg } />

    </div>
  );
}

RecipeCards.propTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  str: PropTypes.string,
  strThumb: PropTypes.string,
}.isRequired;

export default RecipeCards;
