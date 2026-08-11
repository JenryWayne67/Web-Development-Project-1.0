import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  lang: Language;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      
      {/* Top step count text */}
      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600">
        <span className="text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {t.stepProgress.replace('{current}', String(currentStep)).replace('{total}', String(totalSteps))}
        </span>
        <span className="text-slate-500 font-medium">
          {stepTitles[currentStep - 1]}
        </span>
      </div>

      {/* Progress Line & Nodes */}
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full -z-0" />
        
        {/* Active filled track line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-300 ease-out -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {stepTitles.map((title, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-xs ${
                  isCompleted
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : isCurrent
                    ? 'bg-blue-700 text-white ring-4 ring-blue-200 scale-110'
                    : 'bg-white border-2 border-slate-300 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={`mt-2 text-[11px] font-medium hidden sm:block max-w-[100px] text-center leading-tight ${
                  isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
