const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search from index 480000 to 505000
  const slice = content.substring(480000, 515000);
  
  // Let's search for references to properties on the result object 'o' or similar.
  // In the JSX, the result state is 'o' (from [o, c] = useState(null)).
  // So we'll look for o.teamStatus, o.organization, etc.
  const regex = /o\.[a-zA-Z0-9_]+/g;
  const matches = new Set();
  let match;
  while ((match = regex.exec(slice)) !== null) {
    matches.add(match[0]);
  }
  console.log("Properties found on 'o':", Array.from(matches));

  // Let's print out the JSX rendering code around index 488000
  console.log("\nJSX rendering slice around 488000 to 498000:");
  console.log(content.substring(485000, 495000));

} catch (err) {
  console.error("Error:", err);
}
