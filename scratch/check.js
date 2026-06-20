const fs = require('fs');
const html = fs.readFileSync('../index.html', 'utf8');
const match = html.match(/<script type="text\/plain" id="react-app-code">([\s\S]*?)<\/script>/);
if (match) {
  const code = match[1];
  try {
    const babel = require('@babel/core');
    babel.transformSync(code, {
      presets: ['@babel/preset-react']
    });
    console.log("No syntax errors found by Babel.");
  } catch (e) {
    console.error("Syntax Error:", e.message);
  }
} else {
  console.log("Script not found");
}
