'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'; // Import useMemo
import { useDispatch, useSelector } from 'react-redux';
// Asumiendo que tus componentes están en las rutas correctas
// import CharacterCard from '../components/CharacterCard/CharacterCard'; 
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import Arrows from '../components/Arrows';
import styles from './page.module.css';
import { toggleFavorite } from '../store/favoritesSlice'; // Asegúrate que la ruta es correcta
import { RootState, AppDispatch } from '../store/store'; // Asegúrate que la ruta es correcta
import Image from 'next/image';

// Define the Character interface matching the API response and our needs
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
  image: string;
  episode?: string[];
  isFavorite?: boolean; // Opcional, ya que se maneja externamente con Redux
}

const SelectedCharacterPanel = ({ 
  character 
}: { 
  character: Character | null;
}) => {
  if (!character) {
    return (
      <div className={styles.selectedCharacterPanel}>
        <div className={styles.noCharacterSelected}>
          <p>Selecciona un personaje para ver más detalles</p>
        </div>
      </div>
    );
  }

  // Establecer valores por defecto para los atributos
  const origin = character.origin?.name !== "unknown" ? character.origin?.name : "Alien Spa";
  const location = character.location?.name !== "unknown" ? character.location?.name : "Earth";
  const gender = character.gender !== "unknown" ? character.gender : "Male";
  const episodes = character.episode?.length || 132; // Cuidado: episode.length no siempre será la cantidad real si no viene de la API

  return (
    <div className={styles.selectedCharacterPanel}>
      <div className={styles.liveIndicator}>
        <span className={character.status === "Alive" ? styles.live : styles.dead}>
          {character.status === "Alive" ? "VIVO" : "MUERTO"}
        </span>
      </div>
      
      <div className={styles.characterImageContainer}>
        <Image 
          src={character.image} 
          alt={character.name} 
          width={300} 
          height={300}
          className={styles.selectedCharacterImage}
          priority // Priorizar la carga de la imagen seleccionada
        />
      </div>
      
      <div className={styles.characterInfo}>
        <h2 className={styles.characterName}>{character.name}</h2>
        <p className={styles.characterDetails}>{character.species} • {character.type || "Unknown Type"}</p>
      </div>
      
      <div className={styles.characterAttributes}>
        <div className={styles.attributeItem}>
          <span className={styles.attributeTitle}>Origin</span>
          <span className={styles.attributeValue}>{origin}</span>
        </div>
        <div className={styles.attributeItem}>
          <span className={styles.attributeTitle}>Location</span>
          <span className={styles.attributeValue}>{location}</span>
        </div>
        <div className={styles.attributeItem}>
          <span className={styles.attributeTitle}>Gender</span>
          <span className={styles.attributeValue}>{gender}</span>
        </div>
        <div className={styles.attributeItem}>
          <span className={styles.attributeTitle}>Episodes</span>
          <span className={styles.attributeValue}>{episodes}</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const favButtonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const dispatch: AppDispatch = useDispatch();
  const favoriteCharacters = useSelector((state: RootState) => state.favorites.favoriteCharacters);
  
  // --- CORRECCIÓN AQUÍ ---
  // Usar useMemo para estabilizar favoriteCharacterIds
  const favoriteCharacterIds = useMemo(() => {
    return favoriteCharacters.map(fav => fav.id);
  }, [favoriteCharacters]); // Solo recalcula cuando favoriteCharacters cambia

  // Fetch characters on component mount
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        // Usando json-server en lugar de la API directa
        const response = await fetch('http://localhost:3002/characters'); // Asegúrate que esta URL es correcta
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data); // Inicialmente mostrar todos
        // Preseleccionar el primer personaje para la vista detallada
        if (data.length > 0 && !selectedCharacter) { // Evitar sobreescribir si ya hay uno seleccionado
          setSelectedCharacter(data[0]);
        }
        setError(null);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch characters:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []); // El array vacío asegura que solo corre al montar. selectedCharacter se quita como dependencia aquí.

  // Filter characters based on search term and favorites
  useEffect(() => {
    let filtered: Character[];
    
    if (showFavorites) {
      // Ahora favoriteCharacterIds es estable gracias a useMemo
      filtered = characters.filter(char => favoriteCharacterIds.includes(char.id));
    } else if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = characters.filter(char => 
        char.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filtered = characters; // Si no hay búsqueda ni filtro de favs, mostrar todos
    }
    
    setFilteredCharacters(filtered);

  }, [searchTerm, characters, favoriteCharacterIds, showFavorites]); // Dependencias correctas

  // Handle selected character updates separately when filters change
  useEffect(() => {
    // Si hay personajes filtrados Y (el seleccionado no está en la lista O no hay ninguno seleccionado)
    if (filteredCharacters.length > 0 && 
        (!selectedCharacter || !filteredCharacters.some(char => char.id === selectedCharacter.id))) 
    {
      // Selecciona el primero de la lista filtrada
      setSelectedCharacter(filteredCharacters[0]);
    } 
    // Si la lista filtrada queda vacía, deselecciona
    else if (filteredCharacters.length === 0 && selectedCharacter) {
       setSelectedCharacter(null);
    }
  }, [filteredCharacters, selectedCharacter]); // Ejecutar cuando cambian los filtrados o el seleccionado

  // Efecto para cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    if (!showFavoritesDropdown) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (favButtonRef.current && !favButtonRef.current.contains(event.target as Node)) {
        setShowFavoritesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFavoritesDropdown]);

  // Memoizar las funciones de manejo para evitar recreaciones innecesarias
  const handleToggleFavorite = useCallback((character: Character) => {
    dispatch(toggleFavorite(character));
  }, [dispatch]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Al buscar, desactivamos el filtro de favoritos explícitamente
    if (showFavorites) {
        setShowFavorites(false);
    }
    // Opcional: cerrar el dropdown de favs si está abierto
    // if (showFavoritesDropdown) {
    //     setShowFavoritesDropdown(false);
    // }
  }, [showFavorites/*, showFavoritesDropdown*/]); // Dependencias actualizadas

  const handleFavsButtonClick = useCallback(() => {
    // En mobile: click alterna vista de favoritos y cierra/abre dropdown
    if (isMobile) {
        setShowFavorites(prev => !prev);
        setShowFavoritesDropdown(prev => !prev); // Sincronizar dropdown con vista
    } 
    // En desktop: click solo abre/cierra el dropdown. No activa/desactiva el filtro.
    else {
        setShowFavoritesDropdown(prev => !prev);
        // Opcional: si quieres que el click en desktop también filtre, descomenta:
        // setShowFavorites(prev => !prev); 
    }
    setSearchTerm(''); // Limpiar búsqueda al interactuar con favoritos
  }, [isMobile]);

  const handleFavsButtonMouseEnter = useCallback(() => {
    // En desktop, el hover abre el dropdown si no está ya abierto por click
    if (!isMobile && !showFavoritesDropdown) {
      setShowFavoritesDropdown(true);
    }
  }, [isMobile, showFavoritesDropdown]);

  // Podríamos añadir onMouseLeave al contenedor del botón+dropdown para cerrarlo en desktop
  // const handleFavsContainerMouseLeave = useCallback(() => {
  //  if (!isMobile) {
  //    setShowFavoritesDropdown(false);
  //  }
  // }, [isMobile]);

  const handleCharacterClick = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setShowFavoritesDropdown(false); // Cerrar dropdown al seleccionar
  }, []);

  const handleFavoriteCharacterClick = useCallback((id: number) => {
    const character = characters.find(char => char.id === id);
    if (character) {
      setSelectedCharacter(character);
      setShowFavoritesDropdown(false); // Cerrar dropdown al seleccionar
    }
  }, [characters]);

  const handleRemoveFavorite = useCallback((id: number) => {
    const character = favoriteCharacters.find(char => char.id === id); // Buscar en favs para asegurar que existe
    if (character) {
      dispatch(toggleFavorite(character));
      // Opcional: si al quitar el último favorito quieres cerrar el dropdown
      // if (favoriteCharacters.length === 1) {
      //   setShowFavoritesDropdown(false);
      // }
    }
  }, [favoriteCharacters, dispatch]); // Dependencia actualizada a favoriteCharacters

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    if (gridRef.current) {
      const scrollAmount = 200; // Ajustar según sea necesario
      gridRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  // Efecto para detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (loading) return <div className={styles.loading}>Cargando personajes...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  // Los personajes a mostrar en la cuadrícula ya están filtrados
  const gridCharacters = filteredCharacters;

  return (
    <main className={`${styles.main} ${isMobile ? styles.mobileView : ''}`}>
      <div className={styles.logoContainer}>
        <Image
          src="/rick-and-morty-logo.png" // Asegúrate que la ruta es correcta desde /public
          alt="Rick and Morty Logo"
          width={280}
          height={90}
          className={styles.logo}
          priority // Priorizar carga del logo
        />
      </div>
      
      <div className={styles.contentContainer}>
        <div className={`${styles.mainContent} ${isMobile ? styles.mobileContent : ''}`}>
          {/* Panel izquierdo con el personaje seleccionado */}
          {/* No mostrar en mobile si estamos viendo la lista */}
          {(!isMobile || !showFavoritesDropdown) && (
             <SelectedCharacterPanel 
                character={selectedCharacter}
             />
          )}

          {/* Panel derecho con la cuadrícula y búsqueda */}
          {/* En mobile, podría ocultarse si se muestra el detalle */}
          <div className={styles.rightPanel}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder={isMobile ? "Buscar..." : "Find your character..."}
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="5.5" stroke="#5fd768" strokeWidth="2"/>
                  <line x1="13.5" y1="13.5" x2="16" y2="16" stroke="#5fd768" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
            
            {!isMobile && <Arrows onUp={() => handleScroll('up')} onDown={() => handleScroll('down')} />}
            
            <div className={styles.gridContainer} ref={gridRef}>
              {gridCharacters.length > 0 ? gridCharacters.map((character) => (
                <div 
                  key={character.id}
                  className={`${styles.gridItem} ${selectedCharacter?.id === character.id ? styles.selected : ''}`}
                >
                  <div className={styles.characterName}>{character.name.split(' ')[0]}</div>
                  <div 
                    className={styles.gridImageContainer}
                    onClick={() => handleCharacterClick(character)}
                    role="button" // Mejorar accesibilidad
                    tabIndex={0}  // Mejorar accesibilidad
                    onKeyPress={(e) => e.key === 'Enter' && handleCharacterClick(character)} // Accesibilidad teclado
                  >
                    {character.status === 'Alive' && (
                      <div className={styles.liveIndicatorGrid}>
                        <span className={styles.liveGrid}>VIVO</span>
                      </div>
                    )}
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={150}
                      height={150}
                      className={styles.gridImage}
                      loading="lazy" // Carga diferida para imágenes de la cuadrícula
                    />
                  </div>
                  <button 
                    className={styles.likeButton}
                    onClick={() => handleToggleFavorite(character)}
                    aria-label={`Like ${character.name}`} // Mejorar accesibilidad
                  >
                    <span className={favoriteCharacterIds.includes(character.id) ? styles.likeIcon : styles.likeIconEmpty} aria-hidden="true">
                      {favoriteCharacterIds.includes(character.id) ? '❤' : '♡'}
                    </span>
                    <span>Like</span>
                  </button>
                </div>
              )) : (
                <div className={styles.noResults}>
                    {showFavorites ? "No tienes favoritos todavía." : "No se encontraron personajes."}
                </div>
              )}
            </div>

            {/* Contenedor del botón y dropdown de Favoritos */}
            <div 
              className={styles.favButtonContainer} 
              ref={favButtonRef}
              // onMouseLeave={handleFavsContainerMouseLeave} // Descomentar si se usa onMouseLeave
            >
              <button 
                onClick={handleFavsButtonClick} 
                onMouseEnter={!isMobile ? handleFavsButtonMouseEnter : undefined} // Hover solo en desktop
                className={`${styles.favsButton} ${showFavorites || showFavoritesDropdown ? styles.active : ''}`}
                aria-haspopup="true" // Accesibilidad
                aria-expanded={showFavoritesDropdown} // Accesibilidad
              >
                {isMobile ? (showFavorites ? 'X' : 'FAVS') : (showFavorites ? 'FAVORITOS' : 'FAVS')}
              </button>
              <FavoritesDropdown 
                favorites={favoriteCharacters}
                onCharacterClick={handleFavoriteCharacterClick}
                onRemoveFavorite={handleRemoveFavorite}
                visible={showFavoritesDropdown}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer verde según diseño */}
      <div className={styles.footer}></div>
    </main>
  );
}