// src/components/CharacterCard/CharacterCard.tsx
import React from 'react';
import Image from 'next/image';
import styles from './CharacterCard.module.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  isFavorite?: boolean;
}

interface CharacterCardProps {
  character: Character;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onToggleFavorite, onClick }) => {
  const { name, status, image, isFavorite } = character;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.liveIndicator}>
        {status === 'Alive' ? (
          <span className={styles.live}>LIVE</span>
        ) : (
          <span className={styles.dead}>MUERTO</span>
        )}
      </div>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={name} 
          width={150} 
          height={150} 
          className={styles.image} 
        />
      </div>
      <div className={styles.nameContainer}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <div className={styles.likeContainer}>
        <button 
          onClick={handleFavoriteClick} 
          className={styles.likeButton}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={styles.likeText}>Like</span>
          <span className={styles.likeIcon}>{isFavorite ? '★' : '☆'}</span>
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;