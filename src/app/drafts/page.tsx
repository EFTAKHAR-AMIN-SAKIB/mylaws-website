'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  prepareDraftDocument,
  assembleDraftPlainText,
  draftFieldLabels,
  getRequiredFields,
  getDraftTitle,
  getDefaultRecipient,
  DRAFT_CATALOG,
  type DraftTypeMetadata,
} from '@/lib/drafts';
import { exportElementToA4Pdf } from '@/lib/pdf';
import type { DocumentType, DraftDocument, DraftFacts, FactValue } from '@/types/contracts';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  Eye,
  Edit3,
  Scale,
  Building,
  Shield,
  FileCheck2,
  ChevronDown,
  User,
  MapPin,
  HelpCircle,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export default function DraftsPage() {
  const { lang, t } = useApp();

  const [docType, setDocType] = useState<DocumentType>('domestic_violence');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    contact: '',
    address: '',
    recipient: getDefaultRecipient('domestic_violence'),
    respondent: '',
    place: '',
    date: '',
    role: '',
    period: '',
    amount: '',
    khatianDag: '',
    chequeDetails: '',
    bankMemoDate: '',
    chronology: '',
    assistance: '',
    attachments: '',
    applicationDate: new Date().toISOString().split('T')[0],
  });

  const [reviewed, setReviewed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Mobile view tab toggle: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  const printRef = useRef<HTMLDivElement>(null);

  // Load any pending draft from session storage (e.g. if navigated from /ask)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('mylaws_pending_draft');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.type && DRAFT_CATALOG.some((d) => d.id === parsed.type)) {
          setDocType(parsed.type);
          setFormData((prev) => ({
            ...prev,
            recipient: getDefaultRecipient(parsed.type),
          }));
        }
        if (parsed.facts && Array.isArray(parsed.facts)) {
          setFormData((prev) => {
            const updated: Record<string, string> = { ...prev };
            parsed.facts.forEach((f: FactValue) => {
              if (f.fieldId && f.value) {
                updated[f.fieldId] = f.value;
              }
            });
            if (parsed.query && !updated.chronology) {
              updated.chronology = parsed.query;
            }
            if (parsed.stepContext && !updated.assistance) {
              updated.assistance = parsed.stepContext;
            }
            return updated;
          });
        }
      }
    } catch {}
  }, []);

  const handleTypeChange = (newType: DocumentType) => {
    setDocType(newType);
    setFormData((prev) => ({
      ...prev,
      recipient: getDefaultRecipient(newType),
    }));
    setIsTemplateSelectorOpen(false); // smoothly collapse once chosen
    setReviewed(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setReviewed(false); // Invalidate review status upon editing
  };

  const currentFacts: DraftFacts = {
    fields: Object.entries(formData).map(([k, v]) => ({
      fieldId: k,
      value: v,
      status: v.trim() ? 'user_confirmed' : 'unknown',
      provenance: 'user_editor',
    })),
  };

  const doc: DraftDocument = prepareDraftDocument(docType, currentFacts);
  const requiredFields = getRequiredFields(docType);
  const isComplete = doc.unresolvedPlaceholders.length === 0;

  const filledCount = requiredFields.filter(
    (f) => formData[f] && formData[f].trim().length > 0 && !formData[f].startsWith('[')
  ).length;
  const progressPercent = Math.min(100, Math.round((filledCount / requiredFields.length) * 100));

  const activeMetadata = DRAFT_CATALOG.find((d) => d.id === docType) || DRAFT_CATALOG[0];

  const filteredCatalog = DRAFT_CATALOG.filter((d) => {
    if (selectedCategory === 'all') return true;
    return d.category === selectedCategory;
  });

  // Group fields into 3 clear, user-friendly steps
  const fieldGroups = [
    {
      id: 'parties',
      icon: User,
      titleBn: '১. পক্ষগণের পরিচয় ও বিবরণ',
      titleEn: '1. Parties & Identity',
      fields: ['name', 'contact', 'address', 'respondent'].filter((f) => requiredFields.includes(f)),
    },
    {
      id: 'jurisdiction',
      icon: MapPin,
      titleBn: '২. স্থান, তারিখ ও অধিক্ষেত্র',
      titleEn: '2. Location & Authority',
      fields: [
        'recipient',
        'place',
        'date',
        'role',
        'period',
        'khatianDag',
        'chequeDetails',
        'bankMemoDate',
        'applicationDate',
      ].filter((f) => requiredFields.includes(f)),
    },
    {
      id: 'facts',
      icon: Scale,
      titleBn: '৩. ঘটনার বিবরণ ও প্রার্থিত প্রতিকার',
      titleEn: '3. Grievance & Relief',
      fields: ['amount', 'chronology', 'assistance', 'attachments'].filter(
        (f) => requiredFields.includes(f) || f === 'attachments'
      ),
    },
  ].filter((g) => g.fields.length > 0);

  const handleCopyText = async () => {
    // Copy the clean petition body directly so it can be pasted directly into documents or email
    const text = doc.paragraphs.join('\n\n');
    let success = false;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {}

    // Robust fallback for older browsers, HTTP dev, or restrictive permissions
    if (!success && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {}
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    // On mobile devices, ensure preview tab is active before triggering print dialog
    if (mobileTab === 'edit') {
      setMobileTab('preview');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const handlePdfExport = async () => {
    setExportingPdf(true);
    setExportError(null);
    try {
      // If mobile view was on edit tab, switch to preview so the DOM element is rendered and measurable
      if (mobileTab === 'edit') {
        setMobileTab('preview');
        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      if (!printRef.current) {
        throw new Error('Printable document ref not found');
      }

      await exportElementToA4Pdf(
        printRef.current,
        `MyLaws_${docType.toUpperCase()}_Draft.pdf`
      );
    } catch (err: any) {
      console.error('PDF export failed:', err);
      setExportError(
        t(
          'পিডিএফ ডাউনলোড তৈরি করা যায়নি। ব্রাউজারের প্রিন্ট (Ctrl+P) বিকল্পটি ব্যবহার করুন।',
          'PDF generation failed. Please use your browser Print (Ctrl+P) dialog.'
        )
      );
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1 py-5 sm:py-8 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Top Section */}
        <div className="no-print pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <h1 className="font-anek text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary-light flex items-center gap-2">
                <Scale className="h-6 w-6 text-accent-light shrink-0" />
                <span>{t('আইনি দরখাস্ত ও অভিযোগ খসড়া স্টুডিও', 'Context-Aware Legal Draft Studio')}</span>
              </h1>
              <p className="font-hind text-xs sm:text-sm text-secondary-light mt-0.5">
                {t(
                  'আপনার মামলার তথ্যের ভিত্তিতে আদালত ও প্রশাসনিক দপ্তরের জন্য প্রস্তুতকৃত প্রমিত খসড়া।',
                  'Standard legal drafts tailored to your facts, ready for review and A4 export.'
                )}
              </p>
            </div>

            {/* Overall Progress Meter */}
            <div className="self-start sm:self-auto min-w-[200px]">
              <div className="flex items-center justify-between text-[11px] font-hind mb-1">
                <span className="text-secondary-light font-medium">
                  {t('তথ্য পূরণের অগ্রগতি:', 'Progress:')}
                </span>
                <span className={`font-bold font-anek ${isComplete ? 'text-emerald-700' : 'text-accent-light'}`}>
                  {filledCount} / {requiredFields.length} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-border-light/80 overflow-hidden shadow-inner">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isComplete ? 'bg-emerald-600' : 'bg-accent-light'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Compact & Expandable Active Template Bar */}
          <div className="rounded-2xl border border-border-light bg-surface-cardLight shadow-xs overflow-hidden transition-all">
            <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-light/10 text-accent-light flex items-center justify-center shrink-0 border border-accent-light/25">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        activeMetadata.category === 'court'
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : activeMetadata.category === 'admin'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          : activeMetadata.category === 'notice'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}
                    >
                      {t(activeMetadata.categoryLabelBn, activeMetadata.categoryLabelEn)}
                    </span>
                    <span className="text-[11px] text-secondary-light font-hind hidden sm:inline-block">
                      • {t('নির্বাচিত ফরম্যাট', 'Active Format')}
                    </span>
                  </div>
                  <h3 className="font-anek font-bold text-xs sm:text-sm text-primary-light mt-0.5 line-clamp-1">
                    {t(activeMetadata.titleBn, activeMetadata.titleEn)}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTemplateSelectorOpen(!isTemplateSelectorOpen)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-accent-light/35 bg-surface-light text-accent-light hover:bg-accent-light hover:text-white transition-all text-xs font-semibold font-anek shadow-2xs active-press shrink-0 cursor-pointer self-stretch sm:self-auto"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>
                  {isTemplateSelectorOpen ? t('ফরম্যাট তালিকা বন্ধ করুন', 'Close Template List') : t('টেমপ্লেট পরিবর্তন করুন', 'Change Template')}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isTemplateSelectorOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Expandable Template Grid */}
            {isTemplateSelectorOpen && (
              <div className="border-t border-border-light/80 p-3.5 sm:p-5 bg-surface-light/60 space-y-3.5 animate-in slide-in-from-top-2 duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary-light font-cinzel">
                    {t('১০টি প্রমিত আইনি ফরম্যাট থেকে বেছে নিন', 'AVAILABLE LEGAL TEMPLATES')}
                  </span>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {[
                      { id: 'all', bn: 'সবগুলো', en: 'All' },
                      { id: 'court', bn: 'আদালত পিটিশন', en: 'Court' },
                      { id: 'admin', bn: 'ভূমি ও প্রশাসন', en: 'Land/Admin' },
                      { id: 'police', bn: 'থানা ও জিডি', en: 'Police GD' },
                      { id: 'notice', bn: 'আইনি নোটিশ', en: 'Notice' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-accent-light text-white shadow-2xs'
                            : 'bg-surface-cardLight border border-border-light/70 text-secondary-light hover:border-accent-light/40'
                        }`}
                      >
                        {t(cat.bn, cat.en)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {filteredCatalog.map((item) => {
                    const isActive = docType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTypeChange(item.id)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isActive
                            ? 'border-accent-light bg-accent-light/10 shadow-xs ring-1 ring-accent-light/40'
                            : 'border-border-light/80 bg-surface-cardLight hover:border-accent-light/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                item.category === 'court'
                                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                  : item.category === 'admin'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                  : item.category === 'notice'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : 'bg-blue-100 text-blue-900 border border-blue-200'
                              }`}
                            >
                              {t(item.categoryLabelBn, item.categoryLabelEn)}
                            </span>
                            {isActive && <Check className="h-3.5 w-3.5 text-accent-light shrink-0" />}
                          </div>
                          <h4 className="font-anek font-bold text-xs text-primary-light line-clamp-1">
                            {t(item.titleBn, item.titleEn)}
                          </h4>
                        </div>
                        <p className="font-hind text-[11px] text-secondary-light line-clamp-2 leading-relaxed">
                          {t(item.shortDescBn, item.shortDescEn)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tactile Segmented Controller for Mobile: Edit vs Preview */}
        <div className="no-print flex lg:hidden mb-4 p-1 bg-surface-cardLight border border-border-light rounded-2xl shadow-xs">
          <button
            type="button"
            onClick={() => setMobileTab('edit')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              mobileTab === 'edit'
                ? 'bg-accent-light text-white shadow-xs'
                : 'text-secondary-light hover:text-primary-light'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>{t('তথ্য পূরণ (Edit Form)', 'Edit Details')}</span>
            <span className="text-[10px] opacity-80">({filledCount}/{requiredFields.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-accent-light text-white shadow-xs'
                : 'text-secondary-light hover:text-primary-light'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{t('খসড়া প্রাকদর্শন (A4)', 'Preview Draft')}</span>
          </button>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Column: Friendly Grouped Form Editor */}
          <div className={`no-print lg:col-span-5 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="space-y-4">
              {fieldGroups.map((group) => {
                const IconComponent = group.icon;
                return (
                  <div
                    key={group.id}
                    className="p-4 sm:p-5 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2 border-b border-border-light/70 pb-2.5">
                      <div className="h-6 w-6 rounded-lg bg-accent-light/10 text-accent-light flex items-center justify-center shrink-0">
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="font-anek font-bold text-xs sm:text-sm text-primary-light">
                        {t(group.titleBn, group.titleEn)}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {group.fields.map((fieldKey) => (
                        <div key={fieldKey} className="space-y-1">
                          <label
                            htmlFor={`field-${fieldKey}`}
                            className="block text-xs font-medium text-secondary-light font-hind"
                          >
                            {draftFieldLabels[fieldKey] || fieldKey}
                            {requiredFields.includes(fieldKey) && (
                              <span className="text-accent-light font-bold ml-1">*</span>
                            )}
                          </label>

                          {fieldKey === 'chronology' || fieldKey === 'assistance' ? (
                            <textarea
                              id={`field-${fieldKey}`}
                              rows={fieldKey === 'chronology' ? 4 : 3}
                              value={formData[fieldKey]}
                              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              placeholder={t('এখানে বিস্তারিত লিখুন...', 'Type details here...')}
                              className="w-full text-xs rounded-xl border border-border-light bg-surface-light p-3 text-primary-light focus:bg-surface-cardLight focus:border-accent-light focus:ring-1 focus:ring-accent-light/30 transition-all leading-relaxed outline-none"
                            />
                          ) : (
                            <input
                              id={`field-${fieldKey}`}
                              type="text"
                              value={formData[fieldKey]}
                              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              placeholder={
                                fieldKey === 'date'
                                  ? t('যেমন: গত ১৫ অক্টোবর ২০২৬', 'e.g. 15 October 2026')
                                  : fieldKey === 'amount'
                                  ? t('যেমন: ৫০,০০০ টাকা', 'e.g. 50,000 BDT')
                                  : t('এখানে লিখুন...', 'Type here...')
                              }
                              className="w-full text-xs rounded-xl border border-border-light bg-surface-light p-2.5 text-primary-light focus:bg-surface-cardLight focus:border-accent-light focus:ring-1 focus:ring-accent-light/30 transition-all outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Factual Review Confirmation Card */}
              <div className="p-4 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-secondary-light font-hind">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-accent-light shrink-0 cursor-pointer"
                  />
                  <span>
                    {t(
                      'আমি নিশ্চিত করছি যে উল্লিখিত তথ্যাবলি আমার জানা মতে সত্য এবং কোনো কাল্পনিক বা ভিত্তিহীন তথ্য এতে নেই।',
                      'I confirm that all stated facts are true and accurate to the best of my knowledge.'
                    )}
                  </span>
                </label>

                <div className="pt-2 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileTab('preview')}
                    className="w-full py-2.5 rounded-xl bg-accent-light text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active-press"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{t('সম্পূর্ণ খসড়া প্রাকদর্শন দেখুন', 'View A4 Draft Preview')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: A4 Court Bond Paper Preview */}
          <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
            {/* Action Bar (no-print) */}
            <div className="no-print flex flex-wrap items-center justify-between p-3.5 rounded-2xl border border-border-light bg-surface-cardLight gap-2.5 shadow-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full font-cinzel ${
                    reviewed && isComplete
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {reviewed && isComplete
                    ? t('তথ্য পর্যালোচিত খসড়া / Reviewed', 'REVIEWED DRAFT')
                    : t('অসম্পূর্ণ খসড়া / Incomplete', 'INCOMPLETE DRAFT')}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-light text-xs font-medium text-secondary-light hover:text-primary-light hover:border-accent-light/40 bg-surface-light transition-all cursor-pointer shadow-2xs active-press"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-accent-light" />}
                  <span>{copied ? t('কপি হয়েছে', 'Copied') : t('কপি', 'Copy')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-light text-xs font-medium text-secondary-light hover:text-primary-light hover:border-accent-light/40 bg-surface-light transition-all cursor-pointer shadow-2xs active-press"
                >
                  <Printer className="h-3.5 w-3.5 text-accent-light" />
                  <span>{t('প্রিন্ট', 'Print')}</span>
                </button>

                <button
                  type="button"
                  disabled={exportingPdf}
                  onClick={handlePdfExport}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-accent-light text-white text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer active-press"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{exportingPdf ? t('পিডিএফ হচ্ছে...', 'Generating...') : t('A4 PDF ডাউনলোড', 'Download PDF')}</span>
                </button>
              </div>
            </div>

            {/* Export Error Alert Banner */}
            {exportError && (
              <div className="no-print p-3.5 rounded-2xl border border-red-200 bg-red-50 text-red-800 text-xs flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span className="font-hind">{exportError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExportError(null)}
                  className="text-red-600 hover:text-red-900 text-xs font-bold px-2 py-0.5 rounded cursor-pointer"
                  aria-label="Dismiss error"
                >
                  ✕
                </button>
              </div>
            )}

            {/* A4 Document Paper Sheet (Authentic Bangladesh Legal Format with Zero Watermarks) */}
            <div
              ref={printRef}
              className="printable-document bg-white text-neutral-950 p-6 sm:p-14 rounded-2xl border border-border-light shadow-xl min-h-[650px] sm:min-h-[820px] font-bangla text-[13.5px] sm:text-[14.5px] leading-[1.85] space-y-5 overflow-x-auto relative"
            >
              {/* Document Paragraphs */}
              <div className="space-y-4 relative z-10">
                {doc.paragraphs.map((p, idx) => (
                  <div key={idx} className="whitespace-pre-line leading-[1.85]">
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Notice Footer Card */}
            <div className="no-print p-4 rounded-2xl border border-border-light bg-surface-cardLight text-xs text-secondary-light space-y-2 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-light/60 pb-2">
                <span>
                  <strong className="text-primary-light font-medium">{t('আইনি ফরম্যাট:', 'Legal Format:')}</strong>{' '}
                  <span className="font-anek text-[11px] font-semibold text-accent-light">
                    {t(activeMetadata.titleBn, activeMetadata.titleEn)}
                  </span>
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isComplete ? t('দাখিলযোগ্য খসড়া প্রস্তুত', 'Ready for filing') : t('তথ্য অসম্পূর্ণ', 'Details pending')}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-secondary-light/90 font-hind">
                <strong className="text-primary-light font-medium">{t('নির্দেশিকা:', 'Notice:')}</strong>{' '}
                {t(
                  'এটি MyLaws দ্বারা প্রস্তুতকৃত একটি প্রমিত আইনি কাঠামো। সংশ্লিষ্ট আদালত, ভূমি অফিস বা থানায় দাখিলের পূর্বে নাম, ঠিকানা ও কোর্ট ফি নিজে অথবা বিজ্ঞ আইনজীবীর মাধ্যমে যাচাই করে নিন।',
                  'This draft template is prepared by MyLaws for formal filing. Verify party details, jurisdiction, and court fees with a lawyer prior to submission.'
                )}
              </p>
            </div>

            {/* Sticky Mobile Action Bar in Preview Tab */}
            <div className="no-print lg:hidden fixed bottom-14 left-0 right-0 z-30 p-2.5 bg-surface-cardLight/95 backdrop-blur-md border-t border-border-light flex items-center justify-around gap-2 shadow-lg">
              <button
                type="button"
                onClick={handleCopyText}
                className="flex-1 py-2 px-2 rounded-xl border border-border-light text-xs font-semibold flex items-center justify-center gap-1 active-press bg-surface-light text-secondary-light cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-accent-light" />}
                <span>{copied ? t('কপি হয়েছে', 'Copied') : t('কপি', 'Copy')}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="py-2 px-3 rounded-xl border border-border-light text-xs font-semibold flex items-center justify-center gap-1 active-press bg-surface-light text-secondary-light cursor-pointer shadow-2xs"
              >
                <Printer className="h-3.5 w-3.5 text-accent-light" />
                <span>{t('প্রিন্ট', 'Print')}</span>
              </button>
              <button
                type="button"
                disabled={exportingPdf}
                onClick={handlePdfExport}
                className="flex-1 py-2 px-3 rounded-xl bg-accent-light text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm active-press disabled:opacity-50 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{exportingPdf ? t('তৈরি হচ্ছে...', '...') : t('PDF ডাউনলোড', 'PDF')}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
