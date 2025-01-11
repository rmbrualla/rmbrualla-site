export interface Author {
  name: string;
  website?: string;
}

// This is a placeholder for the YAML loading logic
// Replace this with actual YAML parsing logic when you have the YAML file
export const loadAuthors = (): Author[] => {
  return [
    {
      name: "John Doe",
      website: "https://johndoe.com"
    },
    {
      name: "Jane Smith",
      website: "https://janesmith.com"
    }
  ];
};

export const getAuthorWebsite = (authorName: string): string | undefined => {
  const authors = loadAuthors();
  return authors.find(author => author.name === authorName)?.website;
};