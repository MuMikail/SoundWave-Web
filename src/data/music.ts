export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl: string;
  genre: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Echo",
    album: "Ethereal Nights",
    duration: "3:45",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "/audio/sample1.mp3",
    genre: "Electronic"
  },
  {
    id: 2,
    title: "Ocean Waves",
    artist: "Aqua Sounds",
    album: "Deep Blue",
    duration: "4:12",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    audioUrl: "/audio/sample2.mp3",
    genre: "Ambient"
  },
  {
    id: 3,
    title: "Neon Lights",
    artist: "Cyber Pulse",
    album: "Digital Dreams",
    duration: "3:28",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "/audio/sample3.mp3",
    genre: "Synthwave"
  },
  {
    id: 4,
    title: "Forest Whispers",
    artist: "Nature's Call",
    album: "Organic Sounds",
    duration: "5:03",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    audioUrl: "/audio/sample4.mp3",
    genre: "Nature"
  }
];
