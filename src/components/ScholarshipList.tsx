import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Search, CheckCircle, ShieldCheck } from 'lucide-react';
import { Scholarship, StudentProfile, Language } from '../types';

interface ScholarshipListProps {
  scholarships: Scholarship[];
  studentProfile?: StudentProfile | null;
  lang: Language;
}

export const ScholarshipList: React.FC<ScholarshipListProps> = ({
  scholarships,
  studentProfile,
  lang
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = scholarships.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/20 border border-amber-300/40 text-amber-100 uppercase tracking-wider">
            Funding Opportunities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Scholarships & Grants for Myanmar Students
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Scholarship recommendations are matched against academic profile and entrance benchmarks.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <Award className="w-7 h-7 text-amber-200" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search scholarship name, university, or eligibility keywords..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
        />
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((sch) => {
          let meetsAcademic = true;
          if (studentProfile && sch.minTotalMarks) {
            meetsAcademic = studentProfile.totalMarks >= sch.minTotalMarks;
          }

          return (
            <div
              key={sch.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                    {sch.provider}
                  </span>
                  
                  {studentProfile && (
                    meetsAcademic ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Profile Meets Criteria</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Requires ≥ {sch.minTotalMarks} Marks
                      </span>
                    )
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {sch.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sch.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-500">Requirements:</span>
                  <span className="font-bold text-slate-800">{sch.academicRequirements}</span>
                </div>
                <div className="flex items-center justify-between font-medium pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Application Deadline:</span>
                  </span>
                  <span className="font-bold text-amber-900">{sch.applicationDeadline}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Verified Scholarship
                </span>
                <a
                  href={sch.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
                >
                  <span>Official Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
