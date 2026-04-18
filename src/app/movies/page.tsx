

import MoviesClient from '@/components/MoviesClient';
import { getPopularMovies, getGenres } from '@/lib/tmdb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ფილმები — კინო',
  description: 'ყველა ფილმის სია, ფილტრი და ძიება',
};

export default async function MoviesPage() {
  // სერვერ-საიდ data fetching
  const [moviesData, genres] = await Promise.all([
    getPopularMovies(1),
    getGenres(),
  ]);

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1rem 6rem',
      }}
      className="px-4 sm:px-6 lg:px-8"
    >
      {/* სათაური */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              color: '#d4a930',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            ◆ კატალოგი
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: '#f0ece0',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          ყველა ფილმი
        </h1>
        <p
          style={{
            color: '#8a8598',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.9rem',
            marginTop: '0.5rem',
          }}
        >
          გაფილტრე ჟანრის, რეიტინგის ან სახელის მიხედვით
        </p>
      </div>

      {/* Client Component — ფილტრი და გრიდი */}
      <MoviesClient
        initialMovies={moviesData.results}
        genres={genres}
      />
    </div>
  );
}
