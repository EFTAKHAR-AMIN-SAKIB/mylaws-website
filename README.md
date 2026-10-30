# ⚖️ MyLaws — Bangladesh Legal Information & Preparation Assistant

> **A trustworthy, accessible, and source-grounded legal assistant and document preparation platform for citizens in Bangladesh.**  
> Built with Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS, Cloudflare D1 Edge Database, and Vitest.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tests-96%20Passed-brightgreen?style=flat&logo=vitest)](https://vitest.dev/)
[![Corpus](https://img.shields.io/badge/Corpus-255%20Provisions%20%7C%2031%20Acts-orange?style=flat)](https://bdlaws.minlaw.gov.bd)
[![Production](https://img.shields.io/badge/Production-Live%20on%20Vercel-success?style=flat)](https://mylaws-bd.vercel.app)

---

## 📖 Table of Contents
1. [Overview & Mission](#-overview--mission)
2. [7 Core Legal Categories & Statutory Coverage](#-7-core-legal-categories--statutory-coverage)
3. [System Architecture & Flow](#-system-architecture--flow)
4. [Dual-Engine Grounding (Online AI + Resilient Fallback)](#-dual-engine-grounding-online-ai--resilient-fallback)
5. [Live Features & User Journeys](#-live-features--user-journeys)
6. [Codebase Structure](#-codebase-structure)
7. [API Endpoints](#-api-endpoints)
8. [Bangla PDF Generation (Complex Script Shaping)](#-bangla-pdf-generation-complex-script-shaping)
9. [Local Development & Testing](#-local-development--testing)
10. [Production Deployment & Rollback](#-production-deployment--rollback)
11. [Disclaimers](#-disclaimers)

---

## 🎯 Overview & Mission

In Bangladesh, ordinary citizens frequently face legal injustices—such as **unpaid wages, arbitrary dismissal, digital blackmail, consumer deception, land dispossession, and domestic harassment**—simply because they do not know:
- Which specific statute protects them (e.g., Section 123 of Labour Act, Section 13 of Land Crime Act, Section 51 of Consumer Act).
- What procedural deadlines apply (e.g., 7 working days for wages, 30 calendar days for consumer complaints).
- How to draft formal complaint letters addressed to government authorities (DIFE, DNCRP, or Police Stations).

### Ground-Truth-First Architecture
Standard LLMs hallucinate non-existent sections, fabricate deadlines, and invent rights. **MyLaws solves this by anchoring all answers directly to official Bangladesh gazetted laws**:
- **Source Grounding**: Citations link to official texts from the Ministry of Law, Justice and Parliamentary Affairs (`bdlaws.minlaw.gov.bd`).
- **Citation Validator**: The Meta AI adapter strictly validates citations; any response referencing fabricated or out-of-scope provisions is rejected and rerouted to the verified canonical engine.
- **Resilient Fallback**: If external AI APIs time out or fail, the built-in deterministic workflow guarantees an immediate, verified 4-step canonical answer with official hotlines.

---

## 📚 7 Core Legal Categories & Statutory Coverage

The platform covers **255 statutory provisions across 31 Acts**, organized into 7 fundamental citizen domains:

| # | Category | Key Enactments | Scope & Rights Protected |
|---|---|---|---|
| 1 | **Employment & Labor** (`work`) | Bangladesh Labour Act 2006 | Unpaid wages (Sec 123), weekly holidays (Sec 103), termination notice & severance (Sec 26), resignation (Sec 27), maternity benefits (Sec 46), workplace accident compensation (Sec 151). |
| 2 | **Threats & General Diary** (`threats`) | The Penal Code 1860, Police Act 1861, CrPC 1898 | Criminal intimidation (Sec 503/506), extortion (Sec 383/384), non-cognizable GD process (Sec 155), unlawful assembly (Sec 141), causing hurt (Sec 323/325). |
| 3 | **Cyber & Digital Security** (`digital`) | Cyber Protection Act 2026, Pornography Control Act 2012 | Online blackmail & intimate imagery extortion (Sec 8(1)), identity fraud & fake profiles (Penal Code 419), unauthorized computer access and data tampering. |
| 4 | **Consumer Rights & Fraud** (`consumer`) | Consumers’ Right Protection Act 2009 | Knowingly selling adulterated goods/medicines (Sec 41), food chemical mixing (Sec 42), short weight (Sec 46), short measure (Sec 48), counterfeit manufacture (Sec 50), expired medicines (Sec 51), 30-day complaint deadline (Sec 60), 25% fine reward (Sec 76(4)). |
| 5 | **Land & Property Disputes** (`land`) | Land Crime Act 2023, Specific Relief Act 1877 | Illegal dispossession (Sec 7), topsoil cutting exception & bailable status (Sec 13 & 19), recovery of possession (SRA Sec 8 & 9), deed fraud and forgery. |
| 6 | **Domestic Violence & Family Law** (`family`) | Family Courts Act 2023 (Act 26 of 2023), MFLO 1961, DV Act 2010 | Family court jurisdiction (Sec 5), dower & maintenance enforcement, child custody, domestic violence protection orders, dowry prohibition. |
| 7 | **Fundamental Rights & Legal Aid** (`rights`) | Constitution of Bangladesh 1972, Legal Aid Act 2000 | Article 33 24-hour magistrate production requirement, right to counsel, National Legal Aid Helpline (**16699**), government legal aid eligibility. |

---

## 🧠 System Architecture & Flow

```
[User Query: Bangla / English / Banglish]
                 │
                 ▼
        [/api/answer Endpoint]
                 │
  ┌──────────────┴────────────────────────┐
  ▼                                       ▼
[1. User Auth & Quota Guard]     [2. Edge Retrieval]
 • Firebase Auth verification     • BM25 Lexical + Banglish Expansion
 • 30 queries/day quota check     • Cloudflare D1 Edge SQLite Corpus
 • Rate limiting (10 req/min/IP)  • 255 Verified Statutory Provisions
  │
  ▼
[3. Grounded Synthesis Engine]
  ├── Branch A: Meta AI Assistance (muse-spark-1.3)
  │    └── Strict Citation Validator (rejects hallucinations)
  └── Branch B: Deterministic Canonical Legal FSM
       └── Zero-hallucination rule-based fallback
  │
  ▼
[4. 4-Part Response Synthesis]
  ├── 1. Problem Summary (Identifies statutory violations)
  ├── 2. Plain Language Explanation (Verbatim grounded summary)
  ├── 3. Action Checklist (Step-by-step guidance + hotlines)
  └── 4. Formal Draft Offer (GD, DIFE, or DNCRP complaint)
                 │
                 ▼
[5. Bangla Draft Editor & A4 PDF Generator]
  • High-DPI Canvas rasterization preserving Bengali conjuncts (যুক্তাক্ষর)
  • Print-ready A4 PDF download
```

---

## ⚙️ Dual-Engine Grounding (Online AI + Resilient Fallback)

1. **Meta AI Model Assistance**:
   When `MODEL_API_KEY` is configured, queries are processed by the Meta AI model (`muse-spark-1.3`). The model's response is passed through a **runtime citation validation pass** (`src/lib/meta.ts`). If the model cites unsupported sections, invents rights, or contradicts statutory conditions, the response is discarded.
2. **Deterministic Guided Fallback**:
   If the AI model is unconfigured or times out, the system automatically falls back to the deterministic workflow (`src/lib/workflow.ts`). This ensures uninterrupted 24/7 service without breaking the user experience.
3. **Phonetic Banglish Understanding**:
   The retrieval engine natively understands phonetic Banglish (e.g., `"amr boss 2 mash dhori beton dey na"` is parsed to unpaid wages under Labour Act Section 123).

---

## 🌟 Live Features & User Journeys

- **Bilingual Legal Assistant (`/ask`)**: Multi-turn conversational consultation in Bangla and English with context retention (e.g., answering `"গতকাল"` to a clarification question preserves the initial dispute).
- **Interactive Sources Directory (`/sources`)**: Complete searchable repository of 255 provisions from 31 statutes with pagination, category filtering, and direct links to official gazettes on `bdlaws.minlaw.gov.bd`.
- **Bangla Draft Generator (`/drafts`)**: Automatic preparation of formal complaints (Police GD, DIFE Labor Complaint, DNCRP Consumer Petitions) with high-fidelity A4 PDF export.
- **Cloudflare D1 Edge Persistence**: Secure user authentication, daily query quota tracking, and conversation history.

---

## 📂 Codebase Structure

```
src/
├── app/
│   ├── api/
│   │   ├── answer/route.ts         # Legal reasoning, retrieval & grounded answer synthesis
│   │   ├── drafts/prepare/route.ts # Prepares formal complaint draft documents
│   │   ├── manifest/route.ts       # Returns legal pack release metadata
│   │   ├── offices/route.ts        # Government helpline & office directory lookup
│   │   ├── sources/route.ts        # Searchable statutory library with pagination
│   │   ├── status/route.ts         # Service operational health & corpus version metadata
│   │   ├── user/history/route.ts   # User query history management (with delete support)
│   │   └── user/sync/route.ts      # Cloudflare D1 user quota & profile sync
│   ├── ask/page.tsx                # Interactive Legal Assistant page
│   ├── drafts/page.tsx             # Bangla Draft Editor & A4 PDF preview page
│   ├── download/page.tsx           # Native application preview & progress roadmap (/download, /application)
│   ├── login/page.tsx              # Firebase user authentication page
│   ├── sources/page.tsx            # Public statutory library directory with pagination
│   └── page.tsx                    # Landing showcase page
├── components/
│   ├── AuthModal.tsx               # Firebase login / register modal
│   ├── CasePreview.tsx             # Interactive Hero case folder (Checklist/Source/Draft)
│   ├── Checklist.tsx               # Action checklist with toggleable completion steps
│   ├── Header.tsx                  # Navigation header with user profile & quota counter
│   ├── SourceDrawer.tsx            # Slide-out drawer for verbatim statutory quotes
│   └── TurntableScales.tsx         # 60fps interactive 3D scale renderer
├── data/
│   ├── corpus/                     # Verified statutory JSON corpus (255 provisions, 31 Acts)
│   ├── legal.generated.ts          # Compiled canonical provisions for server-side fallback
│   ├── manifest.ts                 # Release pack metadata & checksums
│   └── offices.ts                  # Verified government hotlines (16104, 16121, 16699, 999)
├── lib/
│   ├── cloudflare.ts               # Cloudflare D1 REST client
│   ├── drafts.ts                   # Document templating & fact merging
│   ├── followup.ts                 # Multi-turn context & intent classification
│   ├── meta.ts                     # Meta AI adapter & citation grounding validator
│   ├── pdf.ts                      # Multi-page A4 canvas text shaping for Bengali conjuncts
│   ├── retrieval.ts                # BM25 retrieval & Banglish normalizer
│   ├── userDb.ts                   # User quota tracking & token verification
│   └── workflow.ts                 # Deterministic legal FSM & 4-part journey builder
└── types/
    └── contracts.ts                # Canonical TypeScript data contracts
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/answer` | Accepts user legal question and conversation facts; returns verified workflow, checklist, citations, and draft offer. | Yes (Firebase ID Token) |
| `GET` | `/api/sources` | Search and filter the 255 verified provisions by query and category with pagination (`limit`, `offset`). | No |
| `POST` | `/api/drafts/prepare` | Merges user facts into a formal legal complaint template (DIFE, GD, or DNCRP). | Yes |
| `GET` | `/api/offices` | Queries official government helpline contacts and office jurisdiction. | No |
| `GET` | `/api/status` | Reports system operational health, active AI model, provisions count (255), and corpus release version. | No |
| `GET` | `/api/user/history` | Fetches authenticated user's past query history. | Yes |
| `DELETE` | `/api/user/history` | Clears user's query history from Cloudflare D1. | Yes |
| `POST` | `/api/user/sync` | Synchronizes user profile and retrieves remaining daily query quota. | Yes |

---

## 📄 Bangla PDF Generation (Complex Script Shaping)

Standard PDF engines break Bengali **conjuncts (যুক্তাক্ষর)** and **vowel marks (কার)**. 

**Our Solution (`src/lib/pdf.ts`)**:
- Uses an HTML5 Canvas to leverage the browser's native HarfBuzz text shaping engine with the `Noto Sans Bengali` font.
- Renders text with exact typographic fidelity into high-DPI A4-proportioned canvases.
- Automatically handles multi-page line wrapping, official headers, and signature lines before compiling into a clean A4 PDF via `jspdf`.

---

## 🚀 Local Development & Testing

### Prerequisites
- Node.js 20+ (tested on Node 22)
- npm 10+

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/EFTAKHAR-AMIN-SAKIB/mylaws-website.git
   cd mylaws-website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env` and provide your development credentials:
   ```bash
   cp .env.example .env
   ```
   *(See `.env.example` for variable documentation. Never commit `.env` containing live secrets).*

4. Run tests:
   ```bash
   npm test
   ```
   *Executes all 95 tests across 11 test suites including retrieval accuracy, benchmark evaluations, and runtime answer demonstrations.*

5. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🌐 Production Deployment & Rollback

- **Live Production URL:** [`https://mylaws-bd.vercel.app`](https://mylaws-bd.vercel.app)
- **Deployment Platform:** Vercel (Edge Network + Serverless Functions)
- **Database:** Cloudflare D1 Edge SQLite (`mylaws-db`)

### Rollback Procedures
- **Application Rollback:** In the Vercel Dashboard, select the previous known-good deployment and click **"Promote to Production"**, or revert `main` via `git revert`.
- **Database Rollback:** The Cloudflare D1 schema and corpus can be restored using `node scripts/restore_d1.mjs backups/d1_backup_latest.json`. User accounts and query history tables are preserved automatically.

---

## 📜 Disclaimers

MyLaws is an **automated legal information and document preparation tool**, not a law firm, court, or substitute for licensed legal counsel. The information provided does not constitute formal legal advice or an attorney-client relationship. Users should consult a licensed advocate or contact the National Legal Aid Services Helpline (**16699**) before taking legal action.
