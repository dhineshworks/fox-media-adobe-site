const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, '..', 'index.html');
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');

  console.log("--- index.html LINES 810-840 ---");
  for (let i = 809; i < 840 && i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} catch (e) {
  console.error("Error:", e);
}
