const fs = require('fs');
const path = require('path');

// Coverage thresholds (percent)
const DEFAULT_THRESHOLDS = {
  lines: 80,
  statements: 80,
  functions: 80,
  branches: 70,
};

const coverageSummaryPath = path.resolve(process.cwd(), 'coverage', 'coverage-summary.json');
const coverageFinalPath = path.resolve(process.cwd(), 'coverage', 'coverage-final.json');

let totals = null;

if (fs.existsSync(coverageSummaryPath)) {
  const summary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
  totals = summary.total || {};
} else if (fs.existsSync(coverageFinalPath)) {
  // Fallback: compute simple totals from coverage-final.json (per-file hit data)
  const final = JSON.parse(fs.readFileSync(coverageFinalPath, 'utf8'));
  let stmtTotal = 0, stmtCovered = 0;
  let fnTotal = 0, fnCovered = 0;
  let brTotal = 0, brCovered = 0;

  Object.values(final).forEach((file) => {
    const s = file.s || {};
    const f = file.f || {};
    const b = file.b || {};

    stmtTotal += Object.keys(s).length;
    stmtCovered += Object.values(s).filter(v => v > 0).length;

    fnTotal += Object.keys(f).length;
    fnCovered += Object.values(f).filter(v => v > 0).length;

    // branches: b is an object with arrays of hit counts
    brTotal += Object.keys(b).reduce((acc, k) => acc + (Array.isArray(b[k]) ? b[k].length : 0), 0);
    brCovered += Object.keys(b).reduce((acc, k) => acc + (Array.isArray(b[k]) ? b[k].filter(v => v > 0).length : 0), 0);
  });

  const pct = (covered, total) => (total === 0 ? 100 : Math.round((covered / total) * 100));

  totals = {
    statements: { pct: pct(stmtCovered, stmtTotal) },
    functions: { pct: pct(fnCovered, fnTotal) },
    branches: { pct: pct(brCovered, brTotal) },
    lines: { pct: pct(stmtCovered, stmtTotal) },
  };
} else {
  console.error('No coverage data found (coverage-summary.json or coverage-final.json).');
  process.exit(1);
}

// If COVERAGE_STRICT=1 is set, enforce thresholds; otherwise print a short summary and exit 0.
const strict = process.env.COVERAGE_STRICT === '1' || process.env.CI_FAIL_ON_LOW_COVERAGE === '1';

console.log('Coverage totals:', {
  lines: totals.lines && totals.lines.pct,
  statements: totals.statements && totals.statements.pct,
  functions: totals.functions && totals.functions.pct,
  branches: totals.branches && totals.branches.pct,
});

if (!strict) {
  console.log('Not running strict coverage enforcement (set COVERAGE_STRICT=1 to enable).');
  process.exit(0);
}

const thresholds = Object.assign({}, DEFAULT_THRESHOLDS);
const failures = [];

['lines', 'statements', 'functions', 'branches'].forEach((k) => {
  const actual = totals[k] && totals[k].pct;
  const required = thresholds[k];
  if (typeof actual !== 'number') {
    failures.push(`${k}: no data`);
    return;
  }
  if (actual < required) {
    failures.push(`${k}: ${actual}% < ${required}%`);
  }
});

if (failures.length) {
  console.error('Coverage thresholds not met:');
  failures.forEach((f) => console.error(' -', f));
  process.exit(2);
}

console.log('Coverage thresholds met.');
process.exit(0);
