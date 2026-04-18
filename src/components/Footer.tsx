export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(212,169,48,0.12)',
        padding: '2rem 0',
        textAlign: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem',
            color: '#8a8598',
            letterSpacing: '0.05em',
          }}
        >
          ✦ კინო — ყველა მონაცემი{' '}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#d4a930' }}
          >
            TMDB
          </a>
          -ის მეშვეობისით
        </p>
        <p
          style={{
            fontSize: '0.75rem',
            color: '#3a3a50',
            marginTop: '0.5rem',
            fontFamily: 'Jost, sans-serif',
          }}
        >
          © {new Date().getFullYear()} კინო. ყველა უფლება დაცულია.
        </p>
      </div>
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          textAlign: 'center',
          opacity: 0.7,
        }}
      >
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8f9d8d...svg"
          alt="TMDb"
          width={120}
        />
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </footer>
  );
}

   

