import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header, Footer } from './components/common';
import { AssessmentForm } from './components/assessment';
import { ComparisonTable, UniversityDetailsModal } from './components/university';
import { ScholarshipList, DeadlineDashboard } from './components/scholarship';
import { AIAdvisorChatModal } from './components/advisor';

import { LandingPage, DashboardPage, ProgramsPage } from './pages';

import {
  StudentProfile,
  Recommendation,
  University,
  Program,
  Scholarship,
  ApplicationDeadline,
  Language
} from './types';
import {
  fetchUniversities,
  fetchPrograms,
  fetchScholarships,
  fetchDeadlines,
  generateRecommendations
} from './services/api';
import { translations } from './data/translations';
import { Sparkles, Bot } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Datasets
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [deadlines, setDeadlines] = useState<ApplicationDeadline[]>([]);

  // Student Profile & Recommendations State
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [savedRecs, setSavedRecs] = useState<Recommendation[]>([]);
  const [comparedRecs, setComparedRecs] = useState<Recommendation[]>([]);
  
  // Selected Modal Recommendation
  const [selectedDetailRec, setSelectedDetailRec] = useState<Recommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Load initial datasets on mount
  useEffect(() => {
    async function loadData() {
      const [unis, progs, schs, dls] = await Promise.all([
        fetchUniversities(),
        fetchPrograms(),
        fetchScholarships(),
        fetchDeadlines()
      ]);
      setUniversities(unis);
      setPrograms(progs);
      setScholarships(schs);
      setDeadlines(dls);
    }
    loadData();
  }, []);

  // Handle student profile submission
  const handleProfileSubmit = async (profile: StudentProfile) => {
    setIsAnalyzing(true);
    setStudentProfile(profile);

    try {
      const recs = await generateRecommendations(profile);
      setRecommendations(recs);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas fail
      }

      setCurrentTab('dashboard');
    } catch (e) {
      console.error('Failed to generate recommendations:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Compare toggles
  const handleToggleCompare = (rec: Recommendation) => {
    setComparedRecs((prev) => {
      const exists = prev.some((r) => r.id === rec.id);
      if (exists) {
        return prev.filter((r) => r.id !== rec.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 programs at a time.');
          return prev;
        }
        return [...prev, rec];
      }
    });
  };

  // Save toggles
  const handleToggleSave = (rec: Recommendation) => {
    setSavedRecs((prev) => {
      const exists = prev.some((r) => r.id === rec.id);
      if (exists) return prev.filter((r) => r.id !== rec.id);
      return [...prev, rec];
    });
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        savedCount={savedRecs.length}
        openChat={() => setIsChatOpen(true)}
        hasAssessment={!!studentProfile}
      />

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Analyzing / Loading State Overlay */}
        {isAnalyzing && (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              {t.analyzingText}
            </h3>
            <p className="text-xs text-slate-500">
              Cross-referencing Matriculation marks, subject prerequisites, location preferences, and career goals.
            </p>
          </div>
        )}

        {!isAnalyzing && (
          <>
            {/* Landing Page */}
            {currentTab === 'landing' && (
              <LandingPage
                onStartAssessment={() => setCurrentTab('assessment')}
                onExplorePrograms={() => setCurrentTab('programs')}
                lang={lang}
              />
            )}

            {/* Assessment Multi-Step Form */}
            {currentTab === 'assessment' && (
              <div className="py-6">
                <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase">
                    Personalized Student Assessment
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    Find Which Programs Match Your Results
                  </h2>
                </div>

                <AssessmentForm
                  onSubmitProfile={handleProfileSubmit}
                  lang={lang}
                  initialProfile={studentProfile}
                />
              </div>
            )}

            {/* Student Dashboard */}
            {currentTab === 'dashboard' && studentProfile && (
              <DashboardPage
                profile={studentProfile}
                recommendations={recommendations}
                onRetakeAssessment={() => setCurrentTab('assessment')}
                onViewDetails={(rec) => setSelectedDetailRec(rec)}
                comparedIds={comparedRecs.map((r) => r.id)}
                onToggleCompare={handleToggleCompare}
                savedRecs={savedRecs}
                onToggleSave={handleToggleSave}
                openChat={() => setIsChatOpen(true)}
                lang={lang}
              />
            )}

            {/* Programs Catalog */}
            {currentTab === 'programs' && (
              <ProgramsPage
                programs={programs}
                universities={universities}
                onSelectProgram={(rec) => setSelectedDetailRec(rec)}
                studentProfile={studentProfile}
                lang={lang}
              />
            )}

            {/* Compare Page */}
            {currentTab === 'compare' && (
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900">
                    University Comparison Matrix
                  </h2>
                  {comparedRecs.length > 0 && (
                    <button
                      onClick={() => setComparedRecs([])}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Clear Comparison List
                    </button>
                  )}
                </div>

                <ComparisonTable
                  compared={comparedRecs}
                  onRemove={handleToggleCompare}
                  lang={lang}
                />
              </div>
            )}

            {/* Scholarships Page */}
            {currentTab === 'scholarships' && (
              <div className="py-6">
                <ScholarshipList
                  scholarships={scholarships}
                  studentProfile={studentProfile}
                  lang={lang}
                />
              </div>
            )}

            {/* Application Deadlines Page */}
            {currentTab === 'deadlines' && (
              <div className="py-6">
                <DeadlineDashboard
                  deadlines={deadlines}
                  lang={lang}
                />
              </div>
            )}
          </>
        )}

      </main>

      {/* Floating Chat Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl flex items-center space-x-2 transition-transform hover:scale-105 border-2 border-white"
          title="Open AI University Advisor Chat"
        >
          <Bot className="w-6 h-6 text-amber-300" />
          <span className="hidden sm:inline font-bold text-xs pr-1">Ask AI Advisor</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <UniversityDetailsModal
        recommendation={selectedDetailRec}
        onClose={() => setSelectedDetailRec(null)}
        lang={lang}
      />

      <AIAdvisorChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        studentProfile={studentProfile}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={(tab) => setCurrentTab(tab)}
      />

    </div>
  );
}
