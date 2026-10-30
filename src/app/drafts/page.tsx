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
} from 'lucide-react';

export default function DraftsPage() {
  const { lang, t } = useApp();

  const [docType, setDocType] = useState<DocumentType>('dife');
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    contact: '',
    address: '',
    recipient: '',
    place: '',
    date: '',
    role: '',
    period: '',
    amount: '',
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
        if (parsed.type && ['gd', 'dife', 'dncrp'].includes(parsed.type)) {
          setDocType(parsed.type);
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

  const handleCopyText = async () => {
    const text = assembleDraftPlainText(doc, reviewed);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePdfExport = async () => {
    if (!printRef.current) return;
    setExportingPdf(true);
    setExportError(null);
    try {
      await exportElementToA4Pdf(
        printRef.current,
        `MyLaws_${docType.toUpperCase()}_Draft.pdf`
      );
    } catch (err: any) {
      console.error('PDF export failed:', err);
      setExportError(t('পিডিএফ ডাউনলোড তৈরি করা যায়নি। ব্রাউজারের প্রিন্ট (Ctrl+P) বিকল্পটি ব্যবহার করুন।', 'PDF generation failed. Please use your browser Print (Ctrl+P) dialog.'));
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border-light/80 gap-4">
          <div>
            <h1 className="font-anek text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-light">
              {t('অভিযোগ ও জিডি খসড়া প্রস্তুতকারক', 'Bangla Complaint & GD Draft Generator')}
            </h1>
            <p className="font-hind text-xs sm:text-sm text-secondary-light mt-1">
              {t(
                'অনলাইনে ঘটনা ও ব্যক্তিগত বিবরণ নিশ্চিত করুন, প্রমিত খসড়া সম্পাদনা করুন এবং নির্ভুল A4 PDF ডাউনলোড করুন।',
                'Verify details, edit standardized Bangla complaint templates, and export clean A4 PDFs.'
              )}
            </p>
          </div>

          {/* Template Switcher Tabs - Horizontally scrollable on small screens */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-cardLight border border-border-light rounded-xl shadow-2xs overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => handleTypeChange('dife')}
              className={`px-3.5 py-2 text-xs tracking-wider rounded-lg transition-all shrink-0 active-press ${
                lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel'
              } ${
                docType === 'dife'
                  ? 'bg-accent-light text-surface-light font-bold shadow-2xs'
                  : 'text-secondary-light hover:text-primary-light'
              }`}
            >
              {t('ডিআইএফই শ্রম অভিযোগ', 'DIFE COMPLAINT')}
            </button>
            <button
              onClick={() => handleTypeChange('gd')}
              className={`px-3.5 py-2 text-xs tracking-wider rounded-lg transition-all shrink-0 active-press ${
                lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel'
              } ${
                docType === 'gd'
                  ? 'bg-accent-light text-surface-light font-bold shadow-2xs'
                  : 'text-secondary-light hover:text-primary-light'
              }`}
            >
              {t('সাধারণ ডায়েরির আবেদন (GD)', 'POLICE GD')}
            </button>
            <button
              onClick={() => handleTypeChange('dncrp')}
              className={`px-3.5 py-2 text-xs tracking-wider rounded-lg transition-all shrink-0 active-press ${
                lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel'
              } ${
                docType === 'dncrp'
                  ? 'bg-accent-light text-surface-light font-bold shadow-2xs'
                  : 'text-secondary-light hover:text-primary-light'
              }`}
            >
              {t('ভোক্তা অধিকার (DNCRP)', 'CONSUMER DNCRP')}
            </button>
          </div>
        </div>

        {/* Mobile View Toggle: Form vs Preview (Sticky on Mobile) */}
        <div className="no-print flex lg:hidden mt-3 p-1 bg-surface-cardLight/95 backdrop-blur-md border border-border-light rounded-xl sticky top-14 z-20 shadow-xs">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all active-press ${
              mobileTab === 'edit'
                ? 'bg-accent-light text-surface-light shadow-xs'
                : 'text-secondary-light'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>{t('তথ্য পূরণ (Edit)', 'Edit Form')}</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all active-press ${
              mobileTab === 'preview'
                ? 'bg-accent-light text-surface-light shadow-xs'
                : 'text-secondary-light'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{t('খসড়া প্রাকদর্শন (Preview)', 'Preview')}</span>
          </button>
        </div>

        {/* Workspace: 2 Columns on Desktop, Tabbed on Mobile */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Editor */}
          <div className={`no-print lg:col-span-5 space-y-6 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="p-5 sm:p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border-light/80 dark:border-border-dark/80 pb-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-light dark:text-accent-dark flex items-center gap-1.5 font-cinzel">
                  <FileText className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                  <span>{t('তথ্য পূরণ ও নিশ্চিতকরণ', 'FACT FIELDS')}</span>
                </span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                    isComplete
                      ? 'bg-green-100 text-green-900 dark:bg-green-950/80 dark:text-green-300 border border-green-300 dark:border-green-800'
                      : 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  }`}
                >
                  {isComplete
                    ? t('সকল প্রয়োজনীয় তথ্য দেওয়া হয়েছে', 'All required fields filled')
                    : `${doc.unresolvedPlaceholders.length} ${t('টি তথ্য বাকি', 'fields incomplete')}`}
                </span>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 text-xs">
                {requiredFields.map((fieldKey) => (
                  <div key={fieldKey} className="space-y-1">
                    <label
                      htmlFor={`field-${fieldKey}`}
                      className="block font-medium text-secondary-light dark:text-secondary-dark"
                    >
                      {draftFieldLabels[fieldKey] || fieldKey}
                    </label>
                    {fieldKey === 'chronology' || fieldKey === 'assistance' ? (
                      <textarea
                        id={`field-${fieldKey}`}
                        rows={3}
                        value={formData[fieldKey]}
                        onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                        placeholder={t('এখানে বিস্তারিত লিখুন...', 'Enter details here...')}
                        className="w-full text-xs rounded-xl border border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 p-3 text-primary-light dark:text-primary-dark focus:bg-surface-light dark:focus:bg-surface-dark transition-colors"
                      />
                    ) : (
                      <input
                        id={`field-${fieldKey}`}
                        type="text"
                        value={formData[fieldKey]}
                        onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                        placeholder={
                          fieldKey === 'date'
                            ? t('যেমন: গত ১ সেপ্টেম্বর থেকে বকেয়া', 'e.g. Unpaid since Sept 1')
                            : t('এখানে লিখুন...', 'Type here...')
                        }
                        className="w-full text-xs rounded-xl border border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 p-2.5 text-primary-light dark:text-primary-dark focus:bg-surface-light dark:focus:bg-surface-dark transition-colors"
                      />
                    )}
                  </div>
                ))}

                {/* Attachments optional field */}
                <div className="space-y-1 pt-1">
                  <label htmlFor="field-attachments" className="block font-medium text-secondary-light dark:text-secondary-dark">
                    {draftFieldLabels.attachments}
                  </label>
                  <input
                    id="field-attachments"
                    type="text"
                    value={formData.attachments}
                    onChange={(e) => handleInputChange('attachments', e.target.value)}
                    placeholder={t('যেমন: বেতন স্লিপের কপি, নিয়োগপত্র', 'e.g. Payslip copy, appointment letter')}
                    className="w-full text-xs rounded-xl border border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 p-2.5 text-primary-light dark:text-primary-dark"
                  />
                </div>
              </div>

              {/* Factual Confirmation Checkbox */}
              <div className="pt-3.5 border-t border-border-light/70 dark:border-border-dark/70">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-secondary-light dark:text-secondary-dark">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-accent-light dark:accent-accent-dark shrink-0"
                  />
                  <span>
                    {t(
                      'আমি নিশ্চিত করছি যে উল্লিখিত তথ্যাবলি আমার জানা মতে সত্য এবং কোনো কাল্পনিক অভিযোগ বা ভুল তথ্য এতে নেই।',
                      'I confirm that the stated facts are true to the best of my knowledge and no fictitious claims have been included.'
                    )}
                  </span>
                </label>
              </div>

              {/* Mobile button to jump to preview */}
              <div className="pt-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className="w-full py-2.5 rounded-xl bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  <span>{t('খসড়া প্রাকদর্শন দেখুন', 'View Document Preview')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right A4 Document Preview */}
          <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Action Bar (no-print) */}
            <div className="no-print flex flex-wrap items-center justify-between p-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark gap-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-md font-cinzel ${
                    reviewed && isComplete
                      ? 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-300'
                      : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {reviewed && isComplete
                    ? t('তথ্য পর্যালোচিত খসড়া / Reviewed Draft', 'REVIEWED DRAFT')
                    : t('অসম্পূর্ণ খসড়া / Incomplete Draft', 'INCOMPLETE DRAFT')}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? t('কপি হয়েছে', 'Copied') : t('টেক্সট কপি', 'Copy')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{t('প্রিন্ট', 'Print')}</span>
                </button>

                <button
                  type="button"
                  disabled={exportingPdf}
                  onClick={handlePdfExport}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{exportingPdf ? t('পিডিএফ হচ্ছে...', 'Generating...') : t('A4 PDF ডাউনলোড', 'Download PDF')}</span>
                </button>
              </div>
            </div>

            {/* A4 Document Paper Sheet */}
            <div
              ref={printRef}
              className="printable-document bg-white text-black p-5 sm:p-14 rounded-2xl border border-border-light shadow-xl min-h-[600px] sm:min-h-[750px] font-bangla text-sm leading-relaxed space-y-6 overflow-x-auto"
            >
              {/* Document Paragraphs */}
              <div className="space-y-4">
                {doc.paragraphs.map((p, idx) => (
                  <div key={idx} className="whitespace-pre-line leading-relaxed">
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Screen-Only Legal Reference & Guidance (Excluded from PDF download & Print) */}
            <div className="no-print p-4 rounded-xl border border-border-light/80 bg-surface-cardLight text-xs text-secondary-light space-y-2 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-light/60 pb-2">
                <span>
                  <strong className="text-primary-light font-medium">{t('আইনি উৎস ও টেমপ্লেট:', 'Legal Template & Source:')}</strong>{' '}
                  <span className="font-mono text-[11px]">{doc.templateId} · v{doc.templateVersion} · {doc.sourcePackVersion}</span>
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${isComplete ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isComplete ? t('প্রিন্ট-রেডি ফরম্যাট', 'Print-ready format') : t('তথ্য অসম্পূর্ণ', 'Details pending')}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-secondary-light/90">
                <strong className="text-primary-light font-medium">{t('ব্যবহারকারী নির্দেশিকা:', 'Notice:')}</strong>{' '}
                {t(
                  'এটি MyLaws দ্বারা প্রস্তুতকৃত একটি খসড়া আবেদনপত্র। এটি কোনো আদালত বা থানার সিলমোহরযুক্ত নথি নয়। সংশ্লিষ্ট কর্তৃপক্ষ বা থানায় দাখিল করার পূর্বে নাম, তারিখ ও বিবরণ নিজে পুনরায় যাচাই করে নিন।',
                  'This draft document is prepared by MyLaws for formal submission. Verify all facts, dates, and names before signing and submitting to authorities.'
                )}
              </p>
            </div>

            {/* Sticky Mobile Action Bar in Preview Tab */}
            <div className="no-print lg:hidden fixed bottom-14 left-0 right-0 z-30 p-2.5 bg-surface-cardLight/95 backdrop-blur-md border-t border-border-light flex items-center justify-around gap-2 shadow-lg">
              <button
                type="button"
                onClick={handleCopyText}
                className="flex-1 py-2 px-2 rounded-lg border border-border-light text-xs font-semibold flex items-center justify-center gap-1 active-press bg-surface-light text-secondary-light"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-accent-light" />}
                <span>{copied ? t('কপি হয়েছে', 'Copied') : t('কপি', 'Copy')}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="py-2 px-3 rounded-lg border border-border-light text-xs font-semibold flex items-center justify-center gap-1 active-press bg-surface-light text-secondary-light"
              >
                <Printer className="h-3.5 w-3.5 text-accent-light" />
                <span>{t('প্রিন্ট', 'Print')}</span>
              </button>
              <button
                type="button"
                disabled={exportingPdf}
                onClick={handlePdfExport}
                className="flex-1 py-2 px-3 rounded-lg bg-accent-light text-white text-xs font-semibold flex items-center justify-center gap-1 shadow active-press disabled:opacity-50"
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
