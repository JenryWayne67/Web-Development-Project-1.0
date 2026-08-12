import React, { useState } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { Program, University, Language, Recommendation, StudentProfile } from '../types';
import { calculateProgramMatch } from '../../ai/recommendation/scoring';
import { translations } from '../data/translations';

interface ProgramsPageProps {
  programs: Program[];
  universities: University[];
  onSelectProgram: (rec: Recommendation) => void;
  studentProfile?: StudentProfile | null;
  lang: Language;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  programs,
  universities,
  onSelectProgram,
  studentProfile,
  lang
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [fieldFilter, setFieldFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Locations list
  const locations = ['All', 'Yangon', 'Mandalay', 'Naypyidaw', 'Mawlamyine', 'Taunggyi'];
  const fields = ['All', 'Computer Science', 'Engineering', 'Medicine', 'Business', 'Economics', 'Law', 'Agriculture'];

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.field.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter === 'All' || p.universityLocation.toLowerCase() === locationFilter.toLowerCase();
    const matchesField = fieldFilter === 'All' || p.field.toLowerCase().includes(fieldFilter.toLowerCase());
    const matchesType = typeFilter === 'All' || p.universityType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesField && matchesType;
  });

  const handleProgramClick = (program: Program) => {
    const uni = universities.find((u) => u.id === program.universityId) || universities[0];
    const dummyProfile: StudentProfile = studentProfile || {
      name: 'Guest Student',
      matriculationYear: 2026,
      totalMarks: 480,
      subjectMarks: { mathematics: 80, english: 75, physics: 70 },
      interests: [program.field],
      careerGoals: ['Professional'],
      preferredLocation: program.universityLocation,
      learningPreference: 'practical',
      universityTypePreference: 'public'
    };

    const rec = calculateProgramMatch(dummyProfile, program, uni);
    onSelectProgram(rec);
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-black">
          Myanmar University & Degree Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Browse verified degree programs, admission mark requirements, required subjects, and duration across public and private institutes.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">
              Location Filter
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">
              Study Field
            </label>
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f === 'All' ? 'All Fields' : f}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">
              University Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              <option value="All">All Types</option>
              <option value="public">Public Universities</option>
              <option value="private">Private Institutes</option>
            </select>
          </div>

        </div>

      </div>

      {/* Program Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            onClick={() => handleProgramClick(program)}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-4 cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                  {program.field}
                </span>
                <span className="flex items-center space-x-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{program.universityLocation} • {program.universityType.toUpperCase()}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                {program.name}
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {program.universityName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span>Min Total Requirement:</span>
                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  ≥ {program.minTotalMarks} Marks
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span>Degree & Duration:</span>
                <span className="font-bold text-slate-900">
                  {program.degree} ({program.durationYears} Yrs)
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Click to view details & score fit
              </span>
              <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center space-x-1 group-hover:bg-blue-600 transition-colors">
                <span>{t.viewDetails}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
