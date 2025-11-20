const fs = require('fs');
const path = require('path');

// Coverage thresholds (percent)
const DEFAULT_THRESHOLDS = {
  lines: 80,
  statements: 80,
  functions: 80,
  branches: 70,
};

const coveragePath = path.resolve(process.cwd(), 'coverage', 'coverage-summary.json');

if (!fs.existsSync(coveragePath)) {
  console.error('Coverage summary not found at', coveragePath);
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
const totals = summary.total || {};

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
