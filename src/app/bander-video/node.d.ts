export interface Node {
  id: string;
  url?: string;
  hls?: string;
  question?: string;
  answers?: Answer[];
}

export interface Answer {
  id: number,
  text: string;
  goTo?: string;
}
