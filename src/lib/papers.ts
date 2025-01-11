import Papa from 'papaparse';
import csvData from './papers.csv?raw';

export interface Paper {
  title: string;
  authors: string[];
  conference: string;
  volume?: string;
  number?: string;
  pages?: string;
  year?: string;
  publisher?: string;
  label?: string;
  visual?: string;
  project_page?: string;
  video?: string;
  code?: string;
  arxiv?: string;
  paper?: string;
  notes?: string;
  extra?: string;
}

export const loadPapers = (): Paper[] => {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true
  }).data;

  return parsedData.map((record: any) => {
    console.log('record: ', record)
    const paper: Paper = {
      title: record.title,
      authors: record.authors.split(';').filter((author: string) => author.trim() !== '').map((author: string) => {
        const [lastName, firstName] = author.split(',').map((name: string) => name.trim());
        return `${firstName} ${lastName}`;
      }),
      conference: record.publication
    };

    if (record.volume) paper.volume = record.volume;
    if (record.number) paper.number = record.number;
    if (record.pages) paper.pages = record.pages;
    if (record.year) paper.year = record.year;
    if (record.publisher) paper.publisher = record.publisher;
    if (record.label) paper.label = record.label;
    if (record.visual) paper.visual = record.visual;
    if (record.project_page) paper.project_page = record.project_page;
    if (record.video) paper.video = record.video;
    if (record.code) paper.code = record.code;
    if (record.arxiv) paper.arxiv = record.arxiv;
    if (record.paper) paper.paper = record.paper;
    if (record.notes) paper.notes = record.notes;
    if (record.Extra) paper.extra = record.Extra;

    return paper;
  });
};