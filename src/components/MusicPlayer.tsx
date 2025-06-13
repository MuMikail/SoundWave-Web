'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Song } from '@/data/music';
import YouTube from 'react-youtube';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MusicPlayer({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious 
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);

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

  const onYouTubeReady = (event: any) => {
    setYoutubePlayer(event.target);
    event.target.setVolume(volume);
  };

  const onYouTubeStateChange = (event: any) => {
    if (event.data === 0) { // Video ended
      onNext();
    } else if (event.data === 1) { // Playing
      if (youtubePlayer) {
        setDuration(youtubePlayer.getDuration());
      }
    }
  };

  // Update progress
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

  // Handle play/pause
  useEffect(() => {
    if (youtubePlayer && currentSong) {
      if (isPlaying) {
        youtubePlayer.playVideo();
      } else {
        youtubePlayer.pauseVideo();
      }
    }
  }, [isPlaying, youtubePlayer]);

  // Load new song
  useEffect(() => {
    if (youtubePlayer && currentSong) {
      youtubePlayer.loadVideoById(currentSong.youtubeId); // Ganti dari audioUrl
    }
  }, [currentSong, youtubePlayer]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (youtubePlayer && duration) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      youtubePlayer.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (youtubePlayer) {
      youtubePlayer.setVolume(newVolume);
    }
  };

  if (!currentSong) return null;

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 p-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Hidden YouTube Player */}
      <div className="fixed bottom-0 left-0 opacity-0 pointer-events-none">
        <YouTube
          videoId={currentSong.youtubeId} // Ganti dari audioUrl
          opts={youtubeOpts}
          onReady={onYouTubeReady}
          onStateChange={onYouTubeStateChange}
        />
      </div>
      
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <motion.img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold truncate">{currentSong.title}</h3>
            <p className="text-gray-300 text-sm truncate">{currentSong.artist}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
          >
            <Heart size={20} />
          </motion.button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-2 flex-2 px-4">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <SkipBack size={24} />
            </motion.button>
            
            <motion.button
              onClick={onPlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <SkipForward size={24} />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
          <Volume2 size={20} className="text-gray-400 flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </motion.div>
  );
}
