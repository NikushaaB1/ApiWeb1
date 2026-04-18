



import Image from 'next/image';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { getPopularMovies, getNowPlaying, getImageUrl, getRatingColor, getYear } from '@/lib/tmdb';
import type { Movie } from '@/types/movie';

export default async function HomePage() {

  const [popular, nowPlaying] = await Promise.all([
    getPopularMovies(1),
    getNowPlaying(),
  ]);

  // Hero-სთვის პირველი ფილმი
  const hero: Movie = popular.results[0];

  const topMovies: Movie[] = popular.results.slice(1, 9);

  const recentMovies: Movie[] = nowPlaying.results.slice(0, 6);

  return (
    <>      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        
        {hero.backdrop_path && (
          <Image
            src={getImageUrl(hero.backdrop_path, 'original')}
            alt={hero.title}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        )}

        
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(5,5,10,0.2) 0%, rgba(5,5,10,0.4) 40%, rgba(5,5,10,0.92) 80%, #05050a 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(5,5,10,0.8) 0%, transparent 60%)',
          }}
        />

        
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          style={{ paddingBottom: '5rem', animation: 'fadeUp 0.8s ease forwards' }}
        >
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(212,169,48,0.12)',
              border: '1px solid rgba(212,169,48,0.3)',
              borderRadius: '2px',
              padding: '4px 12px',
              marginBottom: '1rem',
            }}
          >
            <span style={{ color: '#d4a930', fontSize: '0.7rem' }}>◆</span>
            <span
              style={{
                color: '#d4a930',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 500,
              }}
            >
              ახლა პოპულარული
            </span>
          </div>

          
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: '#f0ece0',
              maxWidth: '700px',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            {hero.title}
          </h1>

          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '1.2rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                color: getRatingColor(hero.vote_average),
                fontFamily: 'Jost, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              ★ {hero.vote_average.toFixed(1)}
            </span>
            <span
              style={{
                width: '1px',
                height: '14px',
                background: 'rgba(212,169,48,0.3)',
              }}
            />
            <span
              style={{
                color: '#8a8598',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.9rem',
              }}
            >
              {getYear(hero.release_date)}
            </span>
          </div>

          
          <p
            style={{
              color: 'rgba(240,236,224,0.7)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '1rem',
              maxWidth: '520px',
              lineHeight: 1.7,
              marginBottom: '2rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {hero.overview || 'ფილმის შესახებ ინფორმაცია არ არის ხელმისაწვდომი.'}
          </p>

          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href={`/movies/${hero.id}`}
              className="btn-gold"
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '2px',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              <span>დეტალები →</span>
            </Link>
            <Link
              href="/movies"
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '2px',
                border: '1px solid rgba(212,169,48,0.4)',
                color: '#d4a930',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.3s, border-color 0.3s',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              ყველა ფილმი
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{ padding: '5rem 0', maxWidth: '1280px', margin: '0 auto' }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            className="gold-line"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: '#f0ece0',
              letterSpacing: '0.01em',
            }}
          >
            პოპულარული
          </h2>
          <p
            style={{
              color: '#8a8598',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              marginTop: '0.5rem',
              letterSpacing: '0.05em',
            }}
          >
            ამ კვირის ყველაზე პოპულარული ფილმები
          </p>
        </div>

       
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {topMovies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>

   
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            href="/movies"
            className="btn-gold"
            style={{
              padding: '0.8rem 2.5rem',
              borderRadius: '2px',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            <span>ყველა ფილმის ნახვა →</span>
          </Link>
        </div>
      </section>

      <section
        style={{
          padding: '5rem 0',
          background: 'rgba(212,169,48,0.03)',
          borderTop: '1px solid rgba(212,169,48,0.08)',
          borderBottom: '1px solid rgba(212,169,48,0.08)',
        }}
      >
        <div
          style={{ maxWidth: '1280px', margin: '0 auto' }}
          className="px-4 sm:px-6 lg:px-8"
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              className="gold-line"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 400,
                color: '#f0ece0',
              }}
            >
              ახლა კინოში
            </h2>
            <p
              style={{
                color: '#8a8598',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                letterSpacing: '0.05em',
              }}
            >
              ამ მომენტში კინოებში მიმდინარე ფილმები
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {recentMovies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
