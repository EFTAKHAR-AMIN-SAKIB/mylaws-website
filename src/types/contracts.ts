/**
 * MyLaws Canonical Contracts & Types
 * Exact parity with Android bd.mylaws.app.core.contracts.Contracts.kt
 */

export const SCHEMA_VERSION = 1;

export type ExecutionMode = 'demo_fixture' | 'online' | 'offline_generated' | 'offline_guided';

export type AnswerStatus =
  | 'ready'
  | 'submitted'
  | 'clarifying'
  | 'finding_sources'
  | 'verifying'
  | 'completed'
  | 'cancelled'
  | 'timed_out'
  | 'unavailable'
  | 'unsupported';

export type ServiceError =
  | 'offline_not_installed'
  | 'network'
  | 'auth'
  | 'rate_limit'
  | 'source_insufficient'
  | 'needs_location'
  | 'template_inapplicable'
  | 'low_memory'
  | 'stale_pack'
  | 'incompatible_pack'
  | 'cancelled';

export type Verification = 'illustrative' | 'authoritative' | 'needs_verification';

export type FactStatus = 'user_confirmed' | 'user_reported' | 'unknown';

export type DocumentType = 'gd' | 'dife';

export type ReviewStatus = 'incomplete' | 'needs_review' | 'reviewed';

export type ExportStatus = 'never_exported' | 'exported' | 'failed';

export type InstallStatus =
  | 'not_installed'
  | 'downloading'
  | 'paused'
  | 'ready'
  | 'needs_update'
  | 'incompatible'
  | 'interrupted'
  | 'corrupt'
  | 'low_storage'
  | 'low_memory'
  | 'guided_only'
  | 'failure';

export interface FactValue {
  fieldId: string;
  value: string;
  status: FactStatus;
  provenance: string;
}

export interface AnswerRequest {
  requestId: string;
  originalMessage: string;
  language: 'en' | 'bn';
  facts: FactValue[];
  location?: string | null;
  date?: string | null;
  requestedMode?: ExecutionMode;
  sourceVersion?: string;
}

export interface ChecklistStep {
  id: string;
  text: string;
  sourceIds?: string[];
  officeId?: string | null;
  condition?: string;
  completed?: boolean;
  requiredDocuments?: string[];
  helpfulEvidence?: string[];
}

export interface Claim {
  text: string;
  sourceIds: string[];
}

export interface AnswerResult {
  schemaVersion: number;
  answerId: string;
  mode: ExecutionMode;
  status: AnswerStatus;
  questions: string[];
  userFacts: FactValue[];
  checklist: ChecklistStep[];
  explanation: Claim[];
  limitations: string[];
  sourcePackVersion: string;
  allowedDraftOptions: DocumentType[];
}

export interface SourceRecord {
  id: string;
  type: Verification;
  originalText: string;
  title: string;
  provisionPath: string;
  officialUrl?: string | null;
  verifiedDate?: string | null;
  effectiveDate?: string | null;
  recordVersion: string;
  packVersion: string;
}

export interface OfficeRecord {
  id: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  territory?: string | null;
  issueScope?: string | null;
  sourceIds: string[];
  verificationDate?: string | null;
  status: Verification;
}

export interface DraftFacts {
  fields: FactValue[];
}

export interface DraftDocument {
  id: string;
  templateId: string;
  templateVersion: string;
  type: DocumentType;
  facts: DraftFacts;
  recipient: string;
  paragraphs: string[];
  unresolvedPlaceholders: string[];
  reviewStatus: ReviewStatus;
  sourcePackVersion: string;
  exportStatus: ExportStatus;
}

export interface PackState {
  id: string;
  modelVersion?: string | null;
  legalVersion?: string | null;
  indexVersion?: string | null;
  templateVersion?: string | null;
  status: InstallStatus;
  compatible: Boolean;
  coverage: string[];
  sizeBytes: number;
  freeBytesRequired: number;
  completedBytes: number;
  error?: ServiceError | null;
}

export interface ServiceEvent {
  requestId: string;
  sequence: number;
  status: AnswerStatus;
  result?: AnswerResult | null;
  error?: ServiceError | null;
}

export interface AndroidReleaseManifest {
  version: string;
  versionCode: number;
  releaseDate: string;
  status: 'available' | 'preview' | 'not_yet_available';
  apkUrl: string | null;
  fileSizeBytes: number | null;
  sha256Checksum: string | null;
  minimumAndroidVersion: string;
  recommendedRam: string;
  testedDevices: string[];
  changeLog: string[];
}
