const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, '..', 'index.html');
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Customer Email ID')) {
      console.log(`Line ${i + 1}: ${lines[i].trim()}`);
    }
  }
} catch (e) {
  console.error("Error:", e);
}
