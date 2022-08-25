import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import Ship from './Ship';
import './style.css';

const ShipsField = () => {
  const { ships } = useAppSelector(({ gameStateSlice: toolkit }) => {
    return {
      ships: toolkit.ships,
    };
  });

  const ref = useRef<HTMLDivElement>(null);
  const [isOut, setIsOut] = useState(false);

  const slide = useCallback(() => {
    if (ref.current && ships.length !== 0)
      if (isOut) {
        ref.current.style.left = `-${ref.current?.offsetWidth || 0}px`;
        setIsOut(false);
      } else {
        ref.current.style.left = `0`;
        setIsOut(true);
      }
  }, [isOut, ships.length]);

  useEffect(() => {
    if (ref.current) ref.current.style.left = `-${ref.current?.offsetWidth || 0}px`;
  }, [ref]);

  useEffect(() => {
    if (ships.length === 0 && ref.current) {
      ref.current.style.left = `-${ref.current?.offsetWidth || 0}px`;
      setIsOut(true);
    }
  }, [ships, slide]);

  return (
    <div className='ships__container' ref={ref}>
      {ships.map((el) => (
        <Ship key={el.id} id={el.id} type={el.type} size={el.size} />
      ))}
      <div className='trigger' onClick={slide}>
        Place ships
      </div>
    </div>
  );
};

export default ShipsField;
