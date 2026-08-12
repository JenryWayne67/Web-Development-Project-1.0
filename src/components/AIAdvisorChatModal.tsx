import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage, StudentProfile, Language } from '../types';
import { sendAdvisorChatMessage } from '../services/api';

interface AIAdvisorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentProfile?: StudentProfile | null;
  lang: Language;
}

const SUGGESTED_QUESTIONS = [
  "Which university is best for Computer Science?",
  "I got high marks in Mathematics and Physics. What should I study?",
  "What careers can I pursue after studying Computer Science?",
  "Which programs am I eligible for?",
  "What scholarships can I apply for?"
];

export const AIAdvisorChatModal: React.FC<AIAdvisorChatModalProps> = ({
  isOpen,
  onClose,
  studentProfile,
  lang: _lang
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Mingalaba! I am your AI University Advisor. How can I help you explore degree programs, matriculation cutoffs, career paths, or scholarships today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const replyText = await sendAdvisorChatMessage(messageText, messages, studentProfile);
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error('Chat error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center space-x-1.5">
                <span>AI University Advisor</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-indigo-200">
                Ask questions about Myanmar universities, entry cut-offs, & career pathways
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice bar */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-800 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Verified Dataset Guidance: AI will say if verified university information is unavailable.</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 shadow-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>AI Advisor is evaluating student profile & university data...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggested Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 overflow-x-auto flex items-center space-x-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Suggested:</span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about universities, majors, or requirements..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-sm flex items-center space-x-1"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
