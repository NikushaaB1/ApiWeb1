// Custom 404 — not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.8s ease forwards',
      }}
    >

      <div
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '8rem',
          color: 'rgba(212,169,48,0.08)',
          lineHeight: 1,
          marginBottom: '1rem',
          userSelect: 'none',
        }}
      >
        404
      </div>


      <div
        style={{
          color: '#d4a930',
          fontSize: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        ✦
      </div>

      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          color: '#f0ece0',
          marginBottom: '1rem',
        }}
      >
        გვერდი ვერ მოიძებნა
      </h1>

      <p
        style={{
          color: '#8a8598',
          fontFamily: 'Jost, sans-serif',
          fontSize: '1rem',
          maxWidth: '400px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        სამწუხაროდ, თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს.
        შეიძლება ფილმი წაშლილია ან URL არასწორია.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          className="btn-gold"
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '2px',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          <span>← მთავარი გვერდი</span>
        </Link>

        <Link
          href="/movies"
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '2px',
            border: '1px solid rgba(212,169,48,0.3)',
            color: '#d4a930',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
            fontFamily: 'Jost, sans-serif',
          }}
        >
          ფილმების სია
        </Link>
      </div>
    </div>
  );
}
