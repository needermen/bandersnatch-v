export interface Video {
  id: string;
  url?: string;
  hls?: boolean;
  question?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  play?: Video;
}
