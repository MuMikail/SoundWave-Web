"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import SongCard from "@/components/SongCard";
import MusicPlayer from "@/components/MusicPlayer";
import MiniPlayer from "@/components/MiniPlayer";
import LiquidBackground from "@/components/LiquidBackground";
import { songs, Song } from "@/data/music";
import { motion } from "framer-motion";
import YouTube from "react-youtube";

const mostStreamSongs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    plays: "4.876B",
    duration: "3:20",
    rank: 1,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    youtubeId: "fHI8X4OXluQ",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    plays: "4.398B",
    duration: "3:53",
    rank: 2,
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    youtubeId: "JGwWNGJdvx8",
  },
  {
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    plays: "3.933B",
    duration: "3:50",
    rank: 3,
    cover: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    youtubeId: "dqt8Z1k0oWQ",
  },
  {
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    plays: "3.931B",
    duration: "3:02",
    rank: 4,
    cover: "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
    youtubeId: "zABLecsR5UE",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    plays: "3.912B",
    duration: "2:47",
    rank: 5,
    cover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
    youtubeId: "H5v3kku4y6Q",
  },
];

const artists = [
  { name: "Luna Echo", genre: "Electronic", followers: "1.2M", image: "LE" },
  { name: "Neon Pulse", genre: "Synthwave", followers: "890K", image: "NP" },
  { name: "Star Drift", genre: "Ambient", followers: "2.1M", image: "SD" },
  { name: "Volt Mind", genre: "Techno", followers: "756K", image: "VM" },
  { name: "Wave Rider", genre: "Chill", followers: "1.5M", image: "WR" },
  { name: "Echo Storm", genre: "Bass", followers: "980K", image: "ES" },
];

const genres = [
  { name: "Electronic", color: "from-purple-500 to-pink-500", songs: "2.4K" },
  { name: "Hip Hop", color: "from-blue-500 to-purple-500", songs: "1.8K" },
  { name: "Rock", color: "from-red-500 to-orange-500", songs: "3.2K" },
  { name: "Jazz", color: "from-yellow-500 to-red-500", songs: "1.1K" },
  { name: "Classical", color: "from-green-500 to-blue-500", songs: "890" },
  { name: "Pop", color: "from-pink-500 to-purple-500", songs: "4.1K" },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for casual listeners",
    features: [
      "Limited skips (6 per hour)",
      "Shuffle play only",
      "Ads between songs",
      "Standard audio quality",
      "Mobile & web access",
    ],
    buttonText: "Get Started",
    buttonStyle:
      "border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Unlimited music for individuals",
    features: [
      "Unlimited skips",
      "Play any song on-demand",
      "No ads interruption",
      "High-quality audio (320kbps)",
      "Offline downloads",
      "All devices access",
    ],
    buttonText: "Start Premium",
    buttonStyle:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white",
    popular: true,
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/month",
    description: "Music for the whole family",
    features: [
      "Everything in Premium",
      "Up to 6 family accounts",
      "Individual playlists",
      "Parental controls",
      "Family mix playlists",
      "Shared family library",
    ],
    buttonText: "Choose Family",
    buttonStyle:
      "border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60",
    popular: false,
  },
];

// Data Albums - JANGAN UBAH YOUTUBE ID
const albumsData = [
  {
    id: 1,
    albumName: "1989",
    artist: "Taylor Swift",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png",
    genre: "Pop/Synth-pop",
    totalTracks: 6,
    totalDuration: "48 min",
    tracks: [
      {
        title: "Welcome To New York",
        youtubeId: "RvYysauPsMc",
        duration: "3:32",
      },
      { title: "Blank Space", youtubeId: "uHpcbSsPrRE", duration: "3:51" },
      { title: "Style", youtubeId: "XAVLUYDtCCw", duration: "3:51" },
      { title: "Out Of The Woods", youtubeId: "gp1MR2WAAXY", duration: "3:55" },
      { title: "Shake It Off", youtubeId: "8xG7mH8i-WE", duration: "3:39" },
      { title: "Bad Blood", youtubeId: "6GiQIh8CfTE", duration: "3:31" },
    ],
  },
  {
    id: 2,
    albumName: "Purpose",
    artist: "Justin Bieber",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png",
    genre: "Pop/R&B",
    totalTracks: 6,
    totalDuration: "58 min",
    tracks: [
      {
        title: "What Do You Mean?",
        youtubeId: "NywWB67Z7zQ",
        duration: "3:26",
      },
      { title: "Sorry", youtubeId: "8ELbX5CMomE", duration: "3:20" },
      { title: "Love Yourself", youtubeId: "HDe7GYpxq9g", duration: "3:53" },
      { title: "Company", youtubeId: "gdx7gN1UyX0", duration: "3:28" },
      { title: "No Pressure", youtubeId: "f5tCvZcScZQ", duration: "3:11" },
      { title: "Children", youtubeId: "Jb6yCP6u7ac", duration: "3:46" },
    ],
  },
  {
    id: 3,
    albumName: "÷ (Divide)",
    artist: "Ed Sheeran",
    cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
    genre: "Pop/Folk",
    totalTracks: 6,
    totalDuration: "59 min",
    tracks: [
      { title: "Eraser", youtubeId: "OjGrcJ4lZCc", duration: "3:47" },
      {
        title: "Castle on the Hill",
        youtubeId: "7Qp5vcuMIlk",
        duration: "4:21",
      },
      { title: "Dive", youtubeId: "Wv2rLZmbPMA", duration: "3:58" },
      { title: "Shape of You", youtubeId: "liTfD88dbCo", duration: "3:53" },
      { title: "Perfect", youtubeId: "cNGjD0VG4R8", duration: "4:23" },
      { title: "Galway Girl", youtubeId: "XjHr-6Zl5P8", duration: "2:50" },
    ],
  },
  {
    id: 4,
    albumName: "24K Magic",
    artist: "Bruno Mars",
    cover: "https://i.scdn.co/image/ab67616d0000b273f6b55ca93bd33211227b502b",
    genre: "Pop/Funk",
    totalTracks: 6,
    totalDuration: "33 min",
    tracks: [
      { title: "24K Magic", youtubeId: "UqyT8IEBkvY", duration: "3:46" },
      { title: "Chunky", youtubeId: "oacaq_1TkMU", duration: "3:06" },
      { title: "Perm", youtubeId: "ftXmvnL0ZOc", duration: "3:30" },
      {
        title: "That's What I Like",
        youtubeId: "PMivT7MJ41M",
        duration: "3:26",
      },
      {
        title: "Versace on the Floor",
        youtubeId: "3JbmE3jjCSk",
        duration: "4:21",
      },
      {
        title: "Straight Up & Down",
        youtubeId: "2iAsddrkJSs",
        duration: "3:16",
      },
    ],
  },
  {
    id: 5,
    albumName: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png",
    genre: "Alternative/Pop",
    totalTracks: 6,
    totalDuration: "43 min",
    tracks: [
      { title: "bad guy", youtubeId: "4-TbQnONe_w", duration: "3:14" },
      { title: "xanny", youtubeId: "KYdb5sFhoKY", duration: "4:04" },
      {
        title: "you should see me in a crown",
        youtubeId: "Ah0Ys50CqO8",
        duration: "3:00",
      },
      {
        title: "all the good girls go to hell",
        youtubeId: "vmMqFCyfPLo",
        duration: "2:49",
      },
      {
        title: "wish you were gay",
        youtubeId: "yaJx0Gj_LCY",
        duration: "3:42",
      },
      {
        title: "when the party's over",
        youtubeId: "pbMwTqkKSps",
        duration: "3:16",
      },
    ],
  },
  {
    id: 6,
    albumName: "Scorpion",
    artist: "Drake",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg",
    genre: "Hip Hop/R&B",
    totalTracks: 6,
    totalDuration: "90 min",
    tracks: [
      { title: "God's Plan", youtubeId: "xpVfcZ0ZcFM", duration: "3:19" },
      { title: "Nice For What", youtubeId: "U9BwWKXjVaI", duration: "3:30" },
      { title: "Nonstop", youtubeId: "QVqS3tB8OtE", duration: "3:58" },
      { title: "In My Feelings", youtubeId: "SD1tkI5-3dI", duration: "3:37" },
      {
        title: "Don't Matter To Me",
        youtubeId: "EQHnjOHvcpg",
        duration: "4:05",
      },
      { title: "Emotionless", youtubeId: "w4MSbajRs_Y", duration: "5:02" },
    ],
  },
  {
    id: 7,
    albumName: "25",
    artist: "Adele",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/96/Adele_-_25_%28Official_Album_Cover%29.png",
    genre: "Pop/Soul",
    totalTracks: 6,
    totalDuration: "48 min",
    tracks: [
      { title: "Hello", youtubeId: "tDVMhFQXFIQ", duration: "4:55" },
      {
        title: "Send My Love (To Your New Lover)",
        youtubeId: "fk4BbF7B29w",
        duration: "3:43",
      },
      { title: "I Miss You", youtubeId: "9Y06jakOV_g", duration: "5:48" },
      {
        title: "When We Were Young",
        youtubeId: "a1IuJLebHgM",
        duration: "4:51",
      },
      { title: "Remedy", youtubeId: "fsCc7Be1H0", duration: "4:05" },
      {
        title: "Water Under the Bridge",
        youtubeId: "NgNqpsWE-o0",
        duration: "4:00",
      },
    ],
  },
  {
    id: 8,
    albumName: "Future Nostalgia",
    artist: "Dua Lipa",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
    genre: "Pop/Disco",
    totalTracks: 6,
    totalDuration: "37 min",
    tracks: [
      { title: "Future Nostalgia", youtubeId: "8EJ-vZyBzOQ", duration: "3:04" },
      { title: "Don't Start Now", youtubeId: "oygrmJFKYZY", duration: "3:03" },
      { title: "Cool", youtubeId: "uY8tAKDVxK8", duration: "3:29" },
      { title: "Physical", youtubeId: "SECICUOWPRc", duration: "3:13" },
      { title: "Levitating", youtubeId: "OTsxpG5zsD0", duration: "3:23" },
      { title: "Pretty Please", youtubeId: "ylzhMn6MlVc", duration: "3:15" },
    ],
  },
];

export default function Home() {
  // Regular Song Player States
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Stream Player States
  const [currentStreamSong, setCurrentStreamSong] = useState<any>(null);
  const [isStreamPlaying, setIsStreamPlaying] = useState(false);
  const [youtubeStreamPlayer, setYoutubeStreamPlayer] = useState<any>(null);
  const [showStreamPlayer, setShowStreamPlayer] = useState(false);

  // Album Player States
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumTrack, setCurrentAlbumTrack] = useState<any>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isAlbumPlaying, setIsAlbumPlaying] = useState(false);
  const [youtubeAlbumPlayer, setYoutubeAlbumPlayer] = useState<any>(null);
  const [showAlbumPlayer, setShowAlbumPlayer] = useState(false);

  // YouTube Player Options
  const youtubeOpts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // ALBUM PLAYER HANDLERS
  const onYouTubeAlbumReady = (event: any) => {
    setYoutubeAlbumPlayer(event.target);
  };

  const handlePlayAlbum = (album: any, trackIndex: number = 0) => {
    // Stop other players
    if (youtubeStreamPlayer && isStreamPlaying) {
      youtubeStreamPlayer.stopVideo();
      setCurrentStreamSong(null);
      setIsStreamPlaying(false);
      setShowStreamPlayer(false);
    }

    if (currentSong) {
      setCurrentSong(null);
      setIsPlaying(false);
    }

    // Start album
    const track = album.tracks[trackIndex];
    setCurrentAlbum(album);
    setCurrentAlbumTrack(track);
    setCurrentTrackIndex(trackIndex);
    setShowAlbumPlayer(true);
    setIsAlbumPlaying(true);

    setTimeout(() => {
      if (youtubeAlbumPlayer) {
        youtubeAlbumPlayer.loadVideoById(track.youtubeId);
      }
    }, 100);
  };

  const onYouTubeAlbumStateChange = (event: any) => {
    if (event.data === 0) {
      // Video ended
      handleAlbumNext(); // Auto play next track
    } else if (event.data === 1) {
      setIsAlbumPlaying(true);
    } else if (event.data === 2) {
      setIsAlbumPlaying(false);
    }
  };

  const handleAlbumPlayPause = () => {
    if (isAlbumPlaying) {
      youtubeAlbumPlayer?.pauseVideo();
      setIsAlbumPlaying(false);
    } else {
      youtubeAlbumPlayer?.playVideo();
      setIsAlbumPlaying(true);
    }
  };

  const handleAlbumNext = () => {
    if (!currentAlbum) return;

    let nextTrackIndex = currentTrackIndex + 1;
    let nextAlbum = currentAlbum;

    // If reached end of album, go to next album
    if (nextTrackIndex >= currentAlbum.tracks.length) {
      const currentAlbumIndex = albumsData.findIndex(
        (a) => a.id === currentAlbum.id
      );
      const nextAlbumIndex = (currentAlbumIndex + 1) % albumsData.length;
      nextAlbum = albumsData[nextAlbumIndex];
      nextTrackIndex = 0;
    }

    handlePlayAlbum(nextAlbum, nextTrackIndex);
  };

  const handleAlbumPrevious = () => {
    if (!currentAlbum) return;

    let prevTrackIndex = currentTrackIndex - 1;
    let prevAlbum = currentAlbum;

    // If at beginning of album, go to previous album's last track
    if (prevTrackIndex < 0) {
      const currentAlbumIndex = albumsData.findIndex(
        (a) => a.id === currentAlbum.id
      );
      const prevAlbumIndex =
        currentAlbumIndex === 0 ? albumsData.length - 1 : currentAlbumIndex - 1;
      prevAlbum = albumsData[prevAlbumIndex];
      prevTrackIndex = prevAlbum.tracks.length - 1;
    }

    handlePlayAlbum(prevAlbum, prevTrackIndex);
  };

  const handleCloseAlbumPlayer = () => {
    youtubeAlbumPlayer?.stopVideo();
    setCurrentAlbum(null);
    setCurrentAlbumTrack(null);
    setIsAlbumPlaying(false);
    setShowAlbumPlayer(false);
  };

  // STREAM PLAYER HANDLERS
  const onYouTubeStreamReady = (event: any) => {
    setYoutubeStreamPlayer(event.target);
  };

  const handlePlayStreamSong = (song: any, index: number) => {
    if (currentStreamSong?.title === song.title && isStreamPlaying) {
      youtubeStreamPlayer?.pauseVideo();
      setIsStreamPlaying(false);
    } else {
      // Stop other players
      if (youtubeStreamPlayer && isStreamPlaying) {
        youtubeStreamPlayer.stopVideo();
      }

      if (currentAlbum) {
        handleCloseAlbumPlayer();
      }

      setCurrentSong(null);
      setIsPlaying(false);

      setCurrentStreamSong(song);
      setShowStreamPlayer(true);
      setIsStreamPlaying(true);

      setTimeout(() => {
        if (youtubeStreamPlayer) {
          youtubeStreamPlayer.loadVideoById(song.youtubeId);
        }
      }, 100);
    }
  };

  const onYouTubeStreamStateChange = (event: any) => {
    if (event.data === 0) {
      setIsStreamPlaying(false);
      setCurrentStreamSong(null);
      setShowStreamPlayer(false);
    } else if (event.data === 1) {
      setIsStreamPlaying(true);
    } else if (event.data === 2) {
      setIsStreamPlaying(false);
    }
  };

  // REGULAR PLAYER HANDLERS
  const handlePlaySong = (song: Song) => {
    // Stop other players
    if (currentAlbum) {
      handleCloseAlbumPlayer();
    }

    if (youtubeStreamPlayer && isStreamPlaying) {
      youtubeStreamPlayer.stopVideo();
      setCurrentStreamSong(null);
      setIsStreamPlaying(false);
      setShowStreamPlayer(false);
    }

    const index = songs.findIndex((s) => s.id === song.id);
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

      {/* DISCOVER SECTION */}
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
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {/* TAMBAH BORDER WRAPPER SEPERTI ARTISTS */}
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-400/30 transition-all duration-300 overflow-hidden">
                  <div
                    className={`h-48 bg-gradient-to-br ${genre.color} p-6 flex flex-col justify-between relative overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {genre.name}
                      </h3>
                      <p className="text-white/80">{genre.songs} songs</p>
                    </div>

                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOST STREAM SECTION */}
      <section
        id="most-stream"
        className="section-padding px-4 bg-gradient-to-b from-transparent to-purple-900/10"
      >
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
              The legendary tracks with the highest stream counts of all time
            </p>
          </motion.div>

          <div className="space-y-4">
            {mostStreamSongs.map((song, index) => (
              <motion.div
                key={song.title}
                className="flex items-center gap-6 p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-400/30 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div
                  className={`text-3xl font-bold w-12 text-center ${
                    index === 0
                      ? "text-yellow-400"
                      : index === 1
                      ? "text-gray-300"
                      : index === 2
                      ? "text-amber-600"
                      : "text-purple-400"
                  }`}
                >
                  #{song.rank}
                </div>

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
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=♪";
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      {currentStreamSong?.title === song.title &&
                      isStreamPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                          <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-[8px] border-l-red-500 border-y-[6px] border-y-transparent ml-1"></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold transition-colors flex items-center gap-2 ${
                      currentStreamSong?.title === song.title && isStreamPlaying
                        ? "text-red-400"
                        : "text-white group-hover:text-purple-300"
                    }`}
                  >
                    {song.title}
                    {currentStreamSong?.title === song.title &&
                      isStreamPlaying && (
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse"></div>
                          <div
                            className="w-1 h-3 bg-red-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-1 h-3 bg-red-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      )}
                  </h3>
                  <p className="text-white/60">{song.artist}</p>
                </div>

                <div className="text-right">
                  <p className="text-white/80 font-bold text-lg">
                    {song.plays}
                  </p>
                  <p className="text-white/60 text-sm">streams</p>
                </div>

                <div className="text-white/60 text-sm">{song.duration}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                20.9B+
              </div>
              <div className="text-white/70">Total Stream</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300">
              <div className="text-3xl font-bold text-pink-400 mb-2">5</div>
              <div className="text-white/70">Legendary Song</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                4.8B+
              </div>
              <div className="text-white/70">Avg per Song</div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ARTISTS SECTION */}
      <section
        id="artists"
        className="section-padding px-4 bg-gradient-to-b from-transparent to-purple-900/10"
      >
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
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-400/30 transition-all duration-300 h-full flex flex-col">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto flex-shrink-0">
                    {artist.image}
                  </div>

                  <div className="text-center mb-6 flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-white/60 mb-2 text-sm">{artist.genre}</p>
                    <p className="text-purple-400 font-semibold text-sm">
                      {artist.followers} followers
                    </p>
                  </div>

                  <motion.button
                    className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60 hover:text-white flex-shrink-0"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
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
              Discover complete musical journeys from your favorite artists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {albumsData.map((album, index) => (
              <motion.div
                key={album.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                  {/* Album Cover dengan Play Button Overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={album.cover}
                      alt={`${album.albumName} album cover`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=♪";
                      }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePlayAlbum(album, 0)}
                      >
                        {currentAlbum?.id === album.id && isAlbumPlaying ? (
                          <div className="flex gap-1">
                            <div className="w-2 h-6 bg-black rounded-full"></div>
                            <div className="w-2 h-6 bg-black rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-0 h-0 border-l-[20px] border-l-black border-y-[12px] border-y-transparent ml-1"></div>
                        )}
                      </motion.button>
                    </div>

                    {/* Currently Playing Indicator - HANYA BADGE KECIL */}
                    {currentAlbum?.id === album.id && isAlbumPlaying && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Playing
                      </div>
                    )}
                  </div>

                  {/* Album Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors truncate">
                      {album.albumName}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 truncate">
                      by {album.artist}
                    </p>

                    {/* Album Stats */}
                    <div className="flex items-center justify-between text-xs mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-white/50">
                          {album.totalTracks} tracks
                        </span>
                        <span className="text-white/50">
                          {album.totalDuration}
                        </span>
                      </div>

                      {/* Genre Badge */}
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {album.genre}
                      </span>
                    </div>

                    {/* HAPUS KOTAK UNGU ALBUM PROGRESS - TIDAK PERLU LAGI */}

                    {/* Play Album Button */}
                    <motion.button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                        currentAlbum?.id === album.id && isAlbumPlaying
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePlayAlbum(album, 0)}
                    >
                      {currentAlbum?.id === album.id && isAlbumPlaying ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          Playing Album
                        </span>
                      ) : (
                        "Play Album"
                      )}
                    </motion.button>
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
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-purple-300/60 hover:border-purple-200/80 hover:shadow-xl hover:shadow-purple-400/40 scale-105"
                    : "bg-black/20 backdrop-blur-xl border border-purple-500/20 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-400/30"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: plan.popular ? 1.05 : 1.02,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                  <p className="text-white/70">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.buttonStyle}`}
                >
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
                Experience music like never before with our cutting-edge
                streaming platform.
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
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Mikail. All rights reserved. Made with ❤️ for music
              lovers.
            </p>
          </div>
        </div>
      </footer>

      {/* HIDDEN YOUTUBE PLAYERS */}
      {/* Stream Player */}
      {showStreamPlayer && currentStreamSong && (
        <div className="fixed bottom-0 left-0 opacity-0 pointer-events-none">
          <YouTube
            videoId={currentStreamSong.youtubeId}
            opts={youtubeOpts}
            onReady={onYouTubeStreamReady}
            onStateChange={onYouTubeStreamStateChange}
          />
        </div>
      )}

      {/* Album Player */}
      {showAlbumPlayer && currentAlbumTrack && (
        <div className="fixed bottom-0 left-0 opacity-0 pointer-events-none">
          <YouTube
            videoId={currentAlbumTrack.youtubeId}
            opts={youtubeOpts}
            onReady={onYouTubeAlbumReady}
            onStateChange={onYouTubeAlbumStateChange}
          />
        </div>
      )}

      {/* STREAM MINI PLAYER - CLEAN VERSION */}
      {currentStreamSong && isStreamPlaying && !currentAlbum && (
        <MiniPlayer
          currentSong={currentStreamSong}
          isPlaying={isStreamPlaying}
          onPlayPause={() => handlePlayStreamSong(currentStreamSong, 0)}
          onNext={() => {
            const currentIndex = mostStreamSongs.findIndex(
              (s) => s.title === currentStreamSong.title
            );
            const nextIndex = (currentIndex + 1) % mostStreamSongs.length;
            handlePlayStreamSong(mostStreamSongs[nextIndex], nextIndex);
          }}
          onPrevious={() => {
            const currentIndex = mostStreamSongs.findIndex(
              (s) => s.title === currentStreamSong.title
            );
            const prevIndex =
              currentIndex === 0
                ? mostStreamSongs.length - 1
                : currentIndex - 1;
            handlePlayStreamSong(mostStreamSongs[prevIndex], prevIndex);
          }}
          onClose={() => {
            youtubeStreamPlayer?.stopVideo();
            setCurrentStreamSong(null);
            setIsStreamPlaying(false);
            setShowStreamPlayer(false);
          }}
          youtubePlayer={youtubeStreamPlayer}
          playerType="stream"
          streamInfo={{
            rank: currentStreamSong.rank,
            plays: currentStreamSong.plays,
          }}
        />
      )}

      {/* ALBUM MINI PLAYER */}
      {currentAlbum && currentAlbumTrack && (
        <MiniPlayer
          currentSong={currentAlbumTrack}
          isPlaying={isAlbumPlaying}
          onPlayPause={handleAlbumPlayPause}
          onNext={handleAlbumNext}
          onPrevious={handleAlbumPrevious}
          onClose={handleCloseAlbumPlayer}
          youtubePlayer={youtubeAlbumPlayer}
          playerType="album"
          albumInfo={{
            albumName: currentAlbum.albumName,
            artist: currentAlbum.artist,
            cover: currentAlbum.cover,
            currentTrack: currentTrackIndex + 1,
            totalTracks: currentAlbum.totalTracks,
          }}
        />
      )}

      {/* REGULAR MUSIC PLAYER */}
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
