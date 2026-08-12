import React, { useState } from 'react';
import {
  StudentProfile,
  Recommendation,
  Language
} from '../types';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  MessageSquareText
} from 'lucide-react';
import { RecommendationCard } from '../components/RecommendationCard';
import { CareerPathwayView } from '../components/CareerPathwayView';

interface DashboardPageProps {
  profile: StudentProfile;
  recommendations: Recommendation[];
  onRetakeAssessment: () => void;
  onViewDetails: (rec: Recommendation) => void;
  comparedIds: string[];
  onToggleCompare: (rec: Recommendation) => void;
  savedRecs: Recommendation[];
  onToggleSave: (rec: Recommendation) => void;
  openChat: () => void;
  lang: Language;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  recommendations,
  onRetakeAssessment,
  onViewDetails,
  comparedIds,
  onToggleCompare,
  savedRecs,
  onToggleSave,
  openChat,
  lang
}) => {
  void lang;
  const [filterSort, setFilterSort] = useState<'highest' | 'academic' | 'career'>('highest');

  // Filter recommendations based on sort
  const sortedRecs = [...recommendations].sort((a, b) => {
    if (filterSort === 'academic') {
      return b.matchScores.academicMatch - a.matchScores.academicMatch;
    } else if (filterSort === 'career') {
      return b.matchScores.careerMatch - a.matchScores.careerMatch;
    }
    return b.matchScores.overallMatch - a.matchScores.overallMatch;
  });

  // Eligibility counters
  const eligibleCount = recommendations.filter((r) => r.eligibilityStatus === 'eligible').length;
  const possiblyCount = recommendations.filter((r) => r.eligibilityStatus === 'possibly_eligible').length;
  const notEligibleCount = recommendations.filter((r) => r.eligibilityStatus === 'not_eligible').length;

  const topRec = sortedRecs[0];

  return (
    <div className="space-y-8 py-6">
      
      {/* STUDENT PROFILE HEADER SUMMARY CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Student Dashboard
            </span>
            <span className="text-xs text-slate-400">
              Matriculation Year {profile.matriculationYear}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {profile.name}!
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 font-bold text-amber-300">
              Total Score: {profile.totalMarks} / 600
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 font-medium">
              Location: {profile.preferredLocation}
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 font-medium">
              Style: {profile.learningPreference}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={openChat}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-colors flex items-center space-x-1.5"
          >
            <MessageSquareText className="w-4 h-4 text-amber-300" />
            <span>Ask AI Advisor</span>
          </button>

          <button
            onClick={onRetakeAssessment}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Update Assessment</span>
          </button>
        </div>
      </div>

      {/* ELIGIBILITY STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Eligible Programs</span>
            <span className="text-2xl font-black text-slate-900">{eligibleCount}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Possibly Eligible</span>
            <span className="text-2xl font-black text-slate-900">{possiblyCount}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Not Eligible</span>
            <span className="text-2xl font-black text-slate-900">{notEligibleCount}</span>
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Personalized Recommendations</span>
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated based on your Matriculation results, subject marks, and career aspirations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 text-xs bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterSort('highest')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filterSort === 'highest' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highest Match
            </button>
            <button
              onClick={() => setFilterSort('academic')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filterSort === 'academic' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Academic Fit
            </button>
            <button
              onClick={() => setFilterSort('career')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filterSort === 'career' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Career Fit
            </button>
          </div>
        </div>

        {/* Recommendation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedRecs.map((rec, index) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              rank={index + 1}
              lang={lang}
              onViewDetails={onViewDetails}
              isCompared={comparedIds.includes(rec.id)}
              onToggleCompare={onToggleCompare}
              isSaved={savedRecs.some((s) => s.id === rec.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </div>

      {/* TOP CAREER PATHWAY PREVIEW */}
      {topRec && (
        <div className="pt-4">
          <CareerPathwayView recommendation={topRec} />
        </div>
      )}

    </div>
  );
};
