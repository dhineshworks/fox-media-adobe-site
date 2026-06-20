const fs = require('fs');

const filePath = "C:\\Users\\dhine\\.gemini\\antigravity-ide\\brain\\628374e0-008b-4246-9d20-780d2a6b056c\\.system_generated\\steps\\73\\content.md";

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("Searching content size:", content.length);

  // Search for the declaration of M. It might look like:
  // ,M="https://..." or ,M=e or const M="https://..."
  // Let's search for "M=" where the value is a string or variable.
  const regex = /[,;{]\s*M\s*=\s*(['"`][^"'`]*['"`]|[a-zA-Z0-9_$]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index < 482000) {
      console.log(`M match at ${match.index}: ${match[0]}`);
    }
  }

} catch (err) {
  console.error("Error:", err);
}
