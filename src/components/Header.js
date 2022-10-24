import React from 'react';

function Header({ props }) {
  return (
    <header>
      <img src={ props.profileImg } alt={ `imagem de ${props.title}` } />
      <img src={ props.searchImg } alt="a" />
      <h1>{props.title}</h1>

    </header>
  );
}

export default Header;
