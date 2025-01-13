import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAuthorWebsite } from "@/lib/authors";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, FileCode, FileText, Play, Globe } from "lucide-react";
import { marked } from 'marked';

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
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cardRect = entry.boundingClientRect;
          const windowHeight = window.innerHeight;
          const cardCenter = cardRect.top + cardRect.height / 2;
          const windowCenter = windowHeight / 2;
          const isNearCenter = Math.abs(cardCenter - windowCenter) < windowHeight / 4;
          setIsInView(isNearCenter);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-25% 0px -25% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const image = 'images/' + label + '_before.jpg'
  var video_hover = null
  var image_hover = null
  if (visual == "overlay_video") {
    video_hover = 'images/' + label + '_after.mp4'
  } else if (visual == "overlay_image") {
    image_hover = 'images/' + label + '_after.jpg'
  }

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleVideoLoad);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);

  const renderAuthor = (author: string, index: number) => {
    const website = getAuthorWebsite(author);
    const content = author === "Ricardo Martin-Brualla" ? <strong>{author}</strong> : author;
    
    if (website) {
      return (
        <a
          key={author}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-600"
        >
          {content}
        </a>
      );
    }
    return <span key={author} className="text-gray-600">{content}</span>;
  };

  const renderAuthors = () => {
    return authors.map((author, index) => (
      <>
        {renderAuthor(author, index)}
        {index < authors.length - 1 && <span>, </span>}
      </>
    ));
  };

  const renderNotes = () => {
    if (!notes) return null;
    const htmlContent = marked(notes);
    return (
      <div 
        className="mt-1 text-sm text-muted-foreground prose prose-sm prose-a:text-blue-600 prose-a:hover:underline"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <Card 
      ref={cardRef}
      className="overflow-hidden transition-all duration-300 hover:shadow-lg flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {visual !== "none" && (image || video_hover) && (
        <div className="max-sm:w-32 sm:w-48 flex-shrink-0">
          <AspectRatio ratio={1 / 1} className="relative">
            {image && (
              <img
                src={image}
                alt={`Reference image for ${title}`}
                className={`h-auto w-full object-contain transition-opacity duration-300 ${
                  (isHovered || isInView) && (video_hover || image_hover) && (isVideoLoaded || image_hover) ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            {video_hover && (
              <video
                ref={videoRef}
                src={video_hover}
                autoPlay={true}
                muted
                loop
                className={`absolute inset-0 h-auto w-full object-contain transition-opacity duration-300 ${
                  (isHovered || isInView) && isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {image_hover && (
              <img
                src={image_hover}
                alt={`Reference image for ${title}`}
                className={`absolute inset-0 h-auto w-full object-contain transition-opacity duration-300 ${
                  isHovered || isInView ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </AspectRatio>
        </div>
      )}
      <div className="flex-1">
        <CardHeader className="p-4 text-left">
          {project_page ? (
            <a href={project_page} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
            </a>
          ) : (
            <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
          )}
          <p className="mt-2 text-sm">{renderAuthors()}</p>
          <p className="mt-1 text-sm font-medium text-gray-500">{conference}, {year}</p>
          {renderNotes()}
          <div className="flex flex-wrap gap-2 mt-2">
            {project_page && (
              <a href={project_page} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="hover:bg-accent bg-gray-100">
                  <Globe className="mr-1 h-3 w-3" />
                  Project
                </Badge>
              </a>
            )}
            {arxiv && (
              <a href={arxiv} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="hover:bg-accent bg-gray-100">
                  <FileText className="mr-1 h-3 w-3" />
                  arXiv
                </Badge>
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="hover:bg-accent bg-gray-100">
                  <FileCode className="mr-1 h-3 w-3" />
                  Code
                </Badge>
              </a>
            )}
            {video && (
              <a href={video} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="hover:bg-accent bg-gray-100">
                  <Play className="mr-1 h-3 w-3" />
                  Video
                </Badge>
              </a>
            )}
            {paper && (
              <a href={paper} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="hover:bg-accent bg-gray-100">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Paper
                </Badge>
              </a>
            )}
          </div>
        </CardHeader>
      </div>
    </Card>
  );
}