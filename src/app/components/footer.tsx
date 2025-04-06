'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
  variants={{
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  }}
>

    <motion.footer
      className="relative bg-gray-950/80 backdrop-blur-md text-white py-12 px-6 shadow-inner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <motion.h1
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Umer Adnan
          </motion.h1>
          <p className="text-sm text-gray-400">Turning ideas into digital realities ✨</p>
        </div>

        {/* Navigation */}
        <ul className="flex gap-6 text-sm font-medium text-gray-300">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1, color: '#3b82f6' }}
              transition={{ duration: 0.3 }}
            >
              <a href={`#${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>
            </motion.li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex gap-4 text-xl">
          {[
            { icon: FaGithub, url: 'https://github.com/umeradnan7106' },
            { icon: FaLinkedin, url: 'https://www.linkedin.com/in/umer-adnan-a1b881291/' },
            { icon: FaEnvelope, url: 'mailto:umeradnan7106@gmail.com' },
          ].map(({ icon: Icon, url }, i) => (
            <motion.a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.2 }}
        className="absolute right-6 bottom-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
        title="Scroll to Top"
      >
        <FaArrowUp />
      </motion.button>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Umer Adnan. All rights reserved.
      </div>
    </motion.footer>
    </motion.section>
  );
};

export default Footer;
