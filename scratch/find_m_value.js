const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search around index 478000 to 480120
  const sub = content.substring(475000, 481000);
  
  // Find any variable declaration or assignment like M= or const M= or similar
  // Let's print out the text context between 477500 and 479000
  console.log(content.substring(477000, 479500));

} catch (err) {
  console.error("Error:", err);
}
