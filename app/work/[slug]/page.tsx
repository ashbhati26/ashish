import { projects } from "@/app/lib/data";
import ProjectHero from "./_components/ProjectHero";
import ProjectBody from "./_components/ProjectBody";
import Contact from "@/app/sections/Contact";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <ProjectHero project={project} />
      <ProjectBody project={project} />
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}