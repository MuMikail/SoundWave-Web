'use client';
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import SongCard from '@/components/SongCard';
import MusicPlayer from '@/components/MusicPlayer';
import LiquidBackground from '@/components/LiquidBackground';
import { songs, Song } from '@/data/music';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, X } from 'lucide-react';
import YouTube from 'react-youtube';

const mostStreamSongs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    plays: '4.876B',
    duration: '3:24',
    rank: 1,
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
    youtubeId: 'fHI8X4OXluQ'
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    plays: '4.398B',
    duration: '3:51',
    rank: 2,
    cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    youtubeId: 'liTfD88dbCo'
  },
  {
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    plays: '3.933B',
    duration: '3:50',
    rank: 3,
    cover: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    youtubeId: 'plnfIj7dkJE'
  },
  {
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    plays: '3.931B',
    duration: '3:06',
    rank: 4,
    cover: 'https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2',
    youtubeId: 'zABLecsR5UE'
  },
  {
    title: 'As It Was',
    artist: 'Harry Styles',
    plays: '3.912B',
    duration: '2:45',
    rank: 5,
    cover: 'https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0',
    youtubeId: 'H5v3kku4y6Q'
  },
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
  { name: 'Electronic', color: 'from-purple-500 to-pink-500', music: '2.4K' }, // songs -> music
  { name: 'Hip Hop', color: 'from-blue-500 to-purple-500', music: '1.8K' },
  { name: 'Rock', color: 'from-red-500 to-orange-500', music: '3.2K' },
  { name: 'Jazz', color: 'from-yellow-500 to-red-500', music: '1.1K' },
  { name: 'Classical', color: 'from-green-500 to-blue-500', music: '890' },
  { name: 'Pop', color: 'from-pink-500 to-purple-500', music: '4.1K' },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for casual listeners',
    features: [
      'Limited skips (6 per hour)',
      'Shuffle play only',
      'Ads between music', // songs -> music
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
      'Play any music on-demand', // song -> music
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

// Mini Player Component untuk Most Stream Songs
function MiniPlayer({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  onClose,
  youtubePlayer
}: {
  currentSong: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  youtubePlayer: any;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(150);
  const [volume, setVolume] = useState(100);

  // Handle volume change untuk YouTube
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (youtubePlayer && youtubePlayer.setVolume) {
      youtubePlayer.setVolume(newVolume);
    }
  };

  // Update progress dari YouTube player
  useEffect(() => {
    if (isPlaying && youtubePlayer) {
      const interval = setInterval(() => {
        if (youtubePlayer.getCurrentTime && youtubePlayer.getDuration) {
          const current = youtubePlayer.getCurrentTime();
          const total = youtubePlayer.getDuration();
          
          if (current && total) {
            setCurrentTime(current);
            setDuration(total);
          }
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, youtubePlayer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle seek/scrub progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    if (youtubePlayer && youtubePlayer.seekTo) {
      youtubePlayer.seekTo(seekTime);
      setCurrentTime(seekTime);
    }
  };

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-purple-500/30 p-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Progress Bar - Clickable untuk seek */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 cursor-pointer group">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 transition-colors"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
               style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%`, marginLeft: '-6px' }} />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Song Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-14 h-14 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=♪';
                }}
              />
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </motion.div>

            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold truncate text-sm">
                {currentSong.title}
              </h3>
              <p className="text-white/60 text-xs truncate">
                {currentSong.artist}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/60 hover:text-red-400 transition-colors"
            >
              <Heart size={18} />
            </motion.button>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-4 px-8">
            <motion.button
              onClick={onPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </motion.button>

            <motion.button
              onClick={onPlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>

            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </motion.button>
          </div>

          {/* Right: Volume & Time */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <span className="text-xs text-white/60 hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-white/60" />
              <div className="relative group">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {volume}%
                </div>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // YouTube Player States
  const [currentStreamSong, setCurrentStreamSong] = useState<any>(null);
  const [isStreamPlaying, setIsStreamPlaying] = useState(false);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);

  // YouTube Player Options
  const youtubeOpts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Handle YouTube Player Ready
  const onYouTubeReady = (event: any) => {
    const player = event.target;
    setYoutubePlayer(player);
    
    // Set default volume setelah player ready
    setTimeout(() => {
      try {
        if (player && typeof player.setVolume === 'function') {
          player.setVolume(80);
        }
      } catch (error) {
        console.log('Volume setting failed:', error);
      }
    }, 500);
  };

  // Handle Play Stream Song
  const handlePlayStreamSong = (song: any, index: number) => {
    if (currentStreamSong?.title === song.title && isStreamPlaying) {
      // Pause current song
      try {
        youtubePlayer?.pauseVideo();
        setIsStreamPlaying(false);
      } catch (error) {
        console.log('Pause failed:', error);
      }
    } else {
      // Stop previous song if playing
      if (youtubePlayer && isStreamPlaying) {
        try {
          youtubePlayer.stopVideo();
        } catch (error) {
          console.log('Stop failed:', error);
        }
      }
      
      // Play new song
      setCurrentStreamSong(song);
      setCurrentStreamIndex(index);
      setShowPlayer(true);
      setIsStreamPlaying(true);
      
      // Load and play YouTube video
      setTimeout(() => {
        try {
          if (youtubePlayer && typeof youtubePlayer.loadVideoById === 'function') {
            youtubePlayer.loadVideoById(song.youtubeId);
          }
        } catch (error) {
          console.log('Load video failed:', error);
        }
      }, 100);
    }
  };

  // Handle YouTube State Change
  const onYouTubeStateChange = (event: any) => {
    if (event.data === 0) { // Video ended
      handleStreamNext(); // Auto next song
    } else if (event.data === 1) { // Playing
      setIsStreamPlaying(true);
    } else if (event.data === 2) { // Paused
      setIsStreamPlaying(false);
    }
  };

  // Stream Player Controls
  const handleStreamPlayPause = () => {
    if (isStreamPlaying) {
      youtubePlayer?.pauseVideo();
    } else {
      youtubePlayer?.playVideo();
    }
  };

  const handleStreamNext = () => {
    const nextIndex = (currentStreamIndex + 1) % mostStreamSongs.length;
    const nextSong = mostStreamSongs[nextIndex];
    handlePlayStreamSong(nextSong, nextIndex);
  };

  const handleStreamPrevious = () => {
    const prevIndex = currentStreamIndex === 0 ? mostStreamSongs.length - 1 : currentStreamIndex - 1;
    const prevSong = mostStreamSongs[prevIndex];
    handlePlayStreamSong(prevSong, prevIndex);
  };

  const handleCloseStreamPlayer = () => {
    try {
      youtubePlayer?.stopVideo();
      setCurrentStreamSong(null);
      setIsStreamPlaying(false);
      setShowPlayer(false);
    } catch (error) {
      console.log('Close player failed:', error);
    }
  };

  // Regular Song Player Functions
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
    <main className={`min-h-screen relative transition-all duration-300 ${
      currentStreamSong && showPlayer ? 'mb-24' : 'mb-0'
    }`}>
      <LiquidBackground />
      <Header />
      <HeroSection />
      <StatsSection />

      {/* DISCOVER SECTION - Genre Cards */}
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
              Explore genres and find your next favorite music
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
                    <p className="text-white/80">{genre.music} music</p> {/* songs -> music */}
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOST STREAM SECTION - All Time Hits */}
      <section id="most-stream" className="section-padding px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Most </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Stream
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The highest stream music of all time
            </p>
          </motion.div>

          <div className="space-y-4">
            {mostStreamSongs.map((song, index) => (
              <motion.div
                key={song.title}
                className="flex items-center gap-6 p-6 rounded-2xl bg-black/20 backdrop-blur-xl card-hover-bright transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Rank Number dengan styling khusus untuk top 3 */}
                <div className={`text-3xl font-bold w-12 text-center ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-300' :
                  index === 2 ? 'text-amber-600' :
                  'text-purple-400'
                }`}>
                  #{song.rank}
                </div>
                
                {/* Album Cover dengan Play Button Overlay */}
                <div 
                  className="relative group/cover cursor-pointer"
                  onClick={() => handlePlayStreamSong(song, index)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800">
                    <img
                      src={song.cover}
                      alt={`${song.title} cover`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/cover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=♪';
                      }}
                    />
                  </div>
                  
                  {/* Play/Pause Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      {currentStreamSong?.title === song.title && isStreamPlaying ? (
                        // Pause Icon
                        <div className="flex gap-1">
                          <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                          <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                        </div>
                      ) : (
                        // Play Icon
                        <div className="w-0 h-0 border-l-[8px] border-l-red-500 border-y-[6px] border-y-transparent ml-1"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Song Info */}
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold transition-colors flex items-center gap-2 ${
                    currentStreamSong?.title === song.title && isStreamPlaying 
                      ? 'text-red-400' 
                      : 'text-white group-hover:text-purple-300'
                  }`}>
                    {song.title}
                    {currentStreamSong?.title === song.title && isStreamPlaying && (
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    )}
                  </h3>
                  <p className="text-white/60">{song.artist}</p>
                </div>
                
                {/* Stream Count */}
                <div className="text-right">
                  <p className="text-white/80 font-bold text-lg">{song.plays}</p>
                  <p className="text-white/60 text-sm">streams</p>
                </div>

                {/* Duration */}
                <div className="text-white/60 text-sm">
                  {song.duration}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stream Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl card-hover-effect">
              <div className="text-3xl font-bold text-purple-400 mb-2">20.9B+</div>
              <div className="text-white/70">Total Streams</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl card-hover-effect">
              <div className="text-3xl font-bold text-pink-400 mb-2">5</div>
              <div className="text-white/70">Music</div> {/* music -> Music */}
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl card-hover-effect">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.8B+</div>
              <div className="text-white/70">Avg per Music</div> {/* music -> Music */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTISTS SECTION */}
      <section id="artists" className="section-padding px-4 bg-gradient-to-b from-transparent to-purple-900/10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 card-hover-bright h-full flex flex-col">
                  {/* Artist Avatar */}
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto flex-shrink-0">
                    {artist.image}
                  </div>
                  
                  {/* Artist Info */}
                  <div className="text-center mb-6 flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-white/60 mb-2 text-sm">{artist.genre}</p>
                    <p className="text-purple-400 font-semibold text-sm">{artist.followers} followers</p>
                  </div>

                  {/* Follow Button */}
                  <motion.button
                    className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60 hover:text-white flex-shrink-0"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)"
                    }}
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

      {/* FEATURED ALBUMS SECTION */}
      <section id="albums" className="section-padding px-4">
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
              <span className="text-white"> Albums</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the latest albums from your favorite artists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => handlePlaySong(song)}
              >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden card-hover-bright transition-all duration-300">
                  {/* Album Cover dengan Play Button Overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={song.cover}
                      alt={`${song.title} album cover`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=♪';
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-0 h-0 border-l-[20px] border-l-black border-y-[12px] border-y-transparent ml-1"></div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors truncate">
                      {song.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 truncate">
                      Album by {song.artist}
                    </p>
                    
                    {/* Album Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-white/50">
                          {Math.floor(Math.random() * 15 + 8)} music {/* songs -> music */}
                        </span>
                        <span className="text-white/50">
                          {Math.floor(Math.random() * 60 + 30)} min
                        </span>
                      </div>
                      
                      {/* Genre Badge */}
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {song.genre}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="section-padding px-4">
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
                Plan
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Unlock the full potential of your music experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-purple-400/50 scale-105'
                    : 'bg-black/20 backdrop-blur-xl card-hover-bright'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                  <p className="text-white/70">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                SoundWave
              </h3>
              <p className="text-white/60 mb-4">
                Experience music like never before with our cutting-edge streaming platform.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-colors">
                  <span className="text-purple-400">f</span>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-colors">
                  <span className="text-purple-400">t</span>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-colors">
                  <span className="text-purple-400">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/60 hover:text-purple-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p className="text-white/60">
              © 2025 Mikail. All rights reserved. Made with ❤️ for music lovers.
            </p>
          </div>
        </div>
      </footer>

      {/* HIDDEN YOUTUBE PLAYER */}
      {showPlayer && currentStreamSong && (
        <div className="fixed bottom-0 left-0 opacity-0 pointer-events-none">
          <YouTube
            videoId={currentStreamSong.youtubeId}
            opts={youtubeOpts}
            onReady={onYouTubeReady}
            onStateChange={onYouTubeStateChange}
          />
        </div>
      )}

      {/* MINI PLAYER untuk Most Stream Songs */}
      {currentStreamSong && showPlayer && (
        <MiniPlayer
          currentSong={currentStreamSong}
          isPlaying={isStreamPlaying}
          onPlayPause={handleStreamPlayPause}
          onNext={handleStreamNext}
          onPrevious={handleStreamPrevious}
          onClose={handleCloseStreamPlayer}
          youtubePlayer={youtubePlayer}
        />
      )}

      {/* REGULAR MUSIC PLAYER - For Album songs */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <audio ref={audioRef} />
    </main>
  );
}
