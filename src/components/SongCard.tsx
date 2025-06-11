'use client';

import { motion } from 'framer-motion';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { Song } from '@/data/music';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: (song: Song) => void;
  index: number;
}

export default function SongCard({ 
  song, 
  isPlaying, 
  isCurrentSong, 
  onPlay, 
  index 
}: SongCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group glass-effect rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer ${
        isCurrentSong ? 'ring-2 ring-blue-400' : ''
      }`}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => onPlay(song)}
    >
      <div className="relative">
        <motion.img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-4"
          whileHover={{ scale: 1.05 }}
        />
        
        <motion.div
          className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-black rounded-full p-3"
          >
            {isCurrentSong && isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </motion.button>
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-semibold truncate">{song.title}</h3>
        <p className="text-gray-300 text-sm truncate">{song.artist}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
            {song.genre}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{song.duration}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
