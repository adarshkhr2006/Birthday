import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass shadow-neon">
      <ul className="flex items-center gap-4 text-sm">
        <li>
          <Link
            to="/"
            className={`px-4 py-1 rounded-full transition-colors ${
              pathname === '/' ? 'bg-neonPink/20 text-neonPink' : 'hover:text-neonBlue'
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/message"
            className={`px-4 py-1 rounded-full transition-colors ${
              pathname === '/message' ? 'bg-neonBlue/20 text-neonBlue' : 'hover:text-neonPink'
            }`}
          >
            Dear Annu 💌
          </Link>
        </li>
      </ul>
    </nav>
  );
}

