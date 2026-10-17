
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../slice/loginSlice';
import { Menu, X, LogOut } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const login = useSelector((state) => state.login.token);

  const logout = () => {
    setMenuOpen(false);
    dispatch(logOut());
    navigate('/');
  };

  const navLinks = [
    { name: 'Browse', path: '/browse' },
    { name: 'Search Movie', path: '/search' },
    { name: 'My Account', path: '/account' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute left-0 top-0 z-[100] flex w-full items-center justify-between bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0))] px-3 py-5 text-white md:px-4 lg:px-10">

      {/* Netflix Logo */}
      <div className="relative z-[120] w-[150px] sm:w-[180px] lg:w-[200px]">
        <Link to="/" onClick={closeMenu}>
          <img
            src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVIENVPMEM3Kn4hVzJseX4N8xPjtBDIpwuFDucWksdxQZ8Ss6Xf8U_vt7ThYYfRmzq0x1CS3nOwTGyVrgADvwfB_tPiK_liS2RjvI40RJSzbKRk-o8b3nCxHfCCnBsyB2XBB9_vRoSmN.svg"
            alt="Netflix Logo"
            className="w-full"
          />
        </Link>
      </div>

      {login ? (
        <>
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="rounded bg-[#e50914] px-3 py-2 text-sm text-white transition hover:bg-red-700"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded bg-gray-700 px-3 py-2 text-sm text-white transition hover:bg-gray-600"
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[120] rounded p-2 text-white hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Background Overlay */}
          <div
            onClick={closeMenu}
            className={`fixed inset-0 z-[105] bg-black/70 transition-opacity duration-300 md:hidden ${
              menuOpen
                ? 'visible opacity-100'
                : 'invisible opacity-0'
            }`}
          />

          {/* Right-Side Sliding Menu */}
          <nav
            className={`fixed right-0 top-0 z-[110] flex h-dvh w-[280px] max-w-[85vw] flex-col gap-2 overflow-y-auto bg-[#141414] px-5 pb-8 pt-24 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <p className="mb-3 border-b border-white/10 px-4 pb-4 text-sm text-gray-400">
              Navigation
            </p>

            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-base text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={logout}
              className="mt-3 flex items-center gap-3 rounded-lg border-t border-white/10 px-4 py-4 text-left text-red-400 transition hover:bg-white/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </>
      ) : null}
    </header>
  );
}
