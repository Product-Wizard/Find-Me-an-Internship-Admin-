import React from 'react';

export type PageView = 'home' | 'impact' | 'jobs' | 'involved' | 'resources';

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
  content: string; // In a real app, this might be HTML or Markdown
  summary: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}