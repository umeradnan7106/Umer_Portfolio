'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center">

      {/* Desktop Navbar */}
      <div className="hidden md:flex bg-black/20 backdrop-blur-md shadow-lg w-[600px] rounded-full px-6 py-3 justify-center items-center gap-4 pointer-events-auto transition-all duration-300">
      {navItems.map((item) => (
  <Link key={item.path} href={item.path} className="relative group">
    <span
      className={`px-5 py-2 rounded-full transition-all duration-300 ${
        pathname === item.path
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      {item.name}
    </span>
    {/* Subtle and centered underline */}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3/5 h-[3px] bg-blue-400 opacity-70 scale-x-1 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
  </Link>
))}

      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full flex justify-between items-center px-6 bg-blue-900/70 backdrop-blur-sm py-2 rounded-full shadow-lg max-w-[90%] mx-auto pointer-events-auto">
        <div className="text-white text-xl font-bold">Portfolio</div>
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none transition-transform duration-300"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[85%] bg-gray-900 text-white rounded-xl shadow-md py-6 px-4 z-50 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center space-y-4">
          {navItems.map((item) => (
            <li key={item.path} onClick={() => setIsOpen(false)}>
              <Link
                href={item.path}
                className={`text-lg font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
