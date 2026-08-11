import React, { useState } from 'react';
import {
  User,
  Calendar,
  Award,
  Sparkles,
  MapPin,
  BookOpen,
  Building,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { StudentProfile, Language, SubjectMarks } from '../types';
import { StepProgress } from './StepProgress';
import { translations } from '../data/translations';

interface AssessmentFormProps {
  onSubmitProfile: (profile: StudentProfile) => void;
  lang: Language;
  initialProfile?: StudentProfile | null;
}

const INTEREST_OPTIONS = [
  { id: 'Computer Science', label: 'Computer Science', icon: '💻' },
  { id: 'Artificial Intelligence', label: 'Artificial Intelligence (AI)', icon: '🤖' },
  { id: 'Engineering', label: 'Engineering & Robotics', icon: '⚙️' },
  { id: 'Medicine', label: 'Medicine & Healthcare', icon: '🩺' },
  { id: 'Business', label: 'Business & Management', icon: '📊' },
  { id: 'Economics', label: 'Economics & Statistics', icon: '📈' },
  { id: 'Finance', label: 'Finance & Banking', icon: '🏦' },
  { id: 'Law', label: 'Law & International Relations', icon: '⚖️' },
  { id: 'Education', label: 'Education & Pedagogy', icon: '🎓' },
  { id: 'Architecture', label: 'Architecture & Urban Planning', icon: '🏛️' },
  { id: 'Design', label: 'Digital Design & UX', icon: '🎨' },
  { id: 'Mathematics', label: 'Mathematics & Data Science', icon: '📐' },
  { id: 'Natural Sciences', label: 'Physics, Chemistry & Bio Sciences', icon: '🔬' },
  { id: 'Social Sciences', label: 'Psychology & Social Sciences', icon: '🌍' },
  { id: 'Media & Communication', label: 'Media, Journalism & PR', icon: '🎙️' },
  { id: 'Agriculture', label: 'Agriculture & Agribusiness', icon: '🌾' },
  { id: 'Environmental Science', label: 'Environmental & Marine Science', icon: '🌱' }
];

const CAREER_OPTIONS = [
  'Software Engineer',
  'AI Engineer',
  'Doctor',
  'Engineer',
  'Data Scientist',
  'Business Manager',
  'Entrepreneur',
  'Lawyer',
  'Teacher',
  'Researcher',
  'Architect',
  'Designer',
  'Accountant',
  'Economist',
  'Scientist',
  'Journalist',
  'Government/Development sector',
  "I'm not sure yet"
];

const MYANMAR_LOCATIONS = [
  'Yangon',
  'Mandalay',
  'Naypyidaw',
  'Taunggyi',
  'Mawlamyine',
  'Other',
  'No preference'
];

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  onSubmitProfile,
  lang,
  initialProfile
}) => {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form States
  const [name, setName] = useState<string>(initialProfile?.name || '');
  const [matriculationYear, setMatriculationYear] = useState<number>(initialProfile?.matriculationYear || 2026);
  const [totalMarks, setTotalMarks] = useState<number | ''>(initialProfile?.totalMarks || 480);
  
  // Subject Marks
  const [mathMark, setMathMark] = useState<number | ''>(initialProfile?.subjectMarks?.mathematics ?? 80);
  const [englishMark, setEnglishMark] = useState<number | ''>(initialProfile?.subjectMarks?.english ?? 75);
  const [myanmarMark, setMyanmarMark] = useState<number | ''>(initialProfile?.subjectMarks?.myanmar ?? 70);
  const [physicsMark, setPhysicsMark] = useState<number | ''>(initialProfile?.subjectMarks?.physics ?? 75);
  const [chemistryMark, setChemistryMark] = useState<number | ''>(initialProfile?.subjectMarks?.chemistry ?? 70);
  const [biologyMark, setBiologyMark] = useState<number | ''>(initialProfile?.subjectMarks?.biology ?? '');
  const [economicsMark, setEconomicsMark] = useState<number | ''>(initialProfile?.subjectMarks?.economics ?? '');
  const [geographyMark, setGeographyMark] = useState<number | ''>(initialProfile?.subjectMarks?.geography ?? '');
  const [historyMark, setHistoryMark] = useState<number | ''>(initialProfile?.subjectMarks?.history ?? '');

  // Step 2 & 3 & 4
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialProfile?.interests || ['Computer Science', 'Artificial Intelligence', 'Engineering']
  );
  const [selectedCareers, setSelectedCareers] = useState<string[]>(
    initialProfile?.careerGoals || ['Software Engineer', 'AI Engineer']
  );
  const [preferredLocation, setPreferredLocation] = useState<string>(
    initialProfile?.preferredLocation || 'Yangon'
  );
  const [learningPreference, setLearningPreference] = useState<'practical' | 'theory' | 'balanced' | 'not_sure'>(
    initialProfile?.learningPreference || 'practical'
  );
  const [universityTypePreference, setUniversityTypePreference] = useState<'public' | 'private' | 'international' | 'no_preference'>(
    initialProfile?.universityTypePreference || 'public'
  );

  const stepTitles = [
    t.step1Title,
    t.step2Title,
    t.step3Title,
    t.step4Title
  ];

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((i) => i !== interestId) : [...prev, interestId]
    );
  };

  const handleCareerToggle = (career: string) => {
    if (career === "I'm not sure yet") {
      setSelectedCareers(["I'm not sure yet"]);
      return;
    }
    const filtered = selectedCareers.filter((c) => c !== "I'm not sure yet");
    if (filtered.includes(career)) {
      setSelectedCareers(filtered.filter((c) => c !== career));
    } else {
      setSelectedCareers([...filtered, career]);
    }
  };

  const validateStep1 = (): boolean => {
    setErrorMsg('');
    if (!name.trim()) {
      setErrorMsg('Please enter the student full name.');
      return false;
    }
    if (totalMarks === '' || Number(totalMarks) < 0 || Number(totalMarks) > 600) {
      setErrorMsg('Please enter a valid total matriculation mark between 0 and 600.');
      return false;
    }
    
    // Check subject mark maximum limit of 100
    const subjectList = [
      { name: 'Mathematics', val: mathMark },
      { name: 'English', val: englishMark },
      { name: 'Myanmar', val: myanmarMark },
      { name: 'Physics', val: physicsMark },
      { name: 'Chemistry', val: chemistryMark },
      { name: 'Biology', val: biologyMark },
      { name: 'Economics', val: economicsMark },
      { name: 'Geography', val: geographyMark },
      { name: 'History', val: historyMark }
    ];

    for (const sub of subjectList) {
      if (sub.val !== '' && (Number(sub.val) < 0 || Number(sub.val) > 100)) {
        setErrorMsg(`${sub.name} mark must be between 0 and 100.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    } else if (currentStep === 2) {
      if (selectedInterests.length === 0) {
        setErrorMsg('Please select at least one interest to help AI personalize recommendations.');
        return;
      }
      setErrorMsg('');
    } else if (currentStep === 3) {
      if (selectedCareers.length === 0) {
        setErrorMsg('Please select at least one career goal or choose "I\'m not sure yet".');
        return;
      }
      setErrorMsg('');
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    const subjectMarks: SubjectMarks = {};
    if (mathMark !== '') subjectMarks.mathematics = Number(mathMark);
    if (englishMark !== '') subjectMarks.english = Number(englishMark);
    if (myanmarMark !== '') subjectMarks.myanmar = Number(myanmarMark);
    if (physicsMark !== '') subjectMarks.physics = Number(physicsMark);
    if (chemistryMark !== '') subjectMarks.chemistry = Number(chemistryMark);
    if (biologyMark !== '') subjectMarks.biology = Number(biologyMark);
    if (economicsMark !== '') subjectMarks.economics = Number(economicsMark);
    if (geographyMark !== '') subjectMarks.geography = Number(geographyMark);
    if (historyMark !== '') subjectMarks.history = Number(historyMark);

    const profile: StudentProfile = {
      name: name.trim(),
      matriculationYear: Number(matriculationYear),
      totalMarks: Number(totalMarks),
      subjectMarks,
      interests: selectedInterests,
      careerGoals: selectedCareers,
      preferredLocation,
      learningPreference,
      universityTypePreference
    };

    onSubmitProfile(profile);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-10 my-8">
      
      {/* Step Header */}
      <StepProgress
        currentStep={currentStep}
        totalSteps={4}
        stepTitles={stepTitles}
        lang={lang}
      />

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2 animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* STEP 1: ACADEMIC INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Step 1: {t.step1Title}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your Matriculation Examination results. Only enter marks for subjects you completed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.studentNameLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Aung Kyaw Soe"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Exam Year */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.matriculationYearLabel}
                </label>
                <select
                  value={matriculationYear}
                  onChange={(e) => setMatriculationYear(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white"
                >
                  <option value={2026}>2026 Examination</option>
                  <option value={2025}>2025 Examination</option>
                  <option value={2024}>2024 Examination</option>
                  <option value={2023}>2023 Examination</option>
                </select>
              </div>

              {/* Total Marks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.totalMarksLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={600}
                  required
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g., 485"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm font-bold text-blue-700"
                />
              </div>

            </div>

            {/* Individual Subject Marks Grid */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Individual Subject Marks (Max 100 per subject)</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.mathMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={mathMark}
                    onChange={(e) => setMathMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0-100"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.englishMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={englishMark}
                    onChange={(e) => setEnglishMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0-100"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.myanmarMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={myanmarMark}
                    onChange={(e) => setMyanmarMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0-100"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.physicsMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={physicsMark}
                    onChange={(e) => setPhysicsMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0-100"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.chemistryMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={chemistryMark}
                    onChange={(e) => setChemistryMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0-100"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.biologyMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={biologyMark}
                    onChange={(e) => setBiologyMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.economicsMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={economicsMark}
                    onChange={(e) => setEconomicsMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.geographyMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={geographyMark}
                    onChange={(e) => setGeographyMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.historyMarkLabel}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={historyMark}
                    onChange={(e) => setHistoryMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INTERESTS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Step 2: {t.step2Title}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your academic areas of interest (Multiple choices allowed).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEREST_OPTIONS.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleInterestToggle(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-snug">{item.label}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[3]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: CAREER GOALS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>Step 3: {t.step3Title}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                What type of career are you interested in pursuing after university?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CAREER_OPTIONS.map((career) => {
                const isSelected = selectedCareers.includes(career);
                const isUndecided = career === "I'm not sure yet";

                return (
                  <div
                    key={career}
                    onClick={() => handleCareerToggle(career)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? isUndecided
                          ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900 font-bold'
                          : 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 text-blue-900 font-bold'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs">{career}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1 stroke-[3]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: PREFERENCES */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Step 4: {t.step4Title}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help us align location and learning environment preferences. (No budget questions asked).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Preferred Location */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Preferred Myanmar Location</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MYANMAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setPreferredLocation(loc)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        preferredLocation === loc
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Learning Environment Style</span>
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'practical', label: 'More practical / project-based learning' },
                    { id: 'theory', label: 'More theory / research-based learning' },
                    { id: 'balanced', label: 'Balanced approach' },
                    { id: 'not_sure', label: 'Not sure' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setLearningPreference(style.id as any)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        learningPreference === style.id
                          ? 'bg-blue-50 border-blue-500 text-blue-800 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* University Type */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span>University Category Preference</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'public', label: 'Public University' },
                    { id: 'private', label: 'Private University' },
                    { id: 'international', label: 'International Pathway' },
                    { id: 'no_preference', label: 'No Preference' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUniversityTypePreference(type.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        universityTypePreference === type.id
                          ? 'bg-purple-50 border-purple-500 text-purple-800 ring-2 ring-purple-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Navigation Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.previousStep}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center space-x-1"
            >
              <span>{t.nextStep}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.submitAssessment}</span>
            </button>
          )}
        </div>

      </form>
    </div>
  );
};
