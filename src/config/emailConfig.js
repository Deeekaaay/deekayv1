// src/config/emailConfig.js
// EmailJS configuration

export const EMAIL_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
};

// Telegram Bot configuration for visitor tracking
export const TELEGRAM_CONFIG = {
  BOT_TOKEN: process.env.REACT_APP_TELEGRAM_TOKEN,
  CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID,
};
