export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  youtubeId: string;
  genre: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    youtubeId: "b1kbLWvqugk",
    genre: "Pop"
  },
  {
    id: 2,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d0000b273f4d5cc8e2c48f74d0b8c7b4e",
    youtubeId: "G7KNmW9a75Y",
    genre: "Pop"
  },
  {
    id: 3,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    duration: "2:36",
    cover: "https://i.scdn.co/image/ab67616d0000b2734f39af2c2e73e8c2c1b0e8e8",
    youtubeId: "Uq9gPaIzbe8",
    genre: "Pop"
  },
  {
    id: 4,
    title: "Bad Habit",
    artist: "Steve Lacy",
    album: "Gemini Rights",
    duration: "3:51",
    cover: "https://i.scdn.co/image/ab67616d0000b273b85259a971157e9f2728457a",
    youtubeId: "VF-r5TtlT9w",
    genre: "R&B"
  }
];
