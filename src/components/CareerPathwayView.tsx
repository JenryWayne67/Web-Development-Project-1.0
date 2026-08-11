import React from 'react';
import { Compass, GraduationCap, Layers, Briefcase, Wrench, Sparkles } from 'lucide-react';
import { Recommendation } from '../types';

interface CareerPathwayViewProps {
  recommendation: Recommendation;
}

export const CareerPathwayView: React.FC<CareerPathwayViewProps> = ({ recommendation }) => {
  const { program, careerPathway } = recommendation;

  if (!careerPathway) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6 my-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Career Pathway Roadmap
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            {program.name}
          </h3>
        </div>
      </div>

      {/* Visual Flow Steps */}
      <div className="relative space-y-6 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 text-xs">
        
        {/* Step 1: Degree */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span>1. University Degree</span>
          </div>
          <p className="text-slate-700 font-bold leading-snug">
            {program.degree}
          </p>
          <span className="text-[10px] text-slate-500 block mt-2">
            Duration: {program.durationYears} Years
          </span>
        </div>

        {/* Step 2: Specializations */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <span>2. Specializations</span>
          </div>
          <ul className="space-y-1 text-slate-700 font-medium">
            {careerPathway.specializations.map((spec, i) => (
              <li key={i} className="flex items-center space-x-1">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step 3: Careers */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <span>3. Potential Careers</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {careerPathway.potentialCareers.map((car, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                {car}
              </span>
            ))}
          </div>
        </div>

        {/* Step 4: Recommended Skills */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <span>4. Key Skills</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            {careerPathway.recommendedSkills.join(' • ')}
          </p>
        </div>

      </div>

      {/* Rationale Note */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-indigo-900 mb-0.5">AI Relevance Explanation:</span>
          <p className="leading-relaxed text-slate-700">{careerPathway.relevanceExplanation}</p>
        </div>
      </div>

    </div>
  );
};
