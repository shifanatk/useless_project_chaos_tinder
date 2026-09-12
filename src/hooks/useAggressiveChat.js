import { useCallback, useRef, useState } from 'react';

const COMPLETIONS = [
  ' and I still sleep with my teddy bear btw',
  ' but my horoscope said absolutely not',
  ' because astrology is the only truth I know',
  ' ...wait do you like pineapple on pizza though?',
  ' and honestly I think the earth might be flat',
  " but actually I'm 3 cats in a trenchcoat",
  ' because my mom still picks my outfits',
  ' ...also I collect toenail clippings as a hobby',
  " but I'm emotionally unavailable until 2030",
  ' and I still ask my mom before going on dates',
  ' which reminds me, are you a Scorpio? run.',
  ' anyway my ex said I talk too much lol',
  ' and I ghost people for fun on weekends',
];

export function useAggressiveChat(setInput, onAutoSend) {
  const [isRuining, setIsRuining] = useState(false);
  const keystrokesRef = useRef(0);
  const isRuiningRef = useRef(false);
  const timeoutRef = useRef(null);
  const lastValueRef = useRef('');

  const ruinMessage = useCallback(
    (currentValue) => {
      if (isRuiningRef.current) return;

      isRuiningRef.current = true;
      setIsRuining(true);

      const suffix = COMPLETIONS[Math.floor(Math.random() * COMPLETIONS.length)];
      let index = 0;

      const typeNext = () => {
        if (index >= suffix.length) {
          isRuiningRef.current = false;
          setIsRuining(false);
          keystrokesRef.current = 0;

          const finalMessage = currentValue + suffix;
          if (Math.random() > 0.35) {
            setTimeout(() => onAutoSend?.(finalMessage), 600 + Math.random() * 800);
          }
          return;
        }

        setInput(currentValue + suffix.slice(0, index + 1));
        index += 1;
        timeoutRef.current = setTimeout(typeNext, 25 + Math.random() * 45);
      };

      typeNext();
    },
    [setInput, onAutoSend]
  );

  const handleChange = useCallback(
    (e) => {
      if (isRuiningRef.current) return;

      const value = e.target.value;
      lastValueRef.current = value;
      setInput(value);
      keystrokesRef.current += 1;

      const shouldRuin =
        value.length >= 4 &&
        (keystrokesRef.current >= 5 || (value.length >= 8 && Math.random() > 0.55));

      if (!shouldRuin) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isRuiningRef.current && lastValueRef.current === value) {
          ruinMessage(value);
        }
      }, 350 + Math.random() * 400);
    },
    [setInput, ruinMessage]
  );

  return { handleChange, isRuining };
}
