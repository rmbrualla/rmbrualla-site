export interface Paper {
  title: string;
  authors: string[];
  conference: string;
  image?: string;
  video?: string;
}

// This is a placeholder for the CSV loading logic
// Replace this with actual CSV parsing logic when you have the CSV file
export const loadPapers = (): Paper[] => {
  return [
    {
      title: "Example Paper 1",
      authors: ["John Doe", "Jane Smith"],
      conference: "ICML 2023",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      video: "https://example.com/sample-video.mp4", // Added video URL
    },
    {
      title: "Example Paper 2",
      authors: ["John Doe", "Bob Johnson"],
      conference: "NeurIPS 2023",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      video: "https://example.com/another-video.mp4", // Added video URL
    },
  ];
};