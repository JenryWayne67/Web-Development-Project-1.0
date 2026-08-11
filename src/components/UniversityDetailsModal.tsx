import React from 'react';
import {
  X,
  Building,
  MapPin,
  ExternalLink,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  Calendar,
  Compass,
  GraduationCap
} from 'lucide-react';
import { Recommendation, Language } from '../types';
import { translations } from '../data/translations';

interface UniversityDetailsModalProps {
  recommendation: Recommendation | null;
  onClose: () => void;
  lang: Language;
}

export const UniversityDetailsModal: React.FC<UniversityDetailsModalProps> = ({
  recommendation,
  onClose,
  lang
}) => {
  if (!recommendation) return null;

  const t = translations[lang];
  const { program, university, matchScores, eligibilityStatus, eligibilityDetails, aiExplanation, careerPathway, availableScholarships } = recommendation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {university.type.toUpperCase()}
            </span>
            <span className="text-xs text-slate-300 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{university.location}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {program.name}
          </h2>
          <p className="text-sm font-medium text-slate-300 mt-1">
            {university.name}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800">
          
          {/* Compatibility Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                AI Compatibility Scores
              </h4>
              <span className="text-xs font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Overall: {matchScores.overallMatch}% Match
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">{t.academicMatch}</span>
                <span className="font-bold text-slate-900">{matchScores.academicMatch}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">{t.interestMatch}</span>
                <span className="font-bold text-slate-900">{matchScores.interestMatch}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">{t.careerMatch}</span>
                <span className="font-bold text-slate-900">{matchScores.careerMatch}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">{t.locationMatch}</span>
                <span className="font-bold text-slate-900">{matchScores.locationMatch}%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 italic">
              * Compatibility percentages are AI-generated alignment scores, not official university admission predictions.
            </p>
          </div>

          {/* Admission Requirements & Eligibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Admission Requirements & Eligibility Status</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">Calculated Eligibility:</span>
                {eligibilityStatus === 'eligible' && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Eligible</span>
                  </span>
                )}
                {eligibilityStatus === 'possibly_eligible' && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Possibly Eligible</span>
                  </span>
                )}
                {eligibilityStatus === 'not_eligible' && (
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 flex items-center space-x-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Not Eligible</span>
                  </span>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed">
                {program.admissionRequirementsSummary}
              </p>

              {/* Requirements details list */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Requirement Breakdown</span>
                {eligibilityDetails.map((req, i) => (
                  <div key={i} className="flex items-start justify-between text-[11px] py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-800">{req.requirementName}</span>
                    <span className={`font-medium ${req.met === true ? 'text-emerald-700' : req.met === false ? 'text-rose-700' : 'text-amber-700'}`}>
                      {req.note}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 font-medium">
                <strong>Eligibility ≠ Admission Guarantee:</strong> This estimate is based on available historical matriculation benchmarks.
              </div>
            </div>
          </div>

          {/* Career Pathway */}
          {careerPathway && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Career Pathway & Future Specializations</span>
              </h4>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-3">
                <div>
                  <span className="font-bold text-indigo-950 block mb-1">Potential Specializations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {careerPathway.specializations.map((spec, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white border border-indigo-200/80 text-indigo-900 rounded-lg font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-indigo-950 block mb-1">Target Careers:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {careerPathway.potentialCareers.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-indigo-950 block mb-1">Key Recommended Skills:</span>
                  <p className="text-slate-700">{careerPathway.recommendedSkills.join(' • ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scholarships */}
          {availableScholarships.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Available Scholarships</span>
              </h4>

              <div className="space-y-2">
                {availableScholarships.map((sch) => (
                  <div key={sch.id} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900">{sch.name}</h5>
                      <p className="text-slate-600 mt-0.5">{sch.description}</p>
                      <span className="text-[10px] text-amber-800 font-semibold block mt-1">
                        Deadline: {sch.applicationDeadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Website Button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

            <a
              href={program.officialLink || university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
