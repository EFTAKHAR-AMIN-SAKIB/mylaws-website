'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import {
  Search,
  BookOpen,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function LegalReasoningIndicator() {
  const { lang, t } = useApp();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      icon: Search,
      title: t(
        'আইনি বিরোধ ও প্রেক্ষাপট পর্যালোচনা',
        'Analyzing Legal Dispute & Factual Context'
      ),
      desc: t(
        'আপনার বর্ণনার উপাদান ও সংশ্লিষ্ট পক্ষসমূহের আইনগত অবস্থান নির্ণয় করা হচ্ছে...',
        'Determining factual elements, dispute scope, and citizen rights...'
      ),
      statute: t('প্রাথমিক বিশ্লেষণ', 'Fact Assessment'),
    },
    {
      id: 1,
      icon: BookOpen,
      title: t(
        'বাংলাদেশ কোড ও ১২০০+ গেজেট বিধান অনুসন্ধান',
        'Scanning Bangladesh Code & Gazette Provisions'
      ),
      desc: t(
        'শ্রম আইন, দণ্ডবিধি, দেওয়ানি ও বিশেষ আইনের সংবিধিবদ্ধ ধারার সাথে মেলানো হচ্ছে...',
        'Matching with relevant sections from Bangladesh Code corpus...'
      ),
      statute: t('সংবিধিবদ্ধ সূচি', 'Statutory Search'),
    },
    {
      id: 2,
      icon: Scale,
      title: t(
        'ধারা যাচাই ও সুনির্দিষ্ট এখতিয়ার নির্ধারণ',
        'Verifying Sections & Competent Jurisdiction'
      ),
      desc: t(
        'থানা, শ্রম আদালত বা সহকারী কমিশনারের এখতিয়ার ও আইনি সময়সীমা নিরূপণ...',
        'Checking procedural jurisdiction, competent authority & limitation periods...'
      ),
      statute: t('এখতিয়ার নিরূপণ', 'Jurisdiction Audit'),
    },
    {
      id: 3,
      icon: Sparkles,
      title: t(
        '৪-ধাপ সমাধান ও খসড়া নির্দেশিকা তৈরি',
        'Synthesizing 4-Step Guidance & Action Drafts'
      ),
      desc: t(
        'সহজ বাংলায় নাগরিক করণীয়, চেকলিস্ট ও অফিশিয়াল অভিযোগের ড্রাফট তৈরি হচ্ছে...',
        'Formulating plain language guidance, action checklist & verified templates...'
      ),
      statute: t('চূড়ান্ত সমাধান', 'Final Synthesis'),
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 1400);
    const timer2 = setTimeout(() => setActiveStep(2), 3200);
    const timer3 = setTimeout(() => setActiveStep(3), 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const current = steps[activeStep] || steps[0];
  const CurrentIcon = current.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-light/50 bg-[#FAF7F0] shadow-md p-4 sm:p-5 animate-message-in">
      {/* Top Animated Golden Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#DDD3C1]/50 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-accent-light to-transparent animate-shimmer-sweep" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        
        {/* Animated Scales of Justice Balance Node */}
        <div className="relative flex items-center justify-center shrink-0">
          {/* Radar Ring Glow */}
          <div className="absolute inset-0 rounded-2xl bg-accent-light/20 animate-radar-ring" />
          
          <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FAF7F0] to-[#EADBC8] border border-accent-light/60 flex items-center justify-center shadow-inner text-accent-light">
            <Scale className="h-6 w-6 animate-scale-beam" />
          </div>
        </div>

        {/* Status Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold font-anek text-sm sm:text-base text-primary-light flex items-center gap-1.5">
              <CurrentIcon className="h-4 w-4 text-accent-light animate-pulse shrink-0" />
              <span>{current.title}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-hind bg-accent-light/10 text-accent-light border border-accent-light/30">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light animate-ping" />
              {current.statute}
            </span>
          </div>

          <p className="text-xs font-hind text-secondary-light leading-relaxed">
            {current.desc}
          </p>

          {/* Stepper Dots Indicator */}
          <div className="pt-2 flex items-center gap-1.5">
            {steps.map((st, i) => (
              <div
                key={st.id}
                className="flex items-center gap-1.5"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeStep
                      ? 'w-6 bg-accent-light shadow-[0_0_6px_rgba(154,111,50,0.5)]'
                      : i < activeStep
                      ? 'w-2 bg-accent-light/60'
                      : 'w-2 bg-border-light'
                  }`}
                />
              </div>
            ))}
            <span className="text-[10px] font-mono text-secondary-light/70 ml-1">
              {activeStep + 1}/4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
