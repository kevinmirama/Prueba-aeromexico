import React from 'react';
import Image from 'next/image';
import styles from './FavoritesDropdown.module.css';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface FavoritesDropdownProps {
  favorites: Character[];
  onCharacterClick: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  visible: boolean;
}

const FavoritesDropdown: React.FC<FavoritesDropdownProps> = ({ 
  favorites, 
  onCharacterClick, 
  onRemoveFavorite,
  visible 
}) => {
  if (!visible) return null;
  
  const handleRemoveClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onRemoveFavorite(id);
  };
  
  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>FAVS</div>
      <div className={styles.list}>
        {favorites.length === 0 ? (
          <div className={styles.emptyMessage}>No tienes favoritos todavía</div>
        ) : (
          favorites.map((character) => (
            <div 
              key={character.id} 
              className={styles.item} 
              onClick={() => onCharacterClick(character.id)}
            >
              <Image 
                src={character.image} 
                alt={character.name} 
                width={30} 
                height={30} 
                className={styles.characterImage} 
              />
              <span className={styles.name}>{character.name}</span>
              <button 
                onClick={(e) => handleRemoveClick(e, character.id)}
                className={styles.removeButton}
                aria-label="Eliminar de favoritos"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesDropdown; 