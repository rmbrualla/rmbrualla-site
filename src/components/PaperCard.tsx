import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAuthorWebsite } from "@/lib/authors";
import { useState } from "react";

interface PaperCardProps {
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

export function PaperCard({
  title,
  authors,
  conference,
  volume,
  number,
  pages,
  year,
  publisher,
  label,
  visual,
  project_page,
  video,
  code,
  arxiv,
  paper,
  notes,
  extra,
}: PaperCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const image = 'images/' + label + '_before.jpg'
  var video_hover = null
  var image_hover = null
  if (visual == "overlay_video") {
    video_hover = 'images/' + label + '_after.mp4'
  } else if (visual == "overlay_image") {
    image_hover = 'images/' + label + '_after.jpg'
  }

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
      className="overflow-hidden transition-all duration-300 hover:shadow-lg flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(image || video_hover) && (
        <div className="w-48 h-48 flex-shrink-0">
          <AspectRatio ratio={1 / 1} className="relative">
            {image && (
              <img
                src={image}
                alt={`Reference image for ${title}`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  isHovered && (video_hover || image_hover) ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            {video_hover && (
              <video
                src={video_hover}
                autoPlay={true}
                muted
                loop
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {image_hover && (
              <img
                src={image_hover}
                alt={`Reference image for ${title}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </AspectRatio>
        </div>
      )}
      <div className="flex-1">
        <CardHeader className="p-4 text-left">
          <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{renderAuthors()}</p>
          <p className="mt-1 text-sm font-medium text-primary">{conference}</p>
        </CardHeader>
      </div>
    </Card>
  );
}