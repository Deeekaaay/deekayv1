# 🌟 My Interactive Developer Portfolio 🌟

> **Showcase your skills, projects, and personality with an elegant and interactive portfolio built with React.js, HTML5, and CSS3.**  
> This project is designed to leave a lasting impression on visitors while ensuring responsiveness and accessibility across all devices.

---

## 🚀 Live Demo

Check out the live version of the portfolio here: [My Portfolio](https://dineshsuresh.com?source=GithubReadme)

---

## 🎨 Features

- ✨ **Dynamic Sidebar Navigation:**  
  Interactive navigation with hover effects, section-wise highlighting, and smooth scrolling.

- ✨ **Responsive Design:**  
  Optimized for all screen sizes—from desktops to mobile devices.

- ✨ **Shining Gradient Headline:**  
  Catchy and modern gradient effects on titles for that extra wow factor.

- ✨ **Experience Timeline:**  
  Collapsible and interactive experience cards that highlight key achievements, technologies used, and more. Experience and project data are now dynamically loaded from a Google Sheet for easy updates.

- ✨ **Dynamic Certifications Section:** 🆕  
  Features the top 4 certifications as cards, with a "View More" button to display additional certifications in a responsive, sortable table.

- ✨ **Hover Effects:**  
  Cards dim on hover for focused interactivity, creating a polished user experience.

- ✨ **Contact Form Integration:**  
  Easily get in touch via an integrated contact form powered by EmailJS.

- ✨ **Project Gallery:**  
  A beautifully styled project showcase section with animations, ratings, tags, and images loaded directly from your Google Sheet.

- ✨ **Clean Architecture:** 🆕  
  Organized codebase with custom hooks, utilities, and configuration files for better maintainability.

---

## 🛠️ Tech Stack

- **Design:** Figma
- **Frontend:**
  - React.js
  - HTML5
  - CSS3
- **Data Source:**
  - Google Sheets (for Experience, Projects, and Certifications)
- **Email Service:** EmailJS
- **Analytics:** Telegram Bot (visitor tracking)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── certifications/          # Certification components
│   │   ├── CertificationCard.js
│   │   ├── CertificationsSection.js
│   │   └── CertificationsTable.js
│   ├── ExperienceCard.js
│   ├── MainContent.js
│   ├── ProjectCard.js
│   ├── Section.js
│   ├── Sidebar.js
│   └── TagList.js
├── config/                       # Configuration files
│   ├── constants.js
│   └── emailConfig.js
├── hooks/                        # Custom React hooks
│   ├── useCertifications.js
│   ├── useExperience.js
│   └── useProjects.js
├── styles/                       # CSS files
├── utils/                        # Utility functions
│   ├── emailService.js
│   └── tracking.js
├── App.js
└── index.js
```

---

## 🛠️ Customization

### Google Sheets Data

Update your experience, projects, and certifications directly in the linked Google Sheet for instant updates on your site.

### Environment Variables

For security, sensitive credentials should be stored in environment variables:

1. Copy `.env.example` to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials:
   ```env
   REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token
   REACT_APP_TELEGRAM_CHAT_ID=your_chat_id
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_USER_ID=your_user_id
   REACT_APP_CERTIFICATIONS_CSV_URL=your_sheets_url
   REACT_APP_EXPERIENCE_PROJECTS_CSV_URL=your_sheets_url
   ```

### Code Customization

- **`src/components/Sidebar.js`**: Update your name, tagline, and social links
- **`src/components/ExperienceCard.js`**: Customize the experience card display
- **`src/components/ProjectCard.js`**: Customize the project card display
- **`src/config/constants.js`**: Adjust featured certifications count and other settings
- **CSS:** Modify `src/styles/` to customize colors, fonts, and animations

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deeekaaay/deekayv1.git
   cd deekayv1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional but recommended):
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

### Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

---

## 📧 Contact Me

Feel free to reach out via:

- **Email:** dineshdeekay.me@gmail.com
- **LinkedIn:** [deeekay](https://linkedin.com/in/deeekay)
- **GitHub:** [Deeekaaay](https://github.com/Deeekaaay)

---

## 🌟 Contributing

Contributions are welcome! If you have suggestions or want to report a bug, feel free to open an issue or a pull request.

---

## 🙌 Acknowledgments

- Inspired by [Brittany Chiang](https://brittanychiang.com/)
- Designed with ❤️ for developers who want to stand out

---

## 📝 Recent Updates

### v1.1.0 - Project Reorganization (Latest)
- ✅ Introduced custom hooks for data management (`useCertifications`, `useExperience`, `useProjects`)
- ✅ Created dedicated configuration files for better organization
- ✅ Added utility functions for email service and tracking
- ✅ Implemented dynamic certifications section with table view
- ✅ Improved code maintainability by 52% (reduced MainContent.js from 345 to 165 lines)
- ✅ Added environment variable support for sensitive credentials
- ✅ Enhanced mobile responsiveness for certifications table
