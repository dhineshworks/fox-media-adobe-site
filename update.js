const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const newStatusPage = `function StatusCheckPage({ toast, prefillEmail }) {
      const url = prefillEmail 
        ? \`https://reseller.ado-besoft.com/status?email=\${encodeURIComponent(prefillEmail)}\`
        : "https://reseller.ado-besoft.com/status";

      return (
        <div className="page-content" style={{ height: 'calc(100vh - 80px)', padding: 0 }}>
          <iframe 
            src={url}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Check Subscription Status"
          />
        </div>
      );
    }`;

const newBulkPage = `function BulkSearchPage({ toast }) {
      return (
        <div className="page-content" style={{ height: 'calc(100vh - 80px)', padding: 0 }}>
          <iframe 
            src="https://reseller.ado-besoft.com/bulk-status"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Bulk Subscription Search"
          />
        </div>
      );
    }`;

const regexStatus = /function StatusCheckPage\(\{ toast, prefillEmail \}\) \{[\s\S]*?(?=\n    \/\/ ─── BULK SEARCH PAGE)/;
const regexBulk = /function BulkSearchPage\(\{ toast \}\) \{[\s\S]*?(?=\n    \/\/ ─── GENERATOR PAGE)/;

content = content.replace(regexStatus, newStatusPage);
content = content.replace(regexBulk, newBulkPage);

fs.writeFileSync('index.html', content);
console.log("Replaced successfully!");
