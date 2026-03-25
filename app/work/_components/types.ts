export type Category = 'All' | 'Design' | 'Development';
export type ViewMode = 'list' | 'grid';

export interface Project {
  title: string;
  location: string;
  services: string;
  year: number;
  category: Category[];
  href: string;
  image: string; // path to project screenshot/image
  color: string; // fallback bg color
}

export const projects: Project[] = [
  {
    title: 'Script Valley',
    location: 'India',
    services: 'Design & Development',
    year: 2026,
    category: ['Design', 'Development'],
    href: '/',
    image: '/scriptvalley.png',
    color: '#000000',
  },
  {
    title: 'AuthPool',
    location: 'India',
    services: 'Design & Development',
    year: 2025,
    category: ['Design', 'Development'],
    href: '/',
    image: '/authpool.png',
    color: '#8C8C8C',
  },
  {
    title: 'Stilwerk',
    location: 'India',
    services: 'Interaction & Development',
    year: 2025,
    category: ['Design'],
    href: '/work/portfolio-v2',
    image: '/images/projects/portfolio.jpg',
    color: '#EFE8D3',
  },
  {
    title: 'Urban Store',
    location: 'Remote',
    services: 'Design & Development',
    year: 2025,
    category: ['Design' , 'Development'],
    href: '/',
    image: '/urbanstore.png',
    color: '#0a192f',
  },
  {
    title: 'Layer',
    location: 'Remote',
    services: 'Design',
    year: 2025,
    category: ['Design'],
    href: '/',
    image: '/layer.png',
    color: '#f5f0e8',
  },
  {
    title: 'Planets',
    location: 'Remote',
    services: 'Design',
    year: 2024,
    category: ['Design'],
    href: '/',
    image: '/planets.png',
    color: '#1e1b4b',
  },
  {
    title: 'Blob',
    location: 'Remote',
    services: 'Design',
    year: 2024,
    category: ['Design'],
    href: '/',
    image: '/blob.png',
    color: '#0c0a09',
  },
];

export const categoryCounts = (list: Project[]): Record<Category, number> => ({
  All:         list.length,
  Design:      list.filter(p => p.category.includes('Design')).length,
  Development: list.filter(p => p.category.includes('Development')).length,
});