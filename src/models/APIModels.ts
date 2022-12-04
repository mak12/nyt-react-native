export type MultiMediaFormat =
  | 'Super Jumbo'
  | 'threeByTwoSmallAt2X'
  | 'Large Thumbnail';

export interface IMultimedia {
  url: string;
  type: string;
  caption: string;
  format: MultiMediaFormat;
}

export interface ITopStories {
  section: string;
  abstract: string;
  subsection: string;
  title: string;
  item_type: string;
  published_date: string;
  byline: string;
  multimedia: IMultimedia[];
}
interface IHeadline {
  main: string;
}

export interface ISearchedArticlesResponse {
  status: string;

  response: {
    docs: ISearchedArticles[];
  };
}
export interface ISearchedArticles {
  section_name: string;
  abstract: string;
  lead_paragraph: string;
  subsection: string;
  title: string;
  item_type: string;
  published_date: string;
  byline: string;
  multimedia: IMultimedia[];
  headline: IHeadline;
}

export interface ITopStoriesResponse {
  status: string;
  section: string;
  num_results: number;
  results: ITopStories[];
}

export interface IAuthResponse {
  access_token: string;
}
