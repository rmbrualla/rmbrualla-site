import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PaperCardProps {
  title: string;
  authors: string[];
  conference: string;
  image?: string;
  video?: string;
}

export function PaperCard({ title, authors, conference, image, video }: PaperCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4">
        <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{authors.join(", ")}</p>
        <p className="mt-1 text-sm font-medium text-primary">{conference}</p>
      </CardHeader>
      {(image || video) && (
        <CardContent className="p-4 pt-0">
          <AspectRatio ratio={16 / 9}>
            {video ? (
              <video
                src={video}
                controls
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <img
                src={image}
                alt={`Reference image for ${title}`}
                className="h-full w-full rounded-md object-cover"
              />
            )}
          </AspectRatio>
        </CardContent>
      )}
    </Card>
  );
}