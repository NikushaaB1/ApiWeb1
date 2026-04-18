'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/movie';
import { getImageUrl, getRatingColor, getYear } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const delay = Math.min(index * 0.07, 0.5);
  const ratingColor = getRatingColor(movie.vote_average);

  return (
    <>

      <style>{`
        .poster-wrap-${movie.id} .poster-img {
          transition: transform 0.4s ease;
        }
        .movie-card-${movie.id}:hover .poster-img {
          transform: scale(1.06);
        }
      `}</style>

      <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
        <article
          className={`movie-card movie-card-${movie.id}`}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            opacity: 0,
            animation: `fadeUp 0.5s ease forwards`,
            animationDelay: `${delay}s`,
          }}
        >
          {/* პოსტერი */}
          <div
            className={`poster-wrap-${movie.id}`}
            style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}
          >
            <Image
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              fill
              className="poster-img"
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />

            
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(to top, rgba(5,5,10,0.95) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* რეიტინგი */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(5,5,10,0.85)',
                border: `1px solid ${ratingColor}`,
                borderRadius: '3px',
                padding: '3px 7px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                pointerEvents: 'none',
              }}
            >
              <span style={{ color: ratingColor, fontSize: '0.75rem' }}>★</span>
              <span
                style={{
                  color: ratingColor,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: 'Jost, sans-serif',
                }}
              >
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          
          <div style={{ padding: '0.75rem' }}>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '4px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {movie.title}
            </h3>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              {getYear(movie.release_date)}
            </p>
          </div>
        </article>
      </Link>
    </>
  );
}
