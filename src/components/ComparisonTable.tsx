import React from 'react';
import { Recommendation, Language } from '../types';
import { ExternalLink, X, Scale, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { translations } from '../data/translations';

interface ComparisonTableProps {
  compared: Recommendation[];
  onRemove: (recommendation: Recommendation) => void;
  lang: Language;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  compared,
  onRemove,
  lang
}) => {
  const t = translations[lang];

  if (compared.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
          <Scale className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Programs Selected for Comparison</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select "Compare" on 2 to 3 program cards from your assessment results or program catalog to view a side-by-side breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden my-8">
      
      <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <span>Side-by-Side Program Comparison ({compared.length}/3)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare academic entry benchmarks, duration, compatibility, and requirements.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          
          {/* Header Row: Universities */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 w-44 font-bold text-slate-600 uppercase text-[10px] tracking-wider bg-slate-100/80 sticky left-0 z-10">
                Criteria
              </th>
              {compared.map((rec) => (
                <th key={rec.id} className="p-4 min-w-[240px] font-bold text-slate-900 border-l border-slate-200 relative">
                  <button
                    onClick={() => onRemove(rec)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-sm text-blue-700 font-extrabold">{rec.program.name}</div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">{rec.university.name}</div>
                  <span className="inline-block px-2 py-0.5 mt-1 text-[10px] bg-slate-200 text-slate-800 rounded font-bold uppercase">
                    {rec.university.location} • {rec.university.type}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/80">
            
            {/* Overall Match */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Overall AI Match
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-black text-base text-blue-700">
                  {rec.matchScores.overallMatch}% Match
                </td>
              ))}
            </tr>

            {/* Academic Match */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Academic Fit Score
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-bold text-slate-800">
                  {rec.matchScores.academicMatch}%
                </td>
              ))}
            </tr>

            {/* Interest Fit */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Interest Alignment
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-bold text-slate-800">
                  {rec.matchScores.interestMatch}%
                </td>
              ))}
            </tr>

            {/* Career Alignment */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Career Alignment
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-bold text-slate-800">
                  {rec.matchScores.careerMatch}%
                </td>
              ))}
            </tr>

            {/* Calculated Eligibility */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Calculated Eligibility
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200">
                  {rec.eligibilityStatus === 'eligible' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Eligible</span>
                    </span>
                  )}
                  {rec.eligibilityStatus === 'possibly_eligible' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Possibly Eligible</span>
                    </span>
                  )}
                  {rec.eligibilityStatus === 'not_eligible' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Not Eligible</span>
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Min Marks Requirement */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Min Total Marks
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-bold text-slate-900">
                  ≥ {rec.program.minTotalMarks} Marks
                </td>
              ))}
            </tr>

            {/* Required Subjects */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Required Subject Cutoffs
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200">
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {rec.program.requiredSubjects.map((sub, i) => (
                      <li key={i}>
                        • <span className="font-semibold uppercase">{sub.subject}</span>: ≥ {sub.minMark || 50}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Degree & Duration */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Degree & Duration
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 font-medium text-slate-800">
                  {rec.program.degree} ({rec.program.durationYears} Years)
                </td>
              ))}
            </tr>

            {/* Learning Style */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Learning Style
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200 capitalize font-medium text-slate-800">
                  {rec.program.learningStyle}
                </td>
              ))}
            </tr>

            {/* Official Link */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/80 sticky left-0 z-10">
                Official Website
              </td>
              {compared.map((rec) => (
                <td key={rec.id} className="p-4 border-l border-slate-200">
                  <a
                    href={rec.program.officialLink || rec.university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 font-bold hover:underline"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
