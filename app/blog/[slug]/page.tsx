import { posts } from "../../lib/data";
import PostHero from "./_components/PostHero";
import PostBody from "./_components/PostBody";
import Contact from "@/app/sections/Contact";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <PostHero post={post} />
      <PostBody post={post} />
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}