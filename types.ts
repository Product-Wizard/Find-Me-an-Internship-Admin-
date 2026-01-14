export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  category: string;
  postedDate: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  summary: string;
  content: string;
}