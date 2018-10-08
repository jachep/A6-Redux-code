export interface CharacterUrl {
  type: "detail" | "wiki" | "comiclink" | "default";
  url: string;
}

export class DefaultUrl {
  type: "detail" | "wiki" | "comiclink" | "default";
  url: string;
  constructor() {
    this.type = 'default';
    this.url = '/';
  }
}
