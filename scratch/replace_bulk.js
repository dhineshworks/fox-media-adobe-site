const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

const replacement = `    function BulkSearchPage({ toast }) {
      const [inputEmails, setInputEmails] = useState("");
      const [loading, setLoading] = useState(false);
      const [results, setResults] = useState(null);
      const [progress, setProgress] = useState(0);
      const [totalToProcess, setTotalToProcess] = useState(0);

      const getBadgeStyle = (status) => {
        switch (status) {
          case 'active': return { background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
          case 'expiring-soon': return { background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
          case 'expired': return { background: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
          case 'migrating': return { background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
          default: return { background: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' };
        }
      };

      const formatStatusText = (status) => {
        switch (status) {
          case 'active': return 'Active';
          case 'expiring-soon': return 'Expiring Soon';
          case 'expired': return 'Expired';
          case 'migrating': return 'Migrating';
          default: return 'Not Found';
        }
      };

      const handleCheckBulk = async () => {
        const emails = inputEmails.split(/[\\s,]+/).map(e => e.trim()).filter(e => e && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e));
        if (emails.length === 0) {
          toast("Please enter valid email addresses", "error");
          return;
        }
        if (emails.length > 100) {
          toast("Please limit to 100 emails at once", "error");
          return;
        }
        
        setLoading(true);
        setTotalToProcess(emails.length);
        setProgress(0);
        setResults([]);
        
        const newResults = [];
        for (let i = 0; i < emails.length; i++) {
          try {
            const res = await makeRequest("https://reseller.ado-besoft.com/api/user-status", "POST", { email: emails[i] });
            if (res && res.found) {
              newResults.push(res);
            } else {
              newResults.push({ email: emails[i], found: false, status: 'not-found' });
            }
          } catch (e) {
            newResults.push({ email: emails[i], found: false, status: 'error' });
          }
          setResults([...newResults]);
          setProgress(i + 1);
        }
        setLoading(false);
        toast("Bulk search completed", "success");
      };

      return (
        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', background: '#0f172a', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            
            {/* Top Icon */}
            <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)' }}>
              <span style={{ fontSize: '32px' }}>🔍</span>
            </div>
            
            {/* Title & Subtitle */}
            <h1 style={{ textAlign: 'center', fontSize: '32px', color: '#fff', margin: '0 0 16px 0', fontWeight: 'bold' }}>Bulk Status Checker</h1>
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '15px', marginBottom: '40px', lineHeight: '1.6' }}>
              Check up to 100 Adobe subscriptions at once. Paste emails separated<br />by commas, spaces, or newlines.
            </p>

            {/* Inner Form Card */}
            <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
              <textarea 
                style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#fff', padding: '16px', minHeight: '160px', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', marginBottom: '24px', boxSizing: 'border-box' }}
                placeholder="user1@example.com, user2@example.com\\nuser3@example.com"
                value={inputEmails}
                onChange={(e) => setInputEmails(e.target.value)}
                disabled={loading}
              ></textarea>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', fontWeight: 'bold', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}
                onClick={handleCheckBulk} 
                disabled={loading || !inputEmails.trim()}
              >
                {loading ? \`Checking... (\${progress}/\${totalToProcess})\` : "Check Status"}
              </button>
            </div>

            {/* Results Table */}
            {results && results.length > 0 && (
              <div style={{ marginTop: '32px', background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
                  Results ({results.length})
                </h3>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '600', fontSize: '14px' }}>Email</th>
                        <th style={{ padding: '12px 16px', fontWeight: '600', fontSize: '14px' }}>Status</th>
                        <th style={{ padding: '12px 16px', fontWeight: '600', fontSize: '14px' }}>Organization</th>
                        <th style={{ padding: '12px 16px', fontWeight: '600', fontSize: '14px' }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>{r.email}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={getBadgeStyle(r.status)}>
                              {formatStatusText(r.status)}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>
                            {r.found ? (r.organization?.name || "-") : "-"}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>days left</div>
                            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#e2e8f0' }}>{r.found && r.daysRemaining !== undefined ? Math.max(0, r.daysRemaining) : "-"}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      );
    }`;

// use an exact regex matching all characters ignoring spaces entirely
const pattern = /function BulkSearchPage\(\{ toast \}\) \{\s*return \(\s*<div className="page-content" style=\{\{ height: 'calc\(100vh - 80px\)', padding: 0 \}\}>\s*<iframe\s*src="https:\/\/reseller\.ado-besoft\.com\/bulk-status"\s*style=\{\{ width: '100%', height: '100%', border: 'none' \}\}\s*title="Bulk Subscription Search"\s*\/>\s*<\/div>\s*\);\s*\}/;

if (pattern.test(html)) {
  html = html.replace(pattern, replacement);
  fs.writeFileSync('../index.html', html, 'utf8');
  console.log("Successfully replaced BulkSearchPage");
} else {
  // If even that fails, we can just find "function BulkSearchPage({ toast }) {" and "function GeneratorPage"
  const startIdx = html.indexOf("function BulkSearchPage({ toast }) {");
  const endIdx = html.indexOf("function GeneratorPage({", startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
     const before = html.substring(0, startIdx);
     const after = html.substring(endIdx);
     html = before + replacement + "\\n    // ─── GENERATOR PAGE ────────────────────────────────────────────────────────────\\n    " + after;
     fs.writeFileSync('../index.html', html, 'utf8');
     console.log("Replaced via indexOf");
  } else {
     console.log("Failed indexOf");
  }
}
