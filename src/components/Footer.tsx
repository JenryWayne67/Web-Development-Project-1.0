import React from 'react';
import { ShieldAlert, GraduationCap, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Notice Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 mb-10 shadow-inner">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-slate-100 flex items-center space-x-2">
                <span>{t.disclaimerHeader}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Educational Prototype
                </span>
              </p>
              <p>• {t.disclaimerScores}</p>
              <p>• {t.disclaimerEligibility}</p>
              <p>• {t.demoDataNotice}</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-sm">
          
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              <span>AI UniAdvisor</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students in Myanmar to discover optimal university degree pathways aligned with Matriculation results, subject strengths, and career ambitions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('assessment')} className="hover:text-blue-400 transition-colors">
                  Student Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-blue-400 transition-colors">
                  Explore Programs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-blue-400 transition-colors">
                  Compare Universities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scholarships')} className="hover:text-blue-400 transition-colors">
                  Scholarships Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deadlines')} className="hover:text-blue-400 transition-colors">
                  Application Deadlines
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider">
              Key University Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>UIT Yangon (Information Tech)</li>
              <li>UCSY Yangon / UCSM Mandalay</li>
              <li>YTU & MTU (Technological)</li>
              <li>University of Medicine 1 & 2</li>
              <li>Yangon University of Economics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider">
              Data & Transparency
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="flex items-center space-x-1.5 text-slate-300">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Replaceable Dataset Layer</span>
              </p>
              <p>
                Structured to easily integrate official Ministry of Education dataset feeds and verified university admissions requirements.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 AI University Advisor for Myanmar Students. Designed for Educational Guidance.</p>
          <p className="mt-2 sm:mt-0">Powered by Gemini AI Studio Build</p>
        </div>

      </div>
    </footer>
  );
};
