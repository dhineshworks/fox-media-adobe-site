const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, '..', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  // Let's define the start and end markers for the broken code block.
  const startMarker = "// ─── HELPER FOR CORS BYPASS API REQUESTS ──────────────────────────────────────";
  const endMarker = "function StatusCheckPage({ prefill, onClearPrefill, toast }) {";

  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) {
    console.error("Start marker not found!");
    process.exit(1);
  }

  const endIndex = content.indexOf(endMarker);
  if (endIndex === -1) {
    console.error("End marker not found!");
    process.exit(1);
  }

  // Correct block to inject (using concatenation instead of template literals to avoid evaluation issues)
  const replacementBlock = startMarker + "\n" +
`    const makeRequest = async (url, method = 'GET', body = null) => {
      // Direct local fallback: if hosted on HTTP, call the local server on 8080 first!
      let primaryUrl = url;
      if (url.startsWith('https://reseller.ado-besoft.com/')) {
        if (window.location.host === 'localhost:8080') {
          primaryUrl = url.replace('https://reseller.ado-besoft.com/', '/');
        } else {
          primaryUrl = url.replace('https://reseller.ado-besoft.com/', 'http://localhost:8080/');
        }
      }

      try {
        const options = {
          method,
          headers: { 'Content-Type': 'application/json' }
        };
        if (body) {
          options.body = JSON.stringify(body);
        }
        const res = await fetch(primaryUrl, options);
        const data = await res.json().catch(() => null);
        if (data) {
          return data;
        }
      } catch (e) {
        console.warn("Primary fetch failed, trying CORS proxy fallback...", e);
      }

      try {
        const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
        const options = {
          method,
          headers: { 'Content-Type': 'application/json' }
        };
        if (body) {
          options.body = JSON.stringify(body);
        }
        const res = await fetch(proxyUrl, options);
        const data = await res.json().catch(() => null);
        if (data) {
          return data;
        }
      } catch (e) {
        console.warn("corsproxy.io failed, trying allorigins...", e);
      }

      try {
        if (method === 'GET') {
          const allOriginsUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
          const res = await fetch(allOriginsUrl);
          if (res.ok) {
            const wrapper = await res.json();
            const data = JSON.parse(wrapper.contents);
            if (data) {
              return data;
            }
          }
        }
      } catch (e) {
        console.error("AllOrigins fetch failed:", e);
      }

      return null;
    };

    const STATUS_LANGUAGES = {
      en: "English",
      ta: "தமிழ் (Tamil)",
      ml: "മലയാളം (Malayalam)",
      hi: "हिन्दी (Hindi)",
      zh: "中文 (Chinese)",
      ja: "日本語 (Japanese)",
      ko: "한국어 (Korean)"
    };

    const STATUS_TRANSLATIONS = {
      en: {
        title: "Fox Media Check Status",
        subtitle: "Enter your email to view your Adobe subscription status",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        searchButton: "Check Status",
        searching: "Searching...",
        organization: "Organization",
        plan: "Active Plan",
        duration: "Duration",
        months: "months",
        daysRemaining: "Days Remaining",
        days: "days",
        status: "Status",
        activated: "Activated",
        expires: "Expires",
        active: "Active",
        expired: "Expired",
        expiringSoon: "Expiring Soon",
        notFound: "No subscription found for this email",
        notFoundDesc: "Please check your email address or contact support.",
        instructions: "Instructions",
        instructionsText: "If you recently received access or your organization was updated, please sign out of all Adobe apps and sign back in with this email. Go to account.adobe.com and select 'Sign out everywhere' if needed.",
        teamSwitch: "Need to switch teams?",
        teamSwitchText: "If you see multiple team options, select the organization shown above to access your subscription.",
        notice: "Important Notice",
        subscriptionProgress: "Subscription Progress",
        footer: "For support, contact Fox Media support.",
        language: "Language",
        migrationInProgress: "Migration In Progress",
        migrationSubtitle: "Your account is being upgraded to a new system",
        queuePosition: "Queue Position",
        estimatedTime: "Estimated Time",
        minutes: "min",
        usersProcessed: "Users Processed",
        pleaseWait: "Please wait while we complete your migration. This process is automatic.",
        migrationActive: "MIGRATING"
      },
      ta: {
        title: "Fox Media நிலையைச் சரிபார்",
        subtitle: "உங்கள் அடோப் சந்தா நிலையை அறிய மின்னஞ்சலை உள்ளிடவும்",
        emailLabel: "மின்னஞ்சல் முகவரி",
        emailPlaceholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        searchButton: "நிலையைச் சரிபார்",
        searching: "தேடுகிறது...",
        organization: "நிறுவனம்",
        plan: "செயலில் உள்ள திட்டம்",
        duration: "கால அளவு",
        months: "மாதங்கள்",
        daysRemaining: "மீதமுள்ள நாட்கள்",
        days: "நாட்கள்",
        status: "நிலை",
        activated: "செயல்படுத்தப்பட்டது",
        expires: "காலாவதி தேதி",
        active: "செயலில் உள்ளது",
        expired: "காலாவதியானது",
        expiringSoon: "விரைவில் காலாவதியாகிறது",
        notFound: "இந்த மின்னஞ்சலில் எந்த சந்தாவும் கண்டறியப்படவில்லை",
        notFoundDesc: "மின்னஞ்சல் முகவரியைச் சரிபார்க்கவும் அல்லது ஆதரவைத் தொடர்பு கொள்ளவும்.",
        instructions: "அறிவுறுத்தல்கள்",
        instructionsText: "சமீபத்தில் உங்களுக்கு அனுமதி கிடைத்திருந்தால் அல்லது உங்கள் நிறுவனம் புதுப்பிக்கப்பட்டிருந்தால், தயவுசெய்து அனைத்து அடோப் ஆப்ஸிலிருந்தும் வெளியேறி, இந்த மின்னஞ்சல் மூலம் மீண்டும் உள்நுழையவும். தேவைப்பட்டால் account.adobe.com பக்கத்திற்குச் சென்று 'Sign out everywhere' என்பதைத் தேர்ந்தெடுக்கவும்.",
        teamSwitch: "குழுக்களை மாற்ற வேண்டுமா?",
        teamSwitchText: "ஒன்றிற்கு மேற்பட்ட குழு விருப்பங்களைக் கண்டால், உங்கள் சந்தாவை அணுக மேலே காட்டப்பட்டுள்ள நிறுவனத்தைத் தேர்ந்தெடுக்கவும்.",
        notice: "முக்கிய அறிவிப்பு",
        subscriptionProgress: "சந்தா முன்னேற்றம்",
        footer: "ஆதரவுக்கு, Fox Media ஆதரவை தொடர்பு கொள்ளவும்.",
        language: "மொழி",
        migrationInProgress: "தரவு மாற்றம் நடைபெறுகிறது",
        migrationSubtitle: "உங்கள் கணக்கு புதிய அமைப்பிற்கு மாற்றப்படுகிறது",
        queuePosition: "வரிசை எண்",
        estimatedTime: "மதிப்பிடப்பட்ட நேரம்",
        minutes: "நிமிடம்",
        usersProcessed: "மாற்றப்பட்ட பயனர்கள்",
        pleaseWait: "உங்கள் கணக்கு மாற்றம் முடியும் வரை காத்திருக்கவும். இது தானியங்கி செயல்முறையாகும்.",
        migrationActive: "மாற்றப்படுகிறது"
      },
      ml: {
        title: "Fox Media നില പരിശോധിക്കുക",
        subtitle: "നിങ്ങളുടെ അഡോബി വരിക്കാരുടെ നില കാണാൻ ഇമെയിൽ നൽകുക",
        emailLabel: "ഇമെയിൽ വിലാസം",
        emailPlaceholder: "നിങ്ങളുടെ ഇമെയിൽ നൽകുക",
        searchButton: "നില പരിശോധിക്കുക",
        searching: "തിരയുന്നു...",
        organization: "സംഘടന",
        plan: "സജീവ പ്ലാൻ",
        duration: "കാലാവധി",
        months: "മാസങ്ങൾ",
        daysRemaining: "ബാക്കിയുള്ള ദിവസങ്ങൾ",
        days: "ദിവസങ്ങൾ",
        status: "നില",
        activated: "സജീവമാക്കി",
        expires: "കാലഹരണപ്പെടുന്നു",
        active: "സജീവം",
        expired: "കാലഹരണപ്പെട്ടു",
        expiringSoon: "ഉടൻ കാലഹരണപ്പെടും",
        notFound: "ഈ ഇമെയിലിൽ വരിസംഖ്യയൊന്നും കണ്ടെത്തിയില്ല",
        notFoundDesc: "ദയവായി ഇമെയിൽ പരിശോധിക്കുക അല്ലെങ്കിൽ പിന്തുണയുമായി ബന്ധപ്പെടുക.",
        instructions: "നിർദ്ദേശങ്ങൾ",
        instructionsText: "നിങ്ങൾക്ക് അടുത്തിടെ ആക്സസ് ലഭിക്കുകയോ ഓർഗനൈസേഷൻ അപ്ഡേറ്റ് ചെയ്യപ്പെടുകയോ ചെയ്തിട്ടുണ്ടെങ്കിൽ, എല്ലാ അഡോബി ആപ്പുകളിൽ നിന്നും സൈൻ ഔട്ട് ചെയ്ത് ഈ ഇമെയിൽ ഉപയോഗിച്ച് വീണ്ടും സൈൻ ഇൻ ചെയ്യുക. ആവശ്യമെങ്കിൽ account.adobe.com സന്ദർശിച്ച് 'Sign out everywhere' തിരഞ്ഞെടുക്കുക.",
        teamSwitch: "ടീമുകൾ മാറേണ്ടതുണ്ടോ?",
        teamSwitchText: "ഒന്നിലധികം ടീം ഓപ്ഷനുകൾ കാണുകയാണെങ്കിൽ, നിങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ ആക്സസ് ചെയ്യാൻ മുകളിൽ കാണിച്ചിരിക്കുന്ന ഓർഗനൈസേഷൻ തിരഞ്ഞെടുക്കുക.",
        notice: "പ്രധാന അറിയിപ്പ്",
        subscriptionProgress: "സബ്സ്ക്രിപ്ഷൻ പുരോഗതി",
        footer: "പിന്തുണയ്ക്കായി, ഫോക്സ് മീഡിയ പിന്തുണയുമായി ബന്ധപ്പെടുക.",
        language: "ഭാഷ",
        migrationInProgress: "മൈഗ്രേഷൻ പുരോഗതിയിലാണ്",
        migrationSubtitle: "നിങ്ങളുടെ അക്കൗണ്ട് ഒരു പുതിയ സിസ്റ്റത്തിലേക്ക് അപ്ഗ്രേഡ് ചെയ്യപ്പെടുന്നു",
        queuePosition: "ക്യൂവിലെ സ്ഥാനം",
        estimatedTime: "പ്രതീക്ഷിക്കുന്ന സമയം",
        minutes: "മിനിറ്റ്",
        usersProcessed: "പ്രോസസ്സ് ചെയ്ത ഉപയോക്താക്കൾ",
        pleaseWait: "നിങ്ങളുടെ മൈഗ്രേഷൻ പൂർത്തിയാകുന്നതുവരെ ദയവായി കാത്തിരിക്കുക. ഈ പ്രക്രിയ ഓട്ടോമാറ്റിക് ആണ്.",
        migrationActive: "മൈഗ്രേറ്റിംഗ്"
      },
      hi: {
        title: "Fox Media स्थिति जांचें",
        subtitle: "अपनी एडोब सब्सक्रिप्शन स्थिति देखने के लिए ईमेल दर्ज करें",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        searchButton: "स्थिति जांचें",
        searching: "खोज रहे हैं...",
        organization: "संगठन",
        plan: "सक्रिय प्लान",
        duration: "अवधि",
        months: "महीने",
        daysRemaining: "शेष दिन",
        days: "दिन",
        status: "स्थिति",
        activated: "सक्रिय किया गया",
        expires: "समाप्ति तिथि",
        active: "सक्रिय",
        expired: "समाप्त",
        expiringSoon: "जल्द समाप्त होने वाला है",
        notFound: "इस ईमेल के लिए कोई सब्सक्रिप्शन नहीं मिला",
        notFoundDesc: "कृपया अपना ईमेल पता जांचें या सहायता से संपर्क करें।",
        instructions: "निर्देश",
        instructionsText: "यदि आपको हाल ही में एक्सेस मिला है या आपका संगठन अपडेट किया गया है, तो कृपया सभी एडोब ऐप्स से साइन आउट करें और इस ईमेल के साथ फिर से साइन इन करें। यदि आवश्यक हो तो account.adobe.com पर जाएं और 'Sign out everywhere' चुनें।",
        teamSwitch: "टीम बदलने की आवश्यकता है?",
        teamSwitchText: "यदि आप कई टीम विकल्प देखते हैं, तो अपनी सदस्यता तक पहुँचने के लिए ऊपर दिखाए गए संगठन का चयन करें।",
        notice: "महत्वपूर्ण सूचना",
        subscriptionProgress: "सब्सक्रिप्शन प्रगति",
        footer: "सहायता के लिए, फॉक्स मीडिया सहायता से संपर्क करें।",
        language: "भाषा",
        migrationInProgress: "माइग्रेशन प्रगति पर है",
        migrationSubtitle: "आपका खाता एक नए सिस्टम में अपग्रेड किया जा रहा है",
        queuePosition: "कतार की स्थिति",
        estimatedTime: "अनुमानित समय",
        minutes: "मिनट",
        usersProcessed: "संसाधित उपयोगकर्ता",
        pleaseWait: "कृपया माइग्रेशन पूरा होने तक प्रतीक्षा करें। यह प्रक्रिया स्वचालित है।",
        migrationActive: "माइग्रेट हो रहा है"
      },
      zh: {
        title: "查看您的订阅",
        subtitle: "输入您的电子邮件以查看您的Adobe订阅状态",
        emailLabel: "电子邮箱",
        emailPlaceholder: "输入您的电子邮件地址",
        searchButton: "查看状态",
        searching: "搜索中...",
        organization: "组织",
        plan: "当前计划",
        duration: "时长",
        months: "个月",
        daysRemaining: "剩余天数",
        days: "天",
        status: "状态",
        activated: "激活于",
        expires: "到期",
        active: "有效",
        expired: "已过期",
        expiringSoon: "即将过期",
        notFound: "未找到此邮箱的订阅",
        notFoundDesc: "请检查您的电子邮件地址或联系客服。",
        instructions: "使用说明",
        instructionsText: "如果您最近获得了访问权限或您的组织已更新，请退出所有Adobe应用程序，然后使用此电子邮件重新登录。如有需要，请访问account.adobe.com并选择'退出所有设备'。",
        teamSwitch: "需要切换团队？",
        teamSwitchText: "如果您看到多个团队选项，请选择上方显示的组织以访问您的订阅。",
        videoTitle: "如何删除无效的组织？",
        notice: "重要通知",
        subscriptionProgress: "订阅进度",
        footer: "如需支持，请联系 Fox Media 客服。",
        language: "语言"
      },
      ja: {
        title: "Fox Media サブスクリプション確認",
        subtitle: "メールアドレスを入力してAdobeサブスクリプションの状態を確認",
        emailLabel: "メールアドレス",
        emailPlaceholder: "メールアドレスを入力してください",
        searchButton: "ステータスを確認",
        searching: "検索中...",
        organization: "組織",
        plan: "アクティブプラン",
        duration: "期間",
        months: "ヶ月",
        daysRemaining: "残り日数",
        days: "日",
        status: "ステータス",
        activated: "有効化",
        expires: "有効期限",
        active: "アクティブ",
        expired: "期限切れ",
        expiringSoon: "まもなく期限切れ",
        notFound: "このメールのサブスクリプションが見つかりません",
        notFoundDesc: "メールアドレスを確認するか、サポートにお問い合わせください。",
        instructions: "手順",
        instructionsText: "最近アクセス権を取得した場合、または組織が更新された場合は、すべてのAdobeアプリからサインアウトし、このメールで再度サイン인してください。必要に応じて、account.adobe.comで「すべての場所からサインアウト」を選択してください。",
        teamSwitch: "チームを切り替える必要がありますか？",
        teamSwitchText: "複数のチームオプションが表示される場合は、上記の組織を選択してサブスクリプションにアクセスしてください。",
        videoTitle: "無効な組織を削除する方法は？",
        notice: "重要なお知らせ",
        subscriptionProgress: "サブスクリプション進捗",
        footer: "サポートが必要な場合は、Fox Mediaサポートにお問い合わせください。",
        language: "言語"
      },
      ko: {
        title: "Fox Media 구독 확인",
        subtitle: "이메일을 입력하여 Adobe 구독 상태를 확인하세요",
        emailLabel: "이메일 주소",
        emailPlaceholder: "이메일을 입력하세요",
        searchButton: "상태 확인",
        searching: "검색 중...",
        organization: "조직",
        plan: "활성 플랜",
        duration: "기간",
        months: "개월",
        daysRemaining: "남은 일수",
        days: "일",
        status: "상태",
        activated: "활성화",
        expires: "만료",
        active: "활성",
        expired: "만료됨",
        expiringSoon: "곧 만료",
        notFound: "이 이메일에 대한 구독을 찾을 수 없습니다",
        notFoundDesc: "이메일 주소를 확인하거나 고객 지원에 문의하세요.",
        instructions: "안내",
        instructionsText: "최근에 액세스 권한을 받았거나 조직이 업데이트된 경우 모든 Adobe 앱에서 로그아웃한 후 이 이메일로 다시 로그인하세요. 필요한 경우 account.adobe.com에서 '모든 곳에서 로그아웃'을 선택하세요.",
        teamSwitch: "팀을 전환해야 하나요?",
        teamSwitchText: "여러 team 옵션이 표시되면 위에 표시된 조직을 선택하여 구독에 액세스하십시오.",
        videoTitle: "잘못된 조직을 삭제하는 방법은?",
        notice: "중요 공지",
        subscriptionProgress: "구독 진행률",
        footer: "지원이 필요하면 Fox Media 지원에 문의하세요.",
        language: "언어"
      }
    };
\n`;

  // Perform content replace
  content = content.substring(0, startIndex) + replacementBlock + content.substring(endIndex);

  // Now replace the hardcoded "Customer Email ID" label in JSX
  const labelOld = '<label className="field-label">Customer Email ID</label>';
  const labelNew = '<label className="field-label">{t.emailLabel || "Email Address"}</label>';
  content = content.replace(labelOld, labelNew);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully wrote modifications to index.html");
} catch (e) {
  console.error("Error executing replacement:", e);
}
