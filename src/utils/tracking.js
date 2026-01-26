// src/utils/tracking.js
import { TELEGRAM_CONFIG } from "../config/emailConfig";

// Timezone to country mapping (approximate - based on IANA timezone database)
const TIMEZONE_TO_COUNTRY = {
  "America/New_York": "🇺🇸 USA (Eastern)",
  "America/Chicago": "🇺🇸 USA (Central)",
  "America/Denver": "🇺🇸 USA (Mountain)",
  "America/Los_Angeles": "🇺🇸 USA (Pacific)",
  "America/Phoenix": "🇺🇸 USA (Arizona)",
  "America/Toronto": "🇨🇦 Canada (Eastern)",
  "America/Vancouver": "🇨🇦 Canada (Pacific)",
  "Europe/London": "🇬🇧 United Kingdom",
  "Europe/Paris": "🇫🇷 France",
  "Europe/Berlin": "🇩🇪 Germany",
  "Europe/Rome": "🇮🇹 Italy",
  "Europe/Madrid": "🇪🇸 Spain",
  "Europe/Amsterdam": "🇳🇱 Netherlands",
  "Europe/Brussels": "🇧🇪 Belgium",
  "Europe/Vienna": "🇦🇹 Austria",
  "Europe/Stockholm": "🇸🇪 Sweden",
  "Europe/Oslo": "🇳🇴 Norway",
  "Europe/Copenhagen": "🇩🇰 Denmark",
  "Europe/Helsinki": "🇫🇮 Finland",
  "Europe/Warsaw": "🇵🇱 Poland",
  "Europe/Prague": "🇨🇿 Czech Republic",
  "Europe/Budapest": "🇭🇺 Hungary",
  "Europe/Athens": "🇬🇷 Greece",
  "Europe/Bucharest": "🇷🇴 Romania",
  "Europe/Sofia": "🇧🇬 Bulgaria",
  "Europe/Istanbul": "🇹🇷 Turkey",
  "Europe/Moscow": "🇷🇺 Russia (Moscow)",
  "Asia/Dubai": "🇦🇪 UAE",
  "Asia/Kolkata": "🇮🇳 India",
  "Asia/Mumbai": "🇮🇳 India",
  "Asia/Delhi": "🇮🇳 India",
  "Asia/Bangalore": "🇮🇳 India",
  "Asia/Singapore": "🇸🇬 Singapore",
  "Asia/Hong_Kong": "🇭🇰 Hong Kong",
  "Asia/Shanghai": "🇨🇳 China",
  "Asia/Tokyo": "🇯🇵 Japan",
  "Asia/Seoul": "🇰🇷 South Korea",
  "Australia/Sydney": "🇦🇺 Australia (Sydney)",
  "Australia/Melbourne": "🇦🇺 Australia (Melbourne)",
  "Australia/Brisbane": "🇦🇺 Australia (Brisbane)",
  "Australia/Perth": "🇦🇺 Australia (Perth)",
  "Pacific/Auckland": "🇳🇿 New Zealand",
  "America/Sao_Paulo": "🇧🇷 Brazil",
  "America/Mexico_City": "🇲🇽 Mexico",
  "America/Argentina/Buenos_Aires": "🇦🇷 Argentina",
  "Africa/Johannesburg": "🇿🇦 South Africa",
  "Africa/Cairo": "🇪🇬 Egypt",
  "Africa/Lagos": "🇳🇬 Nigeria",
  "Africa/Nairobi": "🇰🇪 Kenya",
};

/**
 * Get visitor's approximate location based on timezone
 */
const getLocationFromTimezone = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = TIMEZONE_TO_COUNTRY[timezone] || `🌍 ${timezone}`;
    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(offset / 60);
    const offsetSign = offset > 0 ? "-" : "+";
    const utcOffset = `UTC${offsetSign}${offsetHours}`;
    
    return {
      timezone,
      country,
      utcOffset,
    };
  } catch (error) {
    return {
      timezone: "Unknown",
      country: "🌍 Unknown",
      utcOffset: "Unknown",
    };
  }
};

/**
 * Get browser and device information
 */
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let device = "Desktop";

  // Detect browser
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";

  // Detect device type
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet/i.test(ua)) device = "Tablet";

  return { browser, device };
};

/**
 * Send visitor tracking notification to Telegram
 * @param {string} source - The source parameter from URL
 */
export const sendTelegramNotification = async (source) => {
  const location = getLocationFromTimezone();
  const { browser, device } = getBrowserInfo();
  const localTime = new Date().toLocaleString();

  const message = `🚀 New Visitor Alert!

📍 Location: ${location.country}
🕐 Timezone: ${location.timezone} (${location.utcOffset})
⏰ Local Time: ${localTime}

🔗 Source: ${source}
💻 Device: ${device}
🌐 Browser: ${browser}

---
Visit logged successfully! 🎉`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage?chat_id=${
        TELEGRAM_CONFIG.CHAT_ID
      }&text=${encodeURIComponent(message)}`
    );

    const data = await response.json();
    console.log("Message sent to Telegram:", data);
    return data;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    throw error;
  }
};

/**
 * Track visitor source from URL parameters
 * Should be called once when the app loads
 */
export const trackVisitorSource = () => {
  // Check if tracking already happened in this session
  const sessionKey = "visitor_tracked";
  if (sessionStorage.getItem(sessionKey)) {
    console.log("Visitor already tracked in this session");
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const sourceParam = queryParams.get("source") ?? "Direct visit";

  // Mark as tracked immediately to prevent duplicates
  sessionStorage.setItem(sessionKey, "true");

  sendTelegramNotification(sourceParam)
    .then(() => {
      // Remove the query parameter from the URL
      const url = new URL(window.location);
      url.searchParams.delete("source");
      window.history.replaceState({}, document.title, url);
    })
    .catch((error) => {
      console.error("Failed to track visitor:", error);
      // Remove the flag if sending failed so it can retry
      sessionStorage.removeItem(sessionKey);
    });
};
