import React, { useState, useCallback, memo } from 'react';
import styles from './Arrows.module.css';

interface ArrowsProps {
  onUp: () => void;
  onDown: () => void;
}

const Arrows: React.FC<ArrowsProps> = ({ onUp, onDown }) => {
  const [hoverUp, setHoverUp] = useState(false);
  const [hoverDown, setHoverDown] = useState(false);
  const [clickedArrow, setClickedArrow] = useState<'up' | 'down' | null>(null);
  
  const handleUpClick = useCallback(() => {
    setClickedArrow('up');
    onUp();
    setTimeout(() => setClickedArrow(null), 500);
  }, [onUp]);
  
  const handleDownClick = useCallback(() => {
    setClickedArrow('down');
    onDown();
    setTimeout(() => setClickedArrow(null), 500);
  }, [onDown]);
  
  return (
    <div className={styles.arrowContainer}>
      <div className={styles.arrowLabel}>
        {(hoverUp || hoverDown) && !clickedArrow && <span>NAVEGAR</span>}
        {clickedArrow === 'up' && <span>SUBIR</span>}
        {clickedArrow === 'down' && <span>BAJAR</span>}
        {!hoverUp && !hoverDown && !clickedArrow && <span>Desplazar</span>}
      </div>
      
      <button 
        className={`${styles.arrow} ${styles.up} ${hoverUp ? styles.hover : ''} ${clickedArrow === 'up' ? styles.clicked : ''}`}
        onClick={handleUpClick}
        onMouseEnter={() => setHoverUp(true)}
        onMouseLeave={() => setHoverUp(false)}
        aria-label="Desplazar hacia arriba"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      
      <button 
        className={`${styles.arrow} ${styles.down} ${hoverDown ? styles.hover : ''} ${clickedArrow === 'down' ? styles.clicked : ''}`}
        onClick={handleDownClick}
        onMouseEnter={() => setHoverDown(true)}
        onMouseLeave={() => setHoverDown(false)}
        aria-label="Desplazar hacia abajo"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default memo(Arrows); 