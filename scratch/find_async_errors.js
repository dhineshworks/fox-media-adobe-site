const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'extracted_index_code.js');
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');

  console.log("--- makeRequest BLOCK ---");
  for (let i = 610; i < 660 && i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} catch (e) {
  console.error("Error:", e);
}
