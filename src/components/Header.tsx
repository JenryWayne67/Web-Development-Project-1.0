import React from 'react';
import { GraduationCap, Bookmark, MessageSquareText, Calendar, Award, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  savedCount: number;
  openChat: () => void;
  hasAssessment: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  savedCount,
  openChat,
  hasAssessment
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">AI UniAdvisor</span>
                <span className="text-[10px] font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full uppercase">
                  Myanmar
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setCurrentTab('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'landing' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Home
            </button>

            {hasAssessment && (
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {t.myDashboard}
              </button>
            )}

            <button
              onClick={() => setCurrentTab('assessment')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'assessment' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Assessment
            </button>

            <button
              onClick={() => setCurrentTab('programs')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'programs' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Programs
            </button>

            <button
              onClick={() => setCurrentTab('compare')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'compare' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Compare
            </button>

            <button
              onClick={() => setCurrentTab('scholarships')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === 'scholarships' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Scholarships</span>
            </button>

            <button
              onClick={() => setCurrentTab('deadlines')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === 'deadlines' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Deadlines</span>
            </button>
          </nav>

          {/* Action buttons & Language switch */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 bg-slate-50 transition-colors"
              title="Toggle English / Myanmar Unicode"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'en' ? 'မြန်မာ' : 'EN'}</span>
            </button>

            {/* Saved bookmarks pill */}
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title="View Bookmarked Programs"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* AI Advisor Chat launcher */}
            <button
              onClick={openChat}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors flex items-center space-x-1.5"
            >
              <MessageSquareText className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">{t.aiAdvisorChat}</span>
            </button>

            {/* Start Assessment CTA */}
            <button
              onClick={() => setCurrentTab('assessment')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center space-x-1"
            >
              <span>{hasAssessment ? 'Retake Form' : t.startAssessment}</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
