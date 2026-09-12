import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Header({ backButton }) {
  const history = useHistory();

  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon fontSize="large" className="header__icon" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon fontSize="large" className="header__icon" />
        </IconButton>
      )}

      <Link to="/" className="header__logoLink">
        <svg className="header__flame" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C12 2 8 6 8 10.5C8 13.5 9.5 15 12 15C14.5 15 16 13.5 16 10.5C16 6 12 2 12 2Z"
            fill="url(#flameGrad)"
          />
          <path
            d="M12 15C12 15 9 17 9 19.5C9 21 10 22 12 22C14 22 15 21 15 19.5C15 17 12 15 12 15Z"
            fill="url(#flameGrad2)"
          />
          <defs>
            <linearGradient id="flameGrad" x1="8" y1="2" x2="16" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FE3C72" />
              <stop offset="1" stopColor="#FF7854" />
            </linearGradient>
            <linearGradient id="flameGrad2" x1="9" y1="15" x2="15" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7854" />
              <stop offset="1" stopColor="#FE3C72" />
            </linearGradient>
          </defs>
        </svg>
        <span className="header__brand">Chaos Tinder</span>
      </Link>

      <Link to="/chat">
        <IconButton>
          <ForumIcon fontSize="large" className="header__icon" />
        </IconButton>
      </Link>
    </div>
  );
}

export default Header;
