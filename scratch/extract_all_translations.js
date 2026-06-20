const fs = require('fs');
const path = require('path');

try {
  const content = fs.readFileSync(path.join(__dirname, 'component_dump.txt'), 'utf8');
  
  const startIndex = content.indexOf('F={en:{');
  if (startIndex !== -1) {
    // Let's find the closing of the dictionary F.
    // It's followed by U={en:"English",...};
    const endIndex = content.indexOf('const _=function(){');
    if (endIndex !== -1) {
      const fString = content.substring(startIndex, endIndex);
      fs.writeFileSync(path.join(__dirname, 'translations_extracted.txt'), fString);
      console.log("Extracted translation dictionary F to translations_extracted.txt");
    } else {
      console.log("Could not find const _=function in dump.");
    }
  } else {
    console.log("Could not find F={en:{ in dump.");
  }
} catch (e) {
  console.error("Error:", e);
}
