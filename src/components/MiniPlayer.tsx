'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, X, Music, TrendingUp, Award } from 'lucide-react';

interface MiniPlayerProps {
  currentSong: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  youtubePlayer: any;
  playerType: 'stream' | 'album';
  albumInfo?: {
    albumName: string;
    artist: string;
    cover: string;
    currentTrack: number;
    totalTracks: number;
  };
  streamInfo?: {
    rank: number;
    plays: string;
  };
}

export default function MiniPlayer({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
  youtubePlayer,
  playerType,
  albumInfo,
  streamInfo
}: MiniPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayer && typeof youtubePlayer.getCurrentTime === 'function') {
        try {
          const time = youtubePlayer.getCurrentTime();
          const dur = youtubePlayer.getDuration();
          setCurrentTime(time || 0);
          setDuration(dur || 0);
        } catch (error) {
          // Silent fail
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [youtubePlayer]);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (youtubePlayer && duration) {
      try {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        youtubePlayer.seekTo(newTime);
        setCurrentTime(newTime);
      } catch (error) {
        // Silent fail
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (youtubePlayer && typeof youtubePlayer.setVolume === 'function') {
      try {
        youtubePlayer.setVolume(newVolume);
      } catch (error) {
        // Silent fail
      }
    }
  };

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-purple-500/30 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Progress Bar */}
        <div className="relative h-1 bg-gray-800 cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          const fakeEvent = { target: { value: percent.toString() } } as any;
          handleSeek(fakeEvent);
        }}>
          <div
            className={`h-full transition-all duration-300 ${
              playerType === 'stream' 
                ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          {/* Song Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <motion.img
              src={albumInfo?.cover || currentSong.cover}
              alt={currentSong.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=♪';
              }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold truncate">{currentSong.title}</h3>
              <p className="text-gray-300 text-sm truncate">
                {albumInfo?.artist || currentSong.artist}
              </p>
              
              {/* ALBUM INFO DENGAN TRACK COUNTER */}
              {playerType === 'album' && albumInfo && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                    <Music size={12} className="text-purple-400" />
                    <span className="text-purple-300 text-xs font-medium">
                      {albumInfo.albumName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/20">
                    <div className="flex gap-1">
                      <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-white text-xs font-medium">
                      Track {albumInfo.currentTrack} of {albumInfo.totalTracks}
                    </span>
                  </div>
                </div>
              )}
              
              {/* STREAM INFO DENGAN RANK & PLAYS - TANPA POSITION COUNTER */}
              {playerType === 'stream' && streamInfo && (
                <div className="flex items-center gap-3 mt-2">
                  {/* Rank Badge dengan styling khusus */}
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                    streamInfo.rank === 1 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/30' 
                      : streamInfo.rank === 2 
                      ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
                      : streamInfo.rank === 3
                      ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30'
                      : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30'
                  }`}>
                    <Award size={12} className={
                      streamInfo.rank === 1 ? 'text-yellow-400' :
                      streamInfo.rank === 2 ? 'text-gray-300' :
                      streamInfo.rank === 3 ? 'text-amber-600' :
                      'text-red-400'
                    } />
                    <span className={`text-xs font-bold ${
                      streamInfo.rank === 1 ? 'text-yellow-400' :
                      streamInfo.rank === 2 ? 'text-gray-300' :
                      streamInfo.rank === 3 ? 'text-amber-600' :
                      'text-red-400'
                    }`}>
                      #{streamInfo.rank} Most Streamed
                    </span>
                  </div>
                  
                  {/* Stream Count Badge */}
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/20">
                    <TrendingUp size={12} className="text-red-400" />
                    <span className="text-white text-xs font-medium">
                      {streamInfo.plays} streams
                    </span>
                  </div>

                  {/* Playing Indicator - GANTI POSITION COUNTER */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-red-400/30">
                    <div className="flex gap-1">
                      <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-red-300 text-xs font-medium">
                      Now Streaming
                    </span>
                  </div>
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/60 hover:text-red-400 transition-colors p-2"
            >
              <Heart size={18} />
            </motion.button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-2 px-8">
            <div className="flex items-center gap-4">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full p-3 transition-colors shadow-lg ${
                  playerType === 'stream' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
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
            
            {/* Time Display */}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Progress Indicators - HANYA UNTUK ALBUM */}
            {playerType === 'album' && albumInfo && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-20 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-400 h-1 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(albumInfo.currentTrack / albumInfo.totalTracks) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-green-400 font-medium">
                  {Math.round((albumInfo.currentTrack / albumInfo.totalTracks) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Volume & Close */}
          <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
            <div className="flex items-center gap-2">
              <Volume2 size={18} className="text-white/60" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-white/60 w-8">{volume}%</span>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="text-white/60 hover:text-red-400 transition-colors p-2 rounded-full"
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
