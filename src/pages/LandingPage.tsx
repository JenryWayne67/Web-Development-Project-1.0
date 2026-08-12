import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LandingPageProps {
  onStartAssessment: () => void;
  onExplorePrograms: () => void;
  lang: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExplorePrograms,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-16 py-8">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl border border-slate-800">
        
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI University Advisor for Myanmar Students</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.heroSubheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>{t.startAssessment}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExplorePrograms}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
            >
              {t.explorePrograms}
            </button>
          </div>

          {/* Key Features Pill bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-slate-800/80">
            <div className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Matriculation Scoring</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Career Matching</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Eligibility Checks</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Scholarships & Deadlines</span>
            </div>
          </div>

        </div>
      </section>

      {/* CORE ADVISORY PROCESS STEPS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Simple, Personalized Guidance in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed specifically for Myanmar high-school graduates navigating university options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Academic Marks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your total Matriculation score and subject-wise marks (Math, Physics, Bio, English, etc.).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Interests & Goals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select your academic interests and career goals (or pick "I'm not sure yet" for AI exploration).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">AI Evaluation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our hybrid engine matches your profile against verified admission criteria and calculates compatibility scores.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-black text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Roadmap & Pathways</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive personalized program recommendations, career pathways, scholarships, and deadline alerts.
            </p>
          </div>

        </div>
      </section>

      {/* VERIFIED DATASET & ACCURACY BANNER */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Built on Accuracy & Transparency</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Eligibility ≠ Admission Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All compatibility scores are AI-generated alignment indicators based on historical admission benchmarks. We strictly distinguish verified data from AI estimates and never fabricate admission guarantees or financial statistics.
          </p>
        </div>

        <button
          onClick={onStartAssessment}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shrink-0 shadow-md transition-all"
        >
          Begin Free Assessment
        </button>
      </section>

    </div>
  );
};
