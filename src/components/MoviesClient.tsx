'use client';

import { useState, useEffect, useCallback } from 'react';
import MovieCard from '@/components/MovieCard';
import type { Movie, Genre, SortOption, FilterState } from '@/types/movie';
import { genreNamesKa } from '@/lib/tmdb';

interface MoviesClientProps {
  initialMovies: Movie[];
  genres: Genre[];
}


const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularity.desc', label: 'პოპულარობა' },
  { value: 'vote_average.desc', label: 'რეიტინგი' },
  { value: 'release_date.desc', label: 'ახალი' },
  { value: 'revenue.desc', label: 'შემოსავალი' },
];

export default function MoviesClient({ initialMovies, genres }: MoviesClientProps) {
  // ფილტრის მდგომარეობა
  const [filter, setFilter] = useState<FilterState>({
    genre: null,
    sort: 'popularity.desc',
    search: '',
  });


  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState('');

  // ძიების debounce (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(filter.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filter.search]);

  // API-დან ფილმების წამოღება ფილტრის ცვლილებისას
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      let url = '';
      const apiKey = '8265bd1679663a7ea12ac168da84d2e8';
      const base = 'https://api.themoviedb.org/3';

      if (searchDebounce.trim()) {
      
        url = `${base}/search/movie?api_key=${apiKey}&language=ka-GE&query=${encodeURIComponent(searchDebounce)}&page=1`;
      } else if (filter.genre) {
        
        url = `${base}/discover/movie?api_key=${apiKey}&language=ka-GE&with_genres=${filter.genre}&sort_by=${filter.sort}&page=1`;
      } else {
       
        url = `${base}/discover/movie?api_key=${apiKey}&language=ka-GE&sort_by=${filter.sort}&page=1&vote_count.gte=100`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch {
      console.error('ფილმების წამოღება ვერ მოხერხდა');
    } finally {
      setLoading(false);
    }
  }, [filter.genre, filter.sort, searchDebounce]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(212,169,48,0.12)',
          borderRadius: '4px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-end',
        }}
      >
        
        <div style={{ flex: '1 1 240px' }}>
          <label
            style={{
              display: 'block',
              color: '#8a8598',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            ძიება
          </label>
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
            placeholder="ფილმის სახელი..."
            className="search-input"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: '3px',
              fontSize: '0.9rem',
              fontFamily: 'Jost, sans-serif',
            }}
          />
        </div>

        
        <div style={{ flex: '1 1 200px' }}>
          <label
            style={{
              display: 'block',
              color: '#8a8598',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            ჟანრი
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={filter.genre ?? ''}
              onChange={(e) =>
                setFilter((f) => ({
                  ...f,
                  genre: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="select-gold"
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: '3px',
                fontSize: '0.9rem',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              <option value="">ყველა ჟანრი</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {genreNamesKa[g.id] || g.name}
                </option>
              ))}
            </select>
            <span
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d4a930',
                pointerEvents: 'none',
                fontSize: '0.7rem',
              }}
            >
              ▾
            </span>
          </div>
        </div>

       
        <div style={{ flex: '1 1 200px' }}>
          <label
            style={{
              display: 'block',
              color: '#8a8598',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              fontFamily: 'Jost, sans-serif',
            }}
          >
            დალაგება
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={filter.sort}
              onChange={(e) =>
                setFilter((f) => ({ ...f, sort: e.target.value as SortOption }))
              }
              className="select-gold"
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: '3px',
                fontSize: '0.9rem',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d4a930',
                pointerEvents: 'none',
                fontSize: '0.7rem',
              }}
            >
              ▾
            </span>
          </div>
        </div>

        
        {(filter.search || filter.genre || filter.sort !== 'popularity.desc') && (
          <button
            onClick={() => setFilter({ genre: null, sort: 'popularity.desc', search: '' })}
            style={{
              padding: '0.65rem 1.2rem',
              border: '1px solid rgba(212,169,48,0.3)',
              borderRadius: '3px',
              color: '#d4a930',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'Jost, sans-serif',
              letterSpacing: '0.05em',
              alignSelf: 'flex-end',
              transition: 'background 0.2s',
            }}
          >
            ✕ გასუფთავება
          </button>
        )}
      </div>

  
      {!loading && (
        <p
          style={{
            color: '#8a8598',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.82rem',
            marginBottom: '1.5rem',
            letterSpacing: '0.03em',
          }}
        >
          {movies.length} ფილმი ნაპოვნია
          {filter.search && ` — "${filter.search}"`}
        </p>
      )}


      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ borderRadius: '4px', aspectRatio: '2/3' }}
            />
          ))}
        </div>
      ) : movies.length === 0 ? (
  
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            color: '#8a8598',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: 0.3,
            }}
          >
            ✦
          </p>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.5rem',
              color: '#f0ece0',
              marginBottom: '0.5rem',
            }}
          >
            ფილმი ვერ მოიძებნა
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem' }}>
            სხვა საძიებო სიტყვა სცადეთ
          </p>
        </div>
      ) : (

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
