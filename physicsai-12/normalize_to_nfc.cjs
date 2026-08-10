const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'lesson10Questions.ts');
const originalContent = fs.readFileSync(filePath, 'utf8');
const normalizedContent = originalContent.normalize('NFC');

if (originalContent !== normalizedContent) {
  fs.writeFileSync(filePath, normalizedContent, 'utf8');
  console.log('Successfully normalized src/data/lesson10Questions.ts to NFC!');
} else {
  console.log('src/data/lesson10Questions.ts is already in NFC format.');
}
