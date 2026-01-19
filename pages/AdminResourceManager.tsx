import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { Article } from "../types";

const INITIAL_ARTICLES: Article[] = [
  {
    id: "1",
    title: "How to Ace Your First Internship Interview",
    category: "Career Advice",
    author: "Sarah Jenkins",
    date: "Oct 12, 2024",
    readTime: "5 min",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    summary: "Tips for students on preparing for and succeeding in interviews.",
    content: "<p>Standard interview prep guide...</p>",
  },
  {
    id: "2",
    title: "Remote Work Guide",
    category: "Trends",
    author: "David Lee",
    date: "Sep 28, 2024",
    readTime: "4 min",
    imageUrl:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800",
    summary: "Navigating the remote work landscape as a new professional.",
    content: "<p>How to setup your home office...</p>",
  },
];

interface AdminResourceManagerProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

export const AdminResourceManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Career Advice",
    author: "",
    imageUrl: "",
    summary: "",
    content: "",
  });
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: "3 min read",
      ...formData,
    };
    setArticles([newArticle, ...articles]);
    setIsEditing(false);
    setFormData({
      title: "",
      category: "Career Advice",
      author: "",
      imageUrl: "",
      summary: "",
      content: "",
    });
  };

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-brand-dark'>
            Resource Center
          </h2>
          <p className='text-slate-500'>
            Manage blog posts and student guides.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className='w-full md:w-auto bg-brand-teal hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-sm'
          >
            <Plus className='w-4 h-4' /> New Article
          </button>
        )}
      </div>

      {isEditing ? (
        <div className='bg-white p-8 rounded-2xl shadow-lg border border-slate-100 animate-fade-in-up'>
          <div className='flex justify-between items-center mb-6 border-b border-slate-100 pb-4'>
            <h3 className='text-xl font-bold text-brand-dark'>
              Create New Content
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className='p-2 hover:bg-slate-100 rounded-full'
            >
              <X className='w-5 h-5 text-slate-500' />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Title
                </label>
                <input
                  required
                  className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder='Article Title'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Category
                </label>
                <select
                  className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Career Advice</option>
                  <option>Industry Trends</option>
                  <option>Resume Tips</option>
                  <option>Student Stories</option>
                </select>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Author
                </label>
                <input
                  required
                  className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  placeholder='Author Name'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Image URL
                </label>
                <div className='relative'>
                  <ImageIcon className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                  <input
                    className='w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder='https://...'
                  />
                </div>
              </div>
            </div>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Summary
              </label>
              <input
                required
                className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder='Brief summary...'
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Content (HTML supported)
              </label>
              <textarea
                required
                rows={6}
                className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none font-mono text-sm'
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder='<p>Write content here...</p>'
              />
            </div>
            <div className='flex justify-end gap-3 pt-4'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-6 py-2 text-slate-600 font-medium'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-brand-teal hover:bg-brand-dark text-white px-8 py-2 rounded-lg font-bold transition-colors'
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <div
              key={article.id}
              className='bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow'
            >
              <div className='relative h-40 mb-4 rounded-lg overflow-hidden'>
                <img
                  src={article.imageUrl || "https://via.placeholder.com/400"}
                  className='w-full h-full object-cover'
                  alt={article.title}
                />
                <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className='bg-white/90 p-2 rounded-full text-red-500 hover:text-red-700'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
              <div className='mb-2'>
                <span className='text-xs font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded'>
                  {article.category}
                </span>
              </div>
              <h3 className='font-bold text-brand-dark mb-2 line-clamp-2'>
                {article.title}
              </h3>
              <div className='mt-auto pt-4 flex justify-between items-center text-xs text-slate-500 border-t border-slate-50'>
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
