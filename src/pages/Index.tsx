import { PaperCard } from "@/components/PaperCard";
import { loadPapers } from "@/lib/papers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const papers = loadPapers();

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Personal Description Section */}
        <section className="mb-16">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
            <h1 className="text-4xl font-bold text-primary">Ricardo Martin-Brualla</h1>
            <Avatar className="w-32 h-32 border-2 border-muted">
              <AvatarImage src="images/RicardoMartinBrualla.jpg" alt="Profile photo" />
              <AvatarFallback>RMB</AvatarFallback>
            </Avatar>
          </div>
          <div className="prose prose-lg max-w-none">
              <p className="text-lg text-secondary mb-4">
                I am a researcher interested in the intersection of AI and 3D, and excited about creating new products in this area.
              </p>
              <p className="text-lg text-secondary mb-4">
                Previously, I worked at Google for eight years, most recently as a Senior Staff Research Scientist, leading and managing a team working on <a className="text-blue-400" href="https://blog.google/products/shopping/search-on-2022-shopping/">generating 3D assets</a> for all products in Google Search , using NeRFs, diffusion and video models. Before that, I worked for five years on 3D telepresence on <a className="text-blue-400" href="https://blog.google/technology/research/project-starline/">Project Starline</a>, from building the first end-to-end demos to leading the ML efforts for real-time novel view synthesis.
              </p>
              <p className="text-lg text-secondary mb-4">
                I obtained my PhD in Computer Science and Engineering at the <a className="text-blue-400" href="http://www.cs.washington.edu/">University of Washington</a> in 2016 with  <a className="text-blue-400" href="http://homes.cs.washington.edu/~seitz/">Steve Seitz</a> as my advisor. Two of my PhD projects went viral online:  <a className="text-blue-400" href="https://grail.cs.washington.edu/projects/timelapse/">timelapse mining from Internet photos</a>, and a  <a className="text-blue-400" href="https://medium.com/hackernoon/seattle-3-year-time-lapse-video-from-the-space-needle-9a9e76cfe8bf">timelapse of Seattle from the Space Needle</a>.  I hold two bachelor degrees in Math and Informatics from <a className="text-blue-400" href="https://www.upc.edu/en">Barcelona Tech / UPC</a>.
              </p>
              <p className="text-lg text-secondary mb-4">
                Outside of work, I love the outdoors and adventures. During COVID-19, my wife and I crossed Alaska from Ketchikan to Kotzebue on foot, packraft and cycling. We wrote about it on our blog called <a className="text-blue-400" href="http://north2arctic.com">north2arctic</a>, and we were featured in the  <a className="text-blue-400" href="https://issuu.com/dougc/docs/mtrvol118no3_summer24_web/22?experiment=previewReaderTestMode%2Cnew-bff-translate%2Cnew-bff-fullscreen%2Cnew-bff-video%2Cnew-bff-purchased">Mountaineers magazine</a>. 
              </p>
          </div>
          <div className="prose prose-md">
            <p className="text-lg text-secondary mb-4">
                <a className="text-blue-400 mb-2" href="mailto:rmbrualla@gmail.com">Email</a> / <a className="text-blue-400 mb-2" href="https://scholar.google.com/citations?hl=en&user=9F59OCYAAAAJ">Google Scholar</a> / <a className="text-blue-400 mb-2" href="https://twitter.com/rmbrualla">Twitter</a> / <a className="text-blue-400 mb-2" href="https://github.com/rmbrualla/">Github</a>
              </p>
          </div>
        </section>

        {/* Papers Section */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8">Publications</h2>
          <div className="space-y-6">
            {papers.map((paper, index) => (
              <PaperCard key={index} {...paper} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;