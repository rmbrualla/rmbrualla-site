import Papa from 'papaparse';
import csvData from './authors.csv?raw';

export interface Author {
  name: string;
  website?: string;
}

export const loadAuthors = (): Author[] => {
  const { data } = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true
  });

  return data.map((row: any) => ({
    name: row.author_name,
    website: row.url
  }));
};

export const getAuthorWebsite = (authorName: string): string | undefined => {
  const authors = loadAuthors();
  return authors.find(author => author.name === authorName)?.website;
};