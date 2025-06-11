'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-8 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
        
        {/* Content Kiri */}
        <div className="flex flex-col justify-center z-10">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-white">Feel the </span>
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              SoundWave
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Experience
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            Immerse yourself in a sonic universe where music flows like waves, 
            creating ripples of emotion through space and time.
          </motion.p>

          {/* Buttons Kiri */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          >
            <motion.button
              className="px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Listening
            </motion.button>
            
            <motion.button
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-purple-400/30 hover:border-purple-400/50 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-purple-200 hover:to-pink-200"
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Playlists
            </motion.button>
          </motion.div>
        </div>

        {/* Content Kanan - Music Visualizer */}
        <motion.div
          className="flex items-center justify-center z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Music Visualizer Bars */}
            <div className="flex items-end gap-2 h-64">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full"
                  animate={{
                    height: [
                      Math.random() * 100 + 50,
                      Math.random() * 150 + 100,
                      Math.random() * 100 + 50,
                    ],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-full"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
