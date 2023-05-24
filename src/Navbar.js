import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-list">
        <li><a href="/">Strona główna</a></li>
        <li><a href="/search">Szukaj</a></li>
        <li><a href="/kontakt">Kontakt</a></li>
        <li><a href="/add">Dodaj Legende</a></li>
        <li><a href="/login">Legend-in</a></li>
        <li><a href="/register">Legend-ister</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;