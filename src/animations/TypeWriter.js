import { useState, useEffect } from 'react';

export const TypeWriter = (originalText) => {
  const [text, setText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setText(originalText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === originalText.length) {
        clearInterval(intervalId);
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [originalText]);

  return text;
};
