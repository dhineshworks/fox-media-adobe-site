const fs = require('fs');
const path = require('path');

try {
  const content = fs.readFileSync(path.join(__dirname, 'component_dump.txt'), 'utf8');
  
  // Let's search for "return" in the component code (which starts after "const _=function(){")
  const startIndex = content.indexOf('const _=function(){');
  if (startIndex !== -1) {
    console.log("Found const _=function(){ at index:", startIndex);
    const sub = content.substring(startIndex, startIndex + 15000);
    fs.writeFileSync(path.join(__dirname, 'jsx_rendering_logic.txt'), sub);
    console.log("Written JSX rendering logic to jsx_rendering_logic.txt");
  } else {
    console.log("Could not find const _=function(){");
  }
} catch (e) {
  console.error("Error:", e);
}
