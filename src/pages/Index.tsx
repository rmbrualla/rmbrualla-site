import { PaperCard } from "@/components/PaperCard";
import { loadPapers } from "@/lib/papers";

const Index = () => {
  const papers = loadPapers();

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Personal Description Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-primary mb-6">John Doe</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-secondary mb-4">
              I am a researcher in the field of artificial intelligence, focusing on machine learning
              and its applications in computer vision. Currently, I am a Professor at Example
              University, where I lead the AI Research Lab.
            </p>
          </div>
        </section>

        {/* Papers Section */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8">Publications</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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