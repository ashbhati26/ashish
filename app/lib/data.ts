export interface NavItem {
  title: string;
  href:  string;
}

export const navItems: NavItem[] = [
  { title: 'Work',    href: '/work'    },
  { title: 'About',   href: '/about'   },
  { title: 'Blog',    href: '/blog'    },
  { title: 'Contact', href: '/contact' },
];

/* ─── Socials ───────────────────────────────────────────────────────────── */

export interface Social {
  label: string;
  href:  string;
}

export const socials: Social[] = [
  { label: 'GitHub',    href: 'https://github.com/ashbhati26'              },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/ashbhati26/'    },
  { label: 'HashNode',  href: 'https://hashnode.com/@ashishbhati'          },
  { label: 'Instagram', href: 'https://www.instagram.com/i_ashishbhati/'   },
];

/* ─── Contact ───────────────────────────────────────────────────────────── */

export interface ContactInfo {
  email: string;
  phone: string;
}

export const contactInfo: ContactInfo = {
  email: 'hello@ashishbhati.com',
  phone: '+91 63987 93554',
};

/* ─── Footer meta ───────────────────────────────────────────────────────── */

export const footerMeta = [
  { label: 'Version',    value: '2026 © Edition'   },
  { label: 'Local time', value: '11:49 PM GMT+5:30' },
] as const;

/* ─── Description section ───────────────────────────────────────────────── */

export const descriptionPhrase =
  'Building scalable digital products that stand out in the modern web. Focused on performance, clean architecture, and real-world impact.';

export const descriptionBio =
  'I combine strong engineering with product thinking to build systems that are efficient, reliable, and built to scale.';

export type ProjectCategory = 'All' | 'Design' | 'Development';
export type ViewMode = 'list' | 'grid';

export interface Project {
  /* shared */
  title:    string;
  color:    string;  // fallback bg color for modals / cards

  /* work page / detail */
  slug:     string;
  location: string;
  services: string;
  year:     number;
  category: ProjectCategory[];
  href:     string;  // "/work/<slug>"  — keep "/" for WIP projects
  image:    string;  // card / hero image  e.g. "/scriptvalley.png"

  /* homepage Projects section (was `src` in old data.ts) */
  src:      string;  // same value as image — alias kept so Projects.tsx import doesn't break

  /* detail page */
  excerpt:    string;
  liveUrl?:   string;
  techStack?: string[];
}

export const projects: Project[] = [
  {
    title:     'Script Valley',
    slug:      'script-valley',
    location:  'India',
    services:  'Design & Development',
    year:      2026,
    category:  ['Design', 'Development'],
    href:      '/work/script-valley',
    image:     '/scriptvalley.png',
    src:       '/scriptvalley.png',
    color:     '#000000',
    excerpt:
      'A full-stack SaaS platform for script writers — clean editor, collaboration tools, and a modern dashboard built with Next.js and Convex.',
    liveUrl:   'https://scriptvalley.com',
    techStack: ['Next.js', 'Convex', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title:     'AuthPool',
    slug:      'authpool',
    location:  'India',
    services:  'Design & Development',
    year:      2025,
    category:  ['Design', 'Development'],
    href:      '/work/authpool',
    image:     '/authpool.png',
    src:       '/authpool.png',
    color:     '#8C8C8C',
    excerpt:
      'A developer-first authentication service with plug-and-play SDKs, a polished dashboard, and enterprise-grade security built on Node.js and PostgreSQL.',
    liveUrl:   'https://authpool.scriptvalley.com',
    techStack: [ 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title:     'Stilwerk',
    slug:      'stilwerk',
    location:  'India',
    services:  'Interaction & Development',
    year:      2025,
    category:  ['Design'],
    href:      '/work/stilwerk',
    image:     '/stilwerk.png',
    src:       '/stilwerk.png',
    color:     '#EFE8D3',
    excerpt:
      'A boutique portfolio for a furniture studio — fluid scroll animations, rich product galleries, and a bespoke CMS integration.',
    liveUrl:   'https://stilwerk.in',
    techStack: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title:     'Urban Store',
    slug:      'urban-store',
    location:  'Remote',
    services:  'Design & Development',
    year:      2025,
    category:  ['Design', 'Development'],
    href:      '/work/urban-store',
    image:     '/urbanstore.png',
    src:       '/urbanstore.png',
    color:     '#0a192f',
    excerpt:
      'A high-performance e-commerce storefront with real-time inventory, animated product pages, and a custom checkout flow.',
    liveUrl:   'https://urbanstore.ashishbhati.com/',
    techStack: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'JavaScript'],
  },
  {
    title:     'Layer',
    slug:      'layer',
    location:  'Remote',
    services:  'Design',
    year:      2025,
    category:  ['Design'],
    href:      '/work/layer',
    image:     '/layer.png',
    src:       '/layer.png',
    color:     '#f5f0e8',
    excerpt:
      'UI/UX design system and brand identity for a SaaS product — component library, interaction prototypes, and design tokens.',
    liveUrl:   'https://layer-seven.vercel.app/',
    techStack: ['Next.js', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title:     'Planets',
    slug:      'planets',
    location:  'Remote',
    services:  'Design',
    year:      2024,
    category:  ['Design'],
    href:      '/work/planets',
    image:     '/planets.png',
    src:       '/planets.png',
    color:     '#1e1b4b',
    excerpt:
      'An immersive WebGL experience exploring the solar system — built for a science education platform with interactive 3D models.',
    liveUrl:   'https://planets.ashishbhati.com/',
    techStack: ['Three.js', 'WebGL', 'GLSL', 'JavaScript'],
  },
  {
    title:     'Blob',
    slug:      'blob',
    location:  'Remote',
    services:  'Design',
    year:      2024,
    category:  ['Design'],
    href:      '/work/blob',
    image:     '/blob.png',
    src:       '/blob.png',
    color:     '#0c0a09',
    excerpt:
      'A generative art experiment — real-time fluid blob simulations rendered in WebGL with configurable noise parameters.',
    liveUrl:   'https://blob-mixer.ashishbhati.com/',
    techStack: ['Three.js', 'WebGL', 'GLSL', 'JavaScript'],
  },
];

export const categoryCounts = (list: Project[]): Record<ProjectCategory, number> => ({
  All:         list.length,
  Design:      list.filter(p => p.category.includes('Design')).length,
  Development: list.filter(p => p.category.includes('Development')).length,
});

/* ─── Blog posts ────────────────────────────────────────────────────────── */

export interface BlogPost {
  slug:        string;
  title:       string;
  excerpt:     string;
  date:        string;
  readTime:    number;
  tags:        string[];
  coverImage:  string;
  externalUrl: string;
  featured?:   boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'not-all-computers-are-created-equal-and-your-calculator-is-basically-useless',
    title:
      'Not All Computers Are Created Equal (And Your Calculator Is Basically Useless)',
    excerpt:
      'From pocket calculators to quantum machines — a breakdown of Turing completeness, CPUs vs GPUs, and why there is no universal champion in computing.',
    date:        '2026-02-02',
    readTime:    3,
    tags:        ['Computer Science', 'Hardware', 'Beginners'],
    coverImage:  '/blog/computers-equal.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/not-all-computers-are-created-equal-and-your-calculator-is-basically-useless',
    featured:    true,
  },
  {
    slug: 'why-your-browser-blocks-some-requests-cors-explained-simply',
    title:    'Why Your Browser Blocks Some Requests: CORS Explained Simply',
    excerpt:
      'CORS errors are a rite of passage for every web developer. Here is what is actually happening, why your browser is being paranoid, and how to fix it in minutes.',
    date:        '2026-02-07',
    readTime:    4,
    tags:        ['Web', 'Security', 'HTTP'],
    coverImage:  '/blog/cors.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/why-your-browser-blocks-some-requests-cors-explained-simply',
  },
  {
    slug: 'why-your-computer-can-launch-rockets-but-cant-add-01-02',
    title:    "Why Your Computer Can Launch Rockets But Can't Add 0.1 + 0.2",
    excerpt:
      'Your computer can track spacecraft to Mars but confidently tells you 0.1 + 0.2 equals 0.30000000000000004. Here is why — and why it once got people killed.',
    date:        '2026-01-26',
    readTime:    4,
    tags:        ['Computer Science', 'JavaScript', 'Beginners'],
    coverImage:  '/blog/floating-point.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/why-your-computer-can-launch-rockets-but-cant-add-01-02',
  },
  {
    slug: 'programming-languages-explained-from-c-to-typescript-and-why-youll-learn-like-5-of-them',
    title:    "Programming Languages Explained: From C to TypeScript (And Why You'll Learn Like 5 of Them)",
    excerpt:
      'There are over 700 programming languages and developers typically know 3–7 of them. A plain-English tour of why each major language exists and when to reach for it.',
    date:        '2026-01-28',
    readTime:    4,
    tags:        ['Programming Languages', 'TypeScript', 'Beginners'],
    coverImage:  '/blog/languages.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/programming-languages-explained-from-c-to-typescript-and-why-youll-learn-like-5-of-them',
  },
  {
    slug: 'how-computers-really-work-from-binary-to-brain',
    title:    'How Computers Really Work: From Binary to Brain',
    excerpt:
      'Millions of on/off switches, billions of cycles per second, and one very caffeinated CPU — a beginner-friendly look at what is actually happening inside your machine.',
    date:        '2026-01-20',
    readTime:    3,
    tags:        ['Computer Science', 'Hardware', 'Binary'],
    coverImage:  '/blog/binary-brain.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/how-computers-really-work-from-binary-to-brain',
  },
  {
    slug: 'npm-vs-yarn-vs-pnpm-vs-bun',
    title:    'npm vs Yarn vs pnpm vs Bun',
    excerpt:
      'Four package managers walk into a bar. A practical breakdown of what each one does differently — and which to actually reach for depending on your project.',
    date:        '2026-01-03',
    readTime:    4,
    tags:        ['Node.js', 'Tooling', 'JavaScript'],
    coverImage:  '/blog/package-managers.jpg',
    externalUrl: 'https://mysandbox.hashnode.dev/npm-vs-yarn-vs-pnpm-vs-bun',
  },
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });
}