import React from 'react';
import './SwipeButtons.css';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { IconButton } from '@mui/material';

const ACTIONS = [
  {
    id: 'rewind',
    label: 'Rewind',
    direction: 'right',
    size: 'small',
    Icon: ReplayIcon,
    iconClass: 'swipeButtons__repeat',
  },
  {
    id: 'nope',
    label: 'Nope',
    direction: 'left',
    size: 'large',
    Icon: CloseIcon,
    iconClass: 'swipeButtons__left',
  },
  {
    id: 'super',
    label: 'Super Like',
    direction: 'up',
    size: 'small',
    Icon: StarRateIcon,
    iconClass: 'swipeButtons__star',
  },
  {
    id: 'like',
    label: 'Like',
    direction: 'right',
    size: 'large',
    Icon: FavoriteIcon,
    iconClass: 'swipeButtons__right',
    extraClass: 'like-button',
  },
  {
    id: 'boost',
    label: 'Boost',
    direction: 'right',
    size: 'small',
    Icon: FlashOnIcon,
    iconClass: 'swipeButtons__lightning',
  },
];

function SwipeButtons({ onSwipe, canSwipe = true }) {
  return (
    <div className="swipeButtons">
      {ACTIONS.map(({ id, label, direction, size, Icon, iconClass, extraClass }) => (
        <div key={id} className="swipeButtons__item">
          <IconButton
            className={`swipeButtons__btn swipeButtons__btn--${size} ${extraClass || ''}`}
            aria-label={label}
            disabled={!canSwipe}
            onClick={() => onSwipe?.(direction)}
          >
            <Icon className={iconClass} />
          </IconButton>
          <span className="swipeButtons__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default SwipeButtons;
