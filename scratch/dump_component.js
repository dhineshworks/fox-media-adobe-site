const fs = require('fs');
const path = require('path');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("File read successfully, size:", content.length);
  
  const part = content.substring(450000, 530000);
  fs.writeFileSync(path.join(__dirname, 'component_dump.txt'), part);
  console.log("Dumped part to component_dump.txt");
} catch (e) {
  console.error("Error:", e);
}
