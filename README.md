# ⚖️ MyLaws — Bangladesh Legal Information & Preparation Assistant

> **A trustworthy, accessible, and privacy-respecting legal assistant and document preparation platform for citizens in Bangladesh.**  
> Built with Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS, and Vitest.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tests-25%20Passed-brightgreen?style=flat&logo=vitest)](https://vitest.dev/)
[![Status](https://img.shields.io/badge/Production-Ready-success?style=flat)]()

---

## 📖 Table of Contents
1. [The Problem & The Vision](#-the-problem--the-vision)
2. [How It Works (A to Z)](#-how-it-works-a-to-z)
3. [How the Backend Works Without an External API](#-how-the-backend-works-without-an-external-api)
4. [Live Features & Verified User Journeys](#-live-features--verified-user-journeys)
5. [Codebase Anatomy & Architecture](#-codebase-anatomy--architecture)
6. [API Contracts & Endpoints](#-api-contracts--endpoints)
7. [Bangla PDF Generation (Complex Script Shaping)](#-bangla-pdf-generation-complex-script-shaping)
8. [Local Development & Testing](#-local-development--testing)
9. [Developer Handoff & Roadmap](#-developer-handoff--roadmap)

---

## 🎯 The Problem & The Vision

In Bangladesh, ordinary citizens frequently suffer legal injustices—such as **unpaid wages, workplace exploitation, digital harassment, and consumer fraud**—simply because they do not know:
- Which specific law protects them (e.g., Section 123 of Labour Act, Section 503 of Penal Code).
- What procedural deadlines apply (e.g., 7 days for wages, 30 days for consumer complaints).
- How to draft a formal complaint letter addressed to government inspectors or police officers.

### Why Standard AI Chatbots Fail for Law
Standard Large Language Models (LLMs) **hallucinate**: they invent non-existent penal sections, fabricate deadlines, and give misleading advice. 

**MyLaws solves this with a Ground-Truth-First Architecture**:
- All legal citations, deadlines, and rights are anchored to a verified database of statutory provisions from official gazettes (`bdlaws.minlaw.gov.bd`).
- The assistant is **fully functional without any external AI API**, eliminating downtime, API subscription costs, privacy leaks, and hallucinations.
- When an optional LLM (`MODEL_API_KEY`) is connected, its outputs are strictly filtered: any claim not backed by verified statutory citations is rejected.

---

## 🧠 How It Works (A to Z)

Here is the complete journey of a query from the moment a user types in their problem to downloading an official legal draft:

```
[User Query: Bangla / English / Banglish]
                 │
                 ▼
       [/api/answer Endpoint]
                 │
  ┌──────────────┴────────────────────────┐
  ▼                                       ▼
[1. Text Preprocessing]          [2. Ground-Truth Data]
 • NFKC Unicode normalization     • 23 verified statutory provisions
 • Bengali numeral mapping         (Labour Act, Penal Code, DNCRP, etc.)
 • Bilingual stopword stripping   • Official government office directory
 • Banglish slang expansion        (DIFE 16104, DNCRP 16121, Legal Aid 16699)
  │
  ▼
[3. In-Memory BM25 Lexical Retrieval]
 • TF-IDF calculation against 23 provisions
 • Exact keyword & phrase bonus matching
  │
  ▼
[4. Legal Finite State Machine (FSM)]
 • Jurisdiction Guard: Detects foreign locations (India, UK ➔ unsupported)
 • Contradiction Guard: Detects full payment reports (no claim exists)
 • Domain Classifier: Routes to Work, Police GD, Consumer, or Fundamental Rights
 • Missing Fact Evaluator:
    - Missing district or employment type? ➔ Status: 'clarifying'
    - All facts present?                  ➔ Status: 'completed'
  │
  ▼
[5. Canonical 4-Part Response Synthesis]
 ├── 1. Problem Summary (Identifies statutory violation)
 ├── 2. Plain Language Explanation (What the law says in simple terms)
 ├── 3. Action Checklist (3-5 concrete steps with official hotlines)
 └── 4. Formal Draft Offer (One-click transition to /drafts)
                 │
                 ▼
[6. Bangla Draft Editor & A4 PDF Generator]
 • Pre-fills formal application (DIFE Complaint or Police GD)
 • High-DPI Canvas rasterization preserves Bengali conjuncts (যুক্তাক্ষর)
 • Print-ready A4 PDF download
```

---

## ⚙️ How the Backend Works Without an External API

You do **not** need an API key from OpenAI, Meta, or Google to run MyLaws. When no `MODEL_API_KEY` is present in `.env`:

1. **In-Memory Legal Corpus (`src/data/legal.ts`)**: 
   Stores 23 human-verified statutory provisions with exact quotations, official government portal URLs, and legal cautions.
2. **Deterministic Lexical Search (`src/lib/retrieval.ts`)**: 
   Runs an in-memory BM25 algorithm that scores search queries against the statutory corpus. It natively understands phonetic **Banglish** (e.g. `amr boss 2 mash er beton deynai` is expanded to `wages salary unpaid employment`).
3. **Rule-Based Workflow Engine (`src/lib/workflow.ts`)**: 
   A deterministic expert system that examines the facts. If information is missing, it returns follow-up questions (`status: 'clarifying'`). Once answered, it outputs an exact 4-step Action Checklist with verified government contacts.
4. **Draft Engine (`src/lib/drafts.ts`)**: 
   Merges user facts into standard legal formats, placing visible tags (like `[বর্তমান ঠিকানা লিখুন]`) on unconfirmed fields so users never submit incomplete drafts.

---

## 🌟 Live Features & Verified User Journeys

### 1. Unpaid Wages & Worker Rights (Labour Act 2006)
- **Problem**: *"আমার মালিক গত দুই মাসের বেতন দেয়নি। আমি কী করব?"* (or Banglish: *"amr boss 2 mash er beton deynai"*).
- **Behavior**: Prompts for workplace district and employment type (private vs. EPZ), explains Section 123 (wages must be paid within 7 working days), provides a step-by-step checklist, and generates a formal complaint addressed to the DIFE Labour Inspector.

### 2. Threats, Harassment & Police GD (Penal Code 1860)
- **Problem**: *"আমাকে ফোনে ও ফেসবুকে অপরিচিত ব্যক্তি হুমকি দিচ্ছে। জিডি কীভাবে করব?"*.
- **Behavior**: Outlines Sections 503 and 507 (Criminal Intimidation), warns not to confront the sender, provides emergency 999 referral, and prepares an official General Diary (GD) draft for the local police station.

### 3. Consumer Rights & Delivery Fraud (Act 2009)
- **Problem**: *"অনলাইন শপে টাকা দিয়েছি কিন্তু পণ্য দেয়নি।"*.
- **Behavior**: Explains Section 45 (commercial deception) and Section 60 (30-day statutory deadline), mentions the right to 25% of any imposed fine, and offers a DNCRP complaint template.

### 4. Interactive 3D Turntable Scales of Justice
- A smooth 60fps / 120fps interactive turntable on the landing page, allowing users to rotate Lady Justice's scales with realistic momentum and dragging.

---

## 📂 Codebase Anatomy & Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── answer/route.ts         # Main legal reasoning & workflow endpoint
│   │   ├── drafts/prepare/route.ts # Prepares structured complaint documents
│   │   ├── manifest/route.ts       # Returns legal pack & APK release metadata
│   │   ├── offices/route.ts        # Verified government office directory lookup
│   │   ├── sources/route.ts        # Searchable statutory provisions library
│   │   └── status/route.ts         # Operational health & model configuration status
│   ├── ask/page.tsx                # Interactive Legal Assistant page
│   ├── drafts/page.tsx             # Bangla Draft Editor & A4 PDF preview page
│   ├── download/page.tsx           # Android APK download page
│   ├── sources/page.tsx            # Public statutory library directory page
│   └── page.tsx                    # Landing showcase page
├── components/
│   ├── AppContext.tsx              # Bilingual state (bn/en) and theme provider
│   ├── CasePreview.tsx             # Interactive Hero case folder (Checklist/Source/Draft)
│   ├── Checklist.tsx               # Action checklist with toggleable completion steps
│   ├── SourceDrawer.tsx            # Slide-out drawer for verbatim statutory quotes
│   ├── OfficeModal.tsx             # Government hotlines & office details modal
│   └── TurntableScales.tsx         # 60fps interactive 3D scale renderer
├── data/
│   ├── legal.ts                    # 23 verified statutory provisions
│   ├── offices.ts                  # Verified office records (DIFE, Police, DNCRP, Legal Aid)
│   └── manifest.ts                 # Release manifests and hashes
├── lib/
│   ├── retrieval.ts                # In-memory BM25 retrieval & Banglish normalizer
│   ├── workflow.ts                 # Legal Finite State Machine & canonical journey builder
│   ├── drafts.ts                   # Document templating & fact merging
│   ├── meta.ts                     # Optional Meta AI adapter & citation validator
│   └── pdf.ts                      # Multi-page A4 canvas text shaping for Bengali
└── types/
    └── contracts.ts                # Shared TypeScript contracts matching Android native app
```

---

## 🔌 API Contracts & Endpoints

All endpoints use standard JSON payloads and include strict rate limiting (10 requests/minute per IP):

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/answer` | Accepts user message and facts; returns legal workflow, checklist, citations, and draft offer. |
| `POST` | `/api/drafts/prepare` | Merges facts into a formal complaint document (DIFE, GD, or DNCRP). |
| `GET` | `/api/sources?q=&category=` | Full-text search over the 23 verified statutory provisions. |
| `GET` | `/api/offices?id=` | Queries verified government hotlines and office addresses. |
| `GET` | `/api/manifest` | Returns legal pack version (`bd-pilot-2026-10-27.1`) and Android APK metadata. |
| `GET` | `/api/status` | Reports service status and whether `MODEL_API_KEY` is configured. |

---

## 📄 Bangla PDF Generation (Complex Script Shaping)

Most PDF generators fail with Bengali text because standard font embedding breaks **conjunct characters (যুক্তাক্ষর)** and **vowel marks (কার)**.

**Our Solution (`src/lib/pdf.ts`)**:
- Uses an HTML5 Canvas to leverage the browser's native HarfBuzz text shaping engine with the `Noto Sans Bengali` font.
- Renders text with exact typographic fidelity into high-DPI A4-proportioned canvases.
- Automatically handles multi-page line wrapping, official headers, and signature lines before compiling into a clean A4 PDF via `jspdf`.

---

## 🚀 Local Development & Testing

### Prerequisites
- Node.js 20+ (tested on Node 22)
- npm 10+

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (25 tests)
npm test

# 3. Start local development server
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 🗺️ Developer Handoff & Roadmap

For an in-depth technical analysis, deep architectural breakdown, and next development priorities, refer to:
👉 **[docs/PROJECT_ANALYSIS_AND_DEV_HANDOFF.md](docs/PROJECT_ANALYSIS_AND_DEV_HANDOFF.md)**

### Key Roadmap Items for Next Developer:
1. **Persistent Database**: Add PostgreSQL / Supabase to allow users to save their case history and drafted documents securely across sessions.
2. **Corpus Expansion**: Expand beyond the current 23 provisions to include Family Law (MFLO 1961), Tenancy & Land Disputes (Specific Relief Act), and Cyber Security.
3. **Pluggable LLM Adapters**: Extend `src/lib/meta.ts` to allow easy switching between Gemini, OpenAI, Claude, or local Ollama instances.
4. **Additional Document Templates**: Build templates for consumer court petitions and formal legal notices.

---

## 📜 License & Disclaimers

MyLaws is an **information and preparation tool**, not a formal law firm, court, or automated filing service. Users are always advised to consult licensed advocates or call the National Legal Aid Hotline (**16699**) before taking legal action.
