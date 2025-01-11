import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAuthorWebsite } from "@/lib/authors";
import { useState } from "react";

interface PaperCardProps {
  title: string;
  authors: string[];
  conference: string;
  image?: string;
  video?: string;
}

export function PaperCard({ title, authors, conference, image, video }: PaperCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderAuthor = (author: string, index: number) => {
    const website = getAuthorWebsite(author);
    if (website) {
      return (
        <a
          key={author}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-primary"
        >
          {author}
        </a>
      );
    }
    return <span key={author}>{author}</span>;
  };

  const renderAuthors = () => {
    return authors.map((author, index) => (
      <>
        {renderAuthor(author, index)}
        {index < authors.length - 1 && <span>, </span>}
      </>
    ));
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4">
        <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{renderAuthors()}</p>
        <p className="mt-1 text-sm font-medium text-primary">{conference}</p>
      </CardHeader>
      {(image || video) && (
        <CardContent className="p-4 pt-0">
          <AspectRatio ratio={16 / 9} className="relative">
            {image && (
              <img
                src={image}
                alt={`Reference image for ${title}`}
                className={`h-full w-full rounded-md object-cover transition-opacity duration-300 ${
                  isHovered && video ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            {video && (
              <video
                src={video}
                controls={isHovered}
                autoPlay={isHovered}
                muted
                loop
                className={`absolute inset-0 h-full w-full rounded-md object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </AspectRatio>
        </CardContent>
      )}
    </Card>
  );
}