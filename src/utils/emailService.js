// src/utils/emailService.js
import emailjs from "@emailjs/browser";
import { EMAIL_CONFIG } from "../config/emailConfig";

/**
 * Send email using EmailJS service
 * @param {Object} formData - Object containing name, email, and message
 * @returns {Promise<Object>} Result of the email send operation
 */
export const sendEmail = async (formData) => {
  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    throw new Error("Please fill out all fields before sending!");
  }

  const emailParams = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  };

  try {
    const result = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      emailParams,
      EMAIL_CONFIG.USER_ID
    );

    return result;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error("Failed to send your message. Please try again.");
  }
};

/**
 * Handle form submission and send email
 * @param {Event} e - Form submit event
 */
export const handleContactFormSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  try {
    const result = await sendEmail(formData);

    if (result.status === 200) {
      alert(
        "Message sent successfully! 🎉 Check your email for confirmation. 😊"
      );

      // Clear the form after successful submission
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert(error.message);
  }
};
