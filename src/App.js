import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

let timer;

const App = ({ texts, period = 2000, speed = 1 }) => {
  const mounted = useRef(false);
  const [text, setText] = useState('');
  const textRef = useRef(text);
  textRef.current = text;
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const [deleting, setDeleting] = useState(false);
  const deletingRef = useRef(deleting);
  deletingRef.current = deleting;

  useEffect(() => {
    mounted.current = true;

    if (Array.isArray(texts)) {
      tick();
    }

    return () => {
      mounted.current = false;

      if (timer) clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(texts) && index >= texts.length) {
      setIndex(0);
    }
  }, [index]);

  const tick = useCallback(() => {
    if (mounted.current) {
      const deleting = deletingRef.current;
      const index = indexRef.current;
      const fullTxt = texts[index];

      let text = textRef.current;

      if (deleting) {
        text = fullTxt.substring(0, text.length - 1);
      } else {
        text = fullTxt.substring(0, text.length + 1);
      }

      let delta = 200 - Math.random() * 70;

      if (deleting) delta /= 2;

      delta /= speed;

      if (!deleting && text === fullTxt) {
        delta = period;
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex(state => state + 1);
        delta = 500;

      }

      setText(text);

      timer = setTimeout(tick, delta);
    }
  }, []);

  return (
    <span>{text}</span>
  );
};

App.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  period: PropTypes.number,
  speed: PropTypes.number
};

export default App;