export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage: string;
  externalUrl: string;
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'not-all-computers-are-created-equal-and-your-calculator-is-basically-useless',
    title: 'Not All Computers Are Created Equal (And Your Calculator Is Basically Useless)',
    excerpt:
      'From pocket calculators to quantum machines — a breakdown of Turing completeness, CPUs vs GPUs, and why there is no universal champion in computing.',
    date: '2026-02-02',
    readTime: 3,
    tags: ['Computer Science', 'Hardware', 'Beginners'],
    coverImage: '/blog/computers-equal.jpg',
    externalUrl:
      'https://mysandbox.hashnode.dev/not-all-computers-are-created-equal-and-your-calculator-is-basically-useless',
    featured: true,
  },
  {
    slug: 'why-your-browser-blocks-some-requests-cors-explained-simply',
    title: 'Why Your Browser Blocks Some Requests: CORS Explained Simply',
    excerpt:
      'CORS errors are a rite of passage for every web developer. Here is what is actually happening, why your browser is being paranoid, and how to fix it in minutes.',
    date: '2026-02-07',
    readTime: 4,
    tags: ['Web', 'Security', 'HTTP'],
    coverImage: '/blog/cors.jpg',
    externalUrl:
      'https://mysandbox.hashnode.dev/why-your-browser-blocks-some-requests-cors-explained-simply',
  },
  {
    slug: 'why-your-computer-can-launch-rockets-but-cant-add-01-02',
    title: "Why Your Computer Can Launch Rockets But Can't Add 0.1 + 0.2",
    excerpt:
      'Your computer can track spacecraft to Mars but confidently tells you 0.1 + 0.2 equals 0.30000000000000004. Here is why — and why it once got people killed.',
    date: '2026-01-26',
    readTime: 4,
    tags: ['Computer Science', 'JavaScript', 'Beginners'],
    coverImage: '/blog/floating-point.jpg',
    externalUrl:
      'https://mysandbox.hashnode.dev/why-your-computer-can-launch-rockets-but-cant-add-01-02',
  },
  {
    slug: 'programming-languages-explained-from-c-to-typescript-and-why-youll-learn-like-5-of-them',
    title: "Programming Languages Explained: From C to TypeScript (And Why You'll Learn Like 5 of Them)",
    excerpt:
      'There are over 700 programming languages and developers typically know 3–7 of them. A plain-English tour of why each major language exists and when to reach for it.',
    date: '2026-01-28',
    readTime: 4,
    tags: ['Programming Languages', 'TypeScript', 'Beginners'],
    coverImage: '/blog/languages.jpg',
    externalUrl:
      'https://mysandbox.hashnode.dev/programming-languages-explained-from-c-to-typescript-and-why-youll-learn-like-5-of-them',
  },
  {
    slug: 'how-computers-really-work-from-binary-to-brain',
    title: 'How Computers Really Work: From Binary to Brain',
    excerpt:
      'Millions of on/off switches, billions of cycles per second, and one very caffeinated CPU — a beginner-friendly look at what is actually happening inside your machine.',
    date: '2026-01-20',
    readTime: 3,
    tags: ['Computer Science', 'Hardware', 'Binary'],
    coverImage: '/blog/binary-brain.jpg',
    externalUrl:
      'https://mysandbox.hashnode.dev/how-computers-really-work-from-binary-to-brain',
  },
  {
    slug: 'npm-vs-yarn-vs-pnpm-vs-bun',
    title: 'npm vs Yarn vs pnpm vs Bun',
    excerpt:
      'Four package managers walk into a bar. A practical breakdown of what each one does differently — and which to actually reach for depending on your project.',
    date: '2026-01-03',
    readTime: 4,
    tags: ['Node.js', 'Tooling', 'JavaScript'],
    coverImage: '/blog/package-managers.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/npm-vs-yarn-vs-pnpm-vs-bun',
  },
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}