const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search from index 475000 to 520000
  const slice = content.substring(475000, 520000);
  
  // Let's print out the JSX rendering code around index 495000 to 510000
  console.log("\nJSX rendering slice around 495000 to 510000:");
  console.log(content.substring(495000, 505000));

} catch (err) {
  console.error("Error:", err);
}
