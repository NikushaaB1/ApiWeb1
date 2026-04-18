import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMovieById, getPopularMovies, getImageUrl, getRatingColor, getYear } from '@/lib/tmdb';
import { genreNamesKa } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

// 1. ეს აუცილებელია სტატიკური ექსპორტისთვის (Export config)
export const dynamicParams = true; 

export async function generateStaticParams() {
  // სტატიკური ექსპორტის დროს აქ უნდა დაბრუნდეს იმ ფილმების ID-ები, 
  // რომელთა HTML-ის გენერირებაც გინდა build-ის დროს.
  // ცარიელი მასივი ნიშნავს, რომ ID-ებს დინამიურად დაამუშავებს.
  return []; 
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const movie = await getMovieById(Number(params.id));
    return {
      title: `${movie.title} — კინო`,
      description: movie.overview || movie.tagline,
    };
  } catch {
    return { title: 'ფილმი — კინო' };
  }
}

// ... (შენი დამხმარე ფუნქციები: formatRuntime, formatMoney - დატოვე ისე როგორც იყო)
function formatRuntime(min: number | null): string {
  if (!min) return 'უცნობი';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}სთ ${m}წთ`;
}

function formatMoney(amount: number): string {
  if (!amount) return 'უცნობი';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

export default async function MovieDetailPage({ params }: PageProps) {
  const movieId = Number(params.id);
  if (isNaN(movieId)) notFound();

  let movie;
  try {
    movie = await getMovieById(movieId);
  } catch {
    notFound();
  }

  const related = await getPopularMovies(1);
  const relatedMovies = related.results.filter((m) => m.id !== movieId).slice(0, 6);

  const ratingColor = getRatingColor(movie.vote_average);

  return (
    // აქ რჩება შენი მთლიანი JSX კოდი, რაც გქონდა
    <>
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        {movie.backdrop_path ? (
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        ) : (
          <div style={{ background: '#0a0a14', height: '100%' }} />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,5,10,0.3) 0%, rgba(5,5,10,0.6) 50%, #05050a 100%)',
          }}
        />
        <Link
          href="/movies"
          style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center',
            gap: '6px', color: 'rgba(240,236,224,0.8)', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem',
            textDecoration: 'none', background: 'rgba(5,5,10,0.5)', padding: '8px 14px',
            borderRadius: '2px', border: '1px solid rgba(212,169,48,0.2)', backdropFilter: 'blur(10px)',
          }}
        >
          ← ფილმები
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-4 sm:px-6 lg:px-8">
        {/* ... დანარჩენი შენი კოდი ... */}
        {/* (დატოვე მთელი შენი ქვედა HTML სტრუქტურა აქ) */}
      </div>
    </>
  );
}