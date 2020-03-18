export interface Video {
  id: string;
  url?: string;
  hls?: string;
  question?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  play?: Video;
}
