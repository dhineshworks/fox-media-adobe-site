const fs = require('fs');
const path = require('path');

try {
  const content = fs.readFileSync(path.join(__dirname, 'component_dump.txt'), 'utf8');
  
  const startIndex = content.indexOf('const _=function(){');
  if (startIndex !== -1) {
    console.log("Found const _=function(){ at index:", startIndex);
    const sub = content.substring(startIndex + 15000, startIndex + 35000);
    fs.writeFileSync(path.join(__dirname, 'jsx_rendering_logic_part2.txt'), sub);
    console.log("Written JSX rendering logic part 2 to jsx_rendering_logic_part2.txt");
  } else {
    console.log("Could not find const _=function(){");
  }
} catch (e) {
  console.error("Error:", e);
}
