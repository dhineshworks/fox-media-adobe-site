const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search backward from 477000 for "M=" or similar
  const slice = content.substring(450000, 477000);
  
  // Let's print out code snippets that define M
  const regex = /const\s+M\s*=\s*[^,;]*|let\s+M\s*=\s*[^,;]*|var\s+M\s*=\s*[^,;]*/g;
  let match;
  while ((match = regex.exec(slice)) !== null) {
    console.log(`M match: ${match[0]}`);
  }

  // Also let's print anything like "M =" in that slice
  const mAssignRegex = /[a-zA-Z_0-9]+,\s*M\s*=\s*[^,;]*/g;
  while ((match = mAssignRegex.exec(slice)) !== null) {
    console.log(`M assignment match: ${match[0]}`);
  }

} catch (err) {
  console.error("Error:", err);
}
