const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search from index 478000 to 485000
  const slice = content.substring(478000, 485000);
  
  // Find R definition
  // Let's find "const R = " or "R = async" or similar in this slice
  console.log(slice.substring(0, 3000));

} catch (err) {
  console.error("Error:", err);
}
