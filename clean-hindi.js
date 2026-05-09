const fs = require('fs');
const path = require('path');

// इन folders को छोड़ो
const SKIP_DIRS = ['node_modules', '.next', '.git', 'api'];

// Hindi → English replacements
const replacements = [
  { hi: 'डैशबोर्ड', en: 'Dashboard' },
  { hi: 'छात्र', en: 'Students' },
  { hi: 'शिक्षक', en: 'Teachers' },
  { hi: 'हाजिरी', en: 'Attendance' },
  { hi: 'फीस', en: 'Fees' },
  { hi: 'परीक्षा', en: 'Exams' },
  { hi: 'सूचना', en: 'Notice' },
  { hi: 'रिपोर्ट', en: 'Reports' },
  { hi: 'सेटिंग', en: 'Settings' },
  { hi: 'लॉगिन', en: 'Login' },
  { hi: 'कुल', en: 'Total' },
  { hi: 'उपस्थित', en: 'Present' },
  { hi: 'अनुपस्थित', en: 'Absent' },
  { hi: 'बकाया', en: 'Pending' },
  { hi: 'जमा', en: 'Paid' },
];

function hasHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

function replaceHindi(text) {
  replacements.forEach(({ hi, en }) => {
    text = text.replaceAll(hi, en);
  });
  // बाकी Hindi जो list में नहीं है — वो छोड़ो, blank मत करो
  return text;
}

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (SKIP_DIRS.includes(file)) return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else if (path.extname(file) === '.js') {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAllFiles(path.join(process.cwd(), 'app'));
let changed = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (!hasHindi(content)) return;
  const cleaned = replaceHindi(content);
  if (cleaned !== content) {
    fs.writeFileSync(file, cleaned, 'utf8');
    console.log('CLEANED: ' + file);
    changed++;
  }
});

console.log('\nDone. Changed: ' + changed);