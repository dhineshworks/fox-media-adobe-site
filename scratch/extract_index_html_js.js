const fs = require('fs');
const path = require('path');

try {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  console.log("HTML file size:", htmlContent.length);

  const scriptStartTag = '<script type="text/plain" id="react-app-code">';
  const scriptEndTag = '</script>';

  const startIndex = htmlContent.indexOf(scriptStartTag);
  if (startIndex === -1) {
    console.error("Could not find script start tag");
    process.exit(1);
  }

  const codeStartIndex = startIndex + scriptStartTag.length;
  const endIndex = htmlContent.indexOf(scriptEndTag, codeStartIndex);
  if (endIndex === -1) {
    console.error("Could not find script end tag");
    process.exit(1);
  }

  const jsCode = htmlContent.substring(codeStartIndex, endIndex);
  const outPath = path.join(__dirname, 'extracted_index_code.js');
  fs.writeFileSync(outPath, jsCode, 'utf8');
  console.log("Extracted JS code written to:", outPath);
} catch (e) {
  console.error("Error:", e);
}
