import { describe, it, expect } from 'vitest';
import { findProvision } from '../src/components/SourceDrawer';

describe('Provision Resolver & Citation Integrity', () => {
  it('resolves family-court-2023-5 and case variations to Section 5', () => {
    const prov1 = findProvision('family-court-2023-5');
    expect(prov1).toBeDefined();
    expect(prov1?.section).toBe('Section 5');
    expect(prov1?.act.en).toContain('Family Courts Act');

    const prov2 = findProvision('FAMILY-COURT-2023-5');
    expect(prov2).toBeDefined();
    expect(prov2?.section).toBe('Section 5');

    const prov3 = findProvision('family-court-2023-4');
    expect(prov3).toBeDefined();
    expect(prov3?.section).toBe('Section 5');
  });

  it('resolves mflo-1961-9 to Section 9 of MFLO', () => {
    const mflo = findProvision('mflo-1961-9');
    expect(mflo).toBeDefined();
    expect(mflo?.section).toBe('Section 9');

    const mfloUpper = findProvision('MFLO-1961-9');
    expect(mfloUpper).toBeDefined();
    expect(mfloUpper?.section).toBe('Section 9');
  });

  it('resolves land-crime-19-1 to Section 19 of Land Crime Act', () => {
    const lc = findProvision('land-crime-19-1');
    expect(lc).toBeDefined();
    expect(lc?.section).toBe('Section 19');
  });

  it('resolves cyber-pornography-8-2 to Section 8', () => {
    const porno = findProvision('cyber-pornography-8-2');
    expect(porno).toBeDefined();
    expect(porno?.section).toBe('Section 8(2)');
  });

  it('resolves const-33-arrest to Article 33', () => {
    const c33 = findProvision('const-33-arrest');
    expect(c33).toBeDefined();
    expect(c33?.section).toBe('Article 33(1)–(3)');
  });
});
