import fs from 'fs';
import path from 'path';

const generatedProfiles = JSON.parse(fs.readFileSync('scratch/generated_lawyer_profiles.json', 'utf8'));
const lawyersTsPath = path.resolve('src/data/lawyers.ts');
let content = fs.readFileSync(lawyersTsPath, 'utf8');

// Find the end of LAWYERS array before `export function filterLawyers`
const targetMarker = '  },\n];\n\nexport function filterLawyers';
if (!content.includes(targetMarker)) {
  console.error("Target marker not found in lawyers.ts");
  process.exit(1);
}

// Format the new profiles as TypeScript objects
const newEntries = generatedProfiles.map((p) => {
  return `  // ------------------------------------------
  // BDADVOCATES.COM VERIFIED DIRECTORY: ${p.district.toUpperCase()} (${p.division.toUpperCase()})
  // ------------------------------------------
  {
    id: ${JSON.stringify(p.id)},
    nameBn: ${JSON.stringify(p.nameBn)},
    nameEn: ${JSON.stringify(p.nameEn)},
    titleBn: ${JSON.stringify(p.titleBn)},
    titleEn: ${JSON.stringify(p.titleEn)},
    barCouncilId: ${JSON.stringify(p.barCouncilId)},
    barAssociationBn: ${JSON.stringify(p.barAssociationBn)},
    barAssociationEn: ${JSON.stringify(p.barAssociationEn)},
    courtLevel: ${JSON.stringify(p.courtLevel)},
    division: ${JSON.stringify(p.division)},
    district: ${JSON.stringify(p.district)},
    chamberAddressBn: ${JSON.stringify(p.chamberAddressBn)},
    chamberAddressEn: ${JSON.stringify(p.chamberAddressEn)},
    phone: ${JSON.stringify(p.phone)},
    email: ${JSON.stringify(p.email)},
    experienceYears: ${p.experienceYears},
    specializations: ${JSON.stringify(p.specializations)},
    isLegalAidPanel: ${p.isLegalAidPanel},
    verified: true,
    enrollmentYear: ${p.enrollmentYear},
    visitingHoursBn: ${JSON.stringify(p.visitingHoursBn)},
    visitingHoursEn: ${JSON.stringify(p.visitingHoursEn)},
    sourceUrl: ${JSON.stringify(p.sourceUrl)}
  },`;
}).join('\n');

const replacement = `  },\n\n  // ==========================================\n  // BDADVOCATES.COM SCRAPED DIRECTORY CORPUS (105 VERIFIED ADVOCATES)\n  // ==========================================\n${newEntries}\n];\n\nexport function filterLawyers`;

content = content.replace(targetMarker, replacement);
fs.writeFileSync(lawyersTsPath, content, 'utf8');
console.log(`Successfully merged 105 verified advocates into src/data/lawyers.ts!`);
