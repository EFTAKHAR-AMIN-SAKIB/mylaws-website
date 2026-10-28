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
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
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

  const printRef = useRef<HTMLDivElement>(null);

  // Load any pending draft from session storage (e.g. if navigated from /ask)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('mylaws_pending_draft');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.type && ['gd', 'dife'].includes(parsed.type)) {
          setDocType(parsed.type);
        }
        if (parsed.facts && Array.isArray(parsed.facts)) {
          const updated: Record<string, string> = { ...formData };
          parsed.facts.forEach((f: FactValue) => {
            if (f.fieldId && f.value) {
              updated[f.fieldId] = f.value;
            }
          });
          if (parsed.query && !updated.chronology) {
            updated.chronology = parsed.query;
          }
          setFormData(updated);
        }
      }
    } catch {}
  }, []);

  // Update recipient default when docType changes if not manually edited
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

  // Convert formData into DraftFacts
  const currentFacts: DraftFacts = {
    fields: Object.entries(formData).map(([k, v]) => ({
      fieldId: k,
      value: v,
      status: v.trim() ? 'user_confirmed' : 'unknown',
      provenance: 'user_editor',
    })),
  };

  // Build document model
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
    try {
      await exportElementToA4Pdf(
        printRef.current,
        `MyLaws_${docType.toUpperCase()}_Draft.pdf`
      );
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border-light/70 dark:border-border-dark/70 gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-light dark:text-primary-dark">
              {t('অভিযোগ ও জিডি খসড়া প্রস্তুতকারক', 'Bangla Complaint & GD Draft Generator')}
            </h1>
            <p className="text-xs text-secondary-light dark:text-secondary-dark mt-1">
              {t(
                'অনলাইনে ঘটনা ও ব্যক্তিগত বিবরণ নিশ্চিত করুন, প্রমিত খসড়া সম্পাদনা করুন এবং নির্ভুল A4 PDF ডাউনলোড করুন।',
                'Verify details, edit standardized Bangla complaint templates, and export clean A4 PDFs.'
              )}
            </p>
          </div>

          {/* Template Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl">
            <button
              onClick={() => handleTypeChange('dife')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                docType === 'dife'
                  ? 'bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark shadow-sm'
                  : 'text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'
              }`}
            >
              {t('ডিআইএফই শ্রম অভিযোগ', 'DIFE Written Complaint')}
            </button>
            <button
              onClick={() => handleTypeChange('gd')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                docType === 'gd'
                  ? 'bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark shadow-sm'
                  : 'text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'
              }`}
            >
              {t('সাধারণ ডায়েরির আবেদন (GD)', 'Police GD Application')}
            </button>
          </div>
        </div>

        {/* Workspace: 2 Columns on Desktop */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Editor (no-print) */}
          <div className="no-print lg:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border-light/60 dark:border-border-dark/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-light dark:text-primary-dark flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                  <span>{t('তথ্য পূরণ ও নিশ্চিতকরণ', 'Input & Fact Fields')}</span>
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    isComplete
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {isComplete
                    ? t('সকল প্রয়োজনীয় তথ্য দেওয়া হয়েছে', 'All required fields filled')
                    : `${doc.unresolvedPlaceholders.length} ${t('টি তথ্য বাকি', 'fields incomplete')}`}
                </span>
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5 text-xs">
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
                        className="w-full text-xs rounded-lg border border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/60 p-2.5 text-primary-light dark:text-primary-dark focus:bg-surface-light dark:focus:bg-surface-dark"
                      />
                    ) : (
                      <input
                        id={`field-${fieldKey}`}
                        type={fieldKey === 'date' || fieldKey === 'applicationDate' ? 'text' : 'text'}
                        value={formData[fieldKey]}
                        onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                        placeholder={
                          fieldKey === 'date'
                            ? t('যেমন: গত ১ সেপ্টেম্বর থেকে বকেয়া', 'e.g. Unpaid since Sept 1')
                            : t('এখানে লিখুন...', 'Type here...')
                        }
                        className="w-full text-xs rounded-lg border border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/60 p-2 text-primary-light dark:text-primary-dark focus:bg-surface-light dark:focus:bg-surface-dark"
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
                    className="w-full text-xs rounded-lg border border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/60 p-2 text-primary-light dark:text-primary-dark"
                  />
                </div>
              </div>

              {/* Factual Confirmation Checkbox */}
              <div className="pt-3 border-t border-border-light/60 dark:border-border-dark/60">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-secondary-light dark:text-secondary-dark">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-accent-light dark:accent-accent-dark"
                  />
                  <span>
                    {t(
                      'আমি নিশ্চিত করছি যে উল্লিখিত তথ্যাবলি আমার জানা মতে সত্য এবং কোনো কাল্পনিক অভিযোগ বা ভুল তথ্য এতে নেই।',
                      'I confirm that the stated facts are true to the best of my knowledge and no fictitious claims have been included.'
                    )}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right A4 Document Preview */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action Bar (no-print) */}
            <div className="no-print flex flex-wrap items-center justify-between p-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                    reviewed && isComplete
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {reviewed && isComplete
                    ? t('তথ্য পর্যালোচিত খসড়া / Reviewed Draft', 'Reviewed Draft')
                    : t('অসম্পূর্ণ খসড়া / Incomplete Draft', 'Incomplete Draft')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? t('কপি হয়েছে', 'Copied') : t('টেক্সট কপি', 'Copy Text')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{t('প্রিন্ট করুন', 'Print')}</span>
                </button>

                <button
                  type="button"
                  disabled={exportingPdf}
                  onClick={handlePdfExport}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{exportingPdf ? t('পিডিএফ হচ্ছে...', 'Generating...') : t('A4 PDF ডাউনলোড', 'Download PDF')}</span>
                </button>
              </div>
            </div>

            {/* A4 Document Paper Sheet */}
            <div
              ref={printRef}
              className="printable-document bg-white text-black p-8 sm:p-12 rounded-xl border border-border-light shadow-md min-h-[750px] font-bangla text-sm leading-relaxed space-y-6"
            >
              {/* Document Header Notice */}
              <div className="border-b-2 border-black/80 pb-3 text-center space-y-1">
                <h2 className="text-base font-bold uppercase tracking-wider">
                  খসড়া — জমা দেওয়ার আগে তথ্য যাচাই করুন
                </h2>
                <p className="text-xs font-semibold text-gray-700">
                  {reviewed && isComplete
                    ? 'তথ্য পর্যালোচিত খসড়া / Reviewed draft'
                    : 'অসম্পূর্ণ খসড়া / Incomplete draft'}
                </p>
              </div>

              {/* Document Paragraphs */}
              <div className="space-y-4 pt-2">
                {doc.paragraphs.map((p, idx) => (
                  <div key={idx} className="whitespace-pre-line leading-relaxed">
                    {p}
                  </div>
                ))}
              </div>

              {/* Bottom Reference Section */}
              <div className="pt-8 mt-12 border-t border-gray-300 text-[10px] text-gray-600 space-y-1">
                <p>
                  <strong>আইনি উৎস ও টেমপ্লেট:</strong> {doc.templateId} · সংস্করণ {doc.templateVersion} · প্যাক {doc.sourcePackVersion}
                </p>
                <p>
                  <strong>সতর্কতা:</strong> এটি মাই লজ (MyLaws) দ্বারা প্রস্তুতকৃত একটি খসড়া। এটি আদালত কর্তৃক গৃহীত মামলা, থানার জিডি বা পরিদর্শকের আদেশ নয়। দাখিলের পূর্বে সকল তথ্য যাচাই করে নিন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
