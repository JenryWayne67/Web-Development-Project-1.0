import React from 'react';
import { Sparkles, MapPin, CheckCircle, AlertTriangle, XCircle, ChevronRight, Scale, BookOpen, Clock } from 'lucide-react';
import { Recommendation, Language } from '../types';
import { translations } from '../data/translations';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank: number;
  lang: Language;
  onViewDetails: (recommendation: Recommendation) => void;
  isCompared: boolean;
  onToggleCompare: (recommendation: Recommendation) => void;
  isSaved?: boolean;
  onToggleSave?: (recommendation: Recommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rank,
  lang,
  onViewDetails,
  isCompared,
  onToggleCompare,
  isSaved: _isSaved,
  onToggleSave: _onToggleSave
}) => {
  const t = translations[lang];
  const { program, university, matchScores, eligibilityStatus, aiExplanation } = recommendation;

  // Eligibility styling
  let eligibilityBadge = null;
  if (eligibilityStatus === 'eligible') {
    eligibilityBadge = (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>{t.eligibleBadge}</span>
      </span>
    );
  } else if (eligibilityStatus === 'possibly_eligible') {
    eligibilityBadge = (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span>{t.possiblyEligibleBadge}</span>
      </span>
    );
  } else {
    eligibilityBadge = (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>{t.notEligibleBadge}</span>
      </span>
    );
  }

  // Score color ring
  const overall = matchScores.overallMatch;
  let ringColor = 'border-blue-600 text-blue-700';
  if (overall >= 90) ringColor = 'border-emerald-600 text-emerald-700 bg-emerald-50/50';
  else if (overall >= 80) ringColor = 'border-blue-600 text-blue-700 bg-blue-50/50';
  else if (overall >= 70) ringColor = 'border-amber-500 text-amber-700 bg-amber-50/50';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-200 p-5 sm:p-6 relative flex flex-col justify-between group">
      
      {/* Top Banner Row */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start space-x-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
            #{rank}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{university.location} • {university.type.toUpperCase()}</span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug truncate group-hover:text-blue-700 transition-colors">
              {program.name}
            </h3>
            <p className="text-xs font-semibold text-slate-600 truncate mt-0.5">
              {university.name}
            </p>
          </div>
        </div>

        {/* Overall Score Badge */}
        <div className={`p-2.5 rounded-2xl border-2 ${ringColor} text-center shrink-0 min-w-[76px]`}>
          <div className="text-xl font-black leading-none">{overall}%</div>
          <div className="text-[9px] font-bold uppercase tracking-wider mt-0.5 opacity-80">Match</div>
        </div>
      </div>

      {/* Program Quick Specs & Eligibility */}
      <div className="my-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {eligibilityBadge}

          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium flex items-center space-x-1">
            <BookOpen className="w-3 h-3 text-slate-500" />
            <span>{program.degree}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{program.durationYears} Years</span>
          </span>

          <span className="px-2 py-0.5 text-[10px] rounded-md font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Req Total: ≥ {program.minTotalMarks}
          </span>
        </div>

        {/* Match Scores Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-500 font-medium block">{t.academicMatch}</span>
            <span className="font-bold text-slate-800">{matchScores.academicMatch}%</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-500 font-medium block">{t.interestMatch}</span>
            <span className="font-bold text-slate-800">{matchScores.interestMatch}%</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-500 font-medium block">{t.careerMatch}</span>
            <span className="font-bold text-slate-800">{matchScores.careerMatch}%</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-500 font-medium block">{t.locationMatch}</span>
            <span className="font-bold text-slate-800">{matchScores.locationMatch}%</span>
          </div>
        </div>

        {/* AI Match Explanation */}
        <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-xs text-blue-950 space-y-1">
          <p className="font-bold text-blue-800 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Why this matches you:</span>
          </p>
          <p className="leading-relaxed line-clamp-2 text-slate-700">
            {aiExplanation}
          </p>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        
        {/* Compare Checkbox */}
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare(recommendation)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <span className="flex items-center space-x-1">
            <Scale className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.comparePrograms}</span>
          </span>
        </label>

        {/* Details CTA */}
        <button
          onClick={() => onViewDetails(recommendation)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1"
        >
          <span>{t.viewDetails}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
