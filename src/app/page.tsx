'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import SongCard from '@/components/SongCard';
import MusicPlayer from '@/components/MusicPlayer';
import LiquidBackground from '@/components/LiquidBackground';
import { songs, Song } from '@/data/music';
import { motion } from 'framer-motion';

// Data untuk section-section baru
const trendingSongs = [
  { title: 'Midnight Waves', artist: 'Luna Echo', plays: '2.4M', duration: '3:42' },
  { title: 'Digital Dreams', artist: 'Neon Pulse', plays: '1.8M', duration: '4:15' },
  { title: 'Cosmic Journey', artist: 'Star Drift', plays: '3.1M', duration: '5:23' },
  { title: 'Electric Soul', artist: 'Volt Mind', plays: '1.9M', duration: '3:58' },
  { title: 'Ocean Breeze', artist: 'Wave Rider', plays: '2.7M', duration: '4:32' },
];

const artists = [
  { name: 'Luna Echo', genre: 'Electronic', followers: '1.2M', image: 'LE' },
  { name: 'Neon Pulse', genre: 'Synthwave', followers: '890K', image: 'NP' },
  { name: 'Star Drift', genre: 'Ambient', followers: '2.1M', image: 'SD' },
  { name: 'Volt Mind', genre: 'Techno', followers: '756K', image: 'VM' },
  { name: 'Wave Rider', genre: 'Chill', followers: '1.5M', image: 'WR' },
  { name: 'Echo Storm', genre: 'Bass', followers: '980K', image: 'ES' },
];

const genres = [
  { name: 'Electronic', color: 'from-purple-500 to-pink-500', songs: '2.4K' },
  { name: 'Hip Hop', color: 'from-blue-500 to-purple-500', songs: '1.8K' },
  { name: 'Rock', color: 'from-red-500 to-orange-500', songs: '3.2K' },
  { name: 'Jazz', color: 'from-yellow-500 to-red-500', songs: '1.1K' },
  { name: 'Classical', color: 'from-green-500 to-blue-500', songs: '890' },
  { name: 'Pop', color: 'from-pink-500 to-purple-500', songs: '4.1K' },
];

// Data Pricing Plans (clean tanpa emoji)
const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for casual listeners',
    features: [
      'Limited skips (6 per hour)',
      'Shuffle play only',
      'Ads between songs',
      'Standard audio quality',
      'Mobile & web access'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60',
    popular: false
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    description: 'Unlimited music for individuals',
    features: [
      'Unlimited skips',
      'Play any song on-demand',
      'No ads interruption',
      'High-quality audio (320kbps)',
      'Offline downloads',
      'All devices access'
    ],
    buttonText: 'Start Premium',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white',
    popular: true
  },
  {
    name: 'Family',
    price: '$14.99',
    period: '/month',
    description: 'Music for the whole family',
    features: [
      'Everything in Premium',
      'Up to 6 family accounts',
      'Individual playlists',
      'Parental controls',
      'Family mix playlists',
      'Shared family library'
    ],
    buttonText: 'Choose Family',
    buttonStyle: 'border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60',
    popular: false
  }
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySong = (song: Song) => {
    const index = songs.findIndex(s => s.id === song.id);
    setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <main className="min-h-screen relative">
      <LiquidBackground />
      <Header />
      <HeroSection />
      <StatsSection />

      {/* DISCOVER SECTION - Genre Cards Bergradien */}
      <section id="discover" className="section-padding px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover
              </span>
              <span className="text-white"> New Sounds</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore genres and find your next favorite track
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`h-48 rounded-2xl bg-gradient-to-br ${genre.color} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{genre.name}</h3>
                    <p className="text-white/80">{genre.songs} songs</p>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section id="trending" className="section-padding px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Whats </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Trending
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The hottest tracks everyones listening to right now
            </p>
          </motion.div>

          <div className="space-y-4">
            {trendingSongs.map((song, index) => (
              <motion.div
                key={song.title}
                className="flex items-center gap-6 p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-purple-400 w-8">
                  #{index + 1}
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-purple-500 border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-white/60">{song.artist}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-white/80 font-medium">{song.plays} plays</p>
                  <p className="text-white/60">{song.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISTS SECTION */}
      <section id="artists" className="section-padding px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-white"> Artists</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the creators behind your favorite sounds
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative p-8 rounded-3xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                    {artist.image}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-purple-300 mb-4">{artist.genre}</p>
                    <p className="text-white/60">{artist.followers} followers</p>
                  </div>

                  <motion.button
                    className="w-full mt-6 py-3 rounded-full border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAYLIST SECTION - Music Library */}
      <section id="playlist" className="section-padding px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-white"> Playlists</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the latest liquid sounds and curated collections
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                isCurrentSong={currentSong?.id === song.id}
                onPlay={handlePlaySong}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION - Choose Your Sound */}
      <section className="section-padding px-4 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Choose Your </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sound
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Find the perfect plan that fits your music lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 group cursor-pointer ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-purple-900/40 to-pink-900/40 border-purple-400/60 scale-105' 
                    : 'bg-black/20 border-purple-500/20 hover:border-purple-400/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: plan.popular ? 1.08 : 1.05,
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors duration-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${plan.buttonStyle}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.buttonText}
                </motion.button>

                {/* Background Decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 mb-4">
              All plans include 30-day free trial • Cancel anytime • No hidden fees
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <span>Student discount available</span>
              <span>Gift cards accepted</span>
              <span>Multiple payment methods</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - Updated sesuai tema website */}
      <footer className="py-16 px-4 bg-gradient-to-t from-black/40 to-transparent border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  SoundWave
                </h3>
                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  Experience music like never before. Discover, stream, and connect with millions of songs from artists around the world.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/30 hover:border-purple-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-3">
                {['Discover Music', 'Top Charts', 'New Releases', 'Genres', 'Artists', 'Playlists'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Premium Support', 'Community', 'Bug Reports', 'Feature Requests'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-purple-500/20 pt-12 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-white mb-4">Stay in the Loop</h4>
              <p className="text-white/60 mb-6">Get the latest music updates, new releases, and exclusive content delivered to your inbox.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-black/30 border border-purple-400/30 text-white placeholder-white/50 focus:outline-none focus:border-purple-400/60 transition-colors"
                />
                <motion.button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-purple-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/50 text-sm">
                © 2024 SoundWave. All rights reserved.
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-white/50">
                <a href="#" className="hover:text-purple-300 transition-colors cursor-pointer">Privacy Policy</a>
                <a href="#" className="hover:text-purple-300 transition-colors cursor-pointer">Terms of Service</a>
                <a href="#" className="hover:text-purple-300 transition-colors cursor-pointer">Cookie Policy</a>
                <a href="#" className="hover:text-purple-300 transition-colors cursor-pointer">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* Hidden audio element for actual playback */}
      <audio ref={audioRef} />
    </main>
  );
}
