import React, { useMemo, useRef, useState, useCallback } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import SwipeButtons from './SwipeButtons';

const PEOPLE = [
  {
    name: 'Rangannan, Gave up land for Bengaluru Airport',
    url: 'https://i.pinimg.com/736x/73/ba/c3/73bac381e69534f756a63b0e7bd04c69.jpg',
  },
  {
    name: 'Malar, Used to be a guest lect in kerala',
    url: 'https://i.pinimg.com/736x/0c/a9/2d/0ca92dc073a30e5f74a9a917576eed71.jpg',
  },
  {
    name: 'Putturumees, Think hes some big M',
    url: 'https://i.pinimg.com/736x/7a/af/a4/7aafa48454a02b5c6ed22e7246b06dbe.jpg',
  },
   {
    name: 'Nagavalli, Loves shopping aabharanam',
    url: 'https://i.pinimg.com/736x/e4/7d/59/e47d59a3e923659215ab9e0ca350d5aa.jpg',
  },
  {
    name: 'Muthu Pandi, Chellom lover ',
    url: 'https://i.pinimg.com/736x/23/76/6d/23766db814253a893053b45e7d494a75.jpg',
  },
   {
    name: 'Pooja, Bike and Giri lover',
    url: 'https://i.pinimg.com/736x/bc/10/e4/bc10e480e78349b8e060f7c2c442122e.jpg',
  },
  {
    name: 'Umesh & Shaji, Buy 1 get 1',
    url: 'https://i.pinimg.com/736x/f6/d8/d0/f6d8d0986ed8bed5151a680ce23a7e55.jpg',
  },
  {
    name: 'Reenu, Ambitious ',
    url: 'https://i.pinimg.com/736x/d7/be/66/d7be6664a9e98b8043387a38675a7b22.jpg',
  },
  {
    name: 'Vijay, Future CM of TN',
    url: 'https://i.pinimg.com/736x/46/2b/1b/462b1b8ec9978cdd6f6a3b48224068cb.jpg',
  },
  {
    name: 'Chandra, Part time Kaliyankattu Neeli',
    url: 'https://i.pinimg.com/1200x/f1/5a/8b/f15a8bbbca93687b02148486a5ce7f93.jpg',
  },
  {
    name: 'Maathan, Lonely dood',
    url: 'https://i.pinimg.com/1200x/99/23/a1/9923a18bd70e30a81ac0c848fb2ec7b2.jpg',
  },
  {
    name: 'Delulu, Pookie cringe',
    url: 'https://i.pinimg.com/736x/c7/0b/82/c70b8290acce5a4e94f3b1e2b6f9c79b.jpg',
  },
  {
    name: 'Police, Part time killer',
    url: 'https://i.pinimg.com/736x/83/c0/77/83c07705ea61b6f6c77092abfb7beea4.jpg',
  },
  {
    name: 'Noor Jahan, Princess of Ram',
    url: 'https://i.pinimg.com/1200x/91/cb/7d/91cb7d7e02353841b3d9e489456ae926.jpg',
  },
  {
    name: 'Georgekutty, Familyman',
    url: 'https://i.pinimg.com/736x/1f/12/f3/1f12f312c0c40f1238cb40ed5e3c5514.jpg',
  },
  {
    name: 'Pavazha Malli, also known as Kaattuchembakam',
    url: 'https://i.pinimg.com/736x/8f/8e/96/8f8e96e3edbcea2c4a45a421e64c3371.jpg',
  },
  {
    name: 'George, Trendsetter',
    url: 'https://i.pinimg.com/736x/6a/ee/c7/6aeec7b2c1de89d6811746097cb7e02e.jpg',
  },
  {
    name: 'Nithya, >>>>>> Darshana',
    url: 'https://i.pinimg.com/1200x/0a/db/31/0adb31321cda2906405ac21386aa11b1.jpg',
  },
  {
    name: 'Devadas, In search of Chandra',
    url: 'https://i.pinimg.com/1200x/fb/e0/bf/fbe0bff5aa94a3a80b328a576bf351af.jpg',
  },
  {
    name: 'Aysha, Thattathin marayathe pennu',
    url: 'https://i.pinimg.com/736x/97/10/3d/97103d5606659b4b9dd36b94980028af.jpg',
  },
];

function TinderCards() {
  const [currentIndex, setCurrentIndex] = useState(PEOPLE.length - 1);
  const [lastDirection, setLastDirection] = useState('');
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () => Array(PEOPLE.length).fill(0).map(() => React.createRef()),
    []
  );

  const updateIndex = useCallback((val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  }, []);

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, name) => {
    setLastDirection(direction);
    console.log(`You swiped ${direction} on ${name}`);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} left the screen`);
    updateIndex(idx - 1);
  };

  const swipe = async (dir) => {
    if (canSwipe && childRefs[currentIndex].current) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {PEOPLE.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}

        {!canSwipe && (
          <div className="tinderCards__empty">
            <p>No more profiles nearby</p>
            <span>Check back later for more chaos matches</span>
          </div>
        )}
      </div>

      {lastDirection && canSwipe && (
        <p className="tinderCards__feedback">
          {lastDirection === 'right' ? '❤️ Liked!' : '👎 Noped!'}
        </p>
      )}

      <SwipeButtons onSwipe={swipe} canSwipe={canSwipe} />
    </div>
  );
}

export default TinderCards;
