import React, { useState } from 'react';
import { 
  Clock, User, ArrowLeft, Calendar, Share2, Link as LinkIcon, Check, Facebook, Twitter, Linkedin 
} from 'lucide-react';
import { Article } from '../types';

const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'How to Ace Your First Internship Interview',
    category: 'Career Advice',
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    summary: 'Nervous about your upcoming interview? Here are 5 proven strategies to make a lasting impression on recruiters.',
    content: `
      <p class="mb-4">Entering the workforce as a student can be intimidating, but the interview process doesn't have to be a nightmare. Here are five tips to help you stand out:</p>
      
      <h3 class="text-xl font-bold text-brand-dark mb-2">1. Research the Company</h3>
      <p class="mb-4">Don't just look at the homepage. Read their recent news, check their social media, and understand their values. Mentioning a recent project they launched shows initiative.</p>

      <h3 class="text-xl font-bold text-brand-dark mb-2">2. Practice the STAR Method</h3>
      <p class="mb-4">When answering behavioral questions, use the Situation, Task, Action, Result structure. It keeps your answers concise and impactful.</p>

      <h3 class="text-xl font-bold text-brand-dark mb-2">3. Ask Questions</h3>
      <p class="mb-4">An interview is a two-way street. Ask about mentorship opportunities, team culture, and what a typical day looks like.</p>
    `
  },
  {
    id: '2',
    title: 'The Future of Remote Work for Students',
    category: 'Industry Trends',
    author: 'David Lee',
    date: 'Sep 28, 2024',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800',
    summary: 'Remote internships are opening doors for students worldwide. Learn how to navigate time zones and digital communication.',
    content: `
      <p class="mb-4">Remote work is no longer a temporary fix; it's a permanent shift in how we operate. For students, this means access to global opportunities without leaving campus.</p>
      <p class="mb-4">However, remote internships require a different set of skills: self-discipline, proactive communication, and digital literacy. Tools like Slack, Zoom, and Asana are now just as important as your technical skills.</p>
    `
  },
  {
    id: '3',
    title: 'Building a Portfolio with No Experience',
    category: 'Resume Tips',
    author: 'Emily Chen',
    date: 'Nov 01, 2024',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    summary: 'No job history? No problem. Learn how to turn class projects and volunteer work into a winning portfolio.',
    content: `
      <p class="mb-4">The classic "you need experience to get experience" paradox. But here is a secret: experience doesn't always come from a 9-to-5 job.</p>
      <p class="mb-4">Include your capstone projects, hackathons, and volunteer work. Treat them like professional engagements. Describe the problem you solved, the tools you used, and the outcome you achieved.</p>
    `
  }
];

export const ResourcesPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [copied, setCopied] = useState(false);

  const handleArticleClick = (article: Article) => {
    setActiveArticle(article);
    setView('detail');
    setCopied(false);
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook' | 'copy') => {
    if (!activeArticle) return;
    const url = window.location.href; // Using current URL for demo purposes
    const text = `Check out this article: ${activeArticle.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
        break;
    }
  };

  const RenderList = () => (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
           <h2 className="text-4xl font-bold text-brand-dark mb-4">Resources & Blog</h2>
           <p className="text-slate-600 max-w-2xl">Expert advice, industry insights, and stories from the community to help you navigate your career journey.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <div 
            key={article.id} 
            onClick={() => handleArticleClick(article)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-teal uppercase tracking-wide">
                {article.category}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-brand-dark mb-3 leading-tight group-hover:text-brand-teal transition-colors">
                {article.title}
              </h3>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                {article.summary}
              </p>
              
              <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-dark text-xs font-bold">
                   {article.author.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-700">{article.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RenderDetail = () => {
    if (!activeArticle) return null;
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <button 
          onClick={() => setView('list')}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-teal mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>

        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="h-[400px] w-full relative">
            <img 
              src={activeArticle.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'} 
              alt={activeArticle.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 md:p-12">
               <span className="inline-block bg-brand-accent text-brand-dark px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit">
                 {activeArticle.category}
               </span>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                 {activeArticle.title}
               </h1>
               <div className="flex items-center gap-6 text-white/90">
                 <div className="flex items-center gap-2">
                   <User className="w-4 h-4" /> {activeArticle.author}
                 </div>
                 <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4" /> {activeArticle.date}
                 </div>
                 <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4" /> {activeArticle.readTime}
                 </div>
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12 prose prose-slate max-w-none">
            <div 
              className="text-slate-700 text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            {/* Social Share Section */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-brand-teal" /> Share this article
              </h4>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => handleShare('twitter')} 
                  className="p-3 rounded-full bg-slate-100 hover:bg-[#1DA1F2] hover:text-white transition-colors text-slate-600 group"
                  title="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')} 
                  className="p-3 rounded-full bg-slate-100 hover:bg-[#0A66C2] hover:text-white transition-colors text-slate-600 group"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('facebook')} 
                  className="p-3 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white transition-colors text-slate-600 group"
                  title="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <div className="h-10 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                <button 
                  onClick={() => handleShare('copy')} 
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 font-medium flex items-center gap-2 min-w-[140px] justify-center"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {view === 'list' && <RenderList />}
        {view === 'detail' && <RenderDetail />}
      </div>
    </div>
  );
};