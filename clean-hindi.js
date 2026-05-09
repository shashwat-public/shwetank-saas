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
  { hi: 'निशांत स्कूल', en: 'Nishant School' },
  { hi: 'पोर्टल', en: 'Portal' },
  { hi: 'स्कूल', en: 'School' },
  { hi: 'सॉफ्टवेयर', en: 'Software' },
  { hi: 'निशांत', en: 'Nishant' },
  { hi: 'अभी', en: 'now' },
  { hi: 'कोई', en: 'no' },
  { hi: 'आपका', en: 'your' },
  { hi: 'आज', en: 'today' },
  { hi: 'सेवा', en: 'service' },
  { hi: 'अभिभावक', en: 'Parent' },
  { hi: 'नया', en: 'new' },
  { hi: 'नमस्ते', en: 'Hello' },
  { hi: 'आगामी', en: 'Upcoming' },
  { hi: 'हाल', en: 'Recent' },
  { hi: 'त्वरित', en: 'Quick' },
  { hi: 'समाप्त', en: 'Expired' },
  { hi: 'विद्यालय', en: 'School' },
  { hi: 'पर', en: '' },
  { hi: 'और', en: 'and' },
  { hi: 'की', en: '' },
  { hi: 'को', en: '' },
  { hi: 'से', en: '' },
  { hi: 'भी', en: '' },
  { hi: 'पूरा', en: 'complete' },
  { hi: 'पहले', en: 'first' },
  { hi: 'सिर्फ', en: 'only' },
  { hi: 'यह', en: '' },
  { hi: 'करें', en: '' },
  { hi: 'नहीं।', en: '' },
  { hi: 'नहीं', en: '' },
  { hi: 'का', en: '' },
  { hi: 'नवीनीकरण', en: 'Renewal' },
  { hi: 'जारी', en: 'active' },
  { hi: 'देगा।', en: '' },
  { hi: 'करके', en: '' },
  { hi: 'जानकारी', en: 'details' },
  { hi: 'अधूरी', en: 'incomplete' },
  { hi: 'अलग', en: 'separate' },
  { hi: 'कार्य', en: 'Quick Actions' },
  { hi: 'प्रबंधन', en: 'Management' },
  { hi: 'भरें', en: '' },
  { hi: 'एं', en: '' },
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