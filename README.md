# MyLaws — Bangladesh Legal Information & Preparation Assistant (Website)

A clean, responsive, and trustworthy website showcase and functional online legal assistant for ordinary people in Bangladesh. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Vitest**.

---

## 🌟 What Works Live (Tested & Verified)

1. **Showcase & Product Hero**:
   - Quiet digital case folder design following the warm-paper / cream light mode (`#F7F3EC`) and navy/amber dark mode (`#10162B`).
   - Interactive case-sheet preview hero with live tabs: **Next Steps** (Action Checklist), **Source** (verbatim statutory excerpts), and **Draft** (prepared complaint preview).
   - Supported use-case highlights: Unpaid Wages (Labour Act 2006), Threats & Police GD (Penal Code 1860), Consumer Protection (Act 2009), Land & Property (Act 1882).
   - Honest comparison between Web (instant online assistant) and Android (Jetpack Compose native app with optional offline packs).

2. **Functional Online Assistant (`/ask`)**:
   - Bilingual language processing: Bangla (`বাংলা`), English, and Banglish (`amr boss 2 mash er beton deynai ami ki krbo`).
   - Finite State Machine (`ready`, `submitted`, `clarifying`, `finding_sources`, `completed`, `unsupported`).
   - Action Checklist leading substantive answers with 3–5 practical steps, completion toggle/undo, required document badges, and verified office referrals.
   - Clarification dialog: asks material follow-up questions when critical facts (e.g. workplace location, private vs EPZ employment) are missing.
   - Interactive Source Drawer: inspects exact verbatim excerpts from official gazettes (`bdlaws.minlaw.gov.bd`), check dates, and legal cautions.
   - Interactive Office Modal: provides verified hotlines (`16699` Legal Aid, `16104` DIFE, `999` Police).

3. **Bangla Complaint & GD Draft Generator (`/drafts`)**:
   - Two structured document types:
     - `DIFE-তে লিখিত অভিযোগ — খসড়া` (Written complaint addressed to DIFE inspector).
     - `সাধারণ ডায়েরির আবেদন — খসড়া` (Police General Diary draft).
   - Fact field editor with automatic placeholder preservation (e.g. `[বর্তমান ঠিকানা / Address লিখুন]`).
   - Fact review confirmation: marks document as `তথ্য পর্যালোচিত খসড়া / Reviewed draft` or `অসম্পূর্ণ খসড়া / Incomplete draft`.
   - Plain text copy and native Print dialog (`window.print()`).
   - **Genuine multi-page A4 PDF export** with native browser canvas text shaping for complex Bengali conjuncts and vowel marks (no broken ligatures).

4. **Public Legal Sources & Methodology (`/sources`)**:
   - Complete directory of 23 verified provisions across 6 statutes.
   - Interactive search and category filter.
   - Exact official URLs, check date (**26 October 2026**), and statutory boundaries.

5. **Honest Android Download (`/download`)**:
   - Manifest-driven release card for **MyLaws v1.0.0-preview**.
   - Serves the **real Android APK** built by the Android team (~10.3 MB, SHA-256: `b7b95f475a836ed1d6ba39d4d7e116989126a588c99a8412cccbd3a6563f5445`).
   - Hardware requirements: 4 GB physical RAM recommended (2 GB for online/static), Android 8.0+.

6. **Privacy & Terms (`/privacy`, `/terms`)**:
   - Zero mandatory registration, zero ads, zero trackers.
   - Session-only local storage for drafts; no personal identity persisted on servers.

---

## 🛠️ Stack & Architecture

- **Framework**: Next.js 15.5 App Router (React 19)
- **Language**: TypeScript 5.7 (Strict mode)
- **Styling**: Tailwind CSS 3.4 with custom design tokens (`Noto Sans Bengali` & `Merriweather` serif)
- **PDF Engine**: Client-side canvas + `jspdf` for complex Bengali ligature preservation
- **Test Runner**: Vitest 3.2 (23 automated unit and integration tests)
- **API Contracts**: 100% parity with Android `bd.mylaws.app.core.contracts.Contracts.kt`

---

## 🚀 Running the Project

### Prerequisites
Node.js 22.19+ and npm 10.9+.

```bash
# 1. Install dependencies
npm install

# 2. Run unit and integration tests
npm test

# 3. Create production build
npm run build

# 4. Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🔒 Environment Configuration

Copy `.env.example` to `.env`:
```env
MODEL_API_KEY=your_meta_api_key_here
META_MODEL=muse-spark-1.3
PORT=3000
```
- **If `MODEL_API_KEY` is omitted**: The website operates in verified deterministic mode using the authored starter legal corpus and canonical workflow pipeline. `/api/status` truthfully returns `configured: false`.
- **If `MODEL_API_KEY` is configured**: Server-side BFF routes validate requests, query Meta AI at `https://api.meta.ai/v1/responses`, verify citation IDs against the 23 known provisions, and enrich the answer claims without exposing keys to the browser.
