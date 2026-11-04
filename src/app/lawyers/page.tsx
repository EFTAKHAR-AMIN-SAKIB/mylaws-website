'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Search,
  Scale,
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  X,
  Filter,
  Copy,
  Check,
  Building,
  UserCheck,
  Sparkles,
  Award,
  ArrowRight,
  PlusCircle,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import {
  LAWYERS,
  DIVISIONS,
  DISTRICTS_BY_DIVISION,
  ALL_DISTRICTS,
  DOMAIN_META,
  COURT_LEVEL_META,
  filterLawyers,
  LawyerProfile,
  LegalDomain,
  CourtLevel,
  DivisionName,
} from '@/data/lawyers';

const POPULAR_DISTRICTS = [
  'all',
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Bogura',
  'Cumilla',
  'Barishal',
  'Rangpur',
  'Mymensingh',
];

const INITIAL_VISIBLE_COUNT = 8;
const PAGE_SIZE = 8;

function LawyersContent() {
  const { lang, t } = useApp();
  const searchParams = useSearchParams();

  // Primary Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCourtLevel, setSelectedCourtLevel] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [legalAidOnly, setLegalAidOnly] = useState<boolean>(false);

  // Progressive Loading State (Avoid endless scrolling fatigue on mobile)
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  // Modal & Drawer States
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeLawyerModal, setActiveLawyerModal] = useState<LawyerProfile | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lawyer Chamber Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    barCouncilId: '',
    association: '',
    courtLevel: 'district',
    division: 'Dhaka',
    district: 'Dhaka',
    chamberAddress: '',
    phone: '',
  });
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Sync initial query params from URL (e.g., when routed from /ask or /)
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const districtParam = searchParams.get('district');
    const courtParam = searchParams.get('court');
    const legalAidParam = searchParams.get('legalAid');

    if (topicParam && (topicParam in DOMAIN_META || topicParam === 'all')) {
      setSelectedDomain(topicParam);
    }
    if (districtParam) {
      setSelectedDistrict(districtParam);
    }
    if (courtParam && (courtParam in COURT_LEVEL_META || courtParam === 'all')) {
      setSelectedCourtLevel(courtParam);
    }
    if (legalAidParam === '1' || legalAidParam === 'true') {
      setLegalAidOnly(true);
    }
  }, [searchParams]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchQuery, selectedDivision, selectedDistrict, selectedCourtLevel, selectedDomain, legalAidOnly]);

  // Prevent background scrolling when mobile drawers or modals are open
  useEffect(() => {
    if (mobileFilterOpen || activeLawyerModal || showRegisterModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterOpen, activeLawyerModal, showRegisterModal]);

  // Available districts dependent on selected division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'all' || !selectedDivision) {
      return ALL_DISTRICTS;
    }
    return DISTRICTS_BY_DIVISION[selectedDivision as DivisionName] || ALL_DISTRICTS;
  }, [selectedDivision]);

  // When division changes, check if current district is valid in that division
  const handleDivisionChange = (newDivision: string) => {
    setSelectedDivision(newDivision);
    if (newDivision !== 'all') {
      const validDistricts = DISTRICTS_BY_DIVISION[newDivision as DivisionName] || [];
      if (!validDistricts.includes(selectedDistrict)) {
        setSelectedDistrict('all');
      }
    }
  };

  // Filtered lawyers
  const filteredLawyers = useMemo(() => {
    return filterLawyers({
      query: searchQuery,
      division: selectedDivision,
      district: selectedDistrict,
      courtLevel: selectedCourtLevel,
      specialization: selectedDomain,
      legalAidOnly,
    });
  }, [searchQuery, selectedDivision, selectedDistrict, selectedCourtLevel, selectedDomain, legalAidOnly]);

  // Sliced lawyers for progressive disclosure
  const displayedLawyers = useMemo(() => {
    return filteredLawyers.slice(0, visibleCount);
  }, [filteredLawyers, visibleCount]);

  const hasMore = visibleCount < filteredLawyers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  // Active filter count indicator
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedDivision !== 'all') count++;
    if (selectedDistrict !== 'all') count++;
    if (selectedCourtLevel !== 'all') count++;
    if (selectedDomain !== 'all') count++;
    if (legalAidOnly) count++;
    return count;
  }, [searchQuery, selectedDivision, selectedDistrict, selectedCourtLevel, selectedDomain, legalAidOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('all');
    setSelectedDistrict('all');
    setSelectedCourtLevel('all');
    setSelectedDomain('all');
    setLegalAidOnly(false);
  };

  const handleCopyContact = (lawyer: LawyerProfile) => {
    const textToCopy = `${lawyer.nameBn} (${lawyer.nameEn})\n${
      lang === 'bn' ? lawyer.titleBn : lawyer.titleEn
    }\n${t('বার আইডি:', 'Bar ID:')} ${lawyer.barCouncilId}\n${t('মোবাইল:', 'Phone:')} ${
      lawyer.phone
    }\n${t('চেম্বার:', 'Chamber:')} ${lang === 'bn' ? lawyer.chamberAddressBn : lawyer.chamberAddressEn}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(lawyer.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Keyboard accessibility for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLawyerModal(null);
        setShowRegisterModal(false);
        setMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#181513] text-[#231F1C] dark:text-[#E8E2D5] flex flex-col selection:bg-[#9A6F32]/20">
      <Header />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* ========================================================
            HERO HEADER & CANONS OF CONDUCT NOTICE (Clean & Compact)
            ======================================================== */}
        <section className="relative border-b border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3]/90 dark:bg-[#201C19]/90 py-5 sm:py-9 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#9A6F32]/30 bg-[#9A6F32]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#9A6F32] font-hind">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>
                    {t('বার কাউন্সিল আচরণবিধি অনুযায়ী যাচাইকৃত ডিরেক্টরি', 'Bar Council Verified Non-Commercial Directory')}
                  </span>
                </div>

                <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#231F1C] dark:text-[#F1EDE1] leading-tight">
                  {t('বাংলাদেশের যাচাইকৃত আইনজীবী ও চেম্বার ডিরেক্টরি', 'Verified Advocates & Chamber Directory')}
                </h1>

                <p className="font-hind text-xs sm:text-sm text-[#5A534A] dark:text-[#B5ADA3] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {t(
                    'সুপ্রিম কোর্ট ও ৬৪ জেলার বিচারিক আদালতের তালিকাভুক্ত আইনজীবীদের সরকারি তথ্য। কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়া সরাসরি চেম্বারে যোগাযোগ করুন।',
                    'Direct contact and verified chamber information across Bangladesh Supreme Court and all 64 District Courts. Zero referral fees, 0% commission, and no middlemen.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#9A6F32]/40 bg-[#FAF7F0] dark:bg-[#2A2420] text-xs font-anek font-semibold text-[#9A6F32] hover:bg-[#9A6F32] hover:text-white transition-all shadow-2xs cursor-pointer active-press"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>{t('আইনজীবী তালিকাভুক্তি', 'List Chamber')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            STICKY SEARCH & FILTER CONTROL BAR (Optimized for Mobile)
            ======================================================== */}
        <section className="sticky top-[53px] z-30 border-b border-[#DDD3C1] dark:border-[#38312B] bg-[#FAF7F0]/95 dark:bg-[#181513]/95 backdrop-blur-md shadow-2xs py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-2.5">
            {/* ROW 1: Mobile Search + Filter Trigger Button / Desktop Search & Selects */}
            <div className="flex items-center gap-2">
              {/* Full Text Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9A6F32]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(
                    'আইনজীবীর নাম, বার আইডি (SCBA/DBA), জেলা বা চেম্বার...',
                    'Search name, Bar ID, district, or chamber...'
                  )}
                  className="w-full pl-8 pr-7 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs sm:text-sm font-hind text-[#231F1C] dark:text-[#F1EDE1] placeholder:text-[#8C8275] focus:outline-none focus:border-[#9A6F32] focus:ring-1 focus:ring-[#9A6F32] shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#231F1C] p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Button (Slides up the Filter Bottom Sheet) */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className={`lg:hidden shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-anek font-bold transition-all shadow-2xs active-press cursor-pointer ${
                  activeFiltersCount > 0
                    ? 'border-[#9A6F32] bg-[#9A6F32] text-white'
                    : 'border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-[#231F1C] dark:text-[#F1EDE1]'
                }`}
                aria-label="Open filter settings"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>{t('ফিল্টার', 'Filter')}</span>
                {activeFiltersCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#9A6F32] text-[10px] font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Desktop Direct Selectors (Hidden on Mobile) */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                {/* Division Selector */}
                <div className="relative w-44">
                  <select
                    value={selectedDivision}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-hind text-[#231F1C] dark:text-[#F1EDE1] focus:outline-none focus:border-[#9A6F32] cursor-pointer shadow-2xs"
                  >
                    <option value="all">{t('সকল বিভাগ (All)', 'All Divisions')}</option>
                    {DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div} {t('বিভাগ', 'Division')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C8275]" />
                </div>

                {/* District Selector */}
                <div className="relative w-44">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-hind text-[#231F1C] dark:text-[#F1EDE1] focus:outline-none focus:border-[#9A6F32] cursor-pointer shadow-2xs"
                  >
                    <option value="all">{t('সকল জেলা (All 64)', 'All Districts')}</option>
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} {t('জেলা', 'District')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C8275]" />
                </div>

                {/* Court Level Selector */}
                <div className="relative w-48">
                  <select
                    value={selectedCourtLevel}
                    onChange={(e) => setSelectedCourtLevel(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-hind text-[#231F1C] dark:text-[#F1EDE1] focus:outline-none focus:border-[#9A6F32] cursor-pointer shadow-2xs"
                  >
                    <option value="all">{t('সকল আদালত (All Courts)', 'All Courts')}</option>
                    <option value="appellate">{t('আপিল বিভাগ', 'Appellate Division')}</option>
                    <option value="high_court">{t('হাইকোর্ট বিভাগ', 'High Court Division')}</option>
                    <option value="district">{t('জেলা ও দায়রা জজ আদালত', 'District Court')}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C8275]" />
                </div>
              </div>
            </div>

            {/* ROW 2: 1-Tap Quick-Filter Chips Carousel (District & Court Tiers) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {/* All / Clear Pill */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedCourtLevel('all');
                  setLegalAidOnly(false);
                }}
                className={`shrink-0 px-2.5 py-1 rounded-full font-anek font-semibold text-[11px] transition-all cursor-pointer ${
                  selectedDistrict === 'all' && selectedCourtLevel === 'all' && !legalAidOnly
                    ? 'bg-[#9A6F32] text-white shadow-2xs'
                    : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A] dark:text-[#B5ADA3] hover:bg-[#DDD3C1]'
                }`}
              >
                {t('সকল', 'All')} ({filteredLawyers.length})
              </button>

              {/* Free Legal Aid Quick Pill */}
              <button
                type="button"
                onClick={() => setLegalAidOnly(!legalAidOnly)}
                className={`shrink-0 px-2.5 py-1 rounded-full font-anek font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                  legalAidOnly
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20'
                }`}
              >
                <UserCheck className="h-3 w-3" />
                <span>{t('বিনামূল্যে লিগ্যাল এইড', 'Free Legal Aid')}</span>
              </button>

              {/* High Court Quick Pill */}
              <button
                type="button"
                onClick={() => setSelectedCourtLevel(selectedCourtLevel === 'high_court' ? 'all' : 'high_court')}
                className={`shrink-0 px-2.5 py-1 rounded-full font-anek font-semibold text-[11px] transition-all cursor-pointer ${
                  selectedCourtLevel === 'high_court'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A] dark:text-[#B5ADA3] hover:bg-[#DDD3C1]'
                }`}
              >
                {t('হাইকোর্ট বিভাগ', 'High Court')}
              </button>

              {/* District Court Quick Pill */}
              <button
                type="button"
                onClick={() => setSelectedCourtLevel(selectedCourtLevel === 'district' ? 'all' : 'district')}
                className={`shrink-0 px-2.5 py-1 rounded-full font-anek font-semibold text-[11px] transition-all cursor-pointer ${
                  selectedCourtLevel === 'district'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A] dark:text-[#B5ADA3] hover:bg-[#DDD3C1]'
                }`}
              >
                {t('জেলা আদালত', 'District Court')}
              </button>

              <span className="text-[#8C8275]/40 shrink-0">|</span>

              {/* Popular Districts 1-Tap Chips */}
              {POPULAR_DISTRICTS.filter((d) => d !== 'all').map((dist) => {
                const isSelected = selectedDistrict === dist;
                return (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => setSelectedDistrict(isSelected ? 'all' : dist)}
                    className={`shrink-0 px-2.5 py-1 rounded-full font-anek font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#9A6F32] text-white shadow-2xs'
                        : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A] dark:text-[#B5ADA3] hover:bg-[#DDD3C1]'
                    }`}
                  >
                    <MapPin className="h-2.5 w-2.5 opacity-60" />
                    <span>{dist}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            RESULTS HEADER & COMPACT ADVOCATE CARDS
            ======================================================== */}
        <section className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* Active Filters Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A534A] dark:text-[#B5ADA3] font-hind">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>
                  {t('প্রদর্শিত হচ্ছে:', 'Showing:')}{' '}
                  <strong className="text-[#9A6F32] font-anek font-bold">
                    {displayedLawyers.length}
                  </strong>{' '}
                  {t('জন / মোট', 'of')}{' '}
                  <strong className="text-[#231F1C] dark:text-[#F1EDE1] font-anek font-bold">
                    {filteredLawyers.length}
                  </strong>{' '}
                  {t('জন বিজ্ঞ আইনজীবী', 'advocates')}
                </span>

                {/* Active Filter Tags */}
                {selectedDistrict !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#9A6F32]/10 text-[#9A6F32] font-semibold text-[11px]">
                    <span>{selectedDistrict}</span>
                    <button type="button" onClick={() => setSelectedDistrict('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {selectedCourtLevel !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#9A6F32]/10 text-[#9A6F32] font-semibold text-[11px]">
                    <span>
                      {selectedCourtLevel === 'high_court'
                        ? t('হাইকোর্ট', 'High Court')
                        : selectedCourtLevel === 'appellate'
                        ? t('আপিল বিভাগ', 'Appellate')
                        : t('জেলা আদালত', 'District Court')}
                    </span>
                    <button type="button" onClick={() => setSelectedCourtLevel('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {selectedDomain !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#9A6F32]/10 text-[#9A6F32] font-semibold text-[11px]">
                    <span>{lang === 'bn' ? DOMAIN_META[selectedDomain as LegalDomain]?.labelBn : DOMAIN_META[selectedDomain as LegalDomain]?.labelEn}</span>
                    <button type="button" onClick={() => setSelectedDomain('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {legalAidOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
                    <span>{t('লিগ্যাল এইড', 'Legal Aid')}</span>
                    <button type="button" onClick={() => setLegalAidOnly(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] text-[#9A6F32] hover:underline font-bold ml-1 cursor-pointer"
                  >
                    {t('সকল রিসেট করুন', 'Clear All')}
                  </button>
                )}
              </div>

              {/* Legal Aid Toll-Free Hotline */}
              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5A534A] dark:text-[#A89F91]">
                <Phone className="h-3 w-3 text-emerald-600" />
                <span>{t('সরকারি লিগ্যাল এইড হেল্পলাইন: ১৬৬৯৯ (টোল-ফ্রি)', 'National Legal Aid: 16699 (Toll-Free)')}</span>
              </div>
            </div>

            {/* EMPTY STATE */}
            {filteredLawyers.length === 0 && (
              <div className="py-12 sm:py-16 text-center rounded-3xl border border-dashed border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3]/40 dark:bg-[#201C19]/40 max-w-lg mx-auto space-y-3 p-6 sm:p-8">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#9A6F32]/10 text-[#9A6F32] mx-auto flex items-center justify-center">
                  <Scale className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C] dark:text-[#F1EDE1]">
                  {t('এই ফিল্টারে কোনো আইনজীবী পাওয়া যায়নি', 'No advocates matched your current filters')}
                </h3>
                <p className="font-hind text-xs text-[#5A534A] dark:text-[#B5ADA3] leading-relaxed">
                  {t(
                    'অনুগ্রহ করে বিভাগ বা আদালতের ধরন পরিবর্তন করে চেষ্টা করুন, অথবা ফিল্টার রিসেট করুন।',
                    'Please try widening your district or court level search, or reset all active filters.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9A6F32] text-white text-xs font-anek font-bold hover:bg-[#855D28] transition-colors cursor-pointer"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>{t('সকল ফিল্টার রিসেট করুন', 'Reset All Filters')}</span>
                </button>
              </div>
            )}

            {/* COMPACT & SCANNABLE CARD GRID (Mobile & Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {displayedLawyers.map((lawyer) => {
                const courtMeta = COURT_LEVEL_META[lawyer.courtLevel];
                const isCopied = copiedId === lawyer.id;

                // Two-letter monogram for avatar
                const initials = lawyer.nameEn
                  .replace(/^(Advocate|Adv\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '')
                  .split(' ')
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join('')
                  .toUpperCase();

                return (
                  <div
                    key={lawyer.id}
                    onClick={() => setActiveLawyerModal(lawyer)}
                    className="p-3.5 sm:p-5 rounded-2xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] hover:border-[#9A6F32]/70 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer space-y-3 active:scale-[0.99]"
                  >
                    <div className="space-y-2.5">
                      {/* Top Header: Avatar + Name + Court Pill + Quick Call */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0">
                          {/* Monogram Seal Avatar */}
                          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-[#9A6F32]/10 text-[#9A6F32] border border-[#9A6F32]/25 flex items-center justify-center font-cinzel font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                            {initials || 'BD'}
                          </div>

                          {/* Name & Credentials */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-anek text-sm sm:text-base font-bold text-[#231F1C] dark:text-[#F1EDE1] leading-snug group-hover:text-[#9A6F32] transition-colors truncate">
                                {lang === 'bn' ? lawyer.nameBn : lawyer.nameEn}
                              </h3>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            </div>

                            <p className="text-[11px] text-[#5A534A] dark:text-[#B5ADA3] font-hind truncate">
                              {lawyer.district} • {lawyer.experienceYears}+ {t('বছর অভিজ্ঞতা', 'yrs exp')}
                            </p>
                          </div>
                        </div>

                        {/* Direct Quick Dial Action (Min 44px touch target) */}
                        <a
                          href={`tel:${lawyer.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#9A6F32] text-white flex items-center justify-center hover:bg-[#855D28] transition-colors shadow-2xs shrink-0 active-press"
                          aria-label={`Call ${lawyer.nameEn}`}
                          title={t('সরাসরি কল করুন', 'Call Now')}
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Bar Council & Association Tag */}
                      <div className="flex items-center justify-between text-[11px] text-[#5A534A] dark:text-[#B5ADA3] font-hind bg-[#FAF7F0] dark:bg-[#28221D] px-2.5 py-1.5 rounded-xl border border-[#DDD3C1]/50 dark:border-[#38312B]/50">
                        <div className="flex items-center gap-1.5 truncate">
                          <Award className="h-3 w-3 text-[#9A6F32] shrink-0" />
                          <span className="truncate">
                            <strong>{lawyer.barCouncilId}</strong> •{' '}
                            {lang === 'bn' ? lawyer.barAssociationBn : lawyer.barAssociationEn}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-bold font-anek px-1.5 py-0.5 rounded shrink-0 ml-1.5 ${
                            lawyer.courtLevel === 'appellate'
                              ? 'bg-purple-500/10 text-purple-800 dark:text-purple-300'
                              : lawyer.courtLevel === 'high_court'
                              ? 'bg-blue-500/10 text-blue-800 dark:text-blue-300'
                              : 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {lang === 'bn' ? courtMeta.shortBn : courtMeta.shortEn}
                        </span>
                      </div>

                      {/* Practice Specializations Micro-Tags */}
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {lawyer.isLegalAidPanel && (
                          <span className="text-[10px] font-anek font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <UserCheck className="h-2.5 w-2.5" />
                            <span>{t('লিগ্যাল এইড', 'Legal Aid')}</span>
                          </span>
                        )}

                        {lawyer.specializations.slice(0, 3).map((spec) => {
                          const specMeta = DOMAIN_META[spec];
                          return (
                            <span
                              key={spec}
                              className={`text-[10px] font-anek font-semibold px-2 py-0.5 rounded-md border ${specMeta.badgeColor}`}
                            >
                              {lang === 'bn' ? specMeta.labelBn : specMeta.labelEn}
                            </span>
                          );
                        })}

                        {lawyer.specializations.length > 3 && (
                          <span className="text-[10px] font-anek font-semibold text-secondary-light">
                            +{lawyer.specializations.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Chamber Address Snippet */}
                      <div className="flex items-start gap-1.5 text-[11px] text-[#5A534A] dark:text-[#B5ADA3] font-hind pt-0.5">
                        <MapPin className="h-3 w-3 text-[#9A6F32] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          {lang === 'bn' ? lawyer.chamberAddressBn : lawyer.chamberAddressEn}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Detail Link + Copy */}
                    <div className="pt-2 border-t border-[#DDD3C1]/60 dark:border-[#38312B]/60 flex items-center justify-between text-xs font-hind">
                      <span className="font-semibold text-[#9A6F32] group-hover:underline flex items-center gap-1 font-anek text-xs">
                        <span>{t('চেম্বার ও সাক্ষাতের সময়', 'Chamber & Hours')}</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyContact(lawyer);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-[#5A534A] hover:text-[#9A6F32] cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">{t('কপি হয়েছে', 'Copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>{t('কপি', 'Copy')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PROGRESSIVE DISCLOSURE: LOAD MORE BUTTON */}
            {hasMore && (
              <div className="pt-4 pb-2 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#9A6F32]/50 bg-[#FAF7F0] dark:bg-[#28221D] text-[#9A6F32] hover:bg-[#9A6F32] hover:text-white transition-all text-xs sm:text-sm font-anek font-bold shadow-2xs active-press cursor-pointer"
                >
                  <span>
                    {t('আরও আইনজীবী দেখুন', 'Load More Advocates')} (
                    {filteredLawyers.length - visibleCount}{' '}
                    {t('জন বাকি', 'remaining')})
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            MOBILE FILTER BOTTOM SHEET (Native Mobile Slide-Up Drawer)
            ======================================================== */}
        {mobileFilterOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileFilterOpen(false);
            }}
          >
            <div className="w-full max-h-[85vh] rounded-t-3xl border-t border-[#DDD3C1] dark:border-[#38312B] bg-[#FAF7F0] dark:bg-[#1C1815] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-250">
              {/* Sheet Drag Handle & Header */}
              <div className="p-4 border-b border-[#DDD3C1] dark:border-[#38312B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#9A6F32]" />
                  <h3 className="font-anek text-base font-bold text-[#231F1C] dark:text-[#F1EDE1]">
                    {t('ফিল্টার ও এলাকা নির্বাচন', 'Filter & Location')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-[#5A534A] hover:bg-[#DDD3C1]/50 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Filter Body */}
              <div className="p-4 overflow-y-auto space-y-4 text-xs font-hind">
                {/* Free Legal Aid Toggle */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-emerald-600" />
                    <div>
                      <span className="font-bold font-anek block text-[#231F1C] dark:text-[#F1EDE1]">
                        {t('সরকারি লিগ্যাল এইড প্যানেল', 'Govt Legal Aid Panel')}
                      </span>
                      <span className="text-[11px] text-[#5A534A] dark:text-[#B5ADA3]">
                        {t('অসচ্ছল নাগরিকদের জন্য সম্পূর্ণ বিনামূল্যে আইনি সেবা', 'Free legal representation for eligible citizens')}
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={legalAidOnly}
                    onChange={(e) => setLegalAidOnly(e.target.checked)}
                    className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>

                {/* Division Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#231F1C] dark:text-[#F1EDE1] block font-anek">
                    {t('বিভাগ নির্বাচন:', 'Division:')}
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-hind text-[#231F1C] dark:text-[#F1EDE1]"
                  >
                    <option value="all">{t('সকল বিভাগ (All Divisions)', 'All Divisions')}</option>
                    {DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div} {t('বিভাগ', 'Division')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#231F1C] dark:text-[#F1EDE1] block font-anek">
                    {t('জেলা নির্বাচন:', 'District:')}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-hind text-[#231F1C] dark:text-[#F1EDE1]"
                  >
                    <option value="all">{t('সকল জেলা (All 64 Districts)', 'All Districts')}</option>
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} {t('জেলা', 'District')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Court Tier Segmented Chips */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#231F1C] dark:text-[#F1EDE1] block font-anek">
                    {t('আদালত পর্যায়:', 'Court Level:')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: t('সকল আদালত', 'All Courts') },
                      { id: 'appellate', label: t('আপিল বিভাগ', 'Appellate') },
                      { id: 'high_court', label: t('হাইকোর্ট বিভাগ', 'High Court') },
                      { id: 'district', label: t('জেলা জজ আদালত', 'District Court') },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedCourtLevel(item.id)}
                        className={`py-2 px-3 rounded-xl border text-xs font-anek font-semibold transition-all ${
                          selectedCourtLevel === item.id
                            ? 'bg-[#9A6F32] text-white border-[#9A6F32]'
                            : 'border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Practice Domains */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#231F1C] dark:text-[#F1EDE1] block font-anek">
                    {t('আইনি বিষয়ের ক্ষেত্র:', 'Practice Domain:')}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedDomain('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-anek font-semibold ${
                        selectedDomain === 'all'
                          ? 'bg-[#9A6F32] text-white'
                          : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A]'
                      }`}
                    >
                      {t('সকল বিষয়', 'All')}
                    </button>
                    {(Object.keys(DOMAIN_META) as LegalDomain[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDomain(d)}
                        className={`px-3 py-1.5 rounded-full text-xs font-anek font-semibold ${
                          selectedDomain === d
                            ? 'bg-[#9A6F32] text-white'
                            : 'bg-[#EDE7DA] dark:bg-[#28221D] text-[#5A534A]'
                        }`}
                      >
                        {lang === 'bn' ? DOMAIN_META[d].labelBn : DOMAIN_META[d].labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Buttons */}
              <div className="p-4 border-t border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3] dark:bg-[#201C19] flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-1/3 py-2.5 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-anek font-bold text-[#5A534A]"
                >
                  {t('রিসেট', 'Reset')}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-2/3 py-2.5 rounded-xl bg-[#9A6F32] text-white text-xs font-anek font-bold shadow active-press"
                >
                  {t('ফলাফল দেখুন', 'Show Results')} ({filteredLawyers.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            CHAMBER DOSSIER BOTTOM SHEET / MODAL
            ======================================================== */}
        {activeLawyerModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveLawyerModal(null);
            }}
          >
            <div className="w-full sm:max-w-xl max-h-[88vh] rounded-t-3xl sm:rounded-3xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FAF7F0] dark:bg-[#1C1815] shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3] dark:bg-[#231F1C] flex items-start justify-between gap-3 shrink-0">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-anek font-bold px-2 py-0.5 rounded-full bg-[#9A6F32]/15 text-[#9A6F32] border border-[#9A6F32]/30">
                      {lang === 'bn'
                        ? COURT_LEVEL_META[activeLawyerModal.courtLevel].shortBn
                        : COURT_LEVEL_META[activeLawyerModal.courtLevel].shortEn}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{t('সনদ যাচাইকৃত', 'Verified')}</span>
                    </div>
                  </div>
                  <h2 className="font-anek text-lg sm:text-xl font-bold text-[#231F1C] dark:text-[#F1EDE1] truncate">
                    {lang === 'bn' ? activeLawyerModal.nameBn : activeLawyerModal.nameEn}
                  </h2>
                  <p className="text-xs text-[#5A534A] dark:text-[#B5ADA3] font-hind truncate">
                    {lang === 'bn' ? activeLawyerModal.titleBn : activeLawyerModal.titleEn} •{' '}
                    {lang === 'bn' ? activeLawyerModal.barAssociationBn : activeLawyerModal.barAssociationEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveLawyerModal(null)}
                  className="p-1.5 rounded-xl text-[#5A534A] hover:bg-[#DDD3C1]/50 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs font-hind text-[#231F1C] dark:text-[#E8E2D5]">
                {/* Credentials & Bar Reg */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#201C19] border border-[#DDD3C1] dark:border-[#38312B] text-center">
                  <div>
                    <span className="text-[10px] text-[#8C8275] block uppercase font-bold">{t('বার আইডি', 'Bar ID')}</span>
                    <strong className="text-xs font-mono font-bold text-[#9A6F32] truncate block">{activeLawyerModal.barCouncilId}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C8275] block uppercase font-bold">{t('তালিকাভুক্তি', 'Enrolled')}</span>
                    <strong className="text-xs font-bold block">{activeLawyerModal.enrollmentYear}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C8275] block uppercase font-bold">{t('অভিজ্ঞতা', 'Experience')}</span>
                    <strong className="text-xs font-bold block">{activeLawyerModal.experienceYears}+ {t('বছর', 'Years')}</strong>
                  </div>
                </div>

                {/* Chamber Address & Visiting Hours */}
                <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#201C19] border border-[#DDD3C1] dark:border-[#38312B] space-y-2.5">
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-[#9A6F32] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs font-anek block">{t('স্থায়ী চেম্বার ঠিকানা:', 'Chamber Address:')}</span>
                      <p className="leading-relaxed text-xs mt-0.5">
                        {lang === 'bn' ? activeLawyerModal.chamberAddressBn : activeLawyerModal.chamberAddressEn}
                      </p>
                      <p className="text-[11px] text-[#8C8275] mt-0.5">
                        {t('জেলা:', 'District:')} {activeLawyerModal.district} • {t('বিভাগ:', 'Division:')} {activeLawyerModal.division}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-[#DDD3C1]/60 dark:border-[#38312B]/60">
                    <Clock className="h-4 w-4 text-[#9A6F32] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs font-anek block">{t('সাক্ষাতের সময়সূচি:', 'Visiting Hours:')}</span>
                      <p className="leading-relaxed text-xs text-[#5A534A] dark:text-[#B5ADA3] mt-0.5">
                        {lang === 'bn'
                          ? activeLawyerModal.visitingHoursBn || 'সন্ধ্যা ৬:৩০ - রাত ৯:০০ (শনিবার - বৃহস্পতিবার)'
                          : activeLawyerModal.visitingHoursEn || '6:30 PM - 9:00 PM (Sat - Thu)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-1.5">
                  <span className="font-bold text-xs font-anek block">{t('বিশেষজ্ঞ ক্ষেত্র:', 'Practice Areas:')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLawyerModal.specializations.map((spec) => {
                      const meta = DOMAIN_META[spec];
                      return (
                        <div
                          key={spec}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-anek font-semibold flex items-center gap-1.5 ${meta.badgeColor}`}
                        >
                          <Briefcase className="h-3 w-3" />
                          <span>{lang === 'bn' ? meta.labelBn : meta.labelEn}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Citizen Preparation Checklist */}
                <div className="p-3.5 rounded-xl bg-[#9A6F32]/10 border border-[#9A6F32]/25 space-y-1.5">
                  <span className="font-bold text-xs font-anek text-[#9A6F32] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t('চেম্বারে যাওয়ার আগে নাগরিক প্রস্তুতি:', 'Before Visiting Checklist:')}</span>
                  </span>
                  <ul className="text-[11px] space-y-1 text-[#5A534A] dark:text-[#C5BDB2] list-disc list-inside">
                    <li>{t('জাতীয় পরিচয়পত্রের (NID) ফটোকপি সাথে রাখুন।', 'Carry photocopy of your National ID (NID).')}</li>
                    <li>{t('ঘটনার তারিখ, প্রমাণপত্র, রসিদ বা নোটিশ সাথে নিন।', 'Organize all dates, money receipts, or notices.')}</li>
                    <li>{t('MyLaws থেকে প্রস্তুতকৃত প্রাথমিক খসড়া সাথে রাখতে পারেন।', 'You can print or show your primary draft prepared in MyLaws.')}</li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-3 sm:p-4 border-t border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3] dark:bg-[#231F1C] flex items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyContact(activeLawyerModal)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19] text-xs font-anek font-semibold text-[#5A534A] dark:text-[#C5BDB2] hover:text-[#9A6F32] cursor-pointer"
                >
                  {copiedId === activeLawyerModal.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">{t('কপি সম্পন্ন', 'Copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t('কপি করুন', 'Copy Info')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${activeLawyerModal.phone}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9A6F32] text-white text-xs sm:text-sm font-anek font-bold hover:bg-[#855D28] transition-colors shadow active-press"
                >
                  <Phone className="h-4 w-4" />
                  <span>
                    {t('সরাসরি কল করুন', 'Call Advocate')} ({activeLawyerModal.phone})
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            ADVOCATE CHAMBER REGISTRATION MODAL
            ======================================================== */}
        {showRegisterModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowRegisterModal(false);
            }}
          >
            <div className="w-full sm:max-w-md max-h-[88vh] rounded-t-3xl sm:rounded-3xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FAF7F0] dark:bg-[#1C1815] shadow-2xl flex flex-col">
              <div className="p-4 border-b border-[#DDD3C1] dark:border-[#38312B] bg-[#F4EFE3] dark:bg-[#231F1C] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#9A6F32]" />
                  <h3 className="font-anek text-base font-bold text-[#231F1C] dark:text-[#F1EDE1]">
                    {t('আইনজীবী চেম্বার অন্তর্ভুক্তি', 'Advocate Chamber Inclusion')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="p-1 rounded-lg text-[#5A534A] hover:bg-[#DDD3C1]/50 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-3.5 text-xs font-hind">
                {regSubmitted ? (
                  <div className="py-6 text-center space-y-2.5">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h4 className="font-anek text-base font-bold text-[#231F1C] dark:text-[#F1EDE1]">
                      {t('আবেদন গৃহীত হয়েছে!', 'Application Received!')}
                    </h4>
                    <p className="text-xs text-[#5A534A] leading-relaxed">
                      {t(
                        'বার কাউন্সিল তথ্য যাচাই সাপেক্ষে চেম্বারটি যুক্ত করা হবে।',
                        'Your chamber will be listed upon Bar Council verification.'
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRegisterModal(false);
                        setRegSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#9A6F32] text-white text-xs font-anek font-bold"
                    >
                      {t('ঠিক আছে', 'Done')}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRegSubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-[#231F1C] dark:text-[#F1EDE1] mb-1">
                        {t('পূর্ণ নাম (বাংলা ও ইংরেজি)', 'Full Name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        placeholder="যেমন: অ্যাডভোকেট মোঃ মোস্তফা কামাল"
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-[#231F1C] dark:text-[#F1EDE1] mb-1">
                          {t('বার কাউন্সিল আইডি', 'Bar ID')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={regForm.barCouncilId}
                          onChange={(e) => setRegForm({ ...regForm, barCouncilId: e.target.value })}
                          placeholder="SCBA #14205"
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#231F1C] dark:text-[#F1EDE1] mb-1">
                          {t('মোবাইল নম্বর', 'Phone')} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="+88017xxxxxxxx"
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#231F1C] dark:text-[#F1EDE1] mb-1">
                        {t('স্থায়ী চেম্বার ঠিকানা', 'Chamber Address')} *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={regForm.chamberAddress}
                        onChange={(e) => setRegForm({ ...regForm, chamberAddress: e.target.value })}
                        placeholder="ভবন নম্বর, ফ্লোর, জেলা আদালত..."
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD3C1] dark:border-[#38312B] bg-[#FFFFFF] dark:bg-[#201C19]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#9A6F32] text-white text-xs font-anek font-bold hover:bg-[#855D28] transition-colors cursor-pointer"
                    >
                      {t('আবেদন জমা দিন', 'Submit')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function LawyersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9A6F32]" />
        </div>
      }
    >
      <LawyersContent />
    </Suspense>
  );
}
