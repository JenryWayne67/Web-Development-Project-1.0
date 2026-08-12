import React from 'react';
import { Calendar, AlertTriangle, CheckCircle2, Hourglass, Building } from 'lucide-react';
import { ApplicationDeadline, Language } from '../types';

interface DeadlineDashboardProps {
  deadlines: ApplicationDeadline[];
  lang: Language;
}

export const DeadlineDashboard: React.FC<DeadlineDashboardProps> = ({ deadlines }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">
            Admissions Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            University Application Deadline System
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Track opening dates, closing deadlines, and real-time status alerts for top Myanmar universities.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <Calendar className="w-7 h-7 text-emerald-400" />
        </div>
      </div>

      {/* Deadlines List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {deadlines.map((item) => {
          let badge = null;
          let borderStyle = 'border-slate-200';

          if (item.status === 'closing_soon') {
            badge = (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center space-x-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Closing Soon!</span>
              </span>
            );
            borderStyle = 'border-amber-300 bg-amber-50/20';
          } else if (item.status === 'open') {
            badge = (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open for Applications</span>
              </span>
            );
          } else if (item.status === 'upcoming') {
            badge = (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center space-x-1">
                <Hourglass className="w-3.5 h-3.5 text-blue-600" />
                <span>Upcoming Intake</span>
              </span>
            );
          } else {
            badge = (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                Closed
              </span>
            );
          }

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border ${borderStyle} p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.universityName}</span>
                  </span>
                  {badge}
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  {item.programName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Opening Date</span>
                  <span className="font-bold text-slate-800">{item.openingDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Closing Deadline</span>
                  <span className="font-bold text-rose-700">{item.closingDate}</span>
                </div>
              </div>

              {item.note && (
                <p className="text-xs text-slate-600 italic bg-slate-100/60 p-2.5 rounded-lg border border-slate-200/50">
                  Note: {item.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
