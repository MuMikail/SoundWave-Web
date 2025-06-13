'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'Discover', href: '#discover' },
  { name: 'Most Stream ', href: '#most-stream' },
  { name: 'Artists', href: '#artists' },
  { name: 'Albums', href: '#albums' },
];

export default function Header() {
  const [activeItem, setActiveItem] = useState('Discover');

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveItem(item.name);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="grid grid-cols-3 items-center w-full">
        
        <motion.div
          className="justify-self-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 blur-md opacity-50 -z-10"></div>
            </div>
            
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              SoundWave
            </span>
          </motion.div>
        </motion.div>

        <motion.nav
          className="justify-self-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-8 py-4 rounded-full bg-black/20 backdrop-blur-xl border border-purple-500/20 shadow-2xl bg-gradient-to-r from-purple-600/10 via-purple-500/10 to-pink-500/10">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeItem === item.name
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => handleNavClick(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeItem === item.name && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                    layoutId="activeBackground"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
                
                <span className={`relative z-10 ${
                  activeItem === item.name 
                    ? 'text-white font-semibold' 
                    : 'bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-purple-200 hover:to-pink-200'
                }`}>
                  {item.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.nav>

        <motion.div
          className="justify-self-end flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.button
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-black/20 backdrop-blur-xl border border-purple-400/30 hover:border-purple-400/50 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-purple-200 hover:to-pink-200 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          
          <motion.button
            className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
