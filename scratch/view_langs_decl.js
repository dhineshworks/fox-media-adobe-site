const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, '..', 'index.html');
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');

  console.log("--- index.html LINES 880-920 ---");
  for (let i = 879; i < 920 && i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} catch (e) {
  console.error("Error:", e);
}
